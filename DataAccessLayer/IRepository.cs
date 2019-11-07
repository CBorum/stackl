using System;
using System.Collections.Generic;

namespace stackl.DataAccessLayer {
    public interface IRepository<T> {
        T Get(int id);
        List<T> GetAll();
        T Create(T entity);
        T Update(T entity);
        Boolean Delete(T entity);
    }
}