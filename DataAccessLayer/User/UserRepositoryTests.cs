//using stackl.Models;
//using Xunit;
//
//namespace stackl.DataAccessLayer.User
//{
//    public class UserRepositoryTests
//    {
//        raw2Context context;
//
//        [Fact]
//        public async void TestCreateUser()
//        {
//            //Given
//            var userRepository = new UserRepository(context);
//            var newUser = new StacklUser(randName(), "xd");
//
//            //When
//            var user = await userRepository.Create(newUser);
//
//            //Then
//            Assert.NotNull(user);
//            Assert.Equal(newUser.Username, user.Username);
//            Assert.Equal("xd", user.Password);
//
//            Assert.True(await userRepository.Delete(user.UserId));
//        }
//
//        [Fact]
//        public async void TestInsertSearchQuery()
//        {
//            //Given
//            var userRepository = new UserRepository(context);
//            var user = await userRepository.Create(new StacklUser(randName(), "pw"));
//
//            //When
//            var searchEntry = userRepository.AddSearchHistory("test search", user.UserId);
//
//            //Then
//            Assert.NotNull(searchEntry);
//            Assert.True(await userRepository.Delete(user.UserId));
//        }
//
//        [Fact]
//        public async void TestGetSeachEntries()
//        {
//            //Given
//            var userRepository = new UserRepository(context);
//            var user = await userRepository.Create(new StacklUser(randName(), "pw"));
//            userRepository.AddSearchHistory("test search", user.UserId);
//
//            //When
//            var searchEntries = userRepository.GetSearchHistory(0, 100);
//
//            //Then
//            Assert.Equal(1, searchEntries.Count);
//            Assert.Equal("test search", searchEntries[0].Query);
//
//            Assert.True(await userRepository.Delete(user.UserId));
//        }
//
//        [Fact]
//        public void TestInsertMarking()
//        {
//            //Given
//
//            //When
//
//            //Then
//        }
//
//        [Fact]
//        public void TestGetMarkings()
//        {
//            //Given
//
//            //When
//
//            //Then
//        }
//
//        public string randName() {
//            return System.Guid.NewGuid().ToString().Substring(0,25);
//        }
//    }
//}