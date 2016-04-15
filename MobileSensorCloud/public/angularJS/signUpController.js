var sensorCloud = angular.module('sensorCloud', []);
sensorCloud.controller('customerSignup',function($scope,$http){
	var error = "";
	$scope.signupEmailError = true;
	$scope.signupPasswordError = true;
	$scope.signupFirstNameError = true;
	$scope.signupLastNameError = true;
	$scope.signupAddressError = true;
	$scope.signupPhoneError = true;
	$scope.submit = function() {
		$scope.signupEmailError = true;
		$scope.signupPasswordError = true;
		$scope.signupFirstNameError = true;
		$scope.signupLastNameError = true;
		$scope.signupAddressError = true;
		$scope.signupPhoneError = true;
		if($scope.email=="" || $scope.email==undefined){
			$scope.signupEmailError = false;
			error+=true;
		}
		if($scope.password=="" || $scope.password==undefined){
			$scope.signupPasswordError = false;
			error+=true;
		}
		if($scope.firstName=="" || $scope.firstName==undefined){
			$scope.signupFirstNameError = false;
			error+=true;
		}
		if($scope.lastName=="" || $scope.lastName==undefined){
			$scope.signupLastNameError = false;
			error+=true;
		}
		if($scope.address=="" || $scope.address==undefined){
			$scope.signupAddressError = false;
			error+=true;
		}
		if($scope.phone=="" || $scope.phone==undefined){
			$scope.signupPhoneError = false;
			error+=true;
		}
		if(error==""){
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
		}
		else{
			return false;
		}
	};
});