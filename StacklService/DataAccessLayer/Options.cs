using System;
using System.Collections.Generic;

namespace stackl.DataAccessLayer {

    public abstract class Options : IOptions
    {
        public List<string> IncludedModels { get; set; }

        public Options(){
            IncludedModels = new List<string>();
        }
    }
}