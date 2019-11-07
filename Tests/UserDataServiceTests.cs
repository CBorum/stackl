using Xunit;
using stackl.DataAccessLayer;
using stackl.Models;

namespace stackl.Tests
{
    public class UserDataServiceTests
    {
        [Fact]
        public async void TestCreateUser()
        {
            //Given
            var userRepository = new UserRepository();
            var newUser = new StacklUser();
            newUser.Username = "magda";
            newUser.Password = "xd";

            //When
            var user = await userRepository.Create(newUser);

            //Then
            Assert.NotNull(user);
            Assert.Equal("magda", user.Username);
            Assert.NotEqual("xd", user.Password);
        }
        
        // [Fact]
        // public void TestInsertSearchQuery()
        // {
        //     //Given
        //     var userRepository = new UserRepository();

        //     //When
        //     userRepository.AddSearchHistory("test search", 1);

        //     //Then
        //     // TODO: assert
        // }
    }
}