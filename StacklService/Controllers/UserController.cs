using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using stackl.Controllers.DTO;
using stackl.DataAccessLayer.Login;
using stackl.DataAccessLayer.User;

namespace stackl.Controllers
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
        public ActionResult GetUserMarkings(int userid)
        {
            var markings = repository.GetMarkings(0, 10);
            if (markings == null) return NotFound();

            return loginRepository.isUser(userid, User.Identity.Name, isUser =>
            {
                if (!isUser) return Unauthorized();
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
                return this.SerializeContent<List<DTO.MarkingDTO>>(markingsDTO.ToList());
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

                return this.SerializeContent<bool>(res);
            });
        }
    }
}