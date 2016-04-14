var sensorCloud = angular.module('sensorCloud', []);
sensorCloud.controller('customerSignup',function($scope,$http){
	$scope.submit = function() {
		$http({
			method:"POST",
			url:'/customerSignUp',
			data:{
				"email":$scope.email,
				"password":$scope.password,
				"firstName":$scope.firstName,
				"lastName":$scope.lastName,
				"address":$scope.address,
				"phone":$scope.phone
			}
		}).success(function(result){
			if(result.status == "success"){
				alert(result.msg);
				window.location = '/login';
			}
			else if(result.status=="fail")
			{
				if(result.msg=='Incorrect Login'){
					
				}
			}
			else if(result.status="alreadyExists"){
				alert(result.msg);
			}
		}).error(function(error){
			
		});
	};
});