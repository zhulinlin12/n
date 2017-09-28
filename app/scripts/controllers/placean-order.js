angular.module('request', ['CommonService', 'animate'])
.controller('anorder',  ['$scope', '$rootScope', '$http', '$state', 'commonHttp', '$document', '$interval', function($scope, $rootScope, $http, $state, commonHttp, $document, $interval) {
if(localStorage.id) {
	var constanttest = localStorage.id
} else {
	localStorage.turl = location.href
	$state.go('login')
	return;
}
 $('body,html').animate({scrollTop:0},0);
$scope.hidel=false
$scope.wrstr=false
if(sessionStorage.placeorder){
	$scope.arr = JSON.parse(sessionStorage.placeorder)
	console.log($scope.arr)
	var dmount=0
	var overall=0;
		angular.forEach($scope.arr, function(n, i) {
		angular.forEach($scope.arr[i].detailList, function(n, w) {
		dmount+=Number($scope.arr[i].detailList[w].subtotal)
		$scope.arr[i].Amount=dmount.toFixed(2)
			//console.log($scope.arr)
		})
			//
		overall+=Number($scope.arr[i].Amount)
		$scope.arr[i].message=''
		dmount=0
})
	$scope.oall=overall.toFixed(2)	
}
$scope.zllindex=0;
$scope.zllindex2=0;
//获取收获地址
function sitew(pid){
var strj = JSON.stringify({
			"address": {
				"memberId": constanttest,
				"channel": "PC",
				"deviceNo": "2"
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
						"requestType": "COMCONTACTLIST",
						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
							// new Date().format('yyyy-MM-dd
							// hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', strj)
				}
			}
		});
		//console.log(strj)
		var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
		commonHttp.myHttp(md5_obj, data_obj, function(data, code, error) {
			if(code==0){
				$scope.delivery = JSON.parse(data).address
				console.log($scope.delivery)
		
			if($scope.delivery.comcontactList.length==0){
				$scope.receipt=true;
				$scope.showt=false
			}else{
				$scope.receipt=false
				$scope.showt=true
			
			var lent=0;

			 $scope.delivery.comcontactList.sort(sortBy('types',false))
			// console.log($scope.delivery.comcontactList)
			angular.forEach($scope.delivery.comcontactList, function(n, i) {
				if($scope.delivery.comcontactList[i].types!=1){
					lent++
				}
				if(pid!=true){
				if($scope.delivery.comcontactList[i].id==pid){
					$scope.delivery.comcontactList[i].typep=1
					$scope.zllindex=i
				}
				}
				if($scope.delivery.comcontactList[i].types==1){
					$scope.delivery.comcontactList[i].typep=1
				}
			})
			if(lent==$scope.delivery.comcontactList.length){
				$scope.delivery.comcontactList[0].typep=1
			}
			}
				}
		})
		}
sitew(true)
//获取发票
function note(pid2){
var strnote = JSON.stringify({
			"invoice": {
				"memberId": constanttest,
				"channel": "PC",
				"deviceNo": "2"
			}
		});
		// 按照指定格式传递的数据
		var data_objn = JSON.stringify({
			"packageList": {
				"packages": {
					"header": {
						"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
						"comId": "CTO2O20170420",
						"comSerial": "comSerial",
						"from": "PAD",
						"orderSerial": "orderId",
						"requestType": "INVOICEINFOLIST",
						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
							// new Date().format('yyyy-MM-dd
							// hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', strnote)
				}
			}
		});
		//console.log(strj)
		var md5_objn = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_objn);
		commonHttp.myHttp(md5_objn, data_objn, function(data, code, error) {
			if(code==0){
				$scope.voucher = JSON.parse(data).invoice
				if($scope.voucher.recordList.length==0){
				$scope.phid=true;
				$scope.pshow=false
			}else{
				$scope.phid=false
				$scope.pshow=true
					var lent2=0;

			 $scope.voucher.recordList.sort(sortBy('isDefault',false))
			// console.log($scope.delivery.comcontactList)
			angular.forEach($scope.voucher.recordList, function(n, i) {
				if($scope.voucher.recordList[i].isDefault!=1){
					lent2++
				}
				if(pid2!=true){
				if($scope.voucher.recordList[i].id==pid2){
					$scope.voucher.recordList[i].typep=1
					$scope.zllindex2=i
				}
				}
				if($scope.voucher.recordList[i].isDefault==1){
					$scope.voucher.recordList[i].typep=1
				}
			})
			if(lent2==$scope.voucher.recordList.length){
				$scope.voucher.recordList[0].typep=1
				
			}
			}
			console.log($scope.voucher)
			
			}
		
		})
		}
//note(true)
$scope.isInvoice=function(n){
	if(n==1){
		note(true)
		$scope.bill=''
	$scope.type=2
    $scope.duty=''
	$scope.address=''
	$scope.fphohe=''
    $scope.open=''
    $scope.house=''
    $scope.typr2=0
	$scope.wrhouse=false
	$scope.wropen=false
	$scope.wrfphohe=false
	$scope.wraddress=false
	$scope.wrduty=false
	$scope.wrbill=false
	}
	if(n==0){
		$scope.phid=false;
		$scope.pshow=false;
	}
	
}
var funcode='ADD';
var fid=''
var funcode2='ADD';
var fid2=''
var $e=angular.element;
$scope.dj=function(event,staru,n,index){
	//console.log(staru)
	
	if(event.target.tagName=='LI'){
	 $(event.target).find("input").prop("checked",true)
	if(n==1){
	$scope.zllindex=index	
	}
	if(n==2){
		$scope.zllindex2=index
	}	
	//$scope.receipt=true
   $(event.target).siblings().find("input").removeAttr("checked")
	}else{
		if(event.target.tagName!='A'){
			if(n==1){
	$scope.zllindex=index	
	}
	if(n==2){
		$scope.zllindex2=index
	}
		}
		$(event.target).parent().find("input").prop("checked",true)
		$(event.target).parent().siblings().find("input").removeAttr("checked")
		
	}
	if(staru=='new'){
		
	}else{
		if(n==1){
			$scope.receipt=false
		}
		if(n==2){
			$scope.phid=false
		}
		//$scope.receipt=false
	}
	
    
}

//新地址
$scope.new=function(n){
	if(n==1){
	funcode='ADD';
    fid=''
	$scope.receipt=true;
	$scope.name=''
	$scope.street=''
    $scope.mail=''
	$scope.phone=''
	$scope.cellphone=''
    $scope.typr=0
     $("#last-check").attr("checked",false);
    $scope.selected=''
	$scope.c('')
	$scope.selected2=''
	$scope.c2('')
	$scope.selected3=''
	$scope.wr2=false
	$scope.wrstr=false
	$scope.wrma=false
	$scope.wrph=false
	}
	if(n==2){
	funcode2='ADD';
    fid2=''
	$scope.phid=true;
	$scope.bill=''
	$scope.type=2
    $scope.duty=''
	$scope.address=''
	$scope.fphohe=''
    $scope.open=''
    $scope.house=''
    $scope.typr2=0
      $("#last-check2").attr("checked",false);
	$scope.wrhouse=false
	$scope.wropen=false
	$scope.wrfphohe=false
	$scope.wraddress=false
	$scope.wrduty=false
	$scope.wrbill=false
	}
	
}
//省市县
$scope.living=function(){
	$scope.wrstr=true
	if($scope.list2){
		
	
		if($scope.list2.length!=0){
		if($scope.selected&&$scope.selected2&&$scope.selected3){
		$scope.hidel=false
	}else{
		$scope.hidel=true
		return
	}
	}
		}else{
		if($scope.selected&&$scope.selected2){
		$scope.hidel=false
	}else{
		$scope.hidel=true
		return
	}
	}
	
}
//修改地址
$scope.revamp=function(event,swtie,$event){
	$(event.target).parent().parent().find("input").prop("checked",true)
	//$(en).parent().siblings().find("input").removeAttr("checked")
	console.log($scope.receipt)
	fid=swtie.id
	funcode='UPDATE'
	$scope.receipt=false
		var wdd = JSON.stringify({
			"address": {
				"memberId": constanttest,
				"channel": "PC",
				"deviceNo": "2",
				"id":swtie.id
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
			if(code==0){
				$scope.amend = JSON.parse(data).address
				
					console.log($scope.amend)
					$scope.name=$scope.amend.name
					$scope.street=$scope.amend.detailedAddress
					$scope.mail=$scope.amend.zipNo
					$scope.phone=$scope.amend.telephone
					$scope.cellphone=$scope.amend.mobile
					$scope.typr=$scope.amend.types
					$scope.selected=$scope.amend.province
					$scope.c($scope.amend.province)
					$scope.selected2=$scope.amend.city
					$scope.c2($scope.amend.city)
					$scope.selected3=$scope.amend.county
			}
			})
	$scope.receipt=true
	
	 $event.stopPropagation();
}
//确认收货地址
$scope.ofgoods=function(){
	console.log(funcode,fid)
	if(!$scope.name){
		$scope.wr2=true;
		return;
	}
	if(!$scope.street){
		$scope.wrstr=true;
		return;
	}
	if($scope.list2.length!=0){
		if($scope.selected&&$scope.selected2&&$scope.selected3){
		$scope.hidel=false
	}else{
		$scope.hidel=true
		return
	}
	}else{
		if($scope.selected&&$scope.selected2){
		$scope.hidel=false
	}else{
		$scope.hidel=true
		return
	}
	}
	
	if(!$scope.mail){
		$scope.wrma=true;
		return;
	}
	if(!$scope.phone&&!$scope.cellphone){
		$scope.wrph=true;
		return;
	}
	var staus=0;
	if(angular.element("#last-check").is(":checked")){
		staus=1
	}
	var wdd = JSON.stringify({
			"address": {
				"memberId": constanttest,
				"channel": "PC",
				"deviceNo": "2",
				"functionCode":funcode,
				"id":fid,
				"name":$scope.name,
				"mobile":$scope.cellphone,
				"province":$scope.selected,
				"city":$scope.selected2,
				"county":$scope.selected3,
				"detailedAddress":$scope.street,
				"types":staus,
				'zipNo':$scope.mail,
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
			if(code==0){
				$scope.Sh = JSON.parse(data).address
				if($scope.Sh.status==1){
					if(funcode=='UPDATE'){
						sitew(fid)
					}
					if(funcode=='ADD'){	
					sitew($scope.Sh.applyMsg)
					}
					
				}
				

			}
			console.log($scope.Sh)
			
		})
	
}
$scope.type=2;
$scope.mold=function(event,n){
	$scope.wrbill=false
	 $(event.target).addClass("macrive").siblings().removeClass("macrive")
	$scope.type=n;
}
//设为默认地址
$scope.default=function(tacitly){
	console.log(tacitly)
	var wdd = JSON.stringify({
			"address": {
				"memberId": constanttest,
				"channel": "PC",
				"deviceNo": "2",
				"functionCode":'UPDATE',
				"id":tacitly.id,
				"name":tacitly.name,
				"mobile":tacitly.cellphone,
				"province":tacitly.selected,
				"city":tacitly.selected2,
				"county":tacitly.selected3,
				"detailedAddress":tacitly.street,
				"types":1,
				'zipNo':tacitly.mail
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
						"requestType": "DELIVERYADDRESS",
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
			if(code==0){
				$scope.Sh = JSON.parse(data).address
				if($scope.Sh.status==1){
					$scope.zllindex=0
					sitew(true)
				}
			}
			})
}
//修改发票
$scope.revamp2=function(event,swtie,$event){
	$(event.target).parent().parent().find("input").prop("checked",true)
	//$(en).parent().siblings().find("input").removeAttr("checked")
	console.log($scope.receipt)
	fid2=swtie.id
	funcode2='UPDATE'
	//$scope.receipt=false
	//发票详情
		var wdd = JSON.stringify({
			"invoice": {
				"memberId": constanttest,
				"channel": "PC",
				"deviceNo": "2",
				"invoiceId":swtie.id
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
						"requestType": "INVOICEBYID",
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
			if(code==0){
				$scope.amend2 = JSON.parse(data).invoice.record
				
					console.log($scope.amend2)
					$scope.bill=$scope.amend2.invoiceTitle
					if($scope.amend2.invoiceType=='个人'){
						$scope.type=2
					}else{
						$scope.type=1
					}

				    $scope.duty=$scope.amend2.invoiceIdNumber
					$scope.address=$scope.amend2.companyAddress
					$scope.fphohe=$scope.amend2.phone
				    $scope.open=$scope.amend2.depositBank
				    $scope.house=$scope.amend2.bankAccount
				    $scope.typr2=$scope.amend2.isDefault
			}
			})
	$scope.phid=true
	
	 $event.stopPropagation();
}
//发票
$scope.invoice=function(){
	console.log($scope.type)
	if(!$scope.bill) {
		$scope.wrbill = true;
		return;
	}
	
	if($scope.type==1){
		
		if(!$scope.address) {
		$scope.wraddress = true;
		return;
	}
	if(!$scope.fphohe) {
		$scope.wrfphohe = true;
		return;
	}
		
   if(!$scope.open) {
		$scope.wropen = true;
		return;
	}
  
   if(!$scope.house) {
		$scope.wrhouse = true;
		return;
	}
   if(!$scope.duty) {
		$scope.wrduty = true;
		return;
	}
		$scope.kw='单位'
	}
	if($scope.type==2){
		$scope.kw='个人'
		$scope.address=''
		$scope.fphohe=''
		$scope.duty=''
		$scope.open=''
		$scope.house=''
	}

   var staus2=0;
	if(angular.element("#last-check2").is(":checked")){
		staus2=1
	}
   var wdd = JSON.stringify({
			"invoice": {
				"memberId": constanttest,
				"channel": "PC",
				"deviceNo": "2",
				"functionCode":funcode2, 
				"record":{
			     "id":fid2,
				"invoiceTitle":$scope.bill,
				"invoiceIdNumber":$scope.duty,
				"invoiceType":$scope.kw,
				"phone":$scope.fphohe,
				"companyAddress":$scope.address,
				"depositBank":$scope.open,
				"bankAccount":$scope.house,
				"isDefault":staus2
				}
				
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
						"requestType": "HANDLEINVOICE",
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
		commonHttp.myHttp(md5_obj, data_obj, function(wop, code, error) {
			if(code==0){
				
				$scope.debit = JSON.parse(wop).invoice
				if($scope.debit.status==1){
					
						if(funcode2=='UPDATE'){
						note(fid2)
					}
					if(funcode2=='ADD'){	
					note($scope.debit.applyMsg)
					}
				}
				//note()
				
				console.log($scope.debit)
			}
		})
}
//设为默认发票
$scope.default2=function(tacitly){
	console.log(tacitly)
	var wdd = JSON.stringify({
			"invoice": {
				"memberId": constanttest,
				"channel": "PC",
				"deviceNo": "2",
				"functionCode":'UPDATE',
				"record":{
			     "id":tacitly.id,
				"invoiceTitle":tacitly.invoiceTitle,
				"invoiceIdNumber":tacitly.invoiceIdNumber,
				"invoiceType":tacitly.invoiceType,
				"phone":tacitly.phone,
				"companyAddress":tacitly.companyAddress,
				"depositBank":tacitly.depositBank,
				"bankAccount":tacitly.bankAccount,
				"isDefault":1
				}
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
						"requestType": "HANDLEINVOICE",
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
			if(code==0){
				$scope.She = JSON.parse(data).invoice
				if($scope.She.status==1){
					$scope.zllindex2=0
					note(true)
				}
				console.log($scope.She)
			}
			})
}
//提交订单
$scope.refer=function(){
	if($scope.delivery.comcontactList.length==0){
		alert('请填写收货地址')
		return;
	}
	var stype=0;
	if(angular.element("#zyes").is(":checked")){
		stype=1
		if($scope.voucher.recordList.length==0||$scope.voucher.recordList==undefined){
			alert('是否需要发票，若需要请填写发票内容')
			return;
		}
		$e(".goods2").each(function() {
                if ($e(this).is(":checked")) {
                   $scope.wq2=$e(this).attr("data")
                }

            })
	}
	if(angular.element("#zno").is(":checked")){
		stype=0
		$scope.wq2=''
	}
	  $e(".goods").each(function() {
                if ($e(this).is(":checked")) {
                   $scope.wq=$e(this).attr("data")
                }

           })
	  var productList=[]
	  var words=[]
	  		angular.forEach($scope.arr, function(n, i) {
		angular.forEach($scope.arr[i].detailList, function(n, w) {
		productList.push({
			"skuId":$scope.arr[i].detailList[w].skuId,
			"shopId":$scope.arr[i].shopId,
			"productId":$scope.arr[i].detailList[w].productId,
			"count":$scope.arr[i].detailList[w].count
		})
		
		})
	words.push({
			"shopId":$scope.arr[i].shopId,
			"orderNotice":$scope.arr[i].message
		})	
})
	  	var oader = JSON.stringify({
			"order": {
				"memberId": constanttest,
				"channel": "PC",
				"deviceNo": "2",
				"isInvoice":stype,
				"productList":productList,
				"deliveryId":$scope.wq,
				"invoiceId":$scope.wq2,
				"orderType":'OUT',
				"orderNoticeList":words,
				"sign":$scope.arr[0].sign
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
						"requestType": "ORDERDEAL",
						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
							// new Date().format('yyyy-MM-dd
							// hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', oader)
				}
			}
		});
		
		console.log(oader)
		var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
		commonHttp.myHttp(md5_obj, data_obj, function(data, code, error) {
			if(code==0){
				$scope.ower = JSON.parse(data).order
				console.log($scope.ower)
				if($scope.ower.status==1){
					 	$state.go('index.orders')
				}else{
				$scope.warn = '请重新刷新'
				$('#myModal').modal('show')
				}
				
			}
			if(code==1204){
				$scope.warn = '库存不足'
				$('#myModal').modal('show')
			}
			})
	
	  console.log(oader)
}

}]) .directive('oder', ['$document', function($document) {
        return {
            restrict: 'ACE',
            scope:false,
            link: function(scope, element, attrs) {
                element.on("mouseenter", function() {              
                  element.find("#alter").show()
                })
                element.on("mouseleave", function() {              
                  element.find("#alter").hide()
                })
            }
        }
        
    }]).controller('evaluate',  ['$scope', '$rootScope','$stateParams', '$http', '$state', 'commonHttp', '$document', '$interval', function($scope, $rootScope,$stateParams, $http, $state, commonHttp, $document, $interval) {
    	//$scope.start=[0,1,2,3,4]
if(localStorage.id) {
	var constanttest = localStorage.id
} else {
	localStorage.turl = location.href
	$state.go('login')
	return;
}
$scope.qode=[]
var oader = JSON.stringify({
			"order": {
				"memberId": constanttest,
				"channel": "PC",
				"deviceNo": "2",
			     "orderId":$stateParams.id
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
						"requestType": "ORDERDETAIL",
						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
							// new Date().format('yyyy-MM-dd
							// hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', oader)
				}
			}
		});
		
		var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
		commonHttp.myHttp(md5_obj, data_obj, function(data, code, error) {
			if(code==0){
				$scope.oder = JSON.parse(data).order;
				$scope.opwr=false;
				$scope.opiu=true
				for(var i=0;i<$scope.oder.productList.length;i++){
					$scope.oder.productList[i].evaluate=''
					$scope.oder.productList[i].descLevel=''
//					$scope.qode.push({deliveryLeve:'',descLevel:'',serverLevel:'',skuId:'',productId:$scope.oder.productList[i].productId,evaluate:''})
				}
			}else{
				$scope.opwr=true;
				$scope.opiu=false
			}
			console.log($scope.oder)
			
		})

    $scope.max = 5;
    $scope.ratingVal = 0;
     $scope.ratingVawl = 0;
    $scope.ratingValw=5;
  $scope.readonly = false;
  $scope.onHover = function(val){
    $scope.hoverVal = val;
  };
  $scope.onLeave = function(){
    $scope.hoverVal = null;
  }
  $scope.onChange = function(val){
    $scope.ratingVal = val;
     $scope.ratingVawl = val;
      $scope.ratingValw=val;
  }
$scope.refer=function(){
	if( $scope.ratingValw ==0){
		alert('请对商品进行评分')
			return;
	}
	for(var i=0;i<$scope.oder.productList.length;i++){
			$scope.qode.push({deliveryLeve:'',descLevel:$scope.oder.productList[i].descLevel,serverLevel:'',skuId:$scope.oder.productList[i].SkuId,productId:$scope.oder.productList[i].productId,evaluate:$scope.oder.productList[i].evaluate})
		if($scope.qode[i].evaluate==''){
			$scope.qode[i].evaluate='此用户没有评价'
		}
	
				}
	console.log($scope.qode)
	var oaders = JSON.stringify({
			"evaluate": {
				"memberId": constanttest,
				"channel": "PC",
				"deviceNo": "2",
			     "functionCode":'EVALUATIONOFGOODS',
			     "orderId":$scope.oder.orderId,
			     "evaluateList":$scope.qode,
			     "imageList":[{
			     	imageUrl:'',
			     	type:'',
			     	sort:''
			     }]
			}
		});
		// 按照指定格式传递的数据
		var data_objt = JSON.stringify({
			"packageList": {
				"packages": {
					"header": {
						"UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
						"comId": "CTO2O20170420",
						"comSerial": "comSerial",
						"from": "PAD",
						"orderSerial": "orderId",
						"requestType": "EVALUATIONANDRELY",
						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
							// new Date().format('yyyy-MM-dd
							// hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', oaders)
				}
			}
		});
		console.log(oaders)
		var md5_objt = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_objt);
		commonHttp.myHttp(md5_objt, data_objt, function(data, code, error) {
			if(code==0){
				$scope.oderw = JSON.parse(data).evaluate;
				if($scope.oderw.status=='1'){
//					alert('评价成功')
					$state.go('buyt.cgs01-cgdd',{'staur':0})
				}
				console.log(data)
				
			}
			if(code==1306){
				alert('已评价')
			}
			if(code==1305){
				alert('不能评价')
			}
		})
//	   $scope.$on('kop', function(e, newLocation) {
//    $scope.ratingValw = newLocation;
//  });

}


}]).directive('star', function () {
  return {
    template: '<ul class="rating" ng-mouseleave="leave()">' +
        '<li ng-repeat="star in stars" ng-class="star" >' +
        '<i ng-click="click($index + 1)" ng-mouseover="over($index + 1)" class="glyphicon glyphicon-star"></i>' +
        '</li>' +
        '</ul>',
    scope: {
      ratingValue: '=',
      max: '=',
      readonly: '@',
      onHover: '=',
      onLeave: '=',
      data:'='
    },
    controller: function($scope){
    	
      $scope.ratingValue = $scope.ratingValue || 0;
      $scope.max = $scope.max || 5;
      $scope.click = function(val){
      	console.log($scope.data)
      //	console.log(val)
        if ($scope.readonly && $scope.readonly === 'true') {
          return;
        }
        $scope.ratingValue = val;
         $scope.ratingValw =val;
         	$scope.$emit('kop',val);
        // console.log($scope.ratingValw)
      };
      $scope.over = function(val){
        $scope.onHover(val);
       // $scope.ratingValue = val;
      };
      $scope.leave = function(){
        $scope.onLeave();
      }
    },
    link: function (scope, elem, attrs) {
      elem.css("text-align", "center");
      var updateStars = function () {
        scope.stars = [];
        for (var i = 0; i < scope.max; i++) {
          scope.stars.push({
            filled: i < scope.ratingValue
          });
        }
       // console.log( scope.stars) 
      };
      updateStars();
     
 
      scope.$watch('ratingValue', function (oldVal, newVal) {
      	//	console.log(oldVal,newVal)
        if (oldVal) {
          updateStars();
        }
      });
      scope.$watch('max', function (oldVal, newVal) {
        if (newVal) {
          updateStars();
        }
      });
    }
  };
}).controller('receipt',  ['$scope', '$rootScope','$timeout', '$http', '$state','$stateParams', 'commonHttp', '$document', '$interval', function($scope, $rootScope,$timeout, $http, $state, $stateParams,commonHttp, $document, $interval) {
if(localStorage.id) {
	var constanttest = localStorage.id
	
} else {
	localStorage.turl = location.href
	$state.go('login')
	return;
}
 $('body,html').animate({scrollTop:0},0);


//if(location.href.indexOf("refresh=1") === -1) {
//      setTimeout(function() {
//              location = location.href + "?refresh=1"
//      }, 2000)
//}
//setTimeout(function(){ window.location.reload();}, 1000);

//订单详情
var oader = JSON.stringify({
			"order": {
				"memberId": constanttest,
				"channel": "PC",
				"deviceNo": "2",
			     "orderId":$stateParams.id
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
						"requestType": "ORDERDETAIL",
						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
							// new Date().format('yyyy-MM-dd
							// hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', oader)
				}
			}
		});
		
		var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
		commonHttp.myHttp(md5_obj, data_obj, function(data, code, error) {
			if(code==0){
				$scope.oder = JSON.parse(data).order;
				$scope.opwr=false;
				$scope.opiu=true
//				for(var i=0;i<$scope.oder.productList.length;i++){
//					$scope.oder.productList[i].evaluate=''
//					$scope.oder.productList[i].descLevel=''
////					$scope.qode.push({deliveryLeve:'',descLevel:'',serverLevel:'',skuId:'',productId:$scope.oder.productList[i].productId,evaluate:''})
//				}
			}else{
				$scope.opwr=true;
				$scope.opiu=false
			}
			console.log($scope.oder)
			
		})
		$scope.ops='0.00'
//数量
$scope.upp = function(index, n) {
			console.log(index,n)
			if(n && Number(n) != 0) {
				
				$scope.oder.freight=Number(n).replace(/\D/g, '')
			//	$scope.oder.freight=parseFloat($scope.oder.freight).toFixed(2)
				console.log('1',$scope.oder.freight)
			}
		}
$scope.lkp=function(n){

	if(n!=''&&n!=undefined){
		console.log('1')
		$scope.oder.freight=parseFloat(n).toFixed(2)
	}else{
		console.log($scope.ops)
		$scope.oder.freight='0'
		$scope.oder.freight=parseFloat($scope.oder.freight).toFixed(2)
	}
		
	
	
}
//确认订单
$scope.determine=function(orderId){
	 var str2 = JSON.stringify({ // 将输出参数转为json字符
                "order": { //??
                    memberId: constanttest,
                    channel: "pc",
                    deviceNo: "1",
                    orderId:orderId,
                    postFee:$scope.oder.freight,
                    
                }
            });
            //console.log(str)

            var data_obj = JSON.stringify({
                "packageList": {
                    "packages": {
                        "header": {
                            "UUID": "f498d6d5-535d-579e-9292-795d2b01e483",
                            "comId": "CTO2O20170420",
                            "comSerial": "comSerial",
                            "from": "PAD",
                            "orderSerial": "orderId",
                            "requestType": "UPDATEORDERFREIGHT", //??
                            "sendTime": new Date().format("yyyy-MM-dd hh:mm:ss")
                            //new Date().format('yyyy-MM-dd hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
                        },
                        "request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', str2)
                    }
                }
            });
            console.log(data_obj)
            var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
            commonHttp.myHttp(md5_obj, data_obj, function(data, code, error) {
                $scope.datah = JSON.parse(data);
                console.log($scope.datah)
                if($scope.datah.cart.status == "1"){
                	//alert('确认订单成功')
                		$state.go('buyt.mjds01-yimaichu')
//              		$scope.tank = false;
                }
            });
}
        


}]).controller('terms',  ['$scope', '$rootScope', '$http', '$state','$stateParams', 'commonHttp', '$document', '$interval', function($scope, $rootScope, $http, $state, $stateParams,commonHttp, $document, $interval) {
if(localStorage.id) {
	var constanttest = localStorage.id
} else {
	localStorage.turl = location.href
	$state.go('login')
	return;
}
 $('body,html').animate({scrollTop:0},0);

//订单详情
var oader = JSON.stringify({
			"order": {
				"memberId": constanttest,
				"channel": "PC",
				"deviceNo": "2",
			     "orderId":$stateParams.id
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
						"requestType": "ORDERDETAIL",
						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
							// new Date().format('yyyy-MM-dd
							// hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', oader)
				}
			}
		});
		
		var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
		commonHttp.myHttp(md5_obj, data_obj, function(data, code, error) {
			if(code==0){
				$scope.oder = JSON.parse(data).order;
				$scope.opwr=false;
				$scope.opiu=true
//				for(var i=0;i<$scope.oder.productList.length;i++){
//					$scope.oder.productList[i].evaluate=''
//					$scope.oder.productList[i].descLevel=''
////					$scope.qode.push({deliveryLeve:'',descLevel:'',serverLevel:'',skuId:'',productId:$scope.oder.productList[i].productId,evaluate:''})
//				}
			}else{
				$scope.opwr=true;
				$scope.opiu=false
			}
			console.log($scope.oder)
			
		})
		//银行列表详情
		var oader = JSON.stringify({
			"order": {
				"memberId": constanttest,
				"channel": "PC",
				"deviceNo": "2",
			     "orderId":$stateParams.id
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
						"requestType": "BANKTRANSFERLIST",
						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
							// new Date().format('yyyy-MM-dd
							// hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', oader)
				}
			}
		});
		
		var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
		commonHttp.myHttp(md5_obj, data_obj, function(data, code, error) {
			if(code==0){
				$scope.bank = JSON.parse(data).order;
				console.log($scope.bank)
				
				
			}
			
			
			
		})
		$scope.type=1
		//dianji
		$scope.lets=function(event,n){
	$scope.type=n
	if(n==3){
		$scope.pll=true;
	}
		}
$scope.qx = function() {
					$scope.pll = false;
				}

//确认支付
$scope.nop=function(){
	if($scope.type==3){
		$scope.uji='TRANSFERACCOUNTS';
	}else{
		return;
	}
	var oader = JSON.stringify({
			"order": {
				"memberId": constanttest,
				"channel": "PC",
				"deviceNo": "2",
			     "orderId":$stateParams.id,
			     "payMethod":$scope.uji
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
						"requestType": "BANKTRANSFER",
						"sendTime": new Date().format('yyyy-MM-dd hh:mm:ss')
							// new Date().format('yyyy-MM-dd
							// hh:mm:ss')//当前日期时间，格式为"2017-01-18 13:10:17"
					},
					"request": DES3.encrypt('CTO2OINTERFACE2017#@!%67', oader)
				}
			}
		});
		
		var md5_obj = hex_hmac_md5('CTO2OINTERFACE2017#@!%67', data_obj);
		commonHttp.myHttp(md5_obj, data_obj, function(data, code, error) {
			if(code==0){
				$scope.bankw = JSON.parse(data).order;
				console.log($scope.bankw)
			if($scope.bankw.status==1){
				$state.go('buyt.cgs01-cgdd',{staur:0})
			}else{
				alert('系统异常')
			}
			
			
			}
			if(code=='1309'){
				alert('支付失败')
			}
			})
	
}

}])