using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using stackl.DataAccessLayer;
using stackl.DataAccessLayer.Post;
using stackl.DataAccessLayer.Search;
using stackl.Models;
using stackl.Controllers.DTO;
using System.Collections.Generic;

namespace stackl.Controllers
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
                    PostURI = Url.ActionLink("GetPost", "Post", new { id = post.PostId })
                };
            return this.SerializeContent<List<DTO.PostDTO>>(posts.ToList());
        }

        public SearchRequest CreateFromSearchQuery(string userid, string offset, string limit, string input)
        {
            try
            {
                return new SearchRequest(Int32.Parse(userid), Int32.Parse(offset), Int32.Parse(limit), input);
            }
            catch (Exception e)
            {
                System.Console.WriteLine("Error when parsing search query: {0}", e);
                return null;
            }
        }
    }
}