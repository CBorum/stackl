using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using stackl.DataAccessLayer.Comment;

namespace stackl.Controllers {
    [ApiController]
    [Route("api/comment")]
    public class CommentController : ControllerBase {
        [HttpGet("{id}", Name = nameof(GetComment))]
        public async Task<ActionResult> GetComment(int id)
        {
            var comment = await new CommentRepository().Get(id, new CommentOptions(){IncludedModels = new List<string>{"Author"}});  
            if (comment == null) return NotFound();

            return Ok(new CommentDTO
            {
                CommentId = comment.CommentId,
                Score = comment.Score,
                Text = comment.Text,
                CreatedDate = comment.CreatedDate,
                PostId = comment.PostId,
                // Post = new PostDTO {
                //     PostId = comment.Post.PostId,
                //     CreationDate = comment.Post.CreationDate,
                //     Body = comment.Post.Body,
                //     Score = comment.Post.Score,
                //     Title = comment.Post.Title
                // },
                AuthorDTO = new AuthorDTO
                {
                    AuthorId = comment.Post.Author.AuthorId,
                    Name = comment.Post.Author.Name
                }
            });

        }
    }
}