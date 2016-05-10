var bcrypt=require('../routes/bcrypt');
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var mongo = require("../routes/mongo");
var mongoURL = "mongodb://localhost:27017/sensorCloud";
var request = require("request");
module.exports = function (app)	{
	app.get('/login',redirectToLoginPage);
	app.get('/signup',redirectToSignupPage);
	app.get('/redirectToDashboard',redirectToDashBoard);
	app.get('/getSensorData',getSensorData);
	app.get('/getSensorsList',getSensorsList);
	app.get('/sensorDataPage',redirectToSensorDataPage);
	app.get('/signout',signout);
	app.get('/getGraphData',getGraphData);
	app.get('/sensorAdminDashboard',redirectToAdminDashboard);
	app.get('/getSensorHubsList',getSensorHubsList);
	app.get('/getSensorsList',getSensorsList);
	app.post('/checkLoginCustomer',checkLoginCustomer);
	app.post('/checkLoginAdmin',checkLoginAdmin);
	app.post('/customerSignUp',customerSignUp);
	app.post('/storeSensorHubData',storeSensorHubData);
	app.post('/deleteSensorHub',deleteSensorHub);
	app.post('/saveSensor',saveSensor);
	app.post('/deleteSensor',deleteSensor);
};

function getGraphData(req,res){
	var data=[203,156,99,251,305,247];
	res.send({"status":"success","data":data});
}

function redirectToLoginPage(req,res){
	res.render('login');
}

function redirectToSignupPage(req,res){
	res.render('signUp');
}

function checkLoginCustomer(req,res){
	var email=req.param("email");
	var password=req.param("password");
	var user=[];
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('signup');
		coll.findOne({email: email}, function(err, results){
			if(err){
				res.redirect("/error");
			}
			else if(results!=null && results!=undefined){
				bcrypt.decryption(password,results.password, function(response) {
					if(response === "success")	{
						if(results.category=='customer'){
							req.session.email=email;
							res.send({"status":"success" , 'msg': 'success'});
						}
						else{
				        	res.send({"status":"fail" , 'msg': 'Incorrect Login'});	
						}
			        }
			        else{
			        	res.send({"status":"fail" , 'msg': 'Incorrect Login'});
			        }
				});
			}
			else{
				res.send({"status":"fail" , 'msg': 'No Such User'});
			}
		});
	});
}

function checkLoginAdmin(req,res){
	var email=req.param("sensorAdminEmail");
	var password=req.param("sensorAdminPassword");
	var user=[];
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('signup');
		coll.findOne({email: email}, function(err, results){
			if(err){
				res.redirect("/error");
			}
			else if(results!=null && results!=undefined){
				bcrypt.decryption(password,results.password, function(response) {
					if(response === "success")	{
						if(results.category=='sensorAdmin'){
							req.session.email=email;
							res.send({"status":"success" , 'msg': 'success'});
						}
						else{
				        	res.send({"status":"fail" , 'msg': 'Incorrect Login'});	
						}
			        }
			        else{
			        	res.send({"status":"fail" , 'msg': 'Incorrect Login'});
			        }
				});
			}
			else{
				res.send({"status":"fail" , 'msg': 'No Such User'});
			}
		});
	});
}

function customerSignUp(req,res){
	var email=req.param("email");
	var password=req.param("password");
	var firstName=req.param("firstName");
	var lastName=req.param("lastName");
	var address=req.param("address");
	var phone=req.param("phone");
	mongo.connect(mongoURL,function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('signup');
		coll.findOne({email: email}, function(err, results){
			if(err){
				res.redirect("/error");
			}
			else if(results==null){
				bcrypt.encryption(password, function(hashedPassword) {
					if(hashedPassword){
						var insert_customer_details_query={'email':email,'password':hashedPassword,'firstName':firstName,'lastName':lastName,'address':address,'phone':phone,'category':'customer'};
						coll.insert(insert_customer_details_query,function(err,result){
							if(!err){
								req.session.email=email;
								res.send({"status":"success" , 'msg': 'Account created successfully'});
							}
						});
					}
				});
			}
			else{
				res.send({"status":"accountExists","msg":"Account already exists"});
			}
		});
	});
}

function redirectToDashBoard(req,res){
	res.render('dashboard');
}
function getSensorsList(req,res){
	var sensorsList=["urn:ioos:station:NOAA.NOS.CO-OPS:9414750","urn:ioos:station:NOAA.NOS.CO-OPS:9410068","urn:ioos:station:NOAA.NOS.CO-OPS:9410079","urn:ioos:station:NOAA.NOS.CO-OPS:9410092","urn:ioos:station:NOAA.NOS.CO-OPS:9410120"];
	res.send(sensorsList);
}
function getSensorData(req,res){
	//Logic to get current time and current time plus one hour.
	var sensor=req.param("sensorID");
	var date = new Date();
	date.setHours ( date.getHours() - 7 );	
	console.log("current date:"+date);
	var fromDate = date.toISOString();	//toISOString gives time in ISO Formatted ISO Time.
	date.setHours ( date.getHours() + 1 );
	var toDate = date.toISOString();
	console.log(fromDate+"   "+toDate);
	//var sensorsList=["urn:ioos:station:NOAA.NOS.CO-OPS:9410032","urn:ioos:station:NOAA.NOS.CO-OPS:9410068","urn:ioos:station:NOAA.NOS.CO-OPS:9410079","urn:ioos:station:NOAA.NOS.CO-OPS:9410092","urn:ioos:station:NOAA.NOS.CO-OPS:9410120"];
	var url="http://erddap.axiomdatascience.com/erddap/tabledap/cencoos_sensor_service.json?time,depth,station,parameter,unit,value&time>"+fromDate+"&time<"+toDate+"&station=%22"+sensor+"%22&parameter=%22Water%20Level%22&unit=%22ft%22";
	request({
	    url: url,
	    json: true
	}, function (error, response, body) {

	    if (!error && response.statusCode === 200) {
	    	res.send({"status":"success","msg":body.table.rows});
	    }
	});
}

function redirectToSensorDataPage(req,res){
	if(req.session.email){
		var sensor=req.param("sensorID");
		var date = new Date();
		date.setHours ( date.getHours() - 7 );	
		console.log("current date:"+date);
		var fromDate = date.toISOString();	//toISOString gives time in ISO Formatted ISO Time.
		date.setHours ( date.getHours() + 1 );
		var toDate = date.toISOString();
		console.log(fromDate+"   "+toDate);
		//var sensorsList=["urn:ioos:station:NOAA.NOS.CO-OPS:9410032","urn:ioos:station:NOAA.NOS.CO-OPS:9410068","urn:ioos:station:NOAA.NOS.CO-OPS:9410079","urn:ioos:station:NOAA.NOS.CO-OPS:9410092","urn:ioos:station:NOAA.NOS.CO-OPS:9410120"];
		var url="http://erddap.axiomdatascience.com/erddap/tabledap/cencoos_sensor_service.json?time,depth,station,parameter,unit,value&time>"+fromDate+"&time<"+toDate+"&station=%22"+sensor+"%22&parameter=%22Water%20Level%22&unit=%22ft%22";
		request({
		    url: url,
		    json: true
		}, function (error, response, body) {

		    if (!error && response.statusCode === 200) {
		    	res.render("sensorDataPage",{'sensorData':body.table.rows,'sensorID':sensor});
		    }
		});
	}
	else{
		res.redirect('/login');
	}
}

function signout(req,res){
	req.session.destroy();
	res.redirect('/');
}

function redirectToAdminDashboard(req,res){
	if(req.session.email){
		res.render('sensorAdminDashboard');
	}
	else{
		res.redirect('/');
	}
}

function storeSensorHubData(req,res){
	if(req.session.email){
		var sensorHubName=req.param("sensorHubName");
		var sensorHubDescription=req.param("sensorHubDescription");
		var sensorHubType=req.param("sensorHubType");
		var sensorHubStatus=req.param("sensorHubStatus");
		var sensorHubAddress=req.param("sensorHubAddress");
		var sensorHubCity=req.param("sensorHubCity");
		var sensorHubState=req.param("sensorHubState");
		var sensorHubCountry=req.param("sensorHubCountry");
		mongo.connect(mongoURL, function(){
			console.log('Connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('sensorHub');
			coll.findOne({sensorHubName: sensorHubName}, function(err, results){
				if(err){
					res.send({"status":"fail" , 'msg': 'Internal Error'});	
				}
				else if(results==null){
					var insert_hub_details_query={'sensorHubName':sensorHubName,
							'sensorHubDescription':sensorHubDescription,
							'sensorHubType':sensorHubType,
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
}

function getSensorHubsList(req,res){
	if(req.session.email){
		mongo.connect(mongoURL, function(){
			console.log('Connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('sensorHub');
			coll.find({}).toArray(function(err, results){
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
		});
	}
	else{
		res.redirect('/');
	}
}

function deleteSensorHub(req,res){
	if(req.session.email){
		var sensorHubName = req.param("sensorHubName");
		mongo.connect(mongoURL, function(){
			console.log('Connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('sensorHub');
			coll.deleteOne({sensorHubName:sensorHubName}, function(err,results){
				if(err){
					res.send({"status":"fail" , 'msg': 'Error Deleting'});
				}
				else{
					res.send({"status":"success" , 'msg': 'Deleted Successfully'});
				}
			});
		});
	}
}

function saveSensor(req,res){
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
		mongo.connect(mongoURL, function(){
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
							'sensorCity':sensorCity};
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
}

function getSensorsList(req,res){
	if(req.session.email){
		mongo.connect(mongoURL, function(){
			console.log('Connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('sensorInformation');
			coll.find({}).toArray(function(err, results){
				if(err){
					res.send({"status":"fail" , 'msg': 'Internal Error'});	
				}
				else if(results==null){
					res.send({"status":"fail" , 'msg': 'No Sensors Exists'});
				}
				else{
					res.send({"status":"success" , 'msg': results});
				}
			});
		});
	}
	else{
		res.redirect('/');
	}
}

function deleteSensor(req,res){
	if(req.session.email){
		var sensorID = req.param("sensorID");
		mongo.connect(mongoURL, function(){
			console.log('Connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('sensorInformation');
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
}