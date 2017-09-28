/**
 * Created by Administrator on 2017/7/14.
 */
angular
    .module('request')
    .controller('bottomMenuCtrl', ['$scope', '$http', 'commonHttp', '$stateParams', '$document', "readJson", "$q", "$state", function($scope, $http, commonHttp, $stateParams, $document, readJson, $q, $state) {
        var vm = this;


      $scope.menu_name = $stateParams.name;



        //常见问题默认显示
        $scope.bottomMenu = function() {
            var adminStr = JSON.stringify({
                "bidding": {
                    "activityMenuCode": 'bottom_menu',
                    "channel": "1",
                    "deviceNo": "2",
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
                            "requestType": "USERBYID",
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
                $scope.titleLists = JSON.parse(data).bidding.tPlatformArticleMenuList;
                // console.log($scope.titleLists);
                // console.log($scope.contentLists);

                // for(var i = 0; i<$scope.menuLists[0].children.length; i++){
                //     if($scope.menuLists[0].children[i].isDefault == '1'){
                //         $scope.menu_name = $scope.menuLists[0].children[i].name;
                //         console.log($scope.menu_name)
                //     }
                // }

            }) //end http
        }
        $scope.bottomMenu();

    }]) //end controller