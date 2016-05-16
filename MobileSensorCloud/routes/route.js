var bcrypt=require('../routes/bcrypt');
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var mongo = require("../routes/mongo");
var mongoURL = "mongodb://project:project@ds023052.mlab.com:23052/sensorcloud";
//var mongoURL = "mongodb://localhost:27017/sensorCloud";
var request = require("request");
var userGet = require('../routes/userGet');
var userPost = require('../routes/userPost');
var adminGet = require('../routes/adminGet');
var adminPost = require('../routes/adminPost');
module.exports = function (app)	{
	//User Get Requests
	app.get('/redirectToUserHome',userGet.redirectToUserHome);
	app.get('/viewRegisteredSensorsHubs',userGet.viewRegisteredSensorsHubs);
	app.get('/subscribeToSensorHub',userGet.subscribeToSensorHubPage);
	app.get('/viewSensors',userGet.viewSensors);
	app.get('/streamFlow',userGet.streamFlow);
	app.get('/streamHeight',userGet.streamHeight);
	app.get('/waterLevel',userGet.waterLevel);
	app.get('/waterTemperature',userGet.waterTemperature);
	app.get('/waveHeight',userGet.waveHeight);
	app.get('/windSpeed',userGet.windSpeed);
	app.get('/sensorStats',userGet.sensorStats);
	app.get('/sensorProvider',userGet.sensorProvider);
	app.get('/profile',userGet.profile);
	app.get('/manageRegisteredSensors',userGet.manageRegisteredSensors);
	app.get('/userDashboardConsole',userGet.userDashboardConsole);
	app.get('/getSensorsList',getSensorsList);
	//app.get('/sensorDataPage',redirectToSensorDataPage);
	app.get('/getMockGraphData',userGet.getMockGraphData);
	app.get('/getSensorHubSubscriptions',userGet.getSensorHubSubscriptions);
	
	//Admin GET Requests
	app.get('/sensorAdminDashboardConsole',adminGet.sensorAdminDashboardConsole);
	app.get('/addSensorHub',adminGet.addSensorHub);
	app.get('/addSensor',adminGet.addSensor);
	app.get('/manageSensorsHub',adminGet.manageSensorsHub);
	app.get('/manageSensors',adminGet.manageSensors);
	app.get('/redirectToAdminHome',adminGet.redirectToAdminHome);
	
	//User Post Requests
	app.post('/subscribeToSensors',userPost.subscribeToSensors);
	app.post('/unSubscribeToSensorHub',userPost.unSubscribeToSensorHub);
	app.post('/storeSensorHubData',adminPost.storeSensorHubData);
	app.post('/saveSensor',adminPost.saveSensor);
	app.post('/getSensorData',adminPost.getSensorData);
	
	//admin POST Requests
	app.post('/deleteSensor',adminPost.deleteSensor);
	app.post('/disableSensorHub',adminPost.disableSensorHub);
	app.post('/changeSensorStatus',adminPost.changeSensorStatus);
	app.post('/saveEditedSensorData',adminPost.saveEditedSensorData);
	
	//Requests common to user and admin
	app.get('/login',redirectToLoginPage);
	app.get('/signup',redirectToSignupPage);
	app.post('/getSensors',getSensors);
	app.post('/checkLoginCustomer',checkLoginCustomer);
	app.post('/checkLoginAdmin',checkLoginAdmin);
	app.post('/customerSignUp',customerSignUp);
	app.get('/signout',signout);
	app.get('/getSensorHubsList',getSensorHubsList);
	app.get('/registeredSensorsHubs',registeredSensorsHubs);
};

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
	mongo.connect( function(err,db){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = db.collection('signup');
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
	mongo.connect( function(err,db){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = db.collection('signup');
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
	mongo.connect(function(err,db){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = db.collection('signup');
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


function getSensorsList(req,res){
	var sensorsList=["urn:ioos:station:NOAA.NOS.CO-OPS:9414750","urn:ioos:station:NOAA.NOS.CO-OPS:9410068","urn:ioos:station:NOAA.NOS.CO-OPS:9410079","urn:ioos:station:NOAA.NOS.CO-OPS:9410092","urn:ioos:station:NOAA.NOS.CO-OPS:9410120"];
	res.send(sensorsList);
}
/*function getSensorData(req,res){
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
}*/


/*function redirectToSensorDataPage(req,res){
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
}*/

function signout(req,res){
	req.session.destroy();
	res.redirect('/');
}

function storeSensorHubData(req,res){
	if(req.session.email){
		var sensorHubName=req.param("sensorHubName");
		var sensorHubDescription=req.param("sensorHubDescription");
		var sensorHubStatus=req.param("sensorHubStatus");
		var sensorHubAddress=req.param("sensorHubAddress");
		var sensorHubCity=req.param("sensorHubCity");
		var sensorHubState=req.param("sensorHubState");
		var sensorHubCountry=req.param("sensorHubCountry");
		mongo.connect( function(err,db){
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
}

function getSensorHubsList(req,res){
	if(req.session.email){
		mongo.connect( function(err,db){
			console.log('Connected to mongo at: ' + mongoURL);
			var coll = db.collection('sensorHub');
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




function getSensorsList(req,res){
	if(req.session.email){
		mongo.connect( function(err,db){
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



function registeredSensorsHubs(req,res){
	if(req.session.email){
		mongo.connect(function(err,db){
			var coll=db.collection('userSubscriptions');
			coll.find({"email":req.session.email}).toArray(function(err,results){
				if(err){
					
					res.send({"status":"fail","msg":"Error in fetching details"});
				}
				else{
					var userSensorSubscriptions=[];
					for(var i=0;i<results.length;i++){
						userSensorSubscriptions.push(results[i].sensorHubName);
					}
					var coll=mongo.collection("sensorHub");
					coll.find({sensorHubName:{$in:userSensorSubscriptions},'sensorHubStatus':true}).toArray(function(err,results){
						
						if(err){
							res.send({"status":"fail","msg":"error in fetching details"});
						}
						else{
							res.send({"status":"success","msg":results});
						}
					});
				}
			})
		})
	}
}

function getSensors(req,res){
	console.log("in getsensors function");
	if(req.session.email){
		mongo.connect(function(err,db){
			var coll=db.collection("sensorInformation");
			console.log(req.param("sensorHub"));
			coll.find({'sensorHub':req.param("sensorHub")}).toArray(function(err, results){
				
				if(err){
					res.send({"status":"fail" , 'msg': 'Internal Error'});	
				}
				else if(results==null){
					res.send({"status":"fail" , 'msg': 'No Sensors Exists'});
				}
				else{
					console.log(results);
					res.send({"status":"success" , 'msg': results});
				}
			});
		});
	}
}
