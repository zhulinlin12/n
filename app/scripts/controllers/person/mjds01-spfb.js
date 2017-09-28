/**
 * Created by Administrator on 2017/7/14.
 */

angular.module('request')
	.controller('mjds01-spfb', ['$scope', '$http', '$state', '$stateParams', 'commonHttp', function($scope, $http, $state, $stateParams, commonHttp) {

		//code值
		$scope.code_1 = '';
		$scope.code_2 = '';
		$scope.code_3 = '';
		$scope.data2=''
		$scope.data3=''
		$scope.btn_show = false;
		$scope.tp = 0;

		if(localStorage.id) {
			var constanttest = localStorage.id
		} else {
			$state.go('login')
			return;
		}
		$scope.tab = function(n) {
			$scope.tp = n
		}
if($stateParams.res){
	$scope.bob = JSON.parse(sessionStorage.setItem2)
	
  }else {
			$scope.type1 = '无';
			$scope.type2 = '';
			$scope.type3 = '';
			
		}
  var ati=0;
  var atir=0;
		//        最左分类

		var str = JSON.stringify({ // 将输出参数转为json字符
			"category": { //??
				memberId: constanttest,
				channel: "pc",
				deviceNo: "",
				functionCode: "MALLINDEX_CATEGORY",
				categoryCode: "",
				productType: "0",
				startRow: "0",
				pageSize: "10",
			}
		});

		var data_obj = JSON.stringify({
			"packageList": {
				"packages": {
					"header": {
						"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
						"comId": "CTO2O20170420",
						"comSerial": "comSerial",
						"from": "PAD",
						"orderSerial": "orderId",
						"requestType": "PRODUCTCATEGORIES", //??
						"sendTime": new Date().format("yyyy-MM-dd hh:mm:ss")
							//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
				}
			}
		});

		var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
		commonHttp.myHttp(md5_obj, data_obj, function(data, code, error) {
			$scope.data = JSON.parse(data);
			console.log('1级：')
			if($stateParams.res){
			if($scope.bob[0].hasOwnProperty('id')){
				angular.forEach($scope.data.category.categories, function(n, i) {
				if($scope.data.category.categories[i].code==$scope.bob[0].code){
					$scope.bob[0].index=i
					console.log(i)
				}
			})
				$scope.getCode($scope.bob[0], $scope.bob[0].index)
			}
			}
			console.log($scope.data.category.categories)
		});

		//获取code

		$scope.getCode = function(target, k) {
			
			$scope.data3 = ''
			$scope.sutr2 = -1
			$scope.type2 = '';
			$scope.type3 = '';
			$scope.sutr = k
			$('.tab_list .item').eq(2).find('.content').hide()
			$scope.btn_show = false;
			$scope.code_1 = target.code;
			//console.log(target.getAttribute('data'));
			$scope.type1 = target.name;
			//console.log('分类：' + $scope.type1);

			//   中间分类

			var strm = JSON.stringify({ // 将输出参数转为json字符
				"category": { //??
					memberId: constanttest,
					channel: "pc",
					deviceNo: "",
					functionCode: "SUBMENU",
					categoryCode: $scope.code_1,
					productType: "0",
					startRow: "0",
					pageSize: "10",
				}
			});
			//$scope.code_1

			var data_objm = JSON.stringify({
				"packageList": {
					"packages": {
						"header": {
							"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
							"comId": "CTO2O20170420",
							"comSerial": "comSerial",
							"from": "PAD",
							"orderSerial": "orderId",
							"requestType": "PRODUCTCATEGORIES", //??
							"sendTime": new Date().format("yyyy-MM-dd hh:mm:ss")
								//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
						},
						"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', strm)
					}
				}
			});

			var md5_objm = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_objm);
			commonHttp.myHttp(md5_objm, data_objm, function(data, code, error) {
				$scope.data2 = JSON.parse(data);
				//console.log('222级：')
			//	console.log($scope.data2)
			if($stateParams.res){
				if($scope.bob[0].hasOwnProperty('id')){
					if(ati==0){
						console.log(ati)
					
				angular.forEach($scope.data2.category.categories, function(n, i) {
				if($scope.data2.category.categories[i].code==$scope.bob[1].code){
					$scope.bob[1].index=i
					console.log(i)
				}
			})
				$scope.getCode2($scope.bob[1], $scope.bob[1].index)
				ati=1
				}
			}
			}
			});

		}

		$scope.getCode2 = function(target, k) {
			//console.log('zll')
			$scope.sutr3 = -1
			$scope.sutr2 = k
			$scope.btn_show = false;
			$scope.type3 = '';
			$scope.code_2 = target.code;
			//console.log(target.getAttribute('data'));
			$scope.type2 = target.name;
			//console.log('分类：' + $scope.type2);

			//   最后分类
			var strl = JSON.stringify({ // 将输出参数转为json字符
				"category": { //??
					memberId: constanttest,
					channel: "pc",
					deviceNo: "",
					functionCode: "SUBMENU",
					categoryCode: $scope.code_2,
					productType: "0",
					startRow: "0",
					pageSize: "10",
				}
			});

			var data_objl = JSON.stringify({
				"packageList": {
					"packages": {
						"header": {
							"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
							"comId": "CTO2O20170420",
							"comSerial": "comSerial",
							"from": "PAD",
							"orderSerial": "orderId",
							"requestType": "PRODUCTCATEGORIES", //??
							"sendTime": new Date().format("yyyy-MM-dd hh:mm:ss")
								//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
						},
						"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', strl)
					}
				}
			});

			var md5_objl = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_objl);
			commonHttp.myHttp(md5_objl, data_objl, function(data, code, error) {
				$scope.data3 = JSON.parse(data);
				//console.log($scope.data3)
				if($stateParams.res){
				if($scope.bob[0].hasOwnProperty('id')){
				//	console.log('zll45')
						if(atir==0){
					//console.log(atir)
				angular.forEach($scope.data3.category.categories, function(n, i) {
				if($scope.data3.category.categories[i].code==$scope.bob[2].code){
					$scope.bob[2].index=i
				}
			})
				$scope.getCode3($scope.bob[2], $scope.bob[2].index)
				atir=1
			}
				}	}
				
			});

		}

		$scope.getCode3 = function(target, k) {
			$scope.sutr3 = k
			$scope.btn_show = true;
			$scope.type3 = target.name;
			$scope.code_3 = target.code;

			//信息放入缓存
			localStorage.setItem('hc_type1', $scope.type1)
			localStorage.setItem('hc_type2', $scope.type2)
			localStorage.setItem('hc_type3', $scope.type3)
			localStorage.setItem('hc_typeCode', $scope.code_3)

		}
		if($stateParams.res) {
			
			console.log($scope.bob)
			
			if($scope.bob[0].hasOwnProperty('id')){
				//console.log('id')
			

	}else{
		console.log('id2')
		$scope.getCode($scope.bob[0], $scope.bob[0].index)
		$scope.getCode2($scope.bob[1], $scope.bob[1].index)
		$scope.getCode3($scope.bob[2], $scope.bob[2].index)
	}
			
		} 

		//下一步
		$scope.next = function() {

			sessionStorage.setItem2 = JSON.stringify([{
				"name": $scope.type1,
				"code": $scope.code_1,
				"index": $scope.sutr
			}, {
				"name": $scope.type2,
				"code": $scope.code_2,
				"index": $scope.sutr2
			}, {
				"name": $scope.type3,
				"code": $scope.code_3,
				"index": $scope.sutr3
			}])
if($stateParams.res){
	if($scope.bob[0].hasOwnProperty('id')){
		$state.go('index.mjds01-spfb2',({id:$scope.bob[0].id}))
		sessionStorage.setItem2 = JSON.stringify([{
				"name": $scope.type1,
				"code": $scope.code_1,
				"index": $scope.sutr,
				"id":$scope.bob[0].id
				
			}, {
				"name": $scope.type2,
				"code": $scope.code_2,
				"index": $scope.sutr2
			}, {
				"name": $scope.type3,
				"code": $scope.code_3,
				"index": $scope.sutr3
			}])
	}else{
			$state.go('index.mjds01-spfb2')
	}
			
			
	}else{
		$state.go('index.mjds01-spfb2')
	}
	
		}

	}])