/**
 * Created by Administrator on 2017/7/14.
 */
angular
    .module('request')
    .filter(
        'to_faleNum',
        function() {
            return function(num) {
                return num.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
            }
        }
    )
    .controller('findPasswordsCtrl', ['$scope', '$http', 'commonHttp', '$stateParams', '$document', "readJson", "$q", "$state", function($scope, $http, commonHttp, $stateParams, $document, readJson, $q, $state) {
        var vm = this;

        vm.Id = {
            'personId': '',
        };

        $scope.phoneNum = vm.Id.personId;
        $scope.phonenumFocus = false;

        $scope.onblur = function() {
            $scope.phonenumFocus = true;
        } //end onfocus

        // $(document).find('input').value() removeAttr('disabled');
        $scope.getAdmin = function(number) {
            // var userId = hex_md5(number);
            if(!number){
                console.log('空')
                return
            }
            console.log(number)
            var adminStr = JSON.stringify({
                "member": {
                    "loginCode": number,
                    "channel": "1",
                    "deviceNo": "2",
                    "functionCode": "RESETPASSWORD"
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
                            "requestType": "MEMBERISEXIST",
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
                console.log(code)
                console.log(data);
                var data = JSON.parse(data).member;
                $scope.state = data.status;
                if (code == "1100") {
                    // alert('无法获取用户信息')
                    $('#errinfo').html('* &nbsp;无法获取用户信息');
                }
                if (code == "1107") {
                    // alert('用户不存在')
                    $('#errinfo').html('* &nbsp;用户不存在');

                    return;
                }
                if (code == "1105") {
                    $('#errinfo').html('* &nbsp;手机号未注册');

                    // alert('手机号未注册')
                    return;
                }
                console.log($scope.state)
                if ($scope.state == "1") {

                    localStorage.setItem("id",number);
                    $state.go("logintou.czmm");
                } else if($scope.state == "0"){
                    // alert('用户未注册')
                    $('#errinfo').html('* &nbsp;手机号未注册');

                }

            }) //end http
        }

    }]).controller('resetPassword', function($scope, $state, $interval, $http, commonHttp, $stateParams, $document, readJson, $q) {
        var vm = this;

        //密码可见
        $scope.eye = false;
        $scope.buttonText = '点击免费获取';
        console.log($scope.buttonText)

        $scope.phoneNum = localStorage.getItem("id");
        console.log($scope.phoneNum)
        $scope.randomNum = '';
        // vm.getkey = getkey;
        var timePromise = null,
            second = 60;

        $scope.passwdChange = function(target) {
            if (!$scope.eye) {
                $scope.eye = true;
                $(target).prev('input').attr('type', 'text');
            } else {
                $scope.eye = false;
                $(target).prev('input').attr('type', 'password');
            }
        }

        $scope.getkey = function(e) {
            var keyStr = JSON.stringify({
                "random": {
                    "loginCode": $scope.phoneNum,
                    "channel": "1",
                    "deviceNo": "2",
                    'functionCode': 'FINDPWD'
                }
            });

            console.log(keyStr)
            // 按照指定格式传递的数据
            var data_objKeyStr = JSON.stringify({
                "packageList": {
                    "packages": {
                        "header": {
                            "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                            "comId": "CTO2O20170420",
                            "comSerial": "comSerial",
                            "from": "PAD",
                            "orderSerial": "orderId",
                            "requestType": "GETRANDOM",
                            "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                            // new Date().format('yyyy-MM-dd
                            // hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                        },
                        "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', keyStr)
                    }
                }
            });
            var md5_obj3 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_objKeyStr);

            commonHttp.myHttp(md5_obj3, data_objKeyStr, function(data, code) {
                // console.log(data);
                var data = JSON.parse(data).random;
                console.log(code)
                if (code == "1106") {
                    // alert('短信平台异常')
                    $('#messErrInfo').html('* &nbsp;短信平台异常');

                    return
                }
                if (code == "1000") {
                    // alert('短信发送失败');
                    $('#messErrInfo').html('* &nbsp;短信发送失败');

                    return
                }
                if (code == "1002") {
                    // alert('操作此时太多，稍后重试');
                    $('#messErrInfo').html('* &nbsp;操作频繁，稍后重试');

                    return
                }
                if (code == "0") {
                    timePromise = $interval(function() {
                        if (second <= 0) {
                            $interval.cancel(timePromise);
                            timePromise = undefined;
                            second = 60;
                            $scope.buttonText = '重新发送';

                            $(e).removeAttr("disabled");



                        } else {
                            $scope.buttonText = second + "s后可重发";
                            second--;
                            $(e).attr("disabled", "disabled");

                        }
                    }, 1000, 100);
                }
                // $scope.state = data.
                console.log(data)
            }) //end http


        } //end getkey

        $scope.getStatus = function(randomNum) {
            var keyStr = JSON.stringify({
                "random": {
                    "loginCode": $scope.phoneNum,
                    "random": randomNum,
                    "channel": "1",
                    "deviceNo": "2"
                }
            });

            console.log(keyStr)
            // 按照指定格式传递的数据
            var data_objKeyStr = JSON.stringify({
                "packageList": {
                    "packages": {
                        "header": {
                            "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                            "comId": "CTO2O20170420",
                            "comSerial": "comSerial",
                            "from": "PAD",
                            "orderSerial": "orderId",
                            "requestType": "VALIDRANDOM",
                            "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                            // new Date().format('yyyy-MM-dd
                            // hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                        },
                        "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', keyStr)
                    }
                }
            });
            var md5_obj3 = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_objKeyStr);

            commonHttp.myHttp(md5_obj3, data_objKeyStr, function(data, code) {
                console.log(data);
                var data = JSON.parse(data).random.status;
                console.log(code)
                console.log(data)
                console.log($scope.phoneNum)
                if (code == "1102") {
                    // alert('验证码不存在')
                    $('#messErrInfo').html('* &nbsp;验证码不存在');

                }

                if (code == "1103") {
                    // alert('验证码已失效')
                    $('#messErrInfo').html('* &nbsp;验证码已失效');


                }

                if (data == 'Y') {
                    $state.go("logintou.suc");



                }
            }) //end http
        } //end getStatus



        $scope.password = '';
        $scope.passwordAgain = '';
        $scope.changePassword = function() {

            if(!$scope.password) {
                console.log('2')
                return;
            }
            if(!$scope.passwordAgain) {
                        console.log('3')
                return;
            }
            if($scope.passwordAgain != $scope.password) {
                    console.log('密码不一致')
                return;
            }
            //提交数据
            console.log($scope.password)
            var mima = hex_md5($scope.password);
            console.log(mima)
            var str = JSON.stringify({ // 将输出参数转为json字符
                "user": {
                    "loginCode": $scope.phoneNum,
                    "password": mima,
                    "channel": "1",
                    "deviceNo": "2",
                }
            });
            console.log(str)
            var data_obj = JSON.stringify({
                "packageList": {
                    "packages": {
                        "header": {
                            "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                            "comId": "CTO2O20170420",
                            "comSerial": "comSerial",
                            "from": "",
                            "orderSerial": "192328058110921",
                            "requestType": "FORGETPWD", //??
                            "sendTime": new Date().format("yyyy-MM-dd hh:mm:ss")
                            //new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                        },
                        "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
                    }
                }
            });
            console.log(data_obj)
            var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
            commonHttp.myHttp(md5_obj, data_obj, function(data, code) {
                $scope.data = JSON.parse(data).user;
                console.log($scope.data)
                if (code == "1103") {
                    // alert('验证码已失效，请重新获取')
                    $('#changeErrInfo').html('&nbsp;*  验证码已失效，请重新获取');

                }

                if ($scope.data.status == "1") {
                    $state.go('logintou.cz');
                } else if ($scope.data.status !== "1") {
                    // alert('密码修改失败，状态不为1')
                    $('#changeErrInfo').html('&nbsp;*  密码修改失败，请重新输入');
                    return;
                }

            });



        }

    }) //end controller