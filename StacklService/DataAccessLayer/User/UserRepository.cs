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

        public Marking CreateMarking(int userId, int postId, string note = ""){
            var marking = new Marking(){
                UserId = userId,
                RowId = postId,
                TableName = "post",
                Note = note
            };

            DbContext.Marking.Add(marking);
            DbContext.SaveChanges();

            return marking;
        }

        public List<Marking> GetMarkingByUserId(int userId, int offset = 0, int limit = 10){
            return DbContext.Marking
                .Where(x => x.TableName == "post" && x.UserId == userId)
                .Skip(offset)
                .Take(limit)
                .ToList();
        }

        public List<SearchEntry> GetSearchHistory(int userId, int offset, int limit)
        {
            if (limit > 100)
            {
                limit = 100;
            }
            return DbContext.SearchEntry
                .Where(s => s.UserId == userId)
                .Skip(offset)
                .Take(limit)
                .ToList();
        }

        public bool DeleteSearchHistory(int userId, int searchEntryId)
        {
            var searchEntry = DbContext.SearchEntry.FirstOrDefault(s => s.UserId == userId && s.SearchEntryId == searchEntryId);
            if (searchEntry == null)
            {
                return false;
            }
            DbContext.Remove(searchEntry);
            return DbContext.SaveChanges() == 1;
        }

        public bool DeleteMarking(int userid, int markingid)
        {
            // var marking = DbContext.Marking.FirstOrDefault(m => m.UserId == userid && m.)
            return false;
        }

        public void SetPostMarking(int userId, int rowId, string tableName, string note)
        {
            DbContext.StacklUser.FromSqlRaw("select * from marker({0}, {1}, {2}, {3})", userId, rowId, tableName, note);
        }
    }
}