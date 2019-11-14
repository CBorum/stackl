using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using stackl.DataAccessLayer;
using stackl.DataAccessLayer.Post;
using stackl.DataAccessLayer.Search;
using stackl.Models;
using stackl.Controllers.DTO;

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
        public ActionResult Search([FromQuery] string userid, [FromQuery] string offset, [FromQuery] string limit, [FromQuery] string input)
        {
            var query = createFromSearchQuery(userid, offset, limit, input);
            if (query == null) return BadRequest();
            var res = repository.RankedWeightedSearch(query.userid, query.offset, query.limit, query.input);
            if (res == null) return NotFound();
            var posts = from post in res
                select new PostDTO()
                {
                    PostId = post.PostId,
                    Body = post.Body,
                    Score = post.Score,
                    CreationDate = post.CreationDate,
                    PostURI = Url.ActionLink("GetPost", "Post", new { id = post.PostId })
                };
            return Ok(posts);
        }

        public SearchRequest createFromSearchQuery(string userid, string offset, string limit, string input)
        {
            try
            {
                return new SearchRequest(Int32.Parse(userid), Int32.Parse(offset), Int32.Parse(limit), input);
            }
            catch (Exception e)
            {
                System.Console.WriteLine("ERROR!!!: " + e);
                return null;
            }
        }
    }
}