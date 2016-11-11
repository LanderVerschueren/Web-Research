(function() {

	var app = angular.module( "course-directives", [] );

	app.directive( "courseTemplate", function() {
		return {
			restrict: 'E',
			templateUrl: "html/course-template.html",
			controller: [ "$scope", "$http", function( $scope, $http ) {
				$(".logout").click( function() {
					$scope.info.loggedIn = false;
					$scope.info.showCourses = false;
				})

				$scope.submit = function() {
					var element = this;
					$scope.params = { 
						appkey: '01021994',
						studentid: $scope.info.studentid,
						vakcode: element.vak.vakcode,
						vaknaam: element.vak.vaknaam,
						periodenaam: element.vak.periodenaam,
						studiepunten: element.vak.studiepunten,
						jaar: element.vak.opleidingsjaar
					};

					$scope.info.sentInfo = true;
					$scope.info.showCourses = false;
					$scope.info.empty = false;
					$scope.info.loggedIn = true;

					var nieuw = $("#nieuw");

					$scope.setPage( nieuw, false );
				}
			}],
			controllerAs: "courseCtrl"
		};
	});
})();