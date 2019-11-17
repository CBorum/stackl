using Xunit;
using System.Collections.Generic;
using stackl.Controllers.DTO;
using StacklServiceTests;
using Xunit.Abstractions;
using stackl.DataAccessLayer.Search;

namespace StacklServiceTests {

    public class UserController_WithAuthTest : ControllerTest
    {
        public override string BasePath { get; set; } = "/api/user";
        public override ITestOutputHelper IOutput {get;set;}

        public UserController_WithAuthTest(ITestOutputHelper output){
            this.IOutput = output;
            this.AuthenticateClient();
        }

        [Fact]
        public async void GetMarkings_Authed_StatusOk()
        {
            var userId = 1;
            var response = await GetList<List<CommentDTO>>($"/{userId}/marking");
            
            Assert.Equal(System.Net.HttpStatusCode.OK, response.Status);
        }

        [Fact]
        public async void GetSearchHistory_Authed_StatusOk()
        {
            var userId = 1;
            var response = await GetList<List<SearchEntryDTO>>($"/{userId}/searchhistory");
            
            Assert.Equal(System.Net.HttpStatusCode.OK, response.Status);
        }

        [Fact]
        public async void DeleteSearchHistoryEntry_Authed_StatusOk()
        {
            var userId = 1;
            var searchRepo = new SearchRepository(new stackl.Models.raw2Context());

            var entry = await searchRepo.Create(new stackl.Models.SearchEntry(){
                Query = "javascript",
                UserId = userId,
                CreationDate = System.DateTime.Now 
            });

            if(entry == null) throw new System.Exception("No entry returned from Create");

            var response = await Delete<bool>(userId, $"/searchhistory/{entry.SearchEntryId}");
            
            Assert.Equal(System.Net.HttpStatusCode.NoContent, response.Status);
        }

        [Fact]
        public async void DeleteSearchHistoryEntry_InvalidId_StatusNotFound()
        {
            var userId = 1;

            var response = await Delete<bool>(userId, $"/searchhistory/{-1}");
            
            Assert.Equal(System.Net.HttpStatusCode.NotFound, response.Status);
        }
    }
}