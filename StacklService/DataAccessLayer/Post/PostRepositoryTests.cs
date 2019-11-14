using Xunit;
using stackl.Models;

namespace stackl.DataAccessLayer.Post
{
    public class PostDataServiceTests
    {
        raw2Context context;

        [Fact]
        public void TestGetPostByID_NotFound()
        {
            //Given
            var postDataService = new PostRepository(context);

            //When
            var post = postDataService.Get(1);

            //Then
            Assert.Null(post);
        }

        [Fact]
        public void TestGetPostByID_Valid()
        {
            //Given
            var postDataService = new PostRepository(context);
            var testPost = new Models.Post();
            testPost.PostId = 71;

            //When
            var post = postDataService.Get(71);

            //Then
            Assert.NotNull(post);
            // Assert.Equal(testPost.PostId, post.PostId);
        }

        [Fact]
        public void TestGetAllPosts()
        {
            //Given
            var postDataService = new PostRepository(context);

            //When
            // var posts = postDataService.GetAll();

            //Then
            // Assert.Equal(100, posts.Count);
        }
    }
}