using Xunit;
using stackl.Controllers.DTO;
using StacklServiceTests;

namespace stackl.Controllers
{
    public class CommentControllerTest : ControllerTest
    {
        public override string BasePath {get;set;} = "/api/comment";

        public CommentControllerTest(){
        }

        [Fact]
        public async void GetPost_OkResponse_ValidId()
        {
            var id = 71;
            var response = await Get<CommentDTO>(id);
            
            Assert.Equal(response.Status, System.Net.HttpStatusCode.OK);
        }
    }
}