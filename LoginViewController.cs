using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Login = WebApplication2.Models.Login;

namespace WebApplication2.Controllers
{
    public class LoginViewController : Controller
    {
        // GET: LoginView
        [HttpPost]
        public ActionResult LoginView(Login data)
        {
            return RedirectToAction("Index", "Home");
        }
        public ActionResult LoginView()
        {
            return View();
        }
    }
}