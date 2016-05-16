var mongo = require("../routes/mongo");
//var mongoURL = "mongodb://project:project@ds023052.mlab.com:23052/sensorcloud";
var mongoURL = "mongodb://localhost:27017/sensorCloud";
exports.saveEditedSensorData=function(req,res){
	if(req.session.email){
		mongo.connect(function(err,db){
			console.log('Connected to mongo at: ' + mongoURL);
			var coll = db.collection('sensorInformation');
			coll.updateOne(
					{'sensorID':req.param("sensorID")},
					{
						$set:{
							'sensorType':req.param("sensorType"),
							'sensorHub':req.param("sensorHub"),
							'sensorLatitude':req.param("sensorLatitude"),
							'sensorLongitude':req.param("sensorLongitude")
						}
					},function(err,result){
						
						if(result){
							res.send({"status":"success" , 'msg': 'Data updated successfully'});
						}
						else{
							res.send({"status":"fail" , 'msg': 'error in updating details in lifeevents table'});
						}
				});
		});
	}
};

exports.changeSensorStatus=function(req,res){
	if(req.session.email){
		mongo.connect(function(err,db){
			console.log('Connected to mongo at: ' + mongoURL);
			var coll = db.collection('sensorInformation');
			coll.updateOne(
					{'sensorID':req.param("sensorID")},
					{
						$set:{'sensorStatus':req.param("sensorStatus")
						}
					},function(err,result){
						
						if(result){
							res.send({"status":"success" , 'msg': 'Data updated successfully'});
						}
						else{
							res.send({"status":"fail" , 'msg': 'error in updating details in lifeevents table'});
						}
				});
		});
	}
};

exports.disableSensorHub=function(req,res){
	mongo.connect(function(err,db){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = db.collection('sensorHub');
		coll.updateOne(
				{'sensorHubName':req.param("sensorHubName")},
				{
					$set:{'sensorHubStatus':req.param("sensorHubStatus")
					}
				},function(err,result){
					
					if(result){
						
						res.send({"status":"success" , 'msg': 'Data saved successfully'});
					}
					else{
						res.send({"status":"fail" , 'msg': 'error in updating details in lifeevents table'});
					}
			});
	});
};

exports.deleteSensor=function(req,res){
	if(req.session.email){
		var sensorID = req.param("sensorID");
		mongo.connect(function(err,db){
			console.log('Connected to mongo at: ' + mongoURL);
			var coll = db.collection('sensorInformation');
			coll.deleteOne({sensorID:sensorID}, function(err,results){
				
				if(err){
					res.send({"status":"fail" , 'msg': 'Error Deleting'});
				}
				else{
					res.send({"status":"success" , 'msg': 'Deleted Successfully'});
				}
			});
		});
	}
};

exports.storeSensorHubData=function(req,res){
	if(req.session.email){
		var sensorHubName=req.param("sensorHubName");
		var sensorHubDescription=req.param("sensorHubDescription");
		var sensorHubStatus=req.param("sensorHubStatus");
		var sensorHubAddress=req.param("sensorHubAddress");
		var sensorHubCity=req.param("sensorHubCity");
		var sensorHubState=req.param("sensorHubState");
		var sensorHubCountry=req.param("sensorHubCountry");
		mongo.connect(function(err,db){
			console.log('Connected to mongo at: ' + mongoURL);
			var coll = db.collection('sensorHub');
			coll.findOne({sensorHubName: sensorHubName}, function(err, results){
				if(err){
					
					res.send({"status":"fail" , 'msg': 'Internal Error'});	
				}
				else if(results==null){
					var insert_hub_details_query={'sensorHubName':sensorHubName,
							'sensorHubDescription':sensorHubDescription,
							'sensorHubStatus':sensorHubStatus,
							'sensorHubAddress':sensorHubAddress,
							'sensorHubCity':sensorHubCity,
							'sensorHubState':sensorHubState,
							'sensorHubCountry':sensorHubCountry};
					coll.insert(insert_hub_details_query,function(err,result){
						if(!err){
							
							res.send({"status":"success" , 'msg': 'Details Inserted successfully'});
						}
					});
				}
				else{
					
					res.send({"status":"fail" , 'msg': 'Sensor Hub Already exists'});
				}
			});
		});
	}
};

exports.saveSensor=function(req,res){
	if(req.session.email){
		var sensorID=req.param("sensorID");
		var sensorType=req.param("sensorType");
		var sensorHub=req.param("sensorHub");
		var sensorDimensions=req.param("sensorDimensions");
		var sensorSignalType=req.param("sensorSignalType");
		var sensorSignalSpeed=req.param("sensorSignalSpeed");
		var sensorPins=req.param("sensorPins");
		var sensorOutputSignal=req.param("sensorOutputSignal");
		var sensorInstallationDate=req.param("sensorInstallationDate");
		var sensorLatitude=req.param("sensorLatitude");
		var sensorLongitude=req.param("sensorLongitude");
		var sensorCity=req.param("sensorCity");
		var sensorStatus=req.param("sensorStatus");
		mongo.connect(function(err,db){
			console.log('Connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('sensorInformation');
			coll.findOne({sensorID:sensorID,sensorHub:sensorHub}, function(err, results){
				
				if(err){
					
					res.send({"status":"fail" , 'msg': 'Internal DB Error'});	
				}
				else if(results==null){
					var insert_sensor_details_query={'sensorID':sensorID,
							'sensorType':sensorType,
							'sensorHub':sensorHub,
							'sensorDimensions':sensorDimensions,
							'sensorSignalType':sensorSignalType,
							'sensorSignalSpeed':sensorSignalSpeed,
							'sensorPins':sensorPins,
							'sensorOutputSignal':sensorOutputSignal,
							'sensorInstallationDate':sensorInstallationDate,
							'sensorLatitude':sensorLatitude,
							'sensorLongitude':sensorLongitude,
							'sensorCity':sensorCity,
							'sensorStatus':sensorStatus};
					coll.insert(insert_sensor_details_query,function(err,result){
						if(!err){
							
							res.send({"status":"success" , 'msg': 'Details Inserted successfully'});
						}
					});
				}
				else{
					
					res.send({"status":"fail" , 'msg': 'Sensor already added to sensor Type'});
				}
			});
		});
	}
};


exports.getSensorData=function(req,res){
	if(req.session.email){
		var sensorHubName=req.param("sensorHubName");
		var type=req.param("type");
		var sensorID;
		var data=[];
		mongo.connect(function(err,db){
			console.log('Connected to mongo at: ' + mongoURL);
			var coll = db.collection('sensorInformation');
			coll.find({"sensorHub":sensorHubName}).toArray(function(err, results){
				if(err){
					
					res.send({"status":"fail" , 'msg': 'Internal Error'});	
					
				}
				else if(results==null){
					
					res.send({"status":"fail" , 'msg': 'No Sensor Hub Exists'});
				}
				else{
					for(var i=0;i<results.length;i++){
						if(results[i].sensorType==type){
							sensorID=results[i].sensorID;
							break;
						}
					}
					type = type.replace(/\s/g,'');
					var coll = mongo.collection(type);
					coll.find({"sensorID":sensorID}).toArray(function(err, results){
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
}