app.controller("securitygroupCntrl", function ($scope, securitygroupService, $window) {
    $scope.divsearchsecuirtygroup = true;
    $scope.showhidecreategroupdiv = false;
    $scope.getUserGroupsData = [];
    $scope.filteradgroupdata = [];
    $scope.filterUserGroupsData = [];
    $scope.searchgroup = function (event) {

        var btnid = event.target.id;


        switch (btnid) {
            case "btnsearchgroup":
                $scope.divsearchsecuirtygroup = true;
                $scope.showhidecreategroupdiv = false;
                $scope.HighlightActiveButton("btnsearchgroup");
                break;
            case "btncreategroup":
                $scope.showhidecreategroupdiv = true;
                $scope.divsearchsecuirtygroup = false;
                $scope.HighlightActiveButton("btncreategroup");
                break;
            default:
                $scope.divsearchsecuirtygroup = true;
        }

    };

    $scope.HighlightActiveButton = function (methodName) {
        var searchgroupbtn = document.getElementById("btnsearchgroup");
        var creategroupbtn = document.getElementById("btncreategroup");
        if (methodName == "GetAllADGroupName" || methodName == "btnsearchgroup") {
            searchgroupbtn.style.backgroundColor = "skyblue";
            creategroupbtn.style.backgroundColor = "lightsteelblue";
        }
        else if (methodName == "btncreategroup") {
            searchgroupbtn.style.backgroundColor = "lightsteelblue";
            creategroupbtn.style.backgroundColor = "skyblue";
        }

    }

    $scope.GetUserGroups = function (methodName) {

        $scope.HighlightActiveButton(methodName);

        var resultUserGroupData = securitygroupService.getUserGroups(methodName);

        resultUserGroupData.then(function (responseUserGroups) {
            for (var i = 0; i < responseUserGroups.length; i++) {
                $scope.getUserGroupsData[i] =
                    ({
                        ADGroup: responseUserGroups[i].ADGroup,
                        UserName: responseUserGroups[i].UserName
                    });
            }
            $scope.filterUserGroupsData = $scope.getUserGroupsData;
        });
    }



    $scope.SearchADGroupName = function () {

        $scope.getUserGroupsData = $scope.getUserGroupsData.filter(obj => obj.ADGroup == $scope.searchADGroupname);


    }
    
    $scope.SearchSecurityGroup = function () {
        $scope.CheckValidationforSearch = '';

        if (($scope.searchgroupname == undefined || $scope.searchgroupname == '') && ($scope.searchusername == '' || $scope.searchusername == undefined)) {
            $scope.CheckValidationforSearch = 'Please enter value in group name or username.'
            return false;
        }


        if (($scope.searchgroupname == undefined || $scope.searchgroupname == '') && $scope.searchusername != undefined) {
           
            $scope.GetADGroupsBasedonUserName();
        }
        else if ($scope.searchgroupname != undefined && ($scope.searchusername == undefined || $scope.searchusername =='')) {
            $scope.GetUserBasedonADGroupName();
        }
        else if ($scope.searchgroupname != undefined && $scope.searchusername != undefined) {

        }
    }

    $scope.GetUserBasedonADGroupName = function () {

        adgroupname = $scope.searchgroupname;

        var resultUsernamebasedonAdGroup = securitygroupService.getUserBasedonADGroupName(adgroupname);
        $scope.getUserGroupsData = [];
        resultUsernamebasedonAdGroup.then(function (responseUsernamebasedonAdGroup) {

            for (var i = 0; i < responseUsernamebasedonAdGroup.length; i++) {
                $scope.getUserGroupsData[i] = ({
                    ADGroup: $scope.searchgroupname,
                    UserName: responseUsernamebasedonAdGroup[i].UserName
                });
            }
        });
    }

    $scope.GetADGroupsBasedonUserName = function () {

       var  usernameforsearchadgroups = $scope.searchusername;

        var resultADGroupsBasedonUserName = securitygroupService.getADGroupsBasedonUserName(usernameforsearchadgroups);
        $scope.getUserGroupsData = [];
        resultADGroupsBasedonUserName.then(function (responseADGroupsBasedonUserName) {
            
            for (var i = 0; i < responseADGroupsBasedonUserName.length; i++) {
                $scope.getUserGroupsData[i] = ({
                    ADGroup: responseADGroupsBasedonUserName[i].ADGroup,
                    UserName: responseADGroupsBasedonUserName[i].UserName
                });
            }
        });
    }

    $scope.SaveNewSecurityGroup = function () {
        $scope.showsuccessmessage = '';
        $scope.ValidationMsg = '';
        if ($scope.groupName == undefined || $scope.groupName == '') {
            $scope.ValidationMsg = 'Please Enter AD Group Name.'
            return false;
        }

        var groupname = $scope.groupName;
        var resultdata = securitygroupService.createADGroup(groupname);
        resultdata.then(function (responsedata) {
            if (responsedata == "Success") {
                $scope.SuccessMessage();
            }
            else if (responsedata == "UnSuccessful") {
                $scope.showsuccessmessage = 'Access Denied';
            }
        });
        
    }
    $scope.SuccessMessage = function () {      

            $scope.showsuccessmessage = "";       
            $scope.showsuccessmessage = 'New AD Group Created';
    }  
    $scope.clearSearchSecurityGroup = function ()
    {
            $scope.searchusername = "";
            $scope.searchgroupname = "";
     }

});