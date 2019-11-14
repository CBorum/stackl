using System;
using System.Collections.Generic;

namespace stackl.DataAccessLayer {

    public interface IOptions {

        List<String> IncludedModels {get; set;}
    }
}