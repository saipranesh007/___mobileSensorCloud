var mongo = require("../routes/mongo");
//var mongoURL = "mongodb://project:project@ds023052.mlab.com:23052/sensorcloud";
var mongoURL = "mongodb://localhost:27017/sensorCloud";
exports.redirectToUserHome=function(req,res){
	res.render('user/userHome');
};

exports.viewRegisteredSensorsHubs=function(req,res){
	res.render('user/partials/viewRegisteredSensorsHubs');
};

exports.subscribeToSensorHubPage=function(req,res){
	res.render('user/partials/subscribeToSensorHub');
};


exports.viewSensors=function(req,res){
	res.render('user/partials/viewSensors');
};


exports.streamFlow=function(req,res){
	res.render('user/partials/streamFlow');
};


exports.streamHeight=function(req,res){
	res.render('user/partials/streamHeight');
};


exports.waterLevel=function(req,res){
	res.render('user/partials/waterLevel');
};


exports.waterTemperature=function(req,res){
	res.render('user/partials/waterTemperature');
};

exports.waveHeight=function(req,res){
	res.render('user/partials/waveHeight');
};

exports.windSpeed=function(req,res){
	res.render('user/partials/windSpeed');
};

exports.sensorStats=function(req,res){
	res.render('user/partials/sensorStats');
};

exports.sensorProvider=function(req,res){
	res.render('user/partials/sensorProvider');
};

exports.profile=function(req,res){
	res.render('user/partials/profile');
};

exports.manageRegisteredSensors=function(req,res){
	res.render('user/partials/manageRegisteredSensors');
};


exports.userDashboardConsole=function(req,res){
	res.render('user/partials/userDashboardConsole');
}

exports.getSensorHubSubscriptions=function(req,res){
	if(req.session.email){
		var data=[];
		mongo.connect( function(err,db){
			console.log('Connected to mongo at: ' + mongoURL);
			var coll = db.collection('userSubscriptions');
			coll.find({email:req.session.email}).toArray(function(err, results){
				if(err){
					
					res.send({"status":"fail" , 'msg': 'Internal Error'});	
				}
				else if(results==null){
					
					res.send({"status":"fail" , 'msg': 'No Sensor Hub Exists'});
				}
				else{
					data.push(results);
					var item=[];
					for(var i=0;i<results.length;i++){
						item.push(results[i].sensorHubName)
					}
					var coll = mongo.collection('sensorHub');
					coll.find({sensorHubName:{$nin:item}}).toArray(function(err, results){
						
						if(err){
							res.send({"status":"fail" , 'msg': 'Internal Error'});	
						}
						else if(results==null){
							res.send({"status":"fail" , 'msg': 'No Sensor Hub Exists'});
						}
						else{
							res.send({"status":"success" , 'msg': results});
						}
					});
				}
			});
		});
	}
	else{
		res.redirect('/');
	}
};

exports.getMockGraphData=function(req,res){
	var data=[203,156,99,251,305,247];
	res.send({"status":"success","data":data});
}