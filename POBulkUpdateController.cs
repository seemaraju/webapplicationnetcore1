using Microsoft.Ajax.Utilities;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.UI.WebControls;
using System.Xml.Linq;
using WebApplication2.ApiCall;
using WebApplication2.Models;
using Apicalls = WebApplication2.ApiCall.ApiCall;


namespace WebApplication2.Controllers
{
    public class POBulkUpdateController : Controller
    {
        public ActionResult POBulkUpdate()
        {
            //POAttribute model = (POAttribute)TempData["model"];
            //if (model != null )
            //{

            //    return View("~/Views/home/POBulkUpdate.cshtml", model);
            //}
            if (Session["UserName"] == null)
            {
                return RedirectToAction("LoginPage", "LoginPage");
            }

            return View("~/Views/POBulkUpdate/POBulkUpdate.cshtml");
        }

        
    
        public JsonResult Addrecords(string AttributeStatus,string PoNumbers)
        {
            POAttribute pOAttributes =new POAttribute();
            List<POAttribute> lstpOAtt = new List<POAttribute>();
            var attstatus = AttributeStatus.Split(',');
            var ponumber = PoNumbers.Split(',');

            for (var i = 0; i < attstatus.Length - 1; i++)
            {
                for (var j = 0; j < ponumber.Length - 1; j++)
                {
                    if (i == j)
                    {
                         pOAttributes = new POAttribute();
                        pOAttributes.AttributeStatus = attstatus[i];
                        pOAttributes.AttributeType = "2";
                        pOAttributes.PONumber = ponumber[j];                      
                        lstpOAtt.Add(pOAttributes);
                    }


    }
}
            pOAttributes.lstpOAttributes = lstpOAtt;

            //if (ModelState.IsValid)
            //{

            //    // Send email using Model information.
            //    TempData["model"] = pOAttributes;
            //    POAttribute model = (POAttribute)TempData["model"];
            //}
            //var ob = JsonConvert.DeserializeObject<POAttribute>(POData);
            //List<Root> ObjOrderList = JsonConvert.DeserializeObject<List<Root>>(POAttribute);
            //POAttribute[] orderList = new JavaScriptSerializer().Deserialize<POAttribute[]>(POAttribute);
            //var data = JsonConvert.DeserializeObject<Root>(POAttribute);

            //ViewBag.pOAttribute = pOAtt;


            //   return View("POBulkUpdate", pOAtt);
            //return RedirectToAction("POBulkUpdate", "POBulkUpdate");
            // return "Success";
         //var a =   GetAllRecords(pOAttributes.lstpOAttributes);
            return Json(pOAttributes.lstpOAttributes, JsonRequestBehavior.AllowGet);
        }


        //public JsonResult GetAllRecords(List<POAttribute> pOAttributes)
        //{

        //    if (pOAttributes.Count > 0)
        //    {

        //        return Json(pOAttributes.ToArray());
        //    }
        //    else
        //    {
        //        List<POAttribute> Emp = new List<POAttribute>();
        //        return Json(Emp, JsonRequestBehavior.AllowGet);
        //    }


        //}



        [HttpPost]
        public List<POAttribute> ReadExcelFile(IFormFile postedFile)
        {
            List<POAttribute> uploadExcel = new List<POAttribute>();
            Apicalls apicalls = new Apicalls();
            var responseString = apicalls.UploadExcelData("ReadExcelFile", postedFile).ToList();
            //List<POAttribute> uploadExcel = new JavaScriptSerializer().Deserialize<List<POAttribute>>(responseString);
            return uploadExcel;

        }
        [HttpPost]
        public bool Commitdata(List<POAttribute> savedata)
        {
         
            Apicalls apicalls = new Apicalls();
            var responseString = apicalls.CommitData(savedata);
          
            return true;

        }
        
    }
}