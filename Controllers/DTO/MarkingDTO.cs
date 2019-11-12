using System;

namespace stackl.Controllers {

    public class MarkingDTO
    {
        public int Userid { get; set; }
        public int RowId { get; set; } 
        public string MarkingURI { get; set; }
        public string Note { get; set; }
        public DateTime CreationDate { get; set; }  
    }
}