exports.addSensorHub=function(req,res){
	res.render('admin/partials/addSensorHub');
};

exports.addSensor=function(req,res){
	res.render('admin/partials/addSensor');
};

exports.manageSensorsHub=function(req,res){
	res.render('admin/partials/manageSensorsHub');
};

exports.manageSensors=function(req,res){
	res.render('admin/partials/manageSensors');
};

exports.sensorAdminDashboardConsole=function(req,res){
	res.render('admin/partials/sensorAdminDashboardConsole');
}

exports.redirectToAdminHome=function(req,res){
	if(req.session.email){
		res.render('admin/sensorAdminHome');
	}
	else{
		res.redirect('/');
	}
}