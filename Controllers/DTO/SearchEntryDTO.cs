using System;

namespace stackl.Controllers.DTO {

    public class SearchEntryDTO
    {
        public SearchEntryDTO() {}

        public SearchEntryDTO(string query, DateTime? creationDate)
        {
            Query = query;
            CreationDate = creationDate;
        }

        public string Query { get; set; }
        public DateTime? CreationDate { get; set; }  
    }
}