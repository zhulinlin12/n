angular.module('hzyApp')
    .controller('chenum', ['$scope', '$state', '$stateParams','commonHttp', '$location', '$window','$http', function($scope, $state, $stateParams,commonHttp, $location, $window,  $http) {

if(localStorage.id) {
			//console.log('7777')
			var constanttest = localStorage.id
		} else {
			var constanttest = ''
			return;
		}
		 $('body,html').animate({scrollTop:0},0);
		function styui(){
			
		
		var str2 = JSON.stringify({
			"cart": {
				"memberId": constanttest,
				"channel": "PC",
				"deviceNo": "2"
			}
		});
			// 按照指定格式传递的数据
		var data_obj2 = JSON.stringify({
			"packageList": {
				"packages": {
					"header": {
						"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
						"comId": "CTO2O20170420",
						"comSerial": "comSerial",
						"from": "PAD",
						"orderSerial": "orderId",
						"requestType": "PRODUCTCARTLIST",
						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
							// new Date().format('yyyy-MM-dd
							// hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str2)
				}
			}
		});

		var md5_obj2 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj2);
		commonHttp.myHttp(md5_obj2, data_obj2, function(data,code) {
			if(code==0){
				$scope.cart = JSON.parse(data).cart;
			console.log($scope.uiop);
			
			if($scope.cart.count==''){
				$scope.cart.count=0
				$scope.uiop=0
				$scope.$emit('uiop',$scope.uiop);
			}else{
				$scope.uiop=$scope.cart.count
				$scope.$emit('uiop',$scope.uiop);
				if(parseFloat($scope.cart.count)>parseFloat(99)){
				$scope.uiop='99+'
				  $scope.$emit('uiop',$scope.uiop);
			}
			}
			}
			//      console.log(data);
			

		});
		}
		styui()
		
}])