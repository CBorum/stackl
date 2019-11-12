using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using stackl.DataAccessLayer;
using stackl.DataAccessLayer.Post;
using stackl.DataAccessLayer.Search;
using stackl.Models;

namespace stackl.Controllers
{
    [ApiController]
    [Route("api/search")]
    public class SearchController : ControllerBase
    {
        SearchRepository repository;

        public SearchController(){
            repository = new SearchRepository(new raw2Context());
        }

        [HttpGet]
        public ActionResult Search(SearchRequest searchRequest)
        {
            var res = repository.RankedWeightedSearch(searchRequest.UserId, searchRequest.Offset, searchRequest.Limit, searchRequest.Input);
            if (res == null) return NotFound();
            var posts = from post in res
                select new DTO.Post()
                {
                    PostId = post.PostId,
                    Body = post.Body,
                    Score = post.Score,
                    CreationDate = post.CreationDate,
                    PostURI = Url.ActionLink("GetPost", "Post", new { id = post.PostId })
                };
            return Ok(posts);
        }
    }
}