/**
 * Created by Administrator on 2017/7/14.
 */

angular.module('hzyApp')
    .controller('cgs01-dizhiguanli', ['$scope', '$http', '$state', 'commonHttp', '$window', '$timeout', function($scope, $http, $state, commonHttp, $window, $timeout) {

        if (localStorage.id) {
            var constanttest = localStorage.id
        } else {
            $state.go('login')
            return;
        }




        $scope.name = '';
        $scope.selected = '';
        $scope.selected2 = '';
        $scope.selected3 = '';
        $scope.street = '';
        $scope.mail = '';
        $scope.cellphone = '';

        //操作状态
        $scope.czState = '';
        $scope.changeState1 = function() {
            $scope.czState = 'DELETE'; //删除
        }
        $scope.changeState2 = function() {
            $scope.modify = true;
            $scope.czState = 'UPDATE'; //修改
        }

        //获取地址id
        $scope.spId = '';
        $scope.getId = function(event) {
            $scope.spId = event.target.parentNode.getAttribute('data-id');
        };
        $scope.funcode = 'ADD';
        //获取收货地址
        $scope.getaddr = function() {
            var str = JSON.stringify({ // 将输出参数转为json字符
                "address": { //??
                    memberId: constanttest,
                    channel: "pc",
                    deviceNo: "2",
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
                            "requestType": "COMCONTACTLIST", //??
                            "sendTime": new Date().format("yyyy-MM-dd hh:mm:ss")
                            //new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                        },
                        "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str)
                    }
                }
            });

            var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
            commonHttp.myHttp(md5_obj, data_obj, function(data, code, error) {
                $scope.data = JSON.parse(data).address;
                console.log($scope.data)

            });

        }
        $scope.getaddr();


        //修改收货地址
        $scope.modifyAddress = function(item, $event) {
            // $(e).parent().parent().find("input").prop("checked", true)
            // $(e).parent().siblings().find("input").removeAttr("checked")
            
            $scope.fid = item.id;
            $scope.funcode = 'UPDATE'
           
            var wdd = JSON.stringify({
                "address": {
                    "memberId": constanttest,
                    "channel": "PC",
                    "deviceNo": "2",
                    "id": item.id
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
                            "requestType": "COMCONTACTDETAIL",
                            "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                            // new Date().format('yyyy-MM-dd
                            // hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                        },
                        "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', wdd)
                    }
                }
            });
            //console.log(strj)
            var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
            commonHttp.myHttp(md5_obj, data_obj, function(data, code, error) {
                if (code == 0) {
                    $scope.amend = JSON.parse(data).address;

                    console.log($scope.amend)
                    $scope.name = $scope.amend.name
                    $scope.street = $scope.amend.detailedAddress
                    $scope.mail = $scope.amend.zipNo
                    $scope.phone = $scope.amend.telephone
                    $scope.cellphone = $scope.amend.mobile
                    $scope.typr = $scope.amend.types
                    $scope.selected = $scope.amend.province
                    $scope.c($scope.amend.province)
                    $scope.selected2 = $scope.amend.city
                    $scope.c2($scope.amend.city)
                    $scope.selected3 = $scope.amend.county
                }
            })
          

            $event.stopPropagation();
        }


        //删除
        $scope.deleteAddress = function(event, item, $event) {
            $(event.target).parent().parent().find("input").prop("checked", true)
            //$(en).parent().siblings().find("input").removeAttr("checked")
            $scope.fid = item.id;
            $scope.funcode = 'DELETE'

            var wdd = JSON.stringify({
                "address": {
                    "memberId": constanttest,
                    "channel": "PC",
                    "deviceNo": "2",
                    "functionCode": $scope.funcode,
                    "id": $scope.fid,
                    "name": $scope.name,
                    "mobile": $scope.cellphone,
                    "province": $scope.selected,
                    "city": $scope.selected2,
                    "county": $scope.selected3,
                    "detailedAddress": $scope.street,
                    "types": '',
                    'zipNo': $scope.mail,
                }
            });

            console.log(wdd)
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
                            "requestType": "DELIVERYADDRESS",
                            "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                            // new Date().format('yyyy-MM-dd
                            // hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                        },
                        "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', wdd)
                    }
                }
            });
            console.log(wdd)
            var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
            commonHttp.myHttp(md5_obj, data_obj, function(data, code, error) {
                if (code == 0) {
                    $scope.sh = JSON.parse(data).address
                    // if ($scope.Sh.status == 1) {
                    //     if (funcode == 'UPDATE') {
                    //         sitew(fid)
                    //     }
                    //     if (funcode == 'ADD') {
                    //         sitew($scope.Sh.applyMsg)
                    //     }

                    // }
                    $scope.getaddr();
                    $window.location.reload();

                }
            })
           
        
        }
        
        //新增修改删除收货地址 并保存
        $scope.editAddress = function() {
            if (!$scope.name) {
                $scope.wr2 = true;
                return;
            }
            if (!$scope.street) {
                $scope.wrstr = true;
                return;
            }
            if ($scope.list2.length != 0) {
                if ($scope.selected && $scope.selected2 && $scope.selected3) {
                    $scope.hidel = false
                } else {
                    $scope.hidel = true
                    return
                }
            } else {
                if ($scope.selected && $scope.selected2) {
                    $scope.hidel = false
                } else {
                    $scope.hidel = true
                    return
                }
            }

            if (!$scope.mail) {
                $scope.wrma = true;
                return;
            }
            if (!$scope.phone && !$scope.cellphone) {
                $scope.wrph = true;
                return;
            }

            var staus = 0;
            if (angular.element("#last-check").is(":checked")) {
                staus = 1
            }
            console.log(angular.element("#last-check").is(":checked"))
            console.log(staus)


            var wdd = JSON.stringify({
                "address": {
                    "memberId": constanttest,
                    "channel": "PC",
                    "deviceNo": "2",
                    "functionCode": $scope.funcode,
                    "id": $scope.fid,
                    "name": $scope.name,
                    "mobile": $scope.cellphone,
                    "province": $scope.selected,
                    "city": $scope.selected2,
                    "county": $scope.selected3,
                    "detailedAddress": $scope.street,
                    "types": staus,
                    'zipNo': $scope.mail,
                }
            });

            console.log(wdd)
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
                            "requestType": "DELIVERYADDRESS",
                            "sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
                            // new Date().format('yyyy-MM-dd
                            // hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                        },
                        "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', wdd)
                    }
                }
            });
            console.log(wdd)
            var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
            commonHttp.myHttp(md5_obj, data_obj, function(data, code, error) {
                if (code == 0) {
                    $scope.sh = JSON.parse(data).address
                    // if ($scope.Sh.status == 1) {
                    //     if (funcode == 'UPDATE') {
                    //         sitew(fid)
                    //     }
                    //     if (funcode == 'ADD') {
                    //         sitew($scope.Sh.applyMsg)
                    //     }

                    // }
                    console.log($scope.sh)
                    $scope.getaddr();
                    $window.location.reload();

                }
            })



        }



    }])