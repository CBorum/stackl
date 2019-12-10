using System;

namespace stackl.Controllers.User {

    public class MarkingDTO
    {
        public MarkingDTO() {}

        public MarkingDTO(int userid, int rowId, string markingURI, string note, string postTitle, DateTime creationDate)
        {
            UserId = userid;
            PostId = rowId;
            MarkingURI = markingURI;
            Note = note;
            CreationDate = creationDate;
            PostTitle = postTitle;
        }

        public int UserId { get; set; }
        public int PostId { get; set; } 
        public string MarkingURI { get; set; }
        public string Note { get; set; }
        public string PostTitle { get; set; }
        public DateTime CreationDate { get; set; }

    }
}