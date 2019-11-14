using Xunit;
using stackl.Models;

namespace stackl.DataAccessLayer.Search
{
    public class SearchRepositoryTests
    {
        raw2Context context;

        
        public SearchRepositoryTests(){
            context = new raw2Context();
        }

        [Fact]
        public void TestSearchByID_NotFound()
        {
            
            //Given
            SearchRepository searchDataService = new SearchRepository(context);
            
            //When
            var posts = searchDataService.RankedWeightedSearch(-1, 0, 10, "test");

            //Then
            Assert.Null(posts);
        }
        [Fact]
        public void TestSearchByLimit_10()
        {
            //Given
            SearchRepository searchDataService = new SearchRepository(context);
            
            //When
            var posts = searchDataService.RankedWeightedSearch(1, 0, 10, "java");
            //Then
            Assert.Equal(10, posts.Count);
        }
        [Fact]
        public void TestSearchByOffset_10()
        {
            //Given
            SearchRepository searchDataService = new SearchRepository(context);
            
            //When
            var posts = searchDataService.RankedWeightedSearch(1, 10, 10, "java");
            //Then
            Assert.Equal(57795, posts[0].PostId);
        }
        
    }
}