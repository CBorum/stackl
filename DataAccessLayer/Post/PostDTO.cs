using System;
using stackl;

namespace stackl.DataAccessLayer {

    public class PostDTO
    {
        public int PostId { get; set; }
        public DateTime? CreationDate { get; set; }
        public string Body { get; set; }
        public int? Score { get; set; }
        public string PostURI { get; set; }
    }
}