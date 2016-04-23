'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('MainCtrl', function($scope,$position) {


        $scope.line = {
    	    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    	    series: ['Series A', 'Series B'],
    	    data: [
    	      [65, 59, 80, 81, 56, 55, 40],
    	      [28, 48, 40, 19, 86, 27, 90]
    	    ],
    	    onClick: function (points, evt) {
    	      console.log(points, evt);
    	    }
        };

  });
