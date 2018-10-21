app.controller('EmployeeController', function ($scope, CONFIG, employeeService, fireAuthService, $firebase, $firebaseObject) {
	console.log(CONFIG.BASE_URL);
	$scope.pageTitle = "This is Employee page.";
	$scope.employees = [];

	/** Firebase */
	// var user = authService.user;
	// console.log(user);
	let storageRef = firebase.storage().ref();
	// console.log(storageRef);
	let dbRef = firebase.database().ref('Contacts');
	let pushKey = dbRef.push().key;

	$scope.formData = $firebaseObject(dbRef.child(pushKey));
	$scope.contacts = $firebaseObject(dbRef);

	$scope.addFireData = function (event) {
		event.preventDefault();

		$scope.formData.$value = {
			name: 'Pui',
			fullName: 'Kanjana Thammawong',
			address: '777/529'
		}; 
		
		$scope.formData.$save()
		.then(function (res) {
			console.log(res);
		});
	};
	/** Firebase */

	$scope.getEmployees = employeeService.getEmployeeList()
		.then(function (res) {
			console.log(res);
		}, function (err) {
			console.log(err);
		});
})