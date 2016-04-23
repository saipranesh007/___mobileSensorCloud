angular.module('sbAdminApp')
  .controller('SensorCtrl', ['$scope', function ($scope) {
      console.log('reached here');
      $("[name = 'my-checkbox']").bootstrapSwitch();
      $scope.hello = 'hello';
      $scope.saveSensor = function(){
          alert("Savedd");
      };
  }]);
