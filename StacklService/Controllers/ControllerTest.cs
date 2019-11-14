using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Text.Json;
using System.Threading.Tasks;
using stackl.Helpers;


namespace stackl.Controllers {

    public interface IControllerTest {

    }

    public class ControllerTestResponse<T> {
        public T Body {get;set;}
        public HttpStatusCode Status {get;set;}
    }

    public abstract class ControllerTest {
        public HttpClient HttpClient = new HttpClient();
        public abstract string BasePath {get;set;}
        private Regex OkRegex {get;} = new Regex(@"^2\d\d$");
        private JsonSerializerOptions jsonOptions = new JsonSerializerOptions(){
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true
        };
        private string BaseUri { get {
            return Env.GetInstance().Dict["BASE_URI"] ?? "http://127.0.0.1:5000";
        }}
        
        public ControllerTest(){
        }

        public async Task<ControllerTestResponse<T>> Get<T>(int id){

            HttpResponseMessage response = await HttpClient.GetAsync(BaseUri + BasePath + "/" + id);
            
            var ctResponse = new ControllerTestResponse<T>(){
                Status = response.StatusCode
            };

            if(response.IsSuccessStatusCode){
                var responseContentString = await response.Content.ReadAsStringAsync();
                
                ctResponse.Body = JsonSerializer.Deserialize<T>(responseContentString, jsonOptions);
            }
            
            return ctResponse;
        }
    }
}