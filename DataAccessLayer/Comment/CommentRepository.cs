using System.Collections.Generic;
using stackl.Models;

namespace stackl.DataAccessLayer {
    public class CommentRepository : ICommentRepository
    {
        public List<Comment> GetCommentsForPost(int postId)
        {
            throw new System.NotImplementedException();
        }
    }
}