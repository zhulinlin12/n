angular.module('yomApp', ['CommonService'])
	.controller('ck', ['$scope', '$http',"$stateParams",'commonHttp', '$document', '$interval', function($scope, $http,$stateParams, commonHttp, $document, $interval) {
console.log($stateParams.spid)
		//查看详情计划,需要传递的数据
		var str = JSON.stringify({
			"biddingDetail": {
				"memberId": "4444444444444",
				"channel": "pc",
				"deviceNo": "",
				"biddingId": $stateParams.spid
			}
		});
		//按照指定格式传递的数据
		var data_obj = JSON.stringify({
			"packageList": {
				"packages": {
					"header": {
						"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
						"comId": "CTO2O20170420",
						"comSerial": "comSerial",
						"from": "PAD",
						"orderSerial": "orderId",
						"requestType": "BIDDINGDETAIL",
						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
							//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
				}
			}
		});
		var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
		commonHttp.myHttp(md5_obj, data_obj, function(data) {

			$scope.data = JSON.parse(data);
			console.log($scope.data.biddingDetail.biddingList)
			//报价截止日期
			$scope.sarttime = new Date($scope.data.biddingDetail.biddingList[0].endTime).toLocaleString()
				//到货日期
			$scope.endtime = new Date($scope.data.biddingDetail.biddingList[0].arrivalTime).toLocaleString()
				//总金额计算
			$scope.zje = 0;
			angular.forEach($scope.data.biddingDetail.biddingList, function(data, index, array) {
				//console.log(arr[0].pp)
				$scope.zje += Number(parseFloat($scope.data.biddingDetail.biddingList[index].biddingNumber) * parseFloat($scope.data.biddingDetail.biddingList[index].biddingPrice))

			});
			if($scope.data.biddingDetail.biddingList[0].otherRequire == '') {
				$scope.other = '无'
			} else {
				$scope.other =$scope.data.biddingDetail.biddingList[0].otherRequire
			}
			

		});

	}]).controller('ckbj', ['$scope', '$http', 'commonHttp', '$document', '$interval', function($scope, $http, commonHttp, $document, $interval) {
		$scope.Uid="4444444444444"
        $scope.bidId="100f0d40300046f88782187f5c4044f0"	
		//查看报价,需要传递的数据
		var str = JSON.stringify({
			"biddingApplyDetail": {
				"memberId": "4444444444444",
				"channel": "pc",
				"deviceNo": "",
				"biddingId": "100f0d40300046f88782187f5c4044f0"	,
				"itemId":"0784f06aa1764dc28ef3a2c29c73f387"
			}
		});
		//按照指定格式传递的数据
		var data_obj = JSON.stringify({
			"packageList": {
				"packages": {
					"header": {
						"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
						"comId": "CTO2O20170420",
						"comSerial": "comSerial",
						"from": "PAD",
						"orderSerial": "orderId",
						"requestType": "BIDDINGAPPLYDETAIL",
						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
							//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
				}
			}
		});
		var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
		commonHttp.myHttp(md5_obj, data_obj, function(data) {

			$scope.data = JSON.parse(data);
			console.log($scope.data.biddingApplyDetail.applyDetailList[0])


		});

	}]).controller('bj', ['$scope', '$http', 'commonHttp', '$document', '$interval', function($scope, $http, commonHttp, $document, $interval) {

		//查看详情计划,需要传递的数据
		var str = JSON.stringify({
			"biddingOpenDetail": {
				"memberId": "4444444444444",
				"channel": "pc",
				"deviceNo": "",
				"itemId": "0784f06aa1764dc28ef3a2c29c73f387"
			}
		});
		//按照指定格式传递的数据
		var data_obj = JSON.stringify({
			"packageList": {
				"packages": {
					"header": {
						"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
						"comId": "CTO2O20170420",
						"comSerial": "comSerial",
						"from": "PAD",
						"orderSerial": "orderId",
						"requestType": "BIDDINGOPENDETAIL",
						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
							//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
				}
			}
		});
		var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
		commonHttp.myHttp(md5_obj, data_obj, function(data) {

			$scope.data = JSON.parse(data);
		   console.log($scope.data.biddingOpenDetail)


		});
		$scope.affirm=function(){
		
if($scope.offer){
//报价,需要传递的数据
		var str = JSON.stringify({
			"biddingApply": {
				"memberId": "4444444444444",
				"channel": "pc",
				"deviceNo": "",
				"biddingId": "100f0d40300046f88782187f5c4044f0"	,
				"orderCode":$scope.data.biddingOpenDetail.orderCode,
				"createTime":$scope.data.biddingOpenDetail.createTime,
				"otherRequire":$scope.data.biddingOpenDetail.otherRequire,
				"itemId":"0784f06aa1764dc28ef3a2c29c73f387",
				"applyItemList":[{
					"itemId":"0784f06aa1764dc28ef3a2c29c73f387",
					"createTime":$scope.data.biddingOpenDetail.createTime,
					"biddingType":$scope.data.biddingOpenDetail.biddingType,
					"endTime":$scope.data.biddingOpenDetail.endTime,
					"biddingPrice":$scope.offer,
					"arrivalTime":$scope.data.biddingOpenDetail.arrivalTime,
					"deliveryAddre":$scope.data.biddingOpenDetail.deliveryAddre,
					"typeShipping":$scope.data.biddingOpenDetail.typeShipping,
					"transportTool":$scope.data.biddingOpenDetail.transportTool,
					"packingMethod":$scope.data.biddingOpenDetail.packingMethod,
					"otherRequire":$scope.data.biddingOpenDetail.otherRequire,
					"description":$scope.data.biddingOpenDetail.description
				}]
			}
		});
		//按照指定格式传递的数据
		var data_obj = JSON.stringify({
			"packageList": {
				"packages": {
					"header": {
						"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
						"comId": "CTO2O20170420",
						"comSerial": "comSerial",
						"from": "PAD",
						"orderSerial": "orderId",
						"requestType": "BIDDINGAPPLY",
						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
							//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
				}
			}
		});
		var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
		commonHttp.myHttp(md5_obj, data_obj, function(data) {

			$scope.we = JSON.parse(data);
		   console.log($scope.we)


		});
			
		}else{
			$scope.wr=true;
		}
		}
		
		

	}]).controller('order', ['$scope', '$http', 'commonHttp', '$document', '$interval', function($scope, $http, commonHttp, $document, $interval) {
		$scope.Uid="4444444444444"
        $scope.bidId="100f0d40300046f88782187f5c4044f0"	
		//查看报价,需要传递的数据
		var str = JSON.stringify({
			"biddingApplyDetail": {
				"memberId": $scope.Uid,
				"channel": "pc",
				"deviceNo": "",
				"biddingId": $scope.bidId,
				"itemId":"0784f06aa1764dc28ef3a2c29c73f387"
			}
		});
		//按照指定格式传递的数据
		var data_obj = JSON.stringify({
			"packageList": {
				"packages": {
					"header": {
						"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
						"comId": "CTO2O20170420",
						"comSerial": "comSerial",
						"from": "PAD",
						"orderSerial": "orderId",
						"requestType": "BIDDINGAPPLYDETAIL",
						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
							//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
				}
			}
		});
		var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
		commonHttp.myHttp(md5_obj, data_obj, function(data) {

			$scope.data = JSON.parse(data);
			console.log($scope.data.biddingApplyDetail.applyDetailList[0])


		});

	}])
	


