using Xunit;
using stackl.DataAccessLayer;
using stackl.Models;

namespace stackl.Tests
{
    public class PostDataServiceTests
    {
        [Fact]
        public void TestGetPostByID_NotFound()
        {
            //Given
            var postDataService = new PostDataService();

            //When
            var post = postDataService.Get(1);

            //Then
            Assert.Null(post);
        }

        [Fact]
        public void TestGetPostByID_Valid()
        {
            //Given
            var postDataService = new PostDataService();
            var testPost = new Post();
            testPost.PostId = 71;

            //When
            var post = postDataService.Get(71);

            //Then
            Assert.NotNull(post);
            Assert.Equal(testPost.PostId, post.PostId);
        }

        [Fact]
        public void TestGetAllPosts()
        {
            //Given
            var postDataService = new PostDataService();

            //When
            var posts = postDataService.GetAll();

            //Then
            Assert.Equal(100, posts.Count);
        }
    }
}