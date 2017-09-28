angular.module('yomApp')
	.controller('tickling', ['$scope', '$http', '$state', 'commonHttp', function($scope, $http, $state, commonHttp) {
		var $e = angular.element;
		$scope.feedback = function(en) {
			$scope.kty1 = false;
			console.log('pp')
			if(en.tagName == 'LI') {
				$(en).find("input").prop("checked", true)
				$(en).addClass('bk')
				$(en).siblings().removeClass('bk')
			} else {
				$(en).parent().find("input").prop("checked", true)
				$(en).parent().addClass('bk')
				$(en).parent().siblings().removeClass('bk')
			}
		}
		$scope.feedback2 = function(en) {
			console.log('pp')
			if(en.tagName == 'LI') {
				if(!$(en).find("input").is(':checked')) {
					console.log('oop')
					$(en).find("input").prop("checked", true)
					$(en).addClass('bk')
					$scope.kty2 = false;

				} else {
					console.log('222')
					$(en).find("input").removeAttr("checked")
					$(en).removeClass('bk')
				}
			} else {
				if($(en).is(':checked')) {
					$(en).prop("checked", true)
					$(en).parent().addClass('bk')
					$scope.kty2 = false;

				} else {
					$(en).removeAttr("checked")
					$(en).parent().removeClass('bk')
				}

			}
		}
		$scope.pun = function() {
			if($scope.proposal) {
				$scope.kty3 = false;
			}
		}
		$scope.put = function() {
			var n = 0;
			console.log($e("input[name='we']").length)
			$e("input[name='we']").each(function() {
				if($e(this).is(":checked")) {
					n++
				}

			})
			if(n == 0) {
				$scope.kty1 = true;
			}
			var n2 = 0
			console.log($e("input[name='we']").length)
			$e("input[name='wee']").each(function() {
				if($e(this).is(":checked")) {
					n2++
				}

			})
			if(n2 == 0) {
				$scope.kty2 = true;
			}
			if(!$scope.proposal) {
				$scope.kty3 = true;
			}
			if(n == 0 || n2 == 0 || !$scope.proposal) {
				return;
			} else {
				$scope.kty1 = false;
				$scope.kty2 = false;
				$scope.kty3 = false;
			}
			$e(".alt").show()
			setTimeout(function(){
				var arr=window.location.href;
			    var str=arr.split("!")
				//alert(str[0])
				window.location.href=str[0]+'!'+'/toubu/synr'
			},1000)
			console.log('woaini')

		}

	}])