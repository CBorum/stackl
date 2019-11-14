using System.Collections.Generic;

namespace stackl.DataAccessLayer.Comment {
    public interface ICommentRepository {
        List<Models.Comment> GetCommentsForPost(int postId);
    }
}