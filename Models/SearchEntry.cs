using System;
using System.Collections.Generic;

namespace stackl.Models
{
    public partial class SearchEntry
    {
        public SearchEntry() {}

        public SearchEntry(string query, int userId)
        {
            this.Query = query;
            this.UserId = userId;
        }

        public int SearchEntryId { get; set; }
        public string Query { get; set; }
        public DateTime? CreationDate { get; set; }
        public int? UserId { get; set; }

        public virtual StacklUser User { get; set; }
    }
}
