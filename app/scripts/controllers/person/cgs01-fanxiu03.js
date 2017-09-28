/**
 * Created by Administrator on 2017/7/14.
 */

angular.module('request')
    .controller('cgs01-fanxiu03', ['$scope', '$http','$state', 'commonHttp','$timeout', function($scope, $http,$state, commonHttp,$timeout) {
        $scope.page_num1=1;
        //搜索
        $scope.time_1t=''; //下单时间1
        $scope.time_2t=''; //下单时间2
        $scope.ddhm_t=null; //订单号码
        $scope.searchFn=function(){
            $scope.time_1t=$('.time1').val();
            $scope.time_2t=$('.time2').val();
            $scope.ddhm_t=$('.ddhm').val();
            //alert($scope.ddhm_t);
            run();
        };
        //点击申请获取skuId
        $scope.getserviceId=function(event) {
            $scope.serviceId = event.target.getAttribute('data-serviceId');
            localStorage.setItem('sh1_serviceId',$scope.serviceId);
            //alert('$scope.serviceId:---'+$scope.serviceId)
        }

        run();
        function run(){
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
                    shopId : "",
                    orderId:$scope.ddhm_t,
                    orderCode:"",
                    dealStatus:"",
                    // startTime : '2017-08-01',
                    // endTime : '2017-06-01',
                    startTime : $scope.time_1t,
                    endTime : $scope.time_2t,
                    startRow : ($scope.page_num1-1)*10,
                    pageSize : "10"
                }
            });
            console.log('开始时间：'+$scope.time_1t+'---结束时间：'+$scope.time_2t)
            var data_obj = JSON.stringify({
                "packageList": {
                    "packages": {
                        "header": {
                            "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                            "comId": "CTO2O20170420",
                            "comSerial": "comSerial",
                            "from": "PAD",
                            "orderSerial": "orderId",
                            "requestType": "REPAIREDGOODS",  //??
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

        }


        $timeout(function(){
            $("#pagination2").pagination({
                currentPage: 1,
                totalPage: Math.ceil($scope.data.service.count/10),
                isShow: false,
                count: 6,
                prevPageText: "< 上一页",
                nextPageText: "下一页 >",
                callback: function(current) {
                    $("#current2").text(current)
                    $scope.page_num1=current;
                    run();
                }

            });
            $('.page_gong').html(Math.ceil($scope.data.service.count/10))

        },1000)

    }])