using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using WebApplication2.ApiCall;
using WebApplication2.Models;
using Apicalls = WebApplication2.ApiCall.ApiCall;

namespace WebApplication2.Controllers
{
    public class AuditController : Controller
    {
        // GET: Audit
        public ActionResult Audit()
        {
            if (Session["UserName"] == null)
            {
                return RedirectToAction("LoginPage", "LoginPage");
            }

            return View();

        }

        [HttpPost]
        public JsonResult GetAuditHeaders()
        {
            List<Audit> auditHeaderList = new List<Audit>();
            Apicalls apicalls = new Apicalls();
            auditHeaderList = apicalls.GetAuditHeaders("GetAuditHeaders");          
            return Json(auditHeaderList.ToList(), JsonRequestBehavior.AllowGet);


        }
        [HttpPost]
        public JsonResult GetAuditDetails()
        {
            List<Audit> auditDetailsList = new List<Audit>();
            Apicalls apicalls = new Apicalls();
            auditDetailsList = apicalls.GetAuditHeaders("GetAuditDetails");           
            return Json(auditDetailsList.ToList(), JsonRequestBehavior.AllowGet);
        }
    }
}