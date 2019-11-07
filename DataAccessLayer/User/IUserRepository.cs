using System.Collections.Generic;
using stackl.Models;

namespace stackl.DataAccessLayer.User
{
    public interface IUserRepository
    {
        void SetPostMarking(int userId, int rowId, string tableName, string note);
        List<Marking> GetMarkings(int offset, int limit);
        Models.Post AddSearchHistory(string query, int userId);
        List<SearchEntry> GetSearchHistory(int offset, int limit);
    }
}