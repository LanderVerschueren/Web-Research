(function() {
	var initials = "LV";
	var number = "0110599-19";

	var app = angular.module( "login-directives", [] );

	app.directive( "loginTemplate", function() {
		return {
			restrict: 'E',
			templateUrl: "html/login-template.html",
			controller: [ "$http", "$scope", function( $http, $scope ) {
				/* 
				Css animatie bij login en log pagina, 
				verdwijnen van de icons voor de input fields
				*/
				$(".input").focusin(function() {
					$(this).find("span").animate({
						"opacity": "0"
					}, 200);
				});

				$(".input").focusout(function() {
					$(this).find("span").animate({
						"opacity": "1"
					}, 300);
				});
				/* Codepen: http://codepen.io/reidark/pen/uAmey */

				$scope.submitLogin = function() {
					initials = document.getElementById( "inputInitials" ).value;
					number = document.getElementById( "inputNumber" ).value;

					if( initials != "" && number != "" ) {
						$http({
							method : "jsonp",
							url : "http://multimediatechnology.be/workload/stud.php",
							params: {
								studentid: number,
								initials: initials,
								callback: 'JSON_CALLBACK'
							}
						})
						.success(function(response) {
							$scope.vakken = response.courses;
							$scope.info = response.student;
							$scope.info.loggedIn = true;
							$scope.info.showCourses = true;
							$scope.info.studentid = number;

							$scope.getData();
						}, function myError(response) {
							
							console.log("Error!");
						});
					}
					else {
						console.log( "error, initials or number" );
					}
				};
			}],
			controllerAs: "loginCtrl"
		};
	});
})();