
using System;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Xml.Serialization;
using System.IO;
using System.Xml;
using stackl.Models;

namespace stackl
{
    public static class ContentTypeSerializer
    {
        public static ActionResult SerializeObject<Type>(Type t, string contentType)
        {
            switch (contentType)
            {
                case "application/json":
                    return new OkObjectResult(t);
                case "application/xml":
                    var xml = t.SerializeXML();
                    if (xml.Equals("")) return new StatusCodeResult((int)HttpStatusCode.InternalServerError);
                    return new OkObjectResult(xml);
                default:
                    return new StatusCodeResult((int)HttpStatusCode.UnsupportedMediaType);
            }
        }

        private static string SerializeJSON(this Type value)
        {
            return null;
        }

        public static string SerializeXML<T>(this T value)
        {
            if (value == null)
            {
                return string.Empty;
            }
            try
            {
                var xmlserializer = new XmlSerializer(typeof(T));
                var stringWriter = new StringWriter();
                using (var writer = XmlWriter.Create(stringWriter))
                {
                    xmlserializer.Serialize(writer, value);
                    return stringWriter.ToString();
                }
            }
            catch (Exception ex)
            {
                System.Console.WriteLine("An error occurred: {0}", ex);
                return string.Empty;
            }
        }
    }

}