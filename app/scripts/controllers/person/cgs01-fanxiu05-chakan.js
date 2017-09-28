/**
 * Created by Administrator on 2017/7/14.
 */

angular.module('request')
    .controller('cgs01-fanxiu05-chakan', ['$scope', '$http','$state', 'commonHttp', function($scope, $http,$state, commonHttp) {
//        alert(11)
        if(localStorage.id){
        var  constanttest=localStorage.id
        }else{
                $state.go('login')
                return;
        }
        var str=JSON.stringify({  // 将输出参数转为json字符
            "service": {     //??
                memberId : constanttest,
                channel : "pc",
                deviceNo : "",
                functionCode : "PERSONALINQUIRY",
                serviceId:localStorage.getItem('sh1_serviceId')
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
                        "requestType": "CUSTOMSERVICEDETAIL",  //??
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




    }])