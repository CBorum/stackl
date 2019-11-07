using System.Collections.Generic;
using stackl.DataAccessLayer;

namespace stackl.DataAccessLayer.User {

    public class UserOptions : IOptions
    {
        public List<string> IncludedModels { get; set; }

        public UserOptions(){
            IncludedModels = new List<string>();
        }
    }

}