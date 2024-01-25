using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication2.ApiCall;
using WebApplication2.Models;
using Apicalls = WebApplication2.ApiCall.ApiCall;
namespace WebApplication2.Controllers
{
    public class SecurityGroupController : Controller
    {
        // GET: SecurityGroup
        public ActionResult SecurityGroup()
        {
            if (Session["UserName"] == null)
            {
                return RedirectToAction("LoginPage", "LoginPage");
            }
            return View();
        }
        [HttpPost]
        public JsonResult GetUserGroups(string methodName)
        {
            //List<SecurityGroup> UserGroupslist = new List<SecurityGroup>();
            //Apicalls apicalls = new Apicalls();
            //var responseString = apicalls.GetUserGroups("GetUserGroups").ToList();           
            //return UserGroups;
            List<SecurityGroup> userGroupslist = new List<SecurityGroup>();
            Apicalls apicalls = new Apicalls();
            userGroupslist = apicalls.GetUserGroups(methodName);
            return Json(userGroupslist.ToList(), JsonRequestBehavior.AllowGet);

        }
        [HttpPost]
        public JsonResult GetUserBasedonADGroupName(string adgroupname)
        {         
            List<SecurityGroup> UserBasedonADGroupNamelist = new List<SecurityGroup>();
            Apicalls apicalls = new Apicalls();
            UserBasedonADGroupNamelist = apicalls.GetUserBasedonADGroupName("GetUserBasedonADGroupName", adgroupname,null);
            return Json(UserBasedonADGroupNamelist.ToList(), JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public JsonResult GetADGroupsBasedonUserName(string usernameforsearchadgroups)
        {
            List<SecurityGroup> ADGroupsBasedonUserNamelist = new List<SecurityGroup>();
            Apicalls apicalls = new Apicalls();
            ADGroupsBasedonUserNamelist = apicalls.GetUserBasedonADGroupName("GetADGroupsBasedonUserName", null,usernameforsearchadgroups);
            return Json(ADGroupsBasedonUserNamelist.ToList(), JsonRequestBehavior.AllowGet);

        }
        [HttpPost]
        public JsonResult CreateADGroup(string groupname)
        {
            string resultCreateADGroup = ""; ;


            Apicalls apicalls = new Apicalls();
            resultCreateADGroup = apicalls.CreateADGroup("CreateADGroup", groupname);
            return Json(resultCreateADGroup, JsonRequestBehavior.AllowGet);

        }

        

    }
}