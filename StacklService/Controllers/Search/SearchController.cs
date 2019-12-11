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

        [HttpGet("wc")]
        [AllowAnonymous]
        [Authorize]
        public ActionResult SearchWordCloud([FromQuery] string input)
        {
            var query = CreateFromSearchQuery(User.Identity.Name, "0", "10", input);
            if (query == null) return BadRequest();
            var res = repository.WordCloudSearch(query.userid, query.input);
            if (res == null) return NotFound();

            IEnumerable<WordCloudDTO> returlist = from term in res
                select new WordCloudDTO()
                {
                    Text = term.Term,
                    Value = term.Term_Count
                };
            
            return Ok(returlist);
        }

        [HttpGet]
        [AllowAnonymous]
        [Authorize]
        public ActionResult Search([FromQuery] string offset, [FromQuery] string limit, [FromQuery] string input)
        {
            var query = CreateFromSearchQuery(User.Identity.Name, offset, limit, input);
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
                            Author = new Author.AuthorDTO
                            {
                                AuthorId = post.Author.AuthorId,
                                Name = post.Author.Name
                            },
                            Parent = post.Parent != null ? new PostDTO
                            {
                                PostId = post.Parent.PostId,
                                Body = post.Parent.Body,
                                Score = post.Parent.Score,
                                CreationDate = post.Parent.CreationDate,
                                PostURI = Url.ActionLink("GetPost", "Post", new { id = post.Parent.PostId }),
                                Title = post.Parent.Title,
                                Tags = post.Parent.PostTag != null ? post.Parent.PostTag.Select(pt => pt.Tag.Text).ToList() : null,
                                Author = post.Parent.Author != null ? new Author.AuthorDTO
                                {
                                    AuthorId = post.Parent.Author.AuthorId,
                                    Name = post.Parent.Author.Name
                                } : null,
                                AnswersCount = repository.ParentCount(post.ParentId ?? default(int))
                            } : null,
                        };

            // return this.SerializeContent<List<Models.Post>>(res); // FIXME: Mangler fix!
            return Ok(posts.ToList());
        }

        public SearchRequestDTO CreateFromSearchQuery(string userid, string offset, string limit, string input)
        {
            try
            {
                int parsedUserId = 0;
                int parsedOffset = 0;
                int parsedLimit = 10;
                if (userid != null) {
                    parsedUserId = Int32.Parse(userid);
                }

                if (offset != null) {
                    parsedOffset = Int32.Parse(offset);
                }

                if (limit != null) {
                    parsedLimit = Int32.Parse(limit);
                }

                return new SearchRequestDTO(parsedUserId, parsedOffset, parsedLimit, input.ToLower());
            }
            catch (Exception e)
            {
                System.Console.WriteLine("Error when parsing search query: {0}", e);
                return null;
            }
        }
    }
}