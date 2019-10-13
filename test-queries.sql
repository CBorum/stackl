insert into stackl_user (username, password) values ('raw2', 'raw2password');

select marker(1, 9158957, 'comment', null);

select marker(1, 1252, 'post', 'Meget brugbar post');

select * from search_entry;

select searcher(1, 'injection');

select * from search_entry;

select * from exact_match(1, 'sql injection');

select * from best_match(1, 'sql','injection');

select * from best_match_w_body(1, 'sql','injection');

select * from ranked_weighted_2(1, 'sql','injection');

select * from ranked_weighted_2_w_body(1, 'sql','injection');

select * from words_to_words(1, 'sql injection');

select * from words_to_words_weighted_avg(1, 'sql injection');

select * from words_to_words_weighted_sum(1, 'sql injection');