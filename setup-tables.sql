-- create tables script (Q&A)
BEGIN;

DROP table if exists location cascade;

DROP table if exists author cascade;

DROP table if exists post cascade;

DROP table if exists comment cascade;

DROP table if exists tag cascade;

DROP table if exists post_tag cascade;

DROP table if exists post_link cascade;

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

CREATE TABLE tag (tag_id SERIAL PRIMARY KEY, text text UNIQUE);

CREATE TABLE post_tag (
    post_id int REFERENCES post,
    tag_id int REFERENCES tag,
    PRIMARY KEY(post_id, tag_id)
);

CREATE TABLE post_Link (
    from_post_id int REFERENCES post (post_id),
    to_post_id int REFERENCES post (post_id),
    PRIMARY KEY(from_post_id, to_post_id)
);

COMMIT;

-- data migration script
BEGIN;

-- population the location table with all distinct locations
INSERT INTO
    location (text)
select
    distinct(ownerlocation)
from
    posts_universal;

-- populating the author table with all distinct owners from post_universal
INSERT INTO
    author (author_id, name, creation_date, age, location_id)
SELECT
    distinct(ownerid),
    ownerdisplayname,
    ownercreationdate,
    ownerage,
    location_id
from
    posts_universal
    LEFT JOIN location on location.text = ownerlocation;

-- populating the author table again with all distinct authors(owners) from
-- comments_universal that does not already exist in the author table
INSERT INTO
    author (author_id, name, creation_date, age, location_id)
SELECT
    distinct(authorid),
    authordisplayname,
    authorcreationdate,
    authorage,
    location_id
from
    comments_universal
    LEFT JOIN location on location.text = authorlocation
WHERE
    authorid NOT IN (
        SELECT
            distinct(ownerid)
        from
            posts_universal
    );

-- populating the post table with all entries from post_universal pointing to authors in the
-- author table
-- 3.2
INSERT INTO
    post (
        post_id,
        creation_date,
        body,
        score,
        closed_date,
        title,
        author_id,
        parent_id,
        post_type_id
    )
SELECT
    distinct(id),
    creationdate,
    body,
    score,
    closeddate,
    title,
    ownerid,
    parentid,
    posttypeid
from
    posts_universal;

UPDATE
    post
set
    accepted_answer_id = posts_universal.acceptedanswerid
from
    posts_universal
where
    post.post_id = posts_universal.id
    and posts_universal.acceptedanswerid in (
        select
            distinct(post_id)
        from
            post
    );

-- populating the comment table with all entries from comments_universal
INSERT INTO
    comment (
        comment_id,
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
from
    comments_universal;

-- populating the tags table with all tags from post_universal
CREATE
OR REPLACE FUNCTION insert_tags() RETURNS void AS $ $ declare rec record;

split_tags text [];

r CHARACTER VARYING;

BEGIN < < outerloop > > for rec in
select
    distinct(id),
    tags
from
    posts_universal
where
    tags is not null loop exit
    when rec is null;

split_tags: = regexp_split_to_array(rec.tags, '::');

< < innerloop > > FOREACH r IN ARRAY split_tags LOOP
insert into
    tag (text)
values
    (r) ON CONFLICT ON CONSTRAINT tag_text_key DO NOTHING;

END LOOP;

end loop;

END;

$ $ LANGUAGE plpgsql;

-- populating the post_tags table
CREATE
OR REPLACE FUNCTION populate_posts_tags() RETURNS void AS $ $ declare rec record;

split_tags text [];

r CHARACTER VARYING;

_tag_id int;

BEGIN < < outerloop > > for rec in
select
    distinct(id),
    tags
from
    posts_universal
where
    tags is not null loop exit
    when rec is null;

split_tags: = regexp_split_to_array(rec.tags, '::');

< < innerloop > > FOREACH r IN ARRAY split_tags LOOP _tag_id: = (
    SELECT
        tag_id
    from
        tag
    where
        tag.text = r
);

insert into
    post_tag (post_id, tag_id)
values
    (rec.id, _tag_id);

END LOOP;

end loop;

END;

$ $ LANGUAGE plpgsql;

SELECT
    insert_tags();

SELECT
    populate_posts_tags();

INSERT INTO
    post_link (from_post_id, to_post_id)
select
    id,
    linkpostid
from
    posts_universal
where
    id in (
        select
            distinct(post_id)
        from
            post
    )
    and linkpostid in (
        select
            distinct(post_id)
        from
            post
    );

COMMIT;

BEGIN;

CREATE
OR REPLACE FUNCTION check_post_or_comment_exist(row_id int, table_name varchar(50)) RETURNS boolean AS $ $ DECLARE row_count INTEGER;

BEGIN if table_name = 'post' then
SELECT
    COUNT(post_id) into row_count
FROM
    post
WHERE
    post_id = row_id;

elsif table_name = 'comment' then
SELECT
    COUNT(comment_id) into row_count
FROM
    comment
WHERE
    comment_id = row_id;

else return false;

end if;

if row_count = 1 then return true;

else return false;

end if;

end $ $ LANGUAGE plpgsql;

DROP table if exists stackl_user cascade;

DROP table if exists search_entry cascade;

DROP table if exists marking cascade;

CREATE TABLE stackl_user (
    user_id SERIAL PRIMARY KEY,
    username varchar(25) UNIQUE,
    password varchar(100),
    creation_date timestamp default NOW()
);

CREATE TABLE search_entry (
    search_entry_id SERIAL PRIMARY KEY,
    query varchar(100),
    creation_date timestamp default NOW(),
    user_id int REFERENCES stackl_user
);

CREATE TABLE marking (
    user_id int REFERENCES stackl_user,
    row_id int,
    -- comment eller post
    table_name varchar(50),
    note varchar(500),
    creation_date timestamp default NOW(),
    CONSTRAINT check_post_or_comment_exist CHECK (check_post_or_comment_exist(row_id, table_name)),
    PRIMARY KEY(user_id, row_id, table_name)
);

COMMIT;
