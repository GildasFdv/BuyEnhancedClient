myApp.controller("networkController",
function($scope,Factory,$rootScope){
	let notConnected;

	if(sessionStorage.getItem("connected") != "true"){
        window.location.href = '#!/login';
		notConnected = true;
    }

    $rootScope.loading = true;
	$rootScope.footer = true;
	$rootScope.networkSelection = "selected";
	$rootScope.traderSelection = "unselected";
	$rootScope.addTraderSelection = "unselected";
	
	if($rootScope.clearTraderInterval != undefined){
        $rootScope.clearTraderInterval();
    }

	let removeState = State.loading;
	let addState = State.loading;

	let isAddLock = false;
	let isRemoveLock = false;

	function updateDisplay(){
		switch(removeState){
			case State.loading: 
				$scope.removeButtonText = "Loading...";
				$scope.removeButtonBackColor = "buttonColorGrey";
				break;
			case State.running: 
				$scope.removeButtonText = "Stop";
				$scope.removeButtonBackColor = "buttonColorRed";
				break;
			case State.stopped: 
				$scope.removeButtonText = "Start";
				$scope.removeButtonBackColor = "buttonColorGreen";
				break;
			default:  
				$scope.removeButtonText = "Error";
				$scope.removeButtonBackColor = "buttonColorGrey";
				break;
		}

		switch(addState){
			case State.loading: 
				$scope.addButtonText = "Loading...";
				$scope.addButtonBackColor = "buttonColorGrey";
				break;
			case State.running: 
				$scope.addButtonText = "Stop";
				$scope.addButtonBackColor = "buttonColorRed";
				break;
			case State.stopped: 
				$scope.addButtonText = "Start";
				$scope.addButtonBackColor = "buttonColorGreen";
				break;
			default:  
				$scope.addButtonText = "Error";
				$scope.addButtonBackColor = "buttonColorRed";
				break;
		}
	}

	let updateRemoveState = () => {
		if(notConnected){
			return;
		}
		Factory.getRemoveState().then((data)=>{

			if(data.retCode != 0){
				if(data.retCode == 10){
					alert("Une erreur d'authentification au serveur est survenue, vous allez être déconnecté");
					sessionStorage.clear();
				}
				else{
					alert(data.retMessage);
				}
			}
			else{
				let isRemoveActiv = data.result.isActiv;
			
				if(isRemoveActiv){
					removeState = State.running;
				}
				else{
					removeState = State.stopped;
				}

				updateDisplay();
			}
		});
	};
	
	let updateAddState = () => {
		if(notConnected){
			return;
		}
		Factory.getAddState().then((data)=>{

			if(data.retCode != 0){
				if(data.retCode == 10){
					alert("Une erreur d'authentification au serveur est survenue, vous allez être déconnecté");
					sessionStorage.clear();
				}
				else{
					alert(data.retMessage);
				}
			}
			else{
				let isAddActiv = data.result.isActiv;
			
				if(isAddActiv){
					addState = State.running;
				}
				else{
					addState = State.stopped;
				}

				updateDisplay();
			}
		});
	};

	function startRemove(){
		isRemoveLock = true;
		Factory.getRemoveState().then((data)=>{
			if(data.retCode != 0){
				if(data.retCode == 10){
					alert("Une erreur d'authentification au serveur est survenue, vous allez être déconnecté");
					sessionStorage.clear();
				}
				else{
					alert(data.retMessage);
				}
			}
			else{
				let isRemoveActiv = data.result.isActiv;

				if(isRemoveActiv){
					alert("remove était déja activé");
				}
				else{
					Factory.startRemove().then((data)=>
					{
						if(data.retCode != 0){
							alert(data.retMessage);
						}
						else{
							updateRemoveState();
						}
						isRemoveLock = false;
					});
				}
			}
		});
	}

	function stopRemove(){
		Factory.getRemoveState().then((data)=>{
			if(data.retCode != 0){
				if(data.retCode == 10){
					alert("Une erreur d'authentification au serveur est survenue, vous allez être déconnecté");
					sessionStorage.clear();
				}
				else{
					alert(data.retMessage);
				}
			}
			else{
				let isRemoveActiv = data.result.isActiv;

				if(!isRemoveActiv){
					alert("remove était déja désactivé");
				}
				else{
					Factory.stopRemove().then((data)=>
					{
						if(data.retCode != 0){
							alert(data.retMessage);
						}
						else{
							updateRemoveState();
						}
						isRemoveLock = false;
					});
				}
			}
		});
	}

	$scope.removeButtonClickEventHandler = function(){
		isRemoveLock = true;
		if(removeState == State.running){
			removeState = State.loading;
			updateDisplay();
			stopRemove();
		}
		else{
			removeState = State.loading;
			updateDisplay();
			startRemove();
		}
	};

	function startAdd(){
		Factory.getAddState().then((data)=>{
			if(data.retCode != 0){
				if(data.retCode == 10){
					alert("Une erreur d'authentification au serveur est survenue, vous allez être déconnecté");
					sessionStorage.clear();
				}
				else{
					alert(data.retMessage);
				}
			}
			else{
				let isAddActiv = data.result.isActiv;

				if(isAddActiv){
					alert("add était déja acitvé");
				}
				else{
					Factory.startAdd().then((data)=>
					{
						if(data.retCode != 0){
							alert(data.retMessage);
						}
						else{
							updateAddState();
						}
						isAddLock = false;
					});
				}
			}
		});
		isAddLock = false;
	}

	function stopAdd(){
		Factory.getAddState().then((data)=>{
			if(data.retCode != 0){
				if(data.retCode == 10){
					alert("Une erreur d'authentification au serveur est survenue, vous allez être déconnecté");
					sessionStorage.clear();
				}
				else{
					alert(data.retMessage);
				}
			}
			else{
				let isAddActiv = data.result.isActiv;

				if(!isAddActiv){
					alert("add était déja désactivé");
				}
				else{
					Factory.stopAdd().then((data)=>
					{
						if(data.retCode != 0){
							alert(data.retMessage);
						}
						else{
							updateAddState();
							updateRemovePourcentage();
						}
						isAddLock = false;
					});
				}
			}
		});
	}

	$scope.addButtonClickEventHandler = function(){
		isAddLock = true;
		if(addState == State.running){
			addState = State.loading;
			updateDisplay();
			stopAdd();
		}
		else{
			addState = State.loading;
			updateDisplay();
			startAdd();
		}
	};

	function updateProxyCount(){
		if(notConnected){
			return;
		}
		Factory.getProxyCount().then((data)=>{
			if(data.retCode != 0){
				if(data.retCode == 10){
					alert("Une erreur d'authentification au serveur est survenue, vous allez être déconnecté");
					sessionStorage.clear();
				}
				else{
					alert(data.retMessage);
				}
			}
			else{
				$scope.proxyCount = data.result.proxyCount;
				$scope.proxiesCountClassColor = data.result.proxyCount > 2 ? "textColorGreen" : "textColorRed";
			}
		});
	};

	//$scope.displayAddInformationsButton = addState == State.running;
	//$scope.displayRemoveInformationsButton = removeState == State.running;

	function updateRemovePourcentage(){
		if(notConnected){
			return;
		}
		Factory.getRemovePourcentage().then((data)=>{
			if(data.retCode != 0){
				if(data.retCode == 10){
					alert("Une erreur d'authentification au serveur est survenue, vous allez être déconnecté");
					sessionStorage.clear();
				}
				else{
					alert(data.retMessage);
				}
			}
			else{
				$scope.removePourcentage = data.result.pourcentage;
				$scope.pourcentageClassColor = data.result.pourcentage == 100 ? "textColorGreen" : "textColorRed";
			}
		});
	};

	//update affichage
	updateAddState();
	updateRemoveState();
	updateProxyCount();
	updateRemovePourcentage();


	let updateAddId = setInterval(()=>{if(!isAddLock){updateAddState();}}, 5000);
	let updateRemoveId = setInterval(()=>{if(!isRemoveLock){updateRemoveState();}}, 5000);
	let updateProxyCountId = setInterval(updateProxyCount, 5000);
	let updatePourcentageId = setInterval(updateRemovePourcentage, 5000);

	$rootScope.clearNetworkInterval = function (){
		clearInterval(updateAddId);
		clearInterval(updateRemoveId);
		clearInterval(updateProxyCountId);
		clearInterval(updatePourcentageId);
	}

	$rootScope.loading = false;
}
);