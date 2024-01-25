var app = angular.module('myApp');
app.controller('uploadExcelCntrl', function ($scope, uploadExcelService, $window) {
    $scope.POAttribute = [];
    $scope.uppoNumber ;
    $scope.upattributeType ;
    $scope.upattributeStatus;    
    $scope.upId;
    $scope.IsVisible = false;
    $scope.divitems = true;
    $scope.diverrormessages = false;
    $scope.IsVisibleexceldiv = false;
    var checkvalidation = false;
    var exceljsondata = [];
    $scope.showvalidationmessage = null;
    $scope.Errorlist = []; 
    var ListOfError = []; 
    var ExcelData = []; 
    var arrwitherror = [];
    var arrcheckIsDataValid = [];
    $scope.boolIsDataValid = false;
    $scope.enabledisablesavevalidationbtn = false;

    

    function clearFields() {
        $scope.uName = '';
        $scope.uPwd = '';
    }
    $scope.alertmsg = function () {
        $("#alertModal").modal('hide');
    }; 
$scope.ShowItemErrormessagediv = function (event) {
    var btnid = "";
    if (event.target != undefined) {
        btnid = event.target.id;
    }
    else
    {
        btnid = event;
    }
    var itembtn = document.getElementById("btnItems");
    var errorbtn = document.getElementById("btnErrors");
        //$scope.divitems = true;
        //$scope.diverrormessages = false;
        var answer = "";
        switch (btnid) {
            case "btnItems":
                $scope.divitems = true;
                $scope.diverrormessages = false;
               
                itembtn.style.backgroundColor = "skyblue";
               
                errorbtn.style.backgroundColor = "lightsteelblue";
                break;
            case "btnErrors":
                $scope.diverrormessages = true;
                $scope.divitems = false;
               
                itembtn.style.backgroundColor = "lightsteelblue";
               
                errorbtn.style.backgroundColor = "skyblue";
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
        
        checkvalidation = false;
        $scope.showvalidationmessage = "";

        //if ((document.getElementById("exceljsondata").innerHTML != '') && ($scope.poNumberAttrTypeAttrStatus != undefined)) {
        //    //alert('Please select excel file or copy paste data from excel file.');
        //    $scope.showvalidationmessage = 'Please select excel file or copy paste data from excel file.';
        //    checkvalidation = true;
        //}
        if (($scope.poNumberAttrTypeAttrStatus == undefined || $scope.poNumberAttrTypeAttrStatus == '') && document.getElementById("inputfile").value == '')
        {
            //alert('Please select excel file or copy paste data from excel file.');
            $scope.showvalidationmessage = 'Please select excel file or copy paste data from excel file.';
            checkvalidation = true;
        }
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
        $scope.poNumberAttrTypeAttrStatus = '';
        if (checkvalidation == false) {
            $scope.showvalidationmessage = '';
        }
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
    

        
     
       
        $scope.POAttribute = [];

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
        //var oldvalue = '';
        //var newvalue = '';
        //var fileinputvalue = document.getElementById("inputfile").value;
        //oldvalue = fileinputvalue;
        //if (oldvalue != newvalue) {
        //    newvalue = oldvalue;
        //}

        $scope.POAttribute = [];

        $scope.boolIsDataValid = false;
        $scope.commitmsg = "";
        $scope.batchNo = "";

        $scope.Validation();

        if (checkvalidation == false) {

            if (document.getElementById("exceljsondata").innerHTML != '') {
                $scope.UploadExcelData();
            }
            if ($scope.poNumberAttrTypeAttrStatus != undefined && $scope.poNumberAttrTypeAttrStatus!='') {
                $scope.CopyPasteExcelData();
            }


            $scope.HighlightActiveButton();
            if ($scope.POAttribute.length > 0) {
                $scope.enabledisablesavevalidationbtn = true;
            }
        }

     

        $scope.ClearModel();
    }
    $scope.HighlightActiveButton = function () {

        var itembtn = document.getElementById("btnItems");
        itembtn.style.backgroundColor = "skyblue";
       
    }
    $scope.ValidateData = function () {

      


        var a = document.getElementById("items").innerText;

     

        var Ast = document.getElementById("items").innerText.split("\t");
        var numrows = Ast.length;
      /*  var ii;*/
        var arrconvertstringdata = [];
        var ys = [];
        var j = 0;
        var k = 0;
        var indexb = 0;
        var indexa = 0;
        var arrwithemptyerror = [];
     
        //arrconvertstringdata = $scope.POAttribute;
    


       
       
        for (indexa = 5; indexa < numrows - 1; indexa = indexa + 5) {


            //if (Ast[indexa + 4] == '' && Ast[indexa + 3] != '') {
            //    var ID = Ast[indexa + 3].substr(Ast[indexa + 3].indexOf('-') + 1, Ast[indexa + 3].length - Ast[indexa + 3].indexOf('-'));
            //    arrconvertstringdata[indexb] = ({ PONumber: Ast[indexa], AttributeType: Ast[indexa + 1], AttributeStatus: Ast[indexa + 2], ErrorMessage: Ast[indexa + 3], ID: ID });
            //}
            //else {
             
                arrconvertstringdata[indexb] = ({ PONumber: Ast[indexa], AttributeType: Ast[indexa + 1], AttributeStatus: Ast[indexa + 2], ErrorMessage: Ast[indexa + 3], ID: indexb + 1 });
            /*}*/
                indexb = indexb + 1;

        }
        arrwithemptyerror = arrconvertstringdata.filter(obj => obj.ErrorMessage == '');
        arrwitherror = arrconvertstringdata.filter(obj => obj.ErrorMessage != '');

        if (arrwithemptyerror.length > 0) {
            $scope.enabledisablesavevalidationbtn = true;
        }

       /* if (arrwithemptyerror.length > 0) {*/
            var rownoerrorlist = 0;
        for (var i = 0; i < arrconvertstringdata.length; i++)
        {
            if (j == 0) {
                j = j + 1;
            }

            for (var m = 0; m < ExcelData.length; m++)
            {
            
                if (ExcelData[m].PONumber == undefined || ExcelData[m].PONumber.replace(/\n/g, '') == '' ||
                    ExcelData[m].AttributeType == undefined || ExcelData[m].AttributeType.replace(/\n/g, '') == '' ||
                    ExcelData[m].AttributeStatus == undefined || ExcelData[m].AttributeStatus.replace(/\n/g, '') == '')
                {
                    if (ExcelData[m].ID == arrconvertstringdata[i].ID)
                    {
                        ExcelData[m].ErrorMessage = 'PO Number or AttributeType or AttributeStatus is missing for record no -' + ExcelData[m].ID;
                        $scope.Errorlist[rownoerrorlist] = ({ ID: ExcelData[m].ID, ErrorMessage: ExcelData[m].ErrorMessage });
                        //var strpo = arrconvertstringdata[i].PONumber.replace(/\n/g, '');
                        //var strAtrributeType = arrconvertstringdata[i].AttributeType.replace(/\n/g, '');
                        $scope.POAttribute[i] = ({ PONumber: arrconvertstringdata[i].PONumber, AttributeType: arrconvertstringdata[i].AttributeType, AttributeStatus: arrconvertstringdata[i].AttributeStatus, ErrorMessage: ExcelData[m].ErrorMessage, ID: arrconvertstringdata[i].ID });
                        ExcelData[m] = ({ PONumber: arrconvertstringdata[i].PONumber, AttributeType: arrconvertstringdata[i].AttributeType, AttributeStatus: arrconvertstringdata[i].AttributeStatus, ErrorMessage: ExcelData[m].ErrorMessage, ID: arrconvertstringdata[i].ID });
                        rownoerrorlist = rownoerrorlist + 1;
                    }
                }
            }
                j = j + 1;
               
         }

       /* }*/

        if (arrwitherror.length > 0)
        {
            var errorrowno = 0;
            for (var j = 0; j < ExcelData.length; j++)
            {                 
                if (ExcelData[j].PONumber != undefined && ExcelData[j].PONumber.replace(/\n/g, '') != '' &&
                    ExcelData[j].AttributeType != undefined && ExcelData[j].AttributeType.replace(/\n/g, '') != '' &&
                    ExcelData[j].AttributeStatus != undefined && ExcelData[j].AttributeStatus.replace(/\n/g, '') != '')
                {
                    for (var k = 0; k < arrwitherror.length; k++)
                    {
                        if (arrwitherror[k].ID == ExcelData[j].ID)
                        {
                            
                            $scope.POAttribute[j]["ErrorMessage"] = '';
                            $scope.Errorlist[errorrowno] = ({ ErrorMessage: '', ID: '' });                           
                            ExcelData[j].ErrorMessage = '';
                            errorrowno = errorrowno + 1;
                            break;
                        }
                    }
                   
                }
            }                    

        }

        $scope.checkIsDataValid();

       

        }
    $scope.GotoItems = function (EL) {
        ListOfError = document.getElementById("errormessages").innerText.split("\n");
        var index = 0;
        var rows = ListOfError.length;
        var xs = [];
        if (EL.ID != undefined) {
            for (var l = 1; l <= rows; l++) {
                xs[l] = ListOfError[l].split("\t")[0];

                if (xs[l] == EL.ID) {
                    $scope.ShowItemErrormessagediv("btnItems");
                    $scope.POAttribute = [];
                    for (var i = 0; i < ExcelData.length; i++) {

                        if (ExcelData[i].ID == EL.ID) {

                            $scope.POAttribute[index] = ({ PONumber: ExcelData[i].PONumber.replace(/\n/g, ''), AttributeType: ExcelData[i].AttributeType, AttributeStatus: ExcelData[i].AttributeStatus, ErrorMessage: ExcelData[i].ErrorMessage, ID: ExcelData[i].ID });

                            break;
                        }
                    }
                }
            }

        }
        if (EL.length > 0)
        {

            $scope.ShowItemErrormessagediv("btnItems");
            $scope.POAttribute = [];
            for (var i = 0; i < ExcelData.length; i++) {

                for (var k = 0; k < EL.length; k++) {
                    if (ExcelData[i].ID == EL[k].ID) {

                        $scope.POAttribute[index] = ({ PONumber: ExcelData[i].PONumber.replace(/\n/g, ''), AttributeType: ExcelData[i].AttributeType, AttributeStatus: ExcelData[i].AttributeStatus, ErrorMessage: ExcelData[i].ErrorMessage, ID: ExcelData[i].ID });

                        index = index + 1;
                    }
                }
            }
        }       
         
     }
    
    


    $scope.CopyPasteExcelData = function ()
    {
        var a = $scope.poNumberAttrTypeAttrStatus;

        var psmtext = $scope.poNumberAttrTypeAttrStatus;
       /* var st = psmtext.value;*/
     var   Ast = $scope.poNumberAttrTypeAttrStatus.split("\n");
        var numrows = Ast.length;



        var ii;
        
        var ys = [];
        for (ii = 0; ii < numrows; ii++) {
            // tab or comma deliminated data

            ys[ii] = Ast[ii].split("\t")
            $scope.POAttribute[ii] = ({ PONumber: ys[ii][0], AttributeType: ys[ii][2], AttributeStatus: ys[ii][1], ErrorMessage:'', ID: ii + 1 });

            
        }
    }

    $scope.UploadExcelData = function () {

        var jsondata = document.getElementById("exceljsondata").innerHTML;
        var arrjsondata = jsondata.substr(jsondata.indexOf('['), (jsondata.lastIndexOf(']') - jsondata.indexOf('[') + 1));
        exceljsondata = angular.fromJson(arrjsondata);
        const newexcelArray = exceljsondata.map(el => {      
            if (el["PO Number"] != undefined || el["Attribute Type"] != undefined || el["Attribute Status"] != undefined) {

                return {
                    PONumber: el["PO Number"],
                    AttributeType: el["Attribute Type"],
                    AttributeStatus: el["Attribute Status"]
                }
            }
            else {
                return {
                    PONumber: el.PONumber,
                    AttributeType: el.AttributeType,
                    AttributeStatus: el.AttributeStatus
                }
            }
        })

        for (var i = 0; i < newexcelArray.length; i++) {

           

            $scope.POAttribute[i] = ({ PONumber: newexcelArray[i]["PONumber"], AttributeType: newexcelArray[i]["AttributeType"], AttributeStatus: newexcelArray[i]["AttributeStatus"], ErrorMessage: '', ID: i + 1, Delete: '' });
            ExcelData[i] = ({ PONumber: newexcelArray[i]["PONumber"], AttributeType: newexcelArray[i]["AttributeType"], AttributeStatus: newexcelArray[i]["AttributeStatus"], ErrorMessage: '', ID: i + 1 ,Delete:''});
        }
    }
 

    $scope.CheckUncheckHeader = function () {
        $scope.IsAllChecked = true;
        for (var i = 0; i < $scope.Errorlist.length; i++) {
            if (!$scope.Errorlist[i].Selected) {
                $scope.IsAllChecked = false;
                break;
            }
        };
    };
   

    $scope.CheckUncheckAll = function () {
        for (var i = 0; i < $scope.Errorlist.length; i++) {
            $scope.Errorlist[i].Selected = $scope.IsAllChecked;
        }
        $scope.GotoItems($scope.Errorlist);
    };


    $scope.checkIsDataValid = function () {
        
        
        var recordfound = false;
        for (var i = 0; i < $scope.POAttribute.length; i++) {
            if ($scope.POAttribute[i].ErrorMessage !='') {
                recordfound = true;
                break;
            }
        };
        if (recordfound == true) {
            $scope.boolIsDataValid = false;
        }
        else {
            $scope.boolIsDataValid = true;
        }
    }
   

    $scope.CommitData = function () {

        $scope.commitmsg = "";
        $scope.batchNo = "";
            var result = uploadExcelService.commitSaveData($scope.POAttribute);
            result.then(function (response) {
                
                if (response == 'True') {
                    $scope.commitmsg = "Data Saved Successfully."
                    $scope.batchNo = 1;
                }
               

            });
       

      
    }
});