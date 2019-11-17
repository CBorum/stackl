using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Text.Json;
using System.Threading.Tasks;
using stackl.Helpers;


namespace StacklServiceTests {

    struct LoginBody {
        public string Username {get;set;}
        public string Password {get;set;}
    }

    public class ControllerTestResponse<T> {
        public T Body {get;set;}
        public HttpStatusCode Status {get;set;}
    }

    public abstract class ControllerTest {
        public HttpClient HttpClient = new HttpClient();
        public abstract string BasePath {get;set;}
        private string LoginPath {get;} = "/api/login/authenticate";
        private string token {get;set;}
        private bool isAuthed {get;set;} = false;
        private TaskCompletionSource<string> authPromise {get;set;}

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

        public async Task AuthenticateClient(){
            if(isAuthed == true) return;
            authPromise = new TaskCompletionSource<string>();
            string username = Env.GetInstance().Dict["TEST_USERNAME"];
            string password = Env.GetInstance().Dict["TEST_USERNAME"];

            var url = BaseUri + LoginPath;

            var stringContent = JsonSerializer.Serialize<LoginBody>(new LoginBody(){
                Username = username,
                Password = password
            });

            var response = await HttpClient.PostAsync(url, new StringContent(stringContent));

            authPromise.SetResult("done");
        } 

        public async Task<ControllerTestResponse<T>> Get<T>(int id, bool withAuth = false){
            if(authPromise != null){
                await authPromise.Task;
            }

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