using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using stackl.Models;

namespace stackl.DataAccessLayer {
    public class SearchDataService {

        raw2Context context = new raw2Context();
        public IQueryable<Post> ranked_weighted_2_w_body_2(int id, string input)
        {
            IQueryable<Post> posts;
            try
            {
                posts = context.Post.FromSqlRaw("select * from ranked_weighted_2_w_body_2({0},{1})", id, input);

            }
            catch (Npgsql.PostgresException e)
            {
                posts = null;
                Console.WriteLine(e);
            }

            return posts;
        }
        
    }
}