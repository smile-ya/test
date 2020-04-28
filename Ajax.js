function objtostr(data){
    /*
    {
    "userName" : "lnj",
    "userPwd" ："123456"
    "t":"123243546466546";//时间戳
    }
     */
    data.t = new Date().getTime();
    var res = [];
    for(var key in data){
        //在url中不能有中文，如果出现了中文需要转码，可以调用encodeURIComponent：将中文转变为指定字符
        //url中只可以出现字母/数字/下划线/ASCII码
        res.push(encodeURIComponent(key)+"="+encodeURIComponent(data[key])); //将对象变成数组[userName=lnj,userPWd = 123456];
    }
    return res.join("&");//将数组变成字符串userName=lnj & userPwd=123456

}



function ajax(option){

    //0.将对象转换为字符串
    var str = objtostr(option.data);//key=value & key=value;
    //1.创建一个异步对象
    var xmlhttp,timer;

    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    //2.设置请求方式和请求地址
    /*
    method：请求的类型；GET 或 POST
     url：文件在服务器上的位置
     async：true（异步）或 false（同步） 默认是true
     */

    /*
    在IE浏览器中，如果通过Ajax发送GET请求，那么IE浏览器认为同一个URL只有一个结果，即存在缓存
    因此引入时间戳概念，使url每次都不同，实时更新数据
    console.log(new Date().getTime());
    */
    if(option.type.toUpperCase()==="GET"){
        xmlhttp.open(option.type,option.url+"?"+str,true);
        //3.发送请求
        xmlhttp.send();
    }else{
        //如果请求类型为POST，那么不能像GET那样，即url后面不能接其他字符串，
       //如果需要像 HTML 表单那样 POST 数据，请使用 setRequestHeader() 来添加 HTTP 头。然后在 send() 方法中规定您希望发送的数据：

        xmlhttp.open(option.type,option.url,true)
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");

        //3.发送请求
        xmlhttp.send(str);
    }


    //4.监听状态的变化
    xmlhttp.onreadystatechange = function (ev2){
        /*
        0: 请求未初始化
        1: 服务器连接已建立
        2: 请求已接收
        3: 请求处理中
        4: 请求已完成，且响应已就绪
         */

        if(xmlhttp.readyState === 4){
            //服务器已响应，关闭超时处理定时器
            clearInterval(timer);
            //判断响应是否请求成功
            if(xmlhttp.status >= 200 && xmlhttp.status < 300 ||
                xmlhttp.status === 304) {
                //5.处理返回的结果
                //console.log("接收到服务器返回的数据"+xmlhttp.responseText);
                option.success(xmlhttp);
            }else{
                //console.log("没有接收到服务器返回的数据");
               option.error(xmlhttp);
            }
        }
    }
    //判断外界是否传入了超时时间
    if(option.timeout){
        timer = setInterval(function (){
            //如果超时，则中断请求
            xmlhttp.abort();
            clearInterval(timer);
        },option.timeout);
    }
}