using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using stackl.DataAccessLayer.Search;
using stackl.Models;
using stackl.Controllers.Post;
using System.Collections.Generic;

namespace stackl.Controllers.Search
{
    [ApiController]
    [Route("api/search")]
    public class SearchController : ControllerBase
    {
        SearchRepository repository;

        public SearchController(SearchRepository repository){
            this.repository = repository;
        }

        [HttpGet]
        [AllowAnonymous]
        [Authorize]
        public ActionResult Search([FromQuery] string userid, [FromQuery] string offset, [FromQuery] string limit, [FromQuery] string input)
        {
            var query = CreateFromSearchQuery(userid, offset, limit, input);
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
                    PostURI = Url.ActionLink("GetPost", "Post", new { id = post.PostId }),
                    Title = post.Title
                };
                return this.SerializeContent<List<PostDTO>>(posts.ToList());
        }

        public SearchRequestDTO CreateFromSearchQuery(string userid, string offset, string limit, string input)
        {
            try
            {
                return new SearchRequestDTO(Int32.Parse(userid), Int32.Parse(offset), Int32.Parse(limit), input);
            }
            catch (Exception e)
            {
                System.Console.WriteLine("Error when parsing search query: {0}", e);
                return null;
            }
        }
    }
}