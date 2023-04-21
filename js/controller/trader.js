myApp.controller("traderController",
function($scope,Factory,$rootScope){
    let notConnected;

    if(sessionStorage.getItem("connected") != "true"){
        window.location.href = '#!/login';
        notConnected = true;
    }

    $rootScope.loading = true;
    $rootScope.footer = true;
    $rootScope.networkSelection = "unselected";
	$rootScope.traderSelection = "selected";
	$rootScope.addTraderSelection = "unselected";

    if($rootScope.clearNetworkInterval != undefined){
        $rootScope.clearNetworkInterval()
    };

    function updateTraderList(){
        if(notConnected)
        {
            return;
        }
        Factory.getSubscriptionList().then(
            (data)=>{

                if(data.retCode == 0){
                    let traderList = data.result.list;

                    for(let i in traderList){

                        traderList[i].index = i;

                        switch(traderList[i].state){
                            case "stopped": 
                                traderList[i].actionButtonText = "Start"; 
                                $scope.traderButtonBackColor = "buttonColorGreen";
                                break;
                            case "running":
                                traderList[i].actionButtonText = "Soft Stop"; 
                                $scope.traderButtonBackColor = "buttonColorRed";
                                break;
                            case "soft stop":
                                traderList[i].actionButtonText = "Brutal Stop"; 
                                $scope.traderButtonBackColor = "buttonColorRed";
                                break;
                            default:
                                traderList[i].actionButtonText = "Error"; 
                                $scope.traderButtonBackColor = "buttonColorGrey";
                                break;
                        }
                    }

                    $scope.traderList = traderList;
                }
                else if(data.retCode == 10){
                    alert("Une erreur d'authentification au serveur est survenue, vous allez être déconnecté");
                    sessionStorage.clear();
                }
                else{
                    alert("Erreur lors de l'obtation de la liste des souscriptions");
                }
                
            }
        );
    }

    function loadingButton(index){
        $scope.traderList[index].actionButtonText = "Loading..."; 
        $scope.traderButtonBackColor = "buttonColorGrey";
    }

    $scope.onClickActionButtonEventHandler = (index)=>{
        switch($scope.traderList[index].state){
            case "stopped" : 
                loadingButton(index);
                Factory.launchSubscription($scope.traderList[index].encryptedUid).then(
                    (data)=>{
                        if(data.retCode != 0){
                            if(data.retCode == 10){
                                alert("Une erreur d'authentification au serveur est survenue, vous allez être déconnecté");
                                sessionStorage.clear();
                            }
                            else{
                                alert(data.retMessage);
                            }
                        }
                        updateTraderList();
                    }
                );
                break;
            case "running" : 
                loadingButton(index);
                Factory.softStop($scope.traderList[index].encryptedUid).then(
                    (data)=>{
                        if(data.retCode != 0){
                            if(data.retCode == 10){
                                alert("Une erreur d'authentification au serveur est survenue, vous allez être déconnecté");
                                sessionStorage.clear();
                            }
                            else{
                                alert(data.retMessage);
                            }
                        }
                        updateTraderList();
                    }
                );
                break;
            case "soft stop" : 
                loadingButton(index);
                Factory.brutalStop($scope.traderList[index].encryptedUid).then(
                    (data)=>{
                        if(data.retCode != 0){
                            if(data.retCode == 10){
                                alert("Une erreur d'authentification au serveur est survenue, vous allez être déconnecté");
                                sessionStorage.clear();
                            }
                            else{
                                alert(data.retMessage);
                            }
                        }
                        updateTraderList();
                    }
                );
                break;
            default: 
                alert("Error");
                break;
        }
    }

    $scope.onClickDeleteButtonEventHandler = (index)=> {
        Factory.deleteTrader($scope.traderList[index].encryptedUid).then(
            (data)=>{
                if(data.retCode != 0){
                    if(data.retCode == 10){
                        alert("Une erreur d'authentification au serveur est survenue, vous allez être déconnecté");
                        sessionStorage.clear();
                    }
                    else{
                        alert(data.retMessage);
                    }
                }
                updateTraderList();
            }
        );
    }

    $scope.openTraderSocket = (index) => {
        Factory.openTraderSocket($scope.traderList[index].encryptedUid).then(
            (data)=>{
                if(data.retCode != 0){
                    if(data.retCode == 10){
                        alert("Une erreur d'authentification au serveur est survenue, vous allez être déconnecté");
                        sessionStorage.clear();
                    }
                    else{
                        alert(data.retMessage);
                    }
                }
                updateTraderList();
            }
        );
    }

    updateTraderList();

    let updateTraderListID = setInterval(()=>{updateTraderList();}, 5000);

    $rootScope.clearTraderInterval = function (){
        clearInterval(updateTraderListID);
    }

	$rootScope.loading = false;
}
);