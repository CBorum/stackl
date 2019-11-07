using System;
using System.Collections.Generic;
using stackl.Models;

namespace stackl.DataAccessLayer {
    public interface ICommentRepository {
        List<Comment> GetCommentsForPost(int postId);
    }
}