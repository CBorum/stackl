using System;
using System.Collections.Generic;

namespace stackl.Models
{
    public partial class Comment
    {
        public int CommentId { get; set; }
        public int? Score { get; set; }
        public string Text { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? PostId { get; set; }
        public int? AuthorId { get; set; }

        public virtual Author Author { get; set; }
        public virtual Post Post { get; set; }
    }
}
