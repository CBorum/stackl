using stackl.Models;

namespace stackl.DataAccessLayer.Post {
    public class PostRepository : Repository<Models.Post, PostOptions>
    {
        public PostRepository(raw2Context dbContext) : base(dbContext)
        {
        }
    }
}