using System;
using System.Collections.Generic;

namespace stackl.Models
{
    public partial class Location
    {
        public Location()
        {
            Author = new HashSet<Author>();
        }

        public int LocationId { get; set; }
        public string Text { get; set; }

        public virtual ICollection<Author> Author { get; set; }
    }
}
