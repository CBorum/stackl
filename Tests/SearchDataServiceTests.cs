using System;
using System.Collections.Generic;
using stackl.DataAccessLayer;
using stackl.Models;
using Xunit;

namespace stackl.Tests
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
    }
}