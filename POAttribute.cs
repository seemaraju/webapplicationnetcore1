using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication2.Models
{
    public class POAttribute
    {
       
        public string AttributeType { get; set; }
       
        public string AttributeStatus { get; set; }
      
        public string PONumber { get; set; }
        public string CreatedBy { get; set; }
        public string ComittedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ComittedDate { get; set; }
        public DateTime ProcessingDate { get; set; }
        public int BatchID { get; set; }

        public List<POAttribute> lstpOAttributes { get; set; }
        public List<POAttribute> lstAuditHeaders { get; set; }
        public List<POAttribute> lstAuditDetails { get; set; }
    }
    public class Root
    {
       
        public bool success { get; set; }
        public int status { get; set; }
    }
}