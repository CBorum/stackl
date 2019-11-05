using System;
using System.Collections.Generic;

namespace stackl.Models
{
    public partial class PostLink
    {
        public int FromPostId { get; set; }
        public int ToPostId { get; set; }

        public virtual Post FromPost { get; set; }
        public virtual Post ToPost { get; set; }
    }
}
