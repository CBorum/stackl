using stackl.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace stackl.DataAccessLayer.Post
{
    public class PostRepository : Repository<Models.Post, PostOptions>, IPostRepository
    {
        public PostRepository(raw2Context dbContext) : base(dbContext)
        {
            DbContext = dbContext;
        }

        public async Task<Models.Post> GetComplete(int id)
        {
            using (var context = new raw2Context())
            {
                return await context.Post
                    .Include(p => p.PostTag)
                        .ThenInclude(pt => pt.Tag)
                    .Include(p => p.PostLinkFromPost)
                        .ThenInclude(pl => pl.ToPost)
                    .Include(p => p.Author)
                    .Include(p => p.Comment)
                        .ThenInclude(c => c.Author)
                    .FirstOrDefaultAsync(p => p.PostId == id);
            }
        }

        public async Task<List<Models.Post>> GetPostAnswers(int id)
        {
            using (var context = new raw2Context())
            {
                return await context.Post
                    .Where(p => p.ParentId == id)
                    .Include(p => p.Author)
                    .Include(p => p.Comment)
                        .ThenInclude(c => c.Author)
                    .OrderByDescending(p => p.Score)
                    .ToListAsync();
            }
        }
    }
}