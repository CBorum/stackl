using stackl.Models;
using Xunit;
using stackl.Controllers.DTO;
using System.Threading.Tasks;
using System;

namespace StacklServiceTests
{
    public class CommentControllerTest : ControllerTest
    {
        public override string BasePath {get;set;} = "/api/comment";

        public CommentControllerTest(){
            this.AuthenticateClient();
        }

        [Fact]
        public async void GetPost_InvalidId_NotFound()
        {
            var id = 50;

            var response = await Get<CommentDTO>(id);
            
            Assert.Equal(System.Net.HttpStatusCode.NotFound, response.Status);
        }

        // [Fact]
        // public async void PostPost_ValidPost_Created(){

        //     var id = 50;
        //     var response = await Get<CommentDTO>(id);
            
        //     Assert.Equal(System.Net.HttpStatusCode.NotFound, response.Status);
        // }

        
    }
}