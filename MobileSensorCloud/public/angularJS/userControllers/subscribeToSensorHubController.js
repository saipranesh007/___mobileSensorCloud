sensorCloudApp.controller('subscribeToSensorHubController',function($scope,$http){
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