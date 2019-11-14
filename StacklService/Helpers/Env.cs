using System;
using System.Collections.Generic;
using System.IO;

namespace stackl.Helpers {

    public class Env {
        private static Env instance {get;} = new Env();

        public Dictionary<String, String> Dict {get;}

        private Env(){
            try{
                Dict = new Dictionary<string, string>();
                var path = Directory.GetCurrentDirectory().Replace("/bin/Debug/netcoreapp3.0", "")
                    .Replace("/StacklService", "");
                path += "/.env";
                var lines = System.IO.File.ReadLines(path);
                foreach (var line in lines)
                {
                    var splitLine = line.Split("=", 2);
                    Dict[splitLine[0].Trim()] = splitLine[1].Trim();
                }
            }catch(Exception ex){
                Console.WriteLine("Failed to read .env file (is a .env file present in the project directory?)");
                Console.WriteLine(ex);
            }
        }

        public static Env GetInstance(){
            return instance;
        }
    }
}