
homeApp.controller('joinController', ['$scope','$location', '$window', 'sharedInfo','$http', function($scope,$location,$window,sharedInfo,$http) {


	$scope.$on('findDataBroadcast', function(event,response){
		$scope.appsArray=response;
	});




	$scope.removeRun=function(obj){
		console.log(obj);

		var passwordAttempt= prompt("Please enter the password to delete this event");
		console.log(passwordAttempt);
		console.log(obj.password);
		if (obj.password === passwordAttempt){
			var removingObj={};
			for (var item in obj){
				if(item!="_id"){
					removingObj[item]=obj[item];
				}
			}

			$http({
			   method: 'POST',
			   url: 'http://localhost:3000/api/removeRun',
			   data:removingObj
			})
			.success(function(){
			// sharedInfo.removeAppointment(obj);

				console.log("success")
			})
			.error(function(e){console.log(e)});
		}else{
			alert("The password you entered was incorrect. \nYou do not have privilege to remove this appointment");
		}

	}

	$scope.updateRun = function(obj){

		$scope.newUser=prompt("please enter your username");
		if ($scope.newUser==null){
			return null;
		}
		$scope.newPassword=prompt("please enter your password");
		if (obj["otherUsers"].indexOf($scope.newUser)!=-1 || $scope.newUser=="" || $scope.newPassword==null){
			return null;
		}

		(obj["otherUsers"]!=null) ? $scope.otherUsersArray=obj["otherUsers"] : $scope.otherUsersArray=[];
		$scope.otherUsersArray.push($scope.newUser);

		(obj["otherPasswords"]!=null) ? $scope.otherPasswordsArray = obj["otherPasswords"] : $scope.otherPasswordsArray = [];
		$scope.otherPasswordsArray.push($scope.newPassword);

		$scope.newObj={};
		for (var item in obj){
			if(item=="_id"){
				$scope.newObj[item]=obj[item];
				//console.log(item+": "+$scope.newObj[item])
			}
		}

		var updateObj = [$scope.newObj,$scope.otherUsersArray,$scope.otherPasswordsArray];
		$http({
		   method: 'POST',
		   url: 'http://localhost:3000/api/updateRun',
		   data:updateObj
		})
		.success(function(){

		console.log("success")
		})
		.error(function(e){console.log(e)});

	}




	$scope.removeUpdate = function(obj, person){
		$scope.passwordAttempt=prompt("please enter your password");

		var index = obj["otherUsers"].indexOf(person);
		if ($scope.passwordAttempt == obj["otherPasswords"][index]){

			$scope.otherUsersArray=obj["otherUsers"];
			$scope.otherUsersArray.splice(index,1);

			$scope.otherPasswordsArray = obj["otherPasswords"];
			$scope.otherPasswordsArray.splice(index,1);

			$scope.newObj={};
			for (var item in obj){
				if(item=="_id"){
					$scope.newObj[item]=obj[item];
					//console.log(item+": "+$scope.newObj[item])
				}
			}

			var updateObj = [$scope.newObj,$scope.otherUsersArray,$scope.otherPasswordsArray];
			$http({
			   method: 'POST',
			   url: 'http://localhost:3000/api/updateRun',
			   data:updateObj
			})
			.success(function(){

			console.log("success")
			})
			.error(function(e){console.log(e)});

		}else{
			alert("that is the wrong password")
		}

	}

}]);
