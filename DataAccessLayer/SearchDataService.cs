using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using stackl.Models;

namespace stackl.DataAccessLayer {
    public class SearchDataService {

        raw2Context context = new raw2Context();
        public List<Post> RankedWeightedSearch(int id,int offset, int limit, string input)
        {
            try
            {
                return context.Post.FromSqlRaw("select * from ranked_weighted_2_w_body_2({0},{1},{2},{3})", id, offset, limit, input).ToList();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            return null;
        }
    }
}