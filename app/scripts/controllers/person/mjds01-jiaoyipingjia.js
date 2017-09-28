/**
 * Created by Administrator on 2017/7/14.
 */

angular.module('request')
    .controller('mjds01-jiaoyipingjia', ['$scope', '$http','$state', 'commonHttp','$timeout', function($scope, $http,$state, commonHttp,$timeout) {
        $scope.page_num1=1;

        // $scope.skuId='';
        // $scope.productId='';
        // $scope.evaluateId='';

        //点击获取Id
        $scope.getId=function(event) {
            $scope.skuId = event.target.getAttribute('data-skuId');
            $scope.productId = event.target.getAttribute('data-productId');
            $scope.evaluateId = event.target.getAttribute('data-evaluateId');
            $scope.num = event.target.getAttribute('data-num');
            // localStorage.setItem('pj1_SkuId',$scope.skuId);
            // localStorage.setItem('pj1_ProductId',$scope.productId);
            // localStorage.setItem('pj1_EvaluateId',$scope.evaluateId);
            console.log(
                $scope.skuId+'---'+$scope.productId+'---'+$scope.evaluateId
            )
        }

        if(localStorage.id){
            var  constanttest=localStorage.id
        }else{
            $state.go('login')
            return;
        }

        run();

        $timeout(function(){
            $('.wbk_1').on('keyup',function(){
                if($(this).val().length>500||$(this).val().length<1){
                    $(this).siblings('.send').attr('disabled','disabled').css('background','#999');
                }else{
                    $(this).siblings('.send').attr('disabled',false).css('background','#004092');
                }
            })
        },1000)



        function run(){

            var str=JSON.stringify({  // 将输出参数转为json字符
                "evaluate": {     //??
                    memberId : constanttest,
                    channel : "pc",
                    deviceNo : "",
                    startRow : ($scope.page_num1-1)*10,
                    pageSize : "10",
                    functionCode : "ORDERSUPPLY",//:ORDERSUPPLY 供应商 INDIVIDUALORDER 采购商

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
                            "requestType": "EVALUATEDLIST",  //??
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
                console.log($scope.data);

            });



        }


        $scope.replyFn=function(event,n){
        	console.log(n)
        	if(n==undefined||n.length<1){
        		$(event.target).attr('disabled','disabled').css('background','#999')
        		return;
        	}else{
        		$(event.target).removeAttr('disabled').css('background','#006cff')
        	}
            //3.1.17.  评价商品/ 回复评价接口

            var strp=JSON.stringify({  // 将输出参数转为json字符
                "evaluate": {     //??
                    memberId : constanttest,
                    channel : "pc",
                    deviceNo : "",
                    functionCode:"RESPONSEEVALUATION",
                    orderId:"",
                    evaluateList:[
                        {
                            "deliveryLevel":"",
                            "descLevel":"",
                            "serverLevel":"",
                            "skuId":$scope.skuId,
                            "productId":$scope.productId,
                            "evaluate":"",
                            "evaluateId":$scope.evaluateId,
                            "replyText":$scope.data.evaluate.productList[$scope.num].txt
                        }
                    ],
                    imagesList:[
                        {
                            imageUrl:'',
                            type:''
                        }
                    ]

                }
            });
            


            var data_objp = JSON.stringify({
                "packageList": {
                    "packages": {
                        "header": {
                            "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                            "comId": "CTO2O20170420",
                            "comSerial": "comSerial",
                            "from": "PAD",
                            "orderSerial": "orderId",
                            "requestType": "EVALUATIONANDRELY",  //??
                            "sendTime": new Date().format("yyyy-MM-dd hh:mm:ss")
                            //new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                        },
                        "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67',strp)
                    }
                }
            });

            var md5_objp = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_objp);
            commonHttp.myHttp(md5_objp, data_objp, function(data,code,error) {
            	if(code==0){
            		$scope.datap = JSON.parse(data).evaluate;
            		if($scope.datap.status==1){
            $('.btn2').eq($scope.num).addClass('btn_dis');
            $('.hf_box').eq($scope.num).addClass('hf_hide');
            		}else{
            			alert('回复失败尝试刷新一下')
            		}
                
                console.log($scope.datap)
            	}
                
            });
        }



        //分页器
        $timeout(function(){

            $("#pagination2").pagination({
                currentPage: 1,
                totalPage: Math.ceil($scope.data.evaluate.count/10),
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
            $('.page_num1').html(Math.ceil($scope.data.evaluate.count/10))
        },1000)




    }])