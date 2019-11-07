using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using stackl.DataAccessLayer;

namespace stackl.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SearchController : ControllerBase
    {
        SearchRepository sds = new SearchRepository();

        [HttpPost]
        public ActionResult Search(SearchRequest searchRequest)
        {
            var res = sds.RankedWeightedSearch(searchRequest.Id, searchRequest.Offset, searchRequest.Limit, searchRequest.Input);
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
    }
}