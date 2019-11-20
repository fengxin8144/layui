;
layui.define(function (i) {
    const $ = layui.jquery,
        e = {
            url: 'http://www.swoft.axing.com/',
            adminGetUserInfo: function (data, callback) {
                this.ajax('admin/getUserInfo', data,callback);
            },
            imGetInfo: function (data, callback) {
                this.ajax('Im/getInfo', data,callback);
            },
            ajax: function (url, data,callback) {
                $.ajax({
                    url: e.url + url,
                    type: 'POST',
                    data: data,
                    headers: {
                        token: layui.data('token').token
                    },
                    success: function (data) {
                        if (data.code === 0) callback(data.data);
                        this.error(data.msg);
                    },
                    error: function () {

                    }
                });
            }
        };
    i("my", e);
});







