using System;

namespace stackl.Controllers.DTO {

    public class Comment
    {
        public Comment(int commentId, int? score, string text, DateTime? createdDate)
        {
            CommentId = commentId;
            Score = score;
            Text = text;
            CreatedDate = createdDate;
        }

        public int CommentId { get; set; }
        public int? Score { get; set; }
        public string Text { get; set; }
        public DateTime? CreatedDate { get; set; }
        public Author Author { get; set; }
    }
}