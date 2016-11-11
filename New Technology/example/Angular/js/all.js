(function() {

	var app = angular.module( "all-directives", [] );

	app.directive( "allTemplate", function() {
		return {
			restrict: 'E',
			templateUrl: "html/all-template.html",
			controller: [ "$scope", "$http", function( $scope, $http ) {
				$scope.getData = function() {
					$http ({
						method: 'jsonp',
						url: 'http://multimediatechnology.be/workload/log.php',
						params: {
							appkey: "01021994",
							studentid: $scope.info.studentid,
							callback: "JSON_CALLBACK"
						}
					})
					.success(function(response) {
						$scope.logs = response.results;
					})
				}
			}],
			controllerAs: "allCtrl"
		};
	});
})();