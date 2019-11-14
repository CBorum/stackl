using System;
using System.Collections.Generic;

namespace stackl.Models
{
    public partial class Tag
    {
        public Tag()
        {
            PostTag = new HashSet<PostTag>();
        }

        public int TagId { get; set; }
        public string Text { get; set; }

        public virtual ICollection<PostTag> PostTag { get; set; }
    }
}
