using System.Linq;
using Microsoft.AspNetCore.Mvc;
using stackl.Controllers.DTO;
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

        [HttpGet("{userid}/marking", Name = nameof(GetUserMarkings))]
        public ActionResult GetUserMarkings(int userid)
        {
            var markings = repository.GetMarkings(0, 10);
            if (markings == null) return NotFound();

            var markingsDTO = markings.Select(m => new DTO.Marking 
            {
                Userid = m.UserId,
                RowId = m.RowId,
                Note = m.Note,
                CreationDate = m.CreationDate,
                MarkingURI = Url.Link(
                    m.TableName == "post" ? "GetPost" : "GetComment",
                    new { id = m.RowId }
                )
            });

            return Ok(markingsDTO);
        }
    } 
}