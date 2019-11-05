using System;
using System.Collections.Generic;

namespace stackl.Models
{
    public partial class Words
    {
        public int? Id { get; set; }
        public string Tablename { get; set; }
        public string What { get; set; }
        public int? Sen { get; set; }
        public int? Idx { get; set; }
        public string Word { get; set; }
        public string Pos { get; set; }
        public string Lemma { get; set; }
    }
}
