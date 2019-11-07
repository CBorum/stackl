using Microsoft.AspNetCore.Mvc;
using stackl.DataAccessLayer;

namespace stackl.Controllers
{

    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        [HttpGet("{id}/posts")]
        public ActionResult GetUserMarkings(int id)
        {
            var markings = new UserRepository().GetMarkings(0, 10);
            if (markings == null) return NotFound();



            return Ok(markings);
        }

    } 
}