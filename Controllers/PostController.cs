using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using stackl.DataAccessLayer;
using stackl.DataAccessLayer.Post;
using stackl.Models;

namespace stackl.Controllers {
    [ApiController]
    [Route("api/post")]
    public class PostController : ControllerBase {

        PostRepository repository;

        public PostController(PostRepository repository){
            this.repository = repository;
        }

        [HttpGet("{id}", Name = nameof(GetPost))]
        public async Task<ActionResult> GetPost(int id)
        {
            var post = await repository.Get(id);
            if (post == null) return NotFound();
            
            return Ok(new PostDTO()
            {
                PostId = post.PostId,
                Title = post.Title,
                Body = post.Body,
                Score = post.Score,
                CreationDate = post.CreationDate,
                PostURI = Url.Link(
                    nameof(GetPost),
                    new { id = post.PostId })
            });
        }
        

    }
}