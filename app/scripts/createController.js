homeApp.controller('createController', ['$scope', 'sharedInfo','$http', function($scope,sharedInfo,$http) {


	$scope.destination="";
	$scope.groupSize="";
	$scope.delivery="";
	$scope.payment="";
	$scope.paymentC="";
	$scope.paymentV="";
	$scope.paymentK="";
	$scope.typeOfFood="";
	$scope.PP="";
	$scope.startTime="";
	$scope.endTime="";
	$scope.month="";
	$scope.day="";
	$scope.year="";
	$scope.username="";
	$scope.password="";
	$scope.otherUsers=[];
	$scope.otherPasswords=[];


	$scope.typesOfPayment=["Cash","Venmo","Karma"];
	$scope.times=["9:00","9:15","9:30","9:45","10:00","10:15","10:30","10:45","11:00",
	"11:15","11:30","11:45","12:00","12:15","12:30","12:45",
	"1:00","1:15","1:30","1:45","2:00","2:15","2:30","2:45","3:00"];



	$scope.reviewScheduling=function(){


		$scope.lunchObj={
		destination:$scope.destination,
		food:$scope.typeOfFood,
		groupSize:$scope.groupSize,
		startTime:$scope.startTime,
		endTime:$scope.endTime,
		delivery:$scope.delivery,
		PP:$scope.PP,
		cash:$scope.paymentC,
		venmo:$scope.paymentV,
		karma:$scope.paymentK,
		month:$scope.month,
		day:$scope.day,
		year:$scope.year,
		username:$scope.username,
		password:$scope.password,
		otherUsers:$scope.otherUsers,
		otherPasswords:$scope.otherPasswords
		};


		var notEmpty=false;

		angular.forEach($scope.lunchObj, function(value, key){
			if(value!=null&&value!=false){
				notEmpty=true;
			}
		});

		if ($scope.lunchObj!=null && notEmpty==true ){
			console.log("object is not empty")
		}else{
			return null;
		}


		$scope.finalInfo="";
		angular.forEach($scope.lunchObj, function(value, key){
			if(value==true&&(key=="cash"||key=="venmo"||key=="karma")){
				$scope.finalInfo+=key+": accepted\n";
			}else if (value==false&&(key=="cash"||key=="venmo"||key=="karma")){
				$scope.finalInfo+=key+": denied\n";
			}

			else{
				$scope.finalInfo+=key+": "+value+"\n";
			}
		});

		var finalConfirmation = confirm($scope.finalInfo);

		if(finalConfirmation==true){
			alert("lunch has been scheduled");
			$http({
			   method: 'POST',
			   url: 'http://localhost:3000/api/addRun',
			   data:$scope.lunchObj
			})
			.success(function(){console.log("success")})
			.error(function(){console.log("fail")});

		}else{
			alert("you have canceled the lunch appointment");
		}
	}



	// $scope.recordRun=function(obj){
	// sharedInfo.recordInfo(obj);
	// }

}]);
