sensorCloudApp.controller('addSensorHubController',function($scope,$http){
	$scope.storedStatus=true;
	$scope.submit=function(){
		$http({
			method: "POST",
			url : '/storeSensorHubData',
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
	$http({
        method : "GET",
        url : "/getSensorHubsList"
    }).then(function mySucces(response) {
    	$scope.sensorHubs = response.data.msg;
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    });
});