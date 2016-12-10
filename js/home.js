/*首頁 Y02*/
//首頁 準備好
$('#Home_Y02_a').ready(function()
{
	try
	{
		//刻板
		new function()
		{				
			//第一部份刻板
			new function()
			{
				//共用監聽 依照數字給予寬度改變
				var Notification_Text_Change = function()
				{
				    var value = $('#' + this.id).html();
				    var style = {};
				    if(value < 0)
				    {
				    	$('#' + this.id).html(0);
				    }
				    else if(value <= 9)
				    {
				    	style.height = "31px";
				    	style.width = "16px";
				    }
				    else if(value <= 99)
				    {
				    	style.height = "31px";
				    	style.width = "35px";
				    }
				    else if(value <= 999)
				    {
				    	style.height = "31px";
				    	style.width = "50px";
				    }
				    $('#' + this.id).css(style);
				    if(value > 999)
			    	{
			    		console.log('test');
			    		$('#' + this.id).html(999);
			    	}
				};
				//首頁主頁面
				$('#Home_Y02_a').append("<div id='Home_Y02_Main'></div>");
				$('#Home_Y02_a').css
				({
					"display":"block",
				    "height":"calc(100% - 32px)",
				    "padding":"0px",
				    "margin-left":"-2px",
				    "overflow":"auto",
				    "background-color":"rgb(237, 237, 237)",
				    "position":"relative"
				});
				$('#Home_Y02_Main').css
				({
					"width":"910px",
					"margin":"auto",
					"height":"200px",
					"position":"absolute",
					"left":"0px",
					"top":"0px",
					"right":"0px",
					"bottom":"0px"
				});
				//首頁 - 待處理的工單
				new function()
				{
					//首頁 - 待處理的工單
					$('#Home_Y02_Main').append("<div id='Home_Y02_Main_01'></div>");
					$('#Home_Y02_Main_01').css
					({
						"height":"210px",
						"width":"248px",
						"float":"left",
						"cursor": "pointer",
					});				
					//首頁 - 待處理的工單 - 圖片
					$('#Home_Y02_Main_01').append("<div id='Home_Y02_Main_01_Pic'></div>");
					$('#Home_Y02_Main_01_Pic').css
					({
						"background-image":"url(image/in-progress_icon.png)",
					    "width":"140px",
					    "height":"140px",
					    "float":"left",
					    "cursor": "pointer",
					});
					//首頁 - 待處理的工單 - 通知
					$('#Home_Y02_Main_01').append("<div id='Home_Y02_Main_01_Notification'></div>");
					$('#Home_Y02_Main_01_Notification').css
					({
						"border-radius":"38px",
					    "-webkit-border-radius":"38px",
					    "-moz-border-radius":"38px",
					    "width":"60px",
					    "height":"60px",
					    "background-color":"rgb(247,68,63)",
				        "float":"left",
				        "position":"relative",
				        "margin-top":"-29px",
				        "margin-left":"-34px",
				        "cursor": "pointer"
					});
					//首頁 - 待處理的工單 - 通知文字
					$('#Home_Y02_Main_01_Notification').append("<div id='Home_Y02_Main_01_Notification_Text'></div>");
					$('#Home_Y02_Main_01_Notification_Text').css
					({
						"color":"white",
						"font-size":"20pt",
						"margin":"auto",
						"position":"absolute",
						"left":"0px",
						"right":"0px",
						"top":"0px",
						"bottom":"0px",
						"cursor": "pointer",
					});
					//首頁 - 待處理的工單 - 通知文字 - 改變監聽
					$("#Home_Y02_Main_01_Notification_Text").bind("DOMSubtreeModified",Notification_Text_Change);
					//首頁 - 待處理的工單 - 文字
					$('#Home_Y02_Main_01').append("<div id='Home_Y02_Main_01_Text'></div>");
					$('#Home_Y02_Main_01_Text').html(language["home_waitPendingTask"][languageStatus]);
					$('#Home_Y02_Main_01_Text').css
					({
						"width":"140px",
						"float":"left",
						"padding-left":"8px",
						"padding-top":"30px",
						"font-size":"20px",
						"cursor": "pointer",
						"font-family":'"Open Sans","Tahoma","Hiragino Sans GB","Microsoft YaHei"'
					});
					$('#Home_Y02_Main_01').click(function(){
						createMyTaskPage(false);
					});
				};
				//首頁 - 待接單的工單
				new function()
				{
					//首頁 - 待接單的工單
					$('#Home_Y02_Main').append("<div id='Home_Y02_Main_02'></div>");
					$('#Home_Y02_Main_02').css
					({
						"height":"210px",
						"width":"248px",
						"float":"left"
					});				
					//首頁 - 待接單的工單 - 圖片
					$('#Home_Y02_Main_02').append("<div id='Home_Y02_Main_02_Pic'></div>");
					$('#Home_Y02_Main_02_Pic').css
					({
						"background-image":"url(image/orders_icon.png)",
					    "width":"140px",
					    "height":"140px",
					    "float":"left",
						"cursor": "pointer",
					});
					//首頁 - 待接單的工單 - 通知
					$('#Home_Y02_Main_02').append("<div id='Home_Y02_Main_02_Notification'></div>");
					$('#Home_Y02_Main_02_Notification').css
					({
						"border-radius":"38px",
					    "-webkit-border-radius":"38px",
					    "-moz-border-radius":"38px",
					    "width":"60px",
					    "height":"60px",
					    "background-color":"rgb(247,68,63)",
				        "float":"left",
				        "position":"relative",
				        "margin-top":"-29px",
				        "margin-left":"-34px",
						"cursor": "pointer",
					});
					//首頁 - 待接單的工單 - 通知文字
					$('#Home_Y02_Main_02_Notification').append("<div id='Home_Y02_Main_02_Notification_Text'></div>");
					$('#Home_Y02_Main_02_Notification_Text').css
					({
						"color":"white",
						"font-size":"20pt",
						"margin":"auto",
						"position":"absolute",
						"left":"0px",
						"right":"0px",
						"top":"0px",
						"bottom":"0px",
						"cursor": "pointer",
					});
					//首頁 - 待接單的工單 - 通知文字 - 改變監聽
					$("#Home_Y02_Main_02_Notification_Text").bind("DOMSubtreeModified",Notification_Text_Change);
					//首頁 - 待接單的工單 - 文字
					$('#Home_Y02_Main_02').append("<div id='Home_Y02_Main_02_Text'></div>");
					$('#Home_Y02_Main_02_Text').html(language["home_waitCheckTask"][languageStatus]);
					$('#Home_Y02_Main_02_Text').css
					({
						"width":"140px",
						"float":"left",
						"padding-left":"8px",
						"padding-top":"30px",
						"font-size":"20px",
						"font-family":'"Open Sans","Tahoma","Hiragino Sans GB","Microsoft YaHei"',
						"cursor": "pointer",
					});
					$('#Home_Y02_Main_02').click(function(){
						createMyExecuteTaskPage(true);
					});
				};
				//首頁 - 執行中的工單
				new function()
				{
					//首頁 - 執行中的工單
					$('#Home_Y02_Main').append("<div id='Home_Y02_Main_03'></div>");
					$('#Home_Y02_Main_03').css
					({
						"height":"210px",
						"width":"248px",
						"float":"left"
					});				
					//首頁 - 執行中的工單 - 圖片
					$('#Home_Y02_Main_03').append("<div id='Home_Y02_Main_03_Pic'></div>");
					$('#Home_Y02_Main_03_Pic').css
					({
						"background-image":"url(image/in-progress_icon.png)",
					    "width":"140px",
					    "height":"140px",
					    "float":"left",
						"cursor": "pointer",
					});
					//首頁 - 執行中的工單 - 通知
					$('#Home_Y02_Main_03').append("<div id='Home_Y02_Main_03_Notification'></div>");
					$('#Home_Y02_Main_03_Notification').css
					({
						"border-radius":"38px",
					    "-webkit-border-radius":"38px",
					    "-moz-border-radius":"38px",
					    "width":"60px",
					    "height":"60px",
					    "background-color":"rgb(247,68,63)",
				        "float":"left",
				        "position":"relative",
				        "margin-top":"-29px",
				        "margin-left":"-34px",
						"cursor": "pointer",
					});
					//首頁 - 執行中的工單 - 通知文字
					$('#Home_Y02_Main_03_Notification').append("<div id='Home_Y02_Main_03_Notification_Text'></div>");
					$('#Home_Y02_Main_03_Notification_Text').css
					({
						"color":"white",
						"font-size":"20pt",
						"margin":"auto",
						"position":"absolute",
						"left":"0px",
						"right":"0px",
						"top":"0px",
						"bottom":"0px",
						"cursor": "pointer",
					});
					//首頁 - 執行中的工單 - 通知文字 - 改變監聽
					$("#Home_Y02_Main_03_Notification_Text").bind("DOMSubtreeModified",Notification_Text_Change);
					//首頁 - 執行中的工單 - 文字
					$('#Home_Y02_Main_03').append("<div id='Home_Y02_Main_03_Text'></div>");
					$('#Home_Y02_Main_03_Text').html(language["home_onDoingTask"][languageStatus]);
					$('#Home_Y02_Main_03_Text').css
					({
						"width":"140px",
						"float":"left",
						"padding-left":"8px",
						"padding-top":"30px",
						"font-size":"20px",
						"font-family":'"Open Sans","Tahoma","Hiragino Sans GB","Microsoft YaHei"',
						"cursor": "pointer",
					});
					$('#Home_Y02_Main_03').click(function(){
						createMyExecuteTaskPage(false);
					});
				};
				//首頁 - 待簽核的工單
				new function()
				{
					//首頁 - 待簽核的工單
					$('#Home_Y02_Main').append("<div id='Home_Y02_Main_04'></div>");
					$('#Home_Y02_Main_04').css
					({
						"height":"210px",
						"width":"166px",
						"float":"left"
					});				
					//首頁 - 待簽核的工單 - 圖片
					$('#Home_Y02_Main_04').append("<div id='Home_Y02_Main_04_Pic'></div>");
					$('#Home_Y02_Main_04_Pic').css
					({
						"background-image":"url(image/check_icon.png)",
					    "width":"140px",
					    "height":"140px",
					    "float":"left",
						"cursor": "pointer",
					});
					//首頁 - 待簽核的工單 - 通知
					$('#Home_Y02_Main_04').append("<div id='Home_Y02_Main_04_Notification'></div>");
					$('#Home_Y02_Main_04_Notification').css
					({
						"border-radius":"38px",
					    "-webkit-border-radius":"38px",
					    "-moz-border-radius":"38px",
					    "width":"60px",
					    "height":"60px",
					    "background-color":"rgb(247,68,63)",
				        "float":"left",
				        "position":"relative",
				        "margin-top":"-29px",
				        "margin-left":"-34px",
						"cursor": "pointer",
					});
					//首頁 - 待簽核的工單 - 通知文字
					$('#Home_Y02_Main_04_Notification').append("<div id='Home_Y02_Main_04_Notification_Text'></div>");
					$('#Home_Y02_Main_04_Notification_Text').css
					({
						"color":"white",
						"font-size":"20pt",
						"margin":"auto",
						"position":"absolute",
						"left":"0px",
						"right":"0px",
						"top":"0px",
						"bottom":"0px",
						"cursor": "pointer",
					});
					//首頁 - 待簽核的工單 - 通知文字 - 改變監聽
					$("#Home_Y02_Main_04_Notification_Text").bind("DOMSubtreeModified",Notification_Text_Change);
					//首頁 - 待簽核的工單 - 文字
					$('#Home_Y02_Main_04').append("<div id='Home_Y02_Main_04_Text'></div>");
					$('#Home_Y02_Main_04_Text').html(language["home_waitSignTask"][languageStatus]);
					$('#Home_Y02_Main_04_Text').css
					({
						"width":"140px",
						"float":"left",
						"padding-left":"8px",
						"padding-top":"30px",
						"font-size":"20px",
						"font-family":'"Open Sans","Tahoma","Hiragino Sans GB","Microsoft YaHei"',
						"cursor": "pointer",
					});
					$('#Home_Y02_Main_04').click(function(){
						createMyProcessingTaskPage(true);
					});
				};
				//待處理的工單
				$('#Home_Y02_Main_01_Notification_Text').html(0);
				//待接單的工單
				$('#Home_Y02_Main_02_Notification_Text').html(0);
				//執行中的工單
				$('#Home_Y02_Main_03_Notification_Text').html(0);
				//待簽核的工單
				$('#Home_Y02_Main_04_Notification_Text').html(0);
				//首頁設定值
				var dc = (+new Date());
				jqueryAjax_Get(localStorage.task+'/task/me?_dc='+dc,function(Result)
				{
					//待處理的工單
					$('#Home_Y02_Main_01_Notification_Text').html(Result.data.myselfProcessed);
					//待接單的工單
					$('#Home_Y02_Main_02_Notification_Text').html(Result.data.executeWaitingReceive);
					//執行中的工單
					$('#Home_Y02_Main_03_Notification_Text').html(Result.data.executeProcessing);
					//待簽核的工單
					$('#Home_Y02_Main_04_Notification_Text').html(Result.data.signatureProcessing);
				},null,null);
			};
		};
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
});