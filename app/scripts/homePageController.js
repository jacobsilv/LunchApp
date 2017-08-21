var homeApp = angular.module('homeApp', []);

homeApp.service("sharedInfo",function(){
	var that=this;
	that.lunchApps=[];
	// that.schedule=[];


	that.recordInfo = function(obj){
		var notEmpty=false;

		angular.forEach(obj, function(value, key){
			if(value!=null&&value!=false){
				notEmpty=true;
			}
		});

		(obj!=null && notEmpty==true )?that.lunchApps.push(obj):null;


	}

});




homeApp.controller('homePageController', ['$scope','$location', '$window','$http','sharedInfo', function($scope,$location,$window,$http,sharedInfo) {
	$scope.heading="E-LUNCH";

	$scope.mainOptions=[

	{
		tab:"Create",
		desc:"create a lunch run"
	},


	{
		tab:"Join",
		desc:"join a lunch run"
	}];


	$scope.mainInfo="";
	$scope.tabName="";



	$scope.tabPicked = function(option){

		for (var i=0;i< $scope.mainOptions.length;i++){
			if (option.tab === $scope.mainOptions[i].tab){
				$scope.mainInfo=$scope.mainOptions[i].desc.toUpperCase();
				$scope.tabName=$scope.mainOptions[i].tab;

			}
		}
	}


	$scope.makeLunchRuns=function(){
		sharedInfo.lunchApps=[];
		$http({
	   		method: 'GET',
	   		url: 'http://localhost:3000/api/joinRun'

		}).then(function successCallback(response) {


			for (var item in response.data.message){
				//console.log(response.data.message[item])

				sharedInfo.recordInfo(response.data.message[item]);
			}
			//console.log(sharedInfo.lunchApps);
			$scope.$broadcast('findDataBroadcast', sharedInfo.lunchApps);

	   // this callback will be called asynchronously
	   // when the response is available
		}, function errorCallback(response) {
	   // called asynchronously if an error occurs
	   // or server returns response with an error status.
		});
	}





}]);
