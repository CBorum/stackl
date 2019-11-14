using System;
using System.Collections.Generic;

namespace stackl.Models
{
    public partial class Ndtwi
    {
        public int PostId { get; set; }
        public string Term { get; set; }
        public long? TermCount { get; set; }
        public decimal? Tf { get; set; }
        public decimal? Rdt { get; set; }

        public virtual Post Post { get; set; }
    }
}
