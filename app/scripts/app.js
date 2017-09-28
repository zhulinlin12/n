'use strict';

/**
 * @ngdoc overview
 * @name hzyApp
 * @description
 * # hzyApp
 *
 * Main module of the application.
 */
angular
    .module('hzyApp', ["ui.router", "oc.lazyLoad","CommonService","request",'pinyin'])

    .config(["$stateProvider", "$urlRouterProvider", '$httpProvider', '$ocLazyLoadProvider', function($stateProvider, $urlRouterProvider, $httpProvider, $ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: true, //知否启用调试模式  
            events: true //事件绑定是否启用  
        });
        //延迟加载

        var lazyloadlib = [];
        $stateProvider.state("index", { //主头部
                url: "/toubu",
                templateUrl: 'views/shouye.html',
                controller: 'daoh',
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/haed.js',
                        ]);
                    }]
                }
            }).state('index.op', { //商城首页
                url: '/synr',
                views: {
                    '': {
                        templateUrl: 'views/heye.html',
                        controller: 'chenum'
                    },
                    'a@index.op': {
                        templateUrl: 'views/nr.html',
                        controller: 'synr'
                    },
                    'b@index.op': {
                        templateUrl: 'views/dibu.html'
                    }
                }

            }).state("index.zhongxin", { //常见问题
                url: "/zhongxin",
                templateUrl: 'views/bang-cjwt.html',
                controller: 'chenum',
                controller:'helpctrl',
            }).state("index.article", { //文章页
                url: "/article/?articleid",
                templateUrl: 'views/article.html',
                controller: 'chenum',
                controller: 'articlectrl',
            }).state("index.articlemenulist", { //文章目录
                url: "/articlemenulist",
                templateUrl: 'views/articlemenulist.html',
                controller: 'chenum',
                controller: 'articlectrl',
            }).state('index.guo', { //购物车
                url: '/guoche',
                views: {
                    '': {
                        templateUrl: 'views/heye.html'
                    },
                    'a@index.guo': {
                        templateUrl: 'views/gouwuche.html'
                    },
                    'b@index.guo': {
                        templateUrl: 'views/dibu.html'
                    }
                }
            }).state('index.lb', { //搜索列表
                url: '/sclb/:page?code&word',
                views: {
                    '': {
                        templateUrl: 'views/heye.html',
                        controller: 'chenum'
                    },
                    'a@index.lb': {
                        templateUrl: 'views/sc.html'
                    },
                    'b@index.lb': {
                        templateUrl: 'views/dibu.html'
                    }
                }
            }).state('index.search', { //搜索
                url: '/search/?Keyword',
                views: {
                    '': {
                        templateUrl: 'views/heye.html',
                        controller: 'chenum'
                    },
                    'a@index.search': {
                        templateUrl: 'views/sc.html'
                        // controller: 'sclb'
                    },
                    'b@index.search': {
                        templateUrl: 'views/dibu.html'
                    }
                }
            }).state('index.pj', { //商品评价页
                url: '/dity?id',
                views: {
                    '': {
                        templateUrl: 'views/heye.html',
                        controller: 'chenum'
                    },
                    'a@index.pj': {
                        templateUrl: 'views/sppj.html',
                        controller: 'evaluate'
                    },
                    'b@index.pj': {
                        templateUrl: 'views/dibu.html'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/placean-order.js',
                        ]);
                    }]
                }
            }).state('index.buy', { //买家付款
                url: '/buy',
                views: {
                    '': {
                        templateUrl: 'views/heye.html',
                        controller: 'chenum'
                    },
                    'a@index.buy': {
                        templateUrl: 'views/buy.html'
                    },
                    'b@index.buy': {
                        templateUrl: 'views/dibu.html'
                    }
                }
            }).state('index.xq', { //商品详情
                url: '/xq?id',
                views: {
                    '': {
                        templateUrl: 'views/heye.html',
                        controller: 'chenum'
                    },
                    'a@index.xq': {
                        templateUrl: 'views/spxq.html'
                    },
                    'b@index.xq': {
                        templateUrl: 'views/dibu.html'
                    }
                }
            }).state('index.paymot', { //买家付款
                url: '/paymot?id',
                views: {
                    '': {
                        templateUrl: 'views/heye.html',
                        controller: 'chenum'
                    },
                    'a@index.paymot': {
                        templateUrl: 'views/paymot.html',
                         controller: 'terms' 
                    },
                    'b@index.paymot': {
                        templateUrl: 'views/dibu.html'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/placean-order.js',
                        ]);
                    }]
                }
            }).state('index.order', { //买家确认下单
                url: '/order',
                views: {
                    '': {
                        templateUrl: 'views/heye.html',
                        controller: 'chenum'
                    },
                    'a@index.order': {
                        templateUrl: 'views/order.html'
                    },
                    'b@index.order': {
                        templateUrl: 'views/dibu.html'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/placean-order.js',
                        ]);
                    }]
                }
            }).state('index.orders', { //买家下单成功
                url: '/orders',
                views: {
                    '': {
                        templateUrl: 'views/heye.html',
                        controller: 'chenum'
                    },
                    'a@index.orders': {
                        templateUrl: 'views/tjdds.html'
                    },
                    'b@index.orders': {
                        templateUrl: 'views/dibu.html'
                    }
                }
            }).state('index.sell', { //卖家发货
                url: '/sell',
                views: {
                    '': {
                        templateUrl: 'views/heye.html',
                        controller: 'chenum'
                    },
                    'a@index.sell': {
                        templateUrl: 'views/mjfa.html'
                    },
                    'b@index.sell': {
                        templateUrl: 'views/dibu.html'
                    }
                }
            }).state('index.sesh', { //买家确认收货
                url: '/sesh?id',
                views: {
                    '': {
                        templateUrl: 'views/heye.html',
                        controller: 'chenum'
                    },
                    'a@index.sesh': {
                        templateUrl: 'views/sesh.html',
                        controller: 'receipt'
                    },
                    'b@index.sesh': {
                        templateUrl: 'views/dibu.html'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/placean-order.js',
                        ]);
                    }]
                }
            }).state('index.buyse', { //买家确认收货
                url: '/buyse?id',
                views: {
                    '': {
                        templateUrl: 'views/heye.html',
                        controller: 'chenum'
                    },
                    'a@index.buyse': {
                        templateUrl: 'views/buyse.html'

                    },
                    'b@index.buyse': {
                        templateUrl: 'views/dibu.html'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/placean-order.js',
                        ]);
                    }]
                }
            }).state('index.qur', { //卖家确认订单
                url: '/qur',
                views: {
                    '': {
                        templateUrl: 'views/heye.html',
                        controller: 'chenum'
                    },
                    'a@index.qur': {
                        templateUrl: 'views/buy-succes.html'
                    },
                    'b@index.qur': {
                        templateUrl: 'views/dibu.html'
                    }
                }
            }).state("login", { //登录页面
                url: "/login",
                templateUrl: 'views/login.html',
                controller: 'validateLogon',
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/validateLogon.js',
                        ]);
                    }]
                }
            }).state("plat", { //平台首页
                url: "/plat?id=1",
                templateUrl: 'views/ptsy.html',
                controller: 'ptsy',
                controller: 'chenum',
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/paty.js',
                        ]);
                    }]
                }
            }).state("logint", { //登录找回密码头部
                url: "/lt",
                templateUrl: 'views/logint.html'

            }).state("logintou", { //登录重置密码头部
                url: "/lr",
                templateUrl: 'views/logtou.html'

            }).state("logintou.cz", { //重置密码成功
                url: "/cz",
                views: {
                    '': {
                        templateUrl: 'views/heye.html'
                    },
                    'a@logintou.cz': {
                        templateUrl: 'views/czsucces.html'
                    },
                    'b@logintou.cz': {
                        templateUrl: 'views/dibu.html'
                    }
                }

            }).state("logintou.ver", { //重置密码短信验证
                url: "/ver",
                views: {
                    '': {
                        templateUrl: 'views/heye.html'
                    },
                    'a@logintou.ver': {
                        templateUrl: 'views/czyz.html'
                    },
                    'b@logintou.ver': {
                        templateUrl: 'views/dibu.html'
                    }
                }

            }).state("logintou.suc", { //设置新的密码
                url: "/suc",
                views: {
                    '': {
                        templateUrl: 'views/heye.html'
                    },
                    'a@logintou.suc': {
                        templateUrl: 'views/set-susse.html'
                    },
                    'b@logintou.suc': {
                        templateUrl: 'views/dibu.html'
                    }
                }

            }).state("logintou.czmm", { //重置密码方式选择
                url: "/czmm",
                views: {
                    '': {
                        templateUrl: 'views/heye.html'
                    },
                    'a@logintou.czmm': {
                        templateUrl: 'views/czmm.html'
                    },
                    'b@logintou.czmm': {
                        templateUrl: 'views/dibu.html'
                    }
                }

            }).state("logintou.cyhk", { //重置密码通过银行卡
                url: "/cyhk",
                views: {
                    '': {
                        templateUrl: 'views/heye.html'
                    },
                    'a@logintou.cyhk': {
                        templateUrl: 'views/czyhk.html'
                    },
                    'b@logintou.cyhk': {
                        templateUrl: 'views/dibu.html'
                    }
                }

            }).state("logint.zhmm", { //找回密码-验证成功
                url: '/zhmm/?id',
                views: {
                    '': {
                        templateUrl: 'views/heye.html'
                    },
                    'a@logint.zhmm': {
                        templateUrl: 'views/zhmm.html'
                    },
                    'b@logint.zhmm': {
                        templateUrl: 'views/dibu.html'
                    }
                }

            }).state("logint.find", { //找回密码-验证
                url: "/find",
                views: {
                    '': {
                        templateUrl: 'views/heye.html',
                        controller: 'findPasswordsCtrl'
                    },
                    'a@logint.find': {
                        templateUrl: 'views/find.html'
                    },
                    'b@logint.find': {
                        templateUrl: 'views/dibu.html'
                    }
                }

            }).state("fank", { //平台反馈页面
                url: "/fank",
                templateUrl: 'views/fan.html',
                controller: 'tickling',
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/fankui.js',
                        ]);
                    }]
                }

            }).state("sign", { //注册页面
                url: "/sign",
                templateUrl: 'views/sign.html'

            }).state("signs", { //注册成功
                url: "/signs",
                templateUrl: 'views/singsu.html'

            }).state("fank.dibu", { //底部
                url: "/dibu",
                templateUrl: 'views/dibu.html'

            }).state("buyt", { //采购商首页头部
                url: "/buyt",
                templateUrl: 'views/cg.html',
                controller: 'daoh',
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/haed.js',
                        ]);
                    }]
                }

            }).state("buyt.await", { //正在开发中页面
                url: "/await?staur",
                templateUrl: 'views/await.html'

            }).state("hoe", { //采购商首页头部2
                url: "/hoe",
                templateUrl: 'views/kas.html',
                controller: 'daoh',
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/haed.js',
                        ]);
                    }]
                }

            }).state("hoe.perinfor", { //公司信息完善
                url: "/perinfor",
                templateUrl: 'views/perfect-infor.html',
                controller: 'perfectInfor',
                controller: 'chenum'
            }).state("hoe.perinforSuccess", { //公司信息完善
                url: "/perinfor",
                templateUrl: 'views/perfect-success.html',
                controller: 'perfectInfor',
                controller: 'chenum'
            }).state("hoe.perinforFailure", { //公司信息完善
                url: "/perinfor",
                templateUrl: 'views/perfect-failure.html',
                controller: 'perfectInfor'
            }).state("buyt.buyer", { //采购商首页
                url: "/buyer?staur",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html',
                        controller: 'chenum'
                    },
                    'a@buyt.buyer': {
                        templateUrl: 'views/rigth.html'
                    },
                    'b@buyt.buyer': {
                        templateUrl: 'views/buyer.html'

                    }
                }
            }).state("buyt.cgs01-cgdd", { //采购管理-采购订单
                url: "/cgs01-cgdd?staur",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html',
                        controller: 'chenum'
                    },
                    'a@buyt.cgs01-cgdd': {
                        templateUrl: 'views/rigth.html'
                    },
                    'b@buyt.cgs01-cgdd': {
                        templateUrl: 'views/person/cgs01-cgdd.html',
                        controller: 'cgs01-cgdd'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/person/cgs01-cgdd.js',
                            'scripts/jquery.pagination.min.js'
                        ]);
                    }]
                }
            }).state("buyt.cgs01-fanxiu01", { //返修/退换商品 01
                url: "/cgs01-fanxiu01",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html',
                        controller: 'chenum'
                    },
                    'a@buyt.cgs01-fanxiu01': {
                        templateUrl: 'views/rigth.html'
                    },
                    'b@buyt.cgs01-fanxiu01': {
                        templateUrl: 'views/person/cgs01-fanxiu01.html',
                        controller: 'cgs01-fanxiu01'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/person/cgs01-fanxiu01.js',
                            'scripts/jquery.pagination.min.js'
                        ]);
                    }]
                }
            }).state("buyt.cgs01-fanxiu03", { //返修/退换商品 03
                url: "/cgs01-fanxiu03",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html',
                        controller: 'chenum'
                    },
                    'a@buyt.cgs01-fanxiu03': {
                        templateUrl: 'views/rigth.html'
                    },
                    'b@buyt.cgs01-fanxiu03': {
                        templateUrl: 'views/person/cgs01-fanxiu03.html',
                        controller: 'cgs01-fanxiu03'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/person/cgs01-fanxiu03.js',
                            'scripts/jquery.pagination.min.js'
                        ]);
                    }]
                }
            }).state("buyt.cgs01-fanxiu02-shenqing", { //返修/退换商品 - 申请   - 3.1.28.  申请 售后 页面接口
                url: "/cgs01-fanxiu02-shenqing",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html',
                        controller: 'chenum'
                    },
                    'a@buyt.cgs01-fanxiu02-shenqing': {
                        templateUrl: 'views/rigth.html'
                    },
                    'b@buyt.cgs01-fanxiu02-shenqing': {
                        templateUrl: 'views/person/cgs01-fanxiu02-shenqing.html',
                        controller: 'cgs01-fanxiu02-shenqing'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/person/cgs01-fanxiu02-shenqing.js'
                        ]);
                    }]
                }
            }).state("buyt.cgs01-fanxiu04-mingxi", { //返修/退换商品 - 退款明细
                url: "/cgs01-fanxiu04-mingxi",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html',
                        controller: 'chenum'
                    },
                    'a@buyt.cgs01-fanxiu04-mingxi': {
                        templateUrl: 'views/rigth.html'
                    },
                    'b@buyt.cgs01-fanxiu04-mingxi': {
                        templateUrl: 'views/person/cgs01-fanxiu04-mingxi.html',
                        controller: 'cgs01-fanxiu04-mingxi'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/person/cgs01-fanxiu04-mingxi.js'
                        ]);
                    }]
                }
            }).state("buyt.cgs01-fanxiu05-chakan", { //返修/退换商品 - 查看
                url: "/cgs01-fanxiu05-chakan",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html',
                        controller: 'chenum'
                    },
                    'a@buyt.cgs01-fanxiu05-chakan': {
                        templateUrl: 'views/rigth.html'
                    },
                    'b@buyt.cgs01-fanxiu05-chakan': {
                        templateUrl: 'views/person/cgs01-fanxiu05-chakan.html',
                        controller: 'cgs01-fanxiu05-chakan'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/person/cgs01-fanxiu05-chakan.js'
                        ]);
                    }]
                }
            }).state("buyt.cgs01-shangpinpingjia", { //商品评价-未评价订单
                url: "/cgs01-shangpinpingjia",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html',
                        controller: 'chenum'
                    },
                    'a@buyt.cgs01-shangpinpingjia': {
                        templateUrl: 'views/rigth.html'
                    },
                    'b@buyt.cgs01-shangpinpingjia': {
                        templateUrl: 'views/person/cgs01-shangpinpingjia.html',
                        controller: 'cgs01-shangpinpingjia'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/person/cgs01-shangpinpingjia.js',
                            'scripts/jquery.pagination.min.js'
                        ]);
                    }]
                }
            }).state("buyt.cgs01-shangpinpingjia2", { //商品评价-已评价订单
                url: "/cgs01-shangpinpingjia2",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html',
                        controller: 'chenum'
                    },
                    'a@buyt.cgs01-shangpinpingjia2': {
                        templateUrl: 'views/rigth.html'
                    },
                    'b@buyt.cgs01-shangpinpingjia2': {
                        templateUrl: 'views/person/cgs01-shangpinpingjia2.html',
                        controller: 'cgs01-shangpinpingjia2'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/person/cgs01-shangpinpingjia2.js',
                            'scripts/jquery.pagination.min.js'
                        ]);
                    }]
                }
            }).state("buyt.cgs01-wodeshoucang", { //我的收藏 - 我收藏的商品
                url: "/cgs01-wodeshoucang",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html',
                        controller: 'chenum'
                    },
                    'a@buyt.cgs01-wodeshoucang': {
                        templateUrl: 'views/rigth.html'
                    },
                    'b@buyt.cgs01-wodeshoucang': {
                        templateUrl: 'views/person/cgs01-wodeshoucang.html',
                        controller: 'cgs01-wodeshoucang'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/person/cgs01-wodeshoucang.js',
                            'scripts/jquery.pagination.min.js'
                        ]);
                    }]
                }
            }).state("buyt.cgs01-wodeshoucang2", { //我的收藏 - 我收藏的店铺
                url: "/cgs01-wodeshoucang2",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html',
                        controller: 'chenum'
                    },
                    'a@buyt.cgs01-wodeshoucang2': {
                        templateUrl: 'views/rigth.html'
                    },
                    'b@buyt.cgs01-wodeshoucang2': {
                        templateUrl: 'views/person/cgs01-wodeshoucang2.html',
                        controller: 'cgs01-wodeshoucang2'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/person/cgs01-wodeshoucang2.js',
                            'scripts/jquery.pagination.min.js'
                        ]);
                    }]
                }
            }).state("buyt.cgs01-tousuguanli", { //投诉管理
                url: "/cgs01-tousuguanli",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html',
                        controller: 'chenum'
                    },
                    'a@buyt.cgs01-tousuguanli': {
                        templateUrl: 'views/rigth.html'
                    },
                    'b@buyt.cgs01-tousuguanli': {
                        templateUrl: 'views/person/cgs01-tousuguanli.html',
                        controller: 'cgs01-tousuguanli'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/person/cgs01-tousuguanli.js',
                            'scripts/jquery.pagination.min.js'
                        ]);
                    }]
                }
            }).state("buyt.cgs01-tousuguanli2", { //投诉管理2
                url: "/cgs01-tousuguanli2",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html',
                        controller: 'chenum'
                    },
                    'a@buyt.cgs01-tousuguanli2': {
                        templateUrl: 'views/rigth.html'
                    },
                    'b@buyt.cgs01-tousuguanli2': {
                        templateUrl: 'views/person/cgs01-tousuguanli2.html',
                        controller: 'cgs01-tousuguanli2'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/person/cgs01-tousuguanli2.js',
                            'scripts/jquery.pagination.min.js'
                        ]);
                    }]
                }
            }).state("buyt.cgs01-tousuguanli3", { //投诉管理3 - 查看
                url: "/cgs01-tousuguanli3",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html',
                        controller: 'chenum'
                    },
                    'a@buyt.cgs01-tousuguanli3': {
                        templateUrl: 'views/rigth.html'
                    },
                    'b@buyt.cgs01-tousuguanli3': {
                        templateUrl: 'views/person/cgs01-tousuguanli3.html',
                        controller: 'cgs01-tousuguanli3'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/person/cgs01-tousuguanli3.js'
                        ]);
                    }]
                }
            }).state("buyt.cgs01-shangpuxiangqing", { //  商铺详情
                url: "/cgs01-shangpuxiangqing",

                templateUrl: 'views/person/cgs01-shangpuxiangqing.html',
                controller: 'cgs01-shangpuxiangqing',
                controller: 'chenum',

                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/person/cgs01-shangpuxiangqing.js'
                        ]);
                    }]
                }
            }).state("buyt.cgs01-dizhiguanli", { //  卖家电商管理- 账户设置 -收发货地址管理
                url: "/cgs01-dizhiguanli",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html',
                        controller: 'chenum'
                    },
                    'a@buyt.cgs01-dizhiguanli': {
                        templateUrl: 'views/SettingsSidebar.html'
                    },
                    'b@buyt.cgs01-dizhiguanli': {
                        templateUrl: 'views/person/cgs01-dizhiguanli.html',
                        controller: 'cgs01-dizhiguanli'

                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/person/cgs01-dizhiguanli.js'
                        ]);
                    }]
                }
            }).state("buyt.mjds01-home", { //  卖家电商管理-首页

                url: "/mjds01-home",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html',
                        controller: 'chenum'
                    },
                    'a@buyt.mjds01-home': {
                        templateUrl: 'views/rigth2.html'
                    },
                    'b@buyt.mjds01-home': {
                        templateUrl: 'views/person/mjds01-home.html',
                        controller: 'mjds01-home'

                    }

                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/person/mjds01-home.js'
                        ]);
                    }]
                }
            }).state("index.mjds01-spfb", { //  卖家电商管理-商品管理-商品发布  cl13.07
                url: "/mjds01-spfb?res",
                views: {
                    '': {
                        templateUrl: 'views/person/zheji.html',
                        controller: 'chenum'
                    },
                    'a@index.mjds01-spfb': {
                        templateUrl: 'views/person/rigth2.html'
                    },
                    'b@index.mjds01-spfb': {
                        templateUrl: 'views/person/mjds01-spfb.html',
                        controller: 'mjds01-spfb'

                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/person/mjds01-spfb.js'
                        ]);
                    }]
                }
            }).state("index.mjds01-spfb2", { //  卖家电商管理-商品管理-商品发布2
                url: "/mjds01-spfb2?id",
                views: {
                    '': {
                        templateUrl: 'views/person/zheji.html',
                        controller: 'chenum'
                    },
                    'a@index.mjds01-spfb2': {
                        templateUrl: 'views/person/rigth2.html'
                    },
                    'b@index.mjds01-spfb2': {
                        templateUrl: 'views/person/mjds01-spfb2.html',
                        controller: 'mjds01-spfb2'

                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/person/mjds01-spfb2.js'
                        ]);
                    }]
                }
            }).state("index.mjds01-zssp", { //  卖家电商管理-商品管理-在售/未上架商品
                url: "/mjds01-zssp",
                views: {
                    '': {
                        templateUrl: 'views/person/zheji.html',
                        controller: 'chenum'
                    },
                    'a@index.mjds01-zssp': {
                        templateUrl: 'views/rigth2.html'
                    },
                    'b@index.mjds01-zssp': {
                        templateUrl: 'views/person/mjds01-zssp.html',
                        controller: 'mjds01-zssp'

                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/person/mjds01-zssp.js',
                            'scripts/jquery.pagination.min.js'
                        ]);
                    }]
                }
            }).state("buyt.mjds01-bianjishangpin", { //  卖家电商管理-商品管理-在售/未上架商品
                url: "/mjds01-bianjishangpin",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html',
                        controller: 'chenum'
                    },
                    'a@buyt.mjds01-bianjishangpin': {
                        templateUrl: 'views/rigth2.html'
                    },
                    'b@buyt.mjds01-bianjishangpin': {
                        templateUrl: 'views/person/mjds01-bianjishangpin.html',
                        controller: 'mjds01-bianjishangpin'

                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/person/mjds01-bianjishangpin.js'
                        ]);
                    }]
                }
            }).state("buyt.mjds01-yimaichu", { //  卖家电商管理-交易管理-已卖出商品
                url: "/mjds01-yimaichu",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html',
                        controller: 'chenum'
                    },
                    'a@buyt.mjds01-yimaichu': {
                        templateUrl: 'views/rigth2.html'
                    },
                    'b@buyt.mjds01-yimaichu': {
                        templateUrl: 'views/person/mjds01-yimaichu.html',
                        controller: 'mjds01-yimaichu'

                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/person/mjds01-yimaichu.js',
                            'scripts/jquery.pagination.min.js'
                        ]);
                    }]
                }
            }).state("buyt.mjds01-jiaoyipingjia", { //  卖家电商管理-交易管理-交易评价管理
                url: "/mjds01-jiaoyipingjia",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html',
                        controller: 'chenum'
                    },
                    'a@buyt.mjds01-jiaoyipingjia': {
                        templateUrl: 'views/rigth2.html'
                    },
                    'b@buyt.mjds01-jiaoyipingjia': {
                        templateUrl: 'views/person/mjds01-jiaoyipingjia.html',
                        controller: 'mjds01-jiaoyipingjia'

                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/person/mjds01-jiaoyipingjia.js',
                            'scripts/jquery.pagination.min.js'
                        ]);
                    }]
                }
            }).state("buyt.mjds01-shouhoudingdan", { //  卖家电商管理-交易管理-售后订单处理
                url: "/mjds01-shouhoudingdan",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html',
                        controller: 'chenum'
                    },
                    'a@buyt.mjds01-shouhoudingdan': {
                        templateUrl: 'views/rigth2.html'
                    },
                    'b@buyt.mjds01-shouhoudingdan': {
                        templateUrl: 'views/person/mjds01-shouhoudingdan.html',
                        controller: 'mjds01-shouhoudingdan'

                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/person/mjds01-shouhoudingdan.js',
                            'scripts/jquery.pagination.min.js'
                        ]);
                    }]
                }
            }).state("buyt.mjds01-shouhoudingdan-xq", { //  卖家电商管理-交易管理-售后订单处理-详情  15:00
                url: "/mjds01-shouhoudingdan-xq",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html',
                        controller: 'chenum'
                    },
                    'a@buyt.mjds01-shouhoudingdan-xq': {
                        templateUrl: 'views/rigth2.html'
                    },
                    'b@buyt.mjds01-shouhoudingdan-xq': {
                        templateUrl: 'views/person/mjds01-shouhoudingdan-xq.html',
                        controller: 'mjds01-shouhoudingdan-xq'

                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/person/mjds01-shouhoudingdan-xq.js'
                        ]);
                    }]
                }
            }).state("buyt.mjds01-yimaichu-ddxq", { //  卖家电商管理-交易管理-已卖出商品-订单详情
                url: "/mjds01-yimaichu-ddxq?id",
                views: {
                    '': {
                        templateUrl: 'views/person/mjds01-yimaichu-ddxq.html',
                        controller: 'chenum'

                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/person/mjds01-yimaichu-ddxq.js'
                        ]);
                    }]
                }
            }).state("buyt.mjds01-yimaichu-ddxq2", { //  卖家电商管理-交易管理-已卖出商品-订单详情2
                url: "/mjds01-yimaichu-ddxq2",
                views: {
                    '': {
                        templateUrl: 'views/person/mjds01-yimaichu-ddxq2.html',
                        controller: 'mjds01-yimaichu-ddxq2',
                        controller: 'chenum'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/person/mjds01-yimaichu-ddxq2.js'
                        ]);
                    }]
                }
            }).state("buyt.mjds01-tousuguanli", { //  卖家电商管理-交易管理-投诉管理
                url: "/mjds01-tousuguanli",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html',
                        controller: 'chenum'
                    },
                    'a@buyt.mjds01-tousuguanli': {
                        templateUrl: 'views/rigth2.html'
                    },
                    'b@buyt.mjds01-tousuguanli': {
                        templateUrl: 'views/person/mjds01-tousuguanli.html',
                        controller: 'mjds01-tousuguanli'

                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/person/mjds01-tousuguanli.js',
                            'scripts/jquery.pagination.min.js'
                        ]);
                    }]
                }
            }).state("buyt.mjds01-shangpinfenlei", { //  我的店铺-商品分类设置
                url: "/mjds01-shangpinfenlei",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html',
                        controller: 'chenum'
                    },
                    'a@buyt.mjds01-shangpinfenlei': {
                        templateUrl: 'views/rigth2.html'
                    },
                    'b@buyt.mjds01-shangpinfenlei': {
                        templateUrl: 'views/person/mjds01-shangpinfenlei.html',
                        controller: 'mjds01-shangpinfenlei'

                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/person/mjds01-shangpinfenlei.js'
                        ]);
                    }]
                }
            }).state("buyt.perinfor", { //公司信息完善
                url: "/perinfor?staur",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html',
                        controller: 'chenum'
                    },
                    'a@buyt.perinfor': {
                        templateUrl: 'views/SettingsSidebar.html'
                    },
                    'b@buyt.perinfor': {
                        templateUrl: 'views/perfect-infor.html',
                        controller: 'perfectInfor'
                    }
                }
            }).state("buyt.perinforSuccess", { //公司信息完善成功
                url: "/perinforSuccess?staur",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html',
                        controller: 'chenum'
                    },
                    'a@buyt.perinforSuccess': {
                        templateUrl: 'views/SettingsSidebar.html'
                    },
                    'b@buyt.perinforSuccess': {
                        templateUrl: 'views/perfect-success.html',
                        controller: 'perfect'
                    }
                }
            }).state("buyt.perinforFailure", { //公司信息完善失败
                url: "/perinforFailure",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html',
                        controller: 'chenum'
                    },
                    'a@buyt.perinforFailure': {
                        templateUrl: 'views/rigth1.html'
                    },
                    'b@buyt.perinforFailure': {
                        templateUrl: 'views/perfect-failure.html'
                    }
                }
            }).state("buyt.perinforWait", { //公司信息完善认证请求等待
                url: "/perinforWait",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html',
                        controller: 'chenum'
                    },
                    'a@buyt.perinforWait': {
                        templateUrl: 'views/rigth1.html'
                    },
                    'b@buyt.perinforWait': {
                        templateUrl: 'views/perfect-wait.html',
                        controller: 'perfectInfor'
                    }
                }
            }).state("buyt.credit", { //信用认证
                url: "/credit",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html',
                        controller: 'chenum'
                    },
                    'a@buyt.credit': {
                        templateUrl: 'views/rigth.html'
                    },
                    'b@buyt.credit': {
                        templateUrl: 'views/credit.html'
                    }
                }
            })
            .state("buyt.cgjh", { //发布采购计划
                url: "/cgjh?staur",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html',
                        controller: 'chenum'
                    },
                    'a@buyt.cgjh': {
                        templateUrl: 'views/fbcgjh-r.html'
                    },
                    'b@buyt.cgjh': {
                        templateUrl: 'views/fbcgjh.html',
                        controller: 'zbids'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/ztbbids.js',
                            'scripts/controllers/prfenl.js',
                        ]);
                    }]
                }
            }).state("buyt.xgcgjh", { //修改采购计划
                url: "/xgjh?spid&staur",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html',
                        controller: 'chenum'
                    },
                    'a@buyt.xgcgjh': {
                        templateUrl: 'views/fbcgjh-r.html'
                    },
                    'b@buyt.xgcgjh': {
                        templateUrl: 'views/xgcgjh.html',
                        controller: 'daoh'
                    }
                }
            }).state("buyt.ckjh", { //查看采购计划
                url: "/ckjh?spid&staur",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html'
                    },
                    'a@buyt.ckjh': {
                        templateUrl: 'views/fbcgjh-r.html'
                    },
                    'b@buyt.ckjh': {
                        templateUrl: 'views/ckcgjh.html',
                        controller: 'ck',
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/sttt.js',
                        ]);
                    }]
                }
            }).state("buyt.fbcg", { //发布采购计划成功
                url: "/fbcg?staur",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html'
                    },
                    'a@buyt.fbcg': {
                        templateUrl: 'views/fbcgjh-r.html'
                    },
                    'b@buyt.fbcg': {
                        templateUrl: 'views/fbcg.html'
                    }
                }
            }).state("buyt.glcgjh", { //管理采购计划
                url: "/glcgjh?staur",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html'
                    },
                    'a@buyt.glcgjh': {
                        templateUrl: 'views/fbcgjh-r1.html'
                    },
                    'b@buyt.glcgjh': {
                        templateUrl: 'views/glcgjh.html'
                    }
                }
            }).state("buyt.gyb", { //已发布采购计划
                url: "/gyb?staur",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html'
                    },
                    'a@buyt.gyb': {
                        templateUrl: 'views/fbcgjh-r1.html'
                    },
                    'b@buyt.gyb': {
                        templateUrl: 'views/g-yfb.html',
                        controller: 'qb',
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/qb.js',
                        ]);
                    }]
                }
            }).state("buyt.bid", { //开标信息
                url: "/bid?staur",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html'
                    },
                    'a@buyt.bid': {
                        templateUrl: 'views/fbcgjh-r1.html'
                    },
                    'b@buyt.bid': {
                        templateUrl: 'views/openbid.html'
                    }
                }
            }).state("buyt.ckkb", { //查看二次开标
                url: "/ckkb?staur",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html'
                    },
                    'a@buyt.ckkb': {
                        templateUrl: 'views/fbcgjh-r2.html'
                    },
                    'b@buyt.ckkb': {
                        templateUrl: 'views/ckkb.html'
                    }
                }
            }).state("buyt.look", { //查看报价
                url: "/look?staur",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html'
                    },
                    'a@buyt.look': {
                        templateUrl: 'views/fbcgjh-r2.html'
                    },
                    'b@buyt.look': {
                        templateUrl: 'views/look.html',
                        controller: 'ckbj',

                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/sttt.js',
                        ]);
                    }]
                }
            }).state("buyt.offer", { //报价
                url: "/offer",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html'
                    },
                    'a@buyt.offer': {
                        templateUrl: 'views/fbcgjh-r2.html'
                    },
                    'b@buyt.offer': {
                        templateUrl: 'views/offer.html',
                        controller: 'bj',
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/sttt.js',
                        ]);
                    }]
                }
            }).state("buyt.qrfh", { //投标确认发货
                url: "/wqrf",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html'
                    },
                    'a@buyt.qrfh': {
                        templateUrl: 'views/fbcgjh-r2.html'
                    },
                    'b@buyt.qrfh': {
                        templateUrl: 'views/qrfh.html',
                        controller: 'order',
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/sttt.js',
                        ]);
                    }]
                }

            }).state("buyt.tb", { //我的投标
                url: "/tb",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html'
                    },
                    'a@buyt.tb': {
                        templateUrl: 'views/fbcgjh-r2.html'
                    },
                    'b@buyt.tb': {
                        templateUrl: 'views/wdtb.html'
                    }
                }
            }).state("buyt.wd", { //我未参加的投标
                url: "/wd",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html'
                    },
                    'a@buyt.wd': {
                        templateUrl: 'views/fbcgjh-r2.html'
                    },
                    'b@buyt.wd': {
                        templateUrl: 'views/wd-tb.html'
                    }
                }
            }).state('index.bilh', { //联合采购首页
                url: '/bilh',
                views: {
                    '': {
                        templateUrl: 'views/heye.html'
                    },
                    'a@index.bilh': {
                        templateUrl: 'views/biddinglh.html',
                        controller: 'homepage'
                    },
                    'b@index.bilh': {
                        templateUrl: 'views/dibu.html'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/unite.js',
                        ]);
                    }]
                }
            }).state("buyt.fblh", { //发布联合采购计划
                url: "/fblh?staur",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html'
                    },
                    'a@buyt.fblh': {
                        templateUrl: 'views/joint/lhecag-r.html'
                    },
                    'b@buyt.fblh': {
                        templateUrl: 'views/joint/liancaig.html',
                        controller: 'unt'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/unite.js',
                            'scripts/controllers/prfenl.js',
                        ]);
                    }]
                }
            }).state("buyt.sqxqlh", { //详情联合采购计划
                url: "/xqlh?spid&staur",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html'
                    },
                    'a@buyt.sqxqlh': {
                        templateUrl: 'views/joint/lhecag-r.html'
                    },
                    'b@buyt.sqxqlh': {
                        templateUrl: 'views/joint/details.html',
                        controller: 'xqlh'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/unite.js',
                        ]);
                    }]
                }
            }).state("buyt.xglh", { //修改联合采购计划
                url: "/xglh?spid&staur",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html'
                    },
                    'a@buyt.xglh': {
                        templateUrl: 'views/joint/lhecag-r.html'
                    },
                    'b@buyt.xglh': {
                        templateUrl: 'views/joint/reviseplan.html',
                        controller: 'xgg'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/unite.js',
                            'scripts/controllers/prfenl.js',
                        ]);
                    }]
                }
            }).state("buyt.suclh", { //发布联合采购计划成功
                url: "/suclh?staut&staur",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html'
                    },
                    'a@buyt.suclh': {
                        templateUrl: 'views/joint/lhecag-r.html'
                    },
                    'b@buyt.suclh': {
                        templateUrl: 'views/joint/lh-succse.html',
                        controller: 'succse'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/unite.js',
                        ]);
                    }]
                }
            }).state("buyt.glcglh", { //联合采购列表
                url: "/glcglh?staur",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html'
                    },
                    'a@buyt.glcglh': {
                        templateUrl: 'views/joint/lhecag-r2.html'
                    },
                    'b@buyt.glcglh': {
                        templateUrl: 'views/joint/lhcglb.html',
                        controller: 'lb'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/unite.js',
                            'scripts/controllers/prfenl.js',
                        ]);
                    }]
                }
            }).state("buyt.del", { //删除联合计划成功
                url: "/lhdel?staur",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html'
                    },
                    'a@buyt.del': {
                        templateUrl: 'views/joint/lhecag-r2.html'
                    },
                    'b@buyt.del': {
                        templateUrl: 'views/joint/lh-del.html'
                    }
                }
            }).state("buyt.bzjlh", { //联合支付保证金
                url: "/bzjlh?staur&bidd",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html'
                    },
                    'a@buyt.bzjlh': {
                        templateUrl: 'views/joint/lhecag-r3.html'
                    },
                    'b@buyt.bzjlh': {
                        templateUrl: 'views/joint/lhbzj.html',
                        controller: 'deposit'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/unite.js',
                        ]);
                    }]
                }
            }).state("buyt.bmlh", { //招募信息报名
                url: "/bmlh?staur&spid",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html'
                    },
                    'a@buyt.bmlh': {
                        templateUrl: 'views/joint/lhecag-r2.html'
                    },
                    'b@buyt.bmlh': {
                        templateUrl: 'views/joint/lhbj.html',
                        controller: 'recruit'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/unite.js',
                        ]);
                    }]
                }
            }).state("buyt.pur", { //采购商报名
                url: "/pur?staur&spid",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html'
                    },
                    'a@buyt.pur': {
                        templateUrl: 'views/joint/lhecag-r2.html'
                    },
                    'b@buyt.pur': {
                        templateUrl: 'views/joint/purchaser.html',
                        controller: 'purcjion'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/unite.js',
                        ]);
                    }]
                }
            }).state("buyt.xxlh", { //联合详细信息
                url: "/xxlh?staur",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html'
                    },
                    'a@buyt.xxlh': {
                        templateUrl: 'views/joint/lhecag-r2.html'
                    },
                    'b@buyt.xxlh': {
                        templateUrl: 'views/joint/detailedxx.html',
                        controller: 'lhxx'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/unite.js',
                        ]);
                    }]
                }
            }).state("buyt.inlh", { //联合查看信息
                url: "/inlh?staur",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html'
                    },
                    'a@buyt.inlh': {
                        templateUrl: 'views/joint/lhecag-r3.html'
                    },
                    'b@buyt.inlh': {
                        templateUrl: 'views/joint/Get Info.html',
                        controller: 'lhck'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/unite.js',
                        ]);
                    }]
                }
            }).state("buyt.makelh", { //联合查看报价
                url: "/makelh?staur&spid",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html'
                    },
                    'a@buyt.makelh': {
                        templateUrl: 'views/joint/lhecag-r3.html'
                    },
                    'b@buyt.makelh': {
                        templateUrl: 'views/joint/make.html',
                        controller: 'quote'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/unite.js',
                        ]);
                    }]
                }

            }).state("buyt.cgbmlh", { //采购商报名
                url: "/cgbmlh?staur&bidd",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html'
                    },
                    'a@buyt.cgbmlh': {
                        templateUrl: 'views/joint/lhecag-r2.html'
                    },
                    'b@buyt.cgbmlh': {
                        templateUrl: 'views/joint/procurer.html',
                        controller: 'sk'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/unite.js',
                        ]);
                    }]
                }
            }).state("buyt.zblh", { //中标查看
                url: "/zblh?staur",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html'
                    },
                    'a@buyt.zblh': {
                        templateUrl: 'views/joint/lhecag-r3.html'
                    },
                    'b@buyt.zblh': {
                        templateUrl: 'views/joint/win.html',
                        controller: 'lhlook'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/unite.js',
                        ]);
                    }]
                }
            }).state("buyt.bjjlh", { //我的报价信息
                url: "/bjjlh?staur",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html'
                    },
                    'a@buyt.bjjlh': {
                        templateUrl: 'views/joint/lhecag-r3.html'
                    },
                    'b@buyt.bjjlh': {
                        templateUrl: 'views/joint/quotation.html',
                        controller: 'bjlb'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/unite.js',
                            'scripts/controllers/prfenl.js',
                        ]);
                    }]
                }
            }).state("buyt.openlh", { //开标
                url: "/openlh?staur",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html'
                    },
                    'a@buyt.openlh': {
                        templateUrl: 'views/joint/lhecag-r2.html'
                    },
                    'b@buyt.openlh': {
                        templateUrl: 'views/joint/opening.html',
                        controller: 'lhkb'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/unite.js',
                        ]);
                    }]
                }
            }).state("index.zll", { //修改密码
                url: "/zll",
                views: {
                    '': {
                        templateUrl: 'views/personal center/zheji.html'
                    },
                    'a@index.zll': {
                        templateUrl: 'views/personal center/ringth1.html'
                    },
                    'b@index.zll': {
                        templateUrl: 'views/personal center/xiu.html'
                    }
                }
            }).state("index.cipher", { //密码问题保护
                url: "/cipher",
                views: {
                    '': {
                        templateUrl: 'views/personal center/zheji.html'
                    },
                    'a@index.cipher': {
                        templateUrl: 'views/personal center/ringth1.html'
                    },
                    'b@index.cipher': {
                        templateUrl: 'views/personal center/cipher.html'
                    }
                }
            }).state("buyt.supplh", { //供应商报名
                url: "/supplh?staur&bidd",
                views: {
                    '': {
                        templateUrl: 'views/cheye.html'
                    },
                    'a@buyt.supplh': {
                        templateUrl: 'views/joint/lhecag-r3.html'
                    },
                    'b@buyt.supplh': {
                        templateUrl: 'views/joint/supplier.html',
                        controller: 'supp'
                    }
                },
                resolve: {
                    load: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'scripts/controllers/unite.js',
                        ]);
                    }]
                }
            }).state("index.publicity", {
                url: "/publicity",
                templateUrl: 'views/publicity.html',
                controller: "publicity"

            }).state("recruit", {
                url: "/recruit",
                templateUrl: 'views/recruit.html',
                controller: "recr"

            }).state("register", { //注册
                url: "/register",
                templateUrl: 'views/register.html',
            }).state("register.rigc", { //注册
                url: "/rigc",
                templateUrl: 'views/rig1.html',
                controller: 'rigct'
            }).state("register.registSuccess", { //注册
                url: "/registSuccess",
                templateUrl: 'views/registSuccess.html',
            })

        $urlRouterProvider.when("", "/toubu/synr").otherwise("/toubu/synr")

        //   //全局配置  

    }]).service('hexafy', function() {
        this.myFunc = {}
    }).directive('colorw', ['$document', "$http", function($document, $http) {
        return {
            restrict: 'ACE',
            scope: {
                data: '='
            },
            link: function(scope, element, attrs) {

                element.on('click', function() {
                    //              console.log(scope.data)
                    //              localStorage.data = scope.data;
                    angular.element(document.querySelector('.f-qb')).find('li').removeClass('ac')
                    element.addClass('ac')
                });
            }
        }
    }]).directive('wo', ['$document', "$http", '$state', '$timeout', function($document, $http, $state, $timeout) {
        return {
            restrict: 'ACE',
            scope: false,
            template: '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" >\
    <div class="modal-dialog">\
        <div class="modal-content"  aria-hidden="true" >\
            <div class="modal-body" ng-bild="warn">{{warn}}</div>\
            <div class="modal-footer">\
                <button type="button" class="btn btn-default" data-dismiss="modal" style="border:1px solid #ccc" >关闭</button>\
                <button type="button"  class="btn btn-success" data-dismiss="modal"  ng-if="lhurl" ng-click="po()" >{{look}}</button>\
            </div>\
        </div>\
    </div>\
</div>',
            link: function(scope, element, attrs) {
                scope.po = function() {
                    console.log(scope.isActive)
                    if (scope.lhurl == 'buyt.perinfor') {
                        scope.isActive = 9
                    }

                    var w = 1
                    $('#myModal').modal('hide')
                    angular.element("body").removeClass('modal-open')
                    angular.element(".modal-backdrop").remove()
                    $timeout(function() {
                        $state.go(scope.lhurl, scope.lju);
                    }, 0)


                }
                //console.log('2222')
                //              $('#myModal').on('hidden.bs.modal', function (e) {
                //              console.log('2222')
                //              if(scope.lhurl){
                //                  console.log('1')
                //            $state.go(scope.lhurl);
                //                }else{
                //                  console.log('55')
                //                }
                //        }); 



                //jQuery(window).bind("unload", function() {
                //  console.log('pppp')
                //})
                //          
            }
        }
    }])
    /*.controller('mainCtl',['$scope',function ($scope){
        
    }])*/
    .directive('model', ['$document', "$http", '$state', '$timeout', function($document, $http, $state, $timeout) {
        return {
            restrict: 'ACE',
            scope: false,
            template: '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" >\
    <div class="modal-dialog">\
        <div class="modal-content"  aria-hidden="true" >\
            <div class="modal-body" ng-bild="warn">{{warn}}</div>\
            <div class="modal-footer">\
                <button type="button" class="btn btn-default" data-dismiss="modal" style="border:1px solid #ccc" >关闭</button>\
            </div>\
        </div>\
    </div>\
</div>',
            link: function(scope, element, attrs) {
                scope.po = function() {
                    console.log(scope.isActive)
                    if (scope.lhurl == 'buyt.perinfor') {
                        scope.isActive = 9
                    }

                    var w = 1
                    $('#myModal').modal('hide')
                    angular.element("body").removeClass('modal-open')
                    angular.element(".modal-backdrop").remove()
                    $timeout(function() {
                        $state.go(scope.lhurl, scope.lju);
                    }, 0)


                }
                //console.log('2222')
                //              $('#myModal').on('hidden.bs.modal', function (e) {
                //              console.log('2222')
                //              if(scope.lhurl){
                //                  console.log('1')
                //            $state.go(scope.lhurl);
                //                }else{
                //                  console.log('55')
                //                }
                //        }); 



                //jQuery(window).bind("unload", function() {
                //  console.log('pppp')
                //})
                //          
            }
        }
    }]).directive('housr', ['$document', function($document) {
    	return {
    		  restrict: 'ACE',
            template: '<span>Hi！{{namou}}</span>',
    		 scope: true,
            link: function($scope, element, attrs) {
            	var date = new Date();
            	var hours = date.getHours();
            	console.log(hours)
            	//$scope.namou='上午好';
            	if(hours>0&&hours<=12){
            		$scope.namou='上午好';
            	
            		
            	}
            	if(hours>12&&hours<=18){
            		$scope.namou='下午好'
            	}
            	if(hours>18&&hours<=24){
            		$scope.namou='晚上好'
            	}
            	
            }
    	}
    	
    	
    }])
    .directive('goTop', ['$document', function($document) {
        return {
            restrict: 'ACE',
            //继承父元素的作用域
            scope: false,
            link: function(scope, element, attrs) {
                element.on('click', function() {
                    $('html, body').animate({ //添加animate动画效果  
                        scrollTop: 0
                    }, 1000);
                });
            }
        }
    }]).directive('color', ['$document', "$http", function($document, $http) {
        return {
            restrict: 'ACE',
            scope: {
                data: '='
            },
            link: function(scope, element, attrs) {

                element.on('click', function() {
                    console.log(scope.isActive)
                    scope.isActive = scope.data;
                    //  angular.element(document.querySelector('.nav1')).find('li').removeClass('active1')
                    // element.addClass('active1')
                });
            }
        }
    }]).directive('colore', ['$document', "$http", "commonHttp", 'readJson', function($document, $http, commonHttp, readJson) {
        return {
            restrict: 'ACE',
            template: '<div class="l-b zhulinlin"><div class="ul-a" id="erdh"><li  ng-repeat=" pro in data.category.categories" enter-show data-code="{{pro.code}}"><a class="a"><i class="{{pro.url}}" style="margin-right: 5px; font-size:14px;"></i><a>{{pro.name}}</a><span></span></a></li></div><div class="yMenuListCon" style="display: none;"><div class="erji" ><kz><div class="zllwein clearfloat" ng-repeat="sub in subs" class="clearfix"><nh>{{sub.name}}> </nh><kk><sc ng-repeat=" small in sub.subMenuList" ui-sref="index.lb({code:small.code,word:small.name})">{{small.name}}</sc></kk></div></kz></div></div></div>',
            scope: true,
            link: function($scope, element, attrs) {

                // 商品分类列表,需要传递的数据
                var str = JSON.stringify({
                    "category": {
                        "memberId": "1",
                        "channel": "1",
                        "deviceNo": "2",
                        "functionCode": "MALLINDEX_CATEGORY",
                        "startRow": 0,
                        "pageSize": 0
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
                                "requestType": "PRODUCTCATEGORIES",
                                "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                                // new Date().format('yyyy-MM-dd
                                // hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                            },
                            "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
                        }
                    }
                });
                var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
                //  var ms=readJson.getJson(md5_obj,data_obj);
                //  console.log(ms);
                // 子菜单数据
                $scope.subAll = [];
                var ms = readJson.getJson(md5_obj, data_obj);
                //console.log(ms)
                ms.then(function(response) {
                    //  console.log(response.data)
                    if (response.data.packageList) {
                        var jiami = response.data.packageList.packages.response;
                        var jiemi_json = JSON.parse(DES3.decrypt("", jiami));
                        var code = response.data.packageList.packages.header.responseCode;
                        var errorMessage = response.data.packageList.packages.header.errorMessage;
                        //readson.getson(code)
                        //console.log(jiemi_json)
                        $scope.data = jiemi_json
                        //  scope.$emit('subs', jiemi_json.category.categories);

                    } else {
                        console.log(response)
                    }
                }, function(reason) {
                    console.log('Failed: ' + reason);
                }, function(update) {
                    console.log('Got notification: ' + update);
                })
                // 获取分类菜单数据的接口
                //              commonHttp.myHttp(md5_obj, data_obj, function(data) {
                //                 
                //                  $scope.data = JSON.parse(data);
                //                    console.log( $scope.data)
                //
                //              });
            }
        }
    }])
    .directive('sorol', ['$document', "$http", "commonHttp", function($document, $http, commonHttp) {

        //产品列表的详细信息是否显示
        return {
            restrict: 'ACE',
            scope: false,
            link: function(scope, element, attrs) {
                var $e = angular.element
                var count = scope.product.imageUrls.length - 4; /* 显示 5 个 li标签内容 */
                var interval = 120;
                var curIndex = 0;
                element.bind("click", function() {
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
                    }, 1000);

                })
            }
        }
    }])
    .directive('enterShow', ['$document', "$http", "commonHttp", 'readJson', function($document, $http, commonHttp, readJson) {

        //产品列表的详细信息是否显示
        return {
            restrict: 'ACE',
            scope: {},
            link: function(scope, element, attrs) {
                var $e = angular.element

                element.bind("mouseenter", function() {



                    var str = JSON.stringify({
                        "category": {
                            "memberId": "1",
                            "channel": "1",
                            "deviceNo": "2",
                            "functionCode": "SUBMENU",
                            "categoryCode": element.data('code'),
                            "startRow": 0,
                            "pageSize": 0,
                            "productType": "PRO_CATEGORY"
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
                                    "requestType": "PRODUCTCATEGORIES",
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
                        console.log(JSON.parse(data).category.categories);
                        scope.$emit('subs', JSON.parse(data).category.categories);
                        //scope.$emit('subs',JSON.parse(data).category.categories); 
                    });

                    $e(".yMenuListCon").show();
                    var index = $e(this).index(".ul-a li");
                    if (!($e(this).hasClass("menulihover") || $e(this).hasClass("menuliselected"))) {


                    }
                    $e(this).addClass("menulihover").siblings().removeClass("menulihover");
                    $e(this).addClass("menuliselected").siblings().removeClass("menuliselected");

                })
                $e(".l-b").mouseleave(function() {
                    $e(".yMenuListCon").hide();
                    //$e(".yMenuListConin").hide();
                    $e(".ul-a li").removeClass("menulihover");

                })
            }
        }
    }]).directive('search', ['$document', "$http", "commonHttp", function(commonHttp, $http, $document) {

        //产品列表的详细信息是否显示
        return {
            restrict: 'ACE',
            scope: {},
            template: '<div class="ss-k" id="myDropdown">\
    <div class="sak dropdown" id="ssk" is-show>\
        <span id="sl" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
            <l id="lkk">{{SearchData.business}}</l><b></b>\
        </span>\
    </div>\
    <form id="fm" ng-submit="searchList()">\
        <input id="inp" type="text" ng-model="vm.searchContent.content" placeholder="{{placeholde}}" value="vm.searchContent.content" />\
    </form>\
</div>\
<div class="sc-an" ui-sref="index.search({Keyword:vm.searchContent.content})">\
    <button type="submit" form="fm" ng-click="searchList()"></button>\
</div>',
            controller: function($scope, $stateParams) {
                $scope.Keyword = $stateParams.Keyword;
            },
            // replace:true,
            link: function(scope, element, attrs) {
                var $e = angular.element
                var vm = this;
                //搜索框 下拉
                scope.SearchData = {
                    'business': '商品',
                    'buy': '求购',
                    'company': '公司'
                }
                scope.placeholde = '搜索 同鑫 商品';

                var SBusi = document.getElementById('lkk');
                var SBuy = document.getElementById('ll');
                var SCom = document.getElementById('lk');


                scope.changeInfo = function(e) {

                    var Business = SBusi.innerHTML;
                    SBusi.innerHTML = e.target.innerHTML;
                    e.target.innerHTML = Business;

                    if (SBusi.innerHTML == '公司') {
                        scope.placeholde = "请输入公司名称或关键词来搜索公司信息"
                    } else if (SBusi.innerHTML == '求购') {
                        scope.placeholde = "请输入关键词来搜索求购信息"
                    } else if (SBusi.innerHTML == '商品') {
                        scope.placeholde = "请输入产品名或关键词进行搜索商品信息"
                    }
                }
                //搜索框输入的内容


                // scope.searchList = function() {
                //     vm.searchContent = {
                //         'content': ''
                //     }
                //     console.log(scope.Keyword)
                //     console.log(vm.searchContent.content)
                //     // var searchStr = JSON.stringify({
                //     //     "search": {
                //     //         "memberId": "1",
                //     //         "channel": "1",
                //     //         "deviceNo": "2",
                //     //         "functionCode": "PROFORMSOLR",
                //     //         "startRow": 0,
                //     //         "pageSize": 8,
                //     //         "keyWord": scope.Keyword,
                //     //         "categoryCode": '',
                //     //         "propCode": ""
                //     //     }
                //     // });

                //     console.log(searchStr)
                //     // 按照指定格式传递的数据
                //     // var data_objSearch = JSON.stringify({
                //     //     "packageList": {
                //     //         "packages": {
                //     //             "header": {
                //     //                 "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                //     //                 "comId": "CTO2O20170420",
                //     //                 "comSerial": "comSerial",
                //     //                 "from": "PAD",
                //     //                 "orderSerial": "orderId",
                //     //                 "requestType": "PROLISTFORMSOLR",
                //     //                 "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                //     //                 // new Date().format('yyyy-MM-dd
                //     //                 // hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                //     //             },
                //     //             "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', searchStr)
                //     //         }
                //     //     }
                //     // });

                //     // var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_objSearch);
                //     // commonHttp.myHttp(md5_obj, data_objSearch, function(data) {

                //     //     $scope.productList = JSON.parse(data).search.productList;

                //     //     $scope.brandList = JSON.parse(data).search.brandList;
                //     //     $scope.specList = JSON.parse(data).search.specList;

                //     //     $scope.total = JSON.parse(data).search.totalSzie;


                //     // });
                // } //end search func

            }
        }
    }])
    .directive('isShow', [function() {
        //搜索框的隐藏菜单是否显示
        return {
            restrict: 'ACE',
            link: function(scope, element, attrs) {
                element.on('mouseenter', function() {
                    element.children('#sl').children('b').addClass('hover');
                    element.children('#skx').show();
                })
                element.on('mouseleave', function() {
                    element.children('#sl').children('b').removeClass('hover');
                    element.children('#skx').hide();
                })
            }
        }
    }])
    .directive('scrollPos', ['$document', function($document) {
        return {
            restrict: 'A',
            scope: false,
            link: function(scope, element, attrs) {
                var pos = element.data("postion");
                scope.index = element.index();
                element.on('click', function() {
                    $document.scrollTop(pos);
                    /*if(element.index()==8){
                        element.data('n','ok');
                        console.log(element.data('n'));
                    }*/

                })
            }
        }
    }]).directive('nameType', [function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                //              let name = element.data('nameType');
                scope.$watch('icons', function(e) {
                    try {
                        scope.artTemp = e.slice(0, 6);
                    } catch (e) {

                    }
                });
                element.on('click', function() {
                    element.css({ 'background': 'red' }).siblings().css({ 'background': '' });
                    if (scope.isAct && scope.artTemp) {
                        scope.isAct = false;
                        if (name === 'cgs') {
                            scope.artTemp = scope.icons.slice(0, 6);
                        } else if (name === 'gys') {
                            scope.artTemp = scope.icons.slice(6, 12);
                        } else if (name === 'zjf') {
                            scope.artTemp = scope.icons.slice(12, 18);
                        }
                    }
                    scope.isAct = true;
                })
            }
        }
    }]).directive('switcher', ['commonHttp', function(commonHttp) {
        return {
            restrict: "A",
            link: function(scope, element, attrs) {
                element.on('click', function() {
                    var code = element.data("cacode");

                    element.parent().parent().siblings('.lw').hide();
                    element.parent().parent().siblings('.lq').show();
                    var str1 = JSON.stringify({
                        "search": {
                            "memberId": "1",
                            "channel": "1",
                            "deviceNo": "2",
                            "functionCode": "PROBYCATE",
                            "startRow": 0,
                            "pageSize": 10,
                            "categoryCode": code,
                            "propCode": ""
                        }
                    });
                    //按照指定格式传递的数据
                    var data_obj1 = JSON.stringify({
                        "packageList": {
                            "packages": {
                                "header": {
                                    "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                                    "comId": "CTO2O20170420",
                                    "comSerial": "comSerial",
                                    "from": "PAD",
                                    "orderSerial": "orderId",
                                    "requestType": "PROLISTBYCATE",
                                    "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                                    //new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                                },
                                "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str1)
                            }
                        }
                    });
                    var md5_obj2 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj1);
                    commonHttp.myHttp(md5_obj2, data_obj1, function(data) {
                        scope.product = JSON.parse(data).search.productList;
                        scope.$emit('product', JSON.parse(data).search.productList);
                        console.log(scope.product);
                    });

                })
            }
        }
    }]).directive('myPagination', function() {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                option: '=pageOption'
            },
            template: '<ul class="pagination">' +
                '<li ng-click="pageClick(p)" ng-repeat="p in page" class="{{option.curr==p?\'active\':\'\'}}">' +
                '<a href="javascript:;">{{p}}</a>' +
                '</li>' +
                '</ul>',
            link: function($scope) {
                //容错处理
                //         console.log('link');
                $scope.$watch('option', function(option) {
                    try {
                        if (!$scope.option.curr || isNaN($scope.option.curr) || $scope.option.curr < 1) $scope.option.curr = 1;
                        if (!$scope.option.all || isNaN($scope.option.all) || $scope.option.all < 1) $scope.option.all = 1;
                        if ($scope.option.curr > $scope.option.all) $scope.option.curr = $scope.option.all;
                        if (!$scope.option.count || isNaN($scope.option.count) || $scope.option.count < 1) $scope.option.count = 10;
                        //得到显示页数的数组
                        $scope.page = getRange($scope.option.curr, $scope.option.all, $scope.option.count);
                    } catch (e) {

                    }

                });

                //绑定点击事件
                $scope.pageClick = function(page) {
                    if (page == '«') {
                        page = parseInt($scope.option.curr) - 1;
                    } else if (page == '»') {
                        page = parseInt($scope.option.curr) + 1;
                    }
                    if (page < 1) page = 1;
                    else if (page > $scope.option.all) page = $scope.option.all;
                    //点击相同的页数 不执行点击事件
                    if (page == $scope.option.curr) return;
                    if ($scope.option.click && typeof $scope.option.click === 'function') {
                        $scope.option.click(page);
                        $scope.option.curr = page;
                        $scope.page = getRange($scope.option.curr, $scope.option.all, $scope.option.count);
                    }
                };

                //返回页数范围（用来遍历）
                function getRange(curr, all, count) {
                    //计算显示的页数
                    curr = parseInt(curr);
                    all = parseInt(all);
                    count = parseInt(count);
                    var from = curr - parseInt(count / 2);
                    var to = curr + parseInt(count / 2) + (count % 2) - 1;
                    //显示的页数容处理
                    if (from <= 0) {
                        from = 1;
                        to = from + count - 1;
                        if (to > all) {
                            to = all;
                        }
                    }
                    if (to > all) {
                        to = all;
                        from = to - count + 1;
                        if (from <= 0) {
                            from = 1;
                        }
                    }
                    var range = [];
                    for (var i = from; i <= to; i++) {
                        range.push(i);
                    }
                    range.push('»');
                    range.unshift('«');
                    return range;
                }

            }
        }
    }).directive('isOk', [function() {
        return {
            restrict: "ACE",
            link: function(scope, element) {
                element.on('click', function() {
                    angular.element('.ckb').css({ "display": "inline-block" });
                    angular.element(this).css({ "display": "none" });
                    angular.element('.xzk').css({ "display": "block" });
                })
            }
        }
    }]).directive('cancel', [function() {
        return {
            restrict: 'ACE',
            link: function($scope, element) {
                var $e = angular.element;
                element.on('click', function() {
                    $e('.ckb').css({ "display": "none" });
                    $e('.xzk').css({ "display": "none" });
                    angular.element('.lb-z-k2').css({ "display": "block" });
                })
            }
        }
    }]).directive('ensure', ["commonHttp", '$location', '$stateParams', function(commonHttp, $location, $stateParams) {
        return {
            restrict: 'ACE',
            link: function(scope, element) {
                var $e = angular.element;
                element.on('click', function() {
                    var arr = [];
                    $e('.ckb').css({ "display": "none" });
                    $e('.xzk').css({ "display": "none" });
                    angular.element('.lb-z-k2').css({ "display": "block" });


                    angular.forEach($e('.ckb'), function(item, index) {
                        if ($e(item).prop('checked')) {
                            arr.push($e(item).val());
                        }
                        console.log(arr);
                    })
                    if (!arr.length) return false;

                    var str1 = JSON.stringify({
                        "search": {
                            "memberId": "1",
                            "channel": "1",
                            "deviceNo": "2",
                            "functionCode": "PROFORMSOLR",
                            "startRow": 0,
                            "pageSize": 8,
                            "keyWord": $stateParams.Keyword,
                            "categoryCode": $stateParams.code,
                            "propCode": "",
                            "brandIdList": arr
                        }
                    });

                    console.log(str1)
                    //按照指定格式传递的数据
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
                                    //new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                                },
                                "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str1)
                            }
                        }
                    });

                    var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj1);
                    commonHttp.myHttp(md5_obj, data_obj1, function(data) {
                        console.log(data);
                        scope.productList = JSON.parse(data).search.productList;
                        scope.brandList = JSON.parse(data).search.brandList;
                        scope.specList = JSON.parse(data).search.specList;
                        scope.total = Math.ceil(JSON.parse(data).search.totalSize);
                        scope.$emit('productList', scope.productList);
                        scope.$emit('brandList', scope.brandList);
                        scope.$emit('specList', scope.specList);
                        console.log(scope.productList)
                        page(scope.total);


                    })

                })
            }
        }
    }]).directive('details', [function() {
        return {
            restrict: "A",
            link: function(scope, element, attrs) {
                element.on('click', function() {
                    element.parent().siblings().hide();
                    element.siblings().removeClass("bluechenge").css("color", "#666666");
                    element.addClass('bluechenge').css("color", "#006cff");
                    //商品详情商品评价接口
                    var str = JSON.stringify({
                        "product": {
                            "memberId": "1",
                            "channel": "1",
                            "deviceNo": "2",
                            "functionCode": "GRAPHICDESC",
                            "startRow": 0,
                            "pageSize": 10,
                            "productId": '1'
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
                                    "requestType": "PRODUCTINFOMATION",
                                    "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                                    //new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                                },
                                "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
                            }
                        }
                    });

                    var md5_obj3 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
                    commonHttp.myHttp(md5_obj3, data_obj, function(data) {
                        //                          console.log(data);

                    });
                    scope.$e('.listbox2').show();
                })
            }
        }
    }]).directive('appraise', ["commonHttp", function(commonHttp) {
        return {
            restrict: "A",
            link: function(scope, element, attrs) {
                element.on('click', function() {
                    element.parent().siblings().hide();
                    element.siblings().removeClass("bluechenge").css("color", "#666666");
                    element.addClass('bluechenge').css("color", "#006cff");
                    //商品详情商品评价接口
                    var str = JSON.stringify({
                        "product": {
                            "memberId": "1",
                            "channel": "1",
                            "deviceNo": "2",
                            "functionCode": "EVALUATION_LIST",
                            "startRow": 0,
                            "pageSize": 10,
                            "productId": '1'
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
                                    "requestType": "PRODUCTINFOMATION",
                                    "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                                    //new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                                },
                                "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
                            }
                        }
                    });

                    var md5_obj3 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
                    commonHttp.myHttp(md5_obj3, data_obj, function(data) {
                        //                          console.log(data);

                    });
                    scope.$e('.listbox3').show();
                })
            }
        }
    }]).directive('basic', ["commonHttp", function(commonHttp) {
        return {
            restrict: "A",
            link: function(scope, element, attrs) {
                element.on('click', function() {
                    element.parent().siblings().hide();
                    element.siblings().removeClass("bluechenge").css("color", "#666666");
                    element.addClass('bluechenge').css("color", "#006cff");
                    scope.jk = "njdsjdjjdjdjdj";
                    scope.$e('.listbox1').show();
                })
            }
        }

    }]).directive('goto', ["$document", function($document) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                $document.on('scroll', function() {
                    if ($document.scrollTop() > 400) {
                        element.css('display', "block");
                        element.on('click', function() {
                            $document.scrollTop(0);
                        })
                    } else {
                        element.css('display', "none");
                        element.off('click');
                    }
                })
            }
        }

    }]).directive('upDown', [function() {
        return {
            restrict: "AE",
            link: function(scope, element, attrs) {
                element.on('mouseenter', function() {
                    element.find('s').addClass('glyphicon-chevron-up').removeClass('glyphicon-chevron-down');
                    element.find('ul').show();
                }).on('mouseleave', function() {
                    element.find('s').addClass('glyphicon-chevron-down').removeClass('glyphicon-chevron-up');
                    element.find('ul').hide();
                })
            }
        }
    }]).directive('sdown', function() {
        return {
            restrict: "ACE",
            link: function(scope, element, attrs) {
                element.on('click', function() {
                    console.log(element);
                    if (element.children('ul').css('display') == "none") {
                        element.children('ul').slideDown(200);
                        element.siblings().children('ul').slideUp(200);
                        element.find('.tit_box').addClass('active2');
                        element.siblings().find('.tit_box').removeClass('active2')
                    } else {
                        if (attrs.sint == 1) {
                            element.children('ul').slideUp(200);
                        } else {
                            element.children('ul').slideUp(200);
                            element.find('.tit_box').removeClass('active2');
                        }

                    }


                })
            }
        }
    })

    .directive('touh', function() {
        return {
            restrict: "EA",
            template: '<div class="container"><div class="had clearfloat"><div class="had-s "><a ui-sref="index.op">网站首页</a></div><div class="span ">010-29323-23</div><div class="had-q " ng-show="pq" >亲请您先<span ng-click="login()">[登录]</span>免费<span>[注册]</span></div><div class="ha-b clearfloat" ng-show="pl">Hi 欢迎来到同鑫<span>rerw242</span><b>退出</b><div class="kld"><span>消息<sk>10</sk></span><span ui-sref="index.guo" style="cursor: pointer;">采购车<sk>99+</sk></span></div></div><div class="ul clearfloat " id="kehu"><li style="margin-left: 0px;"><a>手机同鑫<b></b></a><div class="kehu1"></div></li><li ng-mouseover="fn(1)" ng-mouseleave="th(1)" ><a>帮助中心<b></b></a><div class="kehu1"id="kehu1" ng-show="yt"><span><r>采购帮助</r></span><span><r>供应帮助</r></span><span ui-sref="index.zhongxin"><r>常见问题</r></span><span ui-sref="index.zx"><r>在线回答</r></span></div></li><li ng-mouseover="fn(2)" ng-mouseleave="th(2)"><a>网站地图<b></b></a><div class="kehu1 km" style="right: 0px;" ng-show="wd"><div class="ma-s"><h4>特色市场</h4><ks>首页</ks><ks>搜索</ks><ks>供应</ks><ks>求购</ks><ks>产品门户</ks><ks>企业大全</ks><ks>搜搜</ks><ks>手机站</ks><ks>极速版</ks><ks>产业带</ks></div><div class="ma-s"><h4>专业市场</h4><ks>首页</ks><ks>搜索</ks><ks>供应</ks><ks>求购</ks><ks>产品门户</ks><ks>企业大全</ks><ks>搜搜</ks><ks>手机站</ks><ks>极速版</ks><ks>产业带</ks><ks>产品门户</ks><ks>企业大全</ks><ks>搜搜</ks><ks>手机站</ks><ks>极速版</ks><ks>产业带</ks></div></div></li></div></div></div>',
            link: function(scope, element, attrs) {

            }
        }
    }).run(['$rootScope', function($rootScope) {

        $rootScope.$e = angular.element;
    }])