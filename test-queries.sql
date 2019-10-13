-- D.1 Framework
insert into stackl_user (username, password) values ('raw2', 'raw2password');

-- D.1 Framework
select * from marking;
select marker(1, 9158957, 'comment', null);
select marker(1, 1252, 'post', 'Meget brugbar post');
select * from marking;

-- D.1 Simple search & framework
select * from search_entry;
select searcher(1, 'injection');
select * from search_entry;

-- D.3 Exact match query
select * from exact_match(1, 'sql injection');

-- D.4 Best match query
select * from best_match(1, 'sql','injection');

-- D.4 Best match with body
select * from best_match_w_body(1, 'sql','injection');

-- D.6 Ranked weighted query
select * from ranked_weighted_2(1, 'sql','injection');

-- D.6 Ranked weighted query body
select * from ranked_weighted_2_w_body(1, 'sql','injection');

-- D.7 Words to word query 
select * from words_to_words(1, 'sql injection');

-- D.7 Words to word query with average relevance
select * from words_to_words_weighted_avg(1, 'sql injection');

-- D.7 Words to word query with summed relevance
select * from words_to_words_weighted_sum(1, 'sql injection');