using System;
using Microsoft.AspNetCore.Mvc;
using stackl.DataAccessLayer;

namespace stackl.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SearchController : ControllerBase
    {
        SearchDataService sds = new SearchDataService();

        [HttpPost]
        public ActionResult Search(SearchRequest searchRequest)
        {
            var res = sds.ranked_weighted_2_w_body_2(searchRequest.Id, searchRequest.Input);
            if (res == null) return NotFound();
            return Ok(res);
        }
    }
}