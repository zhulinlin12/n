angular.module('yomApp', ['CommonService'])
	.controller('ptsy', ['$scope', '$http', 'commonHttp', '$document', '$interval', function($scope, $http, commonHttp, $document, $interval) {
		 $scope.user = '';
    $scope.email = '';
    $scope.wr=false;
		$scope.showq = false;
		//平台首页,需要传递的数据
		var str = JSON.stringify({
			"platIndex": {
				"memberId": "1",
				"channel": "1",
				"deviceNo": "2"
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
						"requestType": "PLATINDEX",
						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
							//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
				}
			}
		});
		var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
		commonHttp.myHttp(md5_obj, data_obj, function(data) {
			if($scope.data != '') {
				angular.element(".banwy").remove()
			}

			$scope.data = JSON.parse(data);
			$scope.po = $scope.data.platIndex.businessDataList
			console.log($scope.po)
				//	$scope.arr=$scope.data.platIndex.businessDataList[0].dataList[0].custom[0].value.split('|')
				//	$scope.arr[4]="查看"
				//	console.log($scope.arr)
		});
		$scope.sarr=[{"op":"1"}];
		$scope.sdx=function(){
    		$scope.sarr.push({"op":"选项名称"})
    	}
		$scope.sts_shch=function(index){
    		$scope.sarr.splice(index,1);
    	}
		$scope.isActive = 0;
		$scope.arr = [222, 444, 555, 777, 888]
		$scope.changeGood = function(index) {
			$scope.isActive = index;

		}
		$ys = document.querySelector('.web');
		var wt = angular.element($ys);
		$e = angular.element;
		var i = 0;
		var timer;
		$scope.lun = function(n) {
			$interval.cancel(timer);
			i = n;
			$e(".cotn ul li").eq(i).show().siblings().hide();
			$e(".btk ul li").eq(n).find("span").addClass("bor").parent().siblings().find("span").removeClass("bor")
			$e("#kk span").text(i + 1 + '/' + $e(".cotn ul li").length)
		}

		$e(".web").on('mouseleave', function() {
			timer = $interval(auto, 2000);
			//		console.log(i)
		})
		$e(".web").on('mouseenter', function() {
				$interval.cancel(timer);
			})
			//左箭头
		$e("#kk .sx ").on('click', function() {
				$interval.cancel(timer);
				if(i <= 0) {
					i = $e(".cotn ul li").length - 1;
				} else {
					i--
				}
				$e(".cotn ul li").eq(i).show().siblings().hide();
				$e(".btk ul li span").eq(i).addClass("bor").parent().siblings().find("span").removeClass("bor")
				$e("#kk span").text(i + 1 + '/' + $e(".cotn ul li").length)
			})
			//右箭头
		$e("#kk .sx2 ").on('click', function() {
			$interval.cancel(timer);

			if(i >= $e(".cotn  li").length - 1) {
				i = 0;
			} else {
				i++
			}
			$e(".cotn ul li").eq(i).show().siblings().hide();
			$e(".btk ul li span").eq(i).addClass("bor").parent().siblings().find("span").removeClass("bor")
			$e("#kk span").text(i + 1 + '/' + $e(".cotn ul li").length)
		})
		wt.css("height", wt.width() * 550 / 1440 + 'px');

		function auto() {
			if(i >= $e(".cotn ul li").length - 1) {
				i = 0;
			} else {
				i++
			}
			$e(".cotn ul li").eq(i).show().siblings().hide();
			$e(".btk ul li span").eq(i).addClass("bor").parent().siblings().find("span").removeClass("bor")
			$e("#kk span").text((i + 1) + '/' + $e(".cotn ul li").length)
		}
		$interval.cancel(timer);
		timer = $interval(auto, 2000);
		//
		// $interval(function(){
		// 	$e(".mo-l").find("ol").animate({
		//			marginTop: "-30px"
		//		}, 500, function() {
		//			$e(this).css({
		//				marginTop: "0px"
		//			}).find("li:first").appendTo(this);
		//		})
		// }, 3000);
	}]).directive('tim', ['$document', '$interval', function($document, $interval) {
		return {
			restrict: 'ACE',
			//继承父元素的作用域
			scope: false,
			link: function(scope, element, attrs) {
				var timw;

				function aty() {
					element.find('ol').animate({
						marginTop: "-30px"
					}, 500, function() {
						$e(this).css({
							marginTop: "0px"
						}).find("li:first").appendTo(this);
					})
				}
				timw = $interval(aty, 3000)
				element.find('ol').on('mouseenter', function() {
					$interval.cancel(timw)
				})
				element.find('ol').on('mouseleave', function() {
					timw = $interval(aty, 3000)
				})
			}
		}
	}])
	//	.filter('odditems',function(){
	//  return function(inputArray){
	//  console.log(inputArray)
	//  	var str=inputArray.split('|')
	//  	var arr=str;
	//  	
	//  	 	return str;
	//  	 
	//  	 	 
	//  	 
	//      
	//  }
	//});