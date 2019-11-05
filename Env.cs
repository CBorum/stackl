using System;
using System.Collections;
using System.Collections.Generic;
using System.Text.RegularExpressions;


namespace stackl {

    class Env {
        private static Env instance {get;} = new Env();

        public Dictionary<String, String> Dict {get;}

        private Env(){
            try{
                Dict = new Dictionary<string, string>();
                string text = System.IO.File.ReadAllText(".env");
                var lines = text.Split(@"\r");
                foreach(var line in lines){
                    var splitLine = line.Split("=", 2);
                    Dict[splitLine[0].Trim()] = splitLine[1].Trim();
                }
            }catch(Exception ex){
                Console.WriteLine("Failed to read .env file (is a .env file present in the project directory?)");
            }
        }

        public static Env GetInstance(){
            return instance;
        }
    }
}