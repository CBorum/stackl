using stackl.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace stackl.DataAccessLayer.Post
{
    public class PostRepository : Repository<Models.Post, PostOptions>
    {
        public PostRepository(raw2Context dbContext) : base(dbContext)
        {
            DbContext = dbContext;
        }

        public async Task<Models.Post> GetComplete(int id)
        {
            return await DbContext.Post
                .Include(p => p.PostTag)
                    .ThenInclude(pt => pt.Tag)
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