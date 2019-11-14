using System;

namespace stackl.Controllers.DTO {

    public class AuthorDTO
    {
        public AuthorDTO() {}

        public AuthorDTO(string name, int authorId)
        {
            Name = name;
            AuthorId = authorId;
        }

        public string Name { get; set; }
        public int AuthorId { get; set; }
    }
}