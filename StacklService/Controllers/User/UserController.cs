using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using stackl.DataAccessLayer.Login;
using stackl.DataAccessLayer.User;
using stackl.Controllers.Search;

namespace stackl.Controllers.User
{

    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        UserRepository repository;
        LoginRepository loginRepository;

        public UserController(UserRepository repository, LoginRepository loginRepository)
        {
            this.repository = repository;
            this.loginRepository = loginRepository;
        }

        [Authorize]
        [HttpGet("{userid}/marking", Name = nameof(GetUserMarkings))]
        public ActionResult GetUserMarkings(int userid, [FromQuery] int offset = 0, [FromQuery] int limit = 10)
        {
            return loginRepository.isUser(userid, User.Identity.Name, isUser =>
            {
                if (!isUser) return Unauthorized();
                var markings = repository.GetMarkings(offset, limit);
                if (markings == null) return NotFound();

                var markingsDTO = markings.Select(m => new MarkingDTO
                {
                    UserId = m.UserId,
                    PostId = m.RowId,
                    Note = m.Note,
                    CreationDate = m.CreationDate,
                    MarkingURI = Url.Link(
                        m.TableName == "post" ? "GetPost" : "GetComment",
                        new { id = m.RowId }
                    )
                });
                return this.SerializeContent<List<MarkingDTO>>(markingsDTO.ToList());
            });
        }

        [Authorize]
        [HttpGet("{userid}/marking/{markingid}")]
        public ActionResult DeleteMarking(int userid, int markingid)
        {
            return loginRepository.isUser(userid, User.Identity.Name, isUser => 
            {
                if (!isUser) return Unauthorized();
                // TODO: Lav om i markings-tabellen og lav marking_id.
                return null;
            });
        }

        [Authorize]
        [HttpPost("{userId}/marking")]
        public ActionResult PostMarking(int userId, MarkingDTO marking){
            if(userId != int.Parse(User.Identity.Name)){
                return Unauthorized();
            }
            
            var savedMarking = repository.CreateMarking(userId, marking.PostId, marking.Note);

            var savedMarkingDTO = new MarkingDTO(){
                UserId = savedMarking.UserId,
                PostId = savedMarking.RowId,
                CreationDate = savedMarking.CreationDate,
                Note = savedMarking.Note
            };

            return this.SerializeContent<MarkingDTO>(savedMarkingDTO);
        }

        [Authorize]
        [HttpGet("{userid}/searchhistory")]
        public ActionResult GetSearchHistory(int userid)
        {
            return loginRepository.isUser(userid, User.Identity.Name, isUser =>
            {
                if (!isUser) return Unauthorized();
                var searchHistory = repository.GetSearchHistory(userid, 0, 10);
                if (searchHistory == null) return NotFound();

                var SearchEntryDTOs = searchHistory.Select(s => new SearchEntryDTO(s.SearchEntryId, s.Query, s.CreationDate));
                return this.SerializeContent<List<SearchEntryDTO>>(SearchEntryDTOs.ToList());
            });
        }

        [Authorize]
        [HttpDelete("{userid}/searchhistory/{searchentryid}")]
        public ActionResult DeleteSearchHistory(int userid, int searchentryid)
        {
            return loginRepository.isUser(userid, User.Identity.Name, isUser =>
            {
                if(!isUser) return Unauthorized();
                
                var res = repository.DeleteSearchHistory(userid, searchentryid);
                if (!res) return NotFound();

                return NoContent();
            });
        }
    }
}