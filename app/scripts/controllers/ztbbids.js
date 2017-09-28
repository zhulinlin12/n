angular.module('bids', ['CommonService'])
	.controller('zbids', ['$scope','$rootScope','$http', 'commonHttp', '$document', '$interval', function($scope, $rootScope,$http, commonHttp, $document, $interval) {
		sessionStorage.removeItem("riqi")
		sessionStorage.removeItem("dh")
	//	$scope.dd=''
//		
//				//商品分类列表,需要传递的数据
//		var strw = JSON.stringify({
//			"category": {
//				"memberId": "1",
//				"channel": "1",
//				"deviceNo": "2",
//				"functionCode": "MALLINDEX_CATEGORY",
//				"startRow": 0,
//				"pageSize": 0
//			}
//		});
//		//按照指定格式传递的数据
//		var data_obj2 = JSON.stringify({
//			"packageList": {
//				"packages": {
//					"header": {
//						"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
//						"comId": "CTO2O20170420",
//						"comSerial": "comSerial",
//						"from": "PAD",
//						"orderSerial": "orderId",
//						"requestType": "PRODUCTCATEGORIES",
//						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
//						//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
//					},
//					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', strw)
//				}
//			}
//		});
//		var md5_obj2 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj2);
//		commonHttp.myHttp(md5_obj2, data_obj2, function(data) {
//			$scope.dataw = JSON.parse(data);
//			console.log($scope.dataw.category.categories)
//		})
//		$scope.xz=function(index,uo){
//			console.log(index)
//				var str2 = JSON.stringify({
//			"category": {
//				"memberId": "1",
//				"channel": "1",
//				"deviceNo": "2",
//				"functionCode": "SUBMENU",
//				"categoryCode":uo,
//				"startRow": 0,
//				"pageSize": 0
//			}
//		});
//		//按照指定格式传递的数据
//		var data_obj3 = JSON.stringify({
//			"packageList": {
//				"packages": {
//					"header": {
//						"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
//						"comId": "CTO2O20170420",
//						"comSerial": "comSerial",
//						"from": "PAD",
//						"orderSerial": "orderId",
//						"requestType": "PRODUCTCATEGORIES",
//						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
//						//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
//					},
//					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str2)
//				}
//			}
//		});
//		var md5_obj3 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj3);
//		commonHttp.myHttp(md5_obj3, data_obj3, function(data) {
//			var res='res'+index;
//          $scope[res]=JSON.parse(data);
//			//$scope.datat+(index) = JSON.parse(data);
//			console.log($scope[res])
//			$scope.sarr[index].biddingType=$scope[res].category.categories[0].code
//			$scope.ej(index,$scope[res].category.categories[0].code)
//			
//		})
//		}
//		
//		
//		$scope.ej=function(index,uo){
//			console.log(uo)
//				var str2 = JSON.stringify({
//			"category": {
//				"memberId": "1",
//				"channel": "1",
//				"deviceNo": "2",
//				"functionCode": "SUBMENU",
//				"categoryCode":uo,
//				"startRow": 0,
//				"pageSize": 0
//			}
//		});
//		//按照指定格式传递的数据
//		var data_obj3 = JSON.stringify({
//			"packageList": {
//				"packages": {
//					"header": {
//						"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
//						"comId": "CTO2O20170420",
//						"comSerial": "comSerial",
//						"from": "PAD",
//						"orderSerial": "orderId",
//						"requestType": "PRODUCTCATEGORIES",
//						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
//						//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
//					},
//					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str2)
//				}
//			}
//		});
//		
//		var md5_obj3 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj3);
//		commonHttp.myHttp(md5_obj3, data_obj3, function(data) {
//			var rew='rew'+index;
//          $scope[rew]=JSON.parse(data);
//			//$scope.datat+(index) = JSON.parse(data);
//			console.log(data)
//			$scope.sarr[index].materialType=$scope[rew].category.categories[0].code
//			
//		})
//		}



$scope.stus=[{"id":"1","name":"张三"},{"id":"2","name":"李四"}];
    $scope.wr=false;
    $scope.myption="iwe";
      $scope.time=new Date().format('yyyy-MM-dd')
      $scope.sarr=[
      {
        "materialType": "",
        "materialName": "",
        "materialModel": "",
        "materialUnit": "",
        "biddingNumber": "",
        "biddingPrice": "",
        "biddingType": "",
        "endTime":"",
        "arrivalTime": "",
        "deliveryAddre": $scope.em,
        "typeShipping": $scope.typesp,
        "transportTool": "",
        "packingMethod": "",
        "qualityAssurance": "",
        "expressCharges": "",
        "otherRequire": $scope.other,
        "description": $scope.des
      }
      
    ];
    $scope.img=[{
		"fileImageUrl":''
	}]
    $scope.sdx=function(){
    		$scope.sarr.push({
        "materialType": "",
        "materialName": "",
        "materialModel": "",
        "materialUnit": "",
        "biddingNumber": "",
        "biddingPrice": "",
        "biddingType": "",
        "endTime": "",
        "arrivalTime": "",
        "deliveryAddre": "",
        "typeShipping": "",
        "transportTool": "",
        "packingMethod": "",
        "qualityAssurance": "",
        "expressCharges": "",
        "otherRequire": "",
        "description": ""
      })
    		$scope.img.push({
		"fileImageUrl":''
	})
    	}
		$scope.sts_shch=function(index){
    		$scope.sarr.splice(index,1);
    	    $scope.img.splice(index,1);
    	}
 
//if(sessionStorage.riqi==sessionStorage.dh){
//	alert('po')
//}
$scope.riqi4=function(){
	console.log(angular.element("#start").val())
	//$scope.riqi=sessionStorage.riqi
	if(sessionStorage.riqi){
		$scope.riqi1=false;
	}else{
		$scope.riqi1=true;
	}
}

$scope.dh7=function(){
	console.log(angular.element("#end").val())
	//$scope.riqi=sessionStorage.riqi
	if(sessionStorage.dh){
		$scope.dh3=false;
	}else{
		$scope.dh3=true;
	}
}
//点击提交按钮执行给后台传数据
$scope.fb=function(){
	if($scope.riqis==undefined||$scope.riqis==''){
		$scope.riqi5=new Date().format("hh:mm:ss")
	}else{
		$scope.riqi5=$scope.riqis
	}
	if($scope.dhs==undefined||$scope.dhs==''){
		$scope.dh5=new Date().format("hh:mm:ss")
	}else{
		$scope.dh5=$scope.dhs
	}
		var arr=JSON.parse(JSON.stringify($scope.sarr))
		arr[0].endTime=sessionStorage.riqi+' '+$scope.riqi5;
		arr[0].arrivalTime=sessionStorage.dh+' '+$scope.dh5;
        var imgarr=JSON.parse(JSON.stringify($scope.img))
console.log(arr)
		//提交数据
	var str=JSON.stringify({
  "biddingManage": {
    "memberId": "4444444444444",
    "channel": "pc",
    "deviceNo": "",
    "functionCode": "ADD",
	"biddingId":"12123131",
    "prompt": "RELEASE",
	"orderCode": "112222",
    "biddingType": "",
    "typeShipping": "",
    "otherRequire": "",
    "createTime": new Date().format("yyyy-MM-dd hh:mm:ss"),
    "supplierList": [
      {
        "supperId": "1234667",
        "description": "asdasdada"
      }
    ],
	"bindingItemList": arr,
	"fileList":imgarr
  }
});
console.log(str)
var data_obj = JSON.stringify({
			"packageList": {
				"packages": {
					"header": {
						"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
						"comId": "CTO2O20170420",
						"comSerial": "comSerial",
						"from": "PAD",
						"orderSerial": "orderId",
						"requestType": "BIDDINGMANAGE",
						"sendTime": new Date().format("yyyy-MM-dd hh:mm:ss")
							//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67',str)
				}
			}
		});
		console.log(data_obj)
		
			var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
		commonHttp.myHttp(md5_obj, data_obj, function(data) {
			

			$scope.data = JSON.parse(data);
			console.log($scope.data)
				
		});
		}

//点击保存按钮执行给后台传数据
$scope.bc=function(){
		if($scope.riqis==undefined||$scope.riqis==''){
		$scope.riqi5=new Date().format("hh:mm:ss")
	}else{
		$scope.riqi5=$scope.riqis
	}
	if($scope.dhs==undefined||$scope.dhs==''){
		$scope.dh5=new Date().format("hh:mm:ss")
	}else{
		$scope.dh5=$scope.dhs
	}
		var arr=JSON.parse(JSON.stringify($scope.sarr))
		arr[0].endTime=sessionStorage.riqi+' '+$scope.riqi5;
		arr[0].arrivalTime=sessionStorage.dh+' '+$scope.dh5;
        var imgarr=JSON.parse(JSON.stringify($scope.img))

		//提交数据
	var str=JSON.stringify({
  "biddingManage": {
    "memberId": "4444444444444",
    "channel": "pc",
    "deviceNo": "",
    "functionCode": "ADD",
	"biddingId":"12123131",
    "prompt": "INSERT",
	"orderCode": "112222",
    "biddingType": "",
    "typeShipping": "",
    "otherRequire": "",
    "createTime": new Date().format("yyyy-MM-dd hh:mm:ss"),
    "supplierList": [
      {
        "supperId": "1234667",
        "description": "asdasdada"
      }
    ],
	"bindingItemList": arr,
	"fileList":imgarr
  }
});
console.log(str)
var data_obj = JSON.stringify({
			"packageList": {
				"packages": {
					"header": {
						"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
						"comId": "CTO2O20170420",
						"comSerial": "comSerial",
						"from": "PAD",
						"orderSerial": "orderId",
						"requestType": "BIDDINGMANAGE",
						"sendTime": new Date().format("yyyy-MM-dd hh:mm:ss")
							//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67',str)
				}
			}
		});
		console.log(data_obj)
		
			var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
		commonHttp.myHttp(md5_obj, data_obj, function(data) {
			

			$scope.data = JSON.parse(data);
			console.log($scope.data)
				
		});
		}


}])