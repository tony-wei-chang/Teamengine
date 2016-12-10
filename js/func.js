//是否顯示錯誤訊息
var App_Debug = false;
//除了工單頁面 其他頁面的物件
var GridPanel_Object = {};
//共用文字語言包
var allFunc_Language = 
{
	"Auth_Fail": 
	{
		"T": "憑證失效",
		"S": "凭证失效"
	},
	"Error": 
	{
		"T": "錯誤",
		"S": "错误"
	},
	"Login_Timeout": 
	{
		"T": "登入逾時",
		"S": "登入逾时"
	},
	"Change_Password": 
	{
		"T": "密碼到期,請變更密碼",
		"S": "密码到期,请变更密码"
	},
	"No": 
	{
		"T": "取消",
		"S": "取消"
	},
	"Yes": 
	{
		"T": "確認",
		"S": "确认"
	},
	"success": 
	{
		"T": "成功",
		"S": "成功"
	}
};

//物件水平垂直置中
jQuery.fn.center = function()
{
    try
	{
		this.css("position","absolute");
		this.css("top", Math.max(0,(($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
		this.css("left", Math.max(0,(($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
		return this;
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}
//設定物件模糊效果
function addBlur_Css(id)
{
	try
	{
		if($('#'+id))
		{
			$('#'+id).addClass("Dom_Blur");
		}
	}
	catch(err)
	{
		console.log(err);
	}
}
//取消物件模糊效果
function removeBlur_Css(id)
{
	try
	{
		if($('#'+id))
		{
			$('#'+id).removeClass("Dom_Blur");
		}
	}
	catch(err)
	{
		console.log(err);
	}
}
//取得日期
function getDate(date)
{
	try
	{
		if(date)
		{
			var d = new Date(date);

			var month = d.getMonth()+1;
			var day = d.getDate();

			var output = d.getFullYear() + '/' +
				(month<10 ? '0' : '') + month + '/' +
				(day<10 ? '0' : '') + day;
			return output;
		}
		else
		{
			return ' ';
		}
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}		
	}
}
//取得時間
function getTime(date)
{
	try
	{
		if(date)
		{
			var d = new Date(date);

			var hours = d.getHours();
			var minutes = d.getMinutes();
			var seconds = d.getSeconds();

			var output = (hours<10 ? '0' : '') + hours + ':' +
				(minutes<10 ? '0' : '') + minutes;/* + ':' +
				(seconds<10 ? '0' : '') + seconds;*/
			return output;
		}
		else
		{
			return ' ';
		}
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}		
	}
}
//Ajax Get 共用
function jqueryAjax_Get(url,successFunc,errorFunc,failFunc)
{
	try
	{
		$.ajax
		({
			url:url,
			type:"GET",
			beforeSend:function(xhr)
			{
				xhr.setRequestHeader("Content-Type","application/json");
				xhr.setRequestHeader("Authorization","JAUTH "+localStorage.Auth);
			},
			success:function(result)
			{
				successFunc(result);
			},
			error:function(jqXHR, textStatus, errorThrown)
			{
				//在已經登入後才需顯示憑證失效
				if(JSON.parse(jqXHR.responseText).message == "憑證失效" && User_Infomation != null)
				{
					var ajaxMsg = showMsg(allFunc_Language["Error"][languageStatus],allFunc_Language["Login_Timeout"][languageStatus],null,function()
					{
						location.reload();
					})
					//隱藏 No 按鈕
					$('#YesNo_Msg_No').css("display","none");
					//置中 Yes 按鈕
					$('#YesNo_Msg_Yes').css({"margin-left":"4px","width":"97%"});
				}
				else
				{
					if(errorFunc)
					{
						errorFunc(JSON.parse(jqXHR.responseText));
					}
				}
			}
		}).fail(function(jqXHR)
		{
			if(failFunc != null)
			{
				failFunc();
			}
			if(JSON.parse(jqXHR.responseText).message == "密碼到期,請變更密碼")
			{
				//密碼重設畫面
				edit_pw_fn();
			}
			if(JSON.parse(jqXHR.responseText).message == "使用者憑證已被鎖定")
			{
				normalError_Msg('使用者憑證已被鎖定');
				//需要翻譯的數量
				var translateCount = $(".translateHtml").length;
				//翻譯每一個文字
				for(var i=0;i<translateCount;i++)
				{
					//需要轉成簡體
					if(languageStatus == "S")
					{
						$(".translateHtml").eq(i).html($.t2s($(".translateHtml").eq(i).html()));
					}
					//需要轉成繁體
					else if(languageStatus == "T")
					{
						$(".translateHtml").eq(i).html($.s2t($(".translateHtml").eq(i).html()));
					}
				}
			}
		});
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}
//Ajax Post 共用
function jqueryAjax_Post(url,data,successFunc,errorFunc,failFunc)
{
	try
	{
		$.ajax
		({
			url:url,
			type:"POST",
			data:data,
			beforeSend:function(xhr)
			{
				xhr.setRequestHeader("Content-Type","application/json");
				xhr.setRequestHeader("Authorization","JAUTH "+localStorage.Auth);
			},
			success:function(result)
			{
				if(successFunc)
				{
					successFunc(result);
				}
			},
			error:function(jqXHR, textStatus, errorThrown)
			{
				if(JSON.parse(jqXHR.responseText).message == "憑證失效")
				{
					var ajaxMsg = showMsg(allFunc_Language["Error"][languageStatus],allFunc_Language["Login_Timeout"][languageStatus],null,function()
					{
						location.reload();
					})
					//隱藏 No 按鈕
					$('#YesNo_Msg_No').css("display","none");
					//置中 Yes 按鈕
					$('#YesNo_Msg_Yes').css({"margin-left":"4px","width":"97%"});
				}
				else
				{
					if(errorFunc)
					{
						errorFunc(JSON.parse(jqXHR.responseText));
					}
				}
			}
		}).fail(function(jqXHR)
		{
			if(failFunc != null)
			{
				failFunc();
			}
			if(JSON.parse(jqXHR.responseText).message == "密碼到期,請變更密碼")
			{
				//密碼重設畫面
				edit_pw_fn();
			}
			if(JSON.parse(jqXHR.responseText).message == "使用者憑證已被鎖定")
			{
				normalError_Msg('使用者憑證已被鎖定');
				//需要翻譯的數量
				var translateCount = $(".translateHtml").length;
				//翻譯每一個文字
				for(var i=0;i<translateCount;i++)
				{
					//需要轉成簡體
					if(languageStatus == "S")
					{
						$(".translateHtml").eq(i).html($.t2s($(".translateHtml").eq(i).html()));
					}
					//需要轉成繁體
					else if(languageStatus == "T")
					{
						$(".translateHtml").eq(i).html($.s2t($(".translateHtml").eq(i).html()));
					}
				}
			}
		});
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}
//Ajax Delete 共用
function jqueryAjax_Delete(url,data,successFunc,errorFunc,failFunc)
{
	try
	{
		$.ajax
		({
			url:url,
			type:"Delete",
			data:data,
			beforeSend:function(xhr)
			{
				xhr.setRequestHeader("Content-Type","application/json");
				xhr.setRequestHeader("Authorization","JAUTH "+localStorage.Auth);
			},
			success:function(result)
			{
				if(successFunc)
				{
					successFunc(result);
				}
			},
			error:function(jqXHR, textStatus, errorThrown)
			{
				if(JSON.parse(jqXHR.responseText).message == "憑證失效")
				{
					var ajaxMsg = showMsg(allFunc_Language["Error"][languageStatus],allFunc_Language["Login_Timeout"][languageStatus],null,function()
					{
						location.reload();
					})
					//隱藏 No 按鈕
					$('#YesNo_Msg_No').css("display","none");
					//置中 Yes 按鈕
					$('#YesNo_Msg_Yes').css({"margin-left":"4px","width":"97%"});
				}
				else
				{
					if(errorFunc)
					{
						errorFunc(JSON.parse(jqXHR.responseText));
					}
				}
			}
		}).fail(function()
		{
			if(failFunc != null)
			{
				failFunc();
			}
		});
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}
//Ajax Put 共用
function jqueryAjax_Put(url,data,successFunc,errorFunc,failFunc)
{
	try
	{
		$.ajax
		({
			url:url,
			type:"Put",
			data:data,
			beforeSend:function(xhr)
			{
				xhr.setRequestHeader("Content-Type","application/json");
				xhr.setRequestHeader("Authorization","JAUTH "+localStorage.Auth);
			},
			success:function(result)
			{
				if(successFunc)
				{
					successFunc(result);
				}
			},
			error:function(jqXHR, textStatus, errorThrown)
			{
				if(JSON.parse(jqXHR.responseText).message == "憑證失效")
				{
					var ajaxMsg = showMsg(allFunc_Language["Error"][languageStatus],allFunc_Language["Login_Timeout"][languageStatus],null,function()
					{
						location.reload();
					})
					//隱藏 No 按鈕
					$('#YesNo_Msg_No').css("display","none");
					//置中 Yes 按鈕
					$('#YesNo_Msg_Yes').css({"margin-left":"4px","width":"97%"});
				}
				else
				{
					if(errorFunc)
					{
						errorFunc(JSON.parse(jqXHR.responseText));
					}
				}
			}
		}).fail(function()
		{
			if(failFunc != null)
			{
				failFunc();
			}
		});
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}
//產生Menu 選項
function createMainpage_Menu(Menu_Array)
{
	try
	{
		//Menu 參數
		var Title = Menu_Array.Title;
		var Content = Menu_Array.Content;
		var Content_Func = Menu_Array.Content_Func;
		//Title 沒有重複
		if(!checkMenu_Title(Title))
		{
			//新增Menu
			$('.Mainpage_Section_Outer').append
			(
				'<div class="Mainpage_Section">'+
					'<div id="Mainpage_Menu_Title_' + Mainpage_Menu_Counter + '">'+
						'<img class="Mainpage_Menu_Img" src="image/menu_account.png"></img>'+
						'<div class="Mainpage_Menu_Title translateHtml" myId="' + Title + '">' + Title + '</div>'+
					'</div>'+
					'<div id="Menu_' + Mainpage_Menu_Counter + '_Outer">'+
						'<div class="Mainpage_Menu_Content" id="Menu_' + Mainpage_Menu_Counter + '">'+
							'<div class="translateHtml" id="Menu_' + Mainpage_Menu_Counter + '_Content" myId="' + Content + '">' + Content + '</div>'+
						'</div>'+
					'</div>'+
				'</div>'
			);
		}
		//Title 有重複
		else
		{
			//新增至指定 DIV
			$("div:contains('" + Title + "')").filter(function()
			{
			    return this.children.length == 0;
			}).parent().parent().children().eq(1).append
			(
				'<div class="Mainpage_Menu_Content" id="Menu_' + Mainpage_Menu_Counter + '">'+
					'<div class="translateHtml" id="Menu_' + Mainpage_Menu_Counter + '_Content" myId="' + Content + '">' + Content + '</div>'+
				'</div>'
			);
		}
		//新增 Mainpage_Menu_Title 滑鼠滑過
		$('#Mainpage_Menu_Title_' + Mainpage_Menu_Counter).css
		({
			"cursor":"pointer",
			"display":"block",
		    "padding":"11px 0px 0px 20px",
		    "width":"calc(100% - 20px)",
		    "height":"34px"
		});
		//新增 Mainpage_Menu_Title 滑鼠點擊
		$('#Mainpage_Menu_Title_' + Mainpage_Menu_Counter).click(function()
		{
			//依照內容大小做更改
			for(var i = 1; i < $('#'+this.id).parent().children().length; i++)
			{
				//當 Menu 按下
				var domOpacity = $('#'+this.id).parent().children().eq(i).css('opacity');
				//展開
				if(domOpacity == '0')
				{
					$('#'+this.id).parent().children().eq(i).animate
					(
						{
							opacity: 100,
							height: "toggle"
						}, 
						250,function() 
						{
							// callback
						}
					);
					$('#'+this.id).css('background-color','rgb(41,90,148)');
				}
				else if(domOpacity == '1')
				{
					$('#'+this.id).parent().children().eq(i).animate
					(
						{
							opacity: 0,
							height: "toggle"
						}, 
						250,function() 
						{
							// callback
						}
					);
					$('#'+this.id).css('background-color','');
				}
			};
			//除了點擊的選項 其他的都隱藏
			for(var i = 0; i < $("#Mainpage_Menu").children().children().length; i++)
			{
				//如果點擊的項目編號不相同 代表可能需要收縮
				if(this.id != $("#" + $("#Mainpage_Menu").children().children().eq(i).children().eq(1).attr('id')).parent().children().eq(0).attr('id'))
				{
					//確認透明度
					var domOpacity = $("#Mainpage_Menu").children().children().eq(i).children().eq(1).css('opacity');
					//如果不為透明 則需要做收縮
					if(domOpacity == 1)
					{
						//搜縮項目
						$("#Mainpage_Menu").children().children().eq(i).children().eq(1).animate
						(
							{
								opacity: 0,
								height: "toggle"
							}, 
							250,function() 
							{
								// callback
							}
						);
						//回復其他顏色
						$("#Mainpage_Menu").children().children().eq(i).children().eq(1).parent().children().eq(0).css('background-color','');
					}
				}
			};
			
		});
		//新增 Mainpage_Menu_Title_Content 點擊事件
		$('#Menu_' + Mainpage_Menu_Counter + '_Content').click(Content_Func);
		//新增 Menu Item 滑鼠滑過
		$('#Menu_' + Mainpage_Menu_Counter).children().css("cursor","pointer");
		//預設 Menu Item 隱藏
		$('#Menu_' + Mainpage_Menu_Counter + '_Outer').css({'opacity':'0','display':'none'});
		//Menu 計算+1
		Mainpage_Menu_Counter++;
		//確認 Title 是否有重複
		function checkMenu_Title(Title)
		{
			if($('.Mainpage_Menu_Title').length == 0)
			{
				return false;
			}
			else
			{
				oldArray = [];
				for(var i = 0; i < $('.Mainpage_Menu_Title').length; i++)
				{
					oldArray.push($('.Mainpage_Menu_Title').eq(i).text());
				};
				if(oldArray.indexOf(Title) == -1)
				{
					return false;
				}
				else
				{
					return true;
				}
			}
		}
		//關閉其他 Menu 
		function hideOther(id)
		{
			for(var i=1;i<=Mainpage_menuItem_Count;i++)
			{
				var domOpacity = $("#Menu_" + i).css('opacity');
				if(domOpacity === '1' && id !== 'Mainpage_Menu_Title_'+i)
				{
					$("#Menu_"+i).animate
					(
						{
							opacity: 0,
							height: "toggle"
						}, 
						Mainpage_menuSpeed,function() 
						{
							// callback
						}
					);
					$("#Menu_"+i).parent().css('background-color','');
				}
			}
		}
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}
//顯示視窗 共用
function showMsg(title,content,No_Func,Yes_Func)
{
	try
	{
		//建立 YesNo_Msg
		var YesNo_Msg = YesNo_Msg_Define.Initialize();
		YesNo_Msg.setMask(true);
		YesNo_Msg.setSmartdetect(true);
		YesNo_Msg.setWidth(300);
		YesNo_Msg.setHeight(168);
		YesNo_Msg.setId('YesNo_Msg');
		YesNo_Msg.setTitle(title);
		YesNo_Msg.show();
		YesNo_Msg.addMsgContent(content);
		YesNo_Msg.addYesNO_Button(allFunc_Language["No"][languageStatus],allFunc_Language["Yes"][languageStatus],
		//No
		function()
		{
			if(No_Func)
			{
				No_Func();
			}
		},
		//Yes
		function()
		{
			if(Yes_Func)
			{
				Yes_Func();
			}
		});
		//開啟物化效果
		addBlur_Css('Mainpage');
		//Debug
		$('#YesNo_Msg').css('z-index',100);
		$('#YesNo_Msg_Mask').css('z-index',99);
		//回傳自己
		return YesNo_Msg;
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}
//預設錯誤訊息視窗
function normalError_Msg(content)
{
	var errorMsg = showMsg(allFunc_Language["Error"][languageStatus],content,function()
	{
		errorMsg.close();
	},function()
	{
		errorMsg.close();
	});
	//隱藏 No 按鈕
	$('#YesNo_Msg_No').css("display","none");
	//置中 Yes 按鈕
	$('#YesNo_Msg_Yes').css({"margin-left":"4px","width":"97%"});
	//回傳
	return errorMsg;
}
//預設錯誤訊息視窗 保留螢幕霧化效果
function normalError_Msg_Withmask(content)
{
	var errorMsg = showMsg(allFunc_Language["Error"][languageStatus],content,function()
	{
		errorMsg.close();
		//開啟霧化效果
		addBlur_Css('Mainpage');
	},function()
	{
		errorMsg.close();
		//開啟霧化效果
		addBlur_Css('Mainpage');
	});
	errorMsg.close = function()
	{
		var ID = this.getId();
		//移除 Mask
		(this.getMask())?$('#' + ID + '_Mask').remove():'';
		//移除 Window Resize 監聽
		this.endResize();
		//智慧偵測 Ese->No Enter->Yes
		if(this.getSmartdetect())
		{
			this.endSmartdetect();
		}
		//移除物件
		$('#' + ID).remove();
	};
	//隱藏 No 按鈕
	$('#YesNo_Msg_No').css("display","none");
	//置中 Yes 按鈕
	$('#YesNo_Msg_Yes').css({"margin-left":"4px","width":"97%"});
	//回傳
	return errorMsg;
}
//預設錯誤訊息視窗
function normalSucceed_Msg(content)
{
	var errorMsg = showMsg(allFunc_Language["success"][languageStatus],content,function()
	{
		errorMsg.close()
	},function()
	{
		errorMsg.close()
	});
	//隱藏 No 按鈕
	$('#YesNo_Msg_No').css("display","none");
	//置中 Yes 按鈕
	$('#YesNo_Msg_Yes').css({"margin-left":"4px","width":"97%"});
}
//預設錯誤訊息視窗 保留螢幕霧化效果
function normalSucceed_Msg_Withmask(content)
{
	var Succeed_Msg = showMsg(allFunc_Language["success"][languageStatus],content,function()
	{
		Succeed_Msg.close();
		//開啟霧化效果
		addBlur_Css('Mainpage');
	},function()
	{
		Succeed_Msg.close();
		//開啟霧化效果
		addBlur_Css('Mainpage');
	});
	//隱藏 No 按鈕
	$('#YesNo_Msg_No').css("display","none");
	//置中 Yes 按鈕
	$('#YesNo_Msg_Yes').css({"margin-left":"4px","width":"97%"});
	//回傳
	return Succeed_Msg;
}
//新增 tab
function addTab(id,label)
{
	try
	{
		//顏色
		var color = ';';
		var a_color = ';';
		var colorful = true;
		if(id.split("_")[0] == "waitingProcess" && colorful)
		{
			color = "background:rgb(64,185,180);";
			a_color = "color:white;";
		}
		else if(id.split("_")[0] == "mainProcess" && colorful)
		{
			color = "background:rgb(248,118,67);";
			a_color = "color:white;";
		}
		else if(id.split("_")[0] == "alreadyProcess" && colorful)
		{
			color = "background:rgb(102,102,102);";
			a_color = "color:white;";
		}
		//不重複新增
		if($('#' + id + '_a').size() == 0)
		{
			//tab 樣版
			var tabTemplate = "<li id='" + id + "_li' title='" + label + "' style='" + color + "margin-top:-3px;margin-left:0.1px;'><a style='" + a_color + "height:calc(100% - 10px);' href='#{href}' id='" + id + "_a'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>";
			//tab 名字
			var label = label;
			//tab 編號
			var id = id;
			//tab li樣版
			var li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) );
			//新增 tab 
			$("#tabs").tabs().find(".ui-tabs-nav").append(li);
			$("#tabs").tabs().append("<div id='" + id + "'></div>");
			$("#tabs").tabs().tabs("refresh");
			//主動開啟 tab
			$('#' + id + "_a").click();
			//更改內容頁 css
			$('#' + id).css
			({
				"height":"calc(100% - 31px)",
				"padding":"0px",
	    		"margin-left":"-2px"
			});
		}
		//已新增過 開啟 tab
		else
		{
			//主動開啟 tab
			$('#' + id + "_a").click();
		}
		//新增滑鼠中鍵關閉分頁
		$("#" + id + "_li").click(function(e)
		{
			//滑鼠中鍵
			if(e.which == 2)
			{
				//正在開啟的上一頁編號
				var prevPageID = ($("#tabs .ui-state-active").prev().attr('id') == "HomeTab")?$("#tabs .ui-state-active").attr('id'):$("#tabs .ui-state-active").prev().attr('id').replace('_li','');
				//正在開啟的頁面編號
				var currentPageID = ($("#tabs .ui-state-active").attr('id') == "HomeTab")?$("#tabs .ui-state-active").attr('id'):$("#tabs .ui-state-active").attr('id').replace('_li','');
				//正在開啟的下一頁編號
				var nextPageID = ($("#tabs .ui-state-active").next().size() == 0)?null:$("#tabs .ui-state-active").next().attr('id').replace('_li','');
				//如果要關掉的頁面 不等於 正在開啟的頁面
				if(currentPageID != id)
				{
					//關掉指定頁面
					deleteTab(id);
					//再重新聚焦在原先開啟的頁面
					$("#" + currentPageID + "_a").click();
				}
				//如果要關掉的頁面 等於 正在開啟的頁面
				else
				{
					//如果沒有下一頁
					if($("#tabs .ui-state-active").next().size() == 0)
					{
						//關掉指定頁面
						deleteTab(id);
						//再重新聚焦在上一個頁面 size=0需開起首頁 其他則開起上一頁
						if($("#" + prevPageID + "_a").size() == 0)
						{
							$("#HomeTab a").click();
							getNewTaskPage_Record("all");
						}
						else
						{
							$("#" + prevPageID + "_a").click()
						}
					}
					//如果有下一頁
					else
					{
						//關掉指定頁面
						deleteTab(id);
						//再重新聚焦在下一個頁面
						$("#" + nextPageID + "_a").click();
					}
				}
			}
		});
		//新增語言翻譯 class
		$("#" + id + "_a").addClass('translateHtml');
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}
//載入 js
function loadJs(fileUrl,callback)
{
	try
	{
		//載入指定 js 檔案
		$.getScript(fileUrl).done(function(script,textStatus)
		{
			(callback)?callback():null;
	  	}).fail(function(jqxhr,settings,exception)
	  	{
		    //顯示錯誤訊息
		    var loadJsshowMsg = showMsg('錯誤','載入 ' + fileUrl + ' 錯誤',function()
	    	{
	    		loadJsshowMsg.close();
	    	},function()
	    	{
	    		loadJsshowMsg.close();
	    	});
		});
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}
//刪除 tab
function deleteTab(id)
{
	try
	{
		//刪除內容
		$('#'+id).remove();
		//刪除標籤
		$('#'+id+'_li').remove();
		//Debug
		$(window).resize();
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}
//產生UUID
function guid()
{
	try
	{
		function s4()
		{
		  return Math.floor((1 + Math.random()) * 0x10000)
		    .toString(16)
		    .substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		  s4() + '-' + s4() + s4() + s4();
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}
//控制工單排序
function sortTask(id)
{
	var Grid_Panel = taskObject[id];
	if(typeof(Grid_Panel) == "undefined")
	{
		return;
	}
	var content = Grid_Panel.getHeader_Title();
	var width = Grid_Panel.getHeader_Width();
	var Header = Grid_Panel.getId() + '_Header';
	//如果物件產生過就不重複產生
	if($('#' + Header).length === 0)
	{
		//新增 header
		$('#'+this.getId()).append("<div id='" + Header + "' class='Mainpage_Main_Header'></div>");
	}
	//確認內容與寬度陣列
	if(!content || !width || content.length !== width.length)
	{
		throw "Content and Width 數量不一致";
	}			
	//清空 header
	$('#' + Header).empty();
	//自動計算總寬度 把剩下的寬度在最後一格補上
	var totalWidth = 0;
	var tdWidth = 0;
	//取得最後一筆有顯示的項目編號 翻轉陣列 取得翻轉回來的正常編號
	var lastShow_ID = Grid_Panel.getfieldShow().length - 1 - jQuery.inArray(true,Grid_Panel.getfieldShow().reverse());
	//取得後翻轉回來
	Grid_Panel.getfieldShow().reverse();
	//依序產生 header 物件
	for(var i=0;i<content.length;i++)
	{
		//依照是否顯示
		var fieldShow_Css = (Grid_Panel.getfieldShow()[i])?'':'display:none;';
		//如果是最後一筆 且有顯示
		if(i == lastShow_ID && Grid_Panel.getfieldShow()[i])
		{
			tdWidth = (100 - totalWidth) + "%";
		}
		else if(Grid_Panel.getfieldShow()[i])
		{
			tdWidth = width[i];
		}
		//設定寬度
		$('#' + Header).append("<div id='" + Grid_Panel.getId() + "_" + Grid_Panel.getModel()[i] + "' name='" + Grid_Panel.getModel()[i] + "' class='Mainpage_Main_Header_div translateHtml' style='text-overflow:ellipsis;white-space:nowrap;overflow:hidden;width:calc(" + tdWidth + " - 1px);" + fieldShow_Css + "' myId='" + content[i] + "'>" + content[i] + "</div>");
		//要做排序的有 工單編號 檢查者 接單者 開始時間 結束時間
		if(Grid_Panel.getModel()[i] == "TaskAssignedNumber" || Grid_Panel.getModel()[i] == "MainCheckEmployeeName" || 
		   Grid_Panel.getModel()[i] == "MainResponsibleEmployeeName" || Grid_Panel.getModel()[i] == "TaskAssignedStartTime" ||
		   Grid_Panel.getModel()[i] == "TaskAssignedEndTime")
		{
			//新增排序圖示
			$('#' + Header).append("<span class='Mainpage_Header_All' id='" + Grid_Panel.getId() + "_" + Grid_Panel.getModel()[i] + "_Sort' style='" + fieldShow_Css + "'></span>");
			//新增點擊排序
			$("#" + Grid_Panel.getId() + "_" + Grid_Panel.getModel()[i] + "_Sort").click(function()
			{
				//回復所有
				$("#" + Header + " span").attr('class','Mainpage_Header_All');
				//判斷要排序的跟上一次的項目有沒有相同
				if($("#" + Grid_Panel.getId()).attr('sort') != undefined && $("#" + Grid_Panel.getId()).attr('orderTitle') != $(this).prev().attr('name'))
				{
					$("#" + Grid_Panel.getId()).removeAttr('sort');
				}
				//如果沒有排序過 由大到小
				if($("#" + Grid_Panel.getId()).attr('sort') == "Asc")
				{
					//改變狀態
					$("#" + Grid_Panel.getId()).attr('sort','Desc');
					//紀錄改變哪一個
					$("#" + Grid_Panel.getId()).attr('orderTitle',$(this).prev().attr('name'));
					//刪除舊 Class
					$(this).removeClass('Mainpage_Header_Asc');
					$(this).removeClass('Mainpage_Header_All');
					//新增 Class
					$(this).addClass('Mainpage_Header_Desc');
					//實施排序
					doSort(Grid_Panel.getId(),$(this).prev().attr('name'));
				}
				//由小到大
				else if($("#" + Grid_Panel.getId()).attr('sort') == undefined || $("#" + Grid_Panel.getId()).attr('sort') == "Desc")
				{
					//改變狀態
					$("#" + Grid_Panel.getId()).attr('sort','Asc');
					//紀錄改變哪一個
					$("#" + Grid_Panel.getId()).attr('orderTitle',$(this).prev().attr('name'));
					//刪除舊 Class
					$(this).removeClass('Mainpage_Header_Desc');
					$(this).removeClass('Mainpage_Header_All');
					//新增 Class
					$(this).addClass('Mainpage_Header_Asc');
					//實施排序
					doSort(Grid_Panel.getId(),$(this).prev().attr('name'));
				}
			});
			//執行排序
			function doSort(id,orderTitle)
			{
				taskObject[id].getUrl = function getUrl()
				{
					try
					{
						//組合參數
						var Start = taskObject[id].getStart();
						var Limit = taskObject[id].getPagesize();
						var url = $("#" + id).attr('myurl');
						var desc = $("#" + id).attr('sort');
						var newDesc = (desc == "Desc")?"true":"false";
						var New_orderTitle = "";
						if(orderTitle == "TaskAssignedNumber")
						{
							New_orderTitle = "Number";
						}
						else if(orderTitle == "MainCheckEmployeeName")
						{
							New_orderTitle = "Check";
						}
						else if(orderTitle == "MainResponsibleEmployeeName")
						{
							New_orderTitle = "Main";
						}
						else if(orderTitle == "TaskAssignedStartTime")
						{
							New_orderTitle = "StartTime";
						}
						else if(orderTitle == "TaskAssignedEndTime")
						{
							New_orderTitle = "EndTime";
						}
						var dc = (+new Date());						
						//紀錄特殊 url
						if(id == "mainProcess_01" || id == "mainProcess_02" || id == "mainProcess_03")
						{
							url = url.replace('&desc=true&orderTitle=EndTime','');
						}
						else
						{			
							url = url.replace('&desc=true&orderTitle=StartTime','');
						}
						return localStorage.task + url + "&start="+Start+"&limit="+Limit+"&_dc="+dc+"&desc="+newDesc+"&orderTitle="+New_orderTitle;
					}
					catch(err)
					{
						if(App_Debug)
						{
							console.log(err);
						}
					}
				}
				taskObject[id].load();
			}
		}
		//紀錄寬度
		totalWidth = parseFloat(totalWidth) + parseFloat(width[i].replace('%',''));
	}
}
//控制員工排序
function sortEmployee()
{
	if(typeof(employeeManagement_Y02) == "undefined")
	{
		return;
	}
	var Grid_Panel = employeeManagement_Y02;
	var content = Grid_Panel.getHeader_Title();
	var width = Grid_Panel.getHeader_Width();
	var Header = Grid_Panel.getId() + '_Header';
	//如果物件產生過就不重複產生
	if($('#' + Header).length === 0)
	{
		//新增 header
		$('#'+this.getId()).append("<div id='" + Header + "' class='Mainpage_Main_Header'></div>");
	}
	//確認內容與寬度陣列
	if(!content || !width || content.length !== width.length)
	{
		throw "Content and Width 數量不一致";
	}			
	//清空 header
	$('#' + Header).empty();
	//自動計算總寬度 把剩下的寬度在最後一格補上
	var totalWidth = 0;
	var tdWidth = 0;
	//取得最後一筆有顯示的項目編號 翻轉陣列 取得翻轉回來的正常編號
	var lastShow_ID = Grid_Panel.getfieldShow().length - 1 - jQuery.inArray(true,Grid_Panel.getfieldShow().reverse());
	//取得後翻轉回來
	Grid_Panel.getfieldShow().reverse();
	//依序產生 header 物件
	for(var i=0;i<content.length;i++)
	{
		//依照是否顯示
		var fieldShow_Css = (Grid_Panel.getfieldShow()[i])?'':'display:none;';
		//如果是最後一筆 且有顯示
		if(i == lastShow_ID && Grid_Panel.getfieldShow()[i])
		{
			tdWidth = (100 - totalWidth) + "%";
		}
		else if(Grid_Panel.getfieldShow()[i])
		{
			tdWidth = width[i];
		}
		//設定寬度
		$('#' + Header).append("<div id='" + Grid_Panel.getId() + "_" + Grid_Panel.getModel()[i] + "' name='" + Grid_Panel.getModel()[i] + "' class='Mainpage_Main_Header_div translateHtml' style='text-overflow:ellipsis;white-space:nowrap;overflow:hidden;width:calc(" + tdWidth + " - 1px);" + fieldShow_Css + "' myId='" + content[i] + "'>" + content[i] + "</div>");
		//要做排序的有 員工姓名 員工編號
		if(Grid_Panel.getModel()[i] == "EmployeeName" || Grid_Panel.getModel()[i] == "EmployeeNumber")
		{
			//新增排序圖示
			$('#' + Header).append("<span class='Mainpage_Header_All' id='" + Grid_Panel.getId() + "_" + Grid_Panel.getModel()[i] + "_Sort' style='" + fieldShow_Css + "'></span>");
			//新增點擊排序
			$("#" + Grid_Panel.getId() + "_" + Grid_Panel.getModel()[i] + "_Sort").click(function()
			{
				//回復所有
				$("#" + Header + " span").attr('class','Mainpage_Header_All');
				//判斷要排序的跟上一次的項目有沒有相同
				if($("#" + Grid_Panel.getId()).attr('sort') != undefined && $("#" + Grid_Panel.getId()).attr('orderTitle') != $(this).prev().attr('name'))
				{
					$("#" + Grid_Panel.getId()).removeAttr('sort');
				}
				//如果沒有排序過 由大到小
				if($("#" + Grid_Panel.getId()).attr('sort') == "Asc")
				{
					//改變狀態
					$("#" + Grid_Panel.getId()).attr('sort','Desc');
					//紀錄改變哪一個
					$("#" + Grid_Panel.getId()).attr('orderTitle',$(this).prev().attr('name'));
					//刪除舊 Class
					$(this).removeClass('Mainpage_Header_Asc');
					$(this).removeClass('Mainpage_Header_All');
					//新增 Class
					$(this).addClass('Mainpage_Header_Desc');
					//實施排序
					doSort(Grid_Panel.getId(),$(this).prev().attr('name'));
				}
				//由小到大
				else if($("#" + Grid_Panel.getId()).attr('sort') == undefined || $("#" + Grid_Panel.getId()).attr('sort') == "Desc")
				{
					//改變狀態
					$("#" + Grid_Panel.getId()).attr('sort','Asc');
					//紀錄改變哪一個
					$("#" + Grid_Panel.getId()).attr('orderTitle',$(this).prev().attr('name'));
					//刪除舊 Class
					$(this).removeClass('Mainpage_Header_Desc');
					$(this).removeClass('Mainpage_Header_All');
					//新增 Class
					$(this).addClass('Mainpage_Header_Asc');
					//實施排序
					doSort(Grid_Panel.getId(),$(this).prev().attr('name'));
				}
			});
			//執行排序
			function doSort(id,orderTitle)
			{
				employeeManagement_Y02.getUrl = function getUrl()
				{
					try
					{
						//組合參數
						var Start = employeeManagement_Y02.getStart();
						var Limit = employeeManagement_Y02.getPagesize();
						var url = $("#employeeManagement_Y02").attr('myurl');
						var desc = $("#" + id).attr('sort');
						var newDesc = (desc == "Desc")?"true":"false";
						var New_orderTitle = "";
						if(orderTitle == "EmployeeNumber")
						{
							New_orderTitle = "number";
						}
						else if(orderTitle == "EmployeeName")
						{
							New_orderTitle = "name";
						}
						var dc = (+new Date());
						return localStorage.human + url + "&start="+Start+"&limit="+Limit+"&_dc="+dc+"&desc="+newDesc+"&orderTitle="+New_orderTitle;
					}
					catch(err)
					{
						if(App_Debug)
						{
							console.log(err);
						}
					}
				}
				employeeManagement_Y02.load();
			}
		}
		//紀錄寬度
		totalWidth = parseFloat(totalWidth) + parseFloat(width[i].replace('%',''));
	}
}
//在載入後要回復排序狀態(因為載入會重製排序狀態)
function resetSort_Status(id)
{
	var orderTitle = $("#" + id).attr('ordertitle');
	var sort = $("#" + id).attr('sort');
	if(orderTitle != undefined && sort != undefined)
	{
		var me = $("#" + id + " div[name='" + orderTitle + "']").next();
		if(sort == "Desc")
		{
			//刪除舊 Class
			me.removeClass('Mainpage_Header_Asc');
			me.removeClass('Mainpage_Header_All');
			//新增 Class
			me.addClass('Mainpage_Header_Desc');
			;
		}
		else
		{
			//刪除舊 Class
			me.removeClass('Mainpage_Header_Desc');
			me.removeClass('Mainpage_Header_All');
			//新增 Class
			me.addClass('Mainpage_Header_Asc');
		}
	}
}
//修改密碼
function edit_pw_fn()
{
  	//建立 YesNo_Msg
	var edit_pw_fn_window = YesNo_Msg_Define.Initialize();
	edit_pw_fn_window.setMask(true);
	edit_pw_fn_window.setSmartdetect(false);
	edit_pw_fn_window.setWidth(360);
	edit_pw_fn_window.setHeight(240);
	edit_pw_fn_window.setId('edit_pw_fn_window');
	edit_pw_fn_window.setTitle(language['Inventory_changePassword'][languageStatus]);
	edit_pw_fn_window.show();
	edit_pw_fn_window.addMsgContent('<style>.edit_pw_input{padding:8px;display:block;border:none;border-bottom:1px solid #808080;width:95%; text-align: center;}</style><input type="password" id="edit_pw_old" class="edit_pw_input translatePlaceholder" placeholder="舊密碼"></input><input type="password" id="edit_pw_new"  class="edit_pw_input translatePlaceholder" placeholder="新密碼(大小寫英文及數字-需8位字元)"></input><input type="password" id="edit_pw_new2"  class="edit_pw_input translatePlaceholder" placeholder="再一次新密碼(大小寫英文及數字-需8位字元)"></input>');
	edit_pw_fn_window.addYesNO_Button(language['system_cancel'][languageStatus],language['system_ok'][languageStatus],
	//No
	function()
	{
		edit_pw_fn_window.close();
	},
	//Yes
	function()
	{	
		var re=new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$");
		if(!$("#edit_pw_old").val())
		{
			$("#edit_pw_old").focus();
		}
		if(!$("#edit_pw_new").val())
		{
			$("#edit_pw_new").focus();
		}
		if(!$("#edit_pw_new2").val())
		{
			$("#edit_pw_new2").focus();
		}
		if(re.test($('#edit_pw_new').val()) && re.test($('#edit_pw_new2').val()))
		{
			//組合
			var edited_pw_data='{"oldPassword":"'+$('#edit_pw_old')[0].value+'","Password":"'+$('#edit_pw_new')[0].value+'","ConfirmPassword":"'+$('#edit_pw_new2')[0].value+'"}';
			//送出
			jqueryAjax_Post(localStorage.human + '/OAuth/change',  edited_pw_data  ,
			function (result)
			{
				//訊息
				edit_pw_fn_window.close();
				var okMsg = showMsg(language['changePassword'][languageStatus],"密碼修改成功,請稍等30秒後使用新密碼登入",
				function()
				{
					okMsg.close();
				},function()
				{
					okMsg.close();
					localStorage.clear();
					location.reload();
				});
				//隱藏 No 按鈕
				$('#YesNo_Msg_No').css("display","none");
				//置中 Yes 按鈕
				$('#YesNo_Msg_Yes').css({"margin-left":"4px","width":"97%"});
				okMsg.setHeight(190);
				$("#YesNo_Msg").height(190);
			},
			function (result)
			{
				//錯誤訊息
				normalError_Msg_Withmask(result.message);
			},null);			
		}
		else
		{
			//初次驗證失敗
			normalError_Msg_Withmask(language["checkPasswordError"][languageStatus]);
			$("#YesNo_Msg").width(300);
			$("#YesNo_Msg").height(168);
			$("#YesNo_Msg_Title").html(language["system_error"][languageStatus]);
			$("#YesNo_Msg_Yes").html(language["system_ok"][languageStatus]);
			//Debug
			$('#YesNo_Msg').css('z-index',100);
			$('#YesNo_Msg_Mask').css('z-index',99);
		}		
	});
	//開啟物化效果
	addBlur_Css('Mainpage');
	//需要翻譯的數量
	var translateCount = $(".translatePlaceholder").length;
	//翻譯每一個文字
	for(var i=0;i<translateCount;i++)
	{
		//需要轉成簡體
		if(languageStatus == "S")
		{
			$(".translatePlaceholder").eq(i).attr('placeholder',$.t2s($(".translatePlaceholder").eq(i).attr('placeholder')));
		}
		//需要轉成繁體
		else if(languageStatus == "T")
		{
			$(".translatePlaceholder").eq(i).attr('placeholder',$.s2t($(".translatePlaceholder").eq(i).attr('placeholder')));
		}
	}
	//Focus
	$("#edit_pw_old").focus();
}
//四捨五入到指定位數
function roundDecimal(val, precision)
{
	return Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) / Math.pow(10, (precision || 0));
}
//數字千分位
function FormatNumber(n)
{
	n += "";
	var arr = n.split(".");
	var re = /(\d{1,3})(?=(\d{3})+$)/g;
	return arr[0].replace(re, "$1,") + (arr.length == 2 ? "." + arr[1] : "");
}