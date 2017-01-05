//获取页面URL参数名
export function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURI(r[2]);
	return null;
};

//设置cookies
export function setCookie(name, value, day, isGlobal) {
	var Days = day || 7; //此 cookie 将被保存 7 天
	var exp = new Date();
	var ckStr = ''
		//	设置时间为realTime,即关闭浏览器即失效
	if (day == "realTime") {
		ckStr = name + "=" + escape(value) + "";
	} else {
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
		ckStr = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
	}

	ckStr += ";path=/";
	document.cookie = ckStr;
	//	return value;
};

//读取cookies
export function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg)) {
		return unescape(arr[2]);
	} else {
		return null;
	}
};

//删除cookies
export function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null) {
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
	}
};

export function changeNum(num) {
    var res = Number(num);
    if (res < 10) {
        return '0' + res;
    }
    return res + '';
}

// 时间戳(精确到秒)转 yyyy-mm-dd HH:MM:SS
export function dateFmt(dateTime) {
	var tempDateTime = dateTime ? dateTime*1000 : new Date().getTime();
	var dateTrans = new Date(tempDateTime);
	return changeNum(dateTrans.getMonth()+1)  + '-'
		+ changeNum(dateTrans.getDate()) + ' '
		+ changeNum(dateTrans.getHours()) + ':'
		+ changeNum(dateTrans.getMinutes()) + ':'
		+ changeNum(dateTrans.getSeconds());
}
