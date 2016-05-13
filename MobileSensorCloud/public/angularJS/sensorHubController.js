sensorCloudApp.controller('sensorHubController',function($scope,$http){
	$scope.storedStatus=true;
	$scope.submit=function(){
		$http({
			method: "POST",
			url : '/storeSensorHubData',
			data:{
				"sensorHubName":$scope.sensorHubName,
				"sensorHubDescription":$scope.description,
				"sensorHubStatus":$scope.sensorHubStatus,
				"sensorHubAddress":$scope.sensorHubDeploymentAddress,
				"sensorHubCity":$scope.sensorHubDeploymentCity,
				"sensorHubState":$scope.sensorHubDeploymentState,
				"sensorHubCountry":$scope.sensorHubDeploymentCountry
					
			}
		}).success(function(result) {
			if(result.status == "success"){
				$scope.storedStatus=false;
			}
			else if(result.status=="fail")
			{
				alert(result.msg);
			}
		}).error(function(error) {
			$scope.unexpected_error = false;
		});
	};
	$scope.saveSensor=function(){
		$http({
			method: "POST",
			url : '/saveSensor',
			data:{
				"sensorHubName":$scope.sensorHubName,
				"sensorHubDescription":$scope.description,
				"sensorHubType":$scope.sensorHubType,
				"sensorHubStatus":$scope.sensorHubStatus,
				"sensorHubAddress":$scope.sensorHubDeploymentAddress,
				"sensorHubCity":$scope.sensorHubDeploymentCity,
				"sensorHubState":$scope.sensorHubDeploymentState,
				"sensorHubCountry":$scope.sensorHubDeploymentCountry
					
			}
		}).success(function(result) {
			if(result.status == "success"){
				window.location.reload();
			}
			else if(result.status=="fail")
			{
				alert(result.msg);
			}
		}).error(function(error) {
			$scope.unexpected_error = false;
		});
	}
	
	$scope.disableSensorHub=function(sensorHubName,sensorHubStatus){
		var hubStatus="";
		if(sensorHubStatus=="Enable")
			hubStatus=true;
		else
			hubStatus=false;
		$http({
			method: "POST",
			url : '/disableSensorHub',
			data:{
				"sensorHubName":sensorHubName,
				"sensorHubStatus":hubStatus
			}
		}).success(function(result) {
			if(result.status == "success"){
				window.location.reload();
			}
			else if(result.status=="fail")
			{
				alert(result.msg);
			}
		}).error(function(error) {
			$scope.unexpected_error = false;
		});
	}
	$scope.deleteSensorHub=function(sensorHubName){
		$http({
			method: "POST",
			url : '/deleteSensorHub',
			data:{
				"sensorHubName":sensorHubName
			}
		}).success(function(result) {
			if(result.status == "success"){
				window.location.reload();
			}
			else if(result.status=="fail")
			{
				alert(result.msg);
			}
		}).error(function(error) {
			$scope.unexpected_error = false;
		});
	}
	$http({
        method : "GET",
        url : "/getSensorHubsList"
    }).then(function mySucces(response) {
    	$scope.sensorHubs = response.data.msg;
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    });
});
sensorCloudApp.controller('addSensorController',function($scope,$http){
	$scope.storedStatus=true;
	$scope.submit=function(){
		$http({
			method: "POST",
			url : '/saveSensor',
			data:{
				"sensorID":$scope.sensorID,
				"sensorType":$scope.sensorType,
				"sensorHub":$scope.sensorHub,
				"sensorDimensions":$scope.sensorDimensions,
				"sensorSignalType":$scope.sensorSignalType,
				"sensorSignalSpeed":$scope.sensorSignalSpeed,
				"sensorPins":$scope.sensorPins,
				"sensorOutputSignal":$scope.sensorOutputSignal,
				"sensorInstallationDate":$scope.sensorInstallationDate,
				"sensorLatitude":$scope.sensorLatitude,
				"sensorLongitude":$scope.sensorLongitude,
				"sensorCity":$scope.sensorCity,
					
			}
		}).success(function(result) {
			if(result.status == "success"){
				$scope.storedStatus=false;
			}
			else if(result.status=="fail")
			{
				alert(result.msg);
			}
		}).error(function(error) {
			$scope.unexpected_error = false;
		});
	};
});

sensorCloudApp.controller('sensorHubSubscriptionController',function($scope,$http){
	$scope.successfullAddition = true;
	$scope.subscribe=function(sensorHubName){
		$http({
			method:"POST",
			url:"/subscribeToSensors",
			data:{
				"sensorHubName":sensorHubName
			}
		}).success(function(results){
			if(results.status=="success"){
				window.location.reload();
				alert("Subscribed");
			}
		}).error(function(error){
			alert(error);
		});
	}
	
	$http({
		method:"GET",
		url:"/getSensorHubSubscriptions"
	}).then(function myFunction(response) {
    	$scope.sensorHubs = response.data.msg;
    }, function myError(response) {
        
    });
});

sensorCloudApp.controller('viewRegisteredSensorHubsController',function($scope,$http){
	$http({
		method:"GET",
		url:"/registeredSensorsHubs"
	}).then(function myFunction(response){
		$scope.sensorHubs = response.data.msg;
	},function myError(response){
		
	});
	
	$scope.unSubscribeSensorHub=function(sensorHubName){
		$http({
			method:"POST",
			url:"/unSubscribeToSensorHub",
			data:{
				"sensorHubName":sensorHubName
			}
		}).success(function(response){
			if(response.status=="success")
				window.location.reload();
		}).error(function(error){
			
		});
	}
});