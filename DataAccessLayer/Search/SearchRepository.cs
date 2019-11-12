using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using stackl.Models;

namespace stackl.DataAccessLayer.Search {
    public class SearchRepository : Repository<SearchEntry, SearchOptions> {

        public SearchRepository(raw2Context dbContext) : base(dbContext)
        {
            DbContext = dbContext;
        }

        public List<Models.Post> RankedWeightedSearch(int id,int offset, int limit, string input)
        {
            try
            {
                var user = DbContext.StacklUser.FirstOrDefault(ux => ux.UserId == id);
                if (user != null)
                {
                    DbContext.SearchEntry.Add(new SearchEntry()
                    {
                        Query = input,
                        CreationDate = DateTime.Now,
                        User = user
                    });
                    DbContext.SaveChanges();
                }
                if(limit <= 0 || limit > 100) limit = 10;
                return DbContext.Post.FromSqlRaw("select * from search_ranked_weighted({0},{1},{2})", offset, limit, input).ToList();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            return null;
        }
    }
}