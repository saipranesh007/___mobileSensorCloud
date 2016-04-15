var bcrypt=require('../routes/bcrypt');
var mongoSessionStoreURL = "mongodb://localhost:27017/sessions";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var mongo = require("../routes/mongo");
var mongoURL = "mongodb://localhost:27017/sensorCloud";
var request = require("request")
module.exports = function (app)	{
	app.get('/login',redirectToLoginPage);
	app.get('/signup',redirectToSignupPage);
	app.get('/redirectToDashboard',redirectToDashBoard);
	app.get('/getSensorData',getSensorData);
	app.get('/getSensorsList',getSensorsList);
	app.get('/sensorDataPage',redirectToSensorDataPage);
	app.post('/checkLoginCustomer',checkLoginCustomer);
	app.post('/checkLoginAdmin',checkLoginAdmin);
	app.post('/customerSignUp',customerSignUp);
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
								req.session.username=firstName;
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