using stackl.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace stackl.DataAccessLayer.Post
{
    public class PostRepository : Repository<Models.Post, PostOptions>
    {

        raw2Context context = new raw2Context();

        public async Task<Models.Post> GetComplete(int id)
        {
            return await context.Post
                .Include(p => p.PostTag)
                    .ThenInclude(pt => pt.Tag)
                .Include(p => p.InverseAcceptedAnswer)
                .Include(p => p.PostLinkFromPost)
                    .ThenInclude(pl => pl.ToPost)
                .Include(p => p.Author)
                .Include(p => p.InverseParent)
                    .ThenInclude(p => p.Author)
                .Include(p => p.InverseParent)
                    .ThenInclude(p => p.Comment)
                .Include(p => p.Comment)
                    .ThenInclude(c => c.Author)
                .FirstOrDefaultAsync(p => p.PostId == id);
        }
    }
}