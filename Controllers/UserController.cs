using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using stackl.Controllers.DTO;
using stackl.DataAccessLayer.User;

namespace stackl.Controllers
{

    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        IUserRepository repository;

        public UserController(IUserRepository repository)
        {
            this.repository = repository;
        }

        [Authorize]
        [HttpGet("{userid}/marking", Name = nameof(GetUserMarkings))]
        public ActionResult GetUserMarkings(int userid)
        {
            var markings = repository.GetMarkings(0, 10);
            if (markings == null) return NotFound();

            var markingsDTO = markings.Select(m => new MarkingDTO
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

        [Authorize]
        [HttpGet("{userid}/searchhistory")]
        public ActionResult GetSearchHistory()
        {
            var id = int.Parse(User.Identity.Name);
            var searchHistory = repository.GetSearchHistory(id, 0, 10);
            if (searchHistory == null)
            {
                return NotFound();
            }

            var SearchEntryDTOs = searchHistory.Select(s => new SearchEntryDTO(s.Query, s.CreationDate));
            return Ok(SearchEntryDTOs);
        }

        [Authorize]
        [HttpDelete("{userid}/searchhistory/{searchentryid}")]
        public ActionResult DeleteSearchHistory(int userid, int searchentryid)
        {
            var userId = int.Parse(User.Identity.Name);
            var res = repository.DeleteSearchHistory(userId, searchentryid);
            if (!res)
            {
                return NotFound();
            }
            return Ok(res);
        }
    }
}