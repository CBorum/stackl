using System;
using System.Collections.Generic;
using stackl.Controllers.Comment;
using stackl.Controllers.Author;

namespace stackl.Controllers.Post {

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
        public PostAnswerDTO AcceptedAnswerPost { get; set; }
        public List<PostAnswerDTO> Answers { get; set; }
        public List<string> Tags { get; set; }
        public List<PostAnswerDTO> PostLinks { get; set; }

    }
}