using System;

namespace stackl.Controllers.DTO {

    public class Author
    {
        public Author(){
            
        }

        public Author(string username)
        {
            this.username = username;
        }

        public string username { get; set; }
    }
}