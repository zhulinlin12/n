/**
 * Created by Administrator on 2017/7/14.
 */

angular.module('request')
    .controller('cgs01-fanxiu04-mingxi', ['$scope', '$http','$state', 'commonHttp', function($scope, $http,$state, commonHttp) {
//        alert(11)
        if(localStorage.id){
        var  constanttest=localStorage.id
        }else{
                $state.go('login')
                return;
        }
        //这个接口没有
        var str=JSON.stringify({  // 将输出参数转为json字符
            "order": {     //??
                memberId : constanttest,
                channel : "pc",
                deviceNo : "",
                functionCode : "INDIVIDUALORDER",
                shopId : "",
                startRow : "0",
                pageSize : "10",
                flag : "0",
                orderType : "",
                orderCode : "",
                productName : "",
                startTime : "",
                endTime : "",
                status : "",
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
                    console.log($scope.data)
                });




    }])