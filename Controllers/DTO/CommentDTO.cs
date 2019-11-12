using System;
using stackl.Controllers;
using stackl.DataAccessLayer.Post;
using stackl.Models;

namespace stackl.Controllers {

    public class CommentDTO
    {
        public int CommentId { get; set; }
        public int? Score { get; set; }
        public string Text { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? PostId { get; set; }
        public AuthorDTO AuthorDTO { get; set; }
        public PostDTO Post { get; set; }
    }
}