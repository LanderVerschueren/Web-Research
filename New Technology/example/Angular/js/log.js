(function() {

	var app = angular.module( "log-directives", [] );

	app.directive( "logTemplate", function() {
		return {
			restrict: 'E',
			templateUrl: "html/log-template.html",
			controller: [ "$scope", "$http", function( $scope, $http ) {
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

				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth()+1; //January is 0!
				var yyyy = today.getFullYear();

				if(dd<10) {
				    dd='0'+dd
				} 

				if(mm<10) {
				    mm='0'+mm
				} 

				today = yyyy+'-'+mm+'-'+dd;
				$("#pickDate").val( today );

				$scope.log = function() {
					var params = $scope.params;
					var urenGewerkt = $(".log-input").val();
					var date = $("#pickDate").val();

					if( urenGewerkt === "" || params === undefined ) {
						console.log("Something went wrong");
					}
					else {
						$http({
							method : "jsonp",
							url : "http://multimediatechnology.be/workload/week.php",
							params : {
								date: date,
								callback : "JSON_CALLBACK"
							}
						})
						.success(function(response) {
							$http({
								method: "jsonp",
								url: "http://multimediatechnology.be/workload/log.php",
								params: {
									appkey: params.appkey,
									studentid: params.studentid,
									vakcode: params.vakcode,
									week: response.weeknr,
									uren: urenGewerkt,
									extra: params.vaknaam,
									callback : "JSON_CALLBACK"
								}
							}).success(function(response) {
								var home = $("#home");

								$scope.setPage( home, false );

							}, function myError(response) {
								console.log("Error!");
							});

						}, function myError(response) {
							console.log("Error!");
						});
					};
				}
			}],
			controllerAs: "logCtrl"
		};
	});
})();