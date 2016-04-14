var bcrypt=require('../routes/bcrypt');
var mongoSessionStoreURL = "mongodb://localhost:27017/sessions";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var mongo = require("../routes/mongo");
var mongoURL = "mongodb://localhost:27017/sensorCloud";
module.exports = function (app)	{
	app.get('/login',redirectToLoginPage);
	app.get('/signup',redirectToSignupPage);
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