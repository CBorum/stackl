using System;
using Microsoft.AspNetCore.Mvc;
using stackl.DataAccessLayer;
using stackl.Models;

namespace stackl.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase {

        [HttpGet("{id}")]
        public ActionResult GetPost(int id)
        {
            System.Console.WriteLine("HALLLLLOOOOOOOOO, " + this.Request.ContentType.Equals("application/json"));
            var p = new Post
            {
                PostId = 1,
                Body = "bra teste"
            };
            return Ok(p);
        }

    }
}