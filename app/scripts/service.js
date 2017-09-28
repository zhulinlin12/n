angular.module('CommonService',[]).constant('picarl', 'http://47.92.145.206/').constant('tupurl', 'http://47.92.145.206/com.ifp.image/upload')
.service('commonHttp',['$http',function ($http){
	this.myHttp=function (md5_obj,data_obj,callback){
		$http({
		method:'post',
	//url:'http://172.168.100.115:8989/com.ifp.ipartner/interfaceChannel?sign='+md5_obj +'&com_id=CTO2O20170420',
		url:'http://47.92.145.206/com.ifp.ipartner/interfaceChannel?sign='+md5_obj +'&com_id=CTO2O20170420',//测试环境
		data:data_obj
		}).then(function success(response){
			/*if(response.data.packageList.packages.header.responseCode!=0){
				alert(response.data.packageList.packages.header.errorMessage);
			}*/
			console.log(response)
			if(response.data.packageList){
				var jiami=response.data.packageList.packages.response;
			
			var jiemi_json=DES3.decrypt("",jiami);
			var code=response.data.packageList.packages.header.responseCode;
			var errorMessage=response.data.packageList.packages.header.errorMessage;
	
//			if(code==1000){
//				alert('短信发送失败')
//			}
//			if(code==1002){
//				alert('短信发送超出次数')
//			}
//			if(code==1100){
//				alert('无法获取用户信息')
//			}
//				if(code==1101){
//				alert('已注册不要重复注册')
//			}
//			if(code==1102){
//				alert('验证码不存在')
//			}
//			if(code==1103){
//				alert('验证码超时')
//			}
//			if(code==1104){
//				alert('用户名和密码不正确')
//			}
//			if(code==1105){
//				alert('手机号未注册')
//			}
//			if(code==1106){
//				alert('短信平台异常')
//			}
//			if(code==1107){
//				alert('用户不存在')
//			}
//			if(code==1109){
//				alert('密保答案不相符')
//			}
//				if(code==1210){
//				alert('商品名称长度不得超过20个字符')
//			}
//			if(code==1212){
//				alert('订单物流信息不存在')
//			}
//			if(code==1218){
//				alert('商品在售中，请先下架')
//			}
//			if(code==1219){
//				alert('商品已下架')
//			}
//			if(code==1220){
//				alert('无权限修改商品')
//			}
//			if(code==1501){
//				alert('公司信息找不到')
//			}
			return callback(jiemi_json,code,errorMessage);
			}else{
				return callback(response);
			}
		
			
		},function error(response){
			console.log(response)
//			alert("接口响应失败");

			return callback(response);
		});
	}
}]).service('readJson',['$http','$q', function ($http,$q){//
	return{
      getJson: function (md5_obj,data_obj){
        var deferred=$q.defer();//
        $http({
          method:'post',
          url:'http://47.92.145.206/com.ifp.ipartner/interfaceChannel?sign='+md5_obj +'&com_id=CTO2O20170420',//测试环境URL
          data:data_obj
        }).then(function (data, status, header, config) {
          deferred.resolve(data);
        },function (data, status, header, config) {
          deferred.reject(data);
        })
        //console.log(deferred.promise)
       
        return deferred.promise;
      }
    }
}]).service('readson',['$http','$q', function ($http,$q){
	return{
		getson:function(n){
		//	console.log(n)
			if(n==0){
			//	alert('对')
			}
//			var md=n;
//			var greeting2;
// md.then(function(greeting) {
//				console.log(greeting)
//				 greeting2=greeting.data;
//				
//			}, function(reason) {
//console.log('Failed: ' + reason);
//}, function(update) {
//console.log('Got notification: ' + update);
//})
    // return greeting2;
		}
		
	}
	
	
	
	
	
}]).run(['$rootScope', '$location',function($rootScope, $location){
            $rootScope.$on('$locationChangeStart', function ()
            {
                BaiduTongJi.visitPage($location.path());
            })
        }]);


