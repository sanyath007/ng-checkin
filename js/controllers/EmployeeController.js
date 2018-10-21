app.controller('EmployeeController', function ($scope, CONFIG, employeeService, fireAuthService, $firebase, $firebaseObject) {
	console.log(CONFIG.BASE_URL);
	$scope.pageHeader = "ข้อมูลบุคลากร";
	$scope.pageTitle = "";
	$scope.employee = {
		cid: '',
		prefix: '',
		fname: '',
		lname: '',
		birthdate: '',
		sex: '',
		position: '2',
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

	$scope.addEmployee = function (event) {
		event.preventDefault();
		console.log($scope.employee);

		if ($scope.employee.cid !== '') {
			employeeService.addEmployee($scope.employee)
			.then(function (res) {
				console.log(res);
				toastr.success('บันทึกข้อมูลบุคลากรเรียบร้อย');

				$scope.employee = {
					cid: '',
					prefix: '',
					fname: '',
					lname: '',
					birthdate: '',
					sex: '',
					position: '2',
					level: ''
				};
			}, function (err) {
				console.log(err);
				toastr.error('ไม่สามารถเพิ่มข้อมูลได้ !!!');
			});
		} else {
			toastr.warning('กรุณาระบุเลข 13 หลักก่อน !!!');
		}
	}

	$scope.editEmployee = function (id) {
		console.log(id);
	}

	$scope.delEmployee = function (id) {
		if (confirm("คุณต้องการลบข้อมูลบุคลากรที่มีเลข 13 หลักเท่ากับ " +id+ " ใช่หรือไม่!")) {
			employeeService.delEmployee(id)
			.then(function (res) {
				console.log(res);
				toastr.success('ลบข้อมูลบุคลากรเรียบร้อย');

				$scope.getEmployees();
			}, function (err) {
				console.log(err);
				toastr.error('ไม่สามารถลบข้อมูลได้ !!!');
			});
		}
	}
})