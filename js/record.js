$(document).ready(function () {
    $("#record-btn").click(function () {
        $(this).fadeOut("fast");
        $(".recordset-box").fadeIn("fast");
    })
    /*$("#reset-btn").click(function(){
     $(".model-min-box").fadeOut("fast");
     $("#start-btn").fadeIn("fast");
     })*/
    $("#inter-btn").click(function () {
        $(this).fadeOut("fast");
        $(".inter-box").fadeIn("fast");
        $(window).scrollTop(200)
    })
    $("#manual-btn").click(function () {
        $(".dir-box").fadeIn("fast");
        $(this).css({"background": "#599CD8", "color": "#fff"})
        $("#auto-btn").css({"background": "#f4f4f4", "color": "#444"})
    })
    $("#auto-btn").click(function () {
        $(".dir-box").fadeOut("fast");
        $(this).css({"background": "#599CD8", "color": "#fff"})
        $("#manual-btn").css({"background": "#f4f4f4", "color": "#444"})
    })

    $(".ftp-rd").click(function () {
        var y = $(this).val();
        if (y == 2) {
            $("input[type=text]").attr("disabled", "disabled");
            $(".change,input[type=text]").css({"color": "#ddd"});
        }
        if (y == 1) {
            $("input[type=text]").removeAttr("disabled");
            $(".change,input[type=text]").css({"color": "#000"});
        }
    });
    $(".edit").click(function () {
        $(".edit-box").show();
        $(".cover-lay").show();

    })
    $(".download").click(function () {
        $(".download-box").show();
        $(".cover-lay").show();

    })

    $(".x-button").click(function () {
        $(".edit-box").hide();
        $(".video-box").hide();
        $(".download-box").hide();
        $(".cover-lay").hide();
        $(".cover-lay2").remove();
        $(".inter-met").hide();
    })

    $("#save-btn").click(function () {
        var d = $("#record-form").serialize();
        d = decodeURIComponent(d, true);
        d = encodeURI(encodeURI(d));
        $(".recordset-box").hide();
        $("#sus-btn").show();
        $("#over-btn").show();
    })

    $("#live-btn,#track-btn").click(function () {
        $(this).hide().next("button").show();

    })
    $("#live-btn-cl,#track-btn-cl").click(function () {
        $(this).hide().prev("button").show();

    })

    $("#inter-log").click(function () {
        $("body").append("<div class='cover-lay2'></div>");
        $(".inter-met").show();
    })
    $("#met-det-btn").click(function () {
        $(".cover-lay2").remove();
        $(".inter-met").hide();
        $(".inter-box").hide();
        $(".inter-obj").show();
    })

    $(window).load(function () {
        var store = 530 * 0.3;
        $("#store").css("width", store)
        $("#store-num").css("margin-left", store + 80)

        var h = $(".footer").position().top;
        if (h < 350) {
            $(".footer").css("margin-top", h - 50);
        }

        banner = new Banner();
        bannerCtrl(banner);

        var ut = getCookie("type");
        if (ut == 0) {
            $(".logout-header").find("span").first().html("管理员")
        }
        else if (ut == 1) {
            $(".logout-header").find("span").first().html("普通用户")
        }

    })

    function Banner() {
        this.logImgUrl = "img/index_logo.png";
        this.logTxt = "录播主机Web管理";
        this.footerTxt = "Copyright © 2016 www.iactive.com.cn. All rights reserved.<br>网动为北京网动网络科技股份有限公司之注册品牌 客服热线 400-708-2233"
    }

    function bannerCtrl(banner) {
        $(".logo-img").attr('src', banner.logImgUrl)
        $(".logo-txt").html(banner.logTxt);
        $(".footer-txt").html(banner.footerTxt);
    }

    function bannerChange(logImgUrl, logTxt, footerTxt) {
        var banner = new Banner();
        banner.logImgUrl = logImgUrl;
        banner.logTxt = logTxt;
        bannerCtrl(banner);
    }


    $(".channel-tab").html("<tr><td></td> <td></td></tr><tr><td></td> <td></td></tr>");
    list();
    $("#disMode").change(function () {
        var mode = $("#disMode  option:selected")
        if (mode.val() == 4) {
            $(".channel-tab").html("<tr><td></td> <td></td></tr><tr><td></td> <td></td></tr>");
            list();
        }
        else if (mode.val() == 2) {
            $(".channel-tab").html("<tr><td></td> <td></td></tr>");
            list();
        }
        else if (mode.val() == 1) {
            $(".channel-tab").html("<tr><td></td></tr>");
            list();
        }
    })

    function list() {
        $(".channel-tab td").mousedown(function (e) {
            if (e.which == 3) {
                var mark = $(this);
                var txt = mark.text();
                $(this).append("<ul id='channel-list'><li>教师跟踪</li><li>教师桌面</li><li>黑板特写</li><li>学生全景</li><li>学生跟踪</li><li style='border-bottom:solid thin #ddd;padding-bottom:5px'>学生跟踪</li> <li>撤销显示<li></ul>");
                var xx = e.pageX - $(this).offset().left;
                var yy = e.pageY - $(this).offset().top;
                $("#channel-list").css({"margin-top": -70 + yy, "margin-left": -70 + xx});
                $("#channel-list").mouseleave(function () {
                    $("#channel-list").remove();
                });
                $("#channel-list li").click(function () {
                    var channel = $(this).text();
                    if (channel == "撤销显示") {
                        mark.text("");
                    }
                    else {
                        $(".channel-tab td").each(function () {
                            if (channel != $(this).text()) {
                                mark.text(channel);
                            }
                            else {
                                $(this).text(txt)
                                mark.text(channel)

                            }
                        })
                    }
                })
            }
        })
    }

    /*$("#copy").zclip({
     path:'js/ZeroClipboard.swf', 
     copy:function(){
     return $("#live-url").text();	 
     }
     });*/


    $(window).scroll(function () {
        var h = $(window).scrollTop() + $(window).height();
        $(".main-sidebar").css("height", h - 87);
    })

    $("#custom").click(function () {
        $("body").append("<div class='cover-lay2'></div>");
        $("body").append("<div class='x-button2'>×</div>");
        $("body").append("<iframe src='customSet.html' id='custom-if'></iframe>");
        $(".x-button2").click(function () {
            $(".cover-lay2,.x-button2,#custom-if").remove();
        })

    })


    function writeCookie(name, value) {
        document.cookie = name + "=" + escape(value);
    }

    function getCookie(cookie_name) {
        var allcookies = document.cookie;
        var cookie_pos = allcookies.indexOf(cookie_name);
        if (cookie_pos != -1) {
            cookie_pos += cookie_name.length + 1;
            var cookie_end = allcookies.indexOf(";", cookie_pos);
            if (cookie_end == -1) {
                cookie_end = allcookies.length;
            }
            var value = unescape(allcookies.substring(cookie_pos, cookie_end));
        }
        return value;
    }

    $("#all-check").click(function () {
        if ($(this).prop('checked') == true) {
            $("input[type='checkbox']").attr("checked", true);
        }
        else {
            $("input[type='checkbox']").attr("checked", false);
        }
    })
    function delCookie(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }


    //接口部分
    var Rurl = "http://localhost:8888";
    // var Hurl=""
    var Rheader = "";

    var DataDeal = {
        //.serialize()获取的值转成json
        formToJson: function (data) {
            data = data.replace(/&/g, "\",\"");
            data = data.replace(/=/g, "\":\"");
            data = "{\"" + data + "\"}";
            return data;
        }
    }

    function formPost(obj, Hurl) {
        var list = $(obj).parent("form").serialize();
        list = decodeURIComponent(list, true);
        var Rjson = DataDeal.formToJson(list);
        $.ajax({
            type: "POST",
            url: Hurl,
            data: Rjson,
            dataType: "json",
            success: function (data) {
            }
        })

    }

    //
    $("#login-btn").click(function () {
        var Hurl = "/back_end/login.php";
        formPost(this, Hurl);
        var pwd = $("#password").val();
        var type = $("input[type='radio']:checked").val();
        writeCookie("type", type);
        writeCookie("login", "0");
        var mnm = getCookie("type");
        $.post(Rurl, {
            "method": "27",
            "type": "1",
            "sub_type": "0",
            "my_id": "",
            "password": pwd
        }, function (data, status) {
            if (status == "sucess") {
                // if(){
                $.post(Rurl, {"method": "71", "my_id": ""}, function () {
                })

                //}
            }

        })
        window.location.href = "basicSet.html"

    })
    //
    $("#logout-btn").click(function () {
        $.post(Rurl, {"method": "32", "my_id": ""});
        window.location.href = "login.html";
        delCookie("login");
        delCookie("type");
    })


    //心跳	
    $(window).load(function () {
        if (getCookie("login") == 0) {
            var heartBeat = setInterval(function () {
                $.ajax({
                    type: "POST",
                    url: Rurl,
                    data: {"method": "1", "my_id": ""},
                    dataType: "json", //jsonp
                    // crossDomain: true, 
                    processData: false,
                    //beforeSend: function(request) {request.setRequestHeader("Access-Control-Allow-Origin");}					
                })
            }, 2000)
        }
    })


    var cmdId;
    var cmdData;
    var cmd = {
        "method": "72",
        "my_id": "",
        "cmd_id": cmdId,
        "cmd_data": cmdData
    }
    //录播开关	
    $("#record-btn").click(function () {

        cmd.cmdId = "92";
        cmd.cmdData = {"is_start": "0"};
        var json_cmd = JSON.stringify(cmd);
        $.post(Rurl, json_cmd);
    })

    $("#over-btn").click(function () {
        cmd.cmdId = "92";
        cmd.cmdData = {"is_start": "1"};
        var json_cmd = JSON.stringify(cmd);
        $.post(Rurl, json_cmd);
    })
    //直播开关
    $("#live-btn").click(function () {
        cmd.cmdId = "94";
        cmd.cmdData = {"is_start": "0"};
        var json_cmd = JSON.stringify(cmd);
        $.post(Rurl, json_cmd);
    })
    $("#live-btn-cl").click(function () {
        cmd.cmdId = "94";
        cmd.cmdData = {"is_start": "1"};
        var json_cmd = JSON.stringify(cmd);
        $.post(Rurl, json_cmd);
    })
    //跟踪开关
    $("#track-btn").click(function () {
        cmd.cmdId = "96";
        cmd.cmdData = {"is_start": "0"};
        var json_cmd = JSON.stringify(cmd);
        $.post(Rurl, json_cmd);
    })
    $("#track-btn-cl").click(function () {
        cmd.cmdId = "96";
        cmd.cmdData = {"is_start": "1"};
        var json_cmd = JSON.stringify(cmd);
        $.post(Rurl, json_cmd);
    })
    //导播开关


    //录制
    $("#save-btn").click(function () {
        var Hurl = "/back_end/status_ctr.php";
        formPost(this, Hurl);
    })

    $("#inter-log").click(function () {
        var url = "/back_end/status_ctr.php";
        formPost(this, Hurl);
    })
    //编辑
    $("#edit").click(function () {
        var url = "/back_end/course_man.php";
        formPost(this, Hurl);
    })
    //删除
    $("#delet-btn").click(function () {
        var Hurl = "/back_end/course_man.php";
        var data = [];
        $("input[type='checkbox']").each(function () {
            if ($(this).prop('checked') == true) {
                data.push($(this).parent("td").next("td").text());
            }

        })
        $.post(Hurl, {"del": data}, function () {
        })
    })


})
