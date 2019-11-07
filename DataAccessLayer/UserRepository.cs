using System.Collections.Generic;
using stackl.Models;

namespace stackl.DataAccessLayer {
    public class UserRepository : IRepository<StacklUser>, IUserRepository
    {
        public Post AddSearchHistory(string query, int userId)
        {
            throw new System.NotImplementedException();
        }

        public StacklUser Create(StacklUser user)
        {
            throw new System.NotImplementedException();
        }

        public bool Delete(StacklUser entity)
        {
            throw new System.NotImplementedException();
        }

        public StacklUser Get(int id)
        {
            throw new System.NotImplementedException();
        }

        public List<StacklUser> GetAll()
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

        public StacklUser Update(StacklUser entity)
        {
            throw new System.NotImplementedException();
        }

        void IUserRepository.AddSearchHistory(string query, int userId)
        {
            throw new System.NotImplementedException();
        }
    }
}