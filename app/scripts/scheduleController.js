homeApp.controller('scheduleController', ['$scope','sharedInfo','$http', function($scope,sharedInfo,$http) {

	$scope.scheduleArray=sharedInfo.schedule;
	$scope.removeAppointment=function(obj){
		sharedInfo.removeAppointmentFromSchedule(obj);
		$http({
		   method: 'POST',
		   url: 'http://localhost:3000/api/removeRunFromSchedule',
		   data:obj
		})
		.success(function(){console.log("success")})
		.error(function(){console.log("fail")});

	}



}]);

