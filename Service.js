app.service("myService", function ($http) {

    this.UserLogin = function (User) {
        var response = $http({
            method: "post",
            /*url: "/Home/LoginPage",*/
            url: "/LoginPage/LoginPage",
            data: JSON.stringify(User),
            dataType: "json"
        });
        return response;
    }

    this.WindowsLogin = function () {
        var response = $http({
            method: "post",           
            url: "/LoginPage/WindowsLogin",            
            dataType: "json"
        });
        return response;
    }

   
   
    this.Addrecords = function (attributeStatus, poNumbers) {

        var response = $http({
            method: "post",
            url: "/POBulkUpdate/Addrecords",
            dataType: "json",
            data: {
                AttributeStatus: attributeStatus,
                PoNumbers: poNumbers
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