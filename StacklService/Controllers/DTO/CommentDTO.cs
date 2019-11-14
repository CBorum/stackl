using System;

namespace stackl.Controllers.DTO {

    public class CommentDTO
    {
        public CommentDTO() {}
        public CommentDTO(int commentId, int? score, string text, DateTime? createdDate)
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
        public int? PostId { get; set; }
        public AuthorDTO Author { get; set; }
        public PostDTO Post { get; set; }
    }
}