angular.module('hzyApp')
    .controller('daoh', ['$scope', '$state', '$stateParams','commonHttp', '$location', '$window','$http', function($scope, $state, $stateParams,commonHttp, $location, $window,  $http) {
        //console.log(angular.element(".modal-backdrop"))
        $scope.xs = false;
        $scope.pl = false;
        $scope.pq = true;
        $scope.er = 1;
        var pwd = getCookie('pwd');
        if(!pwd){
        	 localStorage.removeItem('id');
            localStorage.removeItem('turl');
        }
if(localStorage.id) {
			//console.log('7777')
			var constanttest = localStorage.id
		} else {
			var constanttest = ''
		}
//		function styui(){
//			
//		
//		var str2 = JSON.stringify({
//			"cart": {
//				"memberId": constanttest,
//				"channel": "PC",
//				"deviceNo": "2"
//			}
//		});
//		//console.log(str2)
//			// 按照指定格式传递的数据
//		var data_obj2 = JSON.stringify({
//			"packageList": {
//				"packages": {
//					"header": {
//						"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
//						"comId": "CTO2O20170420",
//						"comSerial": "comSerial",
//						"from": "PAD",
//						"orderSerial": "orderId",
//						"requestType": "PRODUCTCARTLIST",
//						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
//							// new Date().format('yyyy-MM-dd
//							// hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
//					},
//					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str2)
//				}
//			}
//		});
//
//		var md5_obj2 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj2);
//		commonHttp.myHttp(md5_obj2, data_obj2, function(data,code) {
//			if(code==0){
//				$scope.cart = JSON.parse(data).cart;
//			console.log($scope.uiop);
//			
//			if($scope.cart.count==''){
//				$scope.cart.count=0
//				$scope.uiop=0
//			//	$scope.$emit('uiop',$scope.uiop);
//			}else{
//				$scope.uiop=$scope.cart.count
//				//$scope.$emit('uiop',$scope.uiop);
//				if(parseFloat($scope.cart.count)>parseFloat(99)){
//				$scope.uiop='99+'
//				//  $scope.$emit('uiop',$scope.uiop);
//			}
//			}
//			}
//			//      console.log(data);
//			
//
//		});
//		}
//		styui()
//$scope.uiop=8
   $scope.$on('uiop', function(e, newLocation) {
      $scope.uiop = newLocation;
    });

       
        $scope.check = function(n){
        	 $scope.isActive=n
        	    if (localStorage.id) {
            var constanttest = localStorage.id
        } else {
            $state.go('login')
            return;
        }
//          $scope.checkStatus = localStorage.checkStatus;
//          console.log( $scope.checkStatus)
//          if($scope.checkStatus == "2"){
//              $state.go('buyt.mjds01-home');
//          }else{
//              alert("非卖家")
//          }   
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
            console.log($scope.info.status)
              if($scope.info.status==0||$scope.info.status==1){
              	if($scope.info.status==0){
              	$scope.warn = '你还没有进行公司认证'
              	 $scope.lhurl = 'buyt.perinfor'
                 $scope.lju={staur:9}
                  
                 $scope.look = '去认证'
                  
              	}
              	if($scope.info.status==1){
              		$scope.warn = '您公司认证正在审核中'
              		 $scope.lhurl = 'buyt.perinfor'
                 $scope.lju={staur:9}
                 
                 $scope.look = '去查看'
               
              	}
              		if($scope.info.status==3){
              		$scope.warn = '您公司认证审核失败'
              		 $scope.lhurl = 'buyt.perinfor'
                 $scope.lju={staur:9}
                 
                 $scope.look = '重新认证'
                  
              	} 
                
                 $('#myModal').modal('show')
              }
              if($scope.info.status==2){
              	$state.go('buyt.mjds01-home');
              }


        })
        }
        $scope.wpoi=function(n){
        	 $scope.isActive=n
        }
        //console.log($location.search().staur)
        //console.log(location.href.split('?')[1].split('=')[1])
        $scope.login = function() {
            console.log('ppp')
            $state.go('login')
            localStorage.turl = location.href

        }
        if (localStorage.id) {
            $scope.pl = true;
            $scope.pq = false;
        } else {
            $scope.pl = false;
            $scope.pq = true;
            //$state.go('login')

        }
        if (localStorage.username) {
            $scope.username = localStorage.username
        }
        $scope.tuichu = function() {
            clearCookie('pwd')
            clearCookie('user')
            //localStorage.removeItem('username');
            localStorage.removeItem('id');
            localStorage.removeItem('turl');
            $scope.pq=true;
            $scope.pl=false;
           // $state.go('login');
            $location.path('/toubu/synr');
            $window.location.reload();

        }


     //      console.log($location.search().staur)
        $scope.isSelected = true;
        $scope.isActive = Number($location.search().staur);
        
        $scope.fn = function(n) {
            $scope.yt = false;
            if (n == 1) {
                $scope.yt = true;
            }
            if (n == 2) {
                $scope.wd = true;
            }
        }
        $scope.th = function(n) {
            $scope.wd = false;
            
            if (n == 1) {
                $scope.yt = false;
            }
            if (n == 2) {
                $scope.wd = false;
            }
        }
        //		$scope.login = function() {
        //			$scope.xs = true;
        //		}

        $scope.hide = function() {
            $scope.xs = false;
        }
        $scope.we = function() {
            $scope.pq = false;
            $scope.pl = true;
            $scope.xs = false;
        }
    }]).controller('editorCtrl', function($scope) {
        $scope.editorContent = '';
    }).directive('contenteditable', function() {
        return {
            restrict: 'A',
            require: '?ngModel',

            link: function(scope, element, attrs, ngModel) {
                // 初始化 编辑器内容
                if (!ngModel) {
                    return;
                } // do nothing if no ng-model
                // Specify how UI should be updated
                ngModel.$render = function() {
                    element.html(ngModel.$viewValue || '');
                };
                // Listen for change events to enable binding
                element.on('blur keyup change', function() {
                    scope.$apply(readViewText);
                });
                // No need to initialize, AngularJS will initialize the text based on ng-model attribute
                // Write data to the model
                function readViewText() {
                    var html = element.html();
                    // When we clear the content editable the browser leaves a <br> behind
                    // If strip-br attribute is provided then we strip this out
                    if (attrs.stripBr && html === '<br>') {
                        html = '';
                    }
                    ngModel.$setViewValue(html);
                }

                // 创建编辑器
                var editor = new wangEditor('div');
                editor.config.menus = [
                    'bold',
                    'img',
                    'orderlist'

                ];
                // 上传图片
                editor.config.uploadImgUrl = 'http://47.92.145.206/com.ifp.image/upload';
                editor.config.uploadParams = {
                    // token1: 'abcde',
                    // token2: '12345'
                };
                editor.config.uploadHeaders = {
                    'Accept' : 'text/x-json'
                }
                // 隐藏网络图片
                // editor.config.hideLinkImg = true;
                // 关闭菜单栏fixed
                editor.config.menuFixed = false;
                editor.create();
            }
        };
    }).directive('defLaydate', function() {
        return {
            require: '?ngModel',
            restrict: 'A',
            scope: {
                ngModel: '='
            },
            link: function(scope, element, attr, ngModel) {

                console.log(scope.riqi)
                var _date = null,

                    _config = {};
                laydate.skin("default");
                // 初始化参数 
                _config = {
                    elem: '#start',
                    format: attr.format != undefined && attr.format != '' ? attr.format : 'YYYY-MM-DD',
                    max: attr.hasOwnProperty('maxDate') ? attr.maxDate : '2099-06-16 23:59:59',
                    min: attr.hasOwnProperty('minDate') ? attr.minDate : laydate.now(),
                    choose: function(data) {
                        sessionStorage.riqi = data

                        function dateAdd(startDate) {
                            startDate = new Date(startDate);
                            startDate = +startDate + 1000 * 60 * 60 * 24;
                            startDate = new Date(startDate);
                            var nextStartDate = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
                            return nextStartDate;
                        }

                        _config2.min = dateAdd(data) //开始日选好后，重置结束日的最小日期
                        _config2.start = data //将结束日的初始值设定为开始日
                        scope.$apply(setViewValue);

                    },
                    clear: function() {
                        ngModel.$setViewValue(null);
                    }
                };
                // 初始化
                _date = laydate(_config);
                var _date2 = null,
                    _config2 = {};

                // 初始化参数 
                _config2 = {
                    elem: '#end',
                    format: attr.format != undefined && attr.format != '' ? attr.format : 'YYYY-MM-DD',
                    max: attr.hasOwnProperty('maxDate') ? attr.maxDate : '2099-06-16 23:59:59',
                    min: attr.hasOwnProperty('minDate') ? attr.minDate : laydate.now(),
                    choose: function(data) {
                        sessionStorage.dh = data

                        function dateddd(startDate) {
                            startDate = new Date(startDate);
                            startDate = +startDate - 1000 * 60 * 60 * 24;
                            startDate = new Date(startDate);
                            var nextStartDate = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
                            return nextStartDate;
                        }
                        _config.max = dateddd(data)
                        scope.$apply(setViewValue);

                    },
                    clear: function() {
                        ngModel.$setViewValue(null);
                    }
                };
                // 初始化
                _date2 = laydate(_config2);

                // 监听日期最大值
                if (attr.hasOwnProperty('maxDate')) {
                    attr.$observe('maxDate', function(val) {
                        console.log(val)
                        _config.max = val;
                        _config2.max = val;
                    })
                }
                // 监听日期最小值
                if (attr.hasOwnProperty('minDate')) {
                    attr.$observe('minDate', function(val) {
                        _config.min = val;
                        _config2.min = val;
                    })
                }

                // 模型值同步到视图上
                ngModel.$render = function() {
                    element.val(ngModel.$viewValue || '');
                };

                // 监听元素上的事件
                element.on('blur keyup change', function() {
                    scope.$apply(setViewValue);
                });

                setViewValue();

                // 更新模型上的视图值
                function setViewValue() {
                    var val = element.val();
                    ngModel.$setViewValue(val);
                }
            }
        }
    })
    .directive('defCalendata', function() {
        return {
            require: '?ngModel',
            restrict: 'A',
            scope: {
                ngModel: '=',
                datw:'='
            },
            link: function(scope, element, attr, ngModel,datw) {
            	
                var _date = null,
                    _config = {};
                laydate.skin("default");
                // 初始化参数 
                _config = {
                    elem: '#start',
                    format: attr.format != undefined && attr.format != '' ? attr.format : 'YYYY-MM-DD',
                    max: attr.hasOwnProperty('maxDate') ? attr.maxDate : laydate.now(-element.attr("datw")),
                    min: attr.hasOwnProperty('minDate') ? attr.minDate : '',
                    choose: function(data) {
                        sessionStorage.establishriqi = data
console.log(element.attr("datw"))

                        _config2.min = data //开始日选好后，重置结束日的最小日期
                        _config2.start = '' //将结束日的初始值设定为开始日
                        scope.$apply(setViewValue);

                    },
                    clear: function() {
                        ngModel.$setViewValue(null);
                    }
                };
                // 初始化
                _date = laydate(_config);
                var _date2 = null,
                    _config2 = {};

                // 初始化参数 
                _config2 = {
                    elem: '#end',
                    format: attr.format != undefined && attr.format != '' ? attr.format : 'YYYY-MM-DD',
                    max: attr.hasOwnProperty('maxDate') ? attr.maxDate : laydate.now(-element.attr("datw")),
                    min: attr.hasOwnProperty('minDate') ? attr.minDate : '',
                    choose: function(data) {
                        sessionStorage.registriqi = data

                        _config.max = data
                        scope.$apply(setViewValue);

                    },
                    clear: function() {
                        ngModel.$setViewValue(null);
                    }
                };
                // 初始化
                _date2 = laydate(_config2);

                // 监听日期最大值
                if (attr.hasOwnProperty('maxDate')) {
                    attr.$observe('maxDate', function(val) {
                        console.log(val)
                        _config.max = val;
                        _config2.max = val;
                    })
                }
                // 监听日期最小值
                if (attr.hasOwnProperty('minDate')) {
                    attr.$observe('minDate', function(val) {
                        _config.min = val;
                        _config2.min = val;
                    })
                }

                // 模型值同步到视图上
                ngModel.$render = function() {
                    element.val(ngModel.$viewValue || '');
                };

                // 监听元素上的事件
                element.on('blur keyup change', function() {
                    scope.$apply(setViewValue);
                });

                setViewValue();

                // 更新模型上的视图值
                function setViewValue() {
                    var val = element.val();
                    ngModel.$setViewValue(val);
                }
            }
        }
    })
    .controller('buyt', ['$scope', '$http', function($scope, $http) {

    }]).directive('cor', ["commonHttp", function(commonHttp) {

        return {
            restrict: 'A',
            link: function(scope, element, attr, ngModel) {
                laydate({
                    elem: '#' + attr.id,
                    min: laydate.now(), //-1代表昨天，-2代表前天，以此类推
                    max: '2099-06-16 23:59:59' //+1代表明天，+2代表后天，以此类推
                });
                laydate.skin('molv')


            }
        }
    }])



    .directive('sanj', ["commonHttp", "$state", function(commonHttp, $state) {

        return {
            restrict: 'AE',
            replace: false,
            template: '<div style="display: inline-block;"><label ng-class="{error: error.province}" ><select ng-model="selected" id="op" ng-options="o.code as o.name for o in list" ng-change="c(selected)" ><option value="">--请选择--</option></select></label><label  ng-class="{error: error.city}"><select ng-model="selected2" id="op2" ng-options="o.code as o.name for o in list1" ng-change="c2(selected2)" ><option ng-if="powr2" value="">--请选择--</option></select></label><label ng-show="list2.length!=0" ng-class="{error: error.area}"><select ng-model="selected3" ng-options="o.code as o.name for o in list2" id="op3" ng-change="c3()" ><option ng-if="powr3" value="">--请选择--</option></select></label></div>',
            link: function($scope, element, attr) {
                if (localStorage.id) {
                    var constanttest = localStorage.id
                } else {
                    $state.go('login')
                    return
                }
$scope.powr2=true
$scope.powr3=true
                $scope.error = {};
                $scope.error.province = false;
                $scope.error.city = false;
                $scope.error.area = false;
                var str2 = JSON.stringify({
                    "baseCode": {
                        "memberId": constanttest,
                        "channel": "1",
                        "deviceNo": "2",
                        "baseType": "828",
                        "categoryCode": "",
                        "paramCode": "0"
                    }
                });
                //按照指定格式传递的数据
                var data_obj3 = JSON.stringify({
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
                            "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str2)
                        }
                    }
                });

                var md5_obj3 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj3);
                commonHttp.myHttp(md5_obj3, data_obj3, function(data) {
                    //	var rew='rew'+index;
                    //  $scope[rew]=JSON.parse(data);
                    //$scope.datat+(index) = ;
                    //	console.log(JSON.parse(data).baseCode)
                    $scope.list = JSON.parse(data).baseCode
                    //			$scope.sarr[index].materialType=$scope[rew].category.categories[0].code
                    //			$scope.guige(index,$scope[rew].category.categories[0].code)
                })
                $scope.c = function(uo) {
                    if (uo) {
                        var str2 = JSON.stringify({
                            "baseCode": {
                                "memberId": constanttest,
                                "channel": "1",
                                "deviceNo": "2",
                                "baseType": "828",
                                "categoryCode": "",
                                "paramCode": uo
                            }
                        });
                        //按照指定格式传递的数据
                        var data_obj3 = JSON.stringify({
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
                                    "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str2)
                                }
                            }
                        });

                        var md5_obj3 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj3);
                        commonHttp.myHttp(md5_obj3, data_obj3, function(data) {
$scope.powr2=false
$scope.powr3=false
                            console.log(JSON.parse(data).baseCode)
                            $scope.list1 = JSON.parse(data).baseCode
                            angular.element("#op2").find("option").first().text('--请选择--')
                             angular.element("#op3").find("option").first().text('--请选择--')

                        })
                    } else {
                        $scope.list1 = ""
                    }
                    $scope.error.province = false;
                    $scope.error.city = false;
                    $scope.error.area = false;
                    $scope.selected2 = '';
                    $scope.selected3 = '';
                };

                $scope.c2 = function(uo) {
                    if (uo) {
                        var str2 = JSON.stringify({
                            "baseCode": {
                                "memberId": constanttest,
                                "channel": "1",
                                "deviceNo": "2",
                                "baseType": "828",
                                "categoryCode": "",
                                "paramCode": uo
                            }
                        });
                        //按照指定格式传递的数据
                        var data_obj3 = JSON.stringify({
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
                                    "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str2)
                                }
                            }
                        });

                        var md5_obj3 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj3);
                        commonHttp.myHttp(md5_obj3, data_obj3, function(data) {
$scope.powr3=false
                            console.log(JSON.parse(data).baseCode)
                            $scope.list2 = JSON.parse(data).baseCode
                               angular.element("#op3").find("option").first().text('--请选择--')

                        })
                    } else {
                        $scope.list2 = ""
                    }
                    $scope.error.province = false;
                    $scope.error.city = false;
                    $scope.error.area = false;
                    $scope.selected3 = '';
                };
                $scope.c3 = function() {
                    $scope.error.province = false;
                    $scope.error.city = false;
                    $scope.error.area = false;
                    if ($scope.hidel) {
                        $scope.hidel = false
                    }

                };

            }
        }
    }])