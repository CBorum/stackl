insert into stackl_user (username, password) values ('raw2', 'raw2password');

insert into marking (user_id, row_id, table_name) values (1, 1258694, 'post');

insert into marking (user_id, row_id, table_name) values (1, 2782235, 'comment');

select marker(1, 9158957, 'comment', null);

select marker(1, 1252, 'post', 'Meget brugbar post');

select searcher(1, 'injection');

select * from search_entry where user_id = 1;

select * from exact_match(1, 'sql injection');

select * from best_match(1, 'sql','injection');

select * from best_match_w_body(1, 'sql','injection');

select * from ranked_weighted_2(1, 'sql','injection');

select * from ranked_weighted_2_w_body(1, 'sql','injection');

select * from words_to_words(1, 'sql injection');

select * from words_to_words_weighted_avg(1, 'sql injection');

select * from words_to_words_weighted_sum(1, 'sql injection');