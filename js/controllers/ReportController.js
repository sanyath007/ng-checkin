app.controller('ReportController', function ($scope, CONFIG, checkinService) {
	console.log(CONFIG.BASE_URL);
	$scope.pageHeader = "ข้อมูลบุคลากร";
	$scope.pageTitle = "";

	$scope.checkins = [];

	$scope.getCheckinData = function () {
		checkinService.getCheckinData()
		.then(function (res) {
			console.log(res);
			$scope.checkins = res.data.checkins;
		}, function (err) {
			console.log(err);
		});
	};

	$scope.showCheckinPic = function (fileName) {
		console.log(fileName);
	};
})