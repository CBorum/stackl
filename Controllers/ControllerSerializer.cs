using System;
using System.IO;
using System.Net;
using System.Xml;
using System.Xml.Serialization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace stackl.Controllers{

    public static class ControllerSerializer {

        public static ActionResult SerializeContent<T>(this ControllerBase controller, T obj){
            var xmlSerializer = new XmlSerializer(typeof(T));

            var contentType = controller.Request.ContentType;
            if(contentType.Contains("json")){
                return controller.Ok(obj);
            }
            else if(contentType.Contains("xml")){

                using(StringWriter textWriter = new StringWriter())
                {
                    xmlSerializer.Serialize(textWriter, obj);
                    
                    return controller.Content(textWriter.ToString(), "text/xml");
                }                
            }
            
            return controller.Ok(obj);
        }

    }
}