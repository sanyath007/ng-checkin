app.controller('EmployeeController', function ($scope, $location, CONFIG, employeeService, fireAuthService, $firebase, $firebaseObject) {
	console.log(CONFIG.BASE_URL);
	$scope.pageHeader = ($location.url() === '/employee-form') ? "เพิ่มบุคลากร" : "ข้อมูลบุคลากร";
	$scope.pageTitle = "";
	$scope.employee = {
		cid: '',
		prefix: '',
		fname: '',
		lname: '',
		birthdate: '',
		sex: '',
		position: '',
		level: ''
	};
	$scope.employees = [];
	$scope.positions = [];

	/** Firebase */
	// let user = authService.user;
	// let storageRef = firebase.storage().ref();
	// let dbRef = firebase.database().ref('Contacts');
	// let pushKey = dbRef.push().key;

	// $scope.formData = $firebaseObject(dbRef.child(pushKey));
	// $scope.contacts = $firebaseObject(dbRef);

	// $scope.addFireData = function (event) {
	// 	event.preventDefault();

	// 	$scope.formData.$value = {
	// 		name: 'Pui',
	// 		fullName: 'Kanjana Thammawong',
	// 		address: '777/529'
	// 	}; 
		
	// 	$scope.formData.$save()
	// 	.then(function (res) {
	// 		console.log(res);
	// 	});
	// };
	/** Firebase */

	$scope.getEmployees = function () {
		employeeService.getEmployeeList()
		.then(function (res) {
			console.log(res);
			$scope.employees = res.data.employees;
		}, function (err) {
			console.log(err);
		});
	};

	$scope.getPositions = function () {
		employeeService.getPositionList()
		.then(function (res) {
			console.log(res);
			$scope.positions = res.data.positions;
		}, function (err) {
			console.log(err);
		});
	};

	$scope.addEmployee = function (event, form) {
		event.preventDefault();
		console.log($scope.employee);

		if (form.$invalid) {
			toastr.warning('กรุณาข้อมูลให้ครบก่อน !!!');
			return;
		}

		// employeeService.addEmployee($scope.employee)
		// .then(function (res) {
		// 	console.log(res);
		// 	toastr.success('บันทึกข้อมูลบุคลากรเรียบร้อย');

		// 	$scope.employee = {
		// 		cid: '',
		// 		prefix: '',
		// 		fname: '',
		// 		lname: '',
		// 		birthdate: '',
		// 		sex: '',
		// 		position: '2',
		// 		level: ''
		// 	};
		// }, function (err) {
		// 	console.log(err);
		// 	toastr.error('ไม่สามารถเพิ่มข้อมูลได้ !!!');
		// });
	};

	$scope.editEmployee = function (cid) {
		console.log(cid);
		$location.path('employee-edit').search({cid: cid}); // redirect to edit form with cid.
	};

	$scope.getEmployee = function () {
		$scope.pageHeader = "แก้ไขข้อมูลบุคลากร";
		var qs_params = $location.search();
		console.log(qs_params);

		employeeService.getEmployee(qs_params.cid)
		.then(function (res) {
			console.log(res);
			$scope.employee = {
				cid: res.data.employee.emp_id,
				prefix: res.data.employee.prefix,
				fname: res.data.employee.emp_fname,
				lname: res.data.employee.emp_lname,
				birthdate: res.data.employee.birthdate,
				sex: res.data.employee.sex,
				position: res.data.employee.position_id,
				level: res.data.employee.position_level
			};
		}, function (err) {
			console.log(err);
		});
	};

	$scope.updateEmployee = function (event) {
		if (confirm("คุณต้องการแก้ไขข้อมูลบุคลากรรหัส " +$scope.employee.cid+ " ใช่หรือไม่!")) {
			employeeService.updateEmployee($scope.employee.cid, $scope.employee)
			.then(function (res) {
				console.log(res);
				toastr.success('แก้ไขข้อมูลบุคลากรเรียบร้อย');

				$location.path('employee'); // Redirect to employee list.
			}, function (err) {
				console.log(err);
				toastr.error('ไม่สามารถแก้ไขข้อมูลได้ !!!');
			});
		}
	};

	$scope.delEmployee = function (cid) {
		if (confirm("คุณต้องการลบข้อมูลบุคลากรรหัส " +cid+ " ใช่หรือไม่!")) {
			employeeService.delEmployee(cid)
			.then(function (res) {
				console.log(res);
				toastr.success('ลบข้อมูลบุคลากรเรียบร้อย');

				$scope.getEmployees();
			}, function (err) {
				console.log(err);
				toastr.error('ไม่สามารถลบข้อมูลได้ !!!');
			});
		}
	};
})