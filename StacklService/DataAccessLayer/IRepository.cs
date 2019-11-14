using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace stackl.DataAccessLayer {
    public interface IRepository<TEntity, TOptions> 
    where TOptions : IOptions, new()
    {
        Task<TEntity> Get(int id);
        Task<TEntity> Get(int id, TOptions options);
        Task<List<TEntity>> GetAll(int offset, int limit);
        Task<List<TEntity>> GetAll(int offset, int limit, TOptions options);
        Task<TEntity> Create(TEntity entity);
        Task<TEntity> Update(TEntity entity);
        Task<Boolean> Delete(int id);
    }
}