(function () {
	// 'use strict';

	var app = angular.module('checkin', []);

	app.constant('moment', moment);

	app.factory('_', ['window', () => {
		return window._;
	}]);

	app.service('userService', function($http) {		
		this.getUserInfo = (data) => {
			return $http.get('http://web2.mnrh.com/api/get_userinfo.php?cid=' + data);
		};
	});

	app.controller('formController', ($scope, userService) => {
		$scope.test = "Please check in your time. On " + moment().format('DD-MM-YY');
		$scope.uploadImage = [];
		$scope.person = {};

		const camera = document.getElementById('camera');
		// const input = document.getElementById('photo');
		// const drawer = document.getElementById('drawer');
		const img = document.getElementById('displayImage');

		var constraints = { 
			video: { facingMode: "user" },
			audio: false
		};

		$scope.cameraStart = () => {
			navigator.mediaDevices.getUserMedia(constraints)
			.then((stream) => {
				console.log(stream);

				let track = stream.getTracks()[0];
				camera.srcObject = stream;
			})
			.catch((err) => {
				console.error("Oops. Something is broken.", err);
			})
		};

		$scope.drawOnCanvas = (event) => {
			event.preventDefault();

			let c = document.createElement("canvas");

			/** Draw image on canvas. */
			c.width = camera.width;
			c.height = camera.height;
			c.getContext('2d').drawImage(camera, 0, 0);

			/** Append canvas to container that in this case it's <div> */
			// drawer.appendChild(c);

			/** Create data URL containing a representation of image */
			$scope.uploadImage = c.toDataURL('image/png', 1.0);
			// console.log($scope.uploadImage);
	
			/** Display blob to image element */
			img.src = window.URL.createObjectURL(dataURItoBlob($scope.uploadImage));
			
			userService.getUserInfo($scope.person.cid)
			.then((res) => {
				console.log(res);
				$scope.person = res.data;
			}, (err) => {
				console.log(err);
			});
		};

		/** Upload file to server. */
		$scope.uploadFileToServer = (event) => {
			event.preventDefault();

			let formData = new FormData();			
		    let imgBlob = dataURItoBlob($scope.uploadImage);

		    formData.append('file', imgBlob);

			// $http.post('http://web2.mnrh.com/api/upload_image.php', formData, {
			// 	transformRequest: angular.identity,
			// 	headers: {
			// 		'Content-Type': undefined
			// 	}
			// })
			// .then((res) => {
			// 	console.log('Success', res);
			// }, (res) => {
			// 	console.log('Error', res);
			// });
		};

		function dataURItoBlob(dataURI) {
	      	var binary = atob(dataURI.split(',')[1]);
	      	var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
	      	var array = [];

	      	for (var i = 0; i < binary.length; i++) {
	        	array.push(binary.charCodeAt(i));
	      	}

	      	return new Blob([new Uint8Array(array)], {
	        	type: mimeString
	      	});
	    }

	});

	app.directive("fileread", () => {
	    return {
	      	scope: {
	        	fileread: "="
	      	},
	      	link: (scope, elm, attr) => {
		        elm.bind("change", (changeEvent) => {
		          	var reader = new FileReader();
		          	console.log(reader);
		          	reader.onload = (loadEvent) => {
		            	scope.$apply(() => {
		              		scope.fileread = loadEvent.target.result;
		              		console.log(scope.fileread);	
		            	});
		          	};
		          	
		          	reader.readAsDataURL(changeEvent.target.files[0]);
              		console.log(reader);	
		        });
	      	}
	    }
	});
})();