using System.Web;
using System.Web.Optimization;
using System.Web.UI.WebControls;

namespace WebApplication2
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            RegisterStyleBundles(bundles);
            RegisterJavascriptBundles(bundles);
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new Bundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/bootstrap.min.css",
                      "~/Content/site.css"));
           
        }
        private static void RegisterStyleBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/css")
                            .Include("~/Content/bootstrap.css")                            
                            .Include("~/Content/carousel.css")
                            .Include("~/Content/site.css")
                            .Include("~/css/Common.css")
                            .Include("~/css/Login.css")
                            
                            );
                            
        }

        private static void RegisterJavascriptBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/js")
                            .Include("~/Scripts/jquery-{version}.js")
                            .Include("~/Scripts/jquery-ui-{version}.js")
                            .Include("~/Scripts/bootstrap.js")
                            .Include("~/Scripts/angular.min.js")                           
                             .Include("~/Content/xlsx-model.js")
                            );
        }
    }
}
