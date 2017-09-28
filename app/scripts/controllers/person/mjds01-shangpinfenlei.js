/**
 * Created by Administrator on 2017/7/14.
 */

angular.module('request')
    .controller('mjds01-shangpinfenlei', ['$scope', '$http','$state', 'commonHttp', function($scope, $http,$state, commonHttp) {
        if(localStorage.id){
        var  constanttest=localStorage.id
        }else{
                $state.go('login')
                return;
        }

        var str=JSON.stringify({  // 将输出参数转为json字符
            "shop": {     //??
                memberId : constanttest,
                channel : "pc",
                deviceNo : "",
                startRow : "0",
                pageSize : "10",
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
                        "requestType": "MANAGEDCATEGORY",  //??
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
        //排序

        $('.btn_box1 .btn1').on('click',function(){

            $('.btn_box1 .btn2').attr('disabled','disabled');
            $('.fenlei_box .sort_wb').attr('disabled',false).removeClass('save');
            //限制序号文本框的数值；
            $('.fenlei_box .sort_wb').on('blur',function(){
                if($(this).val()>$('.fenlei_box .con_inner').length){
                    //$(this).focus();
                    $(this).val($('.fenlei_box .con_inner').length);
                    //$('.btn_box1 .btn2').attr('disabled','disabled')
                }else{
                    $('.btn_box1 .btn2').attr('disabled',false)
                }
                if($(this).val()==$(this).parents('.fenlei_box .con_inner').siblings('.con_inner').find('.sort_wb').val()){

                    $('.btn_box1 .btn2').attr('disabled','disabled')
                    $('.hint1').show();
                }else{
                    $('.btn_box1 .btn2').attr('disabled',false)
                    $('.hint1').hide();
                }
            })
        });
        //保存
        $('.btn_box1 .btn2').on('click',function(){
                $scope.pxList_arr=[]; //保存函数的数组
                for(var n=0;n<$('.fenlei_box .con_inner').length;n++){
                    var person={
                        id:$('.fenlei_box .txt1').eq(n).attr('data-shopId'),
                        categoryCode:$('.fenlei_box .txt1').eq(n).attr('data-categoryCode'),
                        categoryName:$('.fenlei_box .txt1').eq(n).html(),
                        sort:$('.fenlei_box .sort_wb').eq(n).val()
                    };
                    $scope.pxList_arr.push(person);
                    $('.fenlei_box .sort_wb').attr('disabled','disabled').addClass('save')
                }
                console.log('$scope.pxList_arr----'+$scope.pxList_arr)
            saveFn();
        });


        function saveFn(){
            var strcate=JSON.stringify({  // 将输出参数转为json字符
                "shop": {     //??
                    memberId : constanttest,
                    channel : "pc",
                    deviceNo : "",
                    shopCategories:$scope.pxList_arr


                }
            });


            var data_objcate = JSON.stringify({
                "packageList": {
                    "packages": {
                        "header": {
                            "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                            "comId": "CTO2O20170420",
                            "comSerial": "comSerial",
                            "from": "PAD",
                            "orderSerial": "orderId",
                            "requestType": "SAVEMANAGEDCATEGORY",  //??
                            "sendTime": new Date().format("yyyy-MM-dd hh:mm:ss")
                            //new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                        },
                        "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67',strcate)
                    }
                }
            });

            var md5_objcate = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_objcate);
            commonHttp.myHttp(md5_objcate, data_objcate, function(data,code,error) {
                $scope.catedata = JSON.parse(data);
                console.log($scope.catedata)
            });


        }



    }])