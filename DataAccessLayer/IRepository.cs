using System;
using System.Collections.Generic;

namespace stackl {
    public interface IRepository<T> {
        public T Get(int id);
        public List<T> GetAll();
        public T Create(T entity);
        public T Update(T entity);
        public Boolean Delete(T entity);
    }
}