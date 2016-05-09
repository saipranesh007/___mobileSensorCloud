sensorCloudApp.controller('sensorAdminCloudController', function($scope, $http){
	
});
sensorCloudApp.controller('viewSensorHubController',function($scope,$http){
	$http({
		method : "GET",
		url : '/getSensorHubsList',
	}).success(function(result) {
		if(result.status == "success"){
			$scope.sensorHubs = result.msg;
		}
		else if(result.status=="fail")
		{
			//if(result.msg=='Incorrect Login'){
			//	alert("Incorrect Login. Please try again");
			//}
		}
	}).error(function(error) {
		$scope.unexpected_error = false;
	});
	
	$scope.deleteSensorHub=function(sensorHubName){
		$http({
			method:"POST",
			url:'/deleteSensorHub',
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
});