'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('FormCtrl', function($scope) {
    $scope.test = function(){
      console.log('these are the results');
      alert('Sensor Details Added Successfully');
    }
    $scope.saveProfile = function(){
      console.log('these are the results');
      alert('User Profile Details saved Successfully');
    }
});
