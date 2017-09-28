//时间格式化函数
Date.prototype.format = function(fmt) {
     var o = { 
        "M+" : this.getMonth()+1,                 //月份 
        "d+" : this.getDate(),                    //日 
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),                 //秒 
        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt; 
} 

 Date.prototype.toLocaleString = function() {
		 		console.log(this.getMinutes())
		 	if(this.getMinutes()<10){
          	var ty=  "0" + this.getMinutes();  
          }else{
          	var ty=this.getMinutes()
          }
		 	if(this.getHours()<10){
          	var gethour = "0" + this.getHours();  
          }else{
          	var gethour=this.getHours()
          }
		 	if(this.getSeconds()<10){
          var	getsen = "0" + this.getSeconds();  
          }else{
          	  var	getsen=this.getSeconds()
          }
          return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() + " " + gethour + ":" + ty + ":" + getsen;
         
    };
    //将标准时间转换成正常时间
    var format = function(time,format)
{
var t = new Date(time);
var tf = function(i){return (i < 10 ? '0':'' ) + i};
return format.replace(/yyyy|MM|dd|HH|mm|ss/g,function(a){
switch(a){
case 'yyyy':
return tf(t.getFullYear());
break;
case 'MM':
return tf(t.getMonth() + 1);
break;
case 'mm':
return tf(t.getMinutes());
break;
case 'dd':
return tf(t.getDate());
break;
case 'HH':
return tf(t.getHours());
break;
case 'ss':
return tf(t.getSeconds());
break;
}
})
}
//alert(format("Tue Jul 25 2017 00:00:00 GMT+0800 (中国标准时间)", 'yyyy-MM-dd'));
    
//获取cookie
   function getCookie(cname){
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name)==0) return c.substring(name.length,c.length);
	}
	return "";
}
   //设置cook
function setCookie(cname,cvalue,exdays)
{
  var d = new Date();
  d.setTime(d.getTime()+(exdays*24*60*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}


//清除cookie
function clearCookie(name) {    
    setCookie(name, "", -1);    
}  

function formatBankNo (BankNo){
	console.log('99999')
    if (BankNo.value == "") return;
    var account = new String (BankNo.value);
    account = account.substring(0,23); /*帐号的总数, 包括空格在内 */
    if (account.match (".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}") == null){
        /* 对照格式 */
        if (account.match (".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" + ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" +
        ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" + ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}") == null){
            var accountNumeric = accountChar = "", i;
            for (i=0;i<account.length;i++){
                accountChar = account.substr (i,1);
                if (!isNaN (accountChar) && (accountChar != " ")) accountNumeric = accountNumeric + accountChar;
            }
            account = "";
            for (i=0;i<accountNumeric.length;i++){    /* 可将以下空格改为-,效果也不错 */
                if (i == 4) account = account + " "; /* 帐号第四位数后加空格 */
                if (i == 8) account = account + " "; /* 帐号第八位数后加空格 */
                if (i == 12) account = account + " ";/* 帐号第十二位后数后加空格 */
                account = account + accountNumeric.substr (i,1)
            }
        }
    }
    else
    {
        account = " " + account.substring (1,5) + " " + account.substring (6,10) + " " + account.substring (14,18) + "-" + account.substring(18,25);
    }
    if (account != BankNo.value) BankNo.value = account;
}


//排序
function sortBy(attr,rev){
        //第二个参数没有传递 默认升序排列
        if(rev ==  undefined){
            rev = 1;
        }else{
            rev = (rev) ? 1 : -1;
        }
        
        return function(a,b){
            a = a[attr];
            b = b[attr];
            if(a < b){
                return rev * -1;
            }
            if(a > b){
                return rev * 1;
            }
            return 0;
        }
    }
//按键
function  getJson(evnet){
	console.log(angular.element(this).val())
        	var k;
        k = event.keyCode || event.which;
        	// = event.keyCode;   //48-57是大键盘的数字键，96-105是小键盘的数字键，8是退格符←
    if ((k <= 57 && k >= 48) || (k <= 105 && k >= 96) || (k== 8)){
     return true;
    } else {
     return false;
    }
    }



			//使用字符索引对URL进行解析  
function parseURL(url){  
    //解析协议  
    var protocal = url.substring(0, url.indexOf(':'));  
    //alert('protocal:' + protocal);  
      
    //解析域名和端口  
    var tmp = url.substr(url.indexOf('//') + 2);  
      
    var domainName = tmp.substr(0, tmp.indexOf("/"));  
    //alert('domain:' + domain);  
      
   
    //alert('domainName:' + domainName + ',' + port);  
      
    //解析web context  
    var uri = tmp.substr(tmp.indexOf("/") + 1);   
   
    //alert('webContext:' +webContext);  
      
    //解析URI  
    //var uri = tmp2.substr(tmp2.indexOf('/')+1);  
    //alert('uri:' + uri);  
      
    return {  
        protocal: protocal,  
        domainName:domainName,  
        uri: uri  
    }  
} 