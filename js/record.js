$(document).ready(function(){
   $("#record-btn").click(function(){
	  $(this).fadeOut("fast");
	  $(".recordset-box").fadeIn("fast");
   })
    /*$("#reset-btn").click(function(){
	  $(".model-min-box").fadeOut("fast");
	  $("#start-btn").fadeIn("fast");
   })*/
   $("#inter-btn").click(function(){
	  $(this).fadeOut("fast");
	  $(".inter-box").fadeIn("fast");
	  $(window).scrollTop(200)
   })
   $("#manual-btn").click(function(){
	  $(".dir-box").fadeIn("fast");
	  $(this).css({"background":"#599CD8","color":"#fff"})
	  $("#auto-btn").css({"background":"#f4f4f4","color":"#444"})
   })
   $("#auto-btn").click(function(){
	  $(".dir-box").fadeOut("fast");
	   $(this).css({"background":"#599CD8","color":"#fff"})
	   $("#manual-btn").css({"background":"#f4f4f4","color":"#444"})
   })

   $(":radio").click(function(){
	 var y=$(this).val();
     if(y==2){$("input[type=text]").attr("disabled","disabled");$(".change").css({"color":"#ddd"});}
	 if(y==1){$("input[type=text]").removeAttr("disabled");$(".change").css({"color":"#000"});}
   });
  $("#edit").click(function(){
	  $(".edit-box").css("display","block");
      $(".cover-lay").css("display","block");
  
  })
   $(".x-button").click(function(){	   
	  $(".edit-box").css("display","none");
	  $(".video-box").css("display","none");
      $(".cover-lay").css("display","none");
  
  })
    $("#dem").click(function(){
      var url="http://player.youku.com/embed/XMTU0OTc0MzIwMA;"
	  $("#video").attr("src",url);
	  $(".video-box").css("display","block");
      $(".cover-lay").css("display","block"); 
  })
   
   $("#save-btn").click(function(){
	    var d=$("#record-form").serialize();
		 d = decodeURIComponent(d,true);
		 d = encodeURI(encodeURI(d));
	   $(".recordset-box").hide();
	   $("#sus-btn").show();
	   $("#over-btn").show();   
   })
   
   $("#inter-log").click(function(){
		$(".inter-box").hide();
		$(".inter-obj").show();
	})
   
   
    $(window).load(function(){
		var store=530*0.3;
		$("#store").css("width",store)
		$("#store-num").css("margin-left",store+100)
	})
	
	$(".channel-tab").html("<tr><td></td> <td></td></tr><tr><td></td> <td></td></tr>");
	list();
	$("#disMode").change(function(){
	var mode=$("#disMode  option:selected")
	if(mode.val()==4){
	$(".channel-tab").html("<tr><td></td> <td></td></tr><tr><td></td> <td></td></tr>");list();}
	else if(mode.val()==2){
	$(".channel-tab").html("<tr><td></td> <td></td></tr>");list();}
	else if(mode.val()==1){
	$(".channel-tab").html("<tr><td></td></tr>");list();}
	})
	
	function list(){
	$(".channel-tab td").click(function(){
		 var mark=$(this);
		 $(this).append("<ul id='channel-list'><li>教师跟踪</li><li>教师桌面</li><li>黑板特写</li><li>学生全景</li><li>学生跟踪</li><li style='border-bottom:solid thin #ddd;padding-bottom:5px'>学生跟踪</li> <li>撤销显示<li></ul>");
         $("#channel-list").mouseleave(function(){$("#channel-list").remove(); });
	     $("#channel-list li").click(function(){
	         var channel=$(this).text();
			 if(channel=="撤销显示"){ mark.text("");	}
			 else{
		     mark.text(channel);	}		 
	     })		 
	  })
	}
		
    // $("#copy").zclip({
           // path:'js/ZeroClipboard.swf', 
           // copy:function(){
           // return $("#live-url").text();	 
           // }
   // });
})
