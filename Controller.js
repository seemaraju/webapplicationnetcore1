app.controller("myCntrl", function ($scope, myService, $window) {
    $scope.POAttribute = {};
    $scope.uppoNumber ;
    $scope.upattributeType ;
    $scope.upattributeStatus;    
    $scope.upId;
    $scope.IsVisible = false;
    $scope.divitems = true;
    $scope.diverrormessages = false;
    $scope.checkvalidation = false;
    //$scope.uservalidationmsg = null;
    //$scope.passwordvalidationmsg = null;
    //$scope.userpasswordvalidationmsg = null;
    $scope.LoginCheck = function () {


        

    /*  $scope.checkvalidation =  $scope.Validation();*/
      /*  if ($scope.checkvalidation == true) {*/

        var User = {
            UserName: $scope.uName,
            Password: $scope.password
        };
        /*$("#divLoading").show();*/
        var getData = myService.UserLogin(User);
        getData.then(function (msg) {
            if (msg.data == "0") {
                $("#divLoading").hide();
                $("#alertModal").modal('show');
                $scope.msg = "Password Incorrect !";
            }
            else if (msg.data == "-1") {
                $("#divLoading").hide();
                $("#alertModal").modal('show');
                $scope.msg = "Username Incorrect !";
            }
            else {
                uID = msg.data;
                $("#divLoading").hide();
                window.location.href = "/Home/Index";
            }
        });
  /*  }*/
        debugger;
    }

    $scope.Validation = function () {
       
        $scope.uservalidationmsg = "";
        $scope.passwordvalidationmsg = "";
        $scope.userpasswordvalidationmsg = "";

        if ($scope.uName == "") {
           
            $scope.uservalidationmsg = 'Please enter user name';
            $scope.checkvalidation = true;
        }
        if ($scope.uName != "" && $scope.password == "") {
            
            $scope.passwordvalidationmsg = 'Please enter password';
            $scope.checkvalidation = true;
        }
        if ($scope.uName == "" && $scope.password == "") {

            $scope.userpasswordvalidationmsg = 'Please enter valid username and password';
            $scope.checkvalidation = true;
        }
    }  


    $scope.WindowsLoginCheck = function () {
      
        var getWinodwsLoginData = myService.WindowsLogin();
        getWinodwsLoginData.then(function (msg) {
            if (msg.data == "0") {
                $("#divLoading").hide();
                $("#alertModal").modal('show');
                $scope.msg = "Password Incorrect !";
            }
            else if (msg.data == "-1") {
                $("#divLoading").hide();
                $("#alertModal").modal('show');
                $scope.msg = "Username Incorrect !";
            }
            else {
                uID = msg.data;
                $("#divLoading").hide();
                window.location.href = "/Home/Index";
            }
        });
        /*debugger;*/
    }
  
/*});*/


    function clearFields() {
        $scope.uName = '';
        $scope.uPwd = '';
    }
    $scope.alertmsg = function () {
        $("#alertModal").modal('hide');
    }; 
$scope.ShowItemErrormessagediv = function (event) {
   
       var btnid =  event.target.id;
        //$scope.divitems = true;
        //$scope.diverrormessages = false;
        var answer = "";
        switch (btnid) {
            case "btnItems":
                $scope.divitems = true;
                $scope.diverrormessages = false;
                break;
            case "btnErrors":
                $scope.diverrormessages = true;
                $scope.divitems = false;
                break;            
            default:
                $scope.divitems = true;
        }
        return answer;
    }; 
   
    $scope.DeletePOattribute = function (PO) {
       
       
        
        var deleteUser = $window.confirm('Are you sure you want to delete this record?');

        if (deleteUser) {
            $scope.DeletePOAttribute(PO);
        }
        
    }
    $scope.ShowHide = function () {
        $scope.IsVisible = !$scope.IsVisible;
    }
   
    $scope.Validation = function () {
        //if ($scope.Copypastefromexcel === undefined) {
        //    $scope.Copypastefromexcelmsg = "Please copy and paste data from excel.";

        //}
        //if ($scope.Uploadexcelfile === undefined) {
        //    $scope.Uploadexcelfilemsg = "Please select file";

        //}
        
        return;
    }  
    $scope.ClearValidation = function () {
        if ($scope.attributeType !== undefined) {
            $scope.AttributeTypemsg = '';
            
        }
if ($scope.attributeStatus !==undefined ) {
            $scope.AttributeStatusmsg = '';
           
        }
if ($scope.poNumber !== undefined ) {
            $scope.POmsg = '';

          
        }
        return;
    }  
    $scope.ClearModel=  function() {
        $scope.attributeType = 0;
        $scope.attributeStatus = '';
        $scope.poNumber = '';
        $scope.msg = '';
    }  
    $scope.BindSelectedData = function (PO) {

        $scope.poNumber = PO.PONumber;
        $scope.attributeType = PO.AttributeType;
        $scope.attributeStatus = PO.AttributeStatus;

        $scope.uppoNumber = PO.PONumber;
        $scope.upattributeType = PO.AttributeType;
        $scope.upattributeStatus = PO.AttributeStatus;
        $scope.upId = PO.ID;
        $scope.ShowHide();
       
    } 
    $scope.UpdatePOAttribute = function () {
        
       
        for (i = 0; i < Object.keys($scope.POAttribute).length; i++) {
            if (Object.keys($scope.POAttribute[i]).length > 0) {
                if ($scope.POAttribute[i].ID == $scope.upId) {

                
                if ($scope.POAttribute[i].PONumber != $scope.poNumber) {
                    $scope.POAttribute[i].PONumber = $scope.poNumber;
                }
                if ($scope.POAttribute[i].AttributeStatus != $scope.attributeStatus) {
                    $scope.POAttribute[i].AttributeStatus = $scope.attributeStatus;
                }
                if ($scope.POAttribute[i].AttributeType != $scope.attributeType) {
                    $scope.POAttribute[i].AttributeType = $scope.attributeType;
                    }
                }
            }
        }
      
        $scope.ClearModel();
        $scope.ShowHide();
    } 
    $scope.DeletePOAttribute = function (PO) {

        var arr = []
       

        arr = $scope.POAttribute;
    

        
     
       
        $scope.POAttribute = {};

        for (i = 0; i < Object.keys(arr).length; i++) {
            if (Object.keys(arr[i]).length > 0) {
                if (arr[i].ID != PO.ID) {

                    $scope.POAttribute[i] = ({ AttributeType: arr[i].AttributeType, AttributeStatus: arr[i].AttributeStatus, PONumber: arr[i].PONumber, ID: arr[i].ID });
                    
                }

            }
        }

        
    } 
  
    $scope.AddRecords = function () {
        //var POAttribute = {
        //    //AttributeType:'',
        //    //AttributeStatus: '',
        //    //PoNumbers: ''
        //};
        $scope.Validation();
        $scope.psmtest();
        var a = $scope.poNumberAttrTypeAttrStatus;
        
       
       
        $scope.PO = [];
        var attributeStatus = $scope.attributeStatus.split(",");
        var poNumbers = $scope.poNumber.split(",");


        for (var i = 0; i < attributeStatus.length; i++) {
         
                    $scope.POAttribute[i] = ({ AttributeType: $scope.attributeType, AttributeStatus: attributeStatus[i], PONumber: poNumbers[i], ID: i+1 });
             
        }

        $scope.ClearModel();
    }

    $scope.psmtest = function ()
    {
        var a = $scope.poNumberAttrTypeAttrStatus;

        var psmtext = $scope.poNumberAttrTypeAttrStatus;
       /* var st = psmtext.value;*/
     var   Ast = $scope.poNumberAttrTypeAttrStatus.split("\n");
        var numrows = Ast.length;



        var ii;
        var xs = [];
        var ys = [];
        for (ii = 0; ii < numrows; ii++) {
            // tab or comma deliminated data

            ys[ii] = Ast[ii].split("\t")
            $scope.POAttribute[ii] = ({ AttributeType: ys[ii][2], AttributeStatus: ys[ii][1], PONumber: ys[ii][0], ID: ii + 1 });

            //if (Ast[ii].split(",", 2)[1] != null)
            //{
            //    ys[ii] = Ast[ii].split(",")[1]; xs[ii] = Ast[ii].split(",")[0];
            //}
            //if (Ast[ii].split("\t", 2)[1] != null)
            //{
            //    ys[ii] = Ast[ii].split("\t")[1]; xs[ii] = Ast[ii].split("\t")[0];
            //}
        }



        //var xss = [];
        //var yss = [];
        //var numgoodrows = 0;
        //var iii = 0;
        //for (ii = 0; ii < numrows; ii++) {
        //    if (xs[ii] != null && ys[ii] != null) {
        //        xss[iii] = xs[ii];
        //        yss[iii] = ys[ii];
        //        iii++;
        //    }
        //}
        //numgoodrows = iii;
        //// next I need to convert to floating point array var xf = [], var yf = [];



        //var xf = [];
        //var yf = [];
        //for (ii = 0; ii < numgoodrows; ii++) {
        //    xf[ii] = parseFloat(xss[ii]);
        //    yf[ii] = parseFloat(yss[ii]);
        //}



    }



});