var sensorCloudApp = angular.module('sensorCloud', ['ui.router','toggle-switch']);
sensorCloudApp.controller("adminCtrl",function($rootScope,$scope,$state){
	$state.go("sensorAdminDashboard");
});
sensorCloudApp.config(['$urlRouterProvider','$stateProvider',function($urlRouterProvider, $stateProvider){
	$urlRouterProvider.otherwise('/');
	$stateProvider.state('sensorAdminDashboard',{
		url:'/sensorAdminDashboard',
		templateUrl:'/sensorAdminDashboardConsole',
		controller:function($scope,$state,$rootScope){
			$scope.view = function(request){
				if(request=="addSensorHub"){
					$state.go("addSensorHub");
				}
				else if(request=="addSensor"){
					$state.go("addSensor");
				}
				else if(request=="manageSensorsHub"){
					$state.go("manageSensorsHub");
				}
				else if(request=="manageSensors"){
					$state.go("manageSensors");
				}
			}
		}
	}).state('addSensorHub',{
		url:'/addSensorHub',
		templateUrl:'/addSensorHub',
	}).state('addSensor',{
		url:'/addSensor',
		templateUrl:'/addSensor',
	}).state('manageSensorsHub',{
		url:'/manageSensorsHub',
		templateUrl:'/manageSensorsHub',
	}).state('manageSensors',{
		url:'/manageSensors',
		templateUrl:'/manageSensors',
	});
}]);