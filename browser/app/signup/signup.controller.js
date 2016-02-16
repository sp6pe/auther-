'use strict'

app.controller('signupCtrl',function($scope,SignupFactory,$state){



	$scope.signup = function(email,pwd){

		var signupObj ={'email':email, 'pwd':pwd}

		//console.log('controller', signupObj)
		SignupFactory.create(signupObj)
		.then(function(res){
			console.log('response in ctrl', res);
			if(res.statusText === 'Created'){
				$state.go('stories')
			}
		})

		
	}

})



app.factory('SignupFactory',function($http){


	var SignupFactory ={
			create: function(obj){
		  	//console.log('create singup fatory', obj)
			return $http.post('/signup',obj)
			.then(function(res){
				console.log('response on factory', res)
				return res;
			})
		}

	}

	return SignupFactory;

})
