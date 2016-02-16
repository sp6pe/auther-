'use strict';

app.directive('navbar', function ($state, $location, LoginFactory) {
	return {
		restrict: 'E',
		templateUrl: '/browser/components/navbar/navbar.html',
		link: function (scope) {
			scope.pathStartsWithStatePath = function (state) {
				var partial = $state.href(state);
				var path = $location.path();
				return path.startsWith(partial);
			};

			scope.logout = function(){
				console.log('working');
				//prompts factory to send request 
				LoginFactory.logout().then(function(res){
					if(res.statusText === 'OK'){
						$state.go('home')
					}
				})
			}
		}
	}
});