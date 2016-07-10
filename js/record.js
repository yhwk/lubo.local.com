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
    $("#edit").click(function () {
        $(".edit-box").css("display", "block");
        $(".cover-lay").css("display", "block");

    })
    $("#download").click(function () {
        $(".download-box").css("display", "block");
        $(".cover-lay").css("display", "block");

    })

    $(".x-button").click(function () {
        $(".edit-box").css("display", "none");
        $(".video-box").css("display", "none");
        $(".download-box").css("display", "none");
        $(".cover-lay").css("display", "none");

    })
    $("#dem").click(function () {
        var url = "http://player.youku.com/embed/XMTU0OTc0MzIwMA;"
        $("#video").attr("src", url);
        $(".video-box").css("display", "block");
        $(".cover-lay").css("display", "block");
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
        $(".inter-box").hide();
        $(".inter-obj").show();
    })


    $(window).load(function () {
        var store = 530 * 0.3;
        $("#store").css("width", store)
        $("#store-num").css("margin-left", store + 80)

        var h = $(".footer").position().top;
        if (h < 350) {
            $(".footer").css("margin-top", 250);
        }

        banner = new Banner();
        bannerCtrl(banner);
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
                        mark.text(channel);
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


    //接口部分
    var Rurl = "http://localhost:8888";
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

    function formPost(obj) {
        var list = $(obj).parent("form").serialize();
        list = decodeURIComponent(list, true);
        var Rjson = DataDeal.formToJson(list);
        console.log(Rjson);
        $.ajax({
            type: "POST",
            url: Rurl,
            data: Rjson,
            dataType: "json",
            processData: false,
            success: function (data) {
                console.log(data);
            },
            error: function () {
                console.log("233");
            }

        })
    }

    //
    $("#login-btn").click(function () {
        formPost(this);
    })

})
