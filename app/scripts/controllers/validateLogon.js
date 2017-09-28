/**
 * Created by Administrator on 2017/7/14.
 */

angular.module('hzyApp')
    .controller('validateLogon', ['$scope', '$http', '$state', 'commonHttp', function($scope, $http, $state, commonHttp) {
        //密码可见性切换
        $scope.eye = false;
        $scope.ty = false;
        $scope.passwdChange = function(event) {
        	//console.log( $(target).parent())
        	//console.log(event.target)
            if (!$scope.eye) {
                $scope.eye = true;
                  $(event.target).parent().find('input').attr('type', 'text');
            } else {
                $scope.eye = false;
                 $(event.target).parent().find('input').attr('type', 'password');
            }
        }



        var pwd = getCookie('pwd')
        var user = getCookie('user')
        if (pwd && user) {
            if (localStorage.turl) {
                window.location.href = localStorage.turl
            } else {
                $state.go('index.op')
            }

        }

        $scope.blur = function(){
            $scope.user_nameFocus = true;
        }

        $scope.login = function() {
            var reg_1 = /^1[34578]\d{9}$/; // 手机号验证；
            var reg_2 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_.]{6,16}$/; // 密码验证：长度6~16
            var name = $("input[name=user_name]").val();
            var pass = $("input[name=user_pass]").val();
            if (name == "" || pass == "") {
                $("#user_prompt").html("* 请输入账号密码后进行登录操作");
                if (name == "") {
                    $("input[name=user_name]").focus();
                } else {
                    $("input[name=pass]").focus();
                }
                return
            } else if (!reg_1.test(name)) {
                $("#user_prompt").html("* 账号格式错误，请输入注册的手机号码");
                $("input[name=user_name]").val("").focus();
            } else {
            	 $("#user_prompt").html(" ");
                //提交数据
                var mima = hex_md5(pass);
            
                
                console.log(mima)
                var str = JSON.stringify({ // 将输出参数转为json字符
                    "user": { //??
                        loginCode: name,
                        userName: name,
                        memberType: "",
                        random: "",
                        loginPwd: mima,
                        loginPwdOld: "",
                        province: "",
                        city: "",
                        county: "",
                        longitude: "",
                        latitude: "",
                        channel: "",
                        deviceNo: "",
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
                                "from": "PAD",
                                "orderSerial": "orderId",
                                "requestType": "LOGIN", //??
                                "sendTime": new Date().format("yyyy-MM-dd hh:mm:ss")
                                //new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                            },
                            "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
                        }
                    }
                });
                console.log(data_obj)
                var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
                commonHttp.myHttp(md5_obj, data_obj, function(data, code, error) {
                    $scope.data = JSON.parse(data);
                    console.log(data)
                    console.log(code)
                    if (code == "1100") {
                        $("#user_prompt").html("* 无法获取用户信息");
                        return;
                    }
                    if (code == "1105") {
                        $("#user_prompt").html("* 未注册，请注册");
                        return;
                    }
                 if (code == "1104") {
                     $("#user_prompt").html("* 用户名或密码不正确");
                     return;
                 }
                 if (code == "1107") {
                     $("#user_prompt").html("* 用户不存在");
                     return;
                 }
                    if (code == "0") {
                        $scope.data = JSON.parse(data);


                        setCookie('pwd', mima, 1)
                        setCookie('user', name, 1)
                        //setCookie('data', JSON.stringify($scope.data),7)
                        localStorage.username = $scope.data.user.userName
                        localStorage.profileUrl = $scope.data.user.profileUrl
                        localStorage.id = $scope.data.user.memberId

                        localStorage.checkStatus = $scope.data.user.checkStatus
                        console.log(localStorage.checkStatus)


                        if (localStorage.turl) {
                          
                              window.location.href=localStorage.turl
                        } else {
                            $state.go('index.op')
                        }

                    }
                    console.log($scope.data)
                });

            }

        }
    }]) // end validateLogon
