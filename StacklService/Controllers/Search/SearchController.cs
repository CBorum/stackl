using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using stackl.DataAccessLayer.Search;
using stackl.Models;
using stackl.Controllers.Post;
using System.Collections.Generic;
using stackl.DataAccessLayer.Post;

namespace stackl.Controllers.Search
{
    [ApiController]
    [Route("api/search")]
    public class SearchController : ControllerBase
    {
        SearchRepository repository;
        PostRepository postRepository;

        public SearchController(SearchRepository repository, PostRepository postRepository)
        {
            this.repository = repository;
            this.postRepository = postRepository;
        }

        [HttpGet]
        [AllowAnonymous]
        [Authorize]
        public async System.Threading.Tasks.Task<ActionResult> SearchAsync([FromQuery] string userid, [FromQuery] string offset, [FromQuery] string limit, [FromQuery] string input)
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
                            Title = post.Title,
                            ParentId = post.ParentId ?? default(int)
                        };
                        
            var postsRes = posts.ToList();
            foreach (var p in postsRes)
            {
                if (p.Title == null) {
                    var parentP = await postRepository.Get(p.ParentId);
                    p.ParentTitle = parentP.Title;
                }  
            }
            return this.SerializeContent<List<PostDTO>>(postsRes);
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