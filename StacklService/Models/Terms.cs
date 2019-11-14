using System;
using System.Collections.Generic;

namespace stackl.Models
{
    public partial class Terms
    {
        public int PostId { get; set; }
        public string Term { get; set; }

        public virtual Post Post { get; set; }
    }
}
