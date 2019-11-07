using System.Collections.Generic;
using stackl.Models;
using stackl.DataAccessLayer;

namespace stackl.DataAccessLayer {
    public class PostOptions : IOptions
    {
        public List<string> IncludedModels { get; set;}

        public PostOptions(){
            IncludedModels = new List<string>();
        }
    }
}