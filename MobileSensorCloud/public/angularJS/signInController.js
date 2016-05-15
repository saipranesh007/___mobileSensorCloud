var sensorCloud = angular.module('sensorCloud', []);
sensorCloud.controller('customerLogin',function($scope,$http){
	$scope.customerEmailError = true;
	$scope.customerPasswordError = true;
	$scope.submit = function() {
		var error="";
		$scope.customerEmailError = true;
		$scope.customerPasswordError = true;
		var customerEmail=$scope.customerEmail;
		var customerPassword=$scope.customerPassword;
		if(customerEmail=='' || customerEmail==undefined){
			$scope.customerEmailError = false;
			error+=true;
		}
		if(customerPassword=='' || customerPassword==undefined){
			$scope.customerPasswordError = false;
			error+=true;
		}
		if(error==""){
			$http({
				method : "POST",
				url : '/checkLoginCustomer',
				data : {
					"email" : $scope.customerEmail,
					"password" : $scope.customerPassword
				}
			}).success(function(result) {
				if(result.status == "success"){
					window.location = '/redirectToUserHome';
				}
				else if(result.status=="fail")
				{
					if(result.msg=='Incorrect Login'){
						alert("Incorrect Login. Please try again");
					}
				}
			}).error(function(error) {
				$scope.unexpected_error = false;
			});
		}
		else{
			return false;
		}
	};
});

sensorCloud.controller('sensorAdminLogin',function($scope,$http){
	$scope.sensorAdminEmailError = true;
	$scope.sensorAdminPasswordError = true;
	$scope.submit = function() {
		var error="";
		$scope.sensorAdminEmailError = true;
		$scope.sensorAdminPasswordError = true;
		if($scope.sensorAdminEmail=='' || $scope.sensorAdminEmail==undefined){
			$scope.sensorAdminEmailError = false;
			error+=true;
		}
		if($scope.sensorAdminPassword=='' || $scope.sensorAdminPassword==undefined){
			$scope.sensorAdminPasswordError = false;
			error+=true;
		}
		if(error==""){
			$http({
				method : "POST",
				url : '/checkLoginAdmin',
				data : {
					"sensorAdminEmail" : $scope.sensorAdminEmail,
					"sensorAdminPassword" : $scope.sensorAdminPassword
				}
			}).success(function(result) {
				if(result.status == "success"){
					window.location = '/redirectToAdminHome';
				}
				else if(result.status=="fail")
				{
					if(result.msg=='Incorrect Login'){
						alert("Incorrect Login. Please try again");
					}
				}
			}).error(function(error) {
				$scope.unexpected_error = false;
			});
		}
		else
			return false;
	};
});