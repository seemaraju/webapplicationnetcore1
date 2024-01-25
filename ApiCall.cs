using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Drawing.Drawing2D;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using WebApplication2.Models;
using System.Security.Authentication;
using Microsoft.AspNetCore.Http;
using System.Threading;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Web.UI.WebControls;
using Login = WebApplication2.Models.Login;
using System.Web.Script.Serialization;
using System.Threading.Tasks;

namespace WebApplication2.ApiCall
{
    public class ApiCall
    {
      static  string AccessToken ;
       string ApiUrl = "https://localhost:44369/Login/";
     

        public string GetWindowLogin(string Method)
        {
            var postData="" ;
            var posteddata = Encoding.ASCII.GetBytes(postData);
            var ApiUrl = "https://localhost:44369/Login/"+ Method;
           
            var responseString = "";
            var request = (HttpWebRequest)WebRequest.Create(ApiUrl);
            request.Method = "GET";
            request.ContentType = "application/json";
            request.ContentLength = posteddata.Length;
        
            using (var response1 = request.GetResponse())
            {
                using (var reader = new StreamReader(response1.GetResponseStream()))
                {
                    responseString = reader.ReadToEnd();
                    reader.Close();
                }
            }
            List<Login> models = JsonConvert.DeserializeObject<List<Login>>(responseString);
            AccessToken = models[0].Token;
            return responseString;

        }



        public string LoginWithUserNamePassword(Login data, string Method)
        {
            string username = data.UserName;
            string pass = data.Password;

            var postData = "";
            var data1 = Encoding.ASCII.GetBytes(postData);
          
            var ApiUrl = "https://localhost:44369/Login/" + Method + "/" + data.UserName + "/" + Uri.EscapeDataString(data.Password);
            var responseString = "";
            var request = (HttpWebRequest)WebRequest.Create(ApiUrl);
            request.Method = "POST";
            request.ContentType = "application/json";
            request.ContentLength = data1.Length;
            request.Timeout = Timeout.Infinite;
            request.KeepAlive = true;
            request.ReadWriteTimeout = Timeout.Infinite;
            //request.Headers.Add("Authorization", "Bearer" + AccessToken);
            //HttpWebResponse myHttpWebResponse = (HttpWebResponse)request.GetResponse();
            using (var response1 = (HttpWebResponse)request.GetResponse())
            {
                if (response1.StatusCode == HttpStatusCode.OK)
                {                
                    using (var reader = new StreamReader(response1.GetResponseStream()))
                    {
                        responseString = reader.ReadToEnd();
                        reader.Close();
                    }
                }
            }
            List<Login> models = JsonConvert.DeserializeObject<List<Login>>(responseString);
            AccessToken = models[0].Token;
            return responseString;



          
        }

        public List<POAttribute> UploadExcelData(string Method, IFormFile postedFile)
        {
            List<POAttribute> uploadExcel = new List<POAttribute>();
            var ApiUrl = "https://localhost:44369/Login/" + Method;
        
            var responseString = "";
            var request = (HttpWebRequest)WebRequest.Create(ApiUrl);
            request.Method = "GET";
            request.ContentType = "application/json";

            using (var response1 = request.GetResponse())
            {
                using (var reader = new StreamReader(response1.GetResponseStream()))
                {
                    responseString = reader.ReadToEnd();
                    reader.Close();
                }
            }
            return uploadExcel;

        }

        public List<Audit> GetAuditHeaders(string Method)
        {
           
            string postData = "";
            var ApiUrl = "";
            switch (Method)
            {
                case "GetAuditHeaders":
                    ApiUrl = "https://localhost:44369/Audit/" + Method;
                    break;
                case "GetAuditDetails":
                    ApiUrl = "https://localhost:44369/Audit/" + Method;
                    break;
               
                default:
                    ApiUrl = "https://localhost:44369/Audit/" + Method;
                    break;
            }
            

            
            var data = Encoding.ASCII.GetBytes(postData);
            var responseString = "";
            var request = (HttpWebRequest)WebRequest.Create(ApiUrl);
            request.Method = "POST";
            request.ContentType = "application/json";
            request.ContentLength = data.Length;
            using (var response1 = request.GetResponse())
            {
                using (var reader = new StreamReader(response1.GetResponseStream()))
                {
                    responseString = reader.ReadToEnd();
                    reader.Close();
                }
            }
            List<Audit> AuditHeaderList = JsonConvert.DeserializeObject<List<Audit>>(responseString);
            return AuditHeaderList;
        }


        public List<SecurityGroup> GetUserGroups(string methodName)
        {
           
            string postData = "";
            var data = Encoding.ASCII.GetBytes(postData);
            var ApiUrl = "https://localhost:44369/SecurityGroup/" + methodName;        
            var responseString = "";
            var request = (HttpWebRequest)WebRequest.Create(ApiUrl);
            request.Headers.Add("Authorization", "Bearer " + AccessToken);
            request.Timeout = Timeout.Infinite;
            request.KeepAlive = true;
            request.ReadWriteTimeout = Timeout.Infinite; 
            request.Method = "POST";
            request.ContentType = "application/json";
            request.ContentLength = data.Length;
            using (var response1 = (HttpWebResponse)request.GetResponse())
            {
                if (response1.StatusCode == HttpStatusCode.OK)
                {
                    using (var reader = new StreamReader(response1.GetResponseStream()))
                    {
                        responseString = reader.ReadToEnd();
                        reader.Close();
                    }
                }
            }
            List<SecurityGroup> UserGroupsList = JsonConvert.DeserializeObject<List<SecurityGroup>>(responseString);
            return UserGroupsList;

        }

        public List<SecurityGroup> GetUserBasedonADGroupName(string Method,string adgroupname,string usernameforsearchadgroups)
        {
            string postData = "";
            var ApiUrl = "";
            var data = Encoding.ASCII.GetBytes(postData);
            if (adgroupname != null)
            {
                ApiUrl = "https://localhost:44369/SecurityGroup/" + Method + "/" + adgroupname;
            }
            else if (usernameforsearchadgroups != null)
            {
                ApiUrl = "https://localhost:44369/SecurityGroup/" + Method + "/" + usernameforsearchadgroups;
            }
           
          
            var responseString = "";
            var request = (HttpWebRequest)WebRequest.Create(ApiUrl);
            request.Timeout = Timeout.Infinite;
            request.KeepAlive = true;
            request.ReadWriteTimeout = Timeout.Infinite;
            request.Method = "POST";
            request.ContentType = "application/json";
            request.ContentLength = data.Length;
            using (var response1 = request.GetResponse())
            {
                using (var reader = new StreamReader(response1.GetResponseStream()))
                {
                    responseString = reader.ReadToEnd();
                    reader.Close();
                }
            }
            List<SecurityGroup> UserBasedonADGroupNameList = JsonConvert.DeserializeObject<List<SecurityGroup>>(responseString);
            return UserBasedonADGroupNameList;

        }
        public string CreateADGroup(string methodName,string groupname)
        {
            string postData = "";
            var data = Encoding.ASCII.GetBytes(postData);
            var ApiUrl = "https://localhost:44369/SecurityGroup/" + methodName +"/"+ groupname;
            var responseString = "";
            var request = (HttpWebRequest)WebRequest.Create(ApiUrl);
            request.Timeout = Timeout.Infinite;
            request.KeepAlive = true;
            request.ReadWriteTimeout = Timeout.Infinite;
            request.Method = "POST";
            request.ContentType = "application/json";
            request.ContentLength = data.Length;
            using (var response1 = request.GetResponse())
            {
                using (var reader = new StreamReader(response1.GetResponseStream()))
                {
                    responseString = reader.ReadToEnd();
                    reader.Close();
                }
            }

           //var resultcreateADGroup = JsonConvert.DeserializeObject<dynamic>(responseString);
            return responseString.Replace("\r\n", ""); 

        }

        public string GetToken()
        {
            string postData = "";
            var tokendata = Encoding.ASCII.GetBytes(postData);
         
            ApiUrl = "https://localhost:44369/Login/" + "GenerateToken";
            var responseString = "";
            var request = (HttpWebRequest)WebRequest.Create(ApiUrl);
            request.Method = "Post";
            request.ContentType = "application/json";
            request.ContentLength = tokendata.Length;
            using (var response1 = request.GetResponse())
            {
                using (var reader = new StreamReader(response1.GetResponseStream()))
                {
                    responseString = reader.ReadToEnd();
                    reader.Close();
                }
            }

            var AccessToken1 = JsonConvert.DeserializeObject<dynamic>(responseString);

            responseString = (string)((Newtonsoft.Json.Linq.JContainer)AccessToken1).Last;
            AccessToken = responseString;


            return responseString;

        }
     


       

        public bool CommitData(List<POAttribute> savedata)
        {
            string postData = "";
            var tokendata = Encoding.ASCII.GetBytes(postData);
           
          

            //var json = Encoding.UTF8.GetString(ms.ToArray());
            

            ApiUrl = "https://localhost:44369/Attribute/" + "Commitdata" + "/" + savedata;
          

            var json = JsonConvert.SerializeObject(savedata);

            var httpWebRequest = (HttpWebRequest)WebRequest.Create(ApiUrl);
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Method = "POST";
            //httpWebRequest.ContentLength = tokendata.Length;
            httpWebRequest.ContentLength = Encoding.UTF8.GetByteCount(json);
            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                streamWriter.Write(json);
                streamWriter.Flush();
                streamWriter.Close();
            }
            using (var response1 = httpWebRequest.GetResponse())
            {
                using (var reader = new StreamReader(response1.GetResponseStream()))
                {
                    var responseString = reader.ReadToEnd();
                    reader.Close();
                }
            }

          
            return true;

        }


        


    }
}