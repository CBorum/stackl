using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using stackl.Helpers;
using stackl.Models;


namespace stackl.DataAccessLayer.Login
{
    public interface ILoginRepository
    {
        StacklUser Authenticate(string username, string password);
        IEnumerable<StacklUser> GetAll();
        StacklUser GetById(int id);
        StacklUser Create(StacklUser user, string password);
        void Update(StacklUser user, string password = null);
        void Delete(int id);
    }

    public class LoginRepository : ILoginRepository
    {
        private raw2Context _context;

        public LoginRepository(raw2Context context)
        {
            _context = context;
        }

        public StacklUser Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            var user = _context.StacklUser.SingleOrDefault(x => x.Username == username);

            // check if username exists
            if (user == null)
                return null;

            // check if password is correct
            if (!VerifyPasswordHash(password, user.Passwordhash, user.Passwordsalt))
                return null;

            // authentication successful
            return user;
        }

        public IEnumerable<StacklUser> GetAll()
        {
            return _context.StacklUser;
        }

        public StacklUser GetById(int id)
        {
            return _context.StacklUser.Find(id);
        }

        public StacklUser Create(StacklUser user, string password)
        {
            // validation
            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("Password is required");

            if (_context.StacklUser.Any(x => x.Username == user.Username))
                throw new AppException("Username \"" + user.Username + "\" is already taken");

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.Passwordhash = passwordHash;
            user.Passwordsalt = passwordSalt;

            _context.StacklUser.Add(user);
            _context.SaveChanges();

            return user;
        }

        public void Update(StacklUser userParam, string password = null)
        {
            var user = _context.StacklUser.Find(userParam.UserId);

            if (user == null)
                throw new AppException("User not found");

            // update username if it has changed
            if (!string.IsNullOrWhiteSpace(userParam.Username) && userParam.Username != user.Username)
            {
                // throw error if the new username is already taken
                if (_context.StacklUser.Any(x => x.Username == userParam.Username))
                    throw new AppException("Username " + userParam.Username + " is already taken");

                user.Username = userParam.Username;
            }

            // update user properties if provided
            if (!string.IsNullOrWhiteSpace(userParam.Username))
                user.Username = userParam.Username;

            // update password if provided
            if (!string.IsNullOrWhiteSpace(password))
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);

                user.Passwordhash = passwordHash;
                user.Passwordsalt = passwordSalt;
            }

            _context.StacklUser.Update(user);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var user = _context.StacklUser.Find(id);
            if (user != null)
            {
                _context.StacklUser.Remove(user);
                _context.SaveChanges();
            }
        }

        // private helper methods

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }

        public delegate ActionResult isUserDelegate(bool res);
        public ActionResult isUser(int queryId, string id, isUserDelegate cb)
        {
            try
            {
                int userid = Int32.Parse(id);
                return cb(queryId == userid);
            } catch (Exception e) {
                return cb(false);
            }
        }
    }
}