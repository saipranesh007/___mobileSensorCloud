var sensorCloudApp = angular.module('sensorCloud', ['ui.router']);

sensorCloudApp.controller("customerCtrl",function($rootScope,$scope,$state){
	$state.go("dashboard");
});
sensorCloudApp.controller("adminCtrl",function($rootScope,$scope,$state){
	$state.go("sensorAdminDashboard");
});
sensorCloudApp.config(['$urlRouterProvider','$stateProvider',function($urlRouterProvider, $stateProvider){
	$urlRouterProvider.otherwise('/');
	$stateProvider.state('dashboard',{
		url:'/dashboard',
		templateUrl:'partials/dashboard',
		controller:function($scope,$state,$rootScope){
			$scope.view = function(){
				$state.go("viewRegisteredSensors");
			}
		}
	}).state('sensorStats',{
		url:'/sensorStats',
		templateUrl:'partials/sensorStats',
	}).state('sensorProvider',{
		url:'/sensorProvider',
		templateUrl:'partials/sensorProvider',
	}).state('profile',{
		url:'/profile',
		templateUrl:'partials/profile',
	}).state('viewRegisteredSensors',{
		templateUrl:'/registeredSensors'
	}).state('sensorAdminDashboard',{
		url:'/sensorAdminDashboard',
		templateUrl:'partials/sensorAdminDashboardConsole',
		controller:function($scope,$state,$rootScope){
			$scope.view = function(request){
				if(request=="addSensorHub"){
					$state.go("addSensorHub");
				}
				else if(request=="addSensor"){
					$state.go("addSensor");
				}
			}
		}
	}).state('addSensorHub',{
		url:'/addSensorHub',
		templateUrl:'partials/addSensorHub',
	})
}]);