using System.Collections.Generic;

namespace stackl.DataAccessLayer.Comment {
    public class CommentRepository : Repository<Models.Comment, CommentOptions>
    {
        public List<Models.Comment> GetCommentsForPost(int postId)
        {
            throw new System.NotImplementedException();
        }
    }
}