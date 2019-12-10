using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using stackl.Models;
using System.Threading.Tasks;

namespace stackl.DataAccessLayer.Search {
    public class SearchRepository : Repository<SearchEntry, SearchOptions> {

        public SearchRepository(raw2Context dbContext) : base(dbContext)
        {
            DbContext = dbContext;
        }

        public void AddSearchHistory(string query, int userId)
        {
            Task.Run(() =>
                {
                    using (var context = new raw2Context())
                    {
                        var searchEntry = new SearchEntry(query, userId);
                        context.SearchEntry.Add(searchEntry);
                        var res = context.SaveChanges();
                        return res != 1 ? null : searchEntry;
                    }
                });
        }

        public List<Models.Post> RankedWeightedSearch(int? userId,int offset, int limit, string input)
        {
            try
            {
                if (userId != null && userId > 0)
                {
                    AddSearchHistory(input, (int) userId);
                }
                return DbContext.Post.FromSqlRaw("select * from search_ranked_weighted({0},{1},{2})", offset, limit, input)
                .Include(p => p.Author)
                .Include(p => p.Parent)
                    .ThenInclude(p => p.PostTag)
                    .ThenInclude(pt => pt.Tag)
                .ToList();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            return null;
        }

        public IEnumerable<WordCloud> WordCloudSearch(int id, string input)
        {
            try
            {
                var res =  DbContext.WC.FromSqlRaw("select round(term_freq,8) as term_count, term from words_to_words_weighted_sum({0}) limit 30", input)
                    .ToList();
                return res;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return null;
        }
        
        public int ParentCount(int parentId)
        {
            try
            {
                return DbContext.Post
                    .Where(p => p.ParentId == parentId)
                    .GroupBy(p => p.ParentId)
                    .Select(g => new { Count = g.Count() })
                    .FirstOrDefault().Count;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            return 0;
        }

    }
}