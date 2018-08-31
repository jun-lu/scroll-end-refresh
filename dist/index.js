'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 
	滑动加载更多
	let a = new ScrollEndPull(threshold, ()=>{
		return new Promise((resolve, reject)=>{
			//请求ajax
			ajax("get data", ()=>{
				//插入数据...
				resolve();//继续监听
			}, ()=>{
				reject();//没有数据了，销毁监听
			})
		});
	});
	

*/

var ScrollEndPull = function () {
	function ScrollEndPull(threshold, onEndPull) {
		_classCallCheck(this, ScrollEndPull);

		//阈值
		this.threshold = threshold || 200;
		this.isEventListener = true;
		this.onEndPull = onEndPull || this.onEndPull;

		this.scrollHandler = this.scrollHandler.bind(this);

		window.addEventListener('scroll', this.scrollHandler, false);
		window.addEventListener('resize', this.scrollHandler, false);
	}

	_createClass(ScrollEndPull, [{
		key: 'scrollHandler',
		value: function scrollHandler() {
			var _this = this;

			//是否还处于监听状态
			if (!this.isEventListener) {
				return;
			}

			var bodyRect = document.body.getBoundingClientRect();
			var availHeight = window.screen.availHeight;
			var scrollTop = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

			if (scrollTop + availHeight + this.threshold > bodyRect.height) {

				this.isEventListener = false;

				this.onEndPull(function () {
					_this.isEventListener = true;
				}, function () {
					_this.isEventListener = false;
				});
			}
		}
	}, {
		key: 'stop',
		value: function stop() {
			this.isEventListener = false;
		}
	}, {
		key: 'start',
		value: function start() {
			this.isEventListener = true;
		}
		//销毁

	}, {
		key: 'destroy',
		value: function destroy() {
			this.isEventListener = false;
			window.removeEventListener('scroll', this.scrollHandler, false);
			window.removeEventListener('resize', this.scrollHandler, false);
		}
	}]);

	return ScrollEndPull;
}();

exports.default = ScrollEndPull;