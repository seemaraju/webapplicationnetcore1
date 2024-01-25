var app = angular.module('myApp');
app.service('uploadExcelService', function ($http) {
   
    this.AddRecords = function () {
        var a = $scope.postedFile;

        var response = $http({
            method: "post",
            url: "/POBulkUpdate/ReadExcelFile",
            dataType: "json",
            data: {
                file: $scope.uploadexcelfile
            }
           
        });
        return response;

        // $http({
        //    method: "post",
        //    url: "/POBulkUpdate/Addrecords",         
        //    dataType: "json",
        //    contentType: "application/json; charset=utf-8",
        //    data: {
        //        AttributeStatus: attributeStatus,
        //        PoNumbers: poNumbers
        //    }
           
        //}).then(function (response) {
        //    return response;
        //        alert(response.data);
        //    })
       /* return response;*/
    }




    this.commitSaveData = function (savedata) {
        return $http({
            method: "post",
            url: "/POBulkUpdate/Commitdata",
            data: { savedata },
            dataType: "json"
        })
            .then(function onSuccess(response) {

                return response.data;
            }).catch(function onError(response) {
                // Handle error
                console.log(response);
            });

    }
    /*JSON.stringify({ POData: POData })*/

    //this.GetAllData = function () {
    //    $http({
    //        method: "get",
    //        url: "/POBulkUpdate/GetAllRecords",
          
    //    }).then(function (response) {
    //     /*   $scope.poattributedetails = response.data;*/
    //        return response;
    //    }, function () {
    //        alert("Error Occur");
    //    })
    //};
});  