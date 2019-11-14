using System;
using System.Collections.Generic;

namespace stackl.Controllers.DTO {

    public class PostDTO
    {
        public PostDTO() {}

        public PostDTO(int postId, DateTime? creationDate, DateTime? closedDate, string body, int? score, string postURI, string title)
        {
            PostId = postId;
            CreationDate = creationDate;
            ClosedDate = closedDate;
            Body = body;
            Score = score;
            PostURI = postURI;
            Title = title;
        }

        public int PostId { get; set; }
        public DateTime? CreationDate { get; set; }
        public DateTime? ClosedDate { get; set; }
        public string Body { get; set; }
        public int? Score { get; set; }
        public string PostURI { get; set; }
        public string Title { get; set; }
        public List<CommentDTO> Comments { get; set; }
        public AuthorDTO Author { get; set; }
        public PostDTO AcceptedAnswerPost { get; set; }
        public List<PostDTO> Answers { get; set; }
        public List<string> Tags { get; set; }
        public List<PostDTO> PostLinks { get; set; }

    }
}