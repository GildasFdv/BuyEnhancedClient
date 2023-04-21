myApp.controller("loginController",
function($scope,Factory,$rootScope){
    if(sessionStorage.getItem("connected") == "true"){
        window.location.href = '#!/trader';
    }

    $rootScope.loading = true;
    $rootScope.footer = false;
    $rootScope.networkSelection = "unselected";
	$rootScope.traderSelection = "unselected";
	$rootScope.addTraderSelection = "selected";
    
    if($rootScope.clearNetworkInterval != undefined){
        $rootScope.clearNetworkInterval()
    };

    if($rootScope.clearTraderInterval != undefined){
        $rootScope.clearTraderInterval();
    }

    $scope.connexionButtonText = "Connexion";

    function setButtonColor(){
        if($scope.password == undefined){
            $scope.connexionButtonBackColor = "disabledClassicButton";
        }
        else{
            $scope.connexionButtonBackColor = "classicColor";
        }
    }

    setButtonColor();

    $scope.onChangeEvantHandler = function(){
        setButtonColor();
    }

    $scope.Connexion = function(){
        $scope.connexionButtonText = "Loading...";
        $scope.connexionButtonBackColor = "buttonColorGrey";
        if($scope.password != undefined){
            Factory.verifyPassword($scope.password).then(
                (data)=>{
                    if(data.retCode == 0){
                        if(data.result.isValid == true){
                            Factory.setPassword($scope.password);
                            sessionStorage.setItem("connected", true);
                            window.location.href = "#!/trader";
                        }
                        else{
                            alert("Mot de passe incorrect");
                            $scope.connexionButtonText = "Connexion";
                            $scope.connexionButtonBackColor = "classicColor";
                        }
                    }
                    else{
                        alert(data.retMessage);
                    }
                }
            )
        }
    }

	$rootScope.loading = false;
}
);
/*
// Save data to sessionStorage
sessionStorage.setItem("key", "value");

// Get saved data from sessionStorage
let data = sessionStorage.getItem("key");

// Remove saved data from sessionStorage
sessionStorage.removeItem("key");

// Remove all saved data from sessionStorage
sessionStorage.clear();

*/