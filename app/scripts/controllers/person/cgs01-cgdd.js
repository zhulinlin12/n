/**
 * Created by Administrator on 2017/7/14.
 */

angular.module('request')
    .controller('cgs01-cgdd', ['$scope', '$http', '$state', 'commonHttp', '$timeout', function($scope, $http, $state, commonHttp, $timeout) {
    	      if (localStorage.id) {
                var constanttest = localStorage.id
            } else {
                $state.go('login')
                return;
            }
        $scope.page_num1 = 1;
        //搜索
        $scope.time_1t = null; //下单时间1
        $scope.time_2t = null; //下单时间2
        $scope.ddhm_t = null; //订单号码
        $scope.cpmc_t = null; //产品名称
        $scope.searchFn = function() {
        	if(angular.element("#start").val()!=''&&angular.element("#end").val()!=''){
        		 $scope.time_1t = angular.element("#start").val();
            $scope.time_2t = angular.element("#end").val();
        	}else{
        		if(angular.element("#start").val()==''){
        			 $scope.time_1t='1999-07-09'
        			  $scope.time_2t = angular.element("#end").val();
        			
        		}
        			if(angular.element("#end").val()==''){
        			 $scope.time_2t=new Date().format("yyyy-MM-dd")
        			  $scope.time_1t = angular.element("#start").val();
        		}
        	}
           
            $scope.ddhm_t = $('.ddhm').val();
            $scope.cpmc_t = $('.cpmc').val();
            run();
        };

        //发货状态
        $scope.fkztNum = '';
     
        $scope.fkzt = function(n) {
        	angular.element("#start").val(' ');
            angular.element("#end").val(' ');
             $scope.time_1t = ''
            $scope.time_2t=''
            $scope.fkztNum = n;
            $scope.page_num1 = 1;
            run()
            pageFn()
         
        };
         $scope.tank = false
		var shopid;
		var commodity;
		var index;
		var prindex;
		//取消订单和确认收货
		$scope.cancel = function(orderId,n) {
			if(n==92){
				$scope.hint='取消订单'
				
			}
			if(n==87){
				$scope.hint='确认收货'
				
			}
			//console.log(wq,ct,index,n)
			$scope.tank = true;
			shopid = orderId;
			prindex=n
				//取消
			$scope.qx = function() {
					$scope.tank = false;
				}
				//确认删除
			$scope.del = function() {
				 $scope.cancel = n;
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
     

        run()

        function run() {

      
            var str = JSON.stringify({ // 将输出参数转为json字符
                "order": { //??
                    memberId: constanttest,
                    channel: "pc",
                    deviceNo: "",
                    functionCode: "INDIVIDUALORDER",
                    shopId: "",
                    startRow: ($scope.page_num1 - 1) * 10,
                    pageSize: "10",
                    flag: $scope.flagNum,
                    orderType: "OUT",
                    orderCode: $scope.ddhm_t,
                    productName: $scope.cpmc_t,
                    startTime: $scope.time_1t,
                    endTime: $scope.time_2t,
                    status: $scope.fkztNum
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
                            "requestType": "GOODSSOLD", //??
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
               
                console.log($scope.data)    
            });

        }
//
//      $scope.cancel = function(orderId) {
//          $scope.cancel = '92';
//
//        
//          var str = JSON.stringify({ // 将输出参数转为json字符
//              "order": { //??
//                  memberId: constanttest,
//                  channel: "pc",
//                  deviceNo: "1",
//                  orderId:orderId,
//                  status: $scope.cancel,
//                  
//              }
//          });
//          console.log(str)
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
//                          "requestType": "UPDATEORDETSTATUS", //??
//                          "sendTime": new Date().format("yyyy-MM-dd hh:mm:ss")
//                          //new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
//                      },
//                      "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
//                  }
//              }
//          });
//          console.log(data_obj)
//          var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
//          commonHttp.myHttp(md5_obj, data_obj, function(data, code, error) {
//              $scope.data = JSON.parse(data);
//              console.log($scope.data)
//              if($scope.data.cart.status == "1"){
//                  run();
//              }
//          });
//      }
//      $scope.confirm = function(orderId,n) {
//      	console.log(n)
//      	return;
//          $scope.confirm = '87';
//
//          if (localStorage.id) {
//              var constanttest = localStorage.id
//          } else {
//              $state.go('login')
//              return;
//          }
//          var str = JSON.stringify({ // 将输出参数转为json字符
//              "order": { //??
//                  memberId: constanttest,
//                  channel: "pc",
//                  deviceNo: "1",
//                  orderId:orderId,
//                  status: $scope.confirm,
//                  
//              }
//          });
//          console.log(str)
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
//                          "requestType": "UPDATEORDETSTATUS", //??
//                          "sendTime": new Date().format("yyyy-MM-dd hh:mm:ss")
//                          //new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
//                      },
//                      "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
//                  }
//              }
//          });
//          console.log(data_obj)
//          var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
//          commonHttp.myHttp(md5_obj, data_obj, function(data, code, error) {
//              $scope.data = JSON.parse(data);
//              console.log($scope.data)
//              if($scope.data.cart.status == "1"){
//                  run();
//              }
//          });
//      }
        // $scope.appraise = function(orderId) {
        //     $scope.appraise = '87';

        //     if (localStorage.id) {
        //         var constanttest = localStorage.id
        //     } else {
        //         $state.go('login')
        //         return;
        //     }
        //     var str = JSON.stringify({ // 将输出参数转为json字符
        //         "order": { //??
        //             memberId: constanttest,
        //             channel: "pc",
        //             deviceNo: "1",
        //             orderId:orderId,
        //             status: $scope.cancel,
                    
        //         }
        //     });
        //     console.log(str)

        //     var data_obj = JSON.stringify({
        //         "packageList": {
        //             "packages": {
        //                 "header": {
        //                     "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
        //                     "comId": "CTO2O20170420",
        //                     "comSerial": "comSerial",
        //                     "from": "PAD",
        //                     "orderSerial": "orderId",
        //                     "requestType": "UPDATEORDETSTATUS", //??
        //                     "sendTime": new Date().format("yyyy-MM-dd hh:mm:ss")
        //                     //new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
        //                 },
        //                 "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
        //             }
        //         }
        //     });
        //     console.log(data_obj)
        //     var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
        //     commonHttp.myHttp(md5_obj, data_obj, function(data, code, error) {
        //         $scope.data = JSON.parse(data);
        //         console.log($scope.data)
        //         if($scope.data.cart.status == "1"){
        //             run();
        //         }
        //     });
        // }
        pageFn()
        //分页器
        function pageFn() {
            $('#pagination2').html('');

            $timeout(function() {
                $("#pagination2").pagination({
                    currentPage: 1,
                    totalPage: Math.ceil($scope.data.order.orderCount / 10),
                    isShow: false,
                    count: 6,
                    prevPageText: "< 上一页",
                    nextPageText: "下一页 >",
                    callback: function(current) {
                        $("#current2").text(current)
                        $scope.page_num1 = current;
                        run();
                    }

                });
                $('.page_gong').html(Math.ceil($scope.data.order.orderCount / 10))
                if (Math.ceil($scope.data.order.orderCount / 10) == 0) {
                    $('#pagination2').hide();
                } else {
                    $('#pagination2').show();
                }
            }, 1000)
        }

$scope.delodr=function(n){
	 var str = JSON.stringify({ // 将输出参数转为json字符
                "order": { //??
                    memberId: constanttest,
                    channel: "pc",
                    deviceNo: "1",
                    orderId:n
                    
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
                            "requestType": "DELETEORDER", //??
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
            	if(code==0){
            		  $scope.data = JSON.parse(data).order;
               if($scope.data.status==1){
               	run()
               }
            	}
            	
            	
            	
            })
}



    }])