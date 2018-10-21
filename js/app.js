'use strict';

var app = angular.module('checkin', ['ngRoute', 'firebase'])
	.constant('CONFIG', { //Set constant CONFIG for app configuration
	    'APP_NAME' : 'Time Checkin Service',
	    'APP_VERSION' : '1.0.0',
	    'BASE_URL' : window.location.protocol+ '//' +window.location.host+ '/checkin',
	    'SYSTEM_LANGUAGE' : 'TH',
	    'GOOGLE_ANALYTICS_ID' : ''
	})
	.config(['$routeProvider', function ($routeProvider) { //config route for app
		$routeProvider
		.when('/', {
			templateUrl: 'pages/home.html',
			controller: 'HomeController'
		})
		.when('/checkin', {
			templateUrl: 'pages/checkin.html',
			controller: 'FormController'
		})
		.when('/employee', {
			templateUrl: 'pages/employee.html',
			controller: 'EmployeeController'
		})
		.when('/report', {
			templateUrl: 'pages/report.html',
			controller: 'ReportController'
		})
		.otherwise({
	        redirectTo: '/'
	    });
	}])
	// .config(function ($httpProvider) { // config default header request for app
	//   	$httpProvider.defaults.headers.common = {};
	//   	$httpProvider.defaults.headers.post = {};
	//   	$httpProvider.defaults.headers.put = {};
	//   	$httpProvider.defaults.headers.patch = {};
	// })
	/** Inject libraries dependencies for app */ 
	.constant('moment', moment)
	.constant('toastr', toastr)
	.factory('_', ['window', function () {
		return window._;
	}])
	.controller('HomeController', function ($scope, CONFIG) {
		console.log(CONFIG.BASE_URL);
		$scope.pageTitle = "This is Home page.";
	})
	.controller('ReportController', function ($scope, CONFIG) {
		console.log(CONFIG.BASE_URL);
		$scope.pageTitle = "This is Report page.";
	});