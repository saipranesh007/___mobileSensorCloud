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