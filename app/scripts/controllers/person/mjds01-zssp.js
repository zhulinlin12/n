/**
 * Created by Administrator on 2017/7/14.
 */

angular.module('request')
    .controller('mjds01-zssp', ['$scope', '$http','$state', 'commonHttp','$timeout', function($scope, $http,$state, commonHttp,$timeout) {
        $scope.data=null;
        $scope.page_num1=1;
        $scope.sp_name2='';
        $scope.Price=null;
        $scope.Statu=1; //上架/下架
        $scope.Statued=0;
        $scope.ProductId=[]; //商品id

        $('.xiajia2').on('click',function(){
            $scope.ProductId=[];
            $('.xx_01:checked').each(function(){
                $scope.ProductId.push($(this).parents('tr').find('.xiajia_btn').attr('data-productid'));
                $(this).parents('tr').find('.xiajia_btn').css('background-color','#666').attr('disabled','disabled').html('操作成功')
            })

        });
var pp=0;
        $scope.getProductId=function(event){
            event.target.setAttribute('disabled','disabled');
             event.target.style.backgroundColor='#666';
             event.target.innerHTML='已下架'
            $scope.ProductId=[];
            $scope.ProductId.push(event.target.getAttribute('data-productId'));

        };
        $scope.getProductId2=function(event){ //删除
           // target.setAttribute('disabled','disabled');
          //  target.style.backgroundColor='#666';
       //     target.innerHTML='已删除';
            $scope.ProductId2= event.target.getAttribute('data-productId');
        };
        $scope.getProductId3=function(event){
             event.target.setAttribute('disabled','disabled');
             event.target.style.backgroundColor='#666';
             event.target.innerHTML='已上架'
            $scope.ProductId=[];
            $scope.ProductId.push(event.target.getAttribute('data-productId'));

        };
        $scope.getProductId4=function(target){ //修改
        	sessionStorage.removeItem("setItem2"); 
        	//console.log('ppp')
        	$state.go('index.mjds01-spfb2',({id:target}))
           // localStorage.setItem('xg_productId',target.getAttribute('data-productId'))
        };


        //获取id
        if(localStorage.id){
            var  constanttest=localStorage.id
        }else{
            $state.go('login');
            return;
        }

     //   run();
        //搜索
        $scope.search_fn=function(){
            $scope.sp_name2=$scope.sp_name1;
            if($scope.Price1&&$scope.Price2){
            	  $scope.Price=$scope.Price1+'-'+$scope.Price2;
            }else{
            	if($scope.Price1&&!$scope.Price2){
            		 $scope.Price=$scope.Price1+'-'+' ';
            	}
            	if(!$scope.Price1&&$scope.Price2){
            		  $scope.Price=0+'-'+$scope.Price2;
            	}
            }
              if(!$scope.Price1&&!$scope.Price2){
              	 $scope.Price=''
              }
           console.log($scope.Price)
            run();
          //  pageFn()
        };
        //切换分类
        $scope.changeStatus0=function(){
        	if($scope.sp_name1==''){
        		 $scope.sp_name2=''
        	}
            $scope.Statu=0;
            $scope.Statued=1;

          run()
        };
        $scope.changeStatus1=function(){
        	if($scope.sp_name1==''){
        		 $scope.sp_name2=''
        	}
            $scope.Statu=1;
            $scope.Statued=0;

             run()
        };

        //删除
//      $scope.remove=function(item){
//          var index=$scope.data.product.productList.indexOf(item);
//          $scope.data.product.productList.splice(index,1)
//      };

        //复选框全选
        $scope.m=false;
        $scope.quanxuan=function(){
            $scope.m=!$scope.m;
        };


 //分页
                function setPage(length, amount, num, first) { //创建保存页码数组的函数
                    //length数据总条数
                    //amount每页数据条数
                    //num保留的页码数
                    //first第一页的页码
                    var pages = []; //创建分页数组
                    var page = Math.ceil(length / amount);
                    var ty;
                    if (page <= num) {
                        for (var i = 1; i <= page; i++) {
                            pages.push(i);
                        }
                    }
                    if (page > num) {
                        for (var i = first; i < first + num; i++) {
                            pages.push(i);
                        }
                    }
                    return pages;
                }
                run()
                function run(){
            var str=JSON.stringify({  // 将输出参数转为json字符
                "product": {     //??
                    memberId : constanttest,
                    channel : "pc",
                    deviceNo : "",
                    status : $scope.Statu, //0 是下架 1 是上架
                    startRow : 0,
                    pageSize : 10,
                    salePrice : $scope.Price,
                    productName : $scope.sp_name2
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
                            "requestType": "PRODUCTLISTBYSHOPID",  //??
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
                       if ($scope.data.product.productList.length != 0) {
                            $scope.yes = true;
                            $scope.none = false;

                    $scope.firstPage = 1;
                            $scope.pageNum = 5;
                            $scope.page = 1;
                            $scope.num = $scope.data.product.count;
                            var amount = $scope.data.product.count; //数据总条数
                            var each = 10; //每页显示的条数
                            $scope.sub = function(page) {                          
                                fn(10, page)
                                $scope.lastPage = Math.ceil(amount / each);
                                 console.log(page,$scope.lastPage)
                                if (page >= $scope.pageNum) {
                                    $scope.firstPage = page - Math.floor($scope.pageNum / 2);

                                } else {
                                    $scope.firstPage = 1;

                                }
                                if ($scope.firstPage > $scope.lastPage - $scope.pageNum) {
                                    $scope.firstPage = $scope.lastPage - $scope.pageNum + 1;

                                }
                                $scope.pages = setPage(amount, each, $scope.pageNum, $scope.firstPage);
                                $scope.page = page;
                            }

                            $scope.sub(1);
                            //$scope.up=true;
                            //$scope.lhhide=false;
                            //console.log($scope.data)
                        
                        } else {
                            $scope.yes = false;
                            $scope.none = true;
                        }
               console.log($scope.data)
            });
}

                            
        //接口函数
                function fn(wr, pp) {
                    $scope.up = true;
                    var str2 = JSON.stringify({
                       "product": {     //??
                    memberId : constanttest,
                    channel : "pc",
                    deviceNo : "",
                    status : $scope.Statu, //0 是下架 1 是上架
                    startRow : (pp-1)*10,
                    pageSize : wr,
                    salePrice : $scope.Price,
                    productName : $scope.sp_name2
                }
                    });
                    //按照指定格式传递的数据
                    var data_obj2 = JSON.stringify({
                        "packageList": {
                            "packages": {
                                "header": {
                                    "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                                    "comId": "CTO2O20170420",
                                    "comSerial": "comSerial",
                                    "from": "PAD",
                                    "orderSerial": "orderId",
                                    "requestType": "PRODUCTLISTBYSHOPID",
                                    "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                                    //new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                                },
                                "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str2)
                            }
                        }
                    });
                    var md5_obj2 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj2);
                    commonHttp.myHttp(md5_obj2, data_obj2, function(data) {

                        $scope.data = JSON.parse(data);
                        console.log($scope.data)

                    });

                }

        //3.1.41.  批量上架/下架




        $scope.shelveFn=function(){
            $timeout(function(){
                var strz=JSON.stringify({  // 将输出参数转为json字符
                    "product": {     //??
                        memberId : constanttest,
                        channel : "pc",
                        deviceNo : "",
                        status : $scope.Statued, //0 是下架 1 是上架
                        productIdList : $scope.ProductId,
                    }
                });


                var data_objz = JSON.stringify({
                    "packageList": {
                        "packages": {
                            "header": {
                                "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                                "comId": "CTO2O20170420",
                                "comSerial": "comSerial",
                                "from": "PAD",
                                "orderSerial": "orderId",
                                "requestType": "HANDLEPRODUCTS",  //??
                                "sendTime": new Date().format("yyyy-MM-dd hh:mm:ss")
                                //new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                            },
                            "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67',strz)
                        }
                    }
                });

                var md5_objz = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_objz);
                commonHttp.myHttp(md5_objz, data_objz, function(data,code,error) {
                    $scope.dataz = JSON.parse(data);
                    run()
                    console.log($scope.dataz)
                });


            },500)

        };
        
        //3.1.20.	删除商品信息接口

        $scope.delFn=function(){
        	$scope.tank = true;
        		$scope.qx = function() {
					$scope.tank = false;
				}
        		$scope.del = function() {
            var strd=JSON.stringify({  // 将输出参数转为json字符
                "product": {     //??
                    memberId : constanttest,
                    channel : "pc",
                    deviceNo : "",
                    functionCode:"DELETE",
                    productId:$scope.ProductId2,
                    skuId:"",
                }
            });


            var data_objd = JSON.stringify({
                "packageList": {
                    "packages": {
                        "header": {
                            "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                            "comId": "CTO2O20170420",
                            "comSerial": "comSerial",
                            "from": "PAD",
                            "orderSerial": "orderId",
                            "requestType": "DELETEPRODUCTINFO",  //??
                            "sendTime": new Date().format("yyyy-MM-dd hh:mm:ss")
                            //new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                        },
                        "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67',strd)
                    }
                }
            });

            var md5_objd = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_objd);
            commonHttp.myHttp(md5_objd, data_objd, function(data,code,error) {
                $scope.datad = JSON.parse(data);
                if(code==0){
               // alert('删除成功')
               $scope.tank = false;
                run()
                }
                
                console.log($scope.datad)
            });

}
        }


	

       
      
//              //分页器
//      function pageFn() {
//          $('#pagination2').html('');
//          $timeout(function () {
//              $("#pagination2").pagination({
//                  currentPage: 1,
//                  totalPage: Math.ceil($scope.data.product.count / 10),
//                  isShow: false,
//                  count: 6,
//                  prevPageText: "< 上一页",
//                  nextPageText: "下一页 >",
//                  callback: function (current) {
//                      $("#current2").text(current)
//                      $scope.page_num1 = current;
//                      run();
//                  }
//              });
//          }, 1000)
//      }
// pageFn();

    }])
    .filter("priceFilter",function(){
        return function(dataArr,minPrice,maxPrice){
            var newArr=[];
            angular.forEach(dataArr,function(item){
            if(item.salePrice>=minPrice && item.salePrice<=maxPrice){
                // 说明是在指定价格范围内的商品，将它加入到新的数组中
                newArr.push(item);
            }
            })
            return newArr;
        }
    });


