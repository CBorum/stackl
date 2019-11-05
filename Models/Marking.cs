using System;
using System.Collections.Generic;

namespace stackl.Models
{
    public partial class Marking
    {
        public int UserId { get; set; }
        public int RowId { get; set; }
        public string TableName { get; set; }
        public string Note { get; set; }
        public DateTime? CreationDate { get; set; }

        public virtual StacklUser User { get; set; }
    }
}
