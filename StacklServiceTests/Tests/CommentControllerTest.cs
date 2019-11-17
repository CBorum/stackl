using Xunit;
using stackl.Controllers.Comment;
using StacklServiceTests;
using Xunit.Abstractions;

namespace stackl.Controllers
{
    public class CommentControllerTest : ControllerTest
    {
        public override string BasePath {get;set;} = "/api/comment";
        public override ITestOutputHelper IOutput {get;set;}
        
        public CommentControllerTest(ITestOutputHelper output){
            this.IOutput = output;
        }

        [Fact]
        public async void GetComment_InvalidId_StatusNotFound()
        {
            var id = 71;
            var response = await Get<CommentDTO>(id);
            
            Assert.Equal(System.Net.HttpStatusCode.NotFound, response.Status);
        }
    }
}