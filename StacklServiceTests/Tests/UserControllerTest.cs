using Xunit;
using System.Collections.Generic;
using stackl.Controllers.DTO;
using StacklServiceTests;
using Xunit.Abstractions;

namespace StacklServiceTests {

    public class UserControllerTest : ControllerTest
    {
        public override string BasePath { get; set; } = "/api/user";
        public override ITestOutputHelper IOutput {get;set;}
        
        public UserControllerTest(ITestOutputHelper output){
            this.IOutput = output;
        }

        [Fact]
        public async void GetMarkings_NotAuthed_StatusUnauthorized()
        {
            var userId = 1;
            var response = await GetList<List<MarkingDTO>>($"/{userId}/marking");
            
            Assert.Equal(System.Net.HttpStatusCode.Unauthorized, response.Status);
        }

        [Fact]
        public async void GetSearchHistory_NotAuthed_StatusUnauthorized()
        {
            var userId = 1;
            var response = await GetList<List<SearchEntryDTO>>($"/{userId}/searchhistory");
            
            Assert.Equal(System.Net.HttpStatusCode.Unauthorized, response.Status);
        }

        [Fact]
        public async void DeleteSearchHistoryEntry_NotAuthed_StatusUnauthorized()
        {
            var userId = 1;
            var searchEntryId = 1;
            var response = await Delete<SearchEntryDTO>(userId, $"/searchhistory/{searchEntryId}");
            
            Assert.Equal(System.Net.HttpStatusCode.Unauthorized, response.Status);
        }
    }

}