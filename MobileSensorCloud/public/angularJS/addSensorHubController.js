sensorCloudApp.controller('addSensorHubController',function($scope,$http){
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
				alert(result.msg)
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