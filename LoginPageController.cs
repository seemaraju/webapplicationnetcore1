using System.Collections.Generic;
using System.Security.Principal;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using Login = WebApplication2.Models.Login;
using Apicalls = WebApplication2.ApiCall.ApiCall;
using System;
using Newtonsoft.Json;
using System.Reflection;

namespace WebApplication2.Controllers
{
    public class LoginPageController : Controller
    {
       
        public ActionResult LoginPage()
        {
            return View();
        }

        [HttpPost]
        public ActionResult LoginPage(Login data)
        {
          
           

            if (data.UserName == null && data.Password == null)
            {
                WindowsLogin();


            }
            else
            {

                Apicalls apicalls = new Apicalls();
                var responseString = apicalls.LoginWithUserNamePassword(data, "LoginWithUserNamePassword");
                List<Login> models = JsonConvert.DeserializeObject<List<Login>>(responseString);
                TempData["Model"] = models;
            }

           
            return RedirectToAction("Index","Home");

        }

        [HttpPost]
        public ActionResult WindowsLogin()
        {
            bool GetUserNamePassword;
            Apicalls apicalls = new Apicalls();
            var responseString = apicalls.GetWindowLogin("WindowsLogin");
            //GetUserNamePassword = Convert.ToBoolean(responseString);
             List<Login> windowsmodels = JsonConvert.DeserializeObject<List<Login>>(responseString);
            TempData["Model"] = windowsmodels;

            Session["UserName"] = windowsmodels[0].UserName.ToString();
            TempData["UserName"] = windowsmodels[0].UserName.ToString();
            string domainName;
            domainName = System.Environment.UserDomainName;
            var userName = User.Identity.Name;           
            return RedirectToAction("Index", "Home");

        }

    }
}