
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.registeredSensors=function(req,res){
	res.send("partials/dashboard");
}