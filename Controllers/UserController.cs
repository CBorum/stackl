using Microsoft.AspNetCore.Mvc;
using stackl.DataAccessLayer;
using stackl.DataAccessLayer.User;

namespace stackl.Controllers
{

    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        UserRepository repository;

        public UserController(UserRepository repository){
            this.repository = repository;
        }

        [HttpGet("{id}/posts")]
        public ActionResult GetUserMarkings(int id)
        {
            var markings = repository.GetMarkings(0, 10);
            if (markings == null) return NotFound();

            return Ok(markings);
        }
    } 
}