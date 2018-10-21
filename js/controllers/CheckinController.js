app.controller('CheckinController', function ($scope, CONFIG, employeeService, videoService, checkinService) {
	$scope.pageTitle = "ลงเวลาปฏิบัติงาน ประจำวันที่ " + moment().format('DD/MM/YYYY');
	$scope.onCamera = false;
	$scope.uploadImage = [];
	$scope.cid = '';
	$scope.timein = moment().format('HH:mm:ss');
	$scope.timeinImg = '';
	$scope.employee = {
		cid: '',
		fullName: '',
		position: '',
		timein: '',
		timeinScore: ''
	};

	/** Create object from element */
	const camera = document.getElementById('camera');
	const img = document.getElementById('displayImage');

	console.log(CONFIG.BASE_URL);

	$scope.cameraStart = function (event) {			
		$scope.onCamera = event.currentTarget.checked;

		if($scope.onCamera) {
			videoService.openVideo({ 
				video: { facingMode: "user" },
				audio: false
			})
			.then(function (stream) {
				window.localStream = stream;

				let track = stream.getTracks()[0];
				camera.srcObject = stream;
			})
			.catch(function (err) {
				console.log(err);
			});
		} else {
			/** stop both video and audio */
			videoService.stopVideo(localStream);
		}
	};

	$scope.checkin = function (event) {
		event.preventDefault();
		
		$scope.timeinImg = moment().format('DDMMYYHHmmss'); //set image name

		if($scope.cid === '' || !$scope.onCamera){
			toastr.error('กรุณาระบุเลข 13 หลัก และ เปิดกล้องก่อน !!!');
		} else {
			employeeService.getEmployeeInfo($scope.cid)
			.then(function (res) {
				console.log(res);

				if (res.data.employee) {
					$scope.employee = res.data.employee;
					
					checkinService.checkin({
						emp_id: $scope.employee.cid,
						checkin_date: moment().format('YYYY-MM-DD'),
						timein: $scope.timein,
						timein_img: $scope.timeinImg
					})
					.then(function (res) {
						console.log(res);
						$scope.employee.timein = res.data.timein;
						$scope.employee.timeinScore = res.data.timeinScore;
					}, function (err) {
						console.log(err);
					});

					/** Upload and show user checked in picture. */
					$scope.showPic(true);
				}
			}, function (err) {
				console.log(err);
			});
		}
	};

	$scope.showPic = function (withUpload) {
		/** Draw image on canvas. and Create data URL containing a representation of image */
		$scope.uploadImage = checkinService.drawOnCanvas(document.createElement("canvas"), camera);

		/** Display blob to image element */
		img.src = window.URL.createObjectURL(checkinService.dataURItoBlob($scope.uploadImage));

		if (withUpload) {
			$scope.uploadFileToServer(checkinService.dataURItoBlob($scope.uploadImage), $scope.timeinImg);
		}
	};

	/** Upload file to server. */
	$scope.uploadFileToServer = function (fileUrl, fileName) {
		let formData = new FormData();
	    formData.append('file', fileUrl, fileName);

		checkinService.uploadPic(formData)
		.then(function (res) {
			console.log('Success', res);
		}, function (res) {
			console.log('Error', res);
		});

		/** Firebase put file to storage */
		//: if request.auth != null
		// console.log(storageRef);
		// let imgFile = checkinService.dataURItoBlob($scope.uploadImage);
		// storageRef.child('images/' + filename + '.png').put(imgFile).then(function(snapshot) {
		//   	console.log('Uploaded a blob or file!');
		// });
	};
});