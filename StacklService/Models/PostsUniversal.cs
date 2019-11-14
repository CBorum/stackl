using System;
using System.Collections.Generic;

namespace stackl.Models
{
    public partial class PostsUniversal
    {
        public int? Id { get; set; }
        public int? Posttypeid { get; set; }
        public int? Parentid { get; set; }
        public int? Acceptedanswerid { get; set; }
        public DateTime? Creationdate { get; set; }
        public int? Score { get; set; }
        public string Body { get; set; }
        public DateTime? Closeddate { get; set; }
        public string Title { get; set; }
        public string Tags { get; set; }
        public int? Ownerid { get; set; }
        public string Ownerdisplayname { get; set; }
        public DateTime? Ownercreationdate { get; set; }
        public string Ownerlocation { get; set; }
        public int? Ownerage { get; set; }
        public int? Linkpostid { get; set; }
    }
}
