using System;

namespace stackl.DataAccessLayer.Search
{

    public class SearchRequest
    {
        public SearchRequest(int id, int offset, int limit, string input)
        {
            this.userid = id;
            this.offset = offset;
            this.limit = limit;
            this.input = input;
        }

        public int userid { get; set; }
        public int offset { get; set; }
        public int limit { get; set; }
        public string input { get; set; }
    }

}