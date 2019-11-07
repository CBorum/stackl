using System;
using Microsoft.AspNetCore.Mvc;
using stackl.DataAccessLayer;
using stackl.Models;

namespace stackl.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase {

        [HttpGet("{id}", Name = nameof(GetPost))]
        public ActionResult GetPost(int id)
        {
            return Ok();
        }
        

    }
}