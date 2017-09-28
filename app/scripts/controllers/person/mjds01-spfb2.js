/**
 * Created by Administrator on 2017/7/14.
 */

angular.module('request')
	.controller('mjds01-spfb2', ['$scope', '$http', '$state', '$stateParams', 'commonHttp', '$timeout', 'pinyin', 'tupurl', function($scope, $http, $state, $stateParams, commonHttp, $timeout, pinyin, tupurl) {
		var constanttest = '';
		if(localStorage.id) {
			constanttest = localStorage.id;
		} else {
			$state.go('login')
			return;
		}

		$scope.opfu = 'PUBLISH'
		$scope.pp = '3天之内'
		if(!$stateParams.id) {
			$scope.typ = true;

			if(sessionStorage.setItem2) {
				$scope.bob = JSON.parse(sessionStorage.setItem2)
				console.log($scope.bob)
				$scope.typeCode = $scope.bob[2].code;
				run('CATEGORYSKU')
			} else {
				$scope.warn = "您填写的商品信息已经失效"
				$('#myModal').modal('show')
				$timeout(function() {
					$('#myModal').modal('hide')
					angular.element("body").removeClass('modal-open')
					angular.element(".modal-backdrop").remove()
					$state.go('index.mjds01-spfb');
				}, 2000)

			}
		} else {

			var ser = JSON.stringify({ // 将输出参数转为json字符
				"product": { //??
					memberId: constanttest,
					channel: "pc",
					deviceNo: "",
					productId: $stateParams.id
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
							"requestType": "EDITPRODUCT", //??
							"sendTime": new Date().format("yyyy-MM-dd hh:mm:ss")
								//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
						},
						"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', ser)
					}
				}
			});

			var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
			commonHttp.myHttp(md5_obj, data_obj, function(data, code, error) {
				if(code == 0) {
					$scope.odt3 = JSON.parse(data).product;
					$scope.opfu = 'EDIT'
					$scope.oid = $stateParams.id
					console.log($scope.odt3)
					$scope.zlunit=$scope.odt3.unit
					$scope.meyyf=$scope.odt3.distCode
					$scope.selected=$scope.odt3.shipped[0].code
					$scope.c($scope.odt3.shipped[0].code)
					$scope.selected2=$scope.odt3.shipped[1].code
					$scope.c2($scope.odt3.shipped[1].code)
					if($scope.odt3.shipped.length==3){
					$scope.selected3=$scope.odt3.shipped[2].code
					}
				
					if(sessionStorage.setItem2) {
						$scope.bob = JSON.parse(sessionStorage.setItem2)
						console.log($scope.bob)
						if($scope.bob[0].hasOwnProperty('id')) {
							$scope.typeCode = $scope.bob[2].code;
						} else {
							$scope.bob = [{
								name: $scope.odt3.fistName,
								code: $scope.odt3.fistCode,
								id: $stateParams.id
							}, {
								name: $scope.odt3.subnav,
								code: $scope.odt3.subCode
							}, {
								name: $scope.odt3.categoryName,
								code: $scope.odt3.categoryCode
							}]
							sessionStorage.setItem2 = JSON.stringify($scope.bob)
							$scope.typeCode = $scope.bob[2].code;
						}
					} else {
						$scope.bob = [{
							name: $scope.odt3.fistName,
							code: $scope.odt3.fistCode,
							id: $stateParams.id
						}, {
							name: $scope.odt3.subnav,
							code: $scope.odt3.subCode
						}, {
							name: $scope.odt3.categoryName,
							code: $scope.odt3.categoryCode
						}]
						sessionStorage.setItem2 = JSON.stringify($scope.bob)
						$scope.typeCode = $scope.bob[2].code;
					}

					run('EDITCATEGORYSKU')
				
					console.log($scope.odt3.priceList)
					angular.forEach($scope.odt3.priceList, function(item, i) {
						if(item.changeRule.indexOf('-') == -1) {
							$scope.priceListArr.push({
								count: Number(item.changeRule.slice(1)),
								unitmoney: item.price
							})
						} else {
							$scope.priceListArr.push({
								count: Number(item.changeRule.split('-')[0]),
								unitmoney: item.price
							})
						}

					})
					$scope.productName = $scope.odt3.productName
					console.log($scope.odt3.materialList)
						// $scope.ourl=$scope.odt3.imageUrls
					angular.forEach($scope.odt3.imageUrls, function(item, i) {
						$scope.thumb.push({
							imgSrc: item.imgUrl
						})
						$scope.ourl.push({
							type: item.type,
							imageUrl: parseURL(item.imgUrl).uri,
							ulr: item.imgUrl,
							sort: i
						})
					})
					angular.forEach($scope.odt3.materialList, function(item, i) {
						$scope.thumb2.push({
							imgSrc: item.path
						})
						$scope.ourl2.push({
							type: item.materialType,
							imageUrl: parseURL(item.path).uri,
							ulr: item.path,
							sort: i
						})
					})
					$scope.stockSizeWb = $scope.odt3.stockSize
					$scope.pp_txt = $scope.odt3.brandName
					$scope.ppcode = $scope.odt3.brandId;
					$scope.descriptionWb = $scope.odt3.description;
					$scope.pp = $scope.odt3.period;

				} else {
					$scope.warn = "请选择分类信息"
					$('#myModal').modal('show')
					$timeout(function() {
						$('#myModal').modal('hide')
						angular.element("body").removeClass('modal-open')
						angular.element(".modal-backdrop").remove()
						$state.go('index.mjds01-spfb');
					}, 2000)
				}

			})

		}

		/*价格区间*/
		if($stateParams.id) {
			$scope.priceListArr = []
		} else {
			$scope.priceListArr = [{
				count: '',
				unitmoney: ''
			}]
		}

		//数字
		$scope.upp = function(index, n) {
			//console.log(index,n)
			if(n && Number(n) != 0) {
				$scope.priceListArr[index].count = n.replace(/\D/g, '')
			} else {
				$scope.priceListArr[index].count = ''
			}
		}

		$scope.upp2 = function(index, n) {
			//console.log(index,Number(parseFloat(n)))
			if(isNaN(n)) {
				console.log(parseFloat(n))
				if(isNaN(parseFloat(n))) {
					$scope.priceListArr[index].unitmoney = ''
				} else {
					$scope.priceListArr[index].unitmoney = Number(parseFloat(n))
				}
			}

		}
		$scope.lose = function(index, n) {
			var nuq = 'nuq' + index;
			var zop = 'zop' + index;
			var zosf = 'zosf' + index;
			if(n) {
				if($scope.priceListArr.length > 1) {
					if(parseFloat($scope.priceListArr[0].count) > parseFloat($scope.stockSizeWb)) {
						nuq = 'nuq' + 0;
						zosf = 'zosf' + 0;
						$scope[nuq] = true;
						$scope[zosf] = true;
					} else {
						nuq = 'nuq' + 0;
						zosf = 'zosf' + 0;
						$scope[nuq] = false;
						$scope[zosf] = false;
						$scope.gshow = false
					}
					angular.forEach($scope.priceListArr, function(kl, i) {
						//				console.log(parseFloat(i + 1), parseFloat($scope.priceListArr.length - 1))
						if(index < i) {
							console.log(index, i, '1')
							if(parseFloat(n) >= parseFloat($scope.priceListArr[i].count)) {
								console.log('llll')
								nuq = 'nuq' + (i);
								zop = 'zop' + (i);
								$scope[nuq] = true;
								$scope[zop] = true;
								return;

							} else {
								console.log('2222')
								nuq = 'nuq' + (i);
								zop = 'zop' + (i);
								$scope[nuq] = false;
								$scope[zop] = false;
							}
						}
						if(index > i) {
							console.log(index, i, '2')
							if(parseFloat(n) <= parseFloat($scope.priceListArr[i].count)) {
								console.log('llll2')
								nuq = 'nuq' + index;
								zop = 'zop' + index;
								zosf = 'zosf' + index;
								$scope[nuq] = true;
								$scope[zop] = true;
								return;

							} else {
								nuq = 'nuq' + index;
								zop = 'zop' + index;
								zosf = 'zosf' + index;
								console.log('2222')
								$scope[nuq] = false;
								$scope[zop] = false;
							}
						}

					})
				} else {
					if(parseFloat($scope.priceListArr[0].count) > parseFloat($scope.stockSizeWb)) {
						nuq = 'nuq' + 0;
						zosf = 'zosf' + 0;
						$scope[nuq] = true;
						$scope[zosf] = true;
						$scope[zop] = false;
					} else {
						zosf = 'zosf' + 0;
						$scope[nuq] = false;
						$scope[zosf] = false;
						$scope[zop] = false;
						$scope.gshow = false
					}

				}
			} else {
				$scope[nuq] = true;
				$scope[zop] = false;
				$scope[zosf] = false;
			}
			console.log($scope[nuq], $scope[zop], $scope[zosf])
		}
		$scope.lose2 = function(index, n) {
			console.log(index, n)
			var nuw = 'nuw' + index;
			var zlop = 'zlop' + index;
			var zlo = 'zlo' + index;
			if(n) {
				if(Number(n) == 0) {
					$scope[nuw] = true;
					$scope[zlop] = true;
					$scope[zlo] = false;
				} else {
					$scope.priceListArr[index].unitmoney = parseFloat(n).toFixed(2)
					if($scope.priceListArr.length > 1) {
						angular.forEach($scope.priceListArr, function(kl, i) {
							//				console.log(parseFloat(i + 1), parseFloat($scope.priceListArr.length - 1))
							if(index < i) {
								console.log(index, i, '1')
								if(parseFloat(n) <= parseFloat($scope.priceListArr[i].unitmoney)) {
									console.log('llll')
									nuw = 'nuw' + (i);
									zlo = 'zlo' + (i);
									$scope[nuw] = true;
									$scope[zlop] = false;
									$scope[zlo] = true;
									return;

								} else {
									console.log('2222')
									nuw = 'nuw' + (i);
									zlo = 'zlo' + (i);
									$scope[nuw] = false;
									$scope[zlop] = false;
									$scope[zlo] = false;
								}
							}
							if(index > i) {
								console.log(index, i, '2')
								if(parseFloat(n) >= parseFloat($scope.priceListArr[i].unitmoney)) {
									console.log('llll2')

									$scope[nuw] = true;
									$scope[zlop] = false;
									$scope[zlo] = true;
									return;

								} else {
									console.log('2222')
									$scope[nuw] = false;
									$scope[zlop] = false;
									$scope[zlo] = false;
								}
							}

						})
					} else {
						$scope[nuw] = false;
						$scope[zlop] = false;
						$scope[zlo] = false;

					}

				}

			} else {
				$scope[nuw] = true;
				$scope[zlop] = false;
				$scope[zlo] = false;
			}
			console.log($scope[nuw], $scope[zlop], $scope[zlo])
		}

		$scope.addItem = function() {
				var $e = angular.element;
				console.log($scope.priceListArr)
				var index = $scope.priceListArr.length - 1;
				var nuw = 'nuw' + index;
				var nuq = 'nuq' + index;
				var zlop = 'zlop' + index;
				var zlo = 'zlo' + index;
				var zop = 'zop' + index;
				var zosf = 'zosf' + index;
				if($scope[zosf] != true) {
					$scope[nuq] = $scope.priceListArr[index].count ? false : true;
				}

				$scope[nuw] = $scope.priceListArr[index].unitmoney != 0 ? false : true;
				if(index > 0) {
					angular.forEach($scope.priceListArr, function(n, i) {

						if(i + 1 <= index) {
							console.log(i + 1, index, $scope.priceListArr[i].count, $scope.priceListArr[i + 1].count)
							if(parseInt($scope.priceListArr[i].count) >= parseInt($scope.priceListArr[i + 1].count)) {
								$scope.lose(i + 1, $scope.priceListArr[i + 1].count)
									//	nuq = 'nuq' + i+1;
									//	$scope[nuq]=true;

							} else {
								$scope[zop] = false;
							}
							if(parseFloat($scope.priceListArr[i].unitmoney) <= parseFloat($scope.priceListArr[i + 1].unitmoney)) {
								$scope.lose2(i + 1, $scope.priceListArr[i + 1].unitmoney)
									//	nuq = 'nuq' + i+1;
									//	$scope[nuq]=true;

							} else {
								$scope[zlo] = false
							}
						}

					})
				}

				if($scope[nuw] != true && $scope[nuq] != true && $scope[zlop] != true && $scope[zlo] != true && $scope[zop] != true && $scope[zosf] != true && $scope.gshow != true) {

					$scope.priceListArr.push({
						count: '',
						unitmoney: ''
					});
					console.log($scope[zlop], $scope[nuq], $scope[nuw], $scope[zlo], $scope[zop])
						//	$scope.priceListArr2 = $scope.priceListArr.slice(0, $scope.priceListArr.length - 1)
				} else {
					console.log($scope[zlop], $scope[nuq], $scope[nuw], $scope[zlo], $scope[zop])
					return;
				}
				if($e("#one input").hasClass("bulq")) {
					console.log('qqq')
					return;
				}
			}
			//供应总量
		$scope.glose = function() {
				if($scope.stockSizeWb && $scope.priceListArr[0].count != '') {
					
					if(parseInt($scope.stockSizeWb) < parseInt($scope.priceListArr[0].count)) {
						$scope.gshow = true;
					} else {
						$scope.gshow = false;
						nuq = 'nuq' + 0;
						zosf = 'zosf' + 0;
						$scope[nuq] = false;
						$scope[zosf] = false;
					}
				}
			}
			$scope.uop = function(n) {
			//console.log(index,n)
			if(n && Number(n) != 0) {
				$scope.stockSizeWb = n.replace(/\D/g, '')
			} else {
				$scope.stockSizeWb = ''
			}
		}
			//删除价格区间
		$scope.del = function(index) {
				$scope.priceListArr.splice(index, 1);
				var nuw = 'nuw' + index;
				var nuq = 'nuq' + index;
				var zlop = 'zlop' + index;
				var zlo = 'zlo' + index;
				var zop = 'zop' + index;
				$scope[zlop] = false;
				$scope[nuq] = false;
				$scope[nuw] = false;
				$scope[zlo] = false;
				$scope[zop] = false;
			}
			/*选择品牌 */
		$scope.pp_txt = ''; //选择的品牌
		$scope.input_txt = ''; //输入的文字
		$scope.brandId = ''; //brandId
		//		$('.pp_txt').on('focus', function() {
		//			$('.slide_box').show();
		//			$(this).on('keyup', function() {
		//				var text = $(this).val();
		//				$timeout(function() {
		//					search(text)
		//				}, 1000)
		//			})
		//		});
		//		$('.pp_txt').on('blur', function() {
		//			$timeout(function() {
		//				$('.slide_box').hide();
		//			}, 500)
		//		});
		function kp(n) {
			var psearch = JSON.stringify({ // 将输出参数转为json字符
				"search": { //??
					memberId: constanttest,
					channel: "pc",
					deviceNo: "",
					functionCode: "SEARCHBRAND",
					keyWord: n
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
							"requestType": "BRANDSEARCH", //??
							"sendTime": new Date().format("yyyy-MM-dd hh:mm:ss")
								//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
						},
						"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', psearch)
					}
				}
			});

			var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
			commonHttp.myHttp(md5_obj, data_obj, function(data, code, error) {
				if(code == 0) {
					$scope.odt = JSON.parse(data);
					angular.forEach($scope.odt.search.brandList, function(va, i) {
						$scope.odt.search.brandList[i].pin = pinyin.toPinyin(va.brandName)
					})
					sessionStorage.pinp = JSON.stringify($scope.odt)
					console.log($scope.odt)
				}

			})
		}
		kp('')
//		if(sessionStorage.pinp) {
//			$scope.odt = JSON.parse(sessionStorage.pinp)
//		} else {
//			kp('')
//		}
//获取当前物品单位
var suku= JSON.stringify({ // 将输出参数转为json字符
				"baseCode": { //??
					memberId: constanttest,
					channel: "pc",
					deviceNo: "",
					categoryCode: $scope.typeCode,
					baseType:'MEAS_UNIT'
				}
			});

			var data_objrt = JSON.stringify({
				"packageList": {
					"packages": {
						"header": {
							"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
							"comId": "CTO2O20170420",
							"comSerial": "comSerial",
							"from": "PAD",
							"orderSerial": "orderId",
							"requestType": "BASECODE", //??
							"sendTime": new Date().format("yyyy-MM-dd hh:mm:ss")
								//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
						},
						"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', suku)
					}
				}
			});

			var md5_objrt = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_objrt);
			commonHttp.myHttp(md5_objrt, data_objrt, function(data, code, error) {
				if(code==0){
					$scope.dasku = JSON.parse(data).baseCode;
					console.log($scope.dasku)
						if(!$stateParams.id) {
					$scope.zlunit=$scope.dasku[0].name
					}
				//	console.log($scope.dasku)
				}
				
			})
			
			//运费
			var ysb= JSON.stringify({ // 将输出参数转为json字符
				"baseCode": { //??
					memberId: constanttest,
					channel: "pc",
					deviceNo: "",
					categoryCode: '',
					baseType:'DISTTYPE'
				}
			});

			var data_objyf = JSON.stringify({
				"packageList": {
					"packages": {
						"header": {
							"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
							"comId": "CTO2O20170420",
							"comSerial": "comSerial",
							"from": "PAD",
							"orderSerial": "orderId",
							"requestType": "BASECODE", //??
							"sendTime": new Date().format("yyyy-MM-dd hh:mm:ss")
								//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
						},
						"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', ysb)
					}
				}
			});

			var md5_objyf = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_objyf);
			commonHttp.myHttp(md5_objyf, data_objyf, function(data, code, error) {
				
				if(code==0){
					$scope.dayf = JSON.parse(data).baseCode;
						if(!$stateParams.id) {
					$scope.meyyf=$scope.dayf[0].code
					}
				//	console.log($scope.dasku)
				}
				console.log(data)
				
				
				
			})
		//获取后台品牌所有数据

		$scope.focu = function(n) {
			angular.element("#qrt").focus()
			$scope.mshow = true;
			$scope.whide = false
		}
		$scope.bur = function(n) {
			var t = 0;

			if(n != '' && n != undefined) {
				angular.forEach($scope.odt.search.brandList, function(va, i) {
					if(va.brandName == n) {
						$scope.ppcode = va.brandId
						console.log($scope.ppcode)
					} else {
						t++
					}

				})
				if($scope.odt.search.brandList.length == t) {
					$scope.ppcode = ''
					$scope.whide = true;
				} else {
					$scope.whide = false
				}
			} else {
				$scope.ppcode = ''
				$scope.whide = false
			}
			$scope.mshow = false;

		}

		//获取选择的品牌
		$scope.ppFn = function(event) {
		//	console.log('999999')
			$scope.pp_txt = event.target.innerHTML;
			$('.pp_txt').val($scope.pp_txt);
			$scope.brandId = event.target.getAttribute('data-brandId')
		}

		/*获取商品基本信息的参数*/
		$scope.skuList_arr = [];
		$scope.getSelect = function() {
			$scope.skuList_arr = [];
			for(var n = 0; n < $('.skv_val').length; n++) {
				var person = {
					skuCode: $('.skv_val').eq(n).find("option:selected").attr('data-type'),
					typeCode: $('.skv_val').eq(n).find("option:selected").attr('data-code')
				};
				$scope.skuList_arr.push(person);
			}
		}

		//上一个页面的分类信息

		function run(nw) {
			

			//        skuProp
			var str = JSON.stringify({ // 将输出参数转为json字符
				"skuProp": { //??
					memberId: constanttest,
					channel: "pc",
					deviceNo: "",
					functionCode: nw,
					categoryCode: $scope.typeCode,
					productId: $stateParams.id,
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
							"requestType": "PRODUCTCATEGORYSKU", //??
							"sendTime": new Date().format("yyyy-MM-dd hh:mm:ss")
								//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
						},
						"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
					}
				}
			});
			var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
			commonHttp.myHttp(md5_obj, data_obj, function(data, code, error) {
			
				$scope.data= JSON.parse(data);
				angular.forEach($scope.data.skuProp.skuPropList, function(n, i) {
				$scope.data.skuProp.skuPropList[i].propCodeList.sort(sortBy('selected',false))
				})
				console.log($scope.data)
//				if(nw){
//					console.log(JSON.stringify(nw.skuList))
//					$scope.odt3=nw
//						var key;
//					angular.forEach($scope.data.skuProp.skuPropList, function(n, i) {
//				if($scope.data.skuProp.skuPropList[i].code == nw.skuList[i].typeCode) {
//						angular.forEach($scope.data.skuProp.skuPropList[i].propCodeList, function(iumnt, q) {
//							if(iumnt.code== $scope.odt3.skuList[i].propCode){
//								console.log('zlll',q)
//								$scope.data.skuProp.skuPropList[i].propCodeList.splice(q, 1);
//								key={code:$scope.odt3.skuList[i].propCode,name:$scope.odt3.skuList[i].propName,selected:0,sort:1,typeCode:$scope.odt3.skuList[i].typeCode}
//								$scope.data.skuProp.skuPropList[i].propCodeList.unshift(key);
//							}
//							
//							
//						})
//						//$scope.data.skuProp.skuPropList[i].propCodeList.unshift(key);
//						console.log($scope.data.skuProp.skuPropList[i].propCodeList)
//				}
//
//				})
//					console.log($scope.data)
//				}
//				angular.forEach($scope.data.skuProp.skuPropList, function(n, i) {
//					if($scope.data.skuProp.skuPropList[i].code == "PRO_SKUTYPE_UNIT") {
//						$scope.utiu = $scope.data.skuProp.skuPropList[i].propCodeList[0].name
//					}
//
//				})
				
			});

		}

		/* ----------------图片上传----------------------*/
		$scope.zt_list = [];
		$scope.zt_num = 0;
		$scope.path1 = null;

		$scope.reader = new FileReader(); //创建一个FileReader接口
		$scope.thumb = []; //用于存放图片的base64
		$scope.ourl = []
		var t = 0;
		$scope.btn_show = true;
		$scope.img_upload = function(files) { //单次提交图片的函数
			$scope.btn_show = false;
			if(files[0]) {
				console.log(files[0])
				if(files[0].size > 5120000) {
					alert('大小不可超过5M')
					return;
				}
				var nmop = files[0].type.split("/")[1]
				var nm = files[0].name
				var data1 = new FormData(); //以下为像后台提交图片数据
				data1.append('pic', files[0]);
				data1.append('guid', $scope.guid);

				$http({
					method: 'post',
					url: tupurl,
					data: data1,
					headers: {
						'Content-Type': undefined
					},
					transformRequest: angular.identity
				}).then(function(result) {
					console.log(result.data)
					$scope.path1 = result.data.path;
					var img = 'pp'
					angular.element("#one-input").val('');
					$scope.po = ''; //清理缓存问题
					if(result.data) {
						if(nmop != 'jpg' && nmop != 'jpeg' && nmop != 'png' && nmop != 'bmp') {

							$scope.thumb.push({
								imgSrc: 'http://style.org.hc360.cn/images/my/images/corcenter/busindependent/failure.jpg', //接收base64
								eror: 1,
								pname: nm
							})
						} else {
							t = t + 1
							$scope.thumb.push({
								imgSrc: result.data.url, //接收base64
								pname: nm
							})
							$scope.ourl.push({
								type: 'PRODUCTINFO_PIC',
								imageUrl: result.data.path,
								ulr: result.data.url,
								sort: t
							})

						}
						console.log($scope.thumb)
					}

				})
			}

		};

		$scope.img_del = function(key, itm) { //删除，删除的时候thumb和form里面的图片数据都要删除，避免提交不必要的
			console.log(itm)
			$scope.thumb.splice(key, 1)
			if($scope.ourl.length != 0) {
				angular.forEach($scope.ourl, function(n, i) {
					if($scope.ourl[i].ulr == itm.imgSrc) {
						$scope.ourl.splice(i, 1)
					}

				})
			}
		};

		/* ----------------图片上传2----------------------*/
		$scope.zt_num2 = 0;
		$scope.xq_list = [];

		$scope.reader2 = new FileReader(); //创建一个FileReader接口
		$scope.thumb2 = []; //用于存放图片的base64
		$scope.ourl2 = []
		var t2 = 0
		$scope.img_upload2 = function(files) { //单次提交图片的函数
			if(files[0]) {
				$scope.guid2 = (new Date()).valueOf(); //通过时间戳创建一个随机数，作为键名使用
				console.log(files[0])
				var nmop2 = files[0].type.split("/")[1]
				var nm2 = files[0].name
				var data2 = new FormData(); //以下为像后台提交图片数据
				data2.append('pic', files[0]);
				data2.append('guid', $scope.guid2);

				$http({
					method: 'post',
					url: tupurl,
					data: data2,
					headers: {
						'Content-Type': undefined
					},
					transformRequest: angular.identity
				}).then(function(result) {
					$scope.path2 = result.data.path;

					console.log(result.data)
					var img2 = 'pp'
					angular.element("#one-input2").val('');
					$scope.po2 = ''; //清理缓存问题
					if(result.data) {
						if(nmop2 != 'jpg' && nmop2 != 'jpeg' && nmop2 != 'png' && nmop2 != 'bmp') {

							$scope.thumb2.push({
								imgSrc: 'http://style.org.hc360.cn/images/my/images/corcenter/busindependent/failure.jpg', //接收base64
								eror: 1,
								pname: nm2
							})
						} else {
							t2 = t2 + 1
							$scope.thumb2.push({
								imgSrc: result.data.url, //接收base64
								pname: nm2
							})
							$scope.ourl2.push({
								type: 'GRAPHICDESC',
								imageUrl: result.data.path,
								ulr: result.data.url,
								sort: t2
							})

						}
						console.log($scope.thumb2)
					}

				})
			}
		};

		$scope.img_del2 = function(key, itm) { //删除，删除的时候thumb和form里面的图片数据都要删除，避免提交不必要的
			console.log(itm)
			$scope.thumb2.splice(key, 1)
			if($scope.ourl2.length != 0) {
				angular.forEach($scope.ourl2, function(n, i) {
					if($scope.ourl2[i].ulr == itm.imgSrc) {
						$scope.ourl2.splice(i, 1)
					}

				})
			}

		};
		// $scope.submit_form = function(){    //图片选择完毕后的提交，这个提交并没有提交前面的图片数据，只是提交用户操作完毕后，
		//     //　　到底要上传哪些，通过提交键名或者链接，后台来判断最终用户的选择,整个思路也是如此
		//     $http({
		//         method: 'post',
		//         url: '/comm/test.php',
		//         data:$scope.form,
		//     }).success(function(data) {
		//         console.log(data);
		//     })
		// };

//shiqu
$scope.kop=function(){
	  var reg = new RegExp("[`~!@#$^&*()=|{}':;'\"《》,\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]",'g'); 
	  if($scope.productName){
	  	$scope.productName=$scope.productName.replace(reg,'')
	  }
}
$scope.error = {};
		//上传产品信息接口
var ert;
		$scope.addpic = function() {
		//	console.log($scope.selected)
			$scope.error.province = $scope.selected ? false : true;
			$scope.error.city = $scope.selected2 ? false : true;
			if($scope.list2){
				if($scope.list2.length!=0){
				   $scope.error.area = $scope.selected3 ? false : true;
			}
			}else{
				 $scope.error.area = $scope.selected3 ? false : true;
			}
			if($scope.list2){
				if($scope.list2.length!=0){
			if(!$scope.selected||!$scope.selected2||!$scope.selected3){
				//console.log('1')
				return
			}
		}
			}
			if(!$scope.selected||!$scope.selected2){
			//	console.log('2')
				return
			}
			$scope.llk=[{
				name:angular.element('#op  option:selected').text(),
				code:$scope.selected
			},{
				name:angular.element('#op2  option:selected').text(),
				code:$scope.selected2
			}]
		//	$scope.llk= angular.element('#op  option:selected').text()+'-'+angular.element('#op2  option:selected').text()+','+$scope.selected; 
			if($scope.list2){
				if($scope.list2.length!=0){
					//$scope.llk= angular.element('#op  option:selected').text()+'-'+angular.element('#op2  option:selected').text()+'-'+angular.element('#op3  option:selected').text(); 
					$scope.llk=[{
				name:angular.element('#op  option:selected').text(),
				code:$scope.selected
			},{
				name:angular.element('#op2  option:selected').text(),
				code:$scope.selected2
			},{
				name:angular.element('#op3  option:selected').text(),
				code:$scope.selected3
			}]
					
				}
			}else{
				return;
			}
			console.log(JSON.stringify(JSON.stringify($scope.llk)))
			console.log(constanttest)
			 ert=JSON.stringify($scope.llk)
			console.log($scope.productName)
			if($scope.productName == null||$scope.productName=='') {
				alert('请填写品名');
				$scope.wr2 = true;
				return;
			}
			if($scope.pp_txt) {
				console.log($scope.ppcode)
				if($scope.ppcode == '') {
					alert('请选择品牌')
					$scope.whide = true;
					return;
				} else {
					console.log($scope.ppcode)
				}
			} else {
				alert('请选择品牌')
				$scope.wrp = true;
				return;
			}
			$scope.getSelect();
			console.log($scope.skuList_arr)
			if($scope.skuList_arr.length == 0) {
				alert('商品没有基本参数')
				return;
			}
			if($scope.priceListArr.length == 1) {
				if($scope.priceListArr[0].count == '' || $scope.priceListArr[0].unitmoney == '') {
					alert('请填写价格区间')
					return;
				}
			} else {
				if(angular.element("#one input").hasClass("bulq")) {
					alert('请填写价格区间')
					return;
				}
			}
			$scope.priceListArr2 = []
			if($scope.priceListArr[$scope.priceListArr.length - 1].count == '' || $scope.priceListArr[$scope.priceListArr.length - 1].unitmoney == '') {
				alert('请填写价格区间')
				return;
			}
			angular.forEach($scope.priceListArr, function(va, i) {
				if(i != $scope.priceListArr.length - 1) {
					$scope.priceListArr2.push({
						"changeRule": ($scope.priceListArr[i].count) + '-' + ($scope.priceListArr[i + 1].count - 1),
						"newPrice": va.unitmoney
					})

					//$scope.priceListArr2[i].count=$scope.priceListArr[i].count+'-'+$scope.priceListArr[i+1].count-1;
				} else {
					$scope.priceListArr2.push({
							"changeRule": '≥' + $scope.priceListArr[$scope.priceListArr.length - 1].count,
							"newPrice": va.unitmoney
						})
						//$scope.priceListArr2[$scope.priceListArr2.length-1].count='≥'+$scope.priceListArr2[$scope.priceListArr2.length-1].count
				}

			})
			if(!$scope.stockSizeWb) {
				alert('请填写供应总量')
				return;
			}

		if(parseFloat($scope.priceListArr[0].count) > parseFloat($scope.stockSizeWb)) {
				alert('供应总量必需大于等于起批量')
				return;
			}
			console.log($scope.priceListArr2)
			if($scope.ourl.length == 0) {
				alert('请添加商品主图');
				return false;
			} else {
				$scope.ourlw = $scope.ourl
				angular.forEach($scope.ourlw, function(n, i) {
					$scope.ourlw[i].sort = i;
					delete $scope.ourlw[i].ulr

				})
			}
			if($scope.ourl2.length == 0) {
				alert('请添加商品详情');
				return false;
			} else {
				$scope.ourlw2 = $scope.ourl2
				angular.forEach($scope.ourlw2, function(n, i) {
					$scope.ourlw2[i].sort = i;
					delete $scope.ourlw2[i].ulr

				})
			}
			if($scope.opfu=='EDIT'){
		 var strd=JSON.stringify({  // 将输出参数转为json字符
                "product": {     //??
                    memberId : constanttest,
                    channel : "pc",
                    deviceNo : "",
                    functionCode:"DELETE",
                    productId:$scope.oid,
                    skuId:"",
                }
            });


            var data_objd = JSON.stringify({
                "packageList": {
                    "packages": {
                        "header": {
                            "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                            "comId": "CTO2O20170420",
                            "comSerial": "comSerial",
                            "from": "PAD",
                            "orderSerial": "orderId",
                            "requestType": "DELETEPRODUCTINFO",  //??
                            "sendTime": new Date().format("yyyy-MM-dd hh:mm:ss")
                            //new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                        },
                        "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67',strd)
                    }
                }
            });

            var md5_objd = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_objd);
            commonHttp.myHttp(md5_objd, data_objd, function(data,code,error) {
                $scope.datad = JSON.parse(data).product;
                console.log($scope.datad)
                if($scope.datad.status==1){
                	
                }
                 $scope.opfu='PUBLISH'
                 $scope.oid=''
                 wno()
            });
			}else{
				wno()
			}
		
			

		}
		function wno(){
				
			
			var strp = JSON.stringify({ // 将输出参数转为json字符
				"product": { //??
					memberId: constanttest,
					channel: "pc",
					deviceNo: "001",
					functionCode: $scope.opfu,
					productId: $scope.oid,
					brandId: $scope.ppcode, //品牌ID
					categoryCode: $scope.bob[2].code,
					factoryPrice: "", //出厂价 000
					salePrice: "", //售价 000
					description: $scope.descriptionWb,
					period: $scope.pp,
					productName: $scope.productName,
					stockSize: $scope.stockSizeWb, //库存 000
					shipped: ert, //发货地址 000
					skuList: $scope.skuList_arr,
					unit:$scope.zlunit,
			        distCode:$scope.meyyf,
			        expressCharge:'',
					imageTypeList: [{
						type: "PRODUCTINFO_PIC",
						imageList: $scope.ourlw
					}, {
						type: "GRAPHICDESC",
						imageList: $scope.ourlw2
					}],
					priceList: $scope.priceListArr2

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
							"requestType": "PUBLISHPRODUCT",
							"sendTime": new Date().format("yyyy-MM-dd hh:mm:ss")
								//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
						},
						"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', strp)
					}
				}
			});
			var md5_objp = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_objp);
			commonHttp.myHttp(md5_objp, data_objp, function(data, code, error) {
				$scope.data2 = JSON.parse(data);
				console.log($scope.data2);
				//跳转链接
				if($scope.data2.product.status == 1) {
					$state.go('index.mjds01-zssp')

				} else {
					alert('提交失败')
				}

			});
			}

	}]).filter('filterPinyin', function() {
		return function(inputArray, value) {
			if(inputArray) {
				var a = 0;
				var b = 0;

				//console.log(inputArray)
				var array = []; //定义返回的新数组；
				if(value == undefined || value == null) {
					array = []
					array = inputArray; //当过滤条件为空的时候返回全部的内容；

				} else {
					array = []
					for(var i = 0; i < inputArray.length; i++) {
						if(inputArray[i].brandName.indexOf(value) != -1) {
							array.push(inputArray[i]); //过滤第一个字段，如果不符合条件则判断第二个字段
						} else {
							a++
							if(inputArray[i].pin.indexOf(value) != -1) {
								array.push(inputArray[i]);
							} else {
								b++
							}
						}
					}
					if(a == inputArray.length && b == inputArray.length) {
						array = []
					}
				}
				return array;
			}
		}
	});