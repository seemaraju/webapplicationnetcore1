app.service("securitygroupService", function ($http) {
    this.getUserGroups = function (methodName) {
        var apiurl = "/SecurityGroup/GetUserGroups";
        switch (methodName) {
            case "GetUserGroups":
                methodName = "GetUserGroups";
                break;
            case "GetAllADGroupName":
                methodName = "GetAllADGroupName";
                break;           
            default:
                methodName = "GetUserGroups";
                break;
        }
        return $http({
            method: "post",
            url: apiurl,
            data: {methodName },
            dataType: "json"
        })
            .then(function onSuccess(response) {

                return response.data;
            }).catch(function onError(response) {
                // Handle error
                console.log(response);
            });

    }



    this.getUserBasedonADGroupName = function (adgroupname) {      
        return $http({
            method: "post",
            url: "/SecurityGroup/GetUserBasedonADGroupName",
            data: { adgroupname },
            dataType: "json"
        })
            .then(function onSuccess(response) {

                return response.data;
            }).catch(function onError(response) {
                // Handle error
                console.log(response);
            });

    }

    this.createADGroup = function (groupname) {
        return $http({
            method: "post",
            url: "/SecurityGroup/CreateADGroup", 
            data: { groupname },
            dataType: "json"
        })
            .then(function onSuccess(response) {

                return response.data;
            }).catch(function onError(response) {
                // Handle error
                console.log(response);
            });

    }



    this.getADGroupsBasedonUserName = function (usernameforsearchadgroups) {
        return $http({
            method: "post",
            url: "/SecurityGroup/GetADGroupsBasedonUserName",
            data: { usernameforsearchadgroups },
            dataType: "json"
        })
            .then(function onSuccess(response) {

                return response.data;
            }).catch(function onError(response) {
                // Handle error
                console.log(response);
            });

    }

    

});