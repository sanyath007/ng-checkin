'use strict';

var app = angular.module('checkin', 
	[
		'ngRoute',
		'ngAnimate',
		'ngSanitize',
		'firebase',
		'angularjs-datetime-picker',
		'ui.bootstrap',
		'moment-picker'
	]
)
	/** Set constant CONFIG for app configuration */
	.constant('CONFIG', {
	    'APP_NAME' : 'Time Checkin Service',
	    'APP_VERSION' : '1.0.0',
	    'BASE_URL' : window.location.protocol+ '//' +window.location.host+ '/checkin',
	    'SYSTEM_LANGUAGE' : 'TH',
	    'GOOGLE_ANALYTICS_ID' : ''
	})
	/** Route for app */ 
	.config(['$routeProvider', function ($routeProvider) { //config route for app
		$routeProvider
		.when('/', {
			templateUrl: 'pages/home.html',
			controller: 'HomeController'
		})
		.when('/checkin', {
			templateUrl: 'pages/checkin.html',
			controller: 'CheckinController'
		})
		.when('/employee', {
			templateUrl: 'pages/employee.html',
			controller: 'EmployeeController'
		})
		.when('/employee-form', {
			templateUrl: 'pages/employee-form.html',
			controller: 'EmployeeController'
		})
		.when('/employee-edit', {
			templateUrl: 'pages/employee-edit.html',
			controller: 'EmployeeController'
		})
		.when('/report1', {
			templateUrl: 'pages/report1.html',
			controller: 'ReportController'
		})
		.when('/report2', {
			templateUrl: 'pages/report2.html',
			controller: 'ReportController'
		})
		.when('/report3', {
			templateUrl: 'pages/report3.html',
			controller: 'ReportController'
		})
		.when('/report4', {
			templateUrl: 'pages/report4.html',
			controller: 'ReportController'
		})
		.otherwise({
	        redirectTo: '/'
	    });
	}])
	/** Config default header request for app */ 
	/*.config(function ($httpProvider) {
	  	$httpProvider.defaults.headers.common = {};
	  	$httpProvider.defaults.headers.post = {};
	  	$httpProvider.defaults.headers.put = {};
	  	$httpProvider.defaults.headers.patch = {};
	})*/
	/** Inject libraries dependencies for app */ 
	.constant('moment', moment)
	.constant('toastr', toastr)
	.factory('_', ['window', function () {
		return window._;
	}])
	/** Create controller for app */ 
	.controller('HomeController', function ($scope, CONFIG) {
		console.log(CONFIG.BASE_URL);
		$scope.pageTitle = "This is Home page.";
	})
	.controller('ModalInstanceCtrl', function ($uibModalInstance, data) {
	  	var pc = this;
	  	pc.data = data;
	  
	  	pc.ok = function () {
	    	alert("You clicked the ok button."); 
	    	$uibModalInstance.close();
	  	};

	  	pc.cancel = function () {
	    	alert("You clicked the cancel button."); 
	    	$uibModalInstance.dismiss('cancel');
	  	};

	  	pc.close = function () {
	    	$uibModalInstance.close();
	  	};
	});