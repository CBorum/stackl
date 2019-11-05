using System;
using System.Collections.Generic;

namespace stackl.Models
{
    public partial class Post
    {
        public Post()
        {
            Comment = new HashSet<Comment>();
            InverseAcceptedAnswer = new HashSet<Post>();
            InverseParent = new HashSet<Post>();
            Ndtwi = new HashSet<Ndtwi>();
            PostLinkFromPost = new HashSet<PostLink>();
            PostLinkToPost = new HashSet<PostLink>();
            PostTag = new HashSet<PostTag>();
            Terms = new HashSet<Terms>();
        }

        public int PostId { get; set; }
        public DateTime? CreationDate { get; set; }
        public string Body { get; set; }
        public int? Score { get; set; }
        public DateTime? ClosedDate { get; set; }
        public string Title { get; set; }
        public int? AuthorId { get; set; }
        public int? ParentId { get; set; }
        public int? AcceptedAnswerId { get; set; }
        public int? PostTypeId { get; set; }

        public virtual Post AcceptedAnswer { get; set; }
        public virtual Author Author { get; set; }
        public virtual Post Parent { get; set; }
        public virtual Ndwi Ndwi { get; set; }
        public virtual ICollection<Comment> Comment { get; set; }
        public virtual ICollection<Post> InverseAcceptedAnswer { get; set; }
        public virtual ICollection<Post> InverseParent { get; set; }
        public virtual ICollection<Ndtwi> Ndtwi { get; set; }
        public virtual ICollection<PostLink> PostLinkFromPost { get; set; }
        public virtual ICollection<PostLink> PostLinkToPost { get; set; }
        public virtual ICollection<PostTag> PostTag { get; set; }
        public virtual ICollection<Terms> Terms { get; set; }
    }
}
