app.controller("auditCntrl", function ($scope, auditService) {

    $scope.IsVisible = false;
    $scope.divauditheaders = true;
    $scope.divauditdetails = false;
    $scope.hideshowfilterdiv = false;
    $scope.getAuditHeadersData = [];
    $scope.getAuditDetailstData = [];
    var methodName = "";
    var filterAuditHeaders = [];
    var filterAuditDetails = [];
    var isClearRecordsbuttonclick = false;
    var isSearchRecordsbuttonclicked = false;
    var ishideshowfilterdiv = false;
    var oldvalue = false;
    $scope.Showhideaudittab = function (event) {

        //var auditHeadersbtn = document.getElementById("btnAuditHeaders");
        //var auditDetailsbtn = document.getElementById("btnAuditDetails");
        var btnid = "";
        if (event.target != undefined) {
            btnid = event.target.id;
        }
        else {
            btnid = event;
        }
      
       
        switch (btnid) {
            case "btnAuditHeaders":
                $scope.divauditheaders = true;
                $scope.divauditdetails = false;
                //auditHeadersbtn.style.backgroundColor = "skyblue";
                //auditDetailsbtn.style.backgroundColor = "lightsteelblue";
                $scope.HighlightActiveButton("GetAuditHeaders");
                if (isSearchRecordsbuttonclicked == false) {
                    $scope.GetAuditHeaders("GetAuditHeaders");
                }
                /*chngcolor();*/
                break;
            case "btnAuditDetails":
                $scope.divauditdetails = true;
                $scope.divauditheaders = false;
                //auditHeadersbtn.style.backgroundColor = "lightsteelblue";
                //auditDetailsbtn.style.backgroundColor = "skyblue";
                $scope.HighlightActiveButton("GetAuditDetails");
                if (isSearchRecordsbuttonclicked == false) {
                    $scope.GetAuditHeaders("GetAuditDetails");
                }

               
                /*chngcolor();*/
                break;
            default:
                $scope.divauditheaders = true;
        }
       
    };


   
    $scope.filter = function () {
       

        if (oldvalue == true) {
            $scope.hideshowfilterdiv = false;
            ishideshowfilterdiv = false;
            oldvalue = false;
        }
        /*  chngcolor();*/
        if (ishideshowfilterdiv == false) {
            $scope.hideshowfilterdiv = true;
            oldvalue = true;
            ishideshowfilterdiv = true;
        }
      
    };

    $scope.style = "red";

 
    $scope.GetAuditHeaders = function (methodName) {

        $scope.HighlightActiveButton(methodName);
      
        var resultAuditHeadersData = auditService.getAuditHeaders(methodName);


        resultAuditHeadersData.then(function (responseAuditHeaders) {

            for (var i = 0; i < responseAuditHeaders.length; i++) {

              
                    $scope.getAuditHeadersData[i] = ({
                        BatchID: responseAuditHeaders[i].BatchID,
                        CreatedBy: responseAuditHeaders[i].CreatedBy,
                        CreatedDate: new Date(),
                        ComittedBy: responseAuditHeaders[i].ComittedBy,
                        ComittedDate: new Date(),
                        ProcessingDate: new Date()

                    });
             
                    $scope.getAuditDetailstData[i] = ({
                        AttributeStatus: responseAuditHeaders[i].AttributeStatus,
                        AttributeType: responseAuditHeaders[i].AttributeType,
                        BatchID: responseAuditHeaders[i].BatchID,
                        ComittedBy: responseAuditHeaders[i].ComittedBy,
                        ComittedDate: new Date(), //responseAuditHeaders[i].ComittedDate,
                        CreatedBy: responseAuditHeaders[i].CreatedBy,
                        CreatedDate: new Date(), //responseAuditHeaders[i].CreatedDate,
                        PONumber: responseAuditHeaders[i].PONumber,
                        ProcessingDate: new Date(), //responseAuditHeaders[i].ProcessingDate

                    });
               
            }
            filterAuditDetails = responseAuditHeaders;
            filterAuditHeaders = responseAuditHeaders;
            

         });
    }

    $scope.HighlightActiveButton = function (methodName) {
        var auditHeadersbtn = document.getElementById("btnAuditHeaders");
        var auditDetailsbtn = document.getElementById("btnAuditDetails");
        if (methodName == "GetAuditHeaders") {
            auditHeadersbtn.style.backgroundColor = "skyblue";
            auditDetailsbtn.style.backgroundColor = "lightsteelblue";
        }
        else if (methodName == "GetAuditDetails") {
            auditHeadersbtn.style.backgroundColor = "lightsteelblue";
            auditDetailsbtn.style.backgroundColor = "skyblue";
        }

    }
    $scope.ClearRecords = function ()
    {
      
       
       
        isSearchRecordsbuttonclicked = false;
        if ($scope.searchponumber != undefined || $scope.searchattributestatus != undefined || $scope.AttributeType != undefined) {
           
            $scope.Showhideaudittab('btnAuditDetails');
        }
        else {
            $scope.Showhideaudittab('btnAuditHeaders');
        }
        $scope.searchponumber = "";
        $scope.searchattributestatus = "";
        $scope.AttributeType = "";
        
    }
    $scope.SearchRecords = function ()
    {
        $scope.lblerrormessage = '';
        if ($scope.searchponumber == undefined || $scope.searchattributestatus == undefined || $scope.searchattributetype == undefined) {
            $scope.lblerrormessage = 'Please enter data in search textbox.'
            return true;
        }
        isSearchRecordsbuttonclicked = true;

        if ($scope.searchponumber != undefined || $scope.searchattributestatus != undefined || $scope.searchattributetype != undefined) {
            //$scope.getAuditDetailstData = filterAuditDetails;

            for (var i = 0; i < filterAuditDetails.length; i++) {
                $scope.getAuditDetailstData[i] = ({
                    AttributeStatus: filterAuditDetails[i].AttributeStatus,
                    AttributeType: filterAuditDetails[i].AttributeType,
                    BatchID: filterAuditDetails[i].BatchID,
                    ComittedBy: filterAuditDetails[i].ComittedBy,
                    ComittedDate: new Date(), //filterAuditDetails[i].ComittedDate,
                    CreatedBy: filterAuditDetails[i].CreatedBy,
                    CreatedDate: new Date(), //filterAuditDetails[i].CreatedDate,
                    PONumber: filterAuditDetails[i].PONumber,
                    ProcessingDate: new Date(), //filterAuditDetails[i].ProcessingDate

                });
            }


            $scope.getAuditDetailstData = $scope.getAuditDetailstData.filter(obj => obj.PONumber == $scope.searchponumber || obj.AttributeStatus == $scope.searchattributestatus || obj.AttributeType == $scope.searchattributetype || obj.BatchID == $scope.searchbatchid || obj.CreatedDate == $scope.searchcreateddate || obj.ComittedDate == $scope.searchcommitteddate);
           
            $scope.Showhideaudittab('btnAuditDetails');
        }
        else {

            for (var i = 0; i < filterAuditDetails.length; i++) {
                $scope.getAuditHeadersData[i] = ({
                    BatchID: filterAuditDetails[i].BatchID,
                    CreatedBy: filterAuditDetails[i].CreatedBy,
                    CreatedDate: new Date(),
                    ComittedBy: filterAuditDetails[i].ComittedBy,
                    ComittedDate: new Date(),
                    ProcessingDate: new Date()

                });
            }




            $scope.getAuditHeadersData = $scope.getAuditHeadersData.filter(obj => obj.BatchID == $scope.searchbatchid || obj.ComittedBy == $scope.searchcommittedby || obj.CreatedBy == $scope.searchcreatedby || obj.CreatedDate == $scope.searchcreateddate || obj.ComittedDate == $scope.searchcommitteddate );
            $scope.Showhideaudittab('btnAuditHeaders');
        }


        
    }

   

    
    
});