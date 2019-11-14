using System;

namespace stackl.Controllers.DTO {

    public class AuthorDTO
    {
        public AuthorDTO() {}
        public AuthorDTO(string Name)
        {
            this.Name = Name;
        }

        public string Name { get; set; }
        public int AuthorId { get; set; }
    }
}