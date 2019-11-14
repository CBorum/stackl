using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using stackl.Models;

namespace stackl.DataAccessLayer.User {
    public class UserRepository : Repository<StacklUser, UserOptions>, IUserRepository 
    {
        public UserRepository(raw2Context dbContext) : base(dbContext)
        {
            DbContext = dbContext;
        }

        public SearchEntry AddSearchHistory(string query, int userId)
        {
            var searchEntry = new SearchEntry(query, userId);
            DbContext.SearchEntry.Add(searchEntry);
            var res = DbContext.SaveChanges();
            return res != 1 ? null : searchEntry;
        }

        public List<Marking> GetMarkings(int offset, int limit)
        {
            if (limit > 100)
            {
                limit = 100;
            }
            return DbContext.Marking
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
            return DbContext.SearchEntry
                .Skip(offset)
                .Take(limit)
                .ToList();
        }

        public void SetPostMarking(int userId, int rowId, string tableName, string note)
        {
            DbContext.StacklUser.FromSqlRaw("select * from marker({0}, {1}, {2}, {3})", userId, rowId, tableName, note);
        }
    }
}