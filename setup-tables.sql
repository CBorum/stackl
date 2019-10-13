-- create tables script (Q&A)
BEGIN;

DROP TABLE IF EXISTS location CASCADE;
DROP TABLE IF EXISTS author CASCADE;
DROP TABLE IF EXISTS post CASCADE;
DROP TABLE IF EXISTS comment CASCADE;
DROP TABLE IF EXISTS tag CASCADE;
DROP TABLE IF EXISTS post_tag CASCADE;
DROP TABLE IF EXISTS post_link CASCADE;

CREATE TABLE location (
    location_id SERIAL PRIMARY KEY,
    text text UNIQUE
);

CREATE TABLE author (
    author_id int PRIMARY KEY,
    name text,
    creation_date timestamp(6),
    age INT,
    location_id INT REFERENCES location
);

CREATE TABLE post (
    post_id INT PRIMARY KEY,
    creation_date timestamp(6),
    body text,
    score INT,
    closed_date timestamp(6),
    title text,
    author_id INT REFERENCES author,
    parent_id INT REFERENCES post (post_id),
    accepted_answer_id INT REFERENCES post (post_id),
    post_type_id INT
);

CREATE TABLE comment (
    comment_id INT PRIMARY KEY,
    score INT,
    text text,
    created_date timestamp(6),
    post_id INT REFERENCES post,
    author_id INT REFERENCES author
);

CREATE TABLE tag (
    tag_id SERIAL PRIMARY KEY,
    text text UNIQUE
);

CREATE TABLE post_tag (
    post_id int REFERENCES post,
    tag_id int REFERENCES tag,
    PRIMARY KEY (post_id, tag_id)
);

CREATE TABLE post_Link (
    from_post_id int REFERENCES post (post_id),
    to_post_id int REFERENCES post (post_id),
    PRIMARY KEY (from_post_id, to_post_id)
);

COMMIT;

-- data migration script
BEGIN;

-- population the location table with all distinct locations
INSERT INTO location (text)
SELECT DISTINCT
    (ownerlocation)
FROM
    posts_universal;

-- populating the author table with all distinct owners from post_universal
INSERT INTO author (author_id, name, creation_date, age, location_id)
SELECT DISTINCT
    (ownerid),
    ownerdisplayname,
    ownercreationdate,
    ownerage,
    location_id
FROM
    posts_universal
    LEFT JOIN location ON location.text = ownerlocation;

-- populating the author table again with all distinct authors(owners) from
-- comments_universal that does not already exist in the author table

INSERT INTO author (author_id, name, creation_date, age, location_id)
SELECT DISTINCT
    (authorid),
    authordisplayname,
    authorcreationdate,
    authorage,
    location_id
FROM
    comments_universal
    LEFT JOIN location ON location.text = authorlocation
WHERE
    authorid NOT IN ( SELECT DISTINCT
            (ownerid)
        FROM
            posts_universal);

-- populating the post table with all entries from post_universal pointing to authors in the
-- author table
-- 3.2

INSERT INTO post (post_id, creation_date, body, score, closed_date, title, author_id, parent_id, post_type_id)
SELECT DISTINCT
    (id),
    creationdate,
    body,
    score,
    closeddate,
    title,
    ownerid,
    parentid,
    posttypeid
FROM
    posts_universal;

UPDATE
    post
SET
    accepted_answer_id = posts_universal.acceptedanswerid
FROM
    posts_universal
WHERE
    post.post_id = posts_universal.id
    AND posts_universal.acceptedanswerid IN ( SELECT DISTINCT
            (post_id)
        FROM
            post);

-- populating the comment table with all entries from comments_universal
INSERT INTO comment (comment_id,
    score,
    text,
    created_date,
    post_id,
    author_id
)
SELECT
    commentid,
    commentscore,
    commenttext,
    commentcreatedate,
    postid,
    authorid
FROM
    comments_universal;

-- populating the tags table with all tags from post_universal
CREATE OR REPLACE FUNCTION insert_tags ()
    RETURNS void
    AS $$
DECLARE
    rec record;
    split_tags text[];
    r CHARACTER VARYING;
BEGIN
    <<outerloop>>
    FOR rec IN SELECT DISTINCT
        (id),
        tags
    FROM
        posts_universal
    WHERE
        tags IS NOT NULL LOOP
            exit
            WHEN rec IS NULL;
            split_tags = regexp_split_to_array(rec.tags, '::');
            <<innerloop>>
            FOREACH r IN ARRAY split_tags LOOP
                INSERT INTO tag (text)
                VALUES (r) ON CONFLICT ON CONSTRAINT tag_text_key DO NOTHING;
            END LOOP;
        END LOOP;
END;
$$
LANGUAGE plpgsql;

-- populating the post_tags table
CREATE OR REPLACE FUNCTION populate_posts_tags ()
    RETURNS void
    AS $$
DECLARE
    rec record;
    split_tags text[];
    r CHARACTER VARYING;
    _tag_id int;
BEGIN
    <<outerloop>>
    FOR rec IN SELECT DISTINCT
        (id),
        tags
    FROM
        posts_universal
    WHERE
        tags IS NOT NULL LOOP
            exit
            WHEN rec IS NULL;
            split_tags = regexp_split_to_array(rec.tags, '::');
            <<innerloop>>
            FOREACH r IN ARRAY split_tags LOOP
                _tag_id = (
                    SELECT
                        tag_id
                    FROM
                        tag
                    WHERE
                        tag.text = r);
                INSERT INTO post_tag (post_id, tag_id)
                VALUES (rec.id, _tag_id);
            END LOOP;
        END LOOP;
END;
$$
LANGUAGE plpgsql;

SELECT
    insert_tags ();
SELECT
    populate_posts_tags ();
INSERT INTO post_link (from_post_id, to_post_id)
SELECT
    id,
    linkpostid
FROM
    posts_universal
WHERE
    id IN ( SELECT DISTINCT
            (post_id)
        FROM
            post)
    AND linkpostid IN ( SELECT DISTINCT
            (post_id)
        FROM
            post);

COMMIT;

BEGIN;

CREATE OR REPLACE FUNCTION check_post_or_comment_exist (row_id int, table_name varchar(50))
        RETURNS boolean
        AS $$
DECLARE
    row_count INTEGER;
BEGIN
    IF table_name = 'post' THEN
        SELECT
            COUNT(post_id) INTO row_count
        FROM
            post
        WHERE
            post_id = row_id;
    elsif table_name = 'comment' THEN
        SELECT
            COUNT(comment_id) INTO row_count
        FROM
            comment
        WHERE
            comment_id = row_id;
    ELSE
        RETURN FALSE;
    END IF;
    IF row_count = 1 THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END
$$
LANGUAGE plpgsql;

DROP TABLE IF EXISTS stackl_user CASCADE;
DROP TABLE IF EXISTS search_entry CASCADE;
DROP TABLE IF EXISTS marking CASCADE;

CREATE TABLE stackl_user (
    user_id SERIAL PRIMARY KEY,
    username varchar(25) UNIQUE,
    password varchar(100),
    creation_date timestamp DEFAULT NOW()
);

CREATE TABLE search_entry (
    search_entry_id SERIAL PRIMARY KEY,
    query varchar(100),
    creation_date timestamp DEFAULT NOW(),
    user_id int REFERENCES stackl_user
);

CREATE TABLE marking (
    user_id int REFERENCES stackl_user,
    row_id int,
    -- comment eller post
    table_name varchar(50),
    note varchar(500),
    creation_date timestamp DEFAULT NOW(),
    CONSTRAINT check_post_or_comment_exist CHECK (check_post_or_comment_exist (row_id,
            table_name)),
    PRIMARY KEY (user_id, row_id, table_name)
);

COMMIT;

-- create indexing tables

BEGIN;

DROP TABLE IF EXISTS terms;

CREATE TABLE terms AS
SELECT
    id AS post_id,
    lower(word) AS term
FROM
    words
WHERE
    word ~* '^[A-Za-z0-9].*$'
    AND tablename = 'posts'
    AND (what = 'title'
        OR what = 'body');

-- Terms in document
DROP TABLE IF EXISTS ndwi;

-- Create n(d)
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

COMMIT;

-- Adding indexes

BEGIN;

drop index if exists stopwords_word;
drop index if exists post_idx;
drop index if exists term_idx;
drop index if exists post1_idx;
drop index if exists term1_idx;
drop index if exists term2_idx;
drop index if exists post2_idx;

create index stopwords_word on stopwords(word);
create index post_idx on terms(post_id);
create index term_idx on terms(term);
create index post1_idx on ndwi(post_id);
create index term1_idx on ntwi(term);
create index term2_idx on ndtwi(term);
create index post2_idx on ndtwi(post_id);

COMMIT;