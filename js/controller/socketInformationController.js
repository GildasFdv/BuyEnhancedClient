myApp.controller("socketInformationController",
function($scope,Factory,$rootScope,$routeParams){
    if($rootScope.connected != "true"){
        window.location.href = '#!/login';
    }

    $rootScope.loading = true;
    $rootScope.footer = false;

    if($rootScope.clearNetworkInterval != undefined){
        $rootScope.clearNetworkInterval()
    };

    if($rootScope.clearTraderInterval != undefined){
        $rootScope.clearTraderInterval();
    }


    let endpoint = $routeParams.socketEndpoint;

    $scope.returnButtonLinkValue = endpoint == "trader"? "#!/trader":"#!/network"; 

    let informationSection = document.getElementById("informationSection");

    let displayZone = document.getElementById("informationSection");

    function htmlEscape(str) {
        return str.toString()
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    let origin = "86.206.187.145:5218";

    let socket = new WebSocket("ws://" + origin + "/" + endpoint);

    socket.onopen = function () {
        informationSection.innerHTML = "<div class='information'>"+"Connection opened"+"</div>";
    };

    socket.onclose = function () {
        if(endpoint == "trader"){
            Factory.closeTraderSocket().then(
                (data)=>{
                    if(data.data.retCode != 0){
                        alert(data.data.retMessage);
                    }
                }
            );
        }
    };

    //socket.onerror = updateState;
    socket.onmessage = (event)=>{
        let message = JSON.parse(event.data);
        informationSection.innerHTML += "<div class='"+message.level+"'>"+ message.message +"</div>";
        displayZone.scrollBy(0,informationSection.clientHeight)
    };

    $scope.onClickButtonEventHandler = function () {
        if (!socket || socket.readyState !== WebSocket.OPEN) {
            alert("socket not connected");
        }
        socket.close(1000, "Closing from client");
    };

	$rootScope.loading = false;
}
);