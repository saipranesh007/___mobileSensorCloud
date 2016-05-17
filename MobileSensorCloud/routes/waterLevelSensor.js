
var mongo = require("../routes/mongo");
var request = require("request");



function getSensorData(sensor){
	
	//var sensor="urn:ioos:station:NOAA.NOS.CO-OPS:9416841";
	//console.log(sensor);
	//var avg = 0;
	var date = new Date();
	console.log("current date is"+date.getMonth()+1);
	var myDate = date.toString();
	var finalDate = (date.getMonth()+1)+"-"+myDate.substr(8,2)+"-"+date.getFullYear();
	var time = myDate.substr(16,5);
	console.log("time is"+time);
	
	date.setHours ( date.getHours() - 7 );	
	//console.log("current date:"+date);
	var toDate = date.toISOString();	//toISOString gives time in ISO Formatted ISO Time.
	date.setMinutes( date.getMinutes() - 15 );
	var fromDate = date.toISOString();
	console.log(fromDate);
	console.log(toDate);
	console.log(sensor + " this is the sensor ");
	var url = "http://erddap.axiomdatascience.com/erddap/tabledap/cencoos_sensor_service.json?time,depth,station,parameter,unit,value&time>"+
		fromDate + "&time<" + toDate + "&station=%22" +
		sensor +
		"%22&parameter=%22Water%20Level%22&unit=%22ft%22";
	console.log(url);
	request({
	    url: url,
	    json: true
	}, function (error, response, body) {
		if(response.statusCode==200){
	   console.log(body.table.rows);
	   
	   var data = body.table.rows;
	   var value = 0;
	   for(var j=0;j<data.length;j++){
		  console.log(data[j][5]);
		   var value = value + data[j][5];
	   }
	   var avg = value/data.length;
	   console.log("am in avg"+avg);
	   
	   checkInDatabase(sensor,finalDate,time,avg);
	   
		}
		else{
			console.log("no data");
		}
	});
};






function checkInDatabase (sensor,date,time,avgValue){
	//var fullDate=month+" "+date;
	
	(function check(){
	
		mongo.connect(function(err,db){
			var coll = mongo.collection('waterLevelDataCollection');
			coll.findOne({"sensorID":sensor,"date":date},function(err,results){
				if(err){
					
				}
				else{
					if(results==null){
						//insertDataToDatabase(sensor,fullDate,time,avgValue);
						var insert_details_query={'sensorID':sensor,
								'date':date,
								'dateAvg':[{'time':time,'avg':avgValue}]
						};
						coll.insert(insert_details_query,function(err,result){
							if(!err){
								console.log("inserted successfully");
							}
						});
					}
					else{
						
						results.dateAvg.push({'time':time,'avg':avgValue})
						console.log(JSON.stringify(results.dateAvg) + " these are the results ");
						//updateDataToDatabase(sensor,fullDate,results);
						coll.updateOne(
								{'sensorID':sensor,'date':date},
								{
									$set:{'dateAvg':results.dateAvg
									}
								},function(err,result){
									if(result){
										console.log("success updated !!!!!");
									}
									else{
										console.log("failed updating ");
									}
							});
						
					}
				}
			});
		});
	})();

};


exports.mine = function(){
	
	var sensorsList= [];
	mongo.connect(function(err,db){
		var coll = db.collection("sensorInformation");
		coll.find({sensorType:"Water Level", sensorStatus: true}).toArray(function(err, results){
			if(err){
				console.log("Failed to fetch sensor information");
			}
			sensorsList = results;
			for(i=0;i<sensorsList.length;i++){
				console.log("Inside for looop");
				getSensorData(sensorsList[i].sensorID);
				
			}
		});
	});
	
	

}