var mongo = require("../routes/mongo");
//var mongoURL = "mongodb://project:project@ds023052.mlab.com:23052/sensorcloud";
var mongoURL = "mongodb://localhost:27017/sensorCloud";

exports.subscribeToSensors=function(req,res){
	if(req.session.email){
		var sensorHubName = req.param("sensorHubName");
		mongo.connect(mongoURL, function(db){
			console.log('Connected to mongo at: ' + mongoURL);
			var coll = db.collection('userSubscriptions');
			var insert_subscription_query={'email':req.session.email,'sensorHubName':sensorHubName};
			coll.insert(insert_subscription_query,function(err,result){
				db.close();
				if(err){
					res.send({"status":"fail" , 'msg': 'Error in Subscribing'});
				}
				else{
					res.send({"status":"success" , 'msg': 'Subscribed successfully'});
				}
			});
		});
	}
};

exports.unSubscribeToSensorHub=function(req,res){
	if(req.session.email){
		mongo.connect(mongoURL,function(db){
			var coll=db.collection("userSubscriptions");
			coll.remove({'email':req.session.email,'sensorHubName':req.param("sensorHubName")}, function(err, result) {
				db.close();
				if(err){
					res.send({"status":"fail","msg":"Error Deleting"});
				}
				else{
					res.send({"status":"success","msg":"Deleted Successfully"});
				}
			})
		});
	}
};