/**
 * Created by Administrator on 2017/7/14.
 */

angular.module('request')
    .controller('cgs01-tousuguanli3', ['$scope', '$http','$state', 'commonHttp','$timeout', function($scope, $http,$state, commonHttp,$timeout) {
//alert(localStorage.getItem('TsOrderId'))

        if(localStorage.id){
        var  constanttest=localStorage.id
        }else{
                $state.go('login')
                return;
        }
        var str=JSON.stringify({  // 将输出参数转为json字符
            "complaint": {     //??
                memberId : constanttest,
                channel : "pc",
                deviceNo : "",
                orderId : localStorage.getItem('TsOrderId'), //2
                productId : localStorage.getItem('TsProductId'), //1
                skuId : localStorage.getItem('TsSkuId') //1
            }
        });
        console.log(
            'OrderId:'+localStorage.getItem('TsOrderId')+' '+
            'ProductId:'+localStorage.getItem('TsProductId')+' '+
            'SkuId:'+localStorage.getItem('TsSkuId')
        )

        var data_obj = JSON.stringify({
            "packageList": {
                "packages": {
                    "header": {
                        "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                        "comId": "CTO2O20170420",
                        "comSerial": "comSerial",
                        "from": "PAD",
                        "orderSerial": "orderId",
                        "requestType": "SETTLINGCOMPLAINTS",  //??
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


        //3.1.46.  保存投诉 接口
        $scope.saveTousu=function(){

            if($scope.form.length==0){
                alert('请添加图片')
                return false;
            }
            var str2=JSON.stringify({  // 将输出参数转为json字符
                "complaint": {     //??
                    memberId : constanttest,
                    channel : "pc",
                    deviceNo : "",
                    orderId : $scope.data.complaint.orderId,
                    productId : $scope.data.complaint.productId,
                    skuId : $scope.data.complaint.skuId,
                    type:"",
                    description:$scope.descriptionWb,
                    phone:$('input.phone_num').val(),
                    imageList: $scope.zt_list
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
                            "requestType": "SAVECOMPLAINT",  //??
                            "sendTime": new Date().format("yyyy-MM-dd hh:mm:ss")
                            //new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                        },
                        "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67',str)
                    }
                }
            });

            var md5_obj2 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj2);
            commonHttp.myHttp(md5_obj2, data_obj2, function(data,code,error) {
                $scope.data2 = JSON.parse(data);
                console.log($scope.data2)
                //跳转链接
                if($scope.data2.complaint.applyMsg=='操作成功'){
                    $('.send_btn').attr('ui-sref','buyt.cgs01-tousuguanli')
                    $timeout(function(){
                        $('.btn_box2 .send_btn2').trigger('click');
                    },1000)

                }else{
                    alert('提交失败')
                }


            });



        }
        






        /* ----------------图片上传----------------------*/

        $scope.zt_list=[];
        $scope.zt_num=0;
        $scope.path1=null;

        $scope.reader = new FileReader();   //创建一个FileReader接口
        $scope.form = [     //用于绑定提交内容，图片或其他数据

        ];
        $scope.thumb = {};      //用于存放图片的base64
        $scope.thumb_default = {    //用于循环默认的‘加号’添加图片的框
            1111:{}
        };
        $scope.ourl=[
        ]

        $scope.btn_show=true;
        console.log('show:'+$scope.btn_show);
        $scope.img_upload = function(files) {       //单次提交图片的函数
            $scope.btn_show=false;
            if(files[0]){
                $scope.guid = (new Date()).valueOf();   //通过时间戳创建一个随机数，作为键名使用
                //  $scope.reader.readAsDataURL(files[0]);  //FileReader的方法，把图片转成base64
                //  $scope.ourl.push({"name":files[0].name})

                console.log($scope.ourl)
                console.log(files[0])
                var data1 = new FormData();      //以下为像后台提交图片数据
                data1.append('pic', files[0]);
                data1.append('guid',$scope.guid);

                $http({
                    method: 'post',
                    url: 'http://47.92.145.206/com.ifp.image/upload',
                    data:data1,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).then(function(result) {

                    console.log(result.data)
                    $scope.path1=result.data.path;
                    var img='pp'
                    angular.element("#one-input").val('');
                    $scope.po=''; //清理缓存问题
                    if (result.data) {
                        $scope.form.push({"KK":result.data.path});

//              $scope.form['pp']=data.path
//              $scope.thumb[data.guid].status = 'SUCCESS';

                        $scope.thumb[$scope.guid] = {
                            imgSrc : result.data.url,  //接收base64
                        }

                        console.log($scope.form.length)
                        console.log($scope.form)
                        console.log($scope.form.KK)
                    }
                    if(result.data.result_code == 'FAIL'){
                        console.log(result.data)
                    }
                })
            }

            $timeout(function(){
                var listName=$scope.path1.split("/");

                /*这里特别注意，下午修改*/
                var list={
                    imageName:listName[listName.length-1],
                    sort: $scope.zt_num,
                    path: $scope.path1
                };
                $scope.zt_list.push(list);
                $scope.zt_num++;
            },1000);


            return;
        };

        $scope.img_del = function(key) {    //删除，删除的时候thumb和form里面的图片数据都要删除，避免提交不必要的
            $scope.btn_show=true;
            console.log(key)
            var guidArr = [];
            for(var p in $scope.thumb){
                guidArr.push(p);
            }
            delete $scope.thumb[guidArr[key]];
            $scope.form.splice($scope.form.indexOf(key), 1);
            //delete $scope.form[guidArr[key]];

        };
        $scope.submit_form = function(){    //图片选择完毕后的提交，这个提交并没有提交前面的图片数据，只是提交用户操作完毕后，
            //　　到底要上传哪些，通过提交键名或者链接，后台来判断最终用户的选择,整个思路也是如此
            $http({
                method: 'post',
                url: '/comm/test.php',
                data:$scope.form,
            }).success(function(data) {
                console.log(data);
            })
        };                
                
                
                
                

    }])







