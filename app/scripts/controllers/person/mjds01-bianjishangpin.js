/**
 * Created by Administrator on 2017/7/14.
 */

angular.module('request')
    .controller('mjds01-bianjishangpin', ['$scope', '$http','$state', 'commonHttp','$timeout', function($scope, $http,$state, commonHttp,$timeout) {

        /*价格区间*/

        $scope.priceListArr=[
            {count:'',unitmoney:''}
        ];


        $scope.data=null;
        $scope.categoryCode=null;
        $scope.priceListArr2=[];
        $scope.addItem=function(){
            $scope.priceListArr.push({count:'',unitmoney:''});
            $timeout(function(){
                if($('.tbox_2 .see_item').length>0){
                    $('.tbox_2 .s2').show();
                    $('.tbox_2 .dayu').hide();
                    $('.tbox_2 .s2').eq($('.s2').length-1).hide();
                    $('.tbox_2 .dayu').eq($('.s2').length-1).show();
                }
                $('.qp_count').on('keyup',function(){

                    $('.tbox_2 .s2').each(function(n){
                        $(this).find('.num2').html($('.qp_count').eq(n+1).val()-1);
                    })
                })

            },100)
        }

        $scope.getJson=function(){
            $scope.priceListArr2=[];
            var json = {
                changeRule: '',
                newPrice:''
            };
            $timeout(function(){
                $('.qp_count').each(function(n){
                    var nNum1=$('.tbox_2 .num1').eq(n).html();
                    var nNum2=$('.tbox_2 .num2').eq(n).html();
                    json = {
                        changeRule: nNum1+'-'+nNum2,
                        newPrice:$scope.priceListArr[n].unitmoney
                    };
                    $scope.priceListArr2.push(json)
                })
                var lastItem=$scope.priceListArr2[$scope.priceListArr2.length-1].changeRule;
                $scope.priceListArr2[$scope.priceListArr2.length-1].changeRule='≥'+lastItem.substring(0,lastItem.length-1);

            },10)


        };










        var  constanttest='';
        if(localStorage.id){
            constanttest=localStorage.id;
        }else{
            $state.go('login')
            return;
        }

        /*获取商品基本信息的参数*/
        $scope.skuList_arr=[];
        $scope.getSelect=function(){
            $scope.skuList_arr=[];
            for(var n=0;n<$('.skv_val').length;n++){
                var person={skuCode:$('.skv_val').eq(n).find("option:selected").attr('data-type'),typeCode:$('.skv_val').eq(n).find("option:selected").attr('data-code')};
                $scope.skuList_arr.push(person);
            }
        }

        $timeout(function(){
            $scope.getSelect();
        },1000);

        //上一个页面的分类信息
        $scope.type1=localStorage.getItem('hc_type1');
        $scope.type2=localStorage.getItem('hc_type2');
        $scope.type3=localStorage.getItem('hc_type3');
        $scope.typeCode=localStorage.getItem('hc_typeCode');
        //获取编辑商品的数据
        run();

        $timeout(function(){
            run2();
        },1000);
        function run(){

//     3.1.12.	编辑商品基本信息接口
            var str=JSON.stringify({  // 将输出参数转为json字符
                "product": {     //??
                    memberId : constanttest,
                    channel : "pc",
                    deviceNo : "",
                    productId:localStorage.getItem('xg_productId')
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
                            "requestType": "EDITPRODUCT",  //??
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

                //赋值
                $scope.stockSizeWb=$scope.data.product.stockSize; //供应量；
                $scope.categoryCode=$scope.data.product.categoryCode; //code

            });






        }

        function run2() {
            //获取商品基本信息
            //
            var strq=JSON.stringify({  // 将输出参数转为json字符
                "skuProp": {     //??
                    memberId : constanttest,
                    channel : "pc",
                    deviceNo : "",
                    functionCode : "EDITCATEGORYSKU ",
                    categoryCode:$scope.categoryCode,
                    productId:localStorage.getItem('xg_productId')
                }
            });
            var data_objq = JSON.stringify({
                "packageList": {
                    "packages": {
                        "header": {
                            "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                            "comId": "CTO2O20170420",
                            "comSerial": "comSerial",
                            "from": "PAD",
                            "orderSerial": "orderId",
                            "requestType": "PRODUCTCATEGORYSKU",  //??
                            "sendTime": new Date().format("yyyy-MM-dd hh:mm:ss")
                            //new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                        },
                        "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67',strq)
                    }
                }
            });

            var md5_objq = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_objq);
            commonHttp.myHttp(md5_objq, data_objq, function(data,code,error) {
                $scope.dataq = JSON.parse(data);
            });



        }






        /*添加自定义信息*/
        $('.jbxx_box .add_btn').on('click',function(){
            $('.jbxx_box').append('<div class="def_item"><input type="text" class="wb_1" placeholder="请输入自定义内容" style="margin:10px 175px;"></div>')

        })


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
/*
            商品主图 zt_list  zt_num
            [{
                pictureName:"aaa",
                type: "PRODUCTINFO_PIC",
                sort: "0",
                imageUrl: $scope.form[0].KK
            }]
           */
            // var formJson=JSON.parse(form);
             //alert($scope.path1)
            $timeout(function(){
                var listName=$scope.path1.split("/");

                var list={
                    pictureName:listName[listName.length-1],
                    type: "PRODUCTINFO_PIC",
                    sort: $scope.zt_num,
                    imageUrl: $scope.path1
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




        /* ----------------图片上传2----------------------*/
        $scope.zt_num2=0;
        $scope.xq_list=[];

        $scope.reader2 = new FileReader();   //创建一个FileReader接口
        $scope.form2 = [    //用于绑定提交内容，图片或其他数据

        ];
        $scope.thumb2 = {};      //用于存放图片的base64
        $scope.thumb_default2 = {    //用于循环默认的‘加号’添加图片的框
            1111:{}
        };
        $scope.ourl2=[
        ]

        $scope.btn_show2=true;
        $scope.img_upload2 = function(files) {       //单次提交图片的函数
            if(files[0]){
                $scope.guid2 = (new Date()).valueOf();   //通过时间戳创建一个随机数，作为键名使用
                //  $scope.reader.readAsDataURL(files[0]);  //FileReader的方法，把图片转成base64
                //  $scope.ourl.push({"name":files[0].name})

                console.log($scope.ourl2)
                console.log(files[0])
                var data2 = new FormData();      //以下为像后台提交图片数据
                data2.append('pic', files[0]);
                data2.append('guid',$scope.guid2);

                $http({
                    method: 'post',
                    url: 'http://47.92.145.206/com.ifp.image/upload',
                    data:data2,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).then(function(result) {
                    $scope.path2=result.data.path;

                    console.log(result.data)
                    var img2='pp'
                    angular.element("#one-input2").val('');
                    $scope.po2=''; //清理缓存问题
                    if (result.data) {
                        $scope.form2.push({"KK":result.data.path});

//              $scope.form['pp']=data.path
//              $scope.thumb[data.guid].status = 'SUCCESS';

                        $scope.thumb2[$scope.guid2] = {
                            imgSrc : result.data.url,  //接收base64
                        }

                        console.log($scope.form2.length)
                        console.log($scope.form2)
                        console.log($scope.form2.KK)
                    }
                    if(result.data.result_code == 'FAIL'){
                        console.log(result.data)
                    }
                })
            }
            
            $timeout(function(){
                var listName=$scope.path2.split("/");

                var list={
                    pictureName:listName[listName.length-1],
                    type: "GRAPHICDESC",
                    sort: $scope.zt_num2,
                    imageUrl: $scope.path2
                };
                $scope.xq_list.push(list);
                $scope.zt_num2++;
            },1000);


            return;
        };

        $scope.img_del2 = function(key) {    //删除，删除的时候thumb和form里面的图片数据都要删除，避免提交不必要的
            $scope.btn_show2=true;
            console.log(key)
            var guidArr2 = [];
            for(var p in $scope.thumb2){
                guidArr2.push(p);
            }
            delete $scope.thumb2[guidArr2[key]];
            $scope.form2.splice($scope.form2.indexOf(key), 1);
            //delete $scope.form2[guidArr2[key]];

        };
        // $scope.submit_form = function(){    //图片选择完毕后的提交，这个提交并没有提交前面的图片数据，只是提交用户操作完毕后，
        //     //　　到底要上传哪些，通过提交键名或者链接，后台来判断最终用户的选择,整个思路也是如此
        //     $http({
        //         method: 'post',
        //         url: '/comm/test.php',
        //         data:$scope.form,
        //     }).success(function(data) {
        //         console.log(data);
        //     })
        // };










        //上传图片接口

        $scope.addpic=function() {
            if($scope.form.length==0){
                alert('请添加商品主图');
                return false;
            }
            if($scope.form2.length==0){
                alert('请添加商品详情');
                return false;
            }
            
            $scope.getSelect();

            console.log('------$scope.salePrice_wb:-------');
            console.log($scope.salePrice_wb);
            //3.1.40.	新增/保存商品接口
            var strp=JSON.stringify({  // 将输出参数转为json字符
                "product": {     //??
                    memberId : constanttest,
                    channel : "pc",
                    deviceNo : "",
                    functionCode : "PUBLISH",
                    productId:"",
                    brandId:"",
                    categoryCode:$scope.data.product.categoryCode,
                    factoryPrice:"", //出厂价 000
                    salePrice:"", //售价 000
                    description:$scope.descriptionWb,
                    period:$('.fh_date').find("option:selected").html(),
                    productName:$scope.data.product.productName,
                    stockSize:$scope.stockSizeWb, //库存 000
                    shipped:"", //发货地址 000
                    skuList:$scope.skuList_arr,
                    distList:[{distMode:'',expressCharge:''}], //物流列表 000 [{distMode:'1',expressCharge:'20'}]
                    imageTypeList:[
                        {
                            type: "PRODUCTINFO_PIC",
                            imageList: $scope.zt_list
                        },
                        {
                            type: "GRAPHICDESC",
                            imageList: $scope.xq_list
                        }
                    ],
                    priceList:$scope.priceListArr2

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
                            "requestType": "PUBLISHPRODUCT",
                            "sendTime": new Date().format("yyyy-MM-dd hh:mm:ss")
                            //new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                        },
                        "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67',strp)
                    }
                }
            });

            var md5_objp = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_objp);
            commonHttp.myHttp(md5_objp, data_objp, function(data,code,error) {
                $scope.data2 = JSON.parse(data);
                console.log('dataaaaaaa:'+$scope.data2);
            });


        }



    }])