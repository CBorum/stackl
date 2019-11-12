using System.Collections.Generic;
using stackl.Models;

namespace stackl.DataAccessLayer.Comment {
    public class CommentRepository : Repository<Models.Comment, CommentOptions>
    {
        public CommentRepository(raw2Context dbContext) : base(dbContext)
        {
        }

        public List<Models.Comment> GetCommentsForPost(int postId)
        {
            throw new System.NotImplementedException();
        }
    }
}