using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using stackl.DataAccessLayer;
using stackl.DataAccessLayer.Post;
using stackl.Models;
using stackl.Controllers.DTO;

namespace stackl.Controllers
{
    [ApiController]
    [Route("api/post")]
    public class PostController : ControllerBase
    {

        PostRepository repository;

        public PostController(PostRepository repository){
            this.repository = repository;
        }

        [HttpGet("{id}", Name = nameof(GetPost))]
        public async Task<ActionResult> GetPost(int id)
        {
            // postid 30373
            var post = await repository.GetComplete(id);
            if (post == null) return NotFound();

            var dto = this.postDTOMapper(post);
            return Ok(dto);
        }

        private PostDTO postDTOMapper(Models.Post post)
        {
            var postDTO = PostDTOFromModel(post);
            postDTO.Tags = post.PostTag.Select(pt => pt.Tag.Text).ToList();
            postDTO.PostLinks = post.PostLinkFromPost.Select(pl => PostDTOFromModel(pl.ToPost)).ToList();
            postDTO.Author = AuthorDTOFromModel(post.Author);
            postDTO.AcceptedAnswerPost = PostDTOFromModel(post.AcceptedAnswer);
            postDTO.Answers = post.InverseParent.Select(p =>
            {
                var post = PostDTOFromModel(p);
                post.Author = AuthorDTOFromModel(p.Author);
                post.Comments = p.Comment.Select(c => CommentDTOFromModel(c)).ToList();
                return post;
            }).ToList();
            postDTO.Comments = post.Comment.Select(c => CommentDTOFromModel(c)).ToList();

            return postDTO;
        }

        private PostDTO PostDTOFromModel(Models.Post post)
        {
            return new PostDTO(post.PostId,
                post.CreationDate,
                post.ClosedDate,
                post.Body,
                post.Score,
                Url.Link("GetPost", new { id = post.PostId }),
                post.Title);
        }

        private AuthorDTO AuthorDTOFromModel(Models.Author author)
        {
            return new AuthorDTO(author.Name);
        }

        private CommentDTO CommentDTOFromModel(Models.Comment comment)
        {
            var c = new CommentDTO(comment.CommentId,
                comment.Score,
                comment.Text,
                comment.CreatedDate);
            if (comment.Author != null)
            {
                c.AuthorDTO = AuthorDTOFromModel(comment.Author);
            }
            return c;
        }
    }
}