class Factory{
	constructor($http, $q){
		this.http = $http;
		this.q = $q;
		this.origin = "http://86.206.187.145:5218";
	}

	updatePassword(){
		if(this.hashInBase64 == undefined){
			this.hashInBase64 = sessionStorage.getItem("hashInBase64");
		}
	}

	async postAPI(origin,endpoint,data) {

		let deffered = this.q.defer();
		fetch(origin+endpoint,{
			method : "POST",
			mode : "cors",
			cache: "no-cache",
			credentials: "same-origin",
			redirect: "follow",
			referrerPolicy: "no-referrer",
			body: JSON.stringify(data)
		}).then((data)=>{deffered.resolve(data.json());},()=>{deffered.reject("Impossible")});

		return deffered.promise;
	}

	getProxyCount(){
		this.updatePassword();

		let data = {
			'buyEnhancedPassword' : this.hashInBase64
		}

		let deffered = this.q.defer();

		this.postAPI(this.origin,"/proxyCount", data).then(
			(data)=>{deffered.resolve(data);},
			()=>{deffered.reject("Impossible");}
		);
			
		return deffered.promise;
	}

	getRemoveState(){
		this.updatePassword();

		let data = {
			'buyEnhancedPassword' : this.hashInBase64
		}

		let deffered = this.q.defer();
		this.postAPI(this.origin,"/isRemoveActiv", data).then(
			(data)=>{deffered.resolve(data);},
			()=>{deffered.reject("Impossible");}
		);

		return deffered.promise;
	}

	getRemovePourcentage(){
		this.updatePassword();

		let data = {
			'buyEnhancedPassword' : this.hashInBase64
		}

		let deffered = this.q.defer();

		this.postAPI(this.origin,"/getRemovePourcentage", data).then(
			(data)=>{deffered.resolve(data);},
			()=>{deffered.reject("Impossible");}
		);
			
		return deffered.promise;
	}

	getAddState(){
		this.updatePassword();

		let data = {
			'buyEnhancedPassword' : this.hashInBase64
		}
		
		let deffered = this.q.defer();
		this.postAPI(this.origin,"/isAddActiv", data).then(
			(data)=>{deffered.resolve(data);},
			()=>{deffered.reject("Impossible");}
		);

		return deffered.promise;
	}

	startRemove(){
		this.updatePassword();

		let data = {
			'buyEnhancedPassword' : this.hashInBase64
		}

		let deffered = this.q.defer();
		this.postAPI(this.origin,"/startRemove", data).then(
			(data)=>{deffered.resolve(data);},
			()=>{deffered.reject("Impossible");}
		);

		return deffered.promise;
	}

	stopRemove(){
		this.updatePassword();

		let data = {
			'buyEnhancedPassword' : this.hashInBase64
		}
		
		let deffered = this.q.defer();
		this.postAPI(this.origin,"/stopRemove", data).then(
			(data)=>{deffered.resolve(data);},
			()=>{deffered.reject("Impossible");}
		);

		return deffered.promise;
	}

	startAdd(){
		this.updatePassword();

		let data = {
			'buyEnhancedPassword' : this.hashInBase64
		}

		let deffered = this.q.defer();

		this.postAPI(this.origin,"/startAdd", data).then(
			(data)=>{deffered.resolve(data);},
			()=>{deffered.reject("Impossible");}
		);

		return deffered.promise;
	}

	stopAdd(){
		this.updatePassword();

		let data = {
			'buyEnhancedPassword' : this.hashInBase64
		}

		let deffered = this.q.defer();

		this.postAPI(this.origin,"/stopAdd", data).then(
			(data)=>{deffered.resolve(data);},
			()=>{deffered.reject("Impossible");}
		);

		return deffered.promise;
	}

	areValidInformations(anEncryptedUid,anApiKey,anApiSecret){
		this.updatePassword();

		let data = {
			'anApiKey' : anApiKey,
			'anApiSecret' : anApiSecret,
			'anEncryptedUid' : anEncryptedUid,
			'buyEnhancedPassword' : this.hashInBase64
		}

		let deffered = this.q.defer();

		this.postAPI(this.origin,"/areValidInformations", data).then(
			(data)=>{deffered.resolve(data);},
			()=>{deffered.reject("Impossible");}
		);
		
		return deffered.promise;
	}

	addTrader(anEncryptedUid,anApiKey,anApiSecret,aPourcentage){
		this.updatePassword();

		let data = {
			'anApiKey' : anApiKey,
			'anApiSecret' : anApiSecret,
			'anEncryptedUid' : anEncryptedUid,
			'aPourcentage' : aPourcentage,
			'buyEnhancedPassword' : this.hashInBase64
		}

		let deffered = this.q.defer();

		this.postAPI(this.origin,"/addTrader", data).then(
			(data)=>{deffered.resolve(data);},
			()=>{deffered.reject("Impossible");}
		);
		
		return deffered.promise;
	}

	getSubscriptionList(){
		this.updatePassword();

		let data = {
			'buyEnhancedPassword' : this.hashInBase64
		}

		let deffered = this.q.defer();

		this.postAPI(this.origin,"/getSubscriptionList",data).then(
			(data)=>{deffered.resolve(data);},
			()=>{deffered.reject("Impossible");}
		);

		return deffered.promise;
	}

	launchSubscription(encryptedUid){
		this.updatePassword();

		let data = {
			'anEncryptedUid' : encryptedUid,
			'buyEnhancedPassword' : this.hashInBase64
		}

		let deffered = this.q.defer();

		this.postAPI(this.origin,"/launchSubscription", data).then(
			(data)=>{deffered.resolve(data);},
			()=>{deffered.reject("Impossible");}
		);
		
		return deffered.promise;
	}

	softStop(encryptedUid){
		this.updatePassword();

		let data = {
			'anEncryptedUid' : encryptedUid,
			'buyEnhancedPassword' : this.hashInBase64
		}

		let deffered = this.q.defer();

		this.postAPI(this.origin,"/softStop", data).then(
			(data)=>{deffered.resolve(data);},
			()=>{deffered.reject("Impossible");}
		);
		
		return deffered.promise;
	}

	brutalStop(encryptedUid){
		this.updatePassword();

		let data = {
			'anEncryptedUid' : encryptedUid,
			'buyEnhancedPassword' : this.hashInBase64
		}

		let deffered = this.q.defer();

		this.postAPI(this.origin,"/brutalStop", data).then(
			(data)=>{deffered.resolve(data);},
			()=>{deffered.reject("Impossible");}
		);
		
		return deffered.promise;
	}

	deleteTrader(encryptedUid){
		this.updatePassword();

		let data = {
			'anEncryptedUid' : encryptedUid,
			'buyEnhancedPassword' : this.hashInBase64
		}

		let deffered = this.q.defer();

		this.postAPI(this.origin,"/deleteTrader", data).then(
			(data)=>{deffered.resolve(data);},
			()=>{deffered.reject("Impossible");}
		);
		
		return deffered.promise;
	}

	openTraderSocket(encryptedUid){
		this.updatePassword();

		let data = {
			'anEncryptedUid' : encryptedUid,
			'buyEnhancedPassword' : this.hashInBase64
		}

		let deffered = this.q.defer();

		this.postAPI(this.origin,"/openTraderSocket", data).then(
			(data)=>{deffered.resolve(data);},
			()=>{deffered.reject("Impossible");}
		);
		
		return deffered.promise;
	}

	closeTraderSocket(){
		this.updatePassword();

		let data = {
			'buyEnhancedPassword' : this.hashInBase64
		}

		let deffered = this.q.defer();

		this.postAPI(this.origin,"/closeTraderSocket", data).then(
			(data)=>{deffered.resolve(data);},
			()=>{deffered.reject("Impossible");}
		);

		return deffered.promise;
	}

	verifyPassword(password){
		let hash = CryptoJS.HmacSHA256(password, "5sq52S@Z+&a=7AmSYSs%nc9Mtt#?-!");
  		let hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

		let data = {
			'password' : hashInBase64
		}

		let deffered = this.q.defer();

		this.postAPI(this.origin,"/verifyPassword", data).then(
			(data)=>{deffered.resolve(data);},
			()=>{deffered.reject("Impossible");}
		);

		return deffered.promise;
	}

	setPassword(password){
		let hash = CryptoJS.HmacSHA256(password, "5sq52S@Z+&a=7AmSYSs%nc9Mtt#?-!");
		sessionStorage.setItem("hashInBase64", CryptoJS.enc.Base64.stringify(hash));
	}
}

myApp.factory('Factory',Factory);

