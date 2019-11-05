namespace stackl.DataAccessLayer
{
    public class DTOClasses
    {

    }
    public class SearchRequest
    {
        public SearchRequest(int id, string input)
        {
            this.Id = id;
            this.Input = input;
        }

        public int Id { get; set; }
        public string Input { get; set; }
    }
    
}