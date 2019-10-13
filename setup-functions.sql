-- D:
CREATE OR REPLACE FUNCTION searcher (user_id int, s text)
    RETURNS TABLE (
        post_id int, creation_date timestamp, body text, score int, closed_date timestamp, title text, author_id int, parent_id int, accepted_answer_id int, post_type_id int
)
    AS $BODY$
BEGIN
    INSERT INTO search_entry (user_id, query)
    VALUES (user_id, s);
    RETURN query
    SELECT
        *
    FROM
        post
    WHERE
        post.title ~* s
        OR post.body ~* s;
END
$BODY$
LANGUAGE plpgsql
CREATE OR REPLACE FUNCTION marker (user_id int, row_id int, table_name varchar, note varchar)
    RETURNS void
    AS $$
BEGIN
    INSERT INTO marking (row_id, table_name, user_id, note)
    VALUES (row_id, table_name, user_id, note);
END
$$
LANGUAGE plpgsql;

-- Exact match:
CREATE OR REPLACE FUNCTION exact_match (user_id int, s1 text, s2 text, s3 text)
    RETURNS TABLE (
        post_id int, body text
)
    AS $BODY$
BEGIN
    --insert into??
    RETURN query
    SELECT
        p.post_id,
        p.body
    FROM
        post p,
        (
            SELECT
                t.post_id
            FROM
                terms t
            WHERE
                term = s1
            INTERSECT
            SELECT
                t.post_id
            FROM
                terms t
            WHERE
                term = s2
            INTERSECT
            SELECT
                t.post_id
            FROM
                terms t
            WHERE
                term = s3) t
    WHERE
        p.post_id = t.post_id;
END
$BODY$
LANGUAGE plpgsql
D2: DROP TABLE IF EXISTS terms;

CREATE TABLE terms AS
SELECT
    id AS post_id,
    lower(word) AS term
FROM
    words --evt. tilføj "what"
WHERE
    word ~* '^[A-Za-z0-9].*$'
    AND tablename = 'posts'
    AND (what = 'title'
        OR what = 'body');

-- Terms in document
DROP TABLE IF EXISTS ndwi;

CREATE TABLE ndwi AS
SELECT
    post_id,
    count(term) AS term_count
FROM
    terms
GROUP BY
    post_id;

UPDATE
    ndtwi
SET
    tf = LOG(1.0 + CAST(ndtwi.term_count AS numeric) / CAST(ndwi.term_count AS numeric))
FROM
    ndwi
WHERE
    ndwi.post_id = ndtwi.post_id;

UPDATE
    ndtwi
SET
    rdt = ndtwi.tf * (1.0 / cast(ntwi.term_count AS numeric))
FROM
    ntwi
WHERE
    ntwi.term = ndtwi.term;

-- D3:
CREATE OR REPLACE FUNCTION array_intersect (anyarray, anyarray)
    RETURNS anyarray
    LANGUAGE sql
    AS $$
    SELECT
        ARRAY (
            SELECT
                UNNEST($1)
            INTERSECT
            SELECT
                UNNEST($2));

$$;

CREATE OR REPLACE FUNCTION array_union (anyarray, anyarray)
    RETURNS anyarray
    LANGUAGE sql
    AS $$
    SELECT
        ARRAY (
            SELECT
                UNNEST($1)
            UNION
            SELECT
                UNNEST($2));

$$;

CREATE OR REPLACE FUNCTION exact_match (query text)
    RETURNS TABLE (
        post_id integer, body text
)
    AS $$
DECLARE
    ids integer[];
    ids2 integer[];
    term_arr text[];
    r CHARACTER VARYING;
BEGIN
    term_arr := string_to_array(query, ' ');
    raise notice '%', term_arr[1];
    ids := ARRAY (
        SELECT
            terms.post_id
        FROM
            terms
        WHERE
            terms.term = term_arr[1]);
    term_arr := array_remove(term_arr, term_arr[1]);
    FOREACH r IN ARRAY term_arr LOOP
        ids2 := ARRAY (
            SELECT
                terms.post_id
            FROM
                terms
            WHERE
                terms.term = r);
        ids := array_intersect (ids,
            ids2);
    END LOOP;
    RETURN query
    SELECT
        post.post_id,
        post.body
    FROM
        post
    WHERE
        post.post_id = ANY (ids);
END;
$$
LANGUAGE plpgsql;

SELECT
    *
FROM
    exact_match ('particular order except');

-- D4:
CREATE OR REPLACE FUNCTION best_match (VARIADIC _terms varchar[])
    RETURNS TABLE (
        post_id int, rank bigint
)
    AS $$
DECLARE
    term_branches varchar[];
    _term varchar;
    _s varchar;
    _query_string varchar;
BEGIN
    foreach _term IN ARRAY _terms LOOP
        _s := 'terms.term = ''' || _term || '''';
        term_branches := array_append(term_branches, _s);
    END LOOP;
    _query_string := 'select post_id, count(distinct(term)) as rank
     	from terms
     	where ' || array_to_string(term_branches, ' OR ') || ' group by post_id order by rank desc;';
    raise notice '%', _query_string;
    RETURN QUERY EXECUTE _query_string;
END
$$
LANGUAGE plpgsql;

-- wrapper function to get body of post in result
CREATE OR REPLACE FUNCTION best_match_w_body (VARIADIC _terms varchar[])
    RETURNS TABLE (
        post_id int, rank bigint, body text
)
    AS $$
BEGIN
    RETURN query
    SELECT
        best_match.post_id,
        best_match.rank,
        post.body
    FROM
        best_match (VARIADIC _terms)
        JOIN post USING (post_id)
    ORDER BY
        rank DESC;
END
$$
LANGUAGE plpgsql;

-- D5:

-- Terms in document
DROP TABLE IF EXISTS ndwi;

CREATE TABLE ndwi AS
SELECT
    post_id,
    count(term) AS term_count
FROM
    terms
GROUP BY
    post_id;

-- Total term count in all docs
DROP TABLE IF EXISTS ntwi;

CREATE TABLE ntwi AS
SELECT
    term,
    count(term) AS term_count
FROM
    terms
GROUP BY
    term;

-- Specific term count in doc
DROP TABLE IF EXISTS ndtwi;

CREATE TABLE ndtwi AS
SELECT
    post_id,
    term,
    count(term) AS term_count
FROM
    terms
GROUP BY
    post_id,
    term;

ALTER TABLE ndtwi
    ADD COLUMN tf numeric;

ALTER TABLE ndtwi
    ADD COLUMN rdt numeric;

UPDATE
    ndtwi
SET
    tf = LOG(1.0 + CAST(ndtwi.term_count AS numeric) / CAST(ndwi.term_count AS numeric))
FROM
    ndwi
WHERE
    ndwi.post_id = ndtwi.post_id;

UPDATE
    ndtwi
SET
    rdt = ndtwi.tf * (1.0 / cast(ntwi.term_count AS numeric))
FROM
    ntwi
WHERE
    ntwi.term = ndtwi.term;

-- D6:
CREATE OR REPLACE FUNCTION ranked_weighted (query text)
    RETURNS TABLE (
        post_id integer, rdt numeric
)
    AS $$
DECLARE
    ids integer[];
    ids2 integer[];
    term_arr text[];
    r CHARACTER VARYING;
BEGIN
    term_arr := string_to_array(query, ' ');
    raise notice '%', term_arr[1];
    ids := ARRAY (
        SELECT
            terms.post_id
        FROM
            terms
        WHERE
            terms.term = term_arr[1]);
    term_arr := array_remove(term_arr, term_arr[1]);
    FOREACH r IN ARRAY term_arr LOOP
        ids2 := ARRAY (
            SELECT
                terms.post_id
            FROM
                terms
            WHERE
                terms.term = r);
        ids := array_union (ids,
            ids2);
    END LOOP;
    RETURN query
    SELECT
        ndtwi.post_id,
        sum(ndtwi.rdt) AS rdt
    FROM
        ndtwi,
        post
    WHERE
        post.post_id = ndtwi.post_id
        AND ndtwi.post_id = ANY (ids)
        AND ndtwi.term = ANY (string_to_array(query, ' '))
    GROUP BY
        ndtwi.post_id
    ORDER BY
        rdt DESC
    LIMIT 100;
END;
$$
LANGUAGE plpgsql;

SELECT
    *
FROM
    ranked_weighted ('java and kuk');

-- weight_query_far 3.0
CREATE OR REPLACE FUNCTION weight_query_far (VARIADIC _terms varchar[])
    RETURNS TABLE (
        post_id int, r_sum numeric
)
    AS $$
DECLARE
    _s varchar;
    _term_branches varchar[];
    _query_string varchar;
    _term varchar;
BEGIN
    foreach _term IN ARRAY _terms LOOP
        _s := 'ndtwi.term = ''' || _term || '''';
        _term_branches := array_append(_term_branches, _s);
    END LOOP;
    _query_string := 'select post_id, sum(rdt) as r_sum
 			from ndtwi where ' || array_to_string(_term_branches, ' OR ') || ' group by post_id order by r_sum desc limit 100;';
    raise notice '%', _query_string;
    RETURN query EXECUTE _query_string;
END
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION weight_query_far_w_body (VARIADIC _terms varchar[])
    RETURNS TABLE (
        post_id int, r_sum numeric, body text
)
    AS $$
BEGIN
    RETURN query
    SELECT
        weight_query_far.post_id,
        weight_query_far.r_sum,
        post.body
    FROM
        weight_query_far (VARIADIC _terms)
        JOIN post USING (post_id)
    ORDER BY
        r_sum DESC;
END
$$
LANGUAGE plpgsql;

-- D7:

-- adding to stopwords
INSERT INTO stopwords (word)
    VALUES (n t);

-- boolean version
CREATE OR REPLACE FUNCTION words_to_words (query_string varchar)
    RETURNS TABLE (
        term text, term_count numeric
)
    AS $$
BEGIN
    RETURN query
    SELECT
        terms.term,
        SUM(ndtwi.term_count) AS term_count
    FROM
        terms
        JOIN ndtwi USING (term)
    WHERE
        terms.post_id IN (
            SELECT
                post_id
            FROM
                exact_match (query_string))
        AND terms.term NOT IN (
            SELECT
                word
            FROM
                stopwords)
        AND LENGTH(terms.term) > 1
    GROUP BY
        terms.term
    ORDER BY
        SUM(ndtwi.term_count)
        DESC;
END
$$
LANGUAGE plpgsql;

-- weight version with sum
CREATE OR REPLACE FUNCTION words_to_words_weighted_sum (query_string varchar)
    RETURNS TABLE (
        term_freq numeric, term text
)
    AS $$
BEGIN
    RETURN query
    SELECT
        terms.term,
        SUM(ndtwi.rdt) AS term_rdt
    FROM
        terms
        JOIN ndtwi USING (term)
    WHERE
        terms.post_id IN (
            SELECT
                post_id
            FROM
                exact_match (query_string))
        AND terms.term NOT IN (
            SELECT
                word
            FROM
                stopwords)
        AND LENGTH(terms.term) > 1
    GROUP BY
        terms.term
    ORDER BY
        SUM(ndtwi.rdt)
        DESC;
END
$$
LANGUAGE plpgsql;

-- weight version with avg
CREATE OR REPLACE FUNCTION words_to_words_weighted_avg (query_string varchar)
    RETURNS TABLE (
        term_count numeric, term text
)
    AS $$
BEGIN
    RETURN query
    SELECT
        AVG(ndtwi.rdt) AS term_rdt,
        terms.term
    FROM
        terms
        JOIN ndtwi USING (term)
    WHERE
        terms.post_id IN (
            SELECT
                post_id
            FROM
                exact_match (query_string))
        AND terms.term NOT IN (
            SELECT
                word
            FROM
                stopwords)
        AND LENGTH(terms.term) > 1
    GROUP BY
        terms.term
    ORDER BY
        AVG(ndtwi.rdt)
        DESC
    LIMIT 50;
END;
$$
LANGUAGE plpgsql;

