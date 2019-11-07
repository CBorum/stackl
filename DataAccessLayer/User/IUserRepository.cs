using System;
using System.Collections.Generic;
using stackl.Models;

namespace stackl.DataAccessLayer {
    public interface IUserRepository {
        void SetPostMarking(int postId, int userId);
        List<Marking> GetMarkings(int offset, int limit);
        void AddSearchHistory(string query, int userId);
        List<SearchEntry> GetSearchHistory(int offset, int limit);
    }
}