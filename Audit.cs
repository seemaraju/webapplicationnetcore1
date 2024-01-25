using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication2.Models
{
    public class Audit
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

        public List<Audit> lstAuditHeaders { get; set; }
            public List<Audit> lstAuditDetails { get; set; }
    }
}