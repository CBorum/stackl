using System;
using System.Collections.Generic;

namespace stackl.Models
{
    public partial class CommentsUniversal
    {
        public int? Commentid { get; set; }
        public int? Postid { get; set; }
        public int? Commentscore { get; set; }
        public string Commenttext { get; set; }
        public DateTime? Commentcreatedate { get; set; }
        public int? Authorid { get; set; }
        public string Authordisplayname { get; set; }
        public DateTime? Authorcreationdate { get; set; }
        public string Authorlocation { get; set; }
        public int? Authorage { get; set; }
    }
}
