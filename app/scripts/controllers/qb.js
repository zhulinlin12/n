angular.module('bids', ['CommonService'])

.controller('qb', ['$scope', '$rootScope', '$http', 'commonHttp', '$document', '$interval', "$state", function($scope, $rootScope, $http, commonHttp, $document, $interval, $state) {
	$scope.stus = [{
		"id": "1",
		"name": "张三"
	}, {
		"id": "2",
		"name": "李四"
	}];
$scope.up=false;
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
				"memberId": "4444444444444",
				"channel": "pc",
				"deviceNo": "",
				"materialType": "",
				"materialName": "",
				"biddingType": "",
				"winMemberId": "",
				"beginDate": "",
				"endDate": "",
				"flag": '',
				"pageNum": 0
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
						"requestType": "BIDDINGLIST",
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
			      if($scope.data.bidding.count!='0'){
            	     	$scope.up=true;
			console.log($scope.data)
			$scope.firstPage = 1;
			$scope.pageNum = 5;
			$scope.page = 1;
			$scope.num=$scope.data.bidding.count;
			var amount = $scope.data.bidding.count; //数据总条数
			var each = 10; //每页显示的条数
			$scope.sub = function(page) {
				console.log(page)
					fn('',page)
				$scope.lastPage = Math. ceil(amount / each);
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
            	$state.go('buyt.glcgjh')
            }

			//				fn($scope.data.bidding.biddingList[0].count)
			//			if($scope.data.bidding.biddingList.length==0){
			//			//	$state.go('buyt.glcgjh')
			//				
			//			}

		});

	

	//已发布
$scope.yb=function(su){
	console.log(su)
	//查看招标列表,需要传递的数据
		var str = JSON.stringify({
			"bidding": {
				"memberId": "4444444444444",
				"channel": "pc",
				"deviceNo": "",
				"materialType": "",
				"materialName": "",
				"biddingType": "",
				"winMemberId": "",
				"beginDate": "",
				"endDate": "",
				"flag": su,
				"pageNum": 0
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
						"requestType": "BIDDINGLIST",
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
                 if(su===''){
                 	$scope.number=$scope.data.bidding.count//全部
                 }else if(su===0){
                 	$scope.number=$scope.data.bidding.published//已发布
                 }else if(su===1){
                 	$scope.number=$scope.data.bidding.unpublished//未发布
                 }else if(su===9){
                 	$scope.number=$scope.data.bidding.waitOpen//待开标
                 }else if(su===3){
                 	$scope.number=$scope.data.bidding.voidOrder//作废
                 }
			console.log($scope.number)
			      if($scope.number!='0'){
            	     	$scope.up=true;
			$scope.firstPage = 1;
			$scope.pageNum = 5;
			$scope.page = 1;
			 $scope.num=$scope.number;
			var t = true;
			var amount = $scope.number; //数据总条数
			var each = 10; //每页显示的条数
			$scope.sub = function(page) {
				console.log(page)
				fn(su,page)
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
            }
			

			//				fn($scope.data.bidding.biddingList[0].count)
			//			if($scope.data.bidding.biddingList.length==0){
			//			//	$state.go('buyt.glcgjh')
			//				
			//			}

		});
}
	
	
	function fn(wr,pp) {
		$scope.up=true;
	var str = JSON.stringify({
			"bidding": {
				"memberId": "4444444444444",
				"channel": "pc",
				"deviceNo": "",
				"materialType": "",
				"materialName": "",
				"biddingType": "",
				"winMemberId": "",
				"beginDate": "",
				"endDate": "",
				"flag": wr,
				"pageNum": (pp-1)*10
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
						"requestType": "BIDDINGLIST",
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

			console.log($scope.data.bidding.biddingList)
//			angular.forEach($scope.data.bidding.biddingList, function(data, index, array) {
//				angular.forEach($scope.data.bidding.biddingList[index].biddingList, function(data, t, array) {
//					
//					$scope.aa='000'
//			if($scope.data.bidding.biddingList[index].biddingList[t].status===1){
//				$scope.statu='已发布'
//			}else if($scope.data.bidding.biddingList[index].biddingList[t].status==0){
//				$scope.statu='未发布'
//			}else if($scope.data.bidding.biddingList[index].biddingList[t].status==2){
//				$scope.statu='待开标'
//			}else if($scope.data.bidding.biddingList[index].biddingList[t].status==3){
//				$scope.statu='已付款'
//			}else if($scope.data.bidding.biddingList[index].biddingList[t].status==4){
//				$scope.statu='未付款'
//			}else if($scope.data.bidding.biddingList[index].biddingList[t].status==6){
//				$scope.statu='已收货'
//			}else if($scope.data.bidding.biddingList[index].biddingList[t].status==10){
//				$scope.statu='已完成'
//			}
//				
//			})
//				
//			})

			//				fn($scope.data.bidding.biddingList[0].count)
			//			if($scope.data.bidding.biddingList.length==0){
			//			//	$state.go('buyt.glcgjh')
			//				
			//			}

		});
	}
	
	$scope.push=function(m){
      console.log(m)
		//提交数据
	var str=JSON.stringify({
  "biddingManage": {
    "memberId": "4444444444444",
    "channel": "pc",
    "deviceNo": "",
    "functionCode": "PUSH",
	"biddingId":m,
    "prompt": "RELEASE",
	"orderCode": "112222",
    "biddingType": "",
    "typeShipping": "",
    "otherRequire": "",
    "createTime": new Date().format("yyyy-MM-dd hh:mm:ss")
   }
})
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
			if($scope.data.financialManage.applyMsg=='修改成功'){
				$state.go('buyt.fbcg')
			}
			
			console.log($scope.data)
				
		});
	}
	
}])




