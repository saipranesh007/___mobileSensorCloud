sensorCloudApp.controller('addSensorHubController',function($scope,$http){
	$scope.storedStatus=true;
	$scope.sensorHubStatus=true;
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
});