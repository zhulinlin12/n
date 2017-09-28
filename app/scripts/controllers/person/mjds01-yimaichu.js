/**
 * Created by Administrator on 2017/7/14.
 */

angular.module('request')
    .controller('mjds01-yimaichu', ['$scope', '$http','$state', 'commonHttp','$timeout', function($scope, $http,$state, commonHttp,$timeout) {
        $scope.page_num1=1;
        $scope.data=null;
           if(localStorage.id){
                var  constanttest=localStorage.id
            }else{
                $state.go('login')
                return;
            }
  

        //获取订单id
        $scope.getYimaichuId=function(target) {
            //$scope.code_2 = target.getAttribute('data-type');
            localStorage.setItem('yimaichuId',target.getAttribute('data-type'))
        }

        //搜索
        $scope.time_1t=''; //下单时间1
        $scope.time_2t=''; //下单时间2
        $scope.ddhm_t=''; //订单号码
        $scope.cpmc_t=''; //产品名称
        $scope.flagNum=0;
        $scope.stuas=''
       $scope.owq=''
        $scope.searchFn=function(){
            $scope.time_1t=angular.element("#start").val();
            $scope.time_2t=angular.element("#end").val();
            $scope.ddhm_t=$('.ddhm').val();
            $scope.cpmc_t=$('.cpmc').val();
            run();
            pageFn()
        };
        //切换标识
//      $scope.flagFn1=function(){
//          $scope.flagNum=1;
//          run();
//          pageFn()
//          
//      };
//      $scope.flagFn2=function(){
//          $scope.flagNum=2;
//          run();
//          pageFn()
//      };
//      $scope.flagFn3=function(){
//          $scope.flagNum=3;
//          run();
//          pageFn()
//      };
$scope.tab=function(p){
	$scope.owq=p
	$scope.stuas=p
	run();
    pageFn()
}


        
        
        $scope.tank = false
		var shopid;
		var commodity;
		var index;
		var prindex;
		//取消订单
		$scope.cancel = function(orderId) {
			//console.log(wq,ct,index,n)
			$scope.tank = true;
			shopid = orderId;
				//取消
			$scope.qx = function() {
					$scope.tank = false;
				}
				//确认删除
			$scope.del = function() {
				 $scope.cancel = '92';
				console.log( shopid)
			 var str = JSON.stringify({ // 将输出参数转为json字符
                "order": { //??
                    memberId: constanttest,
                    channel: "pc",
                    deviceNo: "1",
                    orderId:shopid,
                    status: $scope.cancel,
                    
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
                            "requestType": "UPDATEORDETSTATUS", //??
                            "sendTime": new Date().format("yyyy-MM-dd hh:mm:ss")
                            //new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                        },
                        "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
                    }
                }
            });
            console.log(data_obj)
            var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
            commonHttp.myHttp(md5_obj, data_obj, function(data, code, error) {
                $scope.dataw = JSON.parse(data);
                console.log($scope.dataw)
                if($scope.dataw.cart.status == "1"){
                		$scope.tank = false;
                    run();
                }
            });
			}
		}
////确认订单
//$scope.determine=function(orderId){
//	 var str2 = JSON.stringify({ // 将输出参数转为json字符
//              "order": { //??
//                  memberId: constanttest,
//                  channel: "pc",
//                  deviceNo: "1",
//                  orderId:orderId,
//                  postFee:'6',
//                  
//              }
//          });
//          //console.log(str)
//
//          var data_obj = JSON.stringify({
//              "packageList": {
//                  "packages": {
//                      "header": {
//                          "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
//                          "comId": "CTO2O20170420",
//                          "comSerial": "comSerial",
//                          "from": "PAD",
//                          "orderSerial": "orderId",
//                          "requestType": "UPDATEORDERFREIGHT", //??
//                          "sendTime": new Date().format("yyyy-MM-dd hh:mm:ss")
//                          //new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
//                      },
//                      "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str2)
//                  }
//              }
//          });
//          console.log(data_obj)
//          var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
//          commonHttp.myHttp(md5_obj, data_obj, function(data, code, error) {
//              $scope.datah = JSON.parse(data);
//              console.log($scope.datah)
//              if($scope.datah.cart.status == "1"){
//              	alert('确认订单成功')
////              		$scope.tank = false;
//                  run();
//              }
//          });
//}
        function run(){
         
            var str=JSON.stringify({  // 将输出参数转为json字符
                "order": {     //??
                    memberId : constanttest,
                    channel : "pc",
                    deviceNo : "",
                    functionCode : "ORDERSUPPLY",
                    shopId : "",
                    startRow : ($scope.page_num1-1)*10,
                    pageSize : "10",
                    flag : $scope.flagNum,
                    orderType : "OUT",
                    orderCode : $scope.ddhm_t,
                    productName : $scope.cpmc_t,
                    startTime : $scope.time_1t,
                    endTime : $scope.time_2t,
                    status : $scope.stuas,
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
                            "requestType": "GOODSSOLD",  //??
                            "sendTime": new Date().format("yyyy-MM-dd hh:mm:ss")
                            //new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                        },
                        "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67',str)
                    }
                }
            });
            
            var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
            commonHttp.myHttp(md5_obj, data_obj, function(data,code,error) {
                $scope.data = JSON.parse(data);
                $scope.zongnum=Number($scope.data.order.fahuocount)+Number($scope.data.order.fukuancount)
                console.log($scope.data)
            });

        }
              run();
        pageFn()
        //分页器
        function pageFn() {
            $('#pagination2').html('');
            $timeout(function () {

                $("#pagination2").pagination({
                    currentPage: 1,
                    totalPage: Math.ceil($scope.data.order.orderCount / 10),
                    isShow: false,
                    count: 6,
                    prevPageText: "< 上一页",
                    nextPageText: "下一页 >",
                    callback: function (current) {
                        $("#current2").text(current)
                        $scope.page_num1 = current;
                        run();
                    }
                });
                $('.page_gong').html(Math.ceil($scope.data.order.orderCount/10))
            }, 1000)
        }



    }])