angular.module('request', ['CommonService',"animate"])

    .filter(
        'to_trusted', ['$sce', function($sce) {
            return function(text) {
                return $sce.trustAsHtml(text);
            }
        }]
    )
    .controller('synr', ['$scope', '$http', '$state', 'commonHttp', '$window', '$location', '$timeout', '$stateParams', 'readson', '$document', "readJson", "$q", function($scope, $http, $state, commonHttp, $window, $location, $timeout, $stateParams, readson, $document, readJson, $q) {
        var $e = angular.element

        var vm = this;



        $scope.$on("subs", function(a, b) {
            $scope.subs = b
            console.log(b)
        })
        if (localStorage.id) {
            //console.log('7777')
            // $scope.constanttest = localStorage.id;
            var constanttest = localStorage.id;
        } else {
            //console.log('222')
            // $scope.constanttest = 0;

            var constanttest = '1';
        }


        if (localStorage.id) {
            $scope.pl = true;
            $scope.pq = false;
        } else {
            $scope.pl = false;
            $scope.pq = true;
            //$state.go('login')

        }

        // 退出
        $scope.tuichu = function() {
            clearCookie('pwd')
            clearCookie('user')
            //localStorage.removeItem('username');
            localStorage.removeItem('id');
            localStorage.removeItem('turl');
            $scope.pq = true;
            $scope.pl = false;
            $location.path('/toubu/synr');
            $window.location.reload();
        }



        $scope.getPrizes = function($timeout) {

            if (constanttest == '1') {
                $state.go('login')
            } else {
                $state.go('buyt.perinfor')
            }

            $timeout($scope.getPrizes, 0)
        }

        //获取banner和banner下方的活动图片
        var activity = JSON.stringify({
            "activity": {
                "memberId": constanttest,
                "channel": "PC",
                "deviceNo": "2",
                "activityMenuCodeList": [{
                    'activityMenuCode': 'home_menu_activity'
                }, {
                    'activityMenuCode': 'home_menu_left_activity'
                }, {
                    'activityMenuCode': 'home_menu_right_activity'
                }, {
                    'activityMenuCode': 'home_menu_zhong_advertisement'
                }]
            }
        });
        // 按照指定格式传递的数据
        var data_obj2 = JSON.stringify({
            "packageList": {
                "packages": {
                    "header": {
                        "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                        "comId": "CTO2O20170420",
                        "comSerial": "comSerial",
                        "from": "PAD",
                        "orderSerial": "orderId",
                        "requestType": "ACTIVITYIMAGES",
                        "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')

                    },
                    "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', activity)
                }
            }
        });
        var md5_obj3 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj2);
        var ms = readJson.getJson(md5_obj3, data_obj2);
        //console.log(ms)
        ms.then(function(response) {
            console.log(response.data)
            if (response.data.packageList) {
                var jiami = response.data.packageList.packages.response;
                var jiemi_json = JSON.parse(DES3.decrypt("", jiami));
                var code = response.data.packageList.packages.header.responseCode;
                var errorMessage = response.data.packageList.packages.header.errorMessage;
                readson.getson(code)
                //  console.log(jiemi_json)
                var data = jiemi_json
                // console.log(data);

                // 轮播图部分
                $scope.top = [];
                $scope.bottom = [];
                $scope.zhong = [];

                angular.forEach(data.activity.activityList, function(item, index) {
                    if (item.activityMenuCode == "home_menu_activity") {
                        $scope.top.push(item);
                    } else if (item.activityMenuCode == "home_menu_zhong_advertisement") {
                        $scope.zhong.push(item);
                    } else {
                        $scope.bottom.push(item);

                    }
                });
                $scope.$broadcast('top', $scope.top);

                // console.log($scope.top)
                // console.log($scope.bottom)
                // console.log($scope.zhong)

            } else {
                console.log(response)
            }
        }, function(reason) {
            console.log('Failed: ' + reason);
        }, function(update) {
            console.log('Got notification: ' + update);
        })



        // 获取首页数据接口
        var mall = JSON.stringify({
            "mallIndex": {
                "memberId": constanttest,
                "channel": "PC",
                "deviceNo": "2"
            }
        });
        // 按照指定格式传递的数据
        var data_obj2 = JSON.stringify({
            "packageList": {
                "packages": {
                    "header": {
                        "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                        "comId": "CTO2O20170420",
                        "comSerial": "comSerial",
                        "from": "PAD",
                        "orderSerial": "orderId",
                        "requestType": "STOREINDEX",
                        "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')

                    },
                    "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', mall)
                }
            }
        });
        var md5_obj3 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj2);
        commonHttp.myHttp(md5_obj3, data_obj2, function(data) {
            var data = JSON.parse(data);
            // console.log(data);

            // 右侧招标部分的数据
            $scope.icons = data.mallIndex.iconList;
            // 热销推荐和优品推荐数据
            $scope.recommend = data.mallIndex.recommendList;
            // 滚动条下拉
            $scope.dataList = data.mallIndex.dataList;

            // console.log($scope.dataList);
        })
        $scope.artTemp = null;
        $scope.isAct = true;
        // 侧边栏的滚动返回顶部的显示框，默认不显示,当到达页面中部时才显示
        $scope.back = false;
        // 初始化隐藏模块
        $scope.gStatus = true;
        $scope.a = 800;
        $scope.reld = false;
        $scope.noreld = true;
        $scope.product = null;
        $e = angular.element;
        // 左侧边栏 滚动效果
        $document.on('scroll', function() {
            // console.log($e('.z-cen'))
            // console.log($scope.$rollArr);
            $scope.height = $document.scrollTop();
            var $fixed = document.querySelector('#fixed');
            $scope.$angFixed = $e($fixed);

            // 当半屏幕时滚动条固定显示
            if ($scope.height > 400) {
                $scope.$angFixed.css({
                    'position': 'fixed',
                    "top": "20px",
                    'display': 'block'
                });
                $scope.back = true;
            } else {
                $scope.$angFixed.css({
                    'position': 'static'
                });
                $scope.back = false;
            }
            // 左侧滚动条根据位置变化样式效果的判断
            angular.forEach($scope.$angFixed.children('li'), function(item, index) {
                item = $e(item);

                if ($scope.height >= item.data('postion') && $scope.height <= item.data('postion') + 400) {
                    item.children('.mun').css('display', 'none').next('span').css({
                        'display': 'inline-block',
                        "width": "50px",
                        "height": "50px"
                    });
                    item.css({
                        'backgroundColor': '#006cff',
                        'width': '50px',
                        'height': '50px'
                    });

                } else {
                    item.children('.mun').css({
                        'display': 'inline-block'
                    }).next('span').css({
                        'display': 'none'
                    });
                    item.css({
                        'backgroundColor': '#fff',
                        'width': '50px',
                        'height': '50px'
                    });

                }

            })
        })


        // 获取公告和规则的文章接口
        var adminStr = JSON.stringify({
            "bidding": {
                "activityMenuCode": 'home_menu_Announcement_rule',
                "channel": "1",
                "deviceNo": "2",
                "pageSize": "4"
            }
        });
        console.log(adminStr)
        // 按照指定格式传递的数据
        var data_objadminStr = JSON.stringify({
            "packageList": {
                "packages": {
                    "header": {
                        "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                        "comId": "CTO2O20170420",
                        "comSerial": "comSerial",
                        "from": "PAD",
                        "orderSerial": "orderId",
                        "requestType": "NOTICQUERY",
                        "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                        // new Date().format('yyyy-MM-dd
                        // hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                    },
                    "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', adminStr)
                }
            }
        });

        console.log(data_objadminStr)
        var md5_obj3 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_objadminStr);

        commonHttp.myHttp(md5_obj3, data_objadminStr, function(data, code) {
           
            $scope.ArticleMenuLists = JSON.parse(data).bidding.tPlatformArticleMenuList[0].children;
         

            $scope.ArticleLists = JSON.parse(data).bidding.tPlatformArticleList;
     

        }) //end http

        //点击切换公告和规则
        $scope.menuName = '规则';

        $scope.getArticleTit = function(menusId, name) {
            console.log(name)
            $scope.menuName = name;
            $scope.ifSame = menusId;

            var adminStr = JSON.stringify({
                "bidding": {
                    "articleMenuId": menusId,
                    "channel": "1",
                    "deviceNo": "2",
                    "pageSize": "4"

                }
            });
            console.log(adminStr)
            // 按照指定格式传递的数据
            var data_objadminStr = JSON.stringify({
                "packageList": {
                    "packages": {
                        "header": {
                            "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                            "comId": "CTO2O20170420",
                            "comSerial": "comSerial",
                            "from": "PAD",
                            "orderSerial": "orderId",
                            "requestType": "BYIDCHANEI",
                            "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                            // new Date().format('yyyy-MM-dd
                            // hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                        },
                        "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', adminStr)
                    }
                }
            });

            console.log(data_objadminStr)
            var md5_obj3 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_objadminStr);

            commonHttp.myHttp(md5_obj3, data_objadminStr, function(data, code) {
                // console.log(data)


                $scope.ArticleLists = JSON.parse(data).bidding.tPlatformArticleList;
                console.log($scope.ArticleLists);

            }) //end http

        } //end getArticleTit fnc



    }]).controller('xzq', ['$scope', 'commonHttp', '$stateParams', '$state', function($scope, commonHttp, $stateParams, $state) {
        if (localStorage.id) {
            //console.log('7777')
            var constanttest = localStorage.id
        } else {
            //console.log('222')
            var constanttest = ''
        }
      
        $scope.$on("subs", function(a, b) {
            $scope.subs = b
            //console.log(b)
        })
        var str3 = JSON.stringify({
            "product": {
                "memberId": constanttest,
                "channel": "PC",
                "deviceNo": "2",
                "productId": $stateParams.id
            }
        });
        // 按照指定格式传递的数据
        var data_obj3 = JSON.stringify({
            "packageList": {
                "packages": {
                    "header": {
                        "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                        "comId": "CTO2O20170420",
                        "comSerial": "comSerial",
                        "from": "PAD",
                        "orderSerial": "orderId",
                        "requestType": "PRODUCTINFOMATION",
                        "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                        // new Date().format('yyyy-MM-dd
                        // hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                    },
                    "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str3)
                }
            }
        });

        var md5_obj3 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj3);

        commonHttp.myHttp(md5_obj3, data_obj3, function(data) {
            var $e = angular.element
            $scope.product = JSON.parse(data).product;
            console.log($scope.product);
            $scope.arr = [];
            angular.forEach($scope.product.priceList, function(item) {
                // console.log(item);
                var obj = {};
                obj['price'] = Number(item.price);
                if (item.changeRule.indexOf('-') == -1) {
                    obj['num'] = Number(item.changeRule.slice(1));
                    obj['num2'] = Number($scope.product.stockSize);
                } else {
                    obj['num'] = Number(item.changeRule.split('-')[0])
                    obj['num2'] = Number(item.changeRule.split('-')[1])
                }

                obj['changeRule'] = item.changeRule;
                $scope.arr.push(obj);

            });
            //图片
            //             // 图片上下滚动
            var count = $scope.product.imageUrls.length - 4; /* 显示 5 个 li标签内容 */
            var interval = 60;
            var curIndex = 0;
            $e('.scrollbutton').click(function() {
                console.log(curIndex, count)
                if (count <= 1) {
                    $e('.glyphicon-menu-right').addClass('disabled')
                    $e('.glyphicon-menu-left').addClass('disabled')
                    return
                }
                if ($e(this).hasClass('disabled')) return false;
                if ($e(this).hasClass('glyphicon-menu-left')) --curIndex;
                else ++curIndex;
                $e('.scrollbutton').removeClass('disabled');
                if (curIndex == 0) $e('.glyphicon-menu-left').addClass('disabled');
                if (curIndex == count - 1) $e('.glyphicon-menu-right').addClass('disabled');
                $e("#imageMenu .zll-u").stop(false, true).animate({
                    "marginLeft": -curIndex * interval + "px"
                }, 200);

            });
            //  $scope.arr.unshift({'pri':$scope.product.salePrice,"num":$scope.product.min,"id":'oo'})
            //          $scope.arr.sort(function(a, b) {
            //              return a.num - b.num;
            //          });
            console.log($scope.arr)
            $scope.zll = $scope.arr[0]['num'];
            $scope.countPrice = $scope.arr[0].price * $scope.arr[0]['num']

            console.log($scope.product.imageUrls[0].imgUrl)
            window._bd_share_config = {
                "common": {
                    "bdSnsKey": {},
                    "bdText": "我在慧筑云发现了“友联直销起树断根机 专业挖树苗机械 轻便起树球机”的好货源,￥2000.00元 /台",
                    "bdMini": "2",
                    "bdMiniList": false,
                    "bdPic": $scope.product.imageUrls[0].imgUrl,
                    "bdStyle": "0",
                    "bdSize": "16"
                },
                "share": {}
            };
           var wry=document.getElementsByTagName('head')[0]||body;
        wry.appendChild(document.createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)
        });
        $scope.wr = 0;
        $scope.img = function(index) {
            $scope.wr = index
        }
        $scope.limit = 155;
        var wui = 0;
        $scope.more = function(rt) {
            console.log(wui)
            if (wui == 0) {
                $scope.limit = $scope.product.productShop.description.length;
                $(rt).text('收起')
                wui = 1
                return
            }
            if (wui == 1) {
                $scope.limit = 155;
                $(rt).text('展开')
                wui = 0
                return
            }
        }
        //基本参数，评论，详情
        $scope.lovr = 0;
        $scope.productw = function(n) {
            $scope.lovr = n
            if (n == 1) {
                var str3 = JSON.stringify({
                    "product": {
                        "memberId": constanttest,
                        "channel": "PC",
                        "deviceNo": "2",
                        "functionCode": "GRAPHICDESC",
                        "productId": $scope.product.productId
                    }
                });
                // 按照指定格式传递的数据
                var data_obj3 = JSON.stringify({
                    "packageList": {
                        "packages": {
                            "header": {
                                "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                                "comId": "CTO2O20170420",
                                "comSerial": "comSerial",
                                "from": "PAD",
                                "orderSerial": "orderId",
                                "requestType": "PRODUCTOTHERINFO",
                                "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                                // new Date().format('yyyy-MM-dd
                                // hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                            },
                            "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str3)
                        }
                    }
                });

                var md5_obj3 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj3);

                commonHttp.myHttp(md5_obj3, data_obj3, function(data) {
                    $scope.xre2 = JSON.parse(data).product;
                    console.log($scope.xre2)
                    angular.element("#ks").html($scope.xre2.description)


                })
            }
            if (n == 2) {
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
                var str3 = JSON.stringify({
                    "product": {
                        "memberId": constanttest,
                        "channel": "PC",
                        "deviceNo": "2",
                        "functionCode": "EVALUATION_LIST",
                        "productId": $scope.product.productId,
                        "startRow": 0,
                        "pageSize": 10
                    }
                });
                // 按照指定格式传递的数据
                var data_obj3 = JSON.stringify({
                    "packageList": {
                        "packages": {
                            "header": {
                                "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                                "comId": "CTO2O20170420",
                                "comSerial": "comSerial",
                                "from": "PAD",
                                "orderSerial": "orderId",
                                "requestType": "PRODUCTOTHERINFO",
                                "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                                // new Date().format('yyyy-MM-dd
                                // hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                            },
                            "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str3)
                        }
                    }
                });

                var md5_obj3 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj3);

                commonHttp.myHttp(md5_obj3, data_obj3, function(data, code, error) {
                    if (code == 0) {
                        $scope.plct = JSON.parse(data).product;
                        console.log($scope.plct)

                        if ($scope.plct.evaluate.evaluateList.length != 0) {
                            $scope.yes = true;
                            $scope.none = false;

                            //$scope.up=true;
                            //$scope.lhhide=false;
                            //console.log($scope.data)
                            $scope.firstPage = 1;
                            $scope.pageNum = 5;
                            $scope.page = 1;
                            $scope.num = $scope.plct.evaluate.count;
                            var amount = $scope.plct.evaluate.count; //数据总条数
                            var each = 10; //每页显示的条数
                            $scope.sub = function(page) {
                                console.log(page)
                                fn(10, page)
                                $scope.lastPage = Math.ceil(amount / each);
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
                        } else {
                            $scope.yes = false;
                            $scope.none = true;
                        }
                    }

                })

                //接口函数
                function fn(wr, pp) {
                    $scope.up = true;
                    var str2 = JSON.stringify({
                        "product": {
                            "memberId": constanttest,
                            "channel": "PC",
                            "deviceNo": "2",
                            "functionCode": "EVALUATION_LIST",
                            "productId": $scope.product.productId,
                            "startRow": (pp - 1) * 10,
                            "pageSize": wr
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
                                    "requestType": "PRODUCTOTHERINFO",
                                    "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                                    //new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                                },
                                "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str2)
                            }
                        }
                    });
                    var md5_obj2 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj2);
                    commonHttp.myHttp(md5_obj2, data_obj2, function(data) {

                        $scope.plct = JSON.parse(data).product;
                        console.log($scope.plct)

                    });

                }

            }
        }

        //放大镜
        $scope.show = function() {
            var $e = angular.element;
            $e(".yid").show()
            $e(".zll-da").show()
        }

        $scope.hide = function() {
            var $e = angular.element;
            $e(".yid").hide()
            $e(".zll-da").hide()
        }
        //数量失去焦点
        $scope.setBlur = function(up) {
            //  console.log($scope.zll)
            if (!isNaN($scope.zll)) {
                if (parseInt(up) == parseFloat(up) && parseInt(up) > parseInt($scope.arr[0]['num'])) {
                    //$(target).val(Number($scope.arr[0].num)).trigger('change')    
                    $scope.zll = Number(up)
                    if (parseInt(up) > parseInt($scope.product.stockSize) && parseInt($scope.product.stockSize) > parseInt($scope.arr[0]['num'])) {
                        $scope.zll = $scope.product.stockSize
                    }
                    if (parseInt(up) > parseInt($scope.product.stockSize) && parseInt($scope.product.stockSize) < parseInt($scope.arr[0]['num'])) {
                        $scope.zll = Number($scope.arr[0].num)
                    }
                } else {
                    $scope.zll = Number($scope.arr[0].num)
                }
            } else {
                $scope.zll = Number($scope.arr[0].num)
                console.log('44')
            }
            nun()
        }
        //加减数量
        $scope.number = function(coun, p) {
            console.log(coun)
            //console.log($scope.count)
            var ty = Number(coun) + p
            // 传进来的count就是页面里赋值的$scope.count
            if (parseInt(ty) < parseInt($scope.arr[0]['num'])) {
                console.log(ty)
                ty = $scope.arr[0].num;
                console.log($scope.arr[0]['num'])
                alert('此物品起订量' + $scope.arr[0]['num'])
                $scope.zll = ty
                return;
                //  angular.element('.text-center').val($scope.count)
            }
            if (parseInt(ty) > parseInt($scope.product.stockSize) && parseInt($scope.product.stockSize) > parseInt($scope.arr[0]['num'])) {
                alert('此物品供应总量为' + $scope.product.stockSize)
                ty = $scope.product.stockSize;
            }
            if (parseInt(ty) > parseInt($scope.product.stockSize) && parseInt($scope.product.stockSize) < parseInt($scope.arr[0]['num'])) {
                ty = $scope.arr[0].num;
                console.log($scope.arr[0]['num'])
                alert('此物品起订量' + $scope.arr[0]['num'])
            }
            $scope.zll = ty

            nun()
        }

        function nun() {
            console.log($scope.zll)
            angular.forEach($scope.arr, function(n, i) {
                //console.log(i)
                if (parseInt($scope.arr[i].num) <= parseInt($scope.zll) && parseInt($scope.arr[i].num2) >= parseInt($scope.zll)) {
                    $scope.countPrice = $scope.arr[i].price * $scope.zll
                }

            })

        }
        //收藏商品
        $scope.addFavoritesTo = function() {
            console.log($scope.product.productId)
            if (constanttest == '') {
                $scope.warn = '您还没登录'
                $('#myModal').modal('show')
                return;
            }
            if ($scope.product.collect == 1) {
                return;
            }
            var str = JSON.stringify({
                "collect": {
                    "memberId": constanttest,
                    "channel": "PC",
                    "deviceNo": "2",
                    "functionCode": 'ADDPRODUCT',
                    "productId": $scope.product.productId
                }
            });
            // 按照指定格式传递的数据
            var data_obj = JSON.stringify({
                "packageList": {
                    "packages": {
                        "header": {
                            "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                            "comId": "CTO2O20170420",
                            "comSerial": "comSerial",
                            "from": "PAD",
                            "orderSerial": "orderId",
                            "requestType": "SAVEORDELPROCOLLECT",
                            "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                            // new Date().format('yyyy-MM-dd
                            // hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                        },
                        "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
                    }
                }
            });

            var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
            commonHttp.myHttp(md5_obj, data_obj, function(data, code, error) {

                if (code == 0) {
                    $scope.data = JSON.parse(data).collect;
                    if ($scope.data.status == 1) {
                        $scope.product.collect = 1;
                        $scope.warn = '恭喜您收藏成功'
                        $scope.lhurl = 'buyt.cgs01-wodeshoucang'
                        $scope.look = '查看我的收藏'
                        $('#myModal').modal('show')

                    }
                }
                console.log(data)

            })
        }
        //立即订购
        $scope.book = function() {
            if (constanttest == '') {
                $scope.warn = '您还没登录'
                $('#myModal').modal('show')
                return;
            } else {
                console.log($scope.product)
                angular.forEach($scope.arr, function(n, i) {
                    //console.log(i)
                    if (parseInt($scope.arr[i].num) <= parseInt($scope.zll) && parseInt($scope.arr[i].num2) >= parseInt($scope.zll)) {
                        //console.log(i)
                        $scope.arr[i].zid = true;
                    }

                })
                if (parseInt($scope.arr[0].num) >= parseInt($scope.product.stockSize)) {
                    alert('库存不足')
                    return;
                    //console.log(i)
                    $scope.arr[0].zid = true;
                }

                sessionStorage.placeorder = JSON.stringify([{
                    "cartId": '1212',
                    "shopId": $scope.product.productShop.shopId,
                    "shopName": $scope.product.productShop.shopName,
                    "sign": "SUBSCRIBENOW",
                    "detailList": [{
                        "shopId": $scope.product.productShop.shopId,
                        "stockSize": $scope.product.stockSize,
                        "productId": $scope.product.productId,
                        "distModel": $scope.product.distModel,
                        "skuId": $scope.product.skuList[0].skuId,
                        "productName": $scope.product.productName,
                        "imageUrl": $scope.product.imageUrls[0].imgUrl,
                        "salePrice": $scope.product.salePrice,
                        "subtotal": $scope.countPrice,
                        "count": $scope.zll,
                        "saleStatus": "1",
                        "priceList": $scope.arr
                    }]
                }])
                $state.go('index.order')
            }
        }
        //加入购物车
        $scope.addToCart = function() {
            console.log($scope.product.productId)
            if (constanttest == '') {
                $scope.warn = '您还没登录'
                $('#myModal').modal('show')
                return;
            }
            if (parseInt($scope.zll) > parseInt($scope.product.stockSize) || parseInt($scope.arr[0].num) > parseInt($scope.product.stockSize)) {
                $scope.warn = '库存不足(库存一共' + $scope.product.stockSize + '/' + $scope.product.unit + ')'
                //                  $scope.lhurl = 'index.guo'
                //                  $scope.look = '去采购车结算'
                $('#myModal').modal('show')
                return;

            }
            console.log(constanttest)
            var str = JSON.stringify({
                "cart": {
                    "memberId": constanttest,
                    "channel": "PC",
                    "deviceNo": "2",
                    "productIdList": [{
                        "productId": $scope.product.productId,
                        "skuId": $scope.product.skuList[0].skuId,
                        "count": $scope.zll
                    }]
                }
            });
            //$scope.product.skuList[0].skuId  $stateParams.id  $scope.count $scope.priceId
            // 按照指定格式传递的数据
            var data_obj = JSON.stringify({
                "packageList": {
                    "packages": {
                        "header": {
                            "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                            "comId": "CTO2O20170420",
                            "comSerial": "comSerial",
                            "from": "PAD",
                            "orderSerial": "orderId",
                            "requestType": "ADDPROTOCART",
                            "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                            // new Date().format('yyyy-MM-dd
                            // hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                        },
                        "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
                    }
                }
            });

            var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
            commonHttp.myHttp(md5_obj, data_obj, function(data, code, error) {
                if (code == 0) {
                    $scope.add = JSON.parse(data).cart;
                    if ($scope.add.status == 1) {
                        styui()

                        $scope.warn = '成功加入采购车'
                        $scope.lhurl = 'index.guo'
                        $scope.look = '去采购车结算'
                        $('#myModal').modal('show')
                    }
                }
                if (code == 1204) {
                    $scope.warn = '库存不足(库存一共' + $scope.product.stockSize + '/' + $scope.product.unit + ')'
                    $scope.lhurl = 'index.guo'
                    $scope.look = '去采购车结算'
                    $('#myModal').modal('show')
                }
                if (code == 1201) {
                    $scope.warn = '商品参数不符'
                    $('#myModal').modal('show')
                    //alert('商品参数不符')
                }
                if (code == 1202) {
                    $scope.warn = '商品id不能为空'
                    $('#myModal').modal('show')
                    //alert('商品id不能为空')
                }
                if (code == 1203) {
                    $scope.warn = '不能购买自己店铺商品'
                    $('#myModal').modal('show')
                    //  alert('不能购买自己店铺商品')
                }
                if (code == 1205) {
                    $scope.warn = '区间的价格未找到'
                    $('#myModal').modal('show')
                    //alert('区间的价格未找到')
                }
                if (code == 1206) {
                    $scope.warn = '购物车商品不存在'
                    $('#myModal').modal('show')
                    //alert('购物车商品不存在')
                }
                if (code == 1207) {
                    $scope.warn = '商品不存在'
                    $('#myModal').modal('show')
                    //  alert('商品不存在')
                }
                if (code == 1208) {
                    $scope.warn = '店铺不存在'
                    $('#myModal').modal('show')
                    //alert('店铺不存在')
                }
                if (code == 1209) {
                    $scope.warn = '购物车信息不存在'
                    $('#myModal').modal('show')
                    //alert('购物车信息不存在')
                }
                if (code == 1211) {
                    $scope.warn = '商品SKU不存在'
                    $('#myModal').modal('show')
                    //alert('商品SKU不存在')
                }
                if (code == 1212) {
                    $scope.warn = '订单物流信息不存在'
                    $('#myModal').modal('show')
                    //alert('订单物流信息不存在')
                }
                if (code == 1213) {
                    $scope.warn = '没有查询到该商品的价格区间'
                    $('#myModal').modal('show')
                    //alert('没有查询到该商品的价格区间')
                }
                if (code == 1214) {
                    $scope.warn = '发票id不能为空'
                    $('#myModal').modal('show')
                    //alert('发票id不能为空')
                }
                console.log(data);
            });
        }

        function styui() {


            var str2 = JSON.stringify({
                "cart": {
                    "memberId": constanttest,
                    "channel": "PC",
                    "deviceNo": "2"
                }
            });
            console.log(str2)
            // 按照指定格式传递的数据
            var data_obj2 = JSON.stringify({
                "packageList": {
                    "packages": {
                        "header": {
                            "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                            "comId": "CTO2O20170420",
                            "comSerial": "comSerial",
                            "from": "PAD",
                            "orderSerial": "orderId",
                            "requestType": "PRODUCTCARTLIST",
                            "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                            // new Date().format('yyyy-MM-dd
                            // hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                        },
                        "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str2)
                    }
                }
            });

            var md5_obj2 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj2);
            commonHttp.myHttp(md5_obj2, data_obj2, function(data, code) {
                if (code == 0) {
                    $scope.cart = JSON.parse(data).cart;
                    console.log($scope.uiop);

                    if ($scope.cart.count == '') {
                        $scope.cart.count = 0
                        $scope.uiop = 0
                        $scope.$emit('uiop', $scope.uiop);
                    } else {
                        $scope.uiop = $scope.cart.count
                        $scope.$emit('uiop', $scope.uiop);
                        if (parseFloat($scope.cart.count) > parseFloat(99)) {
                            $scope.uiop = '99+'
                            $scope.$emit('uiop', $scope.uiop);
                        }
                    }
                }
                //      console.log(data);


            });
        }
    }]).controller('shopCar', ['$scope', '$rootScope', '$http', '$state', 'commonHttp', '$document', '$interval', function($scope, $rootScope, $http, $state, commonHttp, $document, $interval) {
        if (localStorage.id) {
            //console.log('7777')
            var constanttest = localStorage.id
        } else {
            localStorage.turl = location.href
            $state.go('login')
            return;
        }
        var $e = angular.element;
        var str = JSON.stringify({
            "cart": {
                "memberId": constanttest,
                "channel": "PC",
                "deviceNo": "2",
            }
        });
        $('body,html').animate({ scrollTop: 0 }, 0);
        //console.log(str)
        // 按照指定格式传递的数据
        var data_obj = JSON.stringify({
            "packageList": {
                "packages": {
                    "header": {
                        "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                        "comId": "CTO2O20170420",
                        "comSerial": "comSerial",
                        "from": "PAD",
                        "orderSerial": "orderId",
                        "requestType": "PRODUCTCARTLIST",
                        "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                        // new Date().format('yyyy-MM-dd
                        // hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                    },
                    "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
                }
            }
        });

        var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
        commonHttp.myHttp(md5_obj, data_obj, function(data, code, error) {
            //  console.log(data);
            $scope.cart = JSON.parse(data).cart;
            console.log(JSON.parse(data));
            if ($scope.cart.count == '') {
                $scope.cart.count = 0
                $scope.uiop = 0
                $scope.$emit('uiop', $scope.uiop);
            } else {
                $scope.uiop = $scope.cart.count
                $scope.$emit('uiop', $scope.uiop);
                if (parseFloat($scope.cart.count) > parseFloat(99)) {
                    $scope.uiop = '99+'
                    $scope.$emit('uiop', $scope.uiop);
                }
            }


            //$scope.$broadcast('cart', $scope.cart);
            wop()
            $scope.$watch('toggle.now', function() {
                if ($scope.toggle.now)
                    footview(706);
            });

        });
        $scope.toggle = {
            now: false
        };

        $scope.reduce = function(cur, wp, ct, n) {
            //  console.log(cur, wp, ct, n)
            cur = Number(cur) + Number(n)
            //      console.log(wp.priceList[0].num)
            if (parseFloat(cur) < parseFloat(wp.priceList[0].num)) {
                cur = wp.priceList[0].num;
                alert('此物品最低起订量为' + wp.priceList[0].num)
                return;
            }
            if (parseFloat(cur) > parseFloat(wp.stockSize)) {
                cur = Number(wp.stockSize);
                alert('此物品库存量共' + wp.stockSize)

            }
            //return;
            var strj = JSON.stringify({
                "cart": {
                    "memberId": constanttest,
                    "channel": "PC",
                    "deviceNo": "2",
                    "cartId": ct.shopId,
                    "productIdList": [{
                        "productId": wp.productId,
                        "skuId": wp.skuId,
                        "count": cur
                    }]
                }
            });
            // 按照指定格式传递的数据
            var data_obj = JSON.stringify({
                "packageList": {
                    "packages": {
                        "header": {
                            "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                            "comId": "CTO2O20170420",
                            "comSerial": "comSerial",
                            "from": "PAD",
                            "orderSerial": "orderId",
                            "requestType": "UPDATEPROTOCART",
                            "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                            // new Date().format('yyyy-MM-dd
                            // hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                        },
                        "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', strj)
                    }
                }
            });
            console.log(strj)
            var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
            commonHttp.myHttp(md5_obj, data_obj, function(data, code, error) {
                if (code == 0) {
                    $scope.cart = JSON.parse(data).cart;
                    console.log($scope.cart)

                    //$scope.$broadcast('cart', $scope.cart);
                    wop()
                }
                if (code == 1201) {
                    alert('商品参数不符')
                }
                if (code == 1202) {
                    alert('商品id不能为空')
                }
                if (code == 1203) {
                    alert('不能购买自己店铺商品')
                }
                if (code == 1205) {
                    alert('区间的价格未找到')
                }
                if (code == 1206) {
                    alert('购物车商品不存在')
                }
                if (code == 1207) {
                    alert('商品不存在')
                }
                if (code == 1208) {
                    alert('店铺不存在')
                }
                if (code == 1209) {
                    alert('购物车信息不存在')
                }
                if (code == 1211) {
                    alert('商品SKU不存在')
                }
                if (code == 1212) {
                    alert('订单物流信息不存在')
                }
                if (code == 1213) {
                    alert('没有查询到该商品的价格区间')
                }
                if (code == 1214) {
                    alert('发票id不能为空')
                }
                //$scope.$broadcast('cart', $scope.cart);

            })

        }
        $scope.uop = function(index, pindex, n) {
            console.log(index, n)
            if (n && Number(n) != 0) {
                $scope.arr[pindex].detailList[index].count = n.replace(/\D/g, '')
            } else {
                $scope.arr[pindex].detailList[index].count = $scope.arr[pindex].detailList[index].priceList[0].num
            }
        }
        //失去焦点
        $scope.lose = function(cur, wp, ct) {
            console.log(cur, wp, ct)
            console.log(wp.priceList[0].num)
            if (cur == '') {
                cur = parseFloat(wp.priceList[0].num)
            }
            if (parseFloat(cur) < parseFloat(wp.priceList[0].num)) {
                cur = wp.priceList[0].num;
                alert('此物品最低起订量为' + wp.priceList[0].num)
            }
            if (parseFloat(cur) > parseFloat(wp.stockSize) && parseFloat(wp.stockSize) > parseFloat(wp.priceList[0].num)) {
                cur = Number(wp.stockSize);
                alert('此物品库存量共' + wp.stockSize)
            }
            if (parseFloat(cur) > parseFloat(wp.stockSize) && parseFloat(wp.stockSize) < parseFloat(wp.priceList[0].num)) {
                cur = wp.priceList[0].num;
                alert('此物品库存量共' + wp.stockSize)
            }
            console.log(cur)
            var strj = JSON.stringify({
                "cart": {
                    "memberId": constanttest,
                    "channel": "PC",
                    "deviceNo": "2",
                    "cartId": ct.shopId,
                    "productIdList": [{
                        "productId": wp.productId,
                        "skuId": wp.skuId,
                        "count": cur
                    }]
                }
            });
            // 按照指定格式传递的数据
            var data_obj = JSON.stringify({
                "packageList": {
                    "packages": {
                        "header": {
                            "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                            "comId": "CTO2O20170420",
                            "comSerial": "comSerial",
                            "from": "PAD",
                            "orderSerial": "orderId",
                            "requestType": "UPDATEPROTOCART",
                            "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                            // new Date().format('yyyy-MM-dd
                            // hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                        },
                        "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', strj)
                    }
                }
            });
            console.log(strj)
            var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
            commonHttp.myHttp(md5_obj, data_obj, function(data, code, error) {
                if (code == 0) {
                    $scope.cart = JSON.parse(data).cart;
                    console.log($scope.cart)

                    //$scope.$broadcast('cart', $scope.cart);
                    wop()
                }

                if (code == 1201) {
                    alert('商品参数不符')
                }
                if (code == 1202) {
                    alert('商品id不能为空')
                }
                if (code == 1203) {
                    alert('不能购买自己店铺商品')
                }
                if (code == 1205) {
                    alert('区间的价格未找到')
                }
                if (code == 1206) {
                    alert('购物车商品不存在')
                }
                if (code == 1207) {
                    alert('商品不存在')
                }
                if (code == 1208) {
                    alert('店铺不存在')
                }
                if (code == 1209) {
                    alert('购物车信息不存在')
                }
                if (code == 1211) {
                    alert('商品SKU不存在')
                }
                if (code == 1212) {
                    alert('订单物流信息不存在')
                }
                if (code == 1213) {
                    alert('没有查询到该商品的价格区间')
                }
                if (code == 1214) {
                    alert('发票id不能为空')
                }

            })

        }
        //确认下单
        $scope.place = function() {
            var $e = angular.element
            var znum = 0;
            var zprice = 0;
            var pp = []
            $e(".goodsCheck").each(function() {
                if ($e(this).is(":checked")) {
                    var cart = JSON.parse($e(this).next("input").attr("shopm"))
                    var merchandises = $e(this).next("input").attr("merchandise")
                    pp.push({
                        "cartId": cart.cartId,
                        "shopId": cart.shopId,
                        "shopName": cart.shopName,
                        "detailList": JSON.parse(merchandises)
                    })

                    znum = znum + 1
                    //                  var pricew = parseFloat($(this).parents(".wupin").find(".price_total").text());
                    //                  var totalz = Number(pricew);
                    //                  zprice += Number(totalz);
                }

            })
            console.log(pp)

            if (znum == 0) {
                alert('请选择您要下单得商品')
                return;
            }
            var hash = {};
            var i = 0;
            var res = [];
            pp.forEach(function(item) {
                //console.log(item)
                var name = item.shopId;
                hash[name] ? res[hash[name] - 1].detailList.push(item.detailList) : hash[name] = ++i && res.push({
                    cartId: item.cartId,
                    shopId: name,
                    shopName: item.shopName,
                    detailList: [item.detailList],
                    sign: "CART"

                })

            });
            sessionStorage.placeorder = JSON.stringify(res)
            console.log(res)
            $state.go('index.order')
            //  console.log(znum)
        }

        $scope.tank = false
        var shopid;
        var commodity;
        var index;
        var prindex;
        //删除商品
        $scope.remove = function(wq, ct, index, n) {
            //console.log(wq,ct,index,n)
            $scope.tank = true;
            shopid = ct;
            commodity = wq;
            index = index;
            prindex = n
            //取消
            $scope.qx = function(wq) {
                $scope.tank = false;
            }
            //确认删除
            $scope.del = function() {
                console.log(commodity, shopid, index, prindex)
                console.log($scope.arr[prindex].detailList.length)
                var strj = JSON.stringify({
                    "cart": {
                        "memberId": constanttest,
                        "channel": "PC",
                        "deviceNo": "2",
                        "cartId": shopid.shopId,
                        "clearflag": false,
                        "productIdList": [{
                            "productId": commodity.productId,
                            "skuId": commodity.skuId
                        }]
                    }
                });
                // 按照指定格式传递的数据
                var data_obj = JSON.stringify({
                    "packageList": {
                        "packages": {
                            "header": {
                                "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                                "comId": "CTO2O20170420",
                                "comSerial": "comSerial",
                                "from": "PAD",
                                "orderSerial": "orderId",
                                "requestType": "DELETEPROTOCART",
                                "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                                // new Date().format('yyyy-MM-dd
                                // hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                            },
                            "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', strj)
                        }
                    }
                });
                console.log(strj)
                var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
                commonHttp.myHttp(md5_obj, data_obj, function(data, code, error) {
                    if (code == 0) {
                        $scope.del = JSON.parse(data).cart;
                        console.log($scope.del)
                        if ($scope.arr[prindex].detailList.length <= 1) {
                            $scope.tank = false;
                            $scope.arr.splice(prindex, 1)
                            $scope.cart.count--

                        } else {
                            $scope.tank = false;
                            $scope.arr[prindex].detailList.splice(index, 1)
                            $scope.cart.count--
                        }
                        if ($scope.cart.count == 0) {
                            $scope.cart.count = 0
                            $scope.uiop = 0
                            $scope.$emit('uiop', $scope.uiop);
                        } else {
                            $scope.uiop = $scope.cart.count
                            $scope.$emit('uiop', $scope.uiop);
                            if (parseFloat($scope.cart.count) > parseFloat(99)) {
                                $scope.uiop = '99+'
                                $scope.$emit('uiop', $scope.uiop);
                            }
                        }

                    }
                    if (code == 1201) {
                        alert('商品参数不符')
                    }
                    if (code == 1202) {
                        alert('商品id不能为空')
                    }
                    if (code == 1203) {
                        alert('不能购买自己店铺商品')
                    }
                    if (code == 1205) {
                        alert('区间的价格未找到')
                    }
                    if (code == 1206) {
                        alert('购物车商品不存在')
                    }
                    if (code == 1207) {
                        alert('商品不存在')
                    }
                    if (code == 1208) {
                        alert('店铺不存在')
                    }
                    if (code == 1209) {
                        alert('购物车信息不存在')
                    }
                    if (code == 1211) {
                        alert('商品SKU不存在')
                    }
                    if (code == 1212) {
                        alert('订单物流信息不存在')
                    }
                    if (code == 1213) {
                        alert('没有查询到该商品的价格区间')
                    }
                    if (code == 1214) {
                        alert('发票id不能为空')
                    }

                })
            }
        }

        function wop() {

            $scope.arr = $scope.cart.shopList;
            console.log($scope.arr)
            angular.forEach($scope.cart.shopList, function(n, i) {
                angular.forEach($scope.cart.shopList[i].detailList, function(n, w) {
                    angular.forEach($scope.cart.shopList[i].detailList[w].priceList, function(item, q) {
                        // var obj= {};
                        //$scope.arr[i].detailList[w].priceList[q].pri= Number(item.price);

                        if (item.changeRule.indexOf('-') == -1) {
                            $scope.arr[i].detailList[w].priceList[q].num = Number(item.changeRule.slice(1));
                            $scope.arr[i].detailList[w].priceList[q].num2 = Number($scope.cart.shopList[i].detailList[w].stockSize);
                        } else {
                            $scope.arr[i].detailList[w].priceList[q].num = Number(item.changeRule.split('-')[0])
                            $scope.arr[i].detailList[w].priceList[q].num2 = Number(item.changeRule.split('-')[1])
                        }

                    })

                })

            })
            angular.forEach($scope.arr, function(n, i) {
                angular.forEach($scope.arr[i].detailList, function(n, w) {
                    //                  if(parseInt($scope.arr[i].detailList[w].count)>parseInt($scope.arr[i].detailList[w].stockSize)){
                    //                      $scope.arr[i].detailList[w].lp=true;
                    //                  }
                    angular.forEach($scope.arr[i].detailList[w].priceList, function(item, q) {

                        if (parseInt($scope.arr[i].detailList[w].priceList[q].num) <= parseInt($scope.arr[i].detailList[w].count) && parseInt($scope.arr[i].detailList[w].priceList[q].num2) >= parseInt($scope.arr[i].detailList[w].count)) {
                            //  console.log(q)
                            $scope.arr[i].detailList[w].priceList[q].zid = true
                        } else {
                            if (parseInt($scope.arr[i].detailList[w].priceList[0].num) > parseInt($scope.arr[i].detailList[w].stockSize)) {
                                $scope.arr[i].detailList[w].count = parseInt($scope.arr[i].detailList[w].priceList[0].num)
                                $scope.arr[i].detailList[w].priceList[0].zid = true;
                                $scope.arr[i].detailList[w].subtotal = $scope.arr[i].detailList[w].count * $scope.arr[i].detailList[w].priceList[0].price
                            }
                            if (parseInt($scope.arr[i].detailList[w].count) > parseInt($scope.arr[i].detailList[w].stockSize)) {
                                $scope.arr[i].detailList[w].count = parseInt($scope.arr[i].detailList[w].stockSize)
                                $scope.arr[i].detailList[w].priceList[$scope.arr[i].detailList[w].priceList.length - 1].zid = true;
                                $scope.arr[i].detailList[w].subtotal = parseFloat($scope.arr[i].detailList[w].count * $scope.arr[i].detailList[w].priceList[$scope.arr[i].detailList[w].priceList.length - 1].price).toFixed(2)
                            }
                        }

                    })
                })
            })
            console.log($scope.arr)
            //  console.log($scope.cart)
        }

        /*
         * $scope.delete=function(id){ } $scope.modify=function (){ }
         */

    }]).controller('sclb', ['$scope', '$stateParams', '$window', '$timeout', 'commonHttp', '$location', '$state',
        function($scope, $stateParams, $window, $timeout, commonHttp, $location, $state) {
         var $e = angular.element;
            var vm = this;
            $scope.rty = 0;



            $scope.$on("subs", function(a, b) {
                $scope.subs = b
                console.log(b)
            })

            $scope.gd = function() {
                $e('.xzk').css({ "display": "block" })
                $e('.lb-z-sp ul').css({ "overflow": "auto" })
            }

            $stateParams.Keyword ? $scope.word = $stateParams.Keyword : $scope.word = $stateParams.word;
            $scope.code = $stateParams.code;
            console.log($scope.code)
            console.log($scope.word)
            //类别显示/隐藏
            $scope.showCategorie = 0;
            if ($scope.code == undefined || $scope.code.length >= 8) {
                $scope.showCategorie = 1;
            }
            console.log($stateParams.Keyword)

            var valueObj = {
                'propCode': '',
                'brandIdList': '',
                'price': '',
                'priceFlag': ''
            }

            console.log(valueObj)
            $scope.sclb = function(valueObj) {
                console.log(valueObj)
                if (valueObj == undefined) {
                    var str1 = JSON.stringify({
                        "search": {
                            "memberId": "1",
                            "channel": "1",
                            "deviceNo": "2",
                            "functionCode": "PROFORMSOLR",
                            "startRow": 0,
                            "pageSize": 8,
                            "keyWord": $stateParams.Keyword,
                            "categoryCode": $scope.code,
                            "propCode": '',
                            "brandIdList": '',
                            "price": '',
                            "priceFlag": ''
                        }
                    });
                    console.log(str1)
                    var data_obj1 = JSON.stringify({
                        "packageList": {
                            "packages": {
                                "header": {
                                    "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                                    "comId": "CTO2O20170420",
                                    "comSerial": "comSerial",
                                    "from": "PAD",
                                    "orderSerial": "orderId",
                                    "requestType": "PROLISTFORMSOLR",
                                    "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                                    // new Date().format('yyyy-MM-dd
                                    // hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                                },
                                "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str1)
                            }
                        }
                    });
                    console.log(data_obj1)
                    var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj1);
                    commonHttp.myHttp(md5_obj, data_obj1, function(data) {

                        console.log(data);
                        $scope.productList = JSON.parse(data).search.productList;
                        $scope.brandList = JSON.parse(data).search.brandList;
                        $scope.specList = JSON.parse(data).search.specList;
                        $scope.categoriesList = JSON.parse(data).search.categories;
                        $scope.total = Math.ceil(JSON.parse(data).search.totalSzie / 8);
                        console.log($scope.total)
                        page($scope.total);

                    });
                } else {
                    var str1 = JSON.stringify({
                        "search": {
                            "memberId": "1",
                            "channel": "1",
                            "deviceNo": "2",
                            "functionCode": "PROFORMSOLR",
                            "startRow": 0,
                            "pageSize": 8,
                            "keyWord": $stateParams.Keyword,
                            "categoryCode": $scope.code,
                            "propCode": valueObj.propCode,
                            "brandIdList": valueObj.brandIdList,
                            "price": valueObj.price,
                            "priceFlag": valueObj.priceFlag
                        }
                    });

                    console.log(str1)
                    // 按照指定格式传递的数据
                    var data_obj1 = JSON.stringify({
                        "packageList": {
                            "packages": {
                                "header": {
                                    "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                                    "comId": "CTO2O20170420",
                                    "comSerial": "comSerial",
                                    "from": "PAD",
                                    "orderSerial": "orderId",
                                    "requestType": "PROLISTFORMSOLR",
                                    "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                                    // new Date().format('yyyy-MM-dd
                                    // hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                                },
                                "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str1)
                            }
                        }
                    });
                    console.log(data_obj1)
                    var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj1);
                    commonHttp.myHttp(md5_obj, data_obj1, function(data) {
                        // console.log(data);
                        console.log(valueObj)

                        $scope.productList = JSON.parse(data).search.productList;
                        $scope.brandList = JSON.parse(data).search.brandList;
                        $scope.specList = JSON.parse(data).search.specList;
                        $scope.categoriesList = JSON.parse(data).search.categories;
                        $scope.total = Math.ceil(JSON.parse(data).search.totalSzie / 8);
                        console.log($scope.total)
                        page($scope.total, valueObj);

                    });
                }
            }
            $scope.sclb();


            //品牌筛选
            $scope.filterList = [];
            $scope.trademark = function(brand, e) {
                $scope.showFilter = 1;

                console.log(e)
                console.log(valueObj)
                valueObj.price = '';
                valueObj.propCode = '';
                valueObj.priceFlag = '';
                $scope.selPage = 1;
                var $e = angular.element;
                var arr = [];
                var brandName = [];
                $scope.filterList = [];

                $e('.ckb').css({ "display": "none" });
                $e('.xzk').css({ "display": "none" });
                angular.element('.lb-z-k2').css({ "display": "block" });

                if (brand) {
                    arr.push(brand.brandId)
                    brandName.push(brand.brandName)
                }
                angular.forEach($e('.ckb'), function(item, index) {
                    if ($e(item).prop('checked')) {
                        arr.push($e(item).val());
                        brandName.push($e(item).attr('name'));
                    }
                    console.log(arr);
                })
                // if (!arr.length) return false;
                console.log(arr)


                valueObj.brandIdList = arr;
                console.log(valueObj)

                $scope.sclb(valueObj);


                var arrString = brandName.join(',')

                if (brandName.length == 0) {
                    $scope.trademarkObj.title = '';
                }
                $scope.trademarkObj = {
                    'id': 1,
                    'title': '品牌',
                    'name': arrString,
                    'brandList': arr
                }
                $scope.filterList.push($scope.trademarkObj);
                console.log($scope.filterList)

                // return true;
                // var url = $state.href('index.brand',{code:$stateParams.code,word:$scope.word,brand:arr});
                // console.log(url)
                // $window.open(url,'_blank');

            } //end trademark


            //类别


            $scope.categorie = function(categories) {

                console.log($scope.categoriesList)
                $scope.code = categories.code;
                $scope.word = categories.name;
                if ($scope.code.length >= 8) {
                    $scope.showCategorie = 1;
                }
                console.log($scope.code)

                $scope.selPage = 1;
                $scope.sclb(valueObj)

            } //end advancedFilter
            //高级筛选
            $scope.advancedFilter = function(propCode, propTitle, propName) {
                $scope.selPage = 1;
                valueObj.propCode = propCode;
                $scope.sclb(valueObj)
                $scope.showFilter = 2;



                $scope.propObj = {
                    'propCode': propCode,
                    'title': propTitle,
                    'name': propName
                }
                console.log($scope.propObj)
                $scope.filterList.push($scope.propObj);
                console.log($scope.filterList)

            } //end advancedFilter

            //单项删除条件
            $scope.deleteFilter = function(i, options) {
                $scope.showFilter = 1;
                console.log(valueObj)
                console.log(options)
                console.log(options.brandList == valueObj.brandIdList)
                console.log(options.brandList)
                console.log(options.name)
                if (options.brandList == valueObj.brandIdList) {
                    valueObj.brandIdList = '';
                }

                if (options.propCode == valueObj.propCode) {
                    valueObj.propCode = '';
                }
                $scope.filterList.splice(i, 1)
                console.log(valueObj)
                $scope.sclb(valueObj)
            }

            //全部删除条件

            $scope.deleteAllFilter = function() {
                $scope.showFilter = 1; //2为隐藏
                $scope.rty = 3;

                $scope.filterList = [];
                valueObj.propCode = '';
                valueObj.brandIdList = '';
                valueObj.price = '';
                valueObj.priceFlag = '';

                $scope.sclb(valueObj)
            }



            //价格正序倒序
            $scope.flag = true;
            $scope.priceUpDown = function() {
                $scope.rty = 1;

                $scope.selPage = 1;

                $scope.flag = !$scope.flag;
                $scope.flag ? $scope.priceflag = 'DESC' : $scope.priceflag = 'ASC';

                valueObj.priceFlag = $scope.priceflag;
                $scope.sclb(valueObj)
                console.log($scope.priceflag)

            } //end priceUpDown

            //综合排序
            $scope.zonghe = function() {
                $scope.selPage = 1;
                $scope.rty = 2;

                valueObj.price = '';
                valueObj.priceFlag = '';
                $scope.sclb(valueObj);

            }


            $scope.focus = function() {
                $e('p').show();
            }
            vm.price = {
                'low': '',
                'high': '',
            }
            $scope.priceLowHigh = function(low, high) {
                $e('p').hide();
                $scope.selPage = 1;

                valueObj.price = low + '-' + high;
                $scope.sclb(valueObj)
            } // end pricLowHigh



            $scope.recommend = function() {
                var mall = JSON.stringify({
                    "mallIndex": {
                        "memberId": "1",
                        "channel": "1",
                        "deviceNo": "2"
                    }
                });
                // 按照指定格式传递的数据
                var data_obj2 = JSON.stringify({
                    "packageList": {
                        "packages": {
                            "header": {
                                "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                                "comId": "CTO2O20170420",
                                "comSerial": "comSerial",
                                "from": "PAD",
                                "orderSerial": "orderId",
                                "requestType": "STOREINDEX",
                                "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                                // new Date().format('yyyy-MM-dd
                                // hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                            },
                            "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', mall)
                        }
                    }
                });
                var md5_obj3 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj2);
                commonHttp.myHttp(md5_obj3, data_obj2, function(data) {
                    // console.log(data);
                    var data = JSON.parse(data);

                    // 热销推荐和优品推荐数据
                    $scope.recommend = data.mallIndex.recommendList[0];
                    //    console.log($scope.recommend)
                })
            } //end recommend
            $scope.recommend();

            $scope.selPage = 1;

            //分页
            function page(totalSize, valueObj) {
                console.log(valueObj)
                $scope.pageAll = [];

                for (var i = 1; i <= totalSize; i++) {
                    $scope.pageAll.push(i)
                }
                console.log($scope.pageAll.length)

                //分页总数
                $scope.pageSize = 5;

                //分页组数
                $scope.pages = $scope.pageAll.length / $scope.pageSize;
                console.log($scope.pages)
                //新的分页组数（如果总数不够  就按照算出来的）
                $scope.newPages = $scope.pages >= 1 ? 5 : $scope.pageAll.length;
                console.log($scope.newPages)
                //每组的页码
                $scope.pageList = [];

                for (var i = 0; i < $scope.newPages; i++) {
                    $scope.pageList.push(i + 1); //将页码加入数组

                } //end for
                console.log($scope.pageList)
                $scope.selectPage = function(page, valueObj) {
                    //不能小于1大于最大
                    console.log(valueObj)
                    if (page < 1 || page > $scope.pageAll.length) return;
                    //最多显示分页数5

                    if (page > 2) { // 每次点击都会刷新每组页码里的页码数字
                        //因为只显示5个页数，大于2页开始分页转换

                        var newpageList = [];
                        for (var i = (page - 3); i < ((page + 2) > $scope.newPages ? page : $scope.newPages); i++) {
                            newpageList.push(i + 1);

                        }
                        $scope.pageList = newpageList;

                    }

                    $scope.selPage = page;



                    console.log("选择的页：" + page);
                    console.log($scope.pageList)
                    if (valueObj == undefined) {
                        var fenye = JSON.stringify({
                            "search": {
                                "memberId": "1",
                                "channel": "1",
                                "deviceNo": "2",
                                "functionCode": "PROFORMSOLR",
                                "startRow": ($scope.selPage - 1) * 8,
                                "pageSize": 8,
                                "keyWord": $stateParams.Keyword,
                                "categoryCode": $stateParams.code,
                                "propCode": '',
                                "brandIdList": '',
                                "price": '',
                                "priceFlag": ''



                            }
                        });
                    } else {
                        var fenye = JSON.stringify({
                            "search": {
                                "memberId": "1",
                                "channel": "1",
                                "deviceNo": "2",
                                "functionCode": "PROFORMSOLR",
                                "startRow": ($scope.selPage - 1) * 8,
                                "pageSize": 8,
                                "keyWord": $stateParams.Keyword,
                                "categoryCode": $stateParams.code,
                                "propCode": valueObj.propCode,
                                "brandIdList": valueObj.brandIdList,
                                "price": valueObj.price,
                                "priceFlag": valueObj.priceFlag



                            }
                        });
                    }


                    console.log(fenye)
                    // 按照指定格式传递的数据
                    var data_objfenye = JSON.stringify({
                        "packageList": {
                            "packages": {
                                "header": {
                                    "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                                    "comId": "CTO2O20170420",
                                    "comSerial": "comSerial",
                                    "from": "PAD",
                                    "orderSerial": "orderId",
                                    "requestType": "PROLISTFORMSOLR",
                                    "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                                    // new Date().format('yyyy-MM-dd
                                    // hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                                },
                                "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', fenye)
                            }
                        }
                    });
                    console.log(data_objfenye)
                    var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_objfenye);
                    commonHttp.myHttp(md5_obj, data_objfenye, function(data) {
                        // console.log(data);
                        $scope.productList = JSON.parse(data).search.productList;
                        $scope.brandList = JSON.parse(data).search.brandList;
                        $scope.specList = JSON.parse(data).search.specList;
                        // console.log(data);
                        $scope.total = Math.ceil(JSON.parse(data).search.totalSzie / 8);
                    });

                    console.log($scope.selPage)

                } //end selected
            } //end page
            page();


            //下一页
            $scope.Next = function() {

                console.log($scope.selPage)
                $scope.selectPage($scope.selPage + 1, valueObj);

            };

            $scope.Previous = function() {
                console.log($scope.selPage)

                $scope.selectPage($scope.selPage - 1, valueObj);

            };

            $scope.PageGo = function() {
                $scope.selectPage(parseInt($scope.selPage));

            };

            $scope.active = function(page) {
                if ($scope.selPage == page) {
                    return true;
                }
            }





        }
    ]).controller('myCtrl', ['$scope', 'commonHttp', function($scope, commonHttp) {
        $scope.$on('cart', function(e, cart) {
            $scope.cart = cart;
            $scope.cart.selectAll = false;
            $scope.cart.select = false;
            //          $scope.total=[];
            $scope.obj = {};
            angular.forEach($scope.cart.shopList, function(item, index) {
                item.selectAll = false;
                item.select = false;
                $scope.obj[index] = 0;
                angular.forEach(item.detailList, function(data, dataIndex) {
                    data.isSelected = false;
                    $scope.obj[index] += Number(data.subtotal);
                })
            });
            //          console.log($scope.obj);
        });
        // 对于对象进行操作的时候(点击)，会执行funcChange
        // 判断对象数组中isSelected 是否为 true或false，在决定select是否为true
        $scope.changeAll = function(list, selectAll, cart) { // 全选/取消全选

            if (arguments.length === 3 && "shopList" in cart) {
                angular.forEach(list, function(v, k) {
                    v.selectAll = selectAll;
                })
            } else if (arguments.length === 2) {
                angular.forEach(list, function(v, k) {
                    v.isSelected = selectAll;
                })
            }
        };
        $scope.funcChange = function(list, ct) { // 当所有都选中时
            // console.log(ct);
            ct.select = true;
            angular.forEach(list, function(v, k) {
                ct.select = ct.select && v.isSelected;
            });
        };

        $scope.priceArr = function(wp) {
            var arr = [];
            angular.forEach(wp.priceList, function(item, index) {
                var obj = {};
                obj['rule'] = Number(item.changeRule.slice(1));
                obj['id'] = Number(item.id);
                obj['price'] = Number(item.price);
                arr.push(obj);
            });
            arr.sort(function(a, b) {
                return a.rule - b.rule;
            })
            return arr;
        }
        //减少数量     500   1000   1500
        $scope.reduce = function(count, wp, ct) {
            var arr = $scope.priceArr(wp);
            count = Number(count);
            if (count === $scope.oldCount) {
                return;
            }
            if (count <= arr[0]['rule'] + 1) {
                count = wp.count = arr[0]['rule'] + 1;
                wp.subtotal = arr[0]['price'] * count;
            } else {
                count = wp.count = count - 1;
            }
            var id = null;
            angular.forEach(arr, function(item, index) {
                if (count > arr[0]['rule']) {
                    if (item.rule > wp.count && index != 0) {
                        wp.subtotal = arr[index - 1]['price'] * count;
                        id = arr[index - 1]['id'];
                    } else if (count > arr[0]['rule'] && count < arr[1]['rule']) {
                        wp.subtotal = arr[0]['price'] * count;
                        id = arr[0]['id'];
                    } else if (count > arr[arr.length - 1]) {
                        count = Number(wp.stockSize);
                        wp.subtotal = arr[arr.length - 1]['price'] * count;
                        id = arr[arr.length - 1]['id'];
                    }
                }
            })

            angular.forEach($scope.cart.shopList, function(item, index) {
                if (item === ct) {
                    angular.forEach(item.detailList, function(data) {
                        $scope.obj[index] += Number(data.subtotal);
                    });
                    return;
                }
            });
            $scope.oldCount = Number(count);
            var str = JSON.stringify({
                "cart": {
                    "memberId": "1",
                    "channel": "1",
                    "deviceNo": "2",
                    "cartId": ct.cartId,
                    "productIdList": [{
                        "productId": wp.productId,
                        "skuId": wp.skuId,
                        "count": count,
                        "priceId": id
                    }]
                }
            });
            // 按照指定格式传递的数据
            var data_obj = JSON.stringify({
                "packageList": {
                    "packages": {
                        "header": {
                            "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                            "comId": "CTO2O20170420",
                            "comSerial": "comSerial",
                            "from": "PAD",
                            "orderSerial": "orderId",
                            "requestType": "UPDATEPROTOCART",
                            "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                            // new Date().format('yyyy-MM-dd
                            // hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                        },
                        "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
                    }
                }
            });

            var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
            commonHttp.myHttp(md5_obj, data_obj, function(data) {
                console.log(data);
                //          $scope.cart = JSON.parse(data).cart;

            });

        }
        //增加数量
        $scope.increase = function(count, wp, ct) {
            var arr = $scope.priceArr(wp);
            count = Number(count);
            if (count === $scope.oldCount) {
                return;
            }
            if (count >= Number(wp.stockSize)) {
                count = wp.count = Number(wp.stockSize);
                wp.subtotal = arr[arr.length - 1]['price'] * count;
            }
            /*else if(count < arr[0]['rule']) {
                count=wp.count = arr[0]['rule'];
                wp.subtotal = arr[0]['price'] * arr[0]['rule'];
            }*/
            else {
                count = wp.count = count + 1;
                //              wp.subtotal=arr[0]['price']*arr[0]['rule'];
            }
            var id = null;
            angular.forEach(arr, function(item, index) {
                if (count > arr[0]['rule']) {
                    if (item.rule > count && index != 0) {
                        alert('请输入和法值');
                        wp.subtotal = arr[index - 1]['price'] * count;
                        id = arr[index - 1]['id'];
                    } else if (count > arr[0]['rule'] && count < arr[1]['rule']) {
                        alert('请输入和法值');
                        wp.subtotal = arr[0]['price'] * count;
                        id = arr[0]['id'];
                    } else if (count > arr[arr.length - 1]) {
                        count = Number(wp.stockSize);
                        wp.subtotal = arr[arr.length - 1]['price'] * count;
                        d = arr[arr.length - 1]['id'];
                    }
                }

            })

            angular.forEach($scope.cart.shopList, function(item, index) {
                if (item === ct) {
                    //                  console.log(1);
                    angular.forEach(item.detailList, function(data, ix) {
                        $scope.obj[index] += Number(data.subtotal);
                    });
                    return;
                }
            });

            $scope.oldCount = Number(count);
            var str = JSON.stringify({
                "cart": {
                    "memberId": "1",
                    "channel": "1",
                    "deviceNo": "2",
                    "cartId": ct.cartId,
                    "productIdList": [{
                        "productId": wp.productId,
                        "skuId": wp.skuId,
                        "count": count,
                        "priceId": 1
                    }]
                }
            });
            // 按照指定格式传递的数据
            var data_obj = JSON.stringify({
                "packageList": {
                    "packages": {
                        "header": {
                            "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                            "comId": "CTO2O20170420",
                            "comSerial": "comSerial",
                            "from": "PAD",
                            "orderSerial": "orderId",
                            "requestType": "UPDATEPROTOCART",
                            "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                            // new Date().format('yyyy-MM-dd
                            // hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                        },
                        "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
                    }
                }
            });

            var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
            commonHttp.myHttp(md5_obj, data_obj, function(data) {
                console.log(data);

            });

        }
        //遍历出被选中的商品
        $scope.checkStatus = function(shop) {
            var arr = [];
            angular.forEach(shop.detailList, function(v, m) {
                if (v.isSelected) {
                    arr.push(v);
                }
            })
            return arr;
        }
        $scope.oldCount = undefined;
        $scope.manual = function(count, wp, ct) {
            count = Number(count);
            //          console.log(count, $scope.oldCount);
            if (count === $scope.oldCount) {
                return;
            }
            var arr = $scope.priceArr(wp);

            if (count <= arr[0]['rule'] + 1) {
                alert('请输入和法值');
                count = wp.count = arr[0]['rule'] + 1;
                wp.subtotal = arr[0]['price'] * arr[0]['rule'];
            } else if (count >= wp.stockSize) {
                alert('请输入和法值');
                count = wp.count = Number(wp.stockSize);
                wp.subtotal = arr[arr.length - 1]['price'] * count;
            }
            angular.forEach(arr, function(item, index) {
                if (count > arr[0]['rule']) {
                    console.log(1);
                    if (item.rule > count && index != 0) {
                        wp.subtotal = arr[index - 1]['price'] * count;
                    } else if (count > arr[0]['rule'] && count < arr[1]['rule']) {
                        wp.subtotal = arr[0]['price'] * count;
                    } else if (count > arr[arr.length - 1]['rule']) {
                        wp.subtotal = arr[arr.length - 1]['price'] * count;
                    }
                }
            })

            angular.forEach($scope.cart.shopList, function(item, index) {
                if (item === ct) {
                    angular.forEach(item.detailList, function(data, ix) {
                        $scope.obj[index] += Number(data.subtotal);
                    });
                }
            });
            $scope.oldCount = Number(count);

        }
        //删除商品
        $scope.remove = function(ct) {
            if ("cartId" in ct) {
                var arr = this.checkStatus(ct);
                if (arr == 0) {
                    return false;
                }
                var productArr = [];
                angular.forEach(arr, function(item, index) {
                    var obj = {};
                    obj["productId"] = item.productId;
                    obj["skuId"] = item.skuId;
                    obj["count"] = item.count;
                    productArr.push(obj);
                });
                //刪除多條數據
                var str = JSON.stringify({
                    "cart": {
                        "memberId": "1",
                        "channel": "1",
                        "deviceNo": "2",
                        "cartId": ct.cartId,
                        "clearflag": true,
                        "productIdList": productArr
                    }
                });
                // 按照指定格式传递的数据
                var data_obj = JSON.stringify({
                    "packageList": {
                        "packages": {
                            "header": {
                                "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                                "comId": "CTO2O20170420",
                                "comSerial": "comSerial",
                                "from": "PAD",
                                "orderSerial": "orderId",
                                "requestType": "DELETEPROTOCART",
                                "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                                // new Date().format('yyyy-MM-dd
                                // hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                            },
                            "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
                        }
                    }
                });
                var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
                commonHttp.myHttp(md5_obj, data_obj, function(data) {
                    console.log(data);

                });
            } else if ("skuId" in ct) {
                //              console.log('单条');
                console.log(ct);
                //刪除單條商品
                var str = JSON.stringify({
                    "cart": {
                        "memberId": "1",
                        "channel": "1",
                        "deviceNo": "2",
                        "cartId": ct.cartId,
                        "clearflag": false,
                        "productIdList": [{
                            "productId": ct.productId,
                            "skuId": ct.skuId,
                            "count": ct.count
                        }]
                    }
                });
                // 按照指定格式传递的数据
                var data_obj = JSON.stringify({
                    "packageList": {
                        "packages": {
                            "header": {
                                "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                                "comId": "CTO2O20170420",
                                "comSerial": "comSerial",
                                "from": "PAD",
                                "orderSerial": "orderId",
                                "requestType": "DELETEPROTOCART",
                                "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                                // new Date().format('yyyy-MM-dd
                                // hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                            },
                            "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
                        }
                    }
                });
                var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
                commonHttp.myHttp(md5_obj, data_obj, function(data) {
                    console.log(data);
                    $scope.newRequest();
                });

            }

            //頁面數據刷新，重新发出请求

        }

        $scope.newRequest = function() {

            var str = JSON.stringify({
                "cart": {
                    "memberId": "1",
                    "channel": "1",
                    "deviceNo": "2",
                }
            });
            // 按照指定格式传递的数据
            var data_obj = JSON.stringify({
                "packageList": {
                    "packages": {
                        "header": {
                            "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                            "comId": "CTO2O20170420",
                            "comSerial": "comSerial",
                            "from": "PAD",
                            "orderSerial": "orderId",
                            "requestType": "PRODUCTCARTLIST",
                            "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                            // new Date().format('yyyy-MM-dd
                            // hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                        },
                        "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
                    }
                }
            });
            var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
            commonHttp.myHttp(md5_obj, data_obj, function(data) {
                //              console.log(1);
                console.log(data);
                $scope.cart = JSON.parse(data).cart;
                //              $scope.$broadcast('cart', $scope.cart);
            });
        }

    }]).controller('publicity', ['$scope', '$document', function($scope, $document) {
        $scope.magnify = function($event) {
            $scope.$e($event.delegateTarget).children('.big').show();
        }
        $scope.recover = function($event) {
            $scope.$e($event.delegateTarget).children('.big').hide();
        }
        $scope.data = getCookie('data')
        console.log(JSON.stringify($scope.data))
        //      $scope.$e(window).bind('scroll', function() {       
        //          if($document.scrollTop()>700){
        //              angular.forEach($scope.$e('.img-box li'),function (item,index){
        //                  $scope.$e(item).slideDown(1000*index);                      
        //          })
        //          }           
        //      })

    }]).controller('rigct', ['$scope', "$rootScope", '$state', 'commonHttp', '$location', '$timeout', '$interval', function($scope, $rootScope, $state, commonHttp, $location, $timeout, $interval) {
        $scope.hidel = false
        //密码可见性切换
        $scope.eye = false;
        $scope.ty = false;
        $scope.passwdChange = function(event) {
            if (!$scope.eye) {
                $scope.eye = true;
                $(event.target).parent().find('input').attr('type', 'text');
            } else {
                $scope.eye = false;
                $(event.target).parent().find('input').attr('type', 'password');
            }
        }
        //获取焦点
        $scope.iph = function() {
            $scope.mobFocus = true
            $scope.ty = false;
        }
        //获取验证码
        $scope.hide = false;
        $scope.sendCode = function(target) {
            var second = 59;
            var timerHandler;
            if ($scope.mob) {
                var str = JSON.stringify({
                    "random": {
                        "loginCode": $scope.mob,
                        "channel": "PC",
                        "deviceNo": "1",
                        "functionCode": "REGISTERED"
                    }
                });
                console.log($scope.mob)
                console.log(str)
                // 按照指定格式传递的数据
                var data_obj = JSON.stringify({
                    "packageList": {
                        "packages": {
                            "header": {
                                "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                                "comId": "CTO2O20170420",
                                "comSerial": "comSerial",
                                "from": "",
                                "orderSerial": "orderId",
                                "requestType": "GETRANDOM",
                                "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                                // new Date().format('yyyy-MM-dd
                                // hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                            },
                            "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
                        }
                    }
                });
                var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
                //console.log(md5_obj)
                //console.log(data_obj)
                commonHttp.myHttp(md5_obj, data_obj, function(data, code, error) {

                    $rootScope.rome = JSON.parse(data).random.random;
                    console.log(code)
                    Object.prototype.toString.call(code)
                    if (code == "1000") {
                    	$scope.tshi='您操作太多次数，请一小时之后重新获取'
                        $scope.hide = true;
                       // alert('短信发送失败')

                        return
                    }
                    if (code == "1106") {
                        //alert('短信平台异常')
                       $scope.tshi='短信平台异常'
                        $scope.hide = true;
                        return
                    }
                    if (code == "1101") {
                    	$scope.ty=true;
						// $('#myModal').modal('show')

                       // alert('该号码已注册，不能重复注册')
                        return
                    }
                    if (code == "0") {

                        if (timerHandler) {
                            if ($(target).html() != '重新发送') {
                                return;
                            }
                        }
                        timerHandler = $interval(function() {
                            if (second <= 0) {
                                $interval.cancel(timerHandler);
                                second = 59;
                                $(target).html('重新发送');
                                $(target).removeAttr("disabled");

                            } else {
                                $(target).html(second + 's后重新获取');
                                $(target).attr("disabled", "disabled");
                                second--;
                            }
                        }, 1000)
                    }



                });
            } else {
                $scope.mobFocus = true;
            }
        }
        $scope.codeHide = false;
        $scope.registPerson = function() {
            if (!$scope.mob) {
                console.log('1')
                return;
            }
            if (!$scope.passwd) {
                console.log('2')
                return;
            }
            if (!$scope.qrpass) {
                console.log('3')
                return;
            }
            if ($scope.qrpass != $scope.passwd) {
                console.log('4')
                return;
            }
            if (!$scope.code) {
                console.log('5')
                $scope.hide = false;

                return;
            }
            console.log($rootScope.rome, $scope.code)
            //               if($rootScope.rome!=$scope.code){
            //                       $scope.codeHide = true;
            //                       $scope.hidel=false;
            //                       $scope.hide=false;
            //                       console.log('666')
            //                       return;
            //                   }else{
            //                       $scope.codeHide = false;
            //                       $scope.hidel=false;
            //                       $scope.hide=false;
            //                   }
            var mima = hex_md5($scope.passwd);
            var str = JSON.stringify({
                "user": {
                    "loginCode": $scope.mob,
                    "userName": "",
                    "memberType": "",
                    "random": $scope.code,
                    "loginPwd": mima,
                    "loginPwdOld": "",
                    "province": "",
                    "city": "",
                    "county": "",
                    "longitude": "",
                    "latitude": "",
                    "channel": "",
                    "deviceNo": ""
                }
            });
            // 按照指定格式传递的数据
            var data_obj = JSON.stringify({
                "packageList": {
                    "packages": {
                        "header": {
                            "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                            "comId": "CTO2O20170420",
                            "comSerial": "comSerial",
                            "from": "PAD",
                            "orderSerial": "orderId",
                            "requestType": "REGISTERED",
                            "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                            // new Date().format('yyyy-MM-dd
                            // hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                        },
                        "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
                    }
                }
            });
            console.log(str)
            var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
            commonHttp.myHttp(md5_obj, data_obj, function(data, code, error) {
                $scope.rata = JSON.parse(data);
                console.log($scope.rata)
                console.log(code)
                if (code == 0) {
                    $scope.ty = false;

                    $state.go('register.registSuccess')

                }
                if (code == 1101) {
                   // alert('您的手机已经注册过了')
                    $scope.ty = true;

                }
                if (code == 1102) {
                   // alert('验证码不存在')
                    $scope.tshi='您输入的验证码有误，请核对正确后再次输入'
                    $scope.hide = true;

                }
                if (code == 1103) {
                  //  alert('验证码失效')
                   $scope.tshi='验证码已失效，请重新获取'
                    $scope.hide = true;

                }
                if (code == 1000) {
                    //alert('短信发送失败')
                    $scope.tshi='短信发送失败，请一小时之后重新获取'
                    $scope.hide = true;

                }
                if (code == 1100) {
                    //alert('无法获取用户信息')
                     $scope.tshi='无法获取用户信息'
                    $scope.hide = true;

                }

            })
        }

    }]).controller('perfect', ['$scope', '$state', '$rootScope', '$document', 'tupurl', 'commonHttp', '$http', '$location', function($scope, $state, $rootScope, $document, tupurl, commonHttp, $http, $location) {
        if (localStorage.id) {
            var constanttest = localStorage.id
        } else {
            $state.go('login')
            return;
        }

        //公司信息详情传递数据
        var infoStr = JSON.stringify({
            "company": {
                "memberId": constanttest,
                "channel": "PC",
                "deviceNo": "1"
            }
        });
        //按照指定格式传递的数据
        var data_objinfo = JSON.stringify({
            "packageList": {
                "packages": {
                    "header": {
                        "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                        "comId": "CTO2O20170420",
                        "comSerial": "comSerial",
                        "from": "PAD",
                        "orderSerial": "orderId",
                        "requestType": "PLATFORMCOMPANYDET",
                        "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                        //new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                    },
                    "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', infoStr)
                }
            }
        });
        var md5_objinfo = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_objinfo);
        commonHttp.myHttp(md5_objinfo, data_objinfo, function(data, code, error) {
            $scope.info = JSON.parse(data).company;

        })

    }]).controller('perfectInfor', ['$scope', '$state', 'picarl', '$rootScope', '$document', 'tupurl', 'commonHttp', '$http', '$location', function($scope, $state, picarl, $rootScope, $document, tupurl, commonHttp, $http, $location) {
        sessionStorage.removeItem("establishriqi")
        sessionStorage.removeItem("registriqi")
        $scope.checkboxHint = false;
        $scope.picHint = false;
        $scope.lzut = true;
        $scope.kl = false;
        $scope.shuee = false;
        if (localStorage.id) {
            var constanttest = localStorage.id
        } else {
            $state.go('login')
            return;
        }
        $scope.tj = '提交'
        //销售产品
        $scope.promoting = [{
            "picUrl": ''
        }, {
            "picUrl": ''
        }, {
            "picUrl": ''
        }]

        //采购产品
        $scope.products = [{
            "picUrl": ''
        }, {
            "picUrl": ''
        }, {
            "picUrl": ''
        }]
        $scope.jo = function() {
            $scope.promoting.push({
                "picUrl": ''
            })
        }
        $scope.prod = function() {
            $scope.products.push({
                "picUrl": ''
            })
        }
        //公司信息详情传递数据
        var infoStr = JSON.stringify({
            "company": {
                "memberId": constanttest,
                "channel": "PC",
                "deviceNo": "1"
            }
        });
        //按照指定格式传递的数据
        var data_objinfo = JSON.stringify({
            "packageList": {
                "packages": {
                    "header": {
                        "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                        "comId": "CTO2O20170420",
                        "comSerial": "comSerial",
                        "from": "PAD",
                        "orderSerial": "orderId",
                        "requestType": "PLATFORMCOMPANYDET",
                        "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                        //new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                    },
                    "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', infoStr)
                }
            }
        });
        var md5_objinfo = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_objinfo);
        commonHttp.myHttp(md5_objinfo, data_objinfo, function(data, code, error) {
            $scope.infoData = JSON.parse(data);
            $rootScope.infoData = JSON.parse(data);
            if (code == 0) {
                console.log($scope.infoData.company)

                //公司会员信息详情
                if ($scope.infoData.company.status == 0) {
                    //  console.log("请完善您的公司信息")
                    $scope.starus = '未认证'

                } else {
                    if ($scope.infoData.company.status == 1) {
                        $scope.starus = '审核中'
                    }
                    if ($scope.infoData.company.status == 2) {
                        $scope.starus = '审核通过'
                    }
                    if ($scope.infoData.company.status == 3) {
                        $scope.starus = '审核失败'
                    }
                    $scope.qyname = $scope.infoData.company.companyName
                    $scope.qyt = $scope.infoData.company.companyType
                    console.log($scope.infoData.company.licensePicList[0].picUrl)
                    $scope.zhmian = picarl + $scope.infoData.company.licensePicList[0].picUrl
                    $scope.form[0] = {
                        "picUrl": $scope.infoData.company.licensePicList[0].picUrl,
                        "picType": "",
                        "picName": "",
                        "picDec": "",
                        "picSort": 1
                    };
                    //              $scope.zhmian2 = picarl + $scope.infoData.company.licensePicList[1].picUrl
                    //              $scope.form[1] = { "picUrl": $scope.infoData.company.licensePicList[1].picUrl, "picType": "", "picName": "", "picDec": "", "picSort": 2 };
                    fn($scope.infoData.company.businessModel)
                    if ($scope.infoData.company.saleProductList.length == 0) {
                        $scope.promoting = [{
                            "picUrl": ''
                        }, {
                            "picUrl": ''
                        }, {
                            "picUrl": ''
                        }]

                    } else {
                        $scope.promoting = $scope.infoData.company.saleProductList
                    }
                    if ($scope.infoData.company.purProductList.length == 0) {
                        $scope.products = [{
                            "picUrl": ''
                        }, {
                            "picUrl": ''
                        }, {
                            "picUrl": ''
                        }]
                    } else {
                        $scope.products = $scope.infoData.company.purProductList
                    }
                    $scope.province = $scope.infoData.company.province
                    $scope.provinceSelect(0, $scope.infoData.company.province)
                    $scope.city = $scope.infoData.company.city
                    $scope.citySelect(0, $scope.infoData.company.city)
                    $scope.county = $scope.infoData.company.county
                    $scope.qyintro = $scope.infoData.company.description
                    $scope.zb = $scope.infoData.company.registeredAssets
                    angular.element("#start").val($scope.infoData.company.establishDate.split(' ')[0])
                    angular.element("#end").val($scope.infoData.company.registeredDate.split(' ')[0])
                    $scope.registAddress = $scope.infoData.company.registAddr
                    $scope.person = $scope.infoData.company.contacts
                    $scope.mobile = $scope.infoData.company.contactNumber

                }
            }
            if (code == 1500) {
                console.log($scope.infoData.company)

                //公司会员信息详情
                if ($scope.infoData.company.status == 0) {
                    //  console.log("请完善您的公司信息")
                    $scope.starus = '未认证'

                }
            }
        })

        $scope.reader = new FileReader(); //创建一个FileReader接口
        $scope.form = [ //用于绑定提交内容，图片或其他数据

        ];
        $scope.thumb = {}; //用于存放图片的base64

        $scope.img_upload = function(files) { //单次提交图片的函数
            if (files[0]) {
                $scope.guid = (new Date()).valueOf(); //通过时间戳创建一个随机数，作为键名使

                //   console.log(files[0])
                var data1 = new FormData(); //以下为像后台提交图片数据
                data1.append('pic', files[0]);
                data1.append('guid', $scope.guid);

                $http({
                    method: 'post',
                    url: tupurl,
                    data: data1,
                    headers: {
                        'Content-Type': undefined
                    },
                    transformRequest: angular.identity
                }).then(function(data) {

                    console.log(data.data)
                    var img = 'pp'
                    //              angular.element("#one-input").val('');
                    //              $scope.po=''//清理缓存问题

                    if (data.data) {
                        $scope.form[0] = {
                            "picUrl": data.data.path,
                            "picType": "",
                            "picName": "",
                            "picDec": "",
                            "picSort": 1
                        };
                        //  console.log($scope.form[0])
                        //              $scope.form['pp']=data.path
                        //              $scope.thumb[data.guid].status = 'SUCCESS';
                        $scope.zhmian = data.data.url;
                        $scope.thumb[$scope.guid] = {
                            imgSrc: data.url, //接收base64
                        }
                        data1 = ''
                        //   console.log($scope.form.length)
                    }
                    if (data.result_code == 'FAIL') {
                        // console.log(data)
                    }
                }, function(data) {

                })
            }
            return;
        };

        $scope.img_upload2 = function(files) { //单次提交图片的函数
            if (files[0]) {
                $scope.guid = (new Date()).valueOf(); //通过时间戳创建一个随机数，作为键名使用
                //  $scope.reader.readAsDataURL(files[0]);  //FileReader的方法，把图片转成base64
                // $scope.ourl.push({"name":files[0].name})

                //  console.log(files[0])
                var data1 = new FormData(); //以下为像后台提交图片数据
                data1.append('pic', files[0]);
                data1.append('guid', $scope.guid);

                $http({
                    method: 'post',
                    url: tupurl,
                    data: data1,
                    headers: {
                        'Content-Type': undefined
                    },
                    transformRequest: angular.identity
                }).then(function(data) {

                    //console.log(data.data)
                    var img = 'pp'
                    //              angular.element("#one-input").val('');
                    //              $scope.po=''//清理缓存问题

                    if (data.data) {

                        $scope.form[1] = {
                            "picUrl": data.data.path,
                            "picType": "",
                            "picName": "",
                            "picDec": "",
                            "picSort": 2
                        };
                        $scope.zhmian2 = data.data.url;

                        data1 = ''
                        //  console.log($scope.form.length)
                    }
                }, function(data) {

                })
            }
            return;
        };
        $scope.img_del = function(key) { //删除，删除的时候thumb和form里面的图片数据都要删除，避免提交不必要的
            //console.log(key)
            var guidArr = [];
            for (var p in $scope.thumb) {
                guidArr.push(p);
            }
            delete $scope.thumb[guidArr[key]];
            $scope.form.splice($scope.form.indexOf(key), 1);
            //delete $scope.form[guidArr[key]];
            //  console.log($scope.form)
        };

        //企业类型传递的数据
        var typeStr = JSON.stringify({
            "baseCode": {
                "memberId": constanttest,
                "channel": "PC",
                "deviceNo": "2",
                "categoryCode": "",
                "baseType": "COMPANY_TYPE",
                "paramCode": ""
            }
        });
        //按照指定格式传递的数据
        var data_obj = JSON.stringify({
            "packageList": {
                "packages": {
                    "header": {
                        "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                        "comId": "CTO2O20170420",
                        "comSerial": "comSerial",
                        "from": "PAD",
                        "orderSerial": "orderId",
                        "requestType": "BASECODE",
                        "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                        //new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                    },
                    "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', typeStr)
                }
            }
        });
        var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
        commonHttp.myHttp(md5_obj, data_obj, function(data, code, error) {
            $scope.qyTypeData = JSON.parse(data);
            //console.log($scope.qyTypeData)
        })
        //经营模式传递的数据
        function fn(n) {
            $scope.checkedpatt = [];
            var patternStr = JSON.stringify({
                "baseCode": {
                    "memberId": constanttest,
                    "channel": "PC",
                    "deviceNo": "2",
                    "categoryCode": "",
                    "baseType": "BUSINESS_MODEL",
                    "paramCode": ""
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
                            "requestType": "BASECODE",
                            "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                            //new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                        },
                        "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', patternStr)
                    }
                }
            });
            var md5_obj2 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj2);
            //console.log(md5_obj2)
            commonHttp.myHttp(md5_obj2, data_obj2, function(data, code, error) {
                $scope.patternData = JSON.parse(data)
                //console.log($scope.patternData.baseCode)
                if (n) {
                    for (var i = 0; i < $scope.patternData.baseCode.length; i++) {
                        if ($scope.patternData.baseCode[i].code == n) {
                            //          console.log(i)
                            $scope.pattersId = i + 1;
                            $rootScope.patters = $scope.patternData.baseCode[i].code;
                        }
                    }
                }

                $scope.patternSelect = function(index) {
                    //  console.log(index)
                    $scope.pattersId = index;
                    $rootScope.patters = $scope.patternData.baseCode[index - 1].code;
                    //          console.log($scope.patternData.baseCode[index-1].code)
                }

            })
        }
        fn()
        $scope.uop = function(n) {
            //console.log(index,n)
            if (n && Number(n) != 0) {
                $scope.zb = n.replace(/\D/g, '')
            } else {
                $scope.zb = ''
            }
        }

        //销售
        $scope.sellData = [{
            id: 1,
            name: "电子"
        }, {
            id: 2,
            name: "商务"
        }]
        $scope.selectsell = [];
        $scope.selectedsell = [];
        var updateSelected = function(action, id, name) {
            if (action == 'add' && $scope.selectsell.indexOf(id) == -1) {
                $scope.selectsell.push(id);
                $scope.selectedsell.push({
                    id: id,
                    picUrl: name
                });
            }
            if (action == 'remove' && $scope.selectsell.indexOf(id) != -1) {
                var idx = $scope.selectsell.indexOf(id);
                $scope.selectsell.splice(idx, 1);
                $scope.selectedsell.splice(idx, 1);
            }
        }

        $scope.updateSelection = function($event, id) {
            var checkbox = $event.target;
            var action = (checkbox.checked ? 'add' : 'remove');
            updateSelected(action, id, checkbox.name);
        }

        $scope.isSelected = function(id) {
            return $scope.selectsell.indexOf(id) >= 0;
        }

        //采购
        $scope.purcData = [{
            id: 1,
            name: "电子"
        }, {
            id: 2,
            name: "商务"
        }]
        $scope.selectpurc = [];
        $scope.selectedpurc = [];
        var updateSelecteds = function(action, id, name) {
            if (action == 'add' && $scope.selectpurc.indexOf(id) == -1) {
                $scope.selectpurc.push(id);
                $scope.selectedpurc.push({
                    id: id,
                    picUrl: name
                });
            }
            if (action == 'remove' && $scope.selectpurc.indexOf(id) != -1) {
                var idx = $scope.selectpurc.indexOf(id);
                $scope.selectpurc.splice(idx, 1);
                $scope.selectedpurc.splice(idx, 1);
            }
        }

        $scope.updateSelections = function($event, id) {
            var checkbox = $event.target;
            var action = (checkbox.checked ? 'add' : 'remove');
            updateSelecteds(action, id, checkbox.name);
        }

        $scope.isSelecteds = function(id) {
            return $scope.selectpurc.indexOf(id) >= 0;
        }
        $scope.addcountry = '';
        //企业地址传递的数据
        var provinceStr = JSON.stringify({
            "baseCode": {
                "memberId": constanttest,
                "channel": "PC",
                "deviceNo": "2",
                "categoryCode": "",
                "baseType": "828",
                "paramCode": "0"
            }
        });
        //按照指定格式传递的数据
        var provincedata_obj = JSON.stringify({
            "packageList": {
                "packages": {
                    "header": {
                        "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                        "comId": "CTO2O20170420",
                        "comSerial": "comSerial",
                        "from": "PAD",
                        "orderSerial": "orderId",
                        "requestType": "BASECODE",
                        "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                        //new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                    },
                    "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', provinceStr)
                }
            }
        });
        var md5_obj3 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', provincedata_obj);
        commonHttp.myHttp(md5_obj3, provincedata_obj, function(data, code, error) {
            $scope.provinceData = JSON.parse(data);
            //console.log($scope.provinceData.baseCode)
        })
        $scope.qytyer = function(type) {
            if (type) {
                angular.element("select[name='qytype']").removeClass("active");
            }
        }

        $scope.provinceSelect = function(index, province) {
            var provinceStr = JSON.stringify({
                "baseCode": {
                    "memberId": constanttest,
                    "channel": "PC",
                    "deviceNo": "2",
                    "categoryCode": "",
                    "baseType": "828",
                    "paramCode": province
                }
            });
            var provincedata_obj = JSON.stringify({
                "packageList": {
                    "packages": {
                        "header": {
                            "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                            "comId": "CTO2O20170420",
                            "comSerial": "comSerial",
                            "from": "PAD",
                            "orderSerial": "orderId",
                            "requestType": "BASECODE",
                            "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                            //new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                        },
                        "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', provinceStr)
                    }
                }
            });
            var md5_obj4 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', provincedata_obj);
            commonHttp.myHttp(md5_obj4, provincedata_obj, function(data, code, error) {
                $scope.cityData = JSON.parse(data)
                angular.element("select[name='province']").removeClass("active");
                //  console.log($scope.cityData.baseCode)
            })
        }

        $scope.citySelect = function($index, citys) {
            var cityStr = JSON.stringify({
                "baseCode": {
                    "memberId": constanttest,
                    "channel": "PC",
                    "deviceNo": "2",
                    "categoryCode": "",
                    "baseType": "828",
                    "paramCode": citys
                }
            });
            var citydata_obj = JSON.stringify({
                "packageList": {
                    "packages": {
                        "header": {
                            "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                            "comId": "CTO2O20170420",
                            "comSerial": "comSerial",
                            "from": "PAD",
                            "orderSerial": "orderId",
                            "requestType": "BASECODE",
                            "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                            //new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                        },
                        "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', cityStr)
                    }
                }
            });
            var md5_obj5 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', citydata_obj);
            commonHttp.myHttp(md5_obj5, citydata_obj, function(data, code, error) {
                $scope.countyData = JSON.parse(data);
                //console.log($scope.countyData.baseCode)
                angular.element("select[name='city']").removeClass("active");
            })
        }
        $scope.county3 = function(sop) {
            if (sop) {
                angular.element("select[name='province']").removeClass("active");
                angular.element("select[name='city']").removeClass("active");
                angular.element("select[name='county']").removeClass("active");
            }
        }
        $scope.cyInfoSubmit = function() {
            var nn;
            var gid;
            if ($scope.infoData.company.status == 0) {
                gid = ''
                nn = 'INSERT'
            } else {
                gid = $scope.infoData.company.companyId
                nn = 'UPDATE'
            }
            //  console.log(nn)
            var qyType = $scope.qyt;
            var addressProvince = $scope.province;
            var addressCity = $scope.city;
            var addressCounty = $scope.county;
            //console.log($scope.qyt)
            if (!qyType) { //企业类型
                //  console.log(99999)
                angular.element("select[name='qytype']").addClass("active");
                return;
            } else {
                angular.element("select[name='qytype']").removeClass("active");
            }
            if ($rootScope.patters == "" || $rootScope.patters == undefined) {
                $scope.checkboxHint = true;
                return;
            } else {
                $scope.checkboxHint = false;
            }
            if ($scope.form.length < 1) {
                $scope.picHint = true;
                return;
            } else {
                $scope.picHint = false;
            }

            //省
            if (!addressProvince) {
                angular.element("select[name='province']").addClass("active");
                angular.element("select[name='city']").addClass("active");
                angular.element("select[name='county']").addClass("active");
                return;
            } else {
                angular.element("select[name='province']").removeClass("active");
                angular.element("select[name='city']").removeClass("active");
                angular.element("select[name='county']").removeClass("active");
            }
            //市
            if (!addressCity) {
                angular.element("select[name='city']").addClass("active");
                angular.element("select[name='county']").addClass("active");
                return;
            } else {
                angular.element("select[name='city']").removeClass("active");
                angular.element("select[name='county']").removeClass("active");
            }
            if ($scope.countyData.baseCode != '') {
                //区县
                if (!$scope.county) {
                    angular.element("select[name='county']").addClass("active");
                    return;
                } else {
                    angular.element("select[name='county']").removeClass("active");
                }
            }

            if (!angular.element("#start").val()) {
                $scope.establishFocus = true;
                return;
            }
            //          if (!angular.element("#end").val()) {
            //              $scope.registFocus = true;
            //              return;
            //          }
            var pronmi = []
            var u = 0
            //销售产品空字符筛选
            angular.forEach($scope.promoting, function(n, i) {
                if (n.picUrl != '') {
                    pronmi.push({
                        picUrl: n.picUrl
                    })
                    u++
                }

            })
            if (u == 0) {
                pronmi = ''
            }
            var prod = []
            var ud = 0
            //采购产品空字符筛选
            angular.forEach($scope.products, function(n, i) {
                if (n.picUrl != '') {
                    prod.push({
                        picUrl: n.picUrl
                    })
                    ud++
                }

            })
            if (ud == 0) {
                prod = ''
            }

            var cyStr = JSON.stringify({
                "company": {
                    "memberId": constanttest,
                    "channel": "PC",
                    "deviceNo": "1",
                    "functionCode": nn,
                    'companyId': gid,
                    "companyName": $scope.qyname,
                    "companyType": $scope.qyt,
                    "businessModel": $rootScope.patters,
                    "province": addressProvince,
                    "city": addressCity,
                    "county": addressCounty,
                    "description": $scope.qyintro,
                    "registeredAssets": $scope.zb,
                    "establishDate": angular.element("#start").val(),
                    "registeredDate": angular.element("#end").val(),
                    "registAddr": $scope.registAddress,
                    "contacts": $scope.person,
                    "contactNumber": $scope.mobile,
                    "licensePicList": $scope.form,
                    "saleProductList": pronmi,
                    "purProductList": prod
                }
            });
            var cydata_obj = JSON.stringify({
                "packageList": {
                    "packages": {
                        "header": {
                            "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                            "comId": "CTO2O20170420",
                            "comSerial": "comSerial",
                            "from": "PAD",
                            "orderSerial": "orderId",
                            "requestType": "PLATFORMCOMPANY",
                            "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                            //new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                        },
                        "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', cyStr)
                    }
                }
            });
            console.log(cyStr)
            var md5_objcy = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', cydata_obj);
            commonHttp.myHttp(md5_objcy, cydata_obj, function(data, code, error) {
                //console.log(data)
                $scope.cyData = JSON.parse(data);
                console.log($scope.cyData)
                if (code == 0) {
                    if ($scope.cyData.company.status == 1) {
                        //$state.go('hoe.perinforFailure')
                        $state.go('buyt.perinforSuccess')

                        //$location.path('/buyt/perinforSuccess');

                    }
                }

                //$location.path('/buyt/perinforFailure');
            })
        }

    }]).controller('recr', ['$scope', '$state', '$rootScope', '$document', 'tupurl', 'commonHttp', '$http', '$location', function($scope, $state, $rootScope, $document, tupurl, commonHttp, $http, $location) {
        $scope.json = function() {
            if (localStorage.id) {
                $state.go('buyt.perinfor', ({
                    staur: 0
                }))
                return;
            }
            if (localStorage.aid) {
                $state.go('login')
                return;
            }

            $state.go('register.rigc')
        }

    }])