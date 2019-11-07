using System;
using System.Collections.Generic;

namespace stackl.Models
{
    public partial class StacklUser
    {
        public StacklUser()
        {
            Marking = new HashSet<Marking>();
            SearchEntry = new HashSet<SearchEntry>();
        }

        public StacklUser(string username, string password)
        {
            this.Username = username;
            this.Password = password;
        }

        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public DateTime? CreationDate { get; set; }

        public virtual ICollection<Marking> Marking { get; set; }
        public virtual ICollection<SearchEntry> SearchEntry { get; set; }
    }
}
