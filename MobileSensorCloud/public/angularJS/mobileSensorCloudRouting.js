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
			$scope.view = function(request){
				if(request=="manageRegisteredSensorHubs")
					$state.go("viewRegisteredSensorsHubs");
				else if(request=="subscribeToSensorHubs")
					$state.go("subscribeToSensorHubs");
				else if(request=="manageSensors")
					$state.go("manageSensors");
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
	}).state('viewRegisteredSensorsHubs',{
		templateUrl:'partials/viewRegisteredSensorsHubs'
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
				else if(request=="manageSensorHub"){
					$state.go("manageSensorHub");
				}
				else if(request=="manageSensors"){
					$state.go("manageSensors");
				}
			}
		}
	}).state('addSensorHub',{
		url:'/addSensorHub',
		templateUrl:'partials/addSensorHub',
	}).state('addSensor',{
		url:'/addSensor',
		templateUrl:'partials/addSensor',
	}).state('manageSensorHub',{
		url:'/manageSensorHub',
		templateUrl:'partials/manageSensorHub',
	}).state('manageSensors',{
		url:'/manageSensors',
		templateUrl:'partials/manageSensors',
	}).state('streamFlow',{
		url:'/streamFlow',
		templateUrl:'partials/streamFlow',
	}).state('streamHeight',{
		url:'/streamHeight',
		templateUrl:'partials/streamHeight',
	}).state('waterLevel',{
		url:'/waterLevel',
		templateUrl:'partials/waterLevel',
	}).state('waterTemperature',{
		url:'/waterTemperature',
		templateUrl:'partials/waterTemperature',
	}).state('waveHeight',{
		url:'/waveHeight',
		templateUrl:'partials/waveHeight',
	}).state('windSpeed',{
		url:'/windSpeed',
		templateUrl:'partials/windSpeed',
	}).state('/manageRegisteredSensors',{
		url:'/manageRegisteredSensors',
		templateUrl:'/manageRegisteredSensors',
	}).state('subscribeToSensorHubs',{
		url:'/subscribeToSensorHubs',
		templateUrl:'partials/subscribeToSensorHub',
	})
}]);