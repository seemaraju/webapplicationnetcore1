using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication2.Models
{
    public class Login
    {


        public int UserId { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string Department { get; set; }
        public bool IsUserExpired { get; set; }
        public bool IsUserExisiting { get; set; }
        public bool IsAccountLocked { get; set; }
        public string Email { get; set; }           
       public string Domain { get; set; }
        public string Token { get; set; }

    }
}