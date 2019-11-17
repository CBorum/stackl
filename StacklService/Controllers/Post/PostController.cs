using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using stackl.DataAccessLayer.Post;
using stackl.Controllers.Comment;
using stackl.Controllers.Author;

namespace stackl.Controllers.Post
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

            // Når der bliver lavet DbContext fix
            var postTask = repository.GetComplete(id);
            var postAnswersTask = repository.GetPostAnswers(id);
            Task.WaitAll(postTask, postAnswersTask);
            var post = postTask.Result;
            var postAnswers = postAnswersTask.Result;
            if (post == null) return NotFound();

            var dto = this.postDTOMapper(post, postAnswers);
            return this.SerializeContent<PostDTO>(dto);
        }

        private PostDTO postDTOMapper(Models.Post post, List<Models.Post> Answers)
        {
            var postDTO = PostDTOFromModel(post);
            postDTO.Tags = post.PostTag.Select(pt => pt.Tag.Text).ToList();
            postDTO.PostLinks = post.PostLinkFromPost.Select(pl => PostAnswerDTOFromModel(pl.ToPost)).ToList();
            postDTO.Author = AuthorDTOFromModel(post.Author);
            postDTO.Answers = Answers
                .Select(p =>
                {
                    var post = PostAnswerDTOFromModel(p);
                    post.Author = AuthorDTOFromModel(p.Author);
                    post.Comments = p.Comment.Select(c => CommentDTOFromModel(c)).ToList();
                    System.Console.WriteLine(post.PostId);
                    return post;
                })
                .ToList();
            // Sæt AcceptedAnswerPost fra Answers
            postDTO.AcceptedAnswerPost = postDTO.Answers.Find(p => p.PostId == post.AcceptedAnswerId);
            postDTO.Answers.Remove(postDTO.AcceptedAnswerPost);
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

        private PostAnswerDTO PostAnswerDTOFromModel(Models.Post post)
        {
            return new PostAnswerDTO(post.PostId,
                post.CreationDate,
                post.Body,
                post.Score);
        }

        private AuthorDTO AuthorDTOFromModel(Models.Author author)
        {
            return new AuthorDTO(author.Name, author.AuthorId);
        }

        private CommentDTO CommentDTOFromModel(Models.Comment comment)
        {
            var c = new CommentDTO(comment.CommentId,
                comment.Score,
                comment.Text,
                comment.CreatedDate);
            if (comment.Author != null)
            {
                c.Author = AuthorDTOFromModel(comment.Author);
            }
            return c;
        }
    }
}