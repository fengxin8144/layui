;
layui.define(['view'], function (i) {
    const $ = layui.jquery, view = layui.view,
        e = {
            url: 'http://www.swoft.axing.com/',
            adminGetUserInfo: function (data, callback) {
                this.ajax('admin/getUserInfo', data, callback);
            },
            imGetInfo: function (data, callback) {
                this.ajax('Im/getInfo', data, callback);
            },
            findUser: function (data, callback) {
                this.ajax('Im/findUser', data, callback);
            },
            getToken:function(){
                return layui.data('token').token;
            },
            webSocket:function(url){
                return new WebSocket(url , e.getToken());
            },
            ajax: function (url, data, callback) {
                $.ajax({
                    url: e.url + url,
                    type: 'POST',
                    data: data,
                    headers: {
                        token: e.getToken()
                    },
                    success: function (Response) {
                        if (Response.code === 0) callback(Response.data);
                        const msg = ["<cite>Error：</cite> " + (Response.code || "返回状态码异常"), Response.msg, "<br><cite>URL：</cite>" + url, "<br><cite>请求参数：</cite>" + JSON.stringify(this.data)].join("");
                        if (Response.code === 500) e.error(msg);
                    },
                    error: function (Exception) {
                        const msg = ["<cite>Error：</cite> " + ("接口无响应"), Response.msg, "<br><cite>URL：</cite>" + url, "<br><cite>请求参数：</cite>" + JSON.stringify(this.data)].join("");
                        e.error(msg);
                    }
                });
            },
            error: function (e, a) {
                return view.popup($.extend({
                        content: e,
                        maxWidth: 300,
                        offset: "t",
                        anim: 6,
                        id: "LAY_adminError"
                    },
                    a))
            },
        };
    i("my", e);
});







