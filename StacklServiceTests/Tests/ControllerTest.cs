using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.RegularExpressions;
using System.Text.Json;
using System.Threading.Tasks;
using stackl.Helpers;
using Xunit.Abstractions;

namespace StacklServiceTests {

    struct LoginBody {
        public string Username {get;set;}
        public string Password {get;set;}
    }

    class LoginResponse {
        public int Id {get;set;}
        public string Username {get;set;}
        public string Token {get;set;}
    }

    public class ControllerTestResponse<T> {
        public T Body {get;set;}
        public HttpStatusCode Status {get;set;}
    }

    public abstract class ControllerTest {
        public HttpClient HttpClient = new HttpClient();
        public abstract string BasePath {get;set;}
        public abstract ITestOutputHelper IOutput {get;set;}
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
            try{
                if(isAuthed == true) return;

                authPromise = new TaskCompletionSource<string>();
                string username = Env.GetInstance().Dict["TEST_USERNAME"];
                string password = Env.GetInstance().Dict["TEST_PASSWORD"];

                var url = BaseUri + LoginPath;

                var requestContentString = JsonSerializer.Serialize<LoginBody>(new LoginBody(){
                    Username = username,
                    Password = password
                });

                var requestContent = new StringContent(requestContentString);
                
                requestContent.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");

                var response = await HttpClient.PostAsync(url, requestContent);

                var responseContentString = await response.Content.ReadAsStringAsync();

                IOutput.WriteLine("responseContentString: " + responseContentString);

                LoginResponse loginResponse = JsonSerializer.Deserialize<LoginResponse>(responseContentString, jsonOptions);

                IOutput.WriteLine("loginResponse.token: " + loginResponse.Token);

                HttpClient.DefaultRequestHeaders.Authorization = AuthenticationHeaderValue.Parse($"Bearer {loginResponse.Token}");

                response.EnsureSuccessStatusCode();
            }catch(Exception ex){
                IOutput.WriteLine("Auth error:");
                IOutput.WriteLine(ex.ToString());
            }finally{
                authPromise.SetResult("done");
            }
            
        } 

        public async Task<ControllerTestResponse<T>> Get<T>(int id, string urlPostfix = ""){
            if(authPromise != null){
                await authPromise.Task;
            }

            HttpResponseMessage response = await HttpClient.GetAsync(BaseUri + BasePath + "/" + id + urlPostfix);
            
            var ctResponse = new ControllerTestResponse<T>(){
                Status = response.StatusCode
            };

            if(response.IsSuccessStatusCode){
                var responseContentString = await response.Content.ReadAsStringAsync();
                
                ctResponse.Body = JsonSerializer.Deserialize<T>(responseContentString, jsonOptions);
            }
            
            return ctResponse;
        }

        public async Task<ControllerTestResponse<T>> GetList<T>(string urlPostfix = ""){
            if(authPromise != null){
                await authPromise.Task;
            }

            HttpResponseMessage response = await HttpClient.GetAsync(BaseUri + BasePath + urlPostfix);
            
            var ctResponse = new ControllerTestResponse<T>(){
                Status = response.StatusCode
            };

            if(response.IsSuccessStatusCode){
                var responseContentString = await response.Content.ReadAsStringAsync();
                
                ctResponse.Body = JsonSerializer.Deserialize<T>(responseContentString, jsonOptions);
            }
            
            return ctResponse;
        }

        public async Task<ControllerTestResponse<T>> Post<T>(T obj){
            if(authPromise != null){
                await authPromise.Task;
            }

            var jsonString = JsonSerializer.Serialize<T>(obj, jsonOptions);

            HttpContent httpContent = new StringContent(jsonString);

            HttpResponseMessage response = await HttpClient.PostAsync(BaseUri + BasePath, httpContent);
            
            var ctResponse = new ControllerTestResponse<T>(){
                Status = response.StatusCode
            };

            if(response.IsSuccessStatusCode){
                var responseContentString = await response.Content.ReadAsStringAsync();
                
                ctResponse.Body = JsonSerializer.Deserialize<T>(responseContentString, jsonOptions);
            }
            
            return ctResponse;
        }

        public async Task<ControllerTestResponse<T>> Delete<T>(int id, string postFix = ""){
            if(authPromise != null){
                await authPromise.Task;
            }

            HttpResponseMessage response = await HttpClient.DeleteAsync(BaseUri + BasePath + "/" + id + postFix);
            
            var ctResponse = new ControllerTestResponse<T>(){
                Status = response.StatusCode
            };

            if(response.IsSuccessStatusCode && response.StatusCode != System.Net.HttpStatusCode.NoContent){
                var responseContentString = await response.Content.ReadAsStringAsync();
                
                ctResponse.Body = JsonSerializer.Deserialize<T>(responseContentString, jsonOptions);
            }
            
            return ctResponse;
        }
    }
}