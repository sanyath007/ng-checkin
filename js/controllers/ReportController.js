app.controller('ReportController', function ($scope,$http,CONFIG,checkinService,$uibModal,$log) {
	console.log(CONFIG.BASE_URL);
	$scope.pageHeader = "ข้อมูลบุคลากร";
	$scope.pageTitle = "";

	$scope.checkins = [];
	$scope.checkinImg = '';
	$scope.checkinDate = moment().format('YYYY-MM-DD');

	$scope.$watch("checkinDate", function(newValue, oldValue) {
        $scope.getCheckinData($scope.checkinDate);
    	$scope.getCheckinPie($scope.checkinDate);
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

  	$scope.pieOptions = {};
    $scope.initPieChart = function(_container, _title, _seriesName) {
        $scope.pieOptions = {
            chart: {
                renderTo: _container,
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: _title
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
                percentageDecimals: 1
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        connectorColor: '#000000',
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    }
                }
            },
            series: [{
                type: 'pie',
                name: _seriesName,
                data: []
            }]
        };
    };

    $scope.barOptions = {};
    $scope.initBarChart = function(_container, _title, _categories) {
        $scope.barOptions = {
            chart: {
                renderTo: _container,
                type: 'column'
            },
            title: {
                text: _title
            },
            xAxis: {
                categories: _categories
            },
            series: []
        };
    };

    $scope.getCheckinPie = function (checkinDate) {
        checkinService.getCheckinPie(checkinDate)
        .then(function(res) {
            console.log(res);
            $scope.initPieChart("pieContainer", "สัดส่วนการลงเวลาปฏิบัติงาน จำแนกตามคะแนน", "สัดส่วน");
            angular.forEach(res.data, function(value, key) {
                $scope.pieOptions.series[0].data.push({name: value.score, y: parseInt(value.num)});
            });

            var chart = new Highcharts.Chart($scope.pieOptions);
        }, function(err) {
            console.log(err);
        });
    };
});