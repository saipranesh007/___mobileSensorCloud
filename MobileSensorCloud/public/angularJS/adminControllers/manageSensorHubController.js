sensorCloudApp.controller('manageSensorHubController',function($scope,$http){
	$scope.disableSensorHub=function(sensorHubName,sensorHubStatus){
		$http({
			method: "POST",
			url : '/disableSensorHub',
			data:{
				"sensorHubName":sensorHubName,
				"sensorHubStatus":sensorHubStatus
			}
		}).success(function(result) {
			if(result.status == "success"){
				
			}
			else if(result.status=="fail")
			{
				alert(result.msg);
			}
		}).error(function(error) {
			
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
