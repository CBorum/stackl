using System;
using stackl.Models;

namespace stackl.DataAccessLayer.Comment {

    public class CommentDTO
    {
        public int CommentId { get; set; }
        public int Score { get; set; }
        public string Text { get; set; }
        public DateTime CreatedDate { get; set; }
        public int PostId { get; set; }
        public Author AuthorDTO { get; set; }
        public Post.PostDTO Post { get; set; }
    }
}