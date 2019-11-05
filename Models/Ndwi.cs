using System;
using System.Collections.Generic;

namespace stackl.Models
{
    public partial class Ndwi
    {
        public int PostId { get; set; }
        public long? TermCount { get; set; }

        public virtual Post Post { get; set; }
    }
}
