using System;

namespace stackl.Controllers.DTO {

    public class SearchEntryDTO
    {
        public SearchEntryDTO() {}

        public SearchEntryDTO(int searchEntryId, string query, DateTime? creationDate)
        {
            SearchEntryId = searchEntryId;
            Query = query;
            CreationDate = creationDate;
        }

        public int SearchEntryId { get; set; }
        public string Query { get; set; }
        public DateTime? CreationDate { get; set; }  
    }
}