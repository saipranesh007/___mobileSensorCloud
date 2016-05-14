sensorCloudApp.controller('waterLevelController', function($scope, $http){
	var ctx = document.getElementById("radarChart");
	var myRadarChart = new Chart(ctx, {
	    type: 'radar',
	    data: {
	    	labels : ["Apr 12","Apr 13","Apr 14","Apr 15",
	                  "Apr 16","Apr 17","Apr 18","Apr 19","Apr 20",
	                  "Apr 21","Apr 22","Apr 23","Apr 24","Apr 25",
	                  "Apr 26","Apr 27","Apr 28","Apr 29","Apr 30",
	                  "May 01","May 02","May 03","May 04","May 05",
	                  "May 06","May 07","May 08","May 09","May 10"],
		    datasets: [
		        {
		            label: "Water Level(in fts)",
		            backgroundColor: "rgba(179,181,198,0.2)",
		            borderColor: "rgba(179,181,198,1)",
		            pointBackgroundColor: "rgba(179,181,198,1)",
		            pointBorderColor: "#fff",
		            pointHoverBackgroundColor: "#fff",
		            pointHoverBorderColor: "rgba(179,181,198,1)",
		            data: [5.44, 5.34, 7.6, 4.8, 6.1, 7.1, 6.69,6.33,5.7,8.49,8.53,
		                   3.37,8.36,5.87,7.6,7.15,5.41,7.48,5.67,7.54,5.93,3.77,
		                   3.11,6.03,8.89,4.06,8.46,9.28,8.23]
		        }
		    ]
	    },
	    options: {
            scale: {
                reverse: true,
                ticks: {
                    beginAtZero: true
                }
            }
	    }
	});
});