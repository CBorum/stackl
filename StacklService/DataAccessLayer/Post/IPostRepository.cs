using stackl.Models;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace stackl.DataAccessLayer.Post {
    public interface IPostRepository
    {
        Task<Models.Post> GetComplete(int id);
        Task<List<Models.Post>> GetPostAnswers(int id);
    }
}