using System;

namespace stackl.DataAccessLayer {

    public class SearchRequest
    {
        public SearchRequest(int id,int offset, int limit, string input)
        {
            this.Id = id;
            this.Offset = offset;
            this.Limit = limit;
            this.Input = input;
        }

        public int Id { get; set; }
        public int Offset { get; set; }
        public int Limit { get; set; }
        public string Input { get; set; }
    }

}