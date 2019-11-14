using System.Collections.Generic;
using stackl.Models;

namespace stackl.DataAccessLayer.User
{
    public interface IUserRepository
    {
        List<Marking> GetMarkings(int offset, int limit);
        List<SearchEntry> GetSearchHistory(int userId, int offset, int limit);
        bool DeleteSearchHistory(int userId, int searchEntryId);
        void SetPostMarking(int userId, int rowId, string tableName, string note);
    }
}