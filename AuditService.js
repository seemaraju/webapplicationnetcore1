app.service("auditService", function ($http) {


    this.getAuditHeaders = function (methodName) {
        var apiurl = "";
        switch (methodName) {
            case "GetAuditHeaders":
                apiurl = "/Audit/GetAuditHeaders";
                break;
            case "GetAuditDetails":
                apiurl = "/Audit/GetAuditDetails"
                break;

            default:
                apiurl = "/Audit/GetAuditHeaders";
                break;
        }
        return $http({
            method: "post",
            url: apiurl ,
            dataType: "json"
        })
         .then(function onSuccess(response) {
           
            return   response.data;
        }).catch(function onError(response) {
            // Handle error
            console.log(response);
        });
       
    }
    this.getAuditDetails = function () {

        var response = $http({
            method: "post",
            url: "/Audit/GetAuditDetails",
            dataType: "json"

        });
        return response;
    }
    //this.getAuditHeaders = function () {
    //    $http({
    //        method: "post",
    //        url: "/Audit/GetAuditHeaders",
            
    //    }).then(function onSuccess(response) {
    //     /*   $scope.poattributedetails = response.data;*/
    //        return response.data;
    //    }).catch(function onError(response) {
    //        // Handle error
    //        console.log(response);
    //    });
    //};


});