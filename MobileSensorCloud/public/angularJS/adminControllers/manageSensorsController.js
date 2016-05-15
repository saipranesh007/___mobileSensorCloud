sensorCloudApp.controller('manageSensorsController',function($scope,$http){
	$scope.sensorTypes=["Stream Flow","Stream Height","Water Level","Water Temperature","Wave Height and Direction","Wind Speed and Direction"];
	$http({
        method : "GET",
        url : "/getSensorHubsList"
    }).then(function mySucces(response) {
    	$scope.sensorHubs = response.data.msg;
    	console.log($scope.sensorHubs);
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    });
	
	$scope.getSensors=function(){
		console.log($scope.sensorHubSelection);
		$http({
			method:"POST",
			url:"/getSensors",
			data:{
				"sensorHub":$scope.sensorHubSelection
			}
		}).success(function(response){
			if(response.status=="success"){
				$scope.sensors=response.msg;
				console.log($scope.sensors);
			}
			else if(response.status=="fail")
				alert(response.msg);
		}).error(function(error){
			
		});
	}
	$scope.changeSensorStatus=function(sensorID,sensorStatus,index){
		$http({
			method:"POST",
			url:"/changeSensorStatus",
			data:{
				"sensorID":sensorID,
				"sensorStatus":sensorStatus
			}
		}).success(function(response){
			if(response.status=="success"){
				
			}
			else if(response.status=="fail")
				alert(response.msg);
		}).error(function(error){
			
		});
	}
	$scope.deleteSensor=function(sensorID,index){
		$http({
			method: "POST",
			url : '/deleteSensor',
			data:{
				"sensorID":sensorID
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
	
	$scope.editSensor = function(sensor){
		$scope.sensorID = sensor.sensorID;
		$scope.sensorType=sensor.sensorType;
		$scope.sensorLatitude=sensor.sensorLatitude;
		$scope.sensorLongitude=sensor.sensorLongitude;
		$scope.sensorCity=sensor.sensorCity;
		$scope.sensorHub=sensor.sensorHub;
	}
	
	$scope.saveEditedSensorDetails=function(){
		console.log("edited Details are"+$scope.sensorID+$scope.sensorType+$scope.sensorHub+$scope.sensorLatitude+$scope.sensorLongitude+$scope.sensorCity);
		$http({
			method:'POST',
			url:'/saveEditedSensorData',
			data:{
				"sensorID":$scope.sensorID,
				"sensorType":$scope.sensorType,
				"sensorHub":$scope.sensorHub,
				"sensorLatitude":$scope.sensorLatitude,
				"sensorLongitude":$scope.sensorLongitude,
				"sensorCity":$scope.sensorCity
			}
		}).success(function(response){
			if(response.status=="success"){
				alert("successfully edited");
				window.location.reload();
			}
		}).error(function(error){
			
		});
	}
});