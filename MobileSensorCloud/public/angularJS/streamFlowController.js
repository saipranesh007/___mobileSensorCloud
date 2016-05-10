sensorCloudApp.controller('streamFlowController', function($scope, $http){
	var ctx = document.getElementById("lineChart");
	var myChart = new Chart(ctx, {
	    type: 'line',
	    data: {
	        labels : ["Apr 12","Apr 13","Apr 14","Apr 15",
	                  "Apr 16","Apr 17","Apr 18","Apr 19","Apr 20",
	                  "Apr 21","Apr 22","Apr 23","Apr 24","Apr 25",
	                  "Apr 26","Apr 27","Apr 28","Apr 29","Apr 30",
	                  "May 01","May 02","May 03","May 04","May 05",
	                  "May 06","May 07","May 08","May 09","May 10"],
		    datasets: [
		    {
		    	label:" Stream Flow(in fts)",
		        fillColor : "#810541",
		        backgroundColor: "#810541",
				strokeColor : "#ACC26D",
				pointColor : "#fff",
				pointStrokeColor : "#9DB86D",
				data : [41.9,40.1,35.9,37.5,35.1,31.4,30.0,32.8,28.5,27.1,23.19,53.8,
				        35.1,32.8,28.5,24.4,30,25.6,28.5,27.1,25.6,30,26.3,27,
				        27.6,75.3,28.4,30.7,29.2]
		    }
		    ]
	    }
	});
});