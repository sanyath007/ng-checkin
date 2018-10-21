app.directive("fileread", function () {
    return {
      	scope: {
        	fileread: "="
      	},
      	link: function (scope, elm, attr) {
	        elm.bind("change", function (changeEvent) {
	          	var reader = new FileReader();
	          	console.log(reader);
	          	reader.onload = function (loadEvent) {
	            	scope.$apply(function () {
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