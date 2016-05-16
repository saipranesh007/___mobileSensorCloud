

var MongoClient = require('mongodb').MongoClient;

var db;
var connected = false;


var url = "mongodb://project:project@ds023052.mlab.com:23052/sensorcloud";

				
exports.connect = function(callback){
    MongoClient.connect(url, function(err, _db){
    	if (err) { 
    		//throw new Error('Could not connect: '+err); 
    		callback(err, null);
    	}
     
    	db = _db;
    	connected = true;
    	console.log(connected +" is connected?");
    	callback(null, db);
     });
};

/**
 * Disconnect from the DB
 */

exports.disconnect = function(callback){
	
	if(connected){
		MongoClient.close(function(){
			console.log("mongo connection disconnected");
			callback();
		});
	}else{
		console.log("connection is already closed");
		callback();
	}
};

/**
 * Returns the collection on the selected database
 */
exports.collection = function(name){
    if (!connected) {
      throw new Error('Must connect to Mongo before calling "collection"');
    } 
    
    return db.collection(name);
  
};
