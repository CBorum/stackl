using System.Collections.Generic;
using stackl.Models;

namespace stackl.DataAccessLayer {
    public class UserRepository : Repository<StacklUser, UserOptions>, IUserRepository 
    {
        public Post AddSearchHistory(string query, int userId)
        {
            throw new System.NotImplementedException();
        }

        public List<Marking> GetMarkings(int offset, int limit)
        {
            throw new System.NotImplementedException();
        }

        public List<SearchEntry> GetSearchHistory(int offset, int limit)
        {
            throw new System.NotImplementedException();
        }

        public void SetPostMarking(int postId, int userId)
        {
            throw new System.NotImplementedException();
        }

        void IUserRepository.AddSearchHistory(string query, int userId)
        {
            throw new System.NotImplementedException();
        }
    }
}