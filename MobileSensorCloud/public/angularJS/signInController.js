var sensorCloud = angular.module('sensorCloud', []);
sensorCloud.controller('customerLogin',function($scope,$http){
	$scope.submit = function() {
		var customerUsername=$scope.customerUsername;
		var customerPassword=$scope.customerPassword;
		$http({
			method : "POST",
			url : '/checkLoginCustomer',
			data : {
				"email" : $scope.customerEmail,
				"password" : $scope.customerPassword
			}
		}).success(function(result) {
			if(result.status == "success"){
				alert(result.msg);
				window.location = '/dashboard';
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
	};
});

sensorCloud.controller('sensorAdminLogin',function($scope,$http){
	$scope.submit = function() {
		alert($scope.sensorAdminEmail+""+$scope.sensorAdminPassword);
		$http({
			method : "POST",
			url : '/checkLoginAdmin',
			data : {
				"sensorAdminEmail" : $scope.sensorAdminEmail,
				"sensorAdminPassword" : $scope.sensorAdminPassword
			}
		}).success(function(result) {
			if(result.status == "success"){
				alert(result.msg);
				window.location = '/sensorAdminDashboard';
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
	};
});