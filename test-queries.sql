insert into stackl_user (username, password) values ('raw2', 'raw2password');

insert into marking (user_id, row_id, table_name) values (1, 1258694, 'post');

insert into marking (user_id, row_id, table_name) values (1, 2782235, 'comment');

select marker(1, 27822353, 'comments', null);

select searcher(1, 'injection');

select * from search_entry where user_id = 1;

select * from exact_match('sql injection');

select * from best_match('sql','injection');

select * from best_match_w_body('sql','injection');

select * from ranked_weighted_2('sql','injection');

select * from ranked_weighted_2_w_body('sql','injection');

select * from words_to_words('sql injection');

select * from words_to_words_weighted_avg('sql injection');

select * from words_to_words_weighted_sum('sql injection');