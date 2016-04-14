 var bcrypt = require('bcrypt-nodejs');

 exports.encryption = function(password, callback){
   bcrypt.genSalt(10, function(err, salt) {
	   bcrypt.hash(password, salt, null, function(err, hash) {
		   if(!err)
			   callback(hash);
	   });
   });
 };

 exports.decryption = function(inputPassword, dbPassword, callback){
   
   bcrypt.compare(inputPassword,dbPassword, function(err, res) {
    
     if(res == true)
       callback("success");
     else
       callback("failed");
   });
   
 };