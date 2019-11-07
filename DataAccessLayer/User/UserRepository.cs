using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using stackl.Models;

namespace stackl.DataAccessLayer.User {
    public class UserRepository : Repository<StacklUser, UserOptions>, IUserRepository 
    {
        raw2Context context = new raw2Context();

        public Models.Post AddSearchHistory(string query, int userId)
        {
            return context.Post
                .FromSqlRaw("select * from searcher({0}, {1})", query, userId)
                .FirstOrDefault(null);
        }

        public List<Marking> GetMarkings(int offset, int limit)
        {
            if (limit > 100)
            {
                limit = 100;
            }
            return context.Marking
                .Skip(offset)
                .Take(limit)
                .ToList();
        }

        public List<SearchEntry> GetSearchHistory(int offset, int limit)
        {
            if (limit > 100)
            {
                limit = 100;
            }
            return context.SearchEntry
                .Skip(offset)
                .Take(limit)
                .ToList();
        }

        public void SetPostMarking(int userId, int rowId, string tableName, string note)
        {
            context.StacklUser.FromSqlRaw("select * from marker({0}, {1}, {2}, {3})", userId, rowId, tableName, note);
        }
    }
}