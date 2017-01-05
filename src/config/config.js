
var isTest = /192.168|localhost|istest/i.test(location.href);
var ua = navigator.userAgent.toLowerCase();
// var ua = isTest && !debug ? 'icomico_adr.Mozilla/5.0 (Android; Mobile; rv:14.0) Gecko/14.0 Firefox/14.0' : navigator.userAgent.toLowerCase();

var CONFIG = {
	ygActId: 37, //云购活动Id
	imgBase: 'http://cdn.icomicool.cn/',
	imgAlt: '可米酷漫画,comicool,手机漫画,原创漫画,漫画app',
    postImgBase: 'http://up.cdn.icomico.com/', //贴吧图片前缀
    ua: ua,
	isMobile: ua.indexOf('mobile') > 0,
	isWeixin: (/micromessenger/.test(ua)) ? true : false,
	isQQ: (/qq\//.test(ua)) ? true : false,
	isIOS: ua.indexOf('(ip') > 0 && this.isMobile,
	isWeibo: (/Weibo/i.test(ua)) ? true : false,
	isApp: (/icomico/i.test(ua)) ? true : false,
	isIOSApp: (/icomico_ios./i.test(ua)) ? true : false,
	isAndroidApp: (/icomico_adr./i.test(ua)) ? true : false,
};

if (!isTest) {
    CONFIG.postBase = 'http://shop.comicool.cn/api/v1/';
    CONFIG.ajaxBase = 'http://proxy.icomico.com/';
} else {
    CONFIG.postBase = 'http://shop.comicool.cn/api/v1/';//'http://shop.ismanhua.com:8000/api/v1/';
    CONFIG.ajaxBase = 'http://121.201.7.97/';
}

function callAppFunction(func, argsBase, callback) {
	var reg = /\/\d{6}\/(.*)\//gi;
	var regStr = reg.exec(window.location.pathname);
	var sourceid = regStr ? RegExp.$1 : '';
	argsBase.source_id = sourceid;

	return callAppFunctionBase(func, argsBase, callback);

	function callAppFunctionBase(func, args, callback) {
		var argsString = JSON.stringify(args);
		if (CONFIG.isAndroidApp || CONFIG.isAndroidPPTV) {
			if (!comicool) {
				return false;
			}
			var result = eval("comicool." + func + "('" + argsString + "');");
			if (callback) {
				callback(result);
			}
		} else if (CONFIG.isIOSApp || CONFIG.isIOSPPTV) {
			function handleCallback(func, args) {
				if (func != "setJSCallback") {
					return;
				}
				for (var eventName in args) {
					(function(eventName) {
						window.WebViewJavascriptBridge.registerHandler(args[eventName], function(data, responseCallback) {
							var appDataStr = JSON.stringify(data);
							eval(args[eventName] + "('" + appDataStr + "');");
						});
					})(eventName);
				}
			}

			if (window.WebViewJavascriptBridge) {
				window.WebViewJavascriptBridge.callHandler(func, argsString, callback);
				handleCallback(func, args);
			} else {
				document.addEventListener('WebViewJavascriptBridgeReady', function() {
					window.WebViewJavascriptBridge.callHandler(func, argsString, callback);
					handleCallback(func, args);
				}, false);
			}
		} else {
			return false;
		}
		return true;
	}
}

function setByUserLoginStatus(callbacks) {
	var userInfo = {};
	var done = [];
	var isLogin = callbacks.isLogin;
	var unLogin = callbacks.unLogin;
	var all = callbacks.all;
	var loginState = false;
	var cb = function(i) {
		done.push(i);

		//所有异步任务完成
		if (fnQueue.length === done.length) {
			if (userInfo.hasOwnProperty('ccid') &&
				userInfo.hasOwnProperty('cctoken') &&
				typeof isLogin === 'function') {
				loginState = true;
				isLogin(userInfo);
			} else if (typeof unLogin === 'function') {
				unLogin(userInfo);
			}
			typeof all === 'function' && all(userInfo, loginState);
		}
	};
	var fnQueue = [
		function(i) {
			callAppFunction('getDeviceID', {}, function(DeviceID) {
				userInfo.device_id = DeviceID;
				cb(i);
			});
		},
		function(i) {
			callAppFunction('getChannelId', {}, function(ChannelId) {
				userInfo.channel = ChannelId;
				cb(i);
			});
		},
		function(i) {
			callAppFunction('getAppVersionName', {}, function(AppVersionName) {
				userInfo.version_code = AppVersionName.split('.').pop();
				cb(i);
			});
		},
		function(i) {
			if (CONFIG.isIOSApp) {
				userInfo.os_type = 'ios';
			} else if (CONFIG.isAndroidApp) {
				userInfo.os_type = 'anr';
			}
			cb(i);
		},
		function(i) {
			callAppFunction('getAccountInfo', {}, function(result) {
				if (CONFIG.isAndroidApp) {
					result = result ? JSON.parse(result) : {};
				}
				for (var n in result) {
					if (result.hasOwnProperty(n)) {
						userInfo[n] = result[n];
					}
				}
				cb(i);
			});
		}
	];
	fnQueue.forEach(function(fn, i) {
		fn(i);
	});
}

// 跳转登录页
function toLoginPage() {
	if (CONFIG.isApp && !CONFIG.isPPTV) {
		callAppFunction('openLoginPage');
	} else {
		window.location.href = 'm.comicool.cn/login.html';
	}
}

export {
	CONFIG,
	// fetchApi,
	callAppFunction,
	setByUserLoginStatus,
	toLoginPage,
}