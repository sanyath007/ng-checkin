app.controller('ReportController', function ($scope,$http,CONFIG,checkinService,$uibModal,$log) {
	console.log(CONFIG.BASE_URL);
	$scope.pageHeader = "ข้อมูลบุคลากร";
	$scope.pageTitle = "";

	$scope.checkins = [];
	$scope.checkinImg = '';
	$scope.checkinDate = moment().format('YYYY-MM-DD');

	$scope.$watch("checkinDate", function(newValue, oldValue) {
    	$scope.getCheckinData($scope.checkinDate);
	});

	$scope.getCheckinData = function (date) {
		checkinService.getCheckinData(date)
		.then(function (res) {
			console.log(res);
			$scope.checkins = res.data.checkins;
		}, function (err) {
			console.log(err);
		});
	};

	var pc = this;
	pc.data = "";

	pc.open = function (size, fileName) {
		pc.data = "http://api.mnrh.com/uploads/" + fileName;

	    var modalInstance = $uibModal.open({
	      	animation: true,
	      	ariaLabelledBy: 'modal-title',
	      	ariaDescribedBy: 'modal-body',
	      	templateUrl: '../pages/modal-content.html',
	      	controller: 'ModalInstanceCtrl',
	      	controllerAs: 'pc',
	      	size: size,
	      	resolve: {
		        data: function () {
		          	return pc.data;
		        }
	      	}
	    });
  	};
});