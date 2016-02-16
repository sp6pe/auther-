'use strict'

app.controller('loginCtrl',function($scope,LoginFactory,$state){


	$scope.login = function(email,pwd){

		var loginObj ={'email':email, 'pwd':pwd}


		LoginFactory.create(loginObj)
		.then(function(res){
			if(res.data === 'OK'){
				$state.go('stories')
			}
		})

		
	}

})



app.factory('LoginFactory',function($http){


	var LoginFactory ={
			create: function(obj){
		  		
			return $http.post('/login',obj)
			.then(function(res){
				console.log('response on factory', res)
				return res;
			})
		},

		logout:function(){
			//console.log('logout is working')
			return $http.delete('/logout').then(function(res){
				return res;
			})
		}

	}

	return LoginFactory;

})

//1) check to see if already a user 
//2) if not then create new user 