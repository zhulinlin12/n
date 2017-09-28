angular.module('animate', ['ui.bootstrap', 'ngAnimate'])
	.controller('CarouselCtrl', ['$scope', function($scope) {
		//首页轮播图
		$scope.myInterval = 1000;
		$scope.noWrapSlides = false;
		// var slides = $scope.slides = [];
		
		$scope.addSlide = function() {
			$scope.$on('top', function(e, top) {
			$scope.top = top;
		angular.element(document.querySelector('.carousel .left>.glyphicon-chevron-left'))
						.parent().html('<');
		angular.element(document.querySelector('.carousel .right>.glyphicon-chevron-right'))
						.parent().html('>');
				// angular.forEach($scope.top, function(item) {
				// 	slides.push({
				// 		image: item
				// 	});
				// })
				// console.log(slides)
				$scope.$watch('slides', function() {
//					angular.element(document.querySelector('.carousel .left>.glyphicon-chevron-left'))
//						.parent().html('<');
//					angular.element(document.querySelector('.carousel .right>.glyphicon-chevron-right'))
//						.parent().html('>');
////						console.log(slides);
				});
			});
		};
		$scope.addSlide();

	}]);