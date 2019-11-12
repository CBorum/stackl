using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using stackl.Models;

namespace stackl.DataAccessLayer
{
    public abstract class Repository<TEntity, TOptions> : IRepository<TEntity, TOptions>
        where TEntity : class
        where TOptions : IOptions, new()
    {
        private raw2Context DbContext {get; set;}

        public Repository(raw2Context dbContext){
            DbContext = dbContext;
        }

        public async Task<TEntity> Create(TEntity entity)
        {
            using (var dbContext = new raw2Context())
            {
                dbContext.Set<TEntity>().Add(entity);
                await dbContext.SaveChangesAsync();
                return entity;
            }
        }

        public async Task<bool> Delete(int id)
        {
            using (var dbContext = new raw2Context())
            {

                var entity = await dbContext.Set<TEntity>().FindAsync(id);
                if (entity == null)
                {
                    return false;
                }

                dbContext.Set<TEntity>().Remove(entity);
                await dbContext.SaveChangesAsync();

                return true;
            }
        }

        public async Task<TEntity> Get(int id)
        {
            using (var dbContext = new raw2Context())
            {
                return await dbContext.Set<TEntity>().FindAsync(id);
            }
        }

        public async Task<TEntity> Get(int id, TOptions options)
        {
            var entry = await DbContext.Set<TEntity>().FindAsync(id);

            foreach (var model in options.IncludedModels)
            {
                DbContext.Entry(entry).Reference(model).Load();
            }

            return entry;
        }

        public async Task<List<TEntity>> GetAll(int offset, int limit)
        {
            using (var dbContext = new raw2Context())
            {
                return await dbContext.Set<TEntity>().Skip(offset).Take(limit).ToListAsync();
            }
        }

        public async Task<List<TEntity>> GetAll(int offset, int limit, TOptions options)
        {
            using (var dbContext = new raw2Context())
            {
                var x = dbContext.Set<TEntity>().Skip(offset).Take(limit);

                foreach (var model in options.IncludedModels)
                {
                    x = x.Include(model);
                }

                return await x.ToListAsync();
            }
        }

        public async Task<TEntity> Update(TEntity entity)
        {
            using (var dbContext = new raw2Context())
            {
                dbContext.Entry(entity).State = EntityState.Modified;
                await dbContext.SaveChangesAsync();
                return entity;
            }
        }
    }
}