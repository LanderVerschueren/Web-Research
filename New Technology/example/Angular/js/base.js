(function() {
	var app = angular.module( 'workload', [ 'login-directives', 'course-directives', 'log-directives', 'all-directives' ] );

	app.controller( 'WorkloadController', function( $scope ) {
		$scope.info = {
			loggedIn: false,
			sentInfo: false,
			showCourses: false,
			empty: true,
			showError: false,
			allLogs: false
		}

		$scope.setPage = function( data, boolean ) {
			if ( boolean == true ) {
				switchData = data.currentTarget;
			}
			else {
				switchData = data[0];
			}

			switch( switchData.id ) {
				case 'home':
					if( switchData.className === 'active' ) {
						data.preventDefault();
					}
					else {
						$( "ul.nav li" ).removeClass();
						switchData.className += "active";

						$scope.info.showCourses = true;
						$scope.info.sentInfo = false;
						$scope.info.allLogs = false;
					}
					break;
				case 'nieuw':
					if( switchData.className === 'active' ) {
						data.preventDefault();
					}
					else {
						$( "ul.nav li" ).removeClass();
						switchData.className += "active";

						$scope.info.showCourses = false;
						$scope.info.sentInfo = true;
						$scope.info.allLogs = false;
					}
					break;
				case 'alle':
					if( switchData.className === 'active' ) {
						data.preventDefault();
					}
					else {
						$( "ul.nav li" ).removeClass();
						switchData.className += "active";

						$scope.info.showCourses = false;
						$scope.info.sentInfo = false;
						$scope.info.allLogs = true;
					}
					break;	
				case 'afmelden':
					$( "ul.nav li#afmelden" ).addClass( 'active' );

					$scope.info.loggedIn = false;
					$scope.info.showCourses = false;
					$scope.info.sentInfo = false;
					$scope.info.allLogs = false;	

					console.log( $scope );
					break;			
				default:
					console.log( 'default' );
			}
		}
	});

})();