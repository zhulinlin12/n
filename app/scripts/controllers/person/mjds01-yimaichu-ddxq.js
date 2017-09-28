/**
 * Created by Administrator on 2017/7/14.
 */

angular.module('request')
    .controller('mjds01-yimaichu-ddxq', ['$scope','$stateParams', '$http','$state', 'commonHttp', function($scope,$stateParams, $http,$state, commonHttp) {


        if(localStorage.id){
        var  constanttest=localStorage.id
        }else{
                $state.go('login')
                return;
        }
        var str=JSON.stringify({  // 将输出参数转为json字符
            "order": {     //??
                memberId : constanttest,
                channel : "pc",
                deviceNo : "",
                functionCode : "INDIVIDUALORDER",
                orderId:$stateParams.id
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
                        "requestType": "ORDERDETAIL",  //??
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
                    console.log($scope.data)
                });

$scope.sell=function(){
	 var str2=JSON.stringify({  // 将输出参数转为json字符
            "order": {     //??
                memberId : constanttest,
                channel : "pc",
                deviceNo : "",
                orderId:$stateParams.id,
                description:$scope.kd_num
            }
        });


        var data_obj2 = JSON.stringify({
            "packageList": {
                "packages": {
                    "header": {
                        "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                        "comId": "CTO2O20170420",
                        "comSerial": "comSerial",
                        "from": "PAD",
                        "orderSerial": "orderId",
                        "requestType": "SENDGOODS",  //??
                        "sendTime": new Date().format("yyyy-MM-dd hh:mm:ss")
                        //new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                    },
                    "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67',str2)
                }
            }
        });

                var md5_obj2 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj2);
                commonHttp.myHttp(md5_obj2, data_obj2, function(data,code,error) {
                	if(code==0){
                		  $scope.data2 = JSON.parse(data).order;
                		  	console.log(data)
                		  if($scope.data2.status==1){
                		  		$state.go('buyt.mjds01-yimaichu')
                		  }
                	}
                		if(code=='1310'){
                			alert('您订单状态有问题')
                		}
                
                })
}


    }])