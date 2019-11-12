using System;

namespace stackl.DataAccessLayer.User {

    public class MarkingDTO
    {
        public int Userid { get; set; }
        public int RowId { get; set; } 
        public string MarkingURI { get; set; }
        public string Note { get; set; }
        public DateTime CreationDate { get; set; }  
    }
}