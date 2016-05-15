sensorCloudApp.controller('windSpeedController',function($scope,$http){
	$http({
		method:"GET",
		url:"/registeredSensorsHubs"
	}).then(function myFunction(response){
		$scope.sensorHubs = response.data.msg;
	},function myError(response){
		
	});
	
	$scope.getWindSpeedData=function(sensorHubName,type){
		$http({
			method:"POST",
			url:"/getSensorData",
			data:{
				"sensorHubName":sensorHubName,
				"type":type
			}
		}).success(function(response){
			if(response.status=="success"){
				var ctx = document.getElementById("lineChart");
				var axis=[];
				var data=[];
				for(var i=0;i<response.msg.length;i++){
					axis.push(response.msg[i].date);
					data.push(response.msg[i].value);
				}
				var myChart = new Chart(ctx, {
				    type: 'line',
				    data: {
				        labels : axis,
					    datasets: [
					    {
					    	label:" Wind Speed(in fts)",
					        fillColor : "#810541",
					        backgroundColor: "#810541",
							strokeColor : "#ACC26D",
							pointColor : "#fff",
							pointStrokeColor : "#9DB86D",
							data : data
					    }
					    ]
				    }
				});
			}
		}).error(function(response){
			
		});
	}
});