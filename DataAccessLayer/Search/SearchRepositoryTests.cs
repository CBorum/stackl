using Xunit;

namespace stackl.DataAccessLayer.Search
{
    public class SearchDataServiceTests
    {
        [Fact]
        public void TestSearchByID_NotFound()
        {
            //Given
            SearchRepository searchDataService = new SearchRepository();
            
            //When
            var posts = searchDataService.RankedWeightedSearch(-1, 0, 10, "test");

            //Then
            Assert.Null(posts);
        }
        [Fact]
        public void TestSearchByLimit_10()
        {
            //Given
            SearchRepository searchDataService = new SearchRepository();
            
            //When
            var posts = searchDataService.RankedWeightedSearch(1, 0, 10, "java");
            //Then
            Assert.Equal(10, posts.Count);
        }
        [Fact]
        public void TestSearchByOffset_10()
        {
            //Given
            SearchRepository searchDataService = new SearchRepository();
            
            //When
            var posts = searchDataService.RankedWeightedSearch(1, 10, 10, "java");
            //Then
            Assert.Equal(57795, posts[0].PostId);
        }
        
    }
}