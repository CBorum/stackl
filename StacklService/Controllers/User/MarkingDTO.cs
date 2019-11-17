using System;

namespace stackl.Controllers.User {

    public class MarkingDTO
    {
        public MarkingDTO() {}

        public MarkingDTO(int userid, int rowId, string markingURI, string note, DateTime creationDate)
        {
            Userid = userid;
            RowId = rowId;
            MarkingURI = markingURI;
            Note = note;
            CreationDate = creationDate;
        }

        public int Userid { get; set; }
        public int RowId { get; set; } 
        public string MarkingURI { get; set; }
        public string Note { get; set; }
        public DateTime CreationDate { get; set; }  
    }
}