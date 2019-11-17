using System;
using System.Collections.Generic;
using stackl.Controllers.Comment;
using stackl.Controllers.Author;

namespace stackl.Controllers.Post {

    public class PostAnswerDTO
    {
        public PostAnswerDTO() {}

        public PostAnswerDTO(int postId, DateTime? creationDate, string body, int? score)
        {
            PostId = postId;
            CreationDate = creationDate;
            Body = body;
            Score = score;
        }

        public int PostId { get; set; }
        public DateTime? CreationDate { get; set; }
        public string Body { get; set; }
        public int? Score { get; set; }
        public List<CommentDTO> Comments { get; set; }
        public AuthorDTO Author { get; set; }
    }
}