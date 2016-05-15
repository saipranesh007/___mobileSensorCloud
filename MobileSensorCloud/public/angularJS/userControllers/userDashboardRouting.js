var sensorCloudApp = angular.module('sensorCloud', ['ui.router']);
sensorCloudApp.controller("customerCtrl",function($rootScope,$scope,$state){
	$state.go("userDashboard");
});
sensorCloudApp.config(['$urlRouterProvider','$stateProvider',function($urlRouterProvider, $stateProvider){
	$stateProvider.state('userDashboard',{
		templateUrl:'/userDashboardConsole',
		controller:function($scope,$state,$rootScope){
			$scope.view = function(request){
				if(request=="manageRegisteredSensorHubs")
					$state.go("viewRegisteredSensorsHubs");
				else if(request=="subscribeToSensorHubs")
					$state.go("subscribeToSensorHubs");
				else if(request=="viewSensors")
					$state.go("viewSensors");
			}
		}
	}).state('viewRegisteredSensorsHubs',{
		url:'viewRegisteredSensorsHubs',
		templateUrl:'/viewRegisteredSensorsHubs'
	}).state('subscribeToSensorHubs',{
		url:'subscribeToSensorHub',
		templateUrl:'/subscribeToSensorHub',
	}).state('viewSensors',{
		url:'viewSensors',
		templateUrl:'/viewSensors',
	}).state('streamFlow',{
		url:'streamFlow',
		templateUrl:'/streamFlow',
	}).state('streamHeight',{
		url:'streamHeight',
		templateUrl:'/streamHeight',
	}).state('waterLevel',{
		url:'waterLevel',
		templateUrl:'/waterLevel',
	}).state('waterTemperature',{
		url:'waterTemperature',
		templateUrl:'/waterTemperature',
	}).state('waveHeight',{
		url:'waveHeight',
		templateUrl:'/waveHeight',
	}).state('windSpeed',{
		url:'windSpeed',
		templateUrl:'/windSpeed',
	}).state('sensorStats',{
		url:'sensorStats',
		templateUrl:'/sensorStats',
	}).state('sensorProvider',{
		url:'sensorProvider',
		templateUrl:'/sensorProvider',
	}).state('profile',{
		url:'profile',
		templateUrl:'/profile',
	}).state('/manageRegisteredSensors',{
		url:'manageRegisteredSensors',
		templateUrl:'/manageRegisteredSensors',
	});
}]);