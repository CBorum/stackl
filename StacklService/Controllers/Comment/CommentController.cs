using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using stackl.DataAccessLayer.Comment;
using stackl.Controllers.Post;
using stackl.Controllers.Author;

namespace stackl.Controllers.Comment {
    [ApiController]
    [Route("api/comment")]
    public class CommentController : ControllerBase {

        CommentRepository repository;

        public CommentController(CommentRepository repository){
            this.repository = repository;
        }

        [HttpGet("{id}", Name = nameof(GetComment))]
        public async Task<ActionResult> GetComment(int id)
        {
            var comment = await repository.Get(id, new CommentOptions(){IncludedModels = new List<string>{"Post", "Author"}});  
            if (comment == null) return NotFound();

            var cdto = new CommentDTO
            {
                CommentId = comment.CommentId,
                Score = comment.Score,
                Text = comment.Text,
                CreatedDate = comment.CreatedDate,
                PostId = comment.PostId,
                Post = new PostDTO { // maybe just a postURI
                    PostId = comment.Post.PostId,
                    CreationDate = comment.Post.CreationDate,
                    Body = comment.Post.Body,
                    Score = comment.Post.Score,
                    Title = comment.Post.Title
                },
                Author = new AuthorDTO
                {
                    AuthorId = comment.Author.AuthorId,
                    Name = comment.Author.Name
                }
            };

            return this.SerializeContent<CommentDTO>(cdto);
        }
    }
}