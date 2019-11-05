using System;
using System.Collections.Generic;

namespace stackl.Models
{
    public partial class Author
    {
        public Author()
        {
            Comment = new HashSet<Comment>();
            Post = new HashSet<Post>();
        }

        public int AuthorId { get; set; }
        public string Name { get; set; }
        public DateTime? CreationDate { get; set; }
        public int? Age { get; set; }
        public int? LocationId { get; set; }

        public virtual Location Location { get; set; }
        public virtual ICollection<Comment> Comment { get; set; }
        public virtual ICollection<Post> Post { get; set; }
    }
}
