using System;
using System.Collections.Generic;
using stackl.Models;

namespace stackl.DataAccessLayer {
    public interface ICommentDataService {
        List<Comment> getCommentForPost(int postId);
    }
}