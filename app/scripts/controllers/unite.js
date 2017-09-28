angular.module('bids', ['CommonService'])
	.controller('unt', ['$scope', '$rootScope', '$http', '$state', 'commonHttp', '$document', '$interval', function($scope, $rootScope, $http, $state, commonHttp, $document, $interval) {
	if(localStorage.id){
		console.log('7777')
	var  constanttest=localStorage.id
	}else{
		console.log('222')
		$state.go('login')
		return;
	}
		sessionStorage.removeItem("riqi")
		sessionStorage.removeItem("dh")
		$scope.pp = true;
		$scope.p = 0;
		//三级联动
		$scope.error = {};
		$scope.str = []
		$scope.list = [];
//		if(localStorage.id){
//			var mid=DES3.decrypt("",localStorage.id)
//		}
		console.log(constanttest)

		$scope.submit = function() {
			$scope.error.province = $scope.selected ? false : true;
			$scope.error.city = $scope.selected2 ? false : true;
			if($scope.list2){
				if($scope.list2.length!=0){
				   $scope.error.area = $scope.selected3 ? false : true;
			}
			}else{
				 $scope.error.area = $scope.selected3 ? false : true;
			}
			
	     
			if($scope.error.province == false && $scope.error.city == false&&$scope.error.area==false) {
				var options = $e("#op option:selected");
				var sheng = options.text()
				var options2 = $e("#op2 option:selected");
				var shi = options2.text()
				var options3 = $e("#op3 option:selected");
				var qu = options3.text()
				if($scope.list2.length==0){
					qu=''
				}
				var yt = {
					"province": sheng,
					"city": shi,
					"county":qu
				};
				if(JSON.stringify($scope.str).indexOf(JSON.stringify(yt)) == -1) {
					$scope.str.push({
						"province": sheng,
						"city": shi,
						"county":qu
					})
					console.log($scope.str)

				}
			}

		};
		$scope.scc = function(n) {
				$scope.str.splice(n, 1);
			}
			/*。。三级联动完。。。*/
			//今天日期
		$scope.time = new Date().format('yyyy-MM-dd')
			//      $scope.error2 = [{
			//      	"city2":"",
			//      	"city3":"",
			//      	
			//      }]

		//   $scope.stus=[{"id":"1","name":"张三"},{"id":"2","name":"李四"}];
		$scope.wr = false;
		$scope.myption = "iwe";
		$scope.time = new Date().format('yyyy-MM-dd')
		$scope.sarr = [{
			"materialType": "",
			"materialType1": "",
			"materialType2": "",
			"materialModel": "",
			"materialName": "",
			"materialUnit": "",
			"biddingNumber": ""

		}];
		//数量失去焦点
		$scope.number = function(index) {
				if($scope.sarr[index].biddingNumber) {
	var city4 = 'city4' + index;
	$scope.error[city4] = false;
}
if($scope.sarr[index].biddingNumber == '') {
	var city4 = 'city4' + index;
	$scope.error[city4] = true;
	console.log('ooo')
	return;
	
}
if(!isNaN($scope.sarr[index].biddingNumber)) {
	//   alert('000')
	var city4 = 'city4' + index;
	$scope.error[city4] = false;
	if(String($scope.sarr[index].biddingNumber).indexOf('.') > -1) {
		var city4 = 'city4' + index;
		$scope.error[city4] = true;
		$scope.sarr[index].biddingNumber = ''
	} else {
		var city4 = 'city4' + index;
		$scope.error[city4] = false;
	}
} else {
	var city4 = 'city4' + index;
	$scope.error[city4] = true;
	$scope.sarr[index].biddingNumber = ''

}

			}
			//物资名称失去焦点
		$scope.material = function(index) {
			if($scope.sarr[index].materialName) {
				var city2 = 'city2' + index;
				$scope.error[city2] = false;
			}
			if($scope.sarr[index].materialName == '') {
				var city2 = 'city2' + index;
				$scope.error[city2] = true;
			}
		}
		$scope.sdx = function(index) {
			console.log($scope.sarr[index].materialType)
			var city1 = 'city1' + index;
			var city2 = 'city2' + index;
			var city3 = 'city3' + index;
			var city4 = 'city4' + index;
			var city5 = 'city5' + index;
			$scope.error[city2] = $scope.sarr[index].materialName ? false : true;
			$scope.error[city1] = $scope.sarr[index].materialType ? false : true;
			$scope.error[city3] = $scope.sarr[index].materialUnit ? false : true;
			$scope.error[city4] = $scope.sarr[index].biddingNumber ? false : true;
			$scope.error[city5] = $scope.sarr[index].materialModel ? false : true;
			console.log($scope.sarr[index].materialName)
			if($scope.error[city1] == false && $scope.error[city2] == false && $scope.error[city3] == false && $scope.error[city4] == false) {
				$scope.p++
					$scope.sarr.push({
						"materialType": "",
						"materialType1": "",
						"materialType2": "",
						"materialModel": "",
						"materialName": "",
						"materialUnit": "",
						"biddingNumber": ""

					})
			} else {
				console.log($scope.error.city1, $scope.error.city2, $scope.error.city3, $scope.error.city4)
			}

		}
		$scope.sts_shch = function(index) {
			$scope.sarr.splice(index, 1);
			$scope.p--
		}
		var $e = angular.element;

		function shenqing(n) {
			console.log(n)
			var index = $scope.sarr.length - 1;
			var city1 = 'city1' + index;
			var city2 = 'city2' + index;
			var city3 = 'city3' + index;
			var city4 = 'city4' + index;
			$scope.error[city2] = $scope.sarr[index].materialName ? false : true;
			$scope.error[city1] = $scope.sarr[index].materialType ? false : true;
			$scope.error[city3] = $scope.sarr[index].materialUnit ? false : true;
			$scope.error[city4] = $scope.sarr[index].biddingNumber ? false : true;
			if($scope.error[city1] == true || $scope.error[city2] == true || $scope.error[city3] == true || $scope.error[city4] == true) {
				return;
			}
			if($e("#shoip label").hasClass("error")) {
				console.log('qqq')
				return;
			}
			if(!$scope.requirements) {
				$e(".zhil").attr('id', 'feed2');
				return;
			}
			if($scope.str.length == 0) {
				$scope.error.province = true;
				$scope.error.city = true;
				if($scope.list2){
					if($scope.list2.length!=0){
						$scope.error.area = true;
					}
				}else{
				$scope.error.area = true;
				}
				
			
				return;
			}
			if(!$e("#end").val() || !$e("#start").val()) {
				$scope.show = true;
				return;

			} else {
				$scope.show = false;
//				var s = $e("#end").val()
//				var w = $e("#start").val()
//				var reg = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/;
//				if(!s.match(reg)) {
//					$scope.show = true;
//					return;
//				} else {
//					var d = new Date(Date.parse(s.replace(/-/g, "/")));
//					var curDate = new Date();
//					if(d <= curDate) {
//						$scope.show = true;
//						return;
//					}
//				}
//				if(!w.match(reg)) {
//					$scope.show = true;
//					return;
//				} else {
//					var d1 = new Date(Date.parse(w.replace(/-/g, "/")));
//					var curDate1 = new Date();
//					if(d1 <= curDate1) {
//						$scope.show = true;
//						return;
//					}
//				}

			}
			//判断联系人是否为空
			if(!$scope.name) {
				$scope.wr2 = true;
				return;
			}
			//判断联系电话是否为空
			if(!$scope.contact) {
				$scope.wr = true;
				return;
			}
			if($scope.riqis == undefined || $scope.riqis == '') {
				$scope.riqi5 = new Date().format("hh:mm:ss")
			} else {
				$scope.riqi5 = $scope.riqis
			}

			var arr = JSON.parse(JSON.stringify($scope.sarr))
			var str = JSON.parse(JSON.stringify($scope.str))
			console.log('噢噢噢噢哦')
			console.log(arr)
			console.log(str)
				//提交数据
			var strp = JSON.stringify({
				"biddingManage": {
					"memberId": constanttest,
					"channel": "pc",
					"deviceNo": "999",
					"functionCode": "ADD",
					"buttonCode": n,
					"biddingId": "12123131",
					"qualityAssurance": $scope.requirements,
					"otherRequire": $scope.other2,
					"arrivalCreateTime": $e("#start").val(),
					"arrivalEndTime": $e("#end").val(),
					"biddingType": "2",
					"contactPerson": $scope.name,
					"contactTel": $scope.contact,
					"createTime": new Date().format("yyyy-MM-dd"),
					"bindingItemList": arr,
					"deliverAddreList": str
				}
			});
			console.log(strp)
			var data_objp = JSON.stringify({
				"packageList": {
					"packages": {
						"header": {
							"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
							"comId": "CTO2O20170420",
							"comSerial": "comSerial",
							"from": "PAD",
							"orderSerial": "orderId",
							"requestType": "BIDDINGLHMANAGE",
							"sendTime": new Date().format("yyyy-MM-dd hh:mm:ss")
								//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
						},
						"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', strp)
					}
				}
			});
			console.log(data_objp)

			var md5_objp = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_objp);
			console.log(md5_objp)
			commonHttp.myHttp(md5_objp, data_objp, function(data, code, error) {

				$scope.data = JSON.parse(data);
				console.log(data)
				if(n == 'INSERT') {
					if($scope.data.biddingManage.applyMsg == 'operating Success') {
						$state.go('buyt.suclh', {
							"staut": 1
						});
					}
					return;
				}
				if(n == "ADD") {
					if($scope.data.biddingManage.applyMsg == 'operating Success') {
						$state.go('buyt.suclh', {
							"staut": 2
						});
					}
					return;
				}

			});
		}
		//申请提交按钮
		$scope.fb = function(n) {
			console.log(n)
			shenqing(n)
		}

	}]).controller('xgg', ['$scope',"$state", '$rootScope', '$http', '$stateParams', 'commonHttp', '$document', '$interval', function($scope, $state, $rootScope, $http, $stateParams, commonHttp, $document, $interval) {
					if(localStorage.id){
		var  constanttest=localStorage.id
	}else{
		$state.go('login')
		return;
	}
		//修改申请联合iu
		sessionStorage.removeItem("riqi")
		sessionStorage.removeItem("dh")
		$scope.pp = true;

		var sid = $stateParams.spid
			//详情接口
		var xg = JSON.stringify({
			"biddingLHDetail": {
				"memberId": constanttest,
				"channel": "1",
				"deviceNo": "2",
				"flag": "1",
				"biddingId": sid
			}
		});
		//按照指定格式传递的数据
		var data_objx = JSON.stringify({
			"packageList": {
				"packages": {
					"header": {
						"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
						"comId": "CTO2O20170420",
						"comSerial": "comSerial",
						"from": "PAD",
						"orderSerial": "orderId",
						"requestType": "BIDDINGLHDETAIL",
						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
							//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', xg)
				}
			}
		});
		console.log(data_objx)
		var md5_objx = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_objx);
		commonHttp.myHttp(md5_objx, data_objx, function(data, code, error) {
				console.log(JSON.parse(data))
				$scope.data = JSON.parse(data).biddingLHDetail
				$scope.name = $scope.data.contactPerson;
				$scope.contact = $scope.data.contactTel;
				$scope.startTime = $scope.data.arrivalCreateTime.split(' ')[0];
				$scope.endTime = $scope.data.arrivalEndTime.split(' ')[0];
				$scope.str = $scope.data.deliverAddreList;
				$scope.other2 = $scope.data.otherRequire;
				$scope.requirements = $scope.data.qualityAssurance;
				$scope.p = $scope.data.bindingItemList.length - 1;
				angular.forEach($scope.data.bindingItemList, function(data, i, array) {
					$scope.xz = function(index, uo) {
						if(uo) {

							var city1 = 'city1' + index;
							$scope.error[city1] = false;
							var city3 = 'city3' + index;
							$scope.error[city3] = false;
							var city5 = 'city5' + index;
							$scope.error[city5] = false;
							console.log(index)
							var str2 = JSON.stringify({
								"category": {
									"memberId": constanttest,
									"channel": "1",
									"deviceNo": "2",
									"functionCode": "SUBMENU",
									"categoryCode": uo,
									"startRow": 0,
									"pageSize": 0
								}
							});
							//按照指定格式传递的数据
							var data_obj3 = JSON.stringify({
								"packageList": {
									"packages": {
										"header": {
											"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
											"comId": "CTO2O20170420",
											"comSerial": "comSerial",
											"from": "PAD",
											"orderSerial": "orderId",
											"requestType": "PRODUCTCATEGORIES",
											"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
												//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
										},
										"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str2)
									}
								}
							});
							var md5_obj3 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj3);
							commonHttp.myHttp(md5_obj3, data_obj3, function(data) {
								var res = 'res' + index;
								$scope[res] = JSON.parse(data);
								//$scope.datat+(index) = JSON.parse(data);
								console.log($scope[res])

							})
						} else {
							var city1 = 'city1' + index;
							$scope.error[city1] = true;
							$scope.sarr[index].materialType2 = ''
							var arr2 = 'arr2' + index;
							$scope[arr2] = '';
							var arr3 = 'arr3' + index;
							$scope[arr3] = ''
						}
					}

					$scope.ej = function(index, uo) {
						console.log(uo)
						var str2 = JSON.stringify({
							"category": {
								"memberId": constanttest,
								"channel": "1",
								"deviceNo": "2",
								"functionCode": "SUBMENU",
								"categoryCode": uo,
								"startRow": 0,
								"pageSize": 0
							}
						});
						//按照指定格式传递的数据
						var data_obj3 = JSON.stringify({
							"packageList": {
								"packages": {
									"header": {
										"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
										"comId": "CTO2O20170420",
										"comSerial": "comSerial",
										"from": "PAD",
										"orderSerial": "orderId",
										"requestType": "PRODUCTCATEGORIES",
										"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
											//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
									},
									"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str2)
								}
							}
						});

						var md5_obj3 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj3);
						commonHttp.myHttp(md5_obj3, data_obj3, function(data) {
							var rew = 'rew' + index;
							$scope[rew] = JSON.parse(data);
							//$scope.datat+(index) = JSON.parse(data);
							//	console.log(data)
							//$scope.sarr[index].materialType =$scope.data.bindingItemList[i].materialType

						})

					}

					$scope.guige = function(index, uo) {
						var arr2 = 'arr2' + index;
						$scope[arr2] = "";
						var arr3 = 'arr3' + index;
						$scope[arr3] = ""
						console.log(uo)

						var str4 = JSON.stringify({
							"skuProp": {
								"memberId": constanttest,
								"channel": "1",
								"deviceNo": "2",
								"functionCode": "BIDCATEGORYSKU",
								"categoryCode": uo,
								"productId": ""
							}
						});
						//按照指定格式传递的数据
						var data_obj4 = JSON.stringify({
							"packageList": {
								"packages": {
									"header": {
										"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
										"comId": "CTO2O20170420",
										"comSerial": "comSerial",
										"from": "PAD",
										"orderSerial": "orderId",
										"requestType": "PRODUCTCATEGORYSKU",
										"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
											//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
									},
									"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str4)
								}
							}
						});

						var md5_obj4 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj4);
						commonHttp.myHttp(md5_obj4, data_obj4, function(data, code, error) {
							var rer = 'rer' + index;
							$scope[rer] = JSON.parse(data);
							//$scope.datat+(index) = JSON.parse(data);
							console.log(data)
							angular.forEach($scope[rer].skuProp.skuPropList, function(data, iy, array) {
								console.log($scope[rer].skuProp.skuPropList[iy].sort)
								if($scope[rer].skuProp.skuPropList[iy].name == "规格") {
									console.log(i)
									var arr2 = 'arr2' + index;
									$scope[arr2] = $scope[rer].skuProp.skuPropList[iy].propCodeList;

									console.log($scope[arr2])
									$scope.sarr[i].materialModel = $scope.data.bindingItemList[i].materialModel
								} else {
									if($scope[rer].skuProp.skuPropList[iy].name == "型号") {
										var arr2 = 'arr2' + index;
										$scope[arr2] = $scope[rer].skuProp.skuPropList[iy].propCodeList;

										console.log($scope[arr2])
										$scope.sarr[i].materialModel = $scope.data.bindingItemList[i].materialModel
									}
								}
								if($scope[rer].skuProp.skuPropList[iy].name == "计量单位") {
									var arr3 = 'arr3' + index;
									$scope[arr3] = $scope[rer].skuProp.skuPropList[iy].propCodeList;
									$scope.sarr[i].materialUnit = $scope.data.bindingItemList[i].materialUnit
								}
							})
							if($scope[arr2]) {
								var city5 = 'city5' + index;
								$scope.error[city5] = false;
							}
							if($scope[arr3]) {
								var city3 = 'city3' + index;
								$scope.error[city3] = false;
							}
							//			if($scope[rer].skuProp.skuPropList.sort==1){
							//				$scope.sarr[index].materialUnit=$scope[rer].skuProp.skuPropList.propCodeList
							//			}
							//			

						})

					}
					$scope.xz(i, $scope.data.bindingItemList[i].materialType1)
						//$scope.sarr[i].materialType2 = $scope.data.bindingItemList[i].materialType2
					$scope.ej(i, $scope.data.bindingItemList[i].materialType2)
					$scope.guige(i, $scope.data.bindingItemList[i].materialType)
						//	$scope.sarr[i].materialUnit =$scope.data.bindingItemList[i].materialUnit
				})
				$scope.sarr = $scope.data.bindingItemList;
				//$scope.list = JSON.parse(data).baseCode
				//			$scope.sarr[index].materialType=$scope[rew].category.categories[0].code
				//			$scope.guige(index,$scope[rew].category.categories[0].code)
			})
			//三级联动
		$scope.error = {};
		$scope.str = []
		$scope.list = [];

	$scope.submit = function() {
			$scope.error.province = $scope.selected ? false : true;
			$scope.error.city = $scope.selected2 ? false : true;
	       if($scope.list2){
				if($scope.list2.length!=0){
				   $scope.error.area = $scope.selected3 ? false : true;
			}
			}else{
				 $scope.error.area = $scope.selected3 ? false : true;
			}
			
	     
			if($scope.error.province == false && $scope.error.city == false&&$scope.error.area==false) {
				var options = $e("#op option:selected");
				var sheng = options.text()
				var options2 = $e("#op2 option:selected");
				var shi = options2.text()
				var options3 = $e("#op3 option:selected");
				var qu = options3.text()
				if($scope.list2.length==0){
					qu=''
				}
				var yt = {
					"province": sheng,
					"city": shi,
					"county":qu
				};
				if(JSON.stringify($scope.str).indexOf(JSON.stringify(yt)) == -1) {
					$scope.str.push({
						"province": sheng,
						"city": shi,
						"county":qu
					})
					console.log($scope.str)

				}
			}

		};
		$scope.scc = function(n) {
				$scope.str.splice(n, 1);
			}
			/*。。三级联动完。。。*/
			//今天日期
		$scope.time = new Date().format('yyyy-MM-dd')
			//      $scope.error2 = [{
			//      	"city2":"",
			//      	"city3":"",
			//      	
			//      }]

		//   $scope.stus=[{"id":"1","name":"张三"},{"id":"2","name":"李四"}];
		$scope.wr = false;
		$scope.myption = "iwe";
		$scope.time = new Date().format('yyyy-MM-dd')
		$scope.sarr = [{
			"materialType": "",
			"materialType1": "",
			"materialType2": "",
			"materialModel": "",
			"materialName": "",
			"materialUnit": "",
			"biddingNumber": ""

		}];
		//数量失去焦点
		$scope.number = function(index) {
				if($scope.sarr[index].biddingNumber) {
					var city4 = 'city4' + index;
					$scope.error[city4] = false;
				}
				if($scope.sarr[index].biddingNumber == '') {
					var city4 = 'city4' + index;
					$scope.error[city4] = true;
				}

			}
			//物资名称失去焦点
		$scope.material = function(index) {
			if($scope.sarr[index].materialName) {
				var city2 = 'city2' + index;
				$scope.error[city2] = false;
			}
			if($scope.sarr[index].materialName == '') {
				var city2 = 'city2' + index;
				$scope.error[city2] = true;
			}
		}
		$scope.sdx = function(index) {
			console.log($scope.sarr[index].materialType)
			var city1 = 'city1' + index;
			var city2 = 'city2' + index;
			var city3 = 'city3' + index;
			var city4 = 'city4' + index;
			var city5 = 'city5' + index;
			$scope.error[city2] = $scope.sarr[index].materialName ? false : true;
			$scope.error[city1] = $scope.sarr[index].materialType ? false : true;
			$scope.error[city3] = $scope.sarr[index].materialUnit ? false : true;
			$scope.error[city4] = $scope.sarr[index].biddingNumber ? false : true;
			$scope.error[city5] = $scope.sarr[index].materialModel ? false : true;
			console.log($scope.sarr[index].materialName)
			if($scope.error[city1] == false && $scope.error[city2] == false && $scope.error[city3] == false && $scope.error[city4] == false) {
				$scope.p++
					$scope.sarr.push({
						"materialType": "",
						"materialType1": "",
						"materialType2": "",
						"materialModel": "",
						"materialName": "",
						"materialUnit": "",
						"biddingNumber": ""

					})
			} else {
				console.log($scope.error.city1, $scope.error.city2, $scope.error.city3, $scope.error.city4)
			}

		}
		$scope.sts_shch = function(index) {
			$scope.sarr.splice(index, 1);
			$scope.p--
		}
		var $e = angular.element;

		function shenqing(n) {
			console.log(n)
			var index = $scope.sarr.length - 1;
			var city1 = 'city1' + index;
			var city2 = 'city2' + index;
			var city3 = 'city3' + index;
			var city4 = 'city4' + index;
			$scope.error[city2] = $scope.sarr[index].materialName ? false : true;
			$scope.error[city1] = $scope.sarr[index].materialType ? false : true;
			$scope.error[city3] = $scope.sarr[index].materialUnit ? false : true;
			$scope.error[city4] = $scope.sarr[index].biddingNumber ? false : true;
			if($scope.error[city1] == true || $scope.error[city2] == true || $scope.error[city3] == true || $scope.error[city4] == true) {
				return;
			}
			if($e("#shoip label").hasClass("error")) {
				console.log('qqq')
				return;
			}
			if(!$scope.requirements) {
				$e(".zhil").attr('id', 'feed2');
				return;
			}
			if($scope.str.length == 0) {
				$scope.error.province = true;
				$scope.error.city = true;
					if($scope.list2){
					if($scope.list2.length!=0){
						$scope.error.area = true;
					}
				}else{
				$scope.error.area = true;
				}
				return;
			}
			if(!$e("#end").val() || !$e("#start").val()) {
				$scope.show = true;
				return;

			} else {
			$scope.show = false;
//				var s = $e("#end").val()
//				var w = $e("#start").val()
//				var reg = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/;
//				if(!s.match(reg)) {
//					$scope.show = true;
//					return;
//				} else {
//					var d = new Date(Date.parse(s.replace(/-/g, "/")));
//					var curDate = new Date();
//					if(d <= curDate) {
//						$scope.show = true;
//						return;
//					}
//				}
//				if(!w.match(reg)) {
//					$scope.show = true;
//					return;
//				} else {
//					var d1 = new Date(Date.parse(w.replace(/-/g, "/")));
//					var curDate1 = new Date();
//					if(d1 <= curDate1) {
//						$scope.show = true;
//						return;
//					}
//				}
			}
			//判断联系人是否为空
			if(!$scope.name) {
				$scope.wr2 = true;
				return;
			}
			//判断联系电话是否为空
			if(!$scope.contact) {
				$scope.wr = true;
				return;
			}
			if($scope.riqis == undefined || $scope.riqis == '') {
				$scope.riqi5 = new Date().format("hh:mm:ss")
			} else {
				$scope.riqi5 = $scope.riqis
			}

			var arr = JSON.parse(JSON.stringify($scope.sarr))
			var str = JSON.parse(JSON.stringify($scope.str))
			console.log('噢噢噢噢哦')
			console.log(arr)
			console.log(str)
				//提交数据
			var strp = JSON.stringify({
				"biddingManage": {
					"memberId": constanttest,
					"channel": "pc",
					"deviceNo": "999",
					"functionCode": "EDIT",
					"buttonCode": n,
					"biddingId": $stateParams.spid,
					"qualityAssurance": $scope.requirements,
					"otherRequire": $scope.other2,
					"arrivalCreateTime": $e("#start").val(),
					"arrivalEndTime": $e("#end").val(),
					"biddingType": "2",
					"contactPerson": $scope.name,
					"contactTel": $scope.contact,
					"createTime": new Date().format("yyyy-MM-dd"),
					"bindingItemList": arr,
					"deliverAddreList": str
				}
			});
			console.log(strp)
			var data_objp = JSON.stringify({
				"packageList": {
					"packages": {
						"header": {
							"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
							"comId": "CTO2O20170420",
							"comSerial": "comSerial",
							"from": "PAD",
							"orderSerial": "orderId",
							"requestType": "BIDDINGLHMANAGE",
							"sendTime": new Date().format("yyyy-MM-dd hh:mm:ss")
								//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
						},
						"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', strp)
					}
				}
			});
			console.log(data_objp)

			var md5_objp = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_objp);
			console.log(md5_objp)
			commonHttp.myHttp(md5_objp, data_objp, function(data, code, error) {

				$scope.data = JSON.parse(data);
				console.log(data)
				if(n == "INSERT") {
					if($scope.data.biddingManage.applyMsg == 'Update Success') {
						$state.go('buyt.suclh', {
							"staut": 1
						});
					}
					return;
				}
				if(n == "ADD") {
					if($scope.data.biddingManage.applyMsg == 'Update Success') {
						$state.go('buyt.suclh', {
							"staut": 3
						});
					}
					return;
				}

			});
		}
		//申请提交按钮
		$scope.fb = function(n) {
			shenqing(n)
		}

	}]).controller('succse', ['$scope', '$rootScope', "$stateParams", '$http', 'commonHttp', '$document', '$interval', function($scope, $rootScope, $stateParams, $http, commonHttp, $document, $interval) {
		if($stateParams.staut == 1) {
			$scope.suced = "提交";
			return;
		}
		if($stateParams.staut == 2) {
			$scope.suced = "保存";
			return;
		}
		if($stateParams.staut == 3) {
			$scope.suced = "修改";
			return;
		}

	}]).controller('lb', ['$scope','$rootScope','$state', '$http', 'commonHttp', '$document', '$interval', function($scope,$rootScope,$state, $http, commonHttp, $document, $interval) {
		$scope.up = true;
		$scope.lhhide=false;
				if(localStorage.id){
		var  constanttest=localStorage.id
	}else{
		$state.go('login')
		return;
	}
	if(angular.element('#start').val()==''){
		var start=angular.element('#start').val()
	}else{
		var start=''
	}
	if(angular.element('#end').val()==''){
		var end=angular.element('#end').val()
	}else{
		var start=''
	}
		//分页
		function setPage(length, amount, num, first) { //创建保存页码数组的函数
			//length数据总条数
			//amount每页数据条数
			//num保留的页码数
			//first第一页的页码
			var pages = []; //创建分页数组
			var page = Math.ceil(length / amount);
			var ty;
			if(page <= num) {
				for(var i = 1; i <= page; i++) {
					pages.push(i);
				}
			}
			if(page > num) {
				for(var i = first; i < first + num; i++) {
					pages.push(i);
				}
			}
			return pages;
		}
		//查看招标列表,需要传递的数据
		var str = JSON.stringify({
			"bidding": {
				"memberId": constanttest,
				"channel": "pc",
				"deviceNo": "23",
				"materialType": "",
				"materialName": "",
				"beginDate": '',
				"endDate": "",
				"keywords": 0,
				"pageNumber": 0
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
						"requestType": "BIDDINGLHLIST",
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
				if($scope.data.bidding.all != 0) {
					$scope.up=true;
					$scope.lhhide=false;
					console.log($scope.data)
					$scope.firstPage = 1;
					$scope.pageNum = 5;
					$scope.page = 1;
					$scope.num = $scope.data.bidding.all;
					var amount = $scope.data.bidding.all; //数据总条数
					var each = 10; //每页显示的条数
					$scope.sub = function(page) {
						console.log(page)
						fn("0", page)
						$scope.lastPage = Math.ceil(amount / each);
						if(page >= $scope.pageNum) {
							$scope.firstPage = page - Math.floor($scope.pageNum / 2);
						} else {
							$scope.firstPage = 1;
						}
						if($scope.firstPage > $scope.lastPage - $scope.pageNum) {
							$scope.firstPage = $scope.lastPage - $scope.pageNum + 1;
						}
						$scope.pages = setPage(amount, each, $scope.pageNum, $scope.firstPage);
						$scope.page = page;
					}

					$scope.sub(1);
				}else{
					$scope.up=false;
					$scope.lhhide=true;
				}
				console.log(JSON.parse(data).bidding)

			})
		$scope.pl={
			
		}
		var ubs=0

		
			//点击切换事件
		$scope.yb = function(su) {
				console.log(su)
				ubs=su
					//查看招标列表,需要传递的数据
				var str = JSON.stringify({
					"bidding": {
						"memberId": constanttest,
						"channel": "pc",
						"deviceNo": "23",
						"materialType": "",
						"materialName": "",
						"beginDate": "",
						"endDate": "",
						"keywords": su,
						"pageNumber": 0
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
								"requestType": "BIDDINGLHLIST",
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
					if(su === 0) {
						$scope.number = $scope.data.bidding.all //全部
					} else if(su === 1) {
						$scope.number = $scope.data.bidding.waitReview //待审核
					} else if(su === 2) {
						$scope.number = $scope.data.bidding.notPass //未通过
					} else if(su === 3) {
						$scope.number = $scope.data.bidding.waitPurchase //未发布
					} else if(su === 4) {
						$scope.number = $scope.data.bidding.waitPayment //待付款
					} else if(su === 5) {
						$scope.number = $scope.data.bidding.waitEvaluation //待评价
					}
							$scope.$watch('data', function() {
			if($scope.data!=undefined){
				
			}
			
			
		})
					console.log($scope.number)
					if($scope.number != 0) {
						$scope.up = true;
						$scope.firstPage = 1;
						$scope.pageNum = 5;
						$scope.page = 1;
						$scope.num = $scope.number;
						var t = true;
						var amount = $scope.number; //数据总条数
						var each = 10; //每页显示的条数
						$scope.sub = function(page) {
							console.log(page)
							fn(su, page)
							$scope.lastPage = Math.ceil(amount / each);
							if(page >= $scope.pageNum) {
								$scope.firstPage = page - Math.floor($scope.pageNum / 2);
							} else {
								$scope.firstPage = 1;
							}
							if($scope.firstPage > $scope.lastPage - $scope.pageNum) {
								$scope.firstPage = $scope.lastPage - $scope.pageNum + 1;
							}
							$scope.pages = setPage(amount, each, $scope.pageNum, $scope.firstPage);
							$scope.page = page;
						}

						$scope.sub(1);
					} else {
						$scope.up = false;
					}
				});
			}
			//接口函数
		function fn(wr, pp) {
			$scope.up = true;
			var str2 = JSON.stringify({
				"bidding": {
					"memberId":constanttest,
					"channel": "pc",
					"deviceNo": "23",
					"materialType": "",
					"materialName": "",
					"beginDate": "",
					"endDate": "",
					"keywords": wr,
					"pageNumber": (pp - 1) * 10
				}
			});
			//按照指定格式传递的数据
			var data_obj2 = JSON.stringify({
				"packageList": {
					"packages": {
						"header": {
							"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
							"comId": "CTO2O20170420",
							"comSerial": "comSerial",
							"from": "PAD",
							"orderSerial": "orderId",
							"requestType": "BIDDINGLHLIST",
							"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
								//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
						},
						"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str2)
					}
				}
			});
			var md5_obj2 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj2);
			commonHttp.myHttp(md5_obj2, data_obj2, function(data) {

				$scope.data = JSON.parse(data);

			});
	
		}
				//搜索点击
		$scope.lbss=function(){
			console.log(ubs)
			console.log($scope.pl.type,$scope.pl.type2,$scope.pl.type3,angular.element('#start').val(),angular.element('#end').val())
			var str = JSON.stringify({
					"bidding": {
						"memberId": constanttest,
						"channel": "pc",
						"deviceNo": "23",
						"materialType": $scope.pl.type2,
						"materialName": $scope.pl.type3,
						"beginDate": angular.element('#start').val(),
						"endDate": angular.element('#end').val(),
						"keywords": ubs,
						"pageNumber": 0
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
								"requestType": "BIDDINGLHLIST",
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
					console.log($scope.data)
					
					
				})
		}
		
		//发布
		$scope.push=function(mm,n){
			var push = JSON.stringify({
			"biddingManage": {
				"memberId": constanttest,
				"channel": "1",
				"deviceNo": "2",
				"functionCode":"PUSH",
				"biddingId": mm,
				"buttonCode":"",
				"qualityAssurance":""
			}
		});
		//按照指定格式传递的数据
		var data_objx = JSON.stringify({
			"packageList": {
				"packages": {
					"header": {
						"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
						"comId": "CTO2O20170420",
						"comSerial": "comSerial",
						"from": "PAD",
						"orderSerial": "orderId",
						"requestType": "BIDDINGLHMANAGE",
						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
							//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', push)
				}
			}
		});
		console.log(data_objx)
		var md5_objx = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_objx);
		commonHttp.myHttp(md5_objx, data_objx, function(data, code, error) {
			$scope.data = JSON.parse(data);
			if(n == 'INSERT') {
					if($scope.data.biddingManage.applyMsg == 'Submit Success') {
						$state.go('buyt.suclh', {
							"staut": 1
						});
					}
					return;
				}
			console.log(data)
		})
		}
		//删除
		$scope.del=function(n,index){
			var del = JSON.stringify({
			"biddingManage": {
				"memberId": constanttest,
				"channel": "1",
				"deviceNo": "2",
				"functionCode":"DELETE",
				"biddingId": n.biddingId,
				"buttonCode":"",
				"qualityAssurance":""
			}
		});
		//按照指定格式传递的数据
		var data_objx = JSON.stringify({
			"packageList": {
				"packages": {
					"header": {
						"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
						"comId": "CTO2O20170420",
						"comSerial": "comSerial",
						"from": "PAD",
						"orderSerial": "orderId",
						"requestType": "BIDDINGLHMANAGE",
						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
							//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', del)
				}
			}
		});
		console.log(data_objx)
		var md5_objx = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_objx);
		commonHttp.myHttp(md5_objx, data_objx, function(data, code, error) {
			$scope.data = JSON.parse(data);
				if($scope.data.biddingManage.applyMsg == 'Delete Success') {
					$e=angular.element;
			$e(".f-wq").eq(index).remove()
					$state.go('buyt.del');
					
				}
			console.log(data)
			
			$scope.yb(0)
			
		})
		}
		
		
		
		

	}]).controller('xqlh', ['$scope','$rootScope','$state', '$http','$stateParams', 'commonHttp', '$document', '$interval', function($scope, $rootScope,$state, $http,$stateParams, commonHttp, $document, $interval) {
	if(localStorage.id) {
		var constanttest = localStorage.id
	} else {
		$state.go('login')
		return;
	}
	//查看联合申请接口
var str = JSON.stringify({
			"biddingLHDetail": {
				"memberId": constanttest,
				"channel": "pc",
				"deviceNo": "23",
				"biddingId":$stateParams.spid,
				"flag":2
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
						"requestType": "BIDDINGLHDETAIL",
						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
							//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
				}
			}
		});
		var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
		commonHttp.myHttp(md5_obj, data_obj, function(data) {
			$scope.data=JSON.parse(data).biddingLHDetail
			console.log(JSON.parse(data))
			$scope.time=$scope.data.createTime.split(' ')[0]
			if($scope.data.otherRequire==''){
				$scope.data.otherRequire='无要求'
			}
})
	
	
	
	
}]).controller('supp', ['$scope','hexafy','tupurl','$stateParams','$rootScope','$state', '$http', 'commonHttp', '$document', '$interval', function($scope,hexafy,tupurl,$stateParams,$rootScope,$state, $http, commonHttp, $document, $interval) {
		if(localStorage.id){
		var  mid=localStorage.id
	}else{
		$state.go('login')
		return;
	}
		$scope.warn='ooooo'
					$('#myModal').modal('show')
	$scope.lhif=false;
		//查看招募信息详情,需要传递的数据
		var str2 = JSON.stringify({
			"biddingLHMsg": {
				"memberId": mid,
				"channel": "pc",
				"deviceNo": "23",
				"biddingId":$stateParams.bidd
				
			}
		});
		//按照指定格式传递的数据
		var data_obj2 = JSON.stringify({
			"packageList": {
				"packages": {
					"header": {
						"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
						"comId": "CTO2O20170420",
						"comSerial": "comSerial",
						"from": "PAD",
						"orderSerial": "orderId",
						"requestType": "BIDDINGLHMSG",
						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
							//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str2)
				}
			}
		});
		var md5_obj2 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj2);
		commonHttp.myHttp(md5_obj2, data_obj2, function(data,code,error) {
			$scope.data=JSON.parse(data).biddingLHMsg
			console.log(data)
			
			
			
		})
	$scope.title=sessionStorage.mc
		$scope.reader = new FileReader();   //创建一个FileReader接口
   $scope.form1;
      $scope.form2;
      $scope.form3;     //用于绑定提交内容，图片或其他数据
        
 
      $scope.form4;    //用于绑定提交内容，图片或其他数据
        

      $scope.form5;    //用于绑定提交内容，图片或其他数据
        
    
    $scope.error={}
    $scope.thumb = {};      //用于存放图片的base64
 $scope.ourl1=''//用于存放
  $scope.ourl2=''//用于存放
   $scope.ourl3=''//用于存放
    $scope.ourl4=''//用于存放
     $scope.ourl5=''//用于存放

 $scope.img_upload = function(files,n) {       //单次提交图片的函数
 	

 	if(files[0]){
 		var ourl='ourl'+n
 		 var tup='tup'+n
 		 $scope[tup]= false;
 		 var yt=files[0].name
        $scope.guid = (new Date()).valueOf();   //通过时间戳创建一个随机数，作为键名使用
        $scope[ourl]=files[0].name
        console.log($scope[ourl])
                 var data1 = new FormData();      //以下为像后台提交图片数据
        data1.append('pic', files[0]);
        data1.append('guid',$scope.guid);
          $http({
            method: 'post',
            url: tupurl,
            data:data1,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).then(function(data) {
        var form='form'+n
        	console.log(data.data)
        	var img='pp'
        	angular.element("#one-input").val('');
        $scope.po=''//清理缓存问题
            if (data) {
               // $scope[form].push({"KK":data.data.path});
          $scope[form]=data.data.path;
//              $scope.form['pp']=data.path
//              $scope.thumb[data.guid].status = 'SUCCESS';

                $scope.thumb[$scope.guid] = {
                    imgSrc : data.url,  //接收base64
                }
  
            }
          
        })
       

        
      
       }

   return;
  }
 //删除
 $scope.dels=function(n){
 	var ourl='ourl'+n
 	var form='form'+n
 
 	 $scope[form]='';
 	$scope[ourl]=''
 	 console.log($scope[ourl])
 	var tup='tup'+n
 	 $scope[tup]= $scope[ourl]!='' ? false : true;
 }
 //文本获取焦点
 $scope.fou=function(n){
 	var qinr='qinr'+n
 	var firm='firm'+n
 	 $scope[qinr]= $scope[firm] ? false : true;
 }
 //检查是否重复报名,需要传递的数据
		var str = JSON.stringify({
			"biddingLHCheck": {
				"memberId": mid,
				"channel": "pc",
				"deviceNo": "23",
				"flag":1,
				"biddingId":$stateParams.bidd
				
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
						"requestType": "BIDDINGLHCHECK",
						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
							//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
				}
			}
		});
		//console.log(str)
		var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
		commonHttp.myHttp(md5_obj, data_obj, function(data,code,error) {
			if(code==0){
				$scope.data2=JSON.parse(data).biddingLHCheck;
				console.log($scope.data2)
				if($scope.data2.status==1){
					$scope.warn=$scope.data2.applyMsg
					$('#myModal').modal('show')
					return;
				}
				
				
				
			}
		})
//点击报名按钮
$scope.sign=function(){
	if($scope.data2.status!=1){
		
	
	//校验不能为空

		$scope.qinr1 = $scope.firm1 ? false : true;
		$scope.tup1 = $scope.ourl1 != '' ? false : true;
		$scope.qinr2 = $scope.firm2 ? false : true;
		$scope.tup2 = $scope.ourl2 != '' ? false : true;
		$scope.qinr3 = $scope.firm3 ? false : true;
		$scope.tup3 = $scope.ourl3 != '' ? false : true;
		$scope.qinr4 = $scope.firm4 ? false : true;
		$scope.tup4 = $scope.ourl4 != '' ? false : true;
		$scope.qinr5 = $scope.firm5 ? false : true;
		$scope.tup5 = $scope.ourl5 != '' ? false : true;
		//判断联系人是否为空
			if(!$scope.name) {
				$scope.wr2 = true;
				return;
			}
			//判断联系电话是否为空
			if(!$scope.contact) {
				$scope.wr = true;
				return;
			}
			//判断发货地址是否为空
			if(!$scope.site) {
				$scope.wr3 = true;
				return;
			}
if($scope.qinr1==false&&$scope.qinr2==false&&$scope.qinr3==false&&$scope.qinr4==false&&$scope.qinr5==false&&$scope.tup1==false&&$scope.tup2==false&&$scope.tup3==false&&$scope.tup4==false&&$scope.tup5==false){
//	var form1 = JSON.parse(JSON.stringify($scope.form1))
			console.log($scope.form1)
			//供应商报名传的数据
			var str = JSON.stringify({
			"biddingLHApply": {
				"memberId": mid,
				"channel": "pc",
				"deviceNo": "23",
				"flag":"1",
				"biddingId":$scope.data.biddingId,
				'enterpriseDescription':$scope.firm1,
				"enterpriseFileImg":$scope.form1,
				"proDescription":$scope.firm2,
				"proDescriptionImg":$scope.form2,
				"proPerformance":$scope.firm5,
				"proPerformanceFile":$scope.form5,
				"qualityAssurance":$scope.firm3,
				"qualityAssuranceImg":$scope.form3,
				"otherRequire":$scope.firm4,
				"otherRequireFile":$scope.form4,
				"contactPerson":$scope.name,
				"contactTel":$scope.contact,
				'shipAddr':$scope.site
				
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
						"requestType": "BIDDINGLHAPPLY",
						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
							//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
				}
			}
		});
		var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
		commonHttp.myHttp(md5_obj, data_obj, function(data,code,error) {
			$scope.mw=JSON.parse(data)
			console.log(JSON.parse(data))
			if($scope.mw.biddingLHApply.applyMsg=='Purchaser Insert Success'){
				$state.go('buyt.bzjlh',{staur:2,bidd:$stateParams.bidd})
				return;
			}
			if($scope.mw.biddingLHApply.applyMsg=="已报名"){
				
				$scope.lhif=true;
				return;
			}
		})
		}else{
			console.log('金卡三')
			return;
		}
}else{
	if($scope.data2.status==1){
		$scope.warn=$scope.data2.applyMsg
					$('#myModal').modal('show')
	}
}
	
}
}]).controller('recruit', ['$scope','hexafy','$rootScope','$state', '$http','$stateParams', 'commonHttp', '$document', '$interval', function($scope,hexafy, $rootScope,$state, $http,$stateParams, commonHttp, $document, $interval) {
		if(localStorage.id){
		var  mid=localStorage.id
	}else{
		$state.go('login')
		return;
	}
	var weid=$stateParams.spid
	//查看招募信息详情,需要传递的数据
		var str = JSON.stringify({
			"biddingLHMsg": {
				"memberId": mid,
				"channel": "pc",
				"deviceNo": "23",
				"biddingId":weid
				
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
						"requestType": "BIDDINGLHMSG",
						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
							//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
				}
			}
		});
		var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
		commonHttp.myHttp(md5_obj, data_obj, function(data,code,error) {
			if(code==0){
				$scope.data=JSON.parse(data).biddingLHMsg;
				console.log(JSON.parse(data).biddingLHMsg)
				hexafy.myFunc.mc=$scope.data.title
				sessionStorage.mc=$scope.data.title
//				//采购商时间判断
//				var yourtime=$scope.data.purchaserEndTime.split(' ')[0];
//				var ty='24:00:00'
//             yourtime=yourtime+' '+ty
//yourtime = yourtime.replace("-","/");//替换字符，变成标准格式
//var d2=new Date();//取今天的日期
//var d1 = new Date(Date.parse(yourtime));
////alert(d1);
////alert(d2);
//if(d1<d2){
//	alert('已经过了采购商报名时间')
//	return;
//}else{
////	$scope.cg=function(){
////		$state.go('buyt.cgbmlh',{staur:2,bidd:$scope.data.biddingId})
////	}
//}
////供应商时间判断
//		var yourtime1=$scope.data.supplierEndTime.split(' ')[0];
//             yourtime1=yourtime1+' '+ty
//yourtime1 = yourtime1.replace("-","/");//替换字符，变成标准格式
//var d3=new Date();//取今天的日期
//var d4 = new Date(Date.parse(yourtime));
////alert(d1);
////alert(d2);
//if(d4<d3){
//	alert('已经过了供应商报名时间')
//	return;
//}else{
////	$scope.io=function(){
////		$state.go('buyt.supplh',{staur:2,bidd:$scope.data.biddingId})
////	}
//
//}
//				
			}
		})
		
		$scope.cg=function(nu){
			//检查是否重复报名,需要传递的数据
		var str = JSON.stringify({
			"biddingLHCheck": {
				"memberId": mid,
				"channel": "pc",
				"deviceNo": "23",
				"flag":nu,
				"biddingId":weid
				
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
						"requestType": "BIDDINGLHCHECK",
						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
							//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
				}
			}
		});
		console.log(str)
		var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
		commonHttp.myHttp(md5_obj, data_obj, function(data,code,error) {
			if(code==0){
				$scope.data2=JSON.parse(data).biddingLHCheck;
				if($scope.data2.status=='0'){
					if(nu=='2'){
						$state.go('buyt.cgbmlh',{staur:2,bidd:weid})
					}
					if(nu=='1'){
						$state.go('buyt.supplh',{staur:2,bidd:weid})
					}
					
				}
				if($scope.data2.status=='4'){
					$scope.warn='你的'+$scope.data2.applyMsg
					$('#myModal').modal('show')
				}
				if($scope.data2.status=='1'){
					$scope.warn='你作为'+$scope.data2.applyMsg
					$('#myModal').modal('show')
//					if(nu=='2'){
//						$scope.warn=$scope.data2.applyMsg
//					$('#myModal').modal('show')
//					}
//					if(nu=='1'){
//						$scope.warn=$scope.data2.applyMsg+'(只能作为一种身份哦)'
//					$('#myModal').modal('show')
//					}
					
					
				}
				if($scope.data2.status=='2'||$scope.data2.status=='3'){
						$scope.warn=$scope.data2.applyMsg
					$('#myModal').modal('show')
				}
				
			}
			console.log(data)
			
			
			
		})
		//$state.go('buyt.cgbmlh',{staur:2,bidd:$scope.data.biddingId})
	}
		
}]).controller('sk', ['$scope','$rootScope','$state', '$http','$stateParams', 'commonHttp', '$document', '$interval', function($scope, $rootScope,$state, $http,$stateParams, commonHttp, $document, $interval) {
	if(localStorage.id){
		var  mid=localStorage.id
	}else{
		$state.go('login')
		return;
	}
	$scope.lhif=false;
				//查看招募信息详情,需要传递的数据
		var str = JSON.stringify({
			"biddingLHMsg": {
				"memberId": mid,
				"channel": "pc",
				"deviceNo": "23",
				"biddingId":$stateParams.bidd
				
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
						"requestType": "BIDDINGLHMSG",
						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
							//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
				}
			}
		});
		var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
		commonHttp.myHttp(md5_obj, data_obj, function(data,code,error) {
			if(code==0){
				$scope.data=JSON.parse(data).biddingLHMsg;
				console.log(JSON.parse(data).biddingLHMsg)
				$scope.goot=$scope.data.bindingItemList
				$scope.arr=[]
	angular.forEach($scope.goot, function(data, i, array) {
		$scope.arr.push({
			"materialType":$scope.goot[i].materialType3,
			"itemId":$scope.goot[i].itemId,
			"materialName":$scope.goot[i].materialName,
			"isArrival":1,
			"materialUnit":$scope.goot[i].materialUnit,
			"materialNumber":'',
			"arrivalAddress":'',
			"arrivalTime":$scope.data.arrivalCreateTime.split(' ')[0]+'-'+$scope.data.arrivalEndTime.split(' ')[0],
			
		})
	
	})
	
	//检查是否重复报名,需要传递的数据
		var str = JSON.stringify({
			"biddingLHCheck": {
				"memberId": mid,
				"channel": "pc",
				"deviceNo": "23",
				"flag":1,
				"biddingId":$stateParams.bidd
				
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
						"requestType": "BIDDINGLHCHECK",
						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
							//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
				}
			}
		});
		//console.log(str)
		var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
		commonHttp.myHttp(md5_obj, data_obj, function(data,code,error) {
			if(code==0){
				$scope.data2=JSON.parse(data).biddingLHCheck;
				console.log($scope.data2)
				if($scope.data2.status==1){
					if($scope.data2.applyMsg=='供应商已报名'){
						$scope.warn=$scope.data2.applyMsg+'不可用俩种身份哦'
					$('#myModal').modal('show')
					}
					if($scope.data2.applyMsg=='采购商已报名'){
						$scope.warn=$scope.data2.applyMsg
					$('#myModal').modal('show')
					}
					return;
				}
				
				
				
			}
		})
	//失去焦点
	$scope.lhnum=function(target){
		if(!isNaN($(target).val())){
	if ($(target).val().toString().split(".").length > 1 && $(target).val().toString().split(".")[1].length > 2) {
	$(target).val('')	
	}
     }else{
			$(target).val('')
			//console.log('44')
		}
	}
	$scope.mk=new Date().format('yyyy-MM-dd')
	console.log($scope.arr)
			}
		})
		$scope.chide=false;
//报名按钮
$scope.bj=function(){
if($scope.data2.status!=1){
angular.forEach($scope.arr, function(data, i, array) {
	console.log($scope.arr[i].arrivalTime)
$scope.arr[i].materialType=$scope.data.bindingItemList[i].materialCode1
//$scope.arr[i].arrivalTime=$scope.arr[i].arrivalTime.split('T')[0]
})
console.log($scope.arr)
	$e=angular.element;
var length=$e(".tabla input").size()
var bs=[]
	 $e(".tabla input").each(function () {
                    if ($e(this).val() != "") {
                      bs.push(1)
                    }
                })
	 if(length!=bs.length){
	 	console.log(length,bs.length)
	 	$scope.chide=true;
	 	return;
	 }else{
	 	$scope.chide=false;
	 	console.log(length,bs.length)
	 }
		console.log($scope.arr)
		//判断联系人是否为空
			if(!$scope.name) {
				$scope.wr2 = true;
				return;
			}
			//判断联系电话是否为空
			if(!$scope.contact) {
				$scope.wr = true;
				return;
			}
			//判断发货地址是否为空
			if(!$scope.other) {
$scope.other1='无要求'
			}else{
				$scope.other1=$scope.other
			}
			
						//采购商报名传的数据
			var str2 = JSON.stringify({
			"biddingLHApply": {
				"memberId": mid,
				"channel": "pc",
				"deviceNo": "23",
				"flag":"2",
				"biddingId":$scope.data.biddingId,
				"contactPerson":$scope.name,
				"contactTel":$scope.contact,
				'otherRequire':$scope.other1,
				"biddingItemList":$scope.arr
				
			}
		});
		//按照指定格式传递的数据
		var data_obj2 = JSON.stringify({
			"packageList": {
				"packages": {
					"header": {
						"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
						"comId": "CTO2O20170420",
						"comSerial": "comSerial",
						"from": "PAD",
						"orderSerial": "orderId",
						"requestType": "BIDDINGLHAPPLY",
						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
							//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str2)
				}
			}
		});
		console.log(str2)
		var md5_obj2 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj2);
		commonHttp.myHttp(md5_obj2, data_obj2, function(data,code,error) {
			console.log(data)
			$scope.datat=JSON.parse(data)
			if($scope.datat.biddingLHApply.applyMsg=="Supplier Insert Success"){
				$state.go('buyt.glcglh',({"staur":2}))
				return;
			}
			if($scope.datat.biddingLHApply.applyMsg=="已报名"){
				$scope.warn='您对这条招募报过名，不可重复报名哦'
					$('#myModal').modal('show')
				//$scope.lhif=true;
			}
			
	})		
}else{
	if($scope.data2.status==1){
					if($scope.data2.applyMsg=='供应商已报名'){
						$scope.warn=$scope.data2.applyMsg+'不可用俩种身份哦'
					$('#myModal').modal('show')
					}
					if($scope.data2.applyMsg=='采购商已报名'){
						$scope.warn=$scope.data2.applyMsg
					$('#myModal').modal('show')
					}
					return;
				}
}





}

}])
.controller('quote', ['$scope','$rootScope','$state', '$http','$stateParams', 'commonHttp', '$document', '$interval', function($scope, $rootScope,$state, $http,$stateParams, commonHttp, $document, $interval) {
	if(localStorage.id) {
		var constanttest = localStorage.id
	} else {
		$state.go('login')
		return;
	}
	$scope.chide=false
	$scope.chide2=false
	$scope.lhif=false
	var uid='c03698aa4a4c4cec965793e8e63263a4'
			//查看报价详情,需要传递的数据
		var str = JSON.stringify({
			"bidPriceDetails": {
				"memberId": constanttest,
				"channel": "pc",
				"deviceNo": "23",
				"biddingId":uid
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
						"requestType": "BIPRICEDETAILS",
						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
							//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
				}
			}
		});
	
				var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
		commonHttp.myHttp(md5_obj, data_obj, function(data) {
			$scope.data=JSON.parse(data).bidPriceDetails
			console.log(JSON.parse(data).bidPriceDetails)
					$scope.goot=$scope.data.bidPriceDetails
				$scope.arr=[]
				if($scope.data.bidPriceDetails==''){
					$scope.warn='很抱歉，没有采购商报名'
					$('#myModal').modal('show')
					$rootScope.lhbs=1
					return;
				}
	angular.forEach($scope.goot, function(data, i, array) {
		$scope.arr.push({
			"materialType":$scope.goot[i].materialType,
			"itemId":$scope.goot[i].itemId,
			"materialName":$scope.goot[i].materialName,
			"isArrival":1,
			"deliveryAddre":$scope.goot[i].deliveryAddre,
			"materialUnit":$scope.goot[i].materialUnit,
			"materialNumber":'',
			"materialPrice":"",
			"transportPrice":'',
			"totalPrice":'',
			"totalAmount":'',
			"description":''
			
		})
		
	
	})
})
		$scope.lhbj=function(){
			$e=angular.element;
var length=$e(".tabla .pp").size()
var bs=[]
var kl=[]
var lk=[]
	 $e(".tabla .pp").each(function () {
                    if ($e(this).val() != "") {
                      bs.push(1)
                    }
                    if (!isNaN($e(this).val())) {  
        kl.push(1)
          }  
           if ($e(this).val().toString().split(".").length > 1 && $e(this).val().toString().split(".")[1].length > 2) { 
           	 lk.push(1)
           }
                })
	 if(length!=bs.length){
	 	console.log(length,bs.length)
	 	$scope.chide=true;
	 	return;
	 }else{
	 	$scope.chide=false;
	 	console.log(length,bs.length)
	 }
	 if(length!=kl.length){
	 	console.log(length,kl.length)
	 	$scope.chide2=true;
	 	return;
	 }else{
	 	$scope.chide2=false;
	 	console.log(length,kl.length)
	 }
	 if(lk.length!=0){
	 	console.log(length,lk.length)
	 	$scope.chide2=true;
	 	return;
	 }else{
	 	$scope.chide2=false;
	 	console.log(length,lk.length)
	 }
				$scope.pp=[]
			angular.forEach($scope.arr, function(data, i, array) {
	$scope.pp.push({
		"materialType":$scope.data.bidPriceDetails[i].materialCode,
			"itemId":$scope.arr[i].itemId,
			"materialName":$scope.arr[i].materialName,
			"deliveryAddre":$scope.arr[i].deliveryAddre,
			"materialUnit":$scope.arr[i].materialUnit,
			"materialNumber":$scope.arr[i].materialNumber,
			"materialPrice":$scope.arr[i].materialPrice,
			"transportPrice":$scope.arr[i].transportPrice,
			"totalPrice":1*$scope.arr[i].materialPrice+Number($scope.arr[i].transportPrice),
			"totalAmount":(1*$scope.arr[i].materialPrice+Number($scope.arr[i].transportPrice))*$scope.arr[i].materialNumber,
			"description":$scope.arr[i].description
	})

})
			//供应商报价
			var str2 = JSON.stringify({
			"biddingPrice": {
				"memberId": constanttest,
				"channel": "pc",
				"deviceNo": "23",
				"biddingId":uid,
				"biddingItemList":$scope.pp
				
			}
		});
		//按照指定格式传递的数据
		var data_obj2 = JSON.stringify({
			"packageList": {
				"packages": {
					"header": {
						"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
						"comId": "CTO2O20170420",
						"comSerial": "comSerial",
						"from": "PAD",
						"orderSerial": "orderId",
						"requestType": "BIDDINGLHPRICE",
						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
							//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str2)
				}
			}
		});
		console.log(str2)
		var md5_obj2 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj2);
		commonHttp.myHttp(md5_obj2, data_obj2, function(data,code,error) {
			console.log(data)
			$scope.data=JSON.parse(data).biddingPrice
			if(code==0){
				if($scope.data.applyMsg=='apply Success'){
					$state.go('buyt.bjjlh',({staur:2}))
				}
			}else{
				if($rootScope.lhbs==1){
					$scope.warn='很抱歉，没有采购商报名'
					$('#myModal').modal('show')
				}else{
					$scope.warn='您对这条招募报过名，不可重复报名哦'
					$('#myModal').modal('show')
					
				}
				
			}
			
		})
			console.log($scope.pp)
		}




}]).controller('bjlb', ['$scope','$rootScope','$state', '$http','$stateParams', 'commonHttp', '$document', '$interval', function($scope, $rootScope,$state, $http,$stateParams, commonHttp, $document, $interval) {
	$scope.up = true;
		$scope.lhhide=false;
				if(localStorage.id){
		var  constanttest=localStorage.id
	}else{
		$state.go('login')
		return;
	}
		//分页
		function setPage(length, amount, num, first) { //创建保存页码数组的函数
			//length数据总条数
			//amount每页数据条数
			//num保留的页码数
			//first第一页的页码
			var pages = []; //创建分页数组
			var page = Math.ceil(length / amount);
			var ty;
			if(page <= num) {
				for(var i = 1; i <= page; i++) {
					pages.push(i);
				}
			}
			if(page > num) {
				for(var i = first; i < first + num; i++) {
					pages.push(i);
				}
			}
			return pages;
		}
		$scope.pl={}
		//查看招标列表,需要传递的数据
		var str = JSON.stringify({
			"biddingPriceList": {
				"memberId": constanttest,
				"channel": "pc",
				"deviceNo": "23",
				"materialType": "",
				"materialName": "",
				"beginDate": "",
				"endDate": "",
				"keywords": 0,
				"pageNumber": 0
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
						"requestType": "BIDDINGPRICELIST",
						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
							//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
				}
			}
		});
		console.log(DES3.encrypt('CTO2OINTERFACE2017#@!%67', str))
		var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
		commonHttp.myHttp(md5_obj, data_obj, function(data,code,error) {
		if(code==0){
        $scope.data = JSON.parse(data);
					console.log($scope.data)
				if($scope.data.biddingPriceList.all != 0) {
					$scope.up=true;
					$scope.lhhide=false;
					//console.log($scope.data)
					$scope.firstPage = 1;
					$scope.pageNum = 5;
					$scope.page = 1;
					$scope.num = $scope.data.biddingPriceList.all;
					var amount = $scope.data.biddingPriceList.all; //数据总条数
					var each = 10; //每页显示的条数
					$scope.sub = function(page) {
						console.log(page)
						fn("0", page)
						$scope.lastPage = Math.ceil(amount / each);
						if(page >= $scope.pageNum) {
							$scope.firstPage = page - Math.floor($scope.pageNum / 2);
							
						} else {
							$scope.firstPage = 1;
							
						}
						if($scope.firstPage > $scope.lastPage - $scope.pageNum) {
							$scope.firstPage = $scope.lastPage - $scope.pageNum + 1;
							
						}
						$scope.pages = setPage(amount, each, $scope.pageNum, $scope.firstPage);
						$scope.page = page;
					}

					$scope.sub(1);
				}else{
					$scope.up=false;
					$scope.lhhide=true;
				}
				console.log(JSON.parse(data).bidding)
	}
			})
	//点击切换事件
		$scope.yb = function(su) {
				console.log(su)
				
					//查看招标列表,需要传递的数据
				var str = JSON.stringify({
					"biddingPriceList": {
						"memberId": constanttest,
						"channel": "pc",
					"deviceNo": "23",
					"materialType": "",
					"materialName": "",
					"beginDate": "",
					"endDate": "",
						"keywords": su,
						"pageNumber": 0
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
								"requestType": "BIDDINGPRICELIST",
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
					console.log($scope.data)
						console.log($scope.data.biddingPriceList.waitBids)
					if(su === 0) {
						$scope.number = $scope.data.biddingPriceList.all //全部
					} else if(su === 1) {
						$scope.number = $scope.data.biddingPriceList.waitBids //待投标
					} else if(su === 2) {
						$scope.number = $scope.data.biddingPriceList.waitOpenBids //待开标
					} else if(su === 3) {
						$scope.number = $scope.data.biddingPriceList.waitDeliver //待发货
					} 
		
				
					if($scope.number != 0) {
						$scope.up = true;
						$scope.firstPage = 1;
						$scope.pageNum = 5;
						$scope.page = 1;
						$scope.num = $scope.number;
						var t = true;
						var amount = $scope.number; //数据总条数
						var each = 10; //每页显示的条数
						$scope.sub = function(page) {
							console.log(page)
							fn(su, page)
							$scope.lastPage = Math.ceil(amount / each);
							if(page >= $scope.pageNum) {
								$scope.firstPage = page - Math.floor($scope.pageNum / 2);
							} else {
								$scope.firstPage = 1;
							}
							if($scope.firstPage > $scope.lastPage - $scope.pageNum) {
								$scope.firstPage = $scope.lastPage - $scope.pageNum + 1;
							}
							$scope.pages = setPage(amount, each, $scope.pageNum, $scope.firstPage);
							$scope.page = page;
						}

						$scope.sub(1);
					} else {
						$scope.up = false;
					}
				});
			}

//接口函数
		function fn(wr, pp) {
			$scope.up = true;
			var str2 = JSON.stringify({
				"biddingPriceList": {
					"memberId":constanttest,
					"channel": "pc",
					"deviceNo": "23",
					"materialType": "",
					"materialName": "",
					"beginDate": "",
					"endDate": "",
					"keywords": wr,
					"pageNumber": (pp - 1) * 10
				}
			});
			//按照指定格式传递的数据
			var data_obj2 = JSON.stringify({
				"packageList": {
					"packages": {
						"header": {
							"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
							"comId": "CTO2O20170420",
							"comSerial": "comSerial",
							"from": "PAD",
							"orderSerial": "orderId",
							"requestType": "BIDDINGPRICELIST",
							"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
								//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
						},
						"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str2)
					}
				}
			});
			var md5_obj2 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj2);
			commonHttp.myHttp(md5_obj2, data_obj2, function(data) {

				$scope.data = JSON.parse(data);
				console.log($scope.data)

			});
	
		}
}]).controller('lhkb', ['$scope','$rootScope','$state', '$http','$stateParams', 'commonHttp', '$document', '$interval', function($scope, $rootScope,$state, $http,$stateParams, commonHttp, $document, $interval) {
				if(localStorage.id){
		var  constanttest=localStorage.id
	}else{
		$state.go('login')
		return;
	}
	var uid='ce1a232926ee4d80a348c12083deb445'

			var str2 = JSON.stringify({
				"biddingOpenList": {
					"memberId":constanttest,
					"channel": "pc",
					"deviceNo": "23",
					"biddingId":uid
				}
			});
			//按照指定格式传递的数据
			var data_obj2 = JSON.stringify({
				"packageList": {
					"packages": {
						"header": {
							"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
							"comId": "CTO2O20170420",
							"comSerial": "comSerial",
							"from": "PAD",
							"orderSerial": "orderId",
							"requestType": "BIDDINGOPENLIST",
							"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
								//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
						},
						"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str2)
					}
				}
			});
			var md5_obj2 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj2);
			commonHttp.myHttp(md5_obj2, data_obj2, function(data) {
				$scope.data = JSON.parse(data);
				console.log($scope.data)
			})


}]).controller('homepage', ['$scope','$rootScope','$state', '$http','$stateParams', 'commonHttp', '$document', '$interval', function($scope, $rootScope,$state, $http,$stateParams, commonHttp, $document, $interval) {
	if(localStorage.id){
		var  constanttest=localStorage.id
		$scope.constanttest2=localStorage.id
		
	}else{
		var  constanttest=''
		$scope.constanttest2=''
		console.log(constanttest)
	//	$state.go('login')
	}
	
	var str2 = JSON.stringify({
				"bidding": {
					"memberId":constanttest,
					"channel": "pc",
					"deviceNo": "23"
				}
			});
			//按照指定格式传递的数据
			var data_obj2 = JSON.stringify({
				"packageList": {
					"packages": {
						"header": {
							"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
							"comId": "CTO2O20170420",
							"comSerial": "comSerial",
							"from": "PAD",
							"orderSerial": "orderId",
							"requestType": "BIDDINGINDEX",
							"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
								//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
						},
						"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str2)
					}
				}
			});
			console.log(str2)
			var md5_obj2 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj2);
			commonHttp.myHttp(md5_obj2, data_obj2, function(data,code,error) {
				
					if(code==0){
					$scope.data = JSON.parse(data).bidding;
				console.log($scope.data)
				}
				
			})
	
	
	
	}]).controller('lhxx', ['$scope','$rootScope','$state', '$http','$stateParams', 'commonHttp', '$document', '$interval', function($scope, $rootScope,$state, $http,$stateParams, commonHttp, $document, $interval) {
	if(localStorage.id){
		var  constanttest=localStorage.id
	}else{
		$state.go('login')
		localStorage.url=location.href;
		return;
	}
	var str2 = JSON.stringify({
				"biddingOpenDetails": {
					"memberId":constanttest,
					"channel": "pc",
					"deviceNo": "23",
					"applyId":"9d29a951ecf74a97a421c2ee1ba8b25b"
				}
			});
			//按照指定格式传递的数据
			var data_obj2 = JSON.stringify({
				"packageList": {
					"packages": {
						"header": {
							"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
							"comId": "CTO2O20170420",
							"comSerial": "comSerial",
							"from": "PAD",
							"orderSerial": "orderId",
							"requestType": "BIDDINGOPENDETAILS",
							"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
								//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
						},
						"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str2)
					}
				}
			});
			var md5_obj2 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj2);
			commonHttp.myHttp(md5_obj2, data_obj2, function(data,code,error) {
				if(code==0){
					$scope.data = JSON.parse(data).biddingOpenDetails;
				console.log($scope.data)
				}
			
				
				
				
			})




}]).controller('lhck', ['$scope','$rootScope','$state', '$http','$stateParams', 'commonHttp', '$document', '$interval', function($scope, $rootScope,$state, $http,$stateParams, commonHttp, $document, $interval) {
	if(localStorage.id) {
	var constanttest = localStorage.id
} else {
	$state.go('login')
	localStorage.url = location.href;
	return;
}
var appid = '981723cb23c447b1ab1be4237808916d';
var str2 = JSON.stringify({
	"biddingPriceDetails": {
		"memberId": constanttest,
		"channel": "pc",
		"deviceNo": "23",
		"applyId": appid
	}
});
//按照指定格式传递的数据
var data_obj2 = JSON.stringify({
	"packageList": {
		"packages": {
			"header": {
				"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
				"comId": "CTO2O20170420",
				"comSerial": "comSerial",
				"from": "PAD",
				"orderSerial": "orderId",
				"requestType": "BIDDINGPRICEDETAILS",
				"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
					//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
			},
			"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str2)
		}
	}
});
var md5_obj2 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj2);
commonHttp.myHttp(md5_obj2, data_obj2, function(data, code, error) {
	if(code == 0) {
		$scope.data = JSON.parse(data).biddingPriceDetails.applyItemList;
		console.log($scope.data)
	}

})
}]).filter('bus', function() {
		return function(arr) {
			if(arr==''){
				return arr='无要求'
			}else{
				return arr=arr
			}
			console.log(arr)
			
		};
	}).controller('deposit', ['$scope','$rootScope','$state', '$http','$stateParams', 'commonHttp', '$document', '$interval', function($scope, $rootScope,$state, $http,$stateParams, commonHttp, $document, $interval) {
			if(localStorage.id) {
	var constanttest = localStorage.id
} else {
	$state.go('login')
	localStorage.url = location.href;
	return;
}



//查看招募信息详情,需要传递的数据
		var str = JSON.stringify({
			"biddingLHMsg": {
				"memberId": constanttest,
				"channel": "pc",
				"deviceNo": "23",
				"biddingId":$stateParams.bidd
				
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
						"requestType": "BIDDINGLHMSG",
						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
							//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
				}
			}
		});
		var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
		commonHttp.myHttp(md5_obj, data_obj, function(data,code,error) {
			if(code==0){
				$scope.data=JSON.parse(data).biddingLHMsg;
				console.log(JSON.parse(data).biddingLHMsg)



}
		})
}]).controller('purcjion', ['$scope','$rootScope','$state', '$http','$stateParams', 'commonHttp', '$document', '$interval', function($scope, $rootScope,$state, $http,$stateParams, commonHttp, $document, $interval) {
	












}])