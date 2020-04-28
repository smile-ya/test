;(function ($,window){
    $.extend({
        addCookie:  function (key, value, day, path, domain) {
            //1.处理默认保存的路径
            //if(!path){
            // var index = window.location.pathname.lastIndexOf("/");
            // var currentPath = window.location.pathname.slice(0,index);//截取路径
            // path = currentPath;
            // }
            var index = window.location.pathname.lastIndexOf("/");
            var currentPath = window.location.pathname.slice(0, index);
            path = path || currentPath;//如果传入了path，则设置为传入的path，否则获取默认路径
            //2.处理默认保存的domain
            domain = domain || document.domain;//如果传入了domain。则设置为传入的domain，否则获取默认domain
            //3.处理默认的过期时间
            if (!day) {
                document.cookie = key + "=" + value + ";path=" + path + ";domain=" + domain + ";"
            } else {
                var date = new Date();
                date.setDate(date.getDate() + day);
                document.cookie = key + "=" + value + ";expires=" + date.toGMTString() + ";" +
                    ";path=" + path + ";domain=" + domain + ";";
            }
        },
        getCookie:function (key) {
        var res = document.cookie.split(";");//将字符串以分号为界限切割为数组
        for (var i = 0; i < res.length; i++) {
            // console.log(res[i]);
            var temp = res[i].split("=");
            if(temp[0] === key)
                return temp[1];
            //trim() 方法用于删除字符串的头尾空格
            //trim() 方法不会改变原始字符串。

        }
    },
        delCookie:function (key,path){
        addCookie(key,getCookie(key),-1,path);
    }
    })




})