using System;

namespace stackl.Controllers.User {

    public class MarkingDTO
    {
        public MarkingDTO() {}

        public MarkingDTO(int userid, int rowId, string markingURI, string note, DateTime creationDate)
        {
            UserId = userid;
            PostId = rowId;
            MarkingURI = markingURI;
            Note = note;
            CreationDate = creationDate;
        }

        public int UserId { get; set; }
        public int PostId { get; set; } 
        public string MarkingURI { get; set; }
        public string Note { get; set; }
        public DateTime CreationDate { get; set; }  
    }
}