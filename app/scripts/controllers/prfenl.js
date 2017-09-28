angular.module('wr', ['CommonService'])
	.controller('fenl', ['$scope','$rootScope','$http', 'commonHttp', '$document', '$interval', function($scope, $rootScope,$http, commonHttp, $document, $interval) {
		
		if(localStorage.id){
	var  constanttest=localStorage.id
	}else{
		$state.go('login')
		return;
	}
		$scope.dd=''
		
				//商品分类列表,需要传递的数据
		var strw = JSON.stringify({
			"category": {
				"memberId": constanttest,
				"channel": "1",
				"deviceNo": "2",
				"functionCode": "MALLINDEX_CATEGORY",
				"startRow": 0,
				"pageSize": 0
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
						"requestType": "PRODUCTCATEGORIES",
						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
						//new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', strw)
				}
			}
		});
		var md5_obj2 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj2);
		commonHttp.myHttp(md5_obj2, data_obj2, function(data) {
		//	console.log(data)
			$scope.dataw = JSON.parse(data);
			//console.log($scope.dataw.category.categories)
		})
		$scope.xz=function(index,uo){
			//console.log(uo)
			if(uo){
				if(index!='lb'){
					var city1 = 'city1' + index;
			$scope.error[city1]=false;
			var city3 = 'city3' + index;
			$scope.error[city3]=false;
			var city5 = 'city5' + index;
			$scope.error[city5]=false;
				}
			
			
			//console.log(index)
				var str2 = JSON.stringify({
			"category": {
				"memberId": "1",
				"channel": "1",
				"deviceNo": "2",
				"functionCode": "SUBMENU",
				"categoryCode":uo,
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
			if(index!='lb'){
						var res='res'+index;
            $scope[res]=JSON.parse(data);
			//$scope.datat+(index) = JSON.parse(data);
			console.log($scope[res])
			$scope.sarr[index].materialType2=$scope[res].category.categories[0].code
			$scope.ej(index,$scope[res].category.categories[0].code)
			}else{
		 $scope.res=JSON.parse(data);
			//$scope.datat+(index) = JSON.parse(data);
		//	console.log(data)
			$scope.pl.type2=$scope.res.category.categories[0].code
			$scope.ej('lb',$scope.res.category.categories[0].code)
			}
	
			
		})
		}else{
			if(index!='lb'){
					var city1 = 'city1' + index;
			$scope.error[city1]=true;
			$scope.sarr[index].materialType2=''
			var arr2='arr2'+index;
           	$scope[arr2]='';
            var arr3='arr3'+index;
           	$scope[arr3]=''
			}else{
				$scope.type=''
				$scope.type2=''
				$scope.type3=''
			}
		
		}
		}
		
		
		$scope.ej=function(index,uo){
			//console.log(uo)
			if(uo){
		
				var str2 = JSON.stringify({
			"category": {
				"memberId": constanttest,
				"channel": "1",
				"deviceNo": "2",
				"functionCode": "SUBMENU",
				"categoryCode":uo,
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
			if(index!='lb'){
				console.log('9999')
			var rew='rew'+index;
            $scope[rew]=JSON.parse(data);
			//$scope.datat+(index) = JSON.parse(data);
		//	console.log(data)
			$scope.sarr[index].materialType=$scope[rew].category.categories[0].code
			$scope.guige(index,$scope[rew].category.categories[0].code)
			
			}else{
				$scope.rew=JSON.parse(data);
				//console.log($scope.rew)
			//$scope.datat+(index) = JSON.parse(data);
		//	console.log(data)
			$scope.pl.type3=$scope.rew.category.categories[0].code
	
			}
		})
		
			
			}else{
				if(index=='lb'){
				$scope.type2=''
				$scope.type3=''
				}
				
			}
		
		}


	//三级分类

$e=angular.element;

$scope.guige=function(index,uo){
	console.log(index,uo)
		var arr2='arr2'+index;
           	$scope[arr2]="";
           	var arr3='arr3'+index;
           	$scope[arr3]=""
	

			console.log(uo)
			
	var str4 = JSON.stringify({
			"skuProp": {
				"memberId":constanttest,
				"channel": "1",
				"deviceNo": "2",
				"functionCode": "BIDCATEGORYSKU",
				"categoryCode":uo,
				"productId":""
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
		commonHttp.myHttp(md5_obj4, data_obj4, function(data,code,error) {
	
			
			
			var rer='rer'+index;
           	$scope[rer]=JSON.parse(data);
			//$scope.datat+(index) = JSON.parse(data);
			console.log(data)
			angular.forEach($scope[rer].skuProp.skuPropList, function(data, i, array) {
				console.log($scope[rer].skuProp.skuPropList[i].sort)
				if($scope[rer].skuProp.skuPropList[i].name=="规格"){
					console.log(i)
				var arr2='arr2'+index;
           	$scope[arr2]=$scope[rer].skuProp.skuPropList[i].propCodeList;
				
				  console.log($scope[arr2])
				 $scope.sarr[index].materialModel=$scope[rer].skuProp.skuPropList[i].propCodeList[0].code
				}else{
					if($scope[rer].skuProp.skuPropList[i].name=="型号"){
					var arr2='arr2'+index;
           	$scope[arr2]=$scope[rer].skuProp.skuPropList[i].propCodeList;
				
				  console.log($scope[arr2])
				 $scope.sarr[index].materialModel=$scope[rer].skuProp.skuPropList[i].propCodeList[0].code
				}
				}
				if($scope[rer].skuProp.skuPropList[i].name=="计量单位"){
					var arr3='arr3'+index;
           	$scope[arr3]=$scope[rer].skuProp.skuPropList[i].propCodeList;
					 $scope.sarr[index].materialUnit=$scope[rer].skuProp.skuPropList[i].propCodeList[0].code
				
				}
			})
			if(	$scope[arr2]){
					var city5 = 'city5' + index;
			$scope.error[city5]=false;
			}
			if($scope[arr3]){
					var city3 = 'city3' + index;
			$scope.error[city3]=false;
			}
//			if($scope[rer].skuProp.skuPropList.sort==1){
//				$scope.sarr[index].materialUnit=$scope[rer].skuProp.skuPropList.propCodeList
//			}
//			
		
		})
		
	
		
		}





//单位
$scope.units=function(index,uo){
	console.log(uo)
	if(!uo){
		console.log('99999')
			var city3 = 'city3' + index;
			$scope.error[city3]=true;
	}else{
		console.log('232')
    var city3 = 'city3' + index;
	$scope.error[city3]=false;
	}
}

//规格
$scope.etalon=function(index,uo){
		if(!uo){
			var city5 = 'city5' + index;
			$scope.error[city5]=true;
			

	}else{
		var city5 = 'city5' + index;
			$scope.error[city5]=false;
	}
}



















}])