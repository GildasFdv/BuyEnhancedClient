myApp.controller("addTraderController",
function($scope,Factory,$rootScope){

    if(sessionStorage.getItem("connected") != "true"){
        window.location.href = '#!/login';
    }

    $rootScope.loading = true;
    $rootScope.footer = true;
    $rootScope.networkSelection = "unselected";
	$rootScope.traderSelection = "unselected";
	$rootScope.addTraderSelection = "selected";
    
    if($rootScope.clearNetworkInterval != undefined){
        $rootScope.clearNetworkInterval()
    };

    if($rootScope.clearTraderInterval != undefined){
        $rootScope.clearTraderInterval();
    }

    let areInformationsValid = State.undefined;
    let addTraderButtonState = State.disable;

    function updateDisplay(){
        if(areInformationsValid == State.valid && $scope.pourcentage != undefined && addTraderButtonState != State.loading){
            addTraderButtonState = State.enable;
        }

        switch(areInformationsValid){
            case State.undefined: 
				$scope.verifyInformationsButtonText = "Vérifier";
                $scope.verifyInformationsButtonColor = "classicColor";
				break;
            case State.loading: 
				$scope.verifyInformationsButtonText = "Loading...";
                $scope.verifyInformationsButtonColor = "buttonColorGrey";
				break;
			case State.valid: 
				$scope.verifyInformationsButtonText = "Valid";
                $scope.verifyInformationsButtonColor = "buttonColorGreen";
				break;
			case State.invalid: 
				$scope.verifyInformationsButtonText = "Invalid";
                $scope.verifyInformationsButtonColor = "buttonColorRed";
				break;
			default:  
				$scope.verifyInformationsButtonText = "Error";
                $scope.verifyInformationsButtonColor = "buttonColorGreen";
				break;
        }

        switch(addTraderButtonState){
            case State.disable: 
				$scope.addTraderButtonValue = "Ajouter";
                $scope.addTraderButtonBackColor = "disabledClassicButton";
				break;
            case State.loading: 
				$scope.addTraderButtonValue = "Loading...";
                $scope.addTraderButtonBackColor = "buttonColorGrey";
				break;
			case State.enable: 
				$scope.addTraderButtonValue = "Ajouter";
                $scope.addTraderButtonBackColor = "classicColor";
				break;
			default:  
				$scope.addTraderButtonValue = "Error";
                $scope.addTraderButtonBackColor = "buttonColorGrey";
				break;
        }
    }

    $scope.clearFields = function (){
        areInformationsValid = State.undefined;

        $scope.encryptedUid = "";
        $scope.apiKey = "";
        $scope.apiSecret = "";
        $scope.pourcentage = undefined;
        addTraderButtonState = State.disable;

        updateDisplay();
    }

    $scope.onChangeEvantHandler = function (){
        areInformationsValid = State.undefined;
        updateDisplay();
    }

    $scope.eventHandlerClickVerifyInformations = function(){
        if(areInformationsValid == State.undefined){
            areInformationsValid = State.loading;
            updateDisplay();
            Factory.areValidInformations($scope.encryptedUid,$scope.apiKey,$scope.apiSecret).then(
                (data)=>{
                    if(data.retCode != 0){
                        if(data.retCode == 10){
                            alert("Une erreur d'authentification au serveur est survenue, vous allez être déconnecté");
                            sessionStorage.clear();
                        }
                        else{
                            alert(data.retMessage);
                        }

                        areInformationsValid = State.undefined;
                    }
                    else{
                        if(data.result.isValid){
                            areInformationsValid = State.valid;
                        }
                        else{
                            areInformationsValid = State.invalid;
                        }
                    }
                    updateDisplay();
                }
            );
        }
    }

    $scope.addTrader = function (){
        if(areInformationsValid == State.valid){
            addTraderButtonState = State.loading;
            updateDisplay();
            Factory.addTrader($scope.encryptedUid,$scope.apiKey,$scope.apiSecret,$scope.pourcentage).then(
                (data)=>{
                    if(data.retCode == 0){
                        $scope.clearFields();
                        alert("Trader ajouté avec succès");
                        window.location.href = "#!/trader";
                    }
                    else{
                        if(data.retCode == 10){
                            alert("Une erreur d'authentification au serveur est survenue, vous allez être déconnecté");
                            sessionStorage.clear();
                        }
                        else{
                            alert(data.retMessage);
                        }
                    }
                }
            );
        }
    }

    $scope.updateDisplayScope = updateDisplay;

    updateDisplay();

	$rootScope.loading = false;
}
);