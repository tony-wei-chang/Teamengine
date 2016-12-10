//Jquery 準備好
$(document).ready(function()
{
	try
	{
		//我的日誌
		var view = {};
		view.Title = "個人日誌";
		view.Content = "我的週誌";
		view.Content_Func = function()
		{
			//創造日誌首頁
			createDailyPage();
		}
		createMainpage_Menu(view);
		//查詢日誌
		var selectView = {};
		selectView.Title = "個人日誌";
		selectView.Content = "查詢日誌";
		selectView.Content_Func = function()
		{
			//創在搜尋日誌首頁
			createSelectDailyWindow();
		}
		createMainpage_Menu(selectView);
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
});

//我的週誌
function createDailyPage()
{
	try
	{
		//新增一個 tab
		addTab('dailyTab_Y01',language["myDaily"][languageStatus]);
		//建立daily grid
		dailyView = Grid_Panel_Define.Initialize();
		dailyView.setId('dailyTab_Y01');
		dailyView.setResizer_ID('dailyViewPage_Y01');
		dailyView.setHeader_Title(['No.','ID',"日誌編號","起始時間","結束時間","最後修改時間","總時數","狀態"]);
		dailyView.setModel(['Number','DailyID','DailyNumber','DailyStartDatetime','DailyEndDatetime','lastUpdated','useTime','DailyStatus']);
		dailyView.setPagesize(10);
		dailyView.setfieldShow([true,false,true,true,true,true,true,true]);
		dailyView.setHeader_Width(['10%','0%','15%','15%','15%','20%','10%','14.4%']); // 99.5%
		dailyView.createHeader();
		dailyView.createTable();
		//修改高度
		$('#dailyTab_Y01_Table').css('height','calc(100% - 160px)');
		//改寫欄位
		dailyView.setLoad_Callback(function()
		{
			for(var i = 0; i < $('#dailyTab_Y01_Table').children().length; i++)
			{
				//編號
				$('#dailyTab_Y01_Table_Inner_' + i).children().eq(0).html(i+1+dailyView.getStart());
				//時間欄位顯示設定
				$('#dailyTab_Y01_Table_Inner_' + i).children().eq(3).html(getDate($('#dailyTab_Y01_Table_Inner_' + i).children().eq(3).html()) + ' ' + getTime($('#dailyTab_Y01_Table_Inner_' + i).children().eq(3).html()));
				$('#dailyTab_Y01_Table_Inner_' + i).children().eq(4).html(getDate($('#dailyTab_Y01_Table_Inner_' + i).children().eq(4).html()) + ' ' + getTime($('#dailyTab_Y01_Table_Inner_' + i).children().eq(4).html()));
				$('#dailyTab_Y01_Table_Inner_' + i).children().eq(5).html(getDate($('#dailyTab_Y01_Table_Inner_' + i).children().eq(5).html()) + ' ' + getTime($('#dailyTab_Y01_Table_Inner_' + i).children().eq(5).html()));
				//狀態顯示
				if($('#dailyTab_Y01_Table_Inner_' + i).children().eq(7).html()=="未上傳"){
					var input="<div style='margin-top:10% !important;line-height:40px;width:70px;color:white;background-color:red;margin:0px auto;border-radius:4px;'>"+$('#dailyTab_Y01_Table_Inner_' + i).children().eq(7).html()+"</div>";
					$('#dailyTab_Y01_Table_Inner_' + i).children().eq(7).html(input);
				}else{
					var input="<div style='margin-top:10% !important;line-height:40px;width:70px;color:white;background-color:green;margin:0px auto;border-radius:4px'>"+$('#dailyTab_Y01_Table_Inner_' + i).children().eq(7).html()+"</div>";
					$('#dailyTab_Y01_Table_Inner_' + i).children().eq(7).html(input);
				}
				$('#dailyTab_Y01_Table_Inner_' + i).children().eq(7).css("margin-top","-10px");
				//設定雙點擊事件
				$('#dailyTab_Y01_Table_Inner_' + i).dblclick(function(){
					DailyID=$('#'+this.id).children().eq(1).html();
					createDailyClassPage();
					localStorage.setItem('dailyClick',$(this).children().eq(7).children().eq(0).html());
				});
				
			};
		});
		dailyView.createPagging();
		//設定網址取用方法
		dailyView.getUrl = function getUrl()
		{
			try
			{
				//組合參數
				var Start = dailyView.getStart();
				var Limit = dailyView.getPagesize();
				var dc = (+new Date());
				dailyViewURL=localStorage.daily+"/Daily/me?&start="+Start+"&limit="+Limit+"&_dc="+dc;
				return dailyViewURL;
			}
			catch(err)
			{
				if(App_Debug)
				{
					console.log(err);
				}
			}
		}
		//新增 標頭列
		new function()
		{
			$('#dailyTab_Y01').prepend("<div id='daily_Y01_dailyView_settingHeader'></div>");
			$("#daily_Y01_dailyView_settingHeader").css
			({
				"height":"60px",
			    "width":"101%",
		        "margin-left":"-1px",
			    "background-color":"rgb(84,116,165)",
			    "position":"relative"
			});
			var daily_Y01_dailyView_settingHeader_inner_class = 
			{
				"line-height":"60px",
				"width":"250px",
				"font-size":'14pt',
				"color":"white",
				"text-align":"center",
				"float":"left",
				"position":"absolute",
				"top":"0px",
				"right":"0px",
				"bottom":"0px",
				"margin":"auto",
				"cursor":"pointer",

			};
			//我的週誌
			$("#daily_Y01_dailyView_settingHeader").append("<div id='daily_Y01_dailyView_settingHeader_div01'></div>");
			$("#daily_Y01_dailyView_settingHeader_div01").html(language["myDaily"][languageStatus]);
			$("#daily_Y01_dailyView_settingHeader_div01").css(daily_Y01_dailyView_settingHeader_inner_class);
			$("#daily_Y01_dailyView_settingHeader_div01").css("left","-60%");
			$("#daily_Y01_dailyView_settingHeader_div01").click(function(){
				createDailyPage();
			})		
		}
		//載入資料
		dailyView.load();
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}

//週誌分類
function createDailyClassPage()
{
	try
	{
		//新增一個 tab
		//addTab('dailyTab_Y01_class',language[52][languageStatus]);
		//建立daily grid
		dailyClassView = Grid_Panel_Define.Initialize();
		dailyClassView.setId('dailyTab_Y01');
		dailyClassView.setResizer_ID('dailyViewPage_Y01_class');
		dailyClassView.setHeader_Title(['No.','ID',"日誌分類","總比數","總時數"]);
		dailyClassView.setModel(['Number','DailyTypeID','DailyName','count','totalHour']);
		dailyClassView.setPagesize(10);
		dailyClassView.setfieldShow([true,false,true,true,true]);
		dailyClassView.setHeader_Width(['10%','0%','40%','24.8%','24.8%']); // 99.5%
		dailyClassView.createHeader();
		dailyClassView.createTable();
		dailyClassView.createPagging();
		dailyClassView.addPagging_Button('newDailyButton',language["newDaily"][languageStatus]);
		dailyClassView.addPagging_Button('sendDailyButton','送出日誌');
		$('#sendDailyButton').click(function(){
			dailyPutURL=localStorage.daily+"/Daily/me/"+DailyID;
			var msg = showMsg('訊息','確定是否要上傳',function()
			{
				msg.close();
			},function()
			{
				jqueryAjax_Put(dailyPutURL,null,function()
				{
					msg.close();
					createDailyPage();
				},function(msg)
				{
					normalError_Msg(msg.message);
				},function(msg)
				{
					normalError_Msg(msg.message);
				});
			});
		});
		$('#newDailyButton').click(function(){
			createNewDailyWindow();
		});
		//修改高度
		$('#dailyTab_Y01_Table').css('height','calc(100% - 160px)');
		//改寫欄位
		dailyClassView.setLoad_Callback(function()
		{
			for(var i = 0; i < $('#dailyTab_Y01_Table').children().length; i++)
			{
				//編號
				$('#dailyTab_Y01_Table_Inner_' + i).children().eq(0).html(i+1+dailyClassView.getStart());
				//設定雙點擊事件
				$('#dailyTab_Y01_Table_Inner_' + i).dblclick(function(){
					DailyTypeID=$('#'+this.id).children().eq(1).html();
					createDailyListPage();
				});
				
			};
		});
		//設定網址取用方法
		dailyClassView.getUrl = function getUrl()
		{
			try
			{
				//組合參數
				var Start = dailyClassView.getStart();
				var Limit = dailyClassView.getPagesize();
				var dc = (+new Date());
				dailyClassViewURL=localStorage.daily+"/Daily/me/"+DailyID+"?start="+Start+"&limit="+Limit+"&_dc="+dc;
				return dailyClassViewURL;
			}
			catch(err)
			{
				if(App_Debug)
				{
					console.log(err);
				}
			}
		}
		//改寫model 欄位
		dailyClassView.setData = function(Content_Array)
		{
			//依照 Model 資料存入
			var This_Model = this.getModel();
			//儲存回傳資料
			dailyClassView.Data = Content_Array.detaildata;
			//回傳內容
			for(var i=0;i<Content_Array.detaildata.length;i++)
			{
				var Temp_Array = [];
				//Model 欄位
				for(var j=0;j<This_Model.length;j++)
				{
					//將資料轉存成陣列
					Temp_Array.push(Content_Array.detaildata[i][This_Model[j]]);
					if(j == This_Model.length - 1)
					{
						var This_ID = this.getId();
						//總共新增了幾筆
						var Count = $('#' + This_ID + '_Table').children().length;
						//要新增的 div id
						var Current_ID = This_ID + "_Table_Inner_" + Count;
						//新增區別 div
						$('#' + This_ID + '_Table').append("<div id='" + Current_ID + "'></div>");
						//新增區別 div 的 Contextmenu
						this.createContextmenu(Current_ID);
						//取得 header content
						var Width = this.getHeader_Width();
						//產生 table 內容 寬度必須對應
						for(var k=0;k<Width.length;k++)
						{
							//依照是否顯示
							var fieldShow_Css = (dailyClassView.getfieldShow()[k])?'':'display:none;';
							//欄位內值
							var fieldValue = (Temp_Array[k])?Temp_Array[k]:'';
							$('#'+Current_ID).append("<div style='width:" + Width[k] + ";line-height:" + this.Table_Lineheight + ";display:inline-block;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;height:100%;" + fieldShow_Css + "'>" + fieldValue + "</div>");
						}
					}
				}
				//最後執行 Callback
				if(i == Content_Array.detaildata.length - 1)
				{
					//如果有 Callback
					if(dailyClassView.getLoad_Callback())
					{
						dailyClassView.getLoad_Callback()();
					}
				}
			}
			//判斷是否要針對捲軸的出現做大小改變
			this.getResizer();
		}
		//新增 標頭列
		new function()
		{
			$('#dailyTab_Y01').prepend("<div id='daily_Y01_dailyView_settingHeader'></div>");
			$("#daily_Y01_dailyView_settingHeader").css
			({
				"height":"60px",
			    "width":"101%",
		        "margin-left":"-1px",
			    "background-color":"rgb(84,116,165)",
			    "position":"relative"
			});
			var daily_Y01_dailyView_settingHeader_inner_class = 
			{
				"line-height":"60px",
				"width":"250px",
				"font-size":'14pt',
				"color":"white",
				"text-align":"center",
				"float":"left",
				"position":"absolute",
				"top":"0px",
				"right":"0px",
				"bottom":"0px",
				"margin":"auto",
				"cursor":"pointer",

			};
			//我的週誌
			$("#daily_Y01_dailyView_settingHeader").append("<div id='daily_Y01_dailyView_settingHeader_div01'></div>");
			$("#daily_Y01_dailyView_settingHeader_div01").html(language["myDaily"][languageStatus]);
			$("#daily_Y01_dailyView_settingHeader_div01").css(daily_Y01_dailyView_settingHeader_inner_class);
			$("#daily_Y01_dailyView_settingHeader_div01").css("left","-60%");
			$("#daily_Y01_dailyView_settingHeader_div01").click(function(){
				createDailyPage();
			})
			//週誌分類
			$("#daily_Y01_dailyView_settingHeader").append("<div id='daily_Y01_dailyView_settingHeader_div02'></div>");	
			$("#daily_Y01_dailyView_settingHeader_div02").html("<img src='./image/arrow_right.png' height='30px' width='100px' style='float:left;margin-top:15px;'>"+language["DailyName"][languageStatus]);
			$("#daily_Y01_dailyView_settingHeader_div02").css(daily_Y01_dailyView_settingHeader_inner_class);
			$("#daily_Y01_dailyView_settingHeader_div02").css("left","-30%");
			$("#daily_Y01_dailyView_settingHeader_div02").click(function(){
				createDailyClassPage();
			})
		}
		//載入資料
		dailyClassView.load();
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}

//週誌明細
function createDailyListPage()
{
	try
	{
		//新增一個 tab
		//addTab('dailyTab_Y01_list',language[56][languageStatus]);
		//建立daily grid
		dailyListView = Grid_Panel_Define.Initialize();
		dailyListView.setId('dailyTab_Y01');
		dailyListView.setResizer_ID('dailyViewPage_Y01_list');
		dailyListView.setHeader_Title(['No.','DailyDetailId',"日誌標題","上傳時間","工作時數"]);
		dailyListView.setModel(['Number','DailyDetailId','DailyDetailTitle','UpdatedTime','UsageTime']);
		dailyListView.setPagesize(10);
		dailyListView.setfieldShow([true,false,true,true,true]);
		dailyListView.setHeader_Width(['10%','0%','40%','24.8%','24.8%']); 
		dailyListView.createHeader();
		dailyListView.createTable();
		//修改高度
		$('#dailyTab_Y01_Table').css('height','calc(100% - 160px)');
		//改寫欄位
		dailyListView.setLoad_Callback(function()
		{
			for(var i = 0; i < $('#dailyTab_Y01_Table').children().length; i++)
			{
				//編號
				$('#dailyTab_Y01_Table_Inner_' + i).children().eq(0).html(i+1+dailyListView.getStart());
				//設定雙點擊事件
				$('#dailyTab_Y01_Table_Inner_' + i).dblclick(function(){
					DailyDetailId=$('#'+this.id).children().eq(1).html();
					createDailyContentPage();
				});
				//上傳時間
				$('#dailyTab_Y01_Table_Inner_' + i).children().eq(3).html(getDate($('#dailyTab_Y01_Table_Inner_' + i).children().eq(3).html()) + " " + getTime($('#dailyTab_Y01_Table_Inner_' + i).children().eq(3).html()));
			};
		});
		dailyListView.createPagging();
		//設定網址取用方法
		dailyListView.getUrl = function getUrl()
		{
			try
			{
				//組合參數
				var Start = dailyListView.getStart();
				var Limit = dailyListView.getPagesize();
				var dc = (+new Date());
				dailyListViewURL=localStorage.daily+"/Daily/me/"+DailyID+"/list?dailyTypeID="+DailyTypeID+"&start="+Start+"&limit="+Limit+"&_dc="+dc;
				return dailyListViewURL;
			}
			catch(err)
			{
				if(App_Debug)
				{
					console.log(err);
				}
			}
		}
		//新增 標頭列
		new function()
		{
			$('#dailyTab_Y01').prepend("<div id='daily_Y01_dailyView_settingHeader'></div>");
			$("#daily_Y01_dailyView_settingHeader").css
			({
				"height":"60px",
			    "width":"101%",
		        "margin-left":"-1px",
			    "background-color":"rgb(84,116,165)",
			    "position":"relative"
			});
			var daily_Y01_dailyView_settingHeader_inner_class = 
			{
				"line-height":"60px",
				"width":"250px",
				"font-size":'14pt',
				"color":"white",
				"text-align":"center",
				"float":"left",
				"position":"absolute",
				"top":"0px",
				"right":"0px",
				"bottom":"0px",
				"margin":"auto",
				"cursor":"pointer",

			};
			//我的週誌
			$("#daily_Y01_dailyView_settingHeader").append("<div id='daily_Y01_dailyView_settingHeader_div01'></div>");
			$("#daily_Y01_dailyView_settingHeader_div01").html(language["myDaily"][languageStatus]);
			$("#daily_Y01_dailyView_settingHeader_div01").css(daily_Y01_dailyView_settingHeader_inner_class);
			$("#daily_Y01_dailyView_settingHeader_div01").css("left","-60%");
			$("#daily_Y01_dailyView_settingHeader_div01").click(function(){
				createDailyPage();
			})
			//週誌分類
			$("#daily_Y01_dailyView_settingHeader").append("<div id='daily_Y01_dailyView_settingHeader_div02'></div>");	
			$("#daily_Y01_dailyView_settingHeader_div02").html("<img src='./image/arrow_right.png' height='30px' width='100px' style='float:left;margin-top:15px;'>"+language["DailyName"][languageStatus]);
			$("#daily_Y01_dailyView_settingHeader_div02").css(daily_Y01_dailyView_settingHeader_inner_class);
			$("#daily_Y01_dailyView_settingHeader_div02").css("left","-30%");
			$("#daily_Y01_dailyView_settingHeader_div02").click(function(){
				createDailyClassPage();
			})
			//週誌明細
			$("#daily_Y01_dailyView_settingHeader").append("<div id='daily_Y01_dailyView_settingHeader_div03'></div>");
			$("#daily_Y01_dailyView_settingHeader_div03").html("<img src='./image/arrow_right.png' height='30px' width='100px' style='float:left;margin-top:15px;'>"+language["dailyTetail"][languageStatus]);
			$("#daily_Y01_dailyView_settingHeader_div03").css(daily_Y01_dailyView_settingHeader_inner_class);
			$("#daily_Y01_dailyView_settingHeader_div03").css("left","10%");
			$("#daily_Y01_dailyView_settingHeader_div03").click(function(){
				createDailyListPage();
			})
		}
		//載入資料
		dailyListView.load();
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}

//日誌明細
function createDailyContentPage()
{
	try
	{
		//新增一個 tab
		//addTab('dailyTab_Y01_content',language[60][languageStatus]);
		//取得daily Content
		$('#dailyTab_Y01').empty();
		//新增 標頭列
		new function()
		{
			$('#dailyTab_Y01').prepend("<div id='daily_Y01_dailyView_settingHeader'></div>");
			$("#daily_Y01_dailyView_settingHeader").css
			({
				"height":"60px",
			    "width":"101%",
		        "margin-left":"-1px",
			    "background-color":"rgb(84,116,165)",
			    "position":"relative"
			});
			var daily_Y01_dailyView_settingHeader_inner_class = 
			{
				"line-height":"60px",
				"width":"250px",
				"font-size":'14pt',
				"color":"white",
				"text-align":"center",
				"float":"left",
				"position":"absolute",
				"top":"0px",
				"right":"0px",
				"bottom":"0px",
				"margin":"auto",
				"cursor":"pointer",

			};
			//我的週誌
			$("#daily_Y01_dailyView_settingHeader").append("<div id='daily_Y01_dailyView_settingHeader_div01'></div>");
			$("#daily_Y01_dailyView_settingHeader_div01").html(language["myDaily"][languageStatus]);
			$("#daily_Y01_dailyView_settingHeader_div01").css(daily_Y01_dailyView_settingHeader_inner_class);
			$("#daily_Y01_dailyView_settingHeader_div01").css("left","-60%");
			$("#daily_Y01_dailyView_settingHeader_div01").click(function(){
				createDailyPage();
			})
			//週誌分類
			$("#daily_Y01_dailyView_settingHeader").append("<div id='daily_Y01_dailyView_settingHeader_div02'></div>");	
			$("#daily_Y01_dailyView_settingHeader_div02").html("<img src='./image/arrow_right.png' height='30px' width='100px' style='float:left;margin-top:15px;'>"+language["DailyName"][languageStatus]);
			$("#daily_Y01_dailyView_settingHeader_div02").css(daily_Y01_dailyView_settingHeader_inner_class);
			$("#daily_Y01_dailyView_settingHeader_div02").css("left","-30%");
			$("#daily_Y01_dailyView_settingHeader_div02").click(function(){
				createDailyClassPage();
			})
			//週誌明細
			$("#daily_Y01_dailyView_settingHeader").append("<div id='daily_Y01_dailyView_settingHeader_div03'></div>");
			$("#daily_Y01_dailyView_settingHeader_div03").html("<img src='./image/arrow_right.png' height='30px' width='100px' style='float:left;margin-top:15px;'>"+language["dailyTetail"][languageStatus]);
			$("#daily_Y01_dailyView_settingHeader_div03").css(daily_Y01_dailyView_settingHeader_inner_class);
			$("#daily_Y01_dailyView_settingHeader_div03").css("left","10%");
			$("#daily_Y01_dailyView_settingHeader_div03").click(function(){
				createDailyListPage();
			})
			//日誌明細
			$("#daily_Y01_dailyView_settingHeader").append("<div id='daily_Y01_dailyView_settingHeader_div04'></div>");
			$("#daily_Y01_dailyView_settingHeader_div04").html("<img src='./image/arrow_right.png' height='30px' width='100px' style='float:left;margin-top:15px;'>"+language["dailyContent"][languageStatus]);
			$("#daily_Y01_dailyView_settingHeader_div04").css(daily_Y01_dailyView_settingHeader_inner_class);
			$("#daily_Y01_dailyView_settingHeader_div04").css("left","50%");		
		}
		var dc = (+new Date());
		jqueryAjax_Get(localStorage.daily+"/Daily/me/"+DailyID+'/'+DailyDetailId+"?_dc="+dc,
			//成功後
			function(result){
				//主頁面
				$('#dailyTab_Y01').append('<div id="dailyTab_Y01_content_main"></div>');
				$('#dailyTab_Y01_content_main').css({
					"background-color":"#cecece",
					"height":"100%",
					"width":"100%",
					"position":"absolute"
				});
				//主白色框架
				$('#dailyTab_Y01_content_main').append('<div id="dailyTab_Y01_content_whitePanel"></div>');
				var whitePanelWidth=($('#dailyTab_Y01').width()/2-350)+"px";
				$('#dailyTab_Y01_content_whitePanel').css({
					"background-color":"rgb(255, 255, 255)",
					"border-radius":"30pt",
					"height":"600px",
					"width":"700px",
					"margin-left":whitePanelWidth,
					"margin-top":"30px",
					"position":"absolute"
				});
				//TitleText
				var TitleText=result.data.DailyDetailTitle;
				$('#dailyTab_Y01_content_whitePanel').append("<div id='dailyTab_Y01_content_titleText'>"+language["DailyDetailTitle"][languageStatus]+"："+TitleText+"</div>");
				$('#dailyTab_Y01_content_titleText').css({
								"width":$('#dailyTab_Y01_content_whitePanel').width()+"px",
								"font-size":"12pt",
								"margin-top":"30px",
								"margin-left":"250px"
								});
				//classText
				var classText=result.data.DailyName;
				$('#dailyTab_Y01_content_whitePanel').append("<div id='dailyTab_Y01_content_classText'>"+language["DailyName"][languageStatus]+"："+classText+"</div>");
				$('#dailyTab_Y01_content_classText').css({
								"width":$('#dailyTab_Y01_content_whitePanel').width()+"px",
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//useTimeText
				var useTimeText=result.data.UsageTime;
				$('#dailyTab_Y01_content_whitePanel').append("<div id='dailyTab_Y01_content_useTimeText'>"+language["UsageTime"][languageStatus]+"："+useTimeText+"</div>");
				$('#dailyTab_Y01_content_useTimeText').css({
								"width":$('#dailyTab_Y01_content_useTimeText').width()+"px",
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//contentPanel
				$('#dailyTab_Y01_content_whitePanel').append('<div id="dailyTab_Y01_content_ContentPanel"></div>');
				$('#dailyTab_Y01_content_ContentPanel').css({
					"background-color":"rgb(255, 255, 255)",
					"border-radius":"30pt",
					"height":"400px",
					"width":"500px",
					"margin-left":"100px",
					"margin-top":"30px",
					"position":"absolute",
					"border-style":"double",
				});
				//contentPanelTitle
				$('#dailyTab_Y01_content_ContentPanel').append('<div id="dailyTab_Y01_content_ContentPanelTitle">'+language["dailyContentTetail"][languageStatus]+'</div>');
				$('#dailyTab_Y01_content_ContentPanelTitle').css({
					"border-top-left-radius":"30pt",
					"border-top-right-radius":"30pt",
					"height":"50px",
					"width":"500px",
					"text-align":"center",
					"font-size":"12pt",
					"line-height":"50px",
					"color":"white",
					"background": "rgb(84,116,165)",
				    "background": "-moz-linear-gradient(left, rgb(84,116,165) 1%, rgb(102,144,190) 100%)",
				    "background": "-webkit-linear-gradient(left, rgb(84,116,165) 1%,rgb(102,144,190) 100%)",
				    "background": "linear-gradient(to right, rgb(84,116,165) 1%,rgb(102,144,190) 100%)",
				    "filter": "progid:DXImageTransform.Microsoft.gradient( startColorstr='#5474a5', endColorstr='#6690be',GradientType=1 )",

				});
				//contentText
				var contentText=result.data.DailyDetailContent;
				$('#dailyTab_Y01_content_ContentPanel').append("<div id='dailyTab_Y01_content_contentText'>"+contentText+"</div>");
				$('#dailyTab_Y01_content_contentText').css({
								"width":"460px",
								"height":"300px",
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"20px",
								"word-wrap":"break-word",
								"overflow":"auto"
								});
				//deleteButton
				var deleButtonWidth=($('#dailyTab_Y01_content_whitePanel').width()+$('#dailyTab_Y01').width())/2+30+'px';
				//如果是未上傳才需要顯示刪除日誌
				if(localStorage.getItem('dailyClick') == "未上傳")
				{
					$('#dailyTab_Y01_content_main').append("<button id='dailyTab_Y01_content_deleteButton'>"+language["dailyDeleteButton"][languageStatus]+"</button>");
					$('#dailyTab_Y01_content_deleteButton').css({
									"width":"150px",
									"height":"40px",
									"font-size":"12pt",
									"margin-top":"30px",
									"margin-left":deleButtonWidth,
									"background-color":"rgb(236,113,116)",
									"color":"white"
									});
					$('#dailyTab_Y01_content_deleteButton').click(function(){
						var deleteDailyCheck_Msg = YesNo_Msg_Define.Initialize();
						deleteDailyCheck_Msg.setMask(true);
						deleteDailyCheck_Msg.setSmartdetect(true);
						deleteDailyCheck_Msg.setWidth(300);
						deleteDailyCheck_Msg.setHeight(168);
						deleteDailyCheck_Msg.setId('deleteDailyCheck_Msg');
						deleteDailyCheck_Msg.setTitle(language["system_warning"][languageStatus]);
						deleteDailyCheck_Msg.show();
						deleteDailyCheck_Msg.addMsgContent(language["warning_message"][languageStatus]);
						deleteDailyCheck_Msg.addYesNO_Button(language["system_cancel"][languageStatus],language["system_ok"][languageStatus],
							//取消刪除日誌
							function()
							{
								//關閉 Msg
							    deleteDailyCheck_Msg.close();
							},
							//刪除日誌
							function()
							{
								var dc = (+new Date());
								jqueryAjax_Delete(localStorage.daily+"/Daily/me/"+DailyID+'/'+DailyDetailId+"?_dc="+dc,null,
									function(Result){
										deleteDailyCheck_Msg.close();
										$('#dailyTab_Y01').empty();
										createDailyListPage();
									},null,null);
								//關閉 Msg
							});
					});
				}
			},
			//失敗時
			function(){
				var dailyContentErr_Msg = YesNo_Msg_Define.Initialize();
				dailyContentErr_Msg.setMask(false);
				dailyContentErr_Msg.setSmartdetect(false);
				dailyContentErr_Msg.setWidth(300);
				dailyContentErr_Msg.setHeight(168);
				dailyContentErr_Msg.setId('dailyContentErr_Msg');
				dailyContentErr_Msg.setTitle(language["system_error"][languageStatus]);
				dailyContentErr_Msg.show();
				dailyContentErr_Msg.addMsgContent(error.message);
				dailyContentErr_Msg.addYesNO_Button('',language["system_ok"][languageStatus],null,
				function()
				{
					//關閉 Msg
				    dailyContentErr_Msg.close();
				});
				//隱藏 No 按鈕
				$('#dailyContentErr_Msg_No').css("display","none");
				//置中 Yes 按鈕
				$('#dailyContentErr_MsgYes').css({"margin-left":"0px","width":"100%"});
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

//產生新增日誌
function createNewDailyWindow(){
	try{
		//定義介面
		var newDaily_Window = Window_Define.Initialize();
		newDaily_Window.setMask(true);
		newDaily_Window.setWidth(480);
		newDaily_Window.setHeight(320);
		newDaily_Window.setId('newDaily_Window');
		newDaily_Window.setTitle(language["newDaily"][languageStatus]);
		newDaily_Window.show();
		newDaily_Window.addTextfield('newDailyTitle',language["DailyDetailTitle"][languageStatus]+':');
		newDaily_Window.addComboboxPagging('newDailyClass',language["DailyName"][languageStatus]+':',
		{
			//分頁設定
			'Url':localStorage.daily+'/Daily/type' + '?_dc=' + new Date().getTime(),
		    'rootProperty':'data',
		    'displayField':'DailyName',
		    'valueField':'DailyTypeID',
		    'pageSize':'5',
		    'searchUrl':localStorage.daily+'/Daily/type' + '?_dc=' + new Date().getTime(),
		    'searchPlaceholder':'搜尋分類',
		    'searchKey':'searchKey'
		});
		newDaily_Window.addTextfield('newDailyUseTime',language["UsageTime"][languageStatus]+':');
		newDaily_Window.addTextarea('newDailyContent',language["dailyContentTetail"][languageStatus]+' :');
		$('#newDailyUseTime').attr('type','number');
		// //上傳按鈕
		// $('#newDaily_Window_Body').append('<input type="button" value="上傳檔案" id="daily_updatefile_btn"></input>');
		// $('#daily_updatefile_btn').css({
		// 	"background-color": "#599bb3",
		//     "border-radius": "11px",
		//     "display": "inline-block",
		//     "cursor": "pointer",
		//     "color": "#ffffff",
		//     "font-family": "Arial",
		//     "font-size": "12px",
		//     "font-weight": "bold",
		//     "padding": "12px 24px",
		//     "text-decoration": "none",
		//     "border": "none",
		//     "display": "block",
		//     "margin": "0px auto",
		//     "margin-top": "10px"
		// });
		// $('#daily_updatefile_btn').click(function(){
		// 	if($('#dailyFileupdate_Msg').size()){
		// 		$('#dailyFileupdate_Msg').show();
		// 	}else{
		// 		updateFile();
		// 	}
		// });
		newDaily_Window.addYesNO_Button(language["system_cancel"][languageStatus],language["system_send"][languageStatus],
			//NO Function
			function(){
				newDaily_Window.close();
			}
			,//Yes Function
			function(){
				var dailyData={
					title:$('#newDailyTitle').val(),
					typeid:newDaily_Window.newDailyClass.getComboboxPagging_Value(),
					useTime:$('#newDailyUseTime').val(),
					content:$('#newDailyContent').val(),
					workItemId:DailyID,
				};

				//送出資料
				var dc = (+new Date());
				jqueryAjax_Post(localStorage.daily+"/Daily/me/"+DailyID+"?_dc="+dc,JSON.stringify(dailyData),
					//成功後
					function(result){
						var daily_Msg = YesNo_Msg_Define.Initialize();
						daily_Msg.setMask(false);
						daily_Msg.setSmartdetect(false);
						daily_Msg.setWidth(300);
						daily_Msg.setHeight(168);
						daily_Msg.setId('daily_Msg');
						daily_Msg.setTitle(language["system_msg"][languageStatus]);
						daily_Msg.show();
						daily_Msg.addMsgContent(result.message);
						daily_Msg.addYesNO_Button('',language["system_ok"][languageStatus],null,
						function()
						{
							//關閉 Msg
						    daily_Msg.close();
						    newDaily_Window.close();
						    //重新整理
						    dailyClassView.load();
						    //清除上傳檔案
						    $('#dailyFileupdate_Msg').remove();
						});
						//隱藏 No 按鈕
						$('#daily_Msg_No').css("display","none");
						//置中 Yes 按鈕
						$('#daily_Msg_Yes').css({"margin-left":"0px","width":"100%"});
					},
					//失敗後
					function(error){
						normalError_Msg_Withmask(language["system_lose"][languageStatus]);
						$("#YesNo_Msg").width(300);
						$("#YesNo_Msg").height(168);
						$("#YesNo_Msg_Title").html(language["system_error"][languageStatus]);
						$("#YesNo_Msg_Yes").html(language["system_ok"][languageStatus]);
						//Debug
						$('#YesNo_Msg').css('z-index',100);
						$('#YesNo_Msg_Mask').css('z-index',100);
						// var dailyFail_Msg = YesNo_Msg_Define.Initialize();
						// dailyFail_Msg.setMask(false);
						// dailyFail_Msg.setSmartdetect(false);
						// dailyFail_Msg.setWidth(300);
						// dailyFail_Msg.setHeight(168);
						// dailyFail_Msg.setId('dailyFail_Msg');
						// dailyFail_Msg.setTitle(language["system_error"][languageStatus]);
						// dailyFail_Msg.show();
						// dailyFail_Msg.addMsgContent(error.message);
						// dailyFail_Msg.addYesNO_Button('',language["system_ok"][languageStatus],null,
						// function()
						// {
						// 	//關閉 Msg
						//     dailyFail_Msg.close();
						//     //清除上傳檔案
						//     $('#dailyFileupdate_Msg').remove();
						//     //霧面持續
						//     addBlur_Css('Mainpage');
						// });
						// //隱藏 No 按鈕
						// $('#dailyFail_Msg_No').css("display","none");
						// //置中 Yes 按鈕
						// $('#dailyFail_Msg_Yes').css({"margin-left":"0px","width":"100%"});
					})
			}
			);

		$("#newDaily_Window_Yes").css('margin-left',70)
	}catch(err){
		if(App_Debug)
		{
			console.log(err);
		}
	}

}

//產生搜尋日誌視窗
function createSelectDailyWindow(){
	try{
		//定義介面
		selectDaily_Window = Window_Define.Initialize();
		selectDaily_Window.setMask(true);
		selectDaily_Window.setWidth(480);
		selectDaily_Window.setHeight(205);
		selectDaily_Window.setId('selectDaily_Window');
		selectDaily_Window.setTitle(language["selectDailyTitle"][languageStatus]);
		selectDaily_Window.show();
		selectDept="";
		selectDaily_Window.addComboboxPagging('selectDailyDeptment',language["selectDepartment"][languageStatus]+' :',{
			//分頁設定
			'Url':localStorage.human+'/Department/all' + '?_dc=' + new Date().getTime(),
		    'rootProperty':'data',
		    'displayField':'DepartmentName',
		    'valueField':'DepartmentID',
		    'pageSize':'5',
		    'searchUrl':localStorage.human+'/Department/all' + '?_dc=' + new Date().getTime(),
		    'searchPlaceholder':'搜尋部門',
		    'searchKey':'searchKey'
		});
		$("#selectDailyDeptment_valueField").bind("DOMSubtreeModified", function() {
		    selectDaily_Window.selectDailyEmployee.setComboboxPagging_Value(null);
		    selectDept=selectDaily_Window.selectDailyDeptment.getComboboxPagging_Value();
		    empObject.Url=localStorage.human+'/Department/' + selectDept +'/empList?_dc=' + new Date().getTime();
			empObject.searchUrl=localStorage.human+'/Department/' + selectDept +'/empList?_dc=' + new Date().getTime();
			selectDaily_Window.selectDailyEmployee.ComboboxPagging_load();
		});
		var empObject={
			//分頁設定
			'Url':'',
		    'rootProperty':'data',
		    'displayField':'EmployeeName',
		    'valueField':'EmployeeID',
		    'pageSize':'5',
		    'searchUrl':'',
		    'searchPlaceholder':'搜尋員工',
		    'searchKey':'searchKey'
		};
		selectDaily_Window.addComboboxPagging('selectDailyEmployee',language["selectEmployee"][languageStatus]+' :',empObject);

		selectDaily_Window.addYesNO_Button('',language["system_ok"][languageStatus],null,
			//Yes Function
			function(){
				if(selectDaily_Window.selectDailyEmployee.getComboboxPagging_Value()){
					selectDailyEmployee=selectDaily_Window.selectDailyEmployee.getComboboxPagging_Value();
					selectDaily_Window.close();
					createSelelctDailyPage();
				}else{
					var selectDaily_Msg = YesNo_Msg_Define.Initialize();
					selectDaily_Msg.setMask(false);
					selectDaily_Msg.setSmartdetect(false);
					selectDaily_Msg.setWidth(300);
					selectDaily_Msg.setHeight(168);
					selectDaily_Msg.setId('selectDaily_Msg');
					selectDaily_Msg.setTitle(language["system_warning"][languageStatus]);
					selectDaily_Msg.show();
					selectDaily_Msg.addMsgContent(language["system_lose"][languageStatus]);
					selectDaily_Msg.addYesNO_Button('',language["system_ok"][languageStatus],null,
					function()
					{
						//關閉 Msg
						selectDaily_Msg.close();
						//持續霧面
						addBlur_Css('Mainpage');
					});
					//隱藏 No 按鈕
					$('#selectDaily_Msg_No').css("display","none");
					//置中 Yes 按鈕
					$('#selectDaily_Msg_Yes').css({"margin-left":"0px","width":"100%"});
				}
				
			});
		//隱藏 No 按鈕
		$('#selectDaily_Window_No').css("display","none");
		//置中 Yes 按鈕
		$('#selectDaily_Window_Yes').css({"margin-left":"0px","width":"100%"});
	}catch(err){
		if(App_Debug)
		{
			console.log(err);
		}
	}

}

//產生搜尋日誌頁面
function createSelelctDailyPage()
{
	try
	{
		//新增一個 tab
		addTab('selectDailyTab_Y01',language["selectDailyTitle"][languageStatus]);
		//建立daily grid
		var selectDailyView = Grid_Panel_Define.Initialize();
		selectDailyView.setId('selectDailyTab_Y01');
		selectDailyView.setResizer_ID('selectDailyViewPage_Y01');
		selectDailyView.setHeader_Title(['No.','ID',"日誌編號","起始時間","結束時間","最後修改時間","總時數","狀態"]);
		selectDailyView.setModel(['Number','DailyID','DailyNumber','DailyStartDatetime','DailyEndDatetime','lastUpdated','useTime','DailyStatus']);
		selectDailyView.setPagesize(10);
		selectDailyView.setfieldShow([true,false,true,true,true,true,true,true]);
		selectDailyView.setHeader_Width(['10%','0%','15%','15%','15%','20%','10%','14.4%']); // 99.5%
		selectDailyView.createHeader();
		selectDailyView.createTable();
		//改寫欄位
		selectDailyView.setLoad_Callback(function()
		{
			for(var i = 0; i < $('#selectDailyTab_Y01_Table').children().length; i++)
			{
				//編號
				$('#selectDailyTab_Y01_Table_Inner_' + i).children().eq(0).html(i+1+selectDailyView.getStart());
				//時間欄位顯示設定
				$('#selectDailyTab_Y01_Table_Inner_' + i).children().eq(3).html(getDate($('#selectDailyTab_Y01_Table_Inner_' + i).children().eq(3).html()) + ' ' + getTime($('#selectDailyTab_Y01_Table_Inner_' + i).children().eq(3).html()));
				$('#selectDailyTab_Y01_Table_Inner_' + i).children().eq(4).html(getDate($('#selectDailyTab_Y01_Table_Inner_' + i).children().eq(4).html()) + ' ' + getTime($('#selectDailyTab_Y01_Table_Inner_' + i).children().eq(4).html()));
				$('#selectDailyTab_Y01_Table_Inner_' + i).children().eq(5).html(getDate($('#selectDailyTab_Y01_Table_Inner_' + i).children().eq(5).html()) + ' ' + getTime($('#selectDailyTab_Y01_Table_Inner_' + i).children().eq(5).html()));
				//狀態顯示
				if($('#selectDailyTab_Y01_Table_Inner_' + i).children().eq(7).html()=="未上傳"){
					var input="<div style='margin-top:10% !important;line-height:40px;width:70px;color:white;background-color:red;margin:0px auto;border-radius:4px'>"+$('#selectDailyTab_Y01_Table_Inner_' + i).children().eq(7).html()+"</div>";
					$('#selectDailyTab_Y01_Table_Inner_' + i).children().eq(7).html(input);
				}else{
					var input="<div style='margin-top:10% !important;line-height:40px;width:70px;color:white;background-color:green;margin:0px auto;border-radius:4px'>"+$('#selectDailyTab_Y01_Table_Inner_' + i).children().eq(7).html()+"</div>";
					$('#selectDailyTab_Y01_Table_Inner_' + i).children().eq(7).html(input);
				}
				$('#selectDailyTab_Y01_Table_Inner_' + i).children().eq(7).css("margin-top","-10px");
				//設定雙點擊事件
				$('#selectDailyTab_Y01_Table_Inner_' + i).dblclick(function(){
					selectDailyID=$('#'+this.id).children().eq(1).html();
					createSelectDailyClassPage();
				});
				
			};
		});
		selectDailyView.createPagging();
		//設定網址取用方法
		selectDailyView.getUrl = function getUrl()
		{
			try
			{
				//組合參數
				var Start = selectDailyView.getStart();
				var Limit = selectDailyView.getPagesize();
				var dc = (+new Date());
				return selectULR=localStorage.daily+"/Daily/"+selectDailyEmployee+"?_dc="+dc+'&limit='+Limit+'&start='+Start;;
			}
			catch(err)
			{
				if(App_Debug)
				{
					console.log(err);
				}
			}
		}
		//新增 標頭列
		new function()
		{
			$('#selectDailyTab_Y01').prepend("<div id='selectDaily_Y01_dailyView_settingHeader'></div>");
			$("#selectDaily_Y01_dailyView_settingHeader").css
			({
				"height":"60px",
			    "width":"101%",
		        "margin-left":"-1px",
			    "background-color":"rgb(84,116,165)",
			    "position":"relative"
			});
			var selectDaily_Y01_dailyView_settingHeader_inner_class = 
			{
				"line-height":"60px",
				"width":"250px",
				"font-size":'14pt',
				"color":"white",
				"text-align":"center",
				"float":"left",
				"position":"absolute",
				"top":"0px",
				"right":"0px",
				"bottom":"0px",
				"margin":"auto",
				"cursor":"pointer",

			};
			//我的週誌
			$("#selectDaily_Y01_dailyView_settingHeader").append("<div id='selectDaily_Y01_dailyView_settingHeader_div01'></div>");
			$("#selectDaily_Y01_dailyView_settingHeader_div01").html(language["myDaily"][languageStatus]);
			$("#selectDaily_Y01_dailyView_settingHeader_div01").css(selectDaily_Y01_dailyView_settingHeader_inner_class);
			$("#selectDaily_Y01_dailyView_settingHeader_div01").css("left","-60%");
			$("#selectDaily_Y01_dailyView_settingHeader_div01").click(function(){
				createSelelctDailyPage();
			})		
		}
		//載入資料
		selectDailyView.load();
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}

//產生SelectDailyClass View
function createSelectDailyClassPage()
{
	try
	{
		//新增一個 tab
		//addTab('selectDailyTab_Y01_class',language[52][languageStatus]);
		//建立daily grid
		selectDailyClassView = Grid_Panel_Define.Initialize();
		selectDailyClassView.setId('selectDailyTab_Y01');
		selectDailyClassView.setResizer_ID('selectDailyViewPage_Y01_class');
		selectDailyClassView.setHeader_Title(['No.','ID',"日誌分類","總比數","總時數"]);
		selectDailyClassView.setModel(['Number','DailyTypeID','DailyName','count','totalHour']);
		selectDailyClassView.setPagesize(10);
		selectDailyClassView.setfieldShow([true,false,true,true,true]);
		selectDailyClassView.setHeader_Width(['10%','0%','40%','24.8%','24.8%']); // 99.5%
		selectDailyClassView.createHeader();
		selectDailyClassView.createTable();
		selectDailyClassView.createPagging();
		//改寫欄位
		selectDailyClassView.setLoad_Callback(function()
		{
			for(var i = 0; i < $('#selectDailyTab_Y01_Table').children().length; i++)
			{
				//編號
				$('#selectDailyTab_Y01_Table_Inner_' + i).children().eq(0).html(i+1+selectDailyClassView.getStart());
				//設定雙點擊事件
				$('#selectDailyTab_Y01_Table_Inner_' + i).dblclick(function(){
					selectDailyTypeID=$('#'+this.id).children().eq(1).html();
					createSelectDailyListPage();
				});
				
			};
		});
		//設定網址取用方法
		selectDailyClassView.getUrl = function getUrl()
		{
			try
			{
				//組合參數
				var Start = selectDailyClassView.getStart();
				var Limit = selectDailyClassView.getPagesize();
				var dc = (+new Date());
				return localStorage.daily+"/Daily/"+selectDailyEmployee+"/"+selectDailyID+"?start="+Start+"&limit="+Limit+"&_dc="+dc;
			}
			catch(err)
			{
				if(App_Debug)
				{
					console.log(err);
				}
			}
		}
		//改寫model 欄位
		selectDailyClassView.setData = function(Content_Array)
		{
			//依照 Model 資料存入
			var This_Model = this.getModel();
			//儲存回傳資料
			selectDailyClassView.Data = Content_Array.detaildata;
			//回傳內容
			for(var i=0;i<Content_Array.detaildata.length;i++)
			{
				var Temp_Array = [];
				//Model 欄位
				for(var j=0;j<This_Model.length;j++)
				{
					//將資料轉存成陣列
					Temp_Array.push(Content_Array.detaildata[i][This_Model[j]]);
					if(j == This_Model.length - 1)
					{
						var This_ID = this.getId();
						//總共新增了幾筆
						var Count = $('#' + This_ID + '_Table').children().length;
						//要新增的 div id
						var Current_ID = This_ID + "_Table_Inner_" + Count;
						//新增區別 div
						$('#' + This_ID + '_Table').append("<div id='" + Current_ID + "'></div>");
						//新增區別 div 的 Contextmenu
						this.createContextmenu(Current_ID);
						//取得 header content
						var Width = this.getHeader_Width();
						//產生 table 內容 寬度必須對應
						for(var k=0;k<Width.length;k++)
						{
							//依照是否顯示
							var fieldShow_Css = (selectDailyClassView.getfieldShow()[k])?'':'display:none;';
							//欄位內值
							var fieldValue = (Temp_Array[k])?Temp_Array[k]:'';
							$('#'+Current_ID).append("<div style='width:" + Width[k] + ";line-height:" + this.Table_Lineheight + ";display:inline-block;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;height:100%;" + fieldShow_Css + "'>" + fieldValue + "</div>");
						}
					}
				}
				//最後執行 Callback
				if(i == Content_Array.detaildata.length - 1)
				{
					//如果有 Callback
					if(selectDailyClassView.getLoad_Callback())
					{
						selectDailyClassView.getLoad_Callback()();
					}
				}
			}
			//判斷是否要針對捲軸的出現做大小改變
			this.getResizer();
		}
		//新增 標頭列
		new function()
		{
			$('#selectDailyTab_Y01').prepend("<div id='selectDaily_Y01_dailyView_settingHeader'></div>");
			$("#selectDaily_Y01_dailyView_settingHeader").css
			({
				"height":"60px",
			    "width":"101%",
		        "margin-left":"-1px",
			    "background-color":"rgb(84,116,165)",
			    "position":"relative"
			});
			var selectDaily_Y01_dailyView_settingHeader_inner_class = 
			{
				"line-height":"60px",
				"width":"250px",
				"font-size":'14pt',
				"color":"white",
				"text-align":"center",
				"float":"left",
				"position":"absolute",
				"top":"0px",
				"right":"0px",
				"bottom":"0px",
				"margin":"auto",
				"cursor":"pointer",

			};
			//我的週誌
			$("#selectDaily_Y01_dailyView_settingHeader").append("<div id='selectDaily_Y01_dailyView_settingHeader_div01'></div>");
			$("#selectDaily_Y01_dailyView_settingHeader_div01").html(language["myDaily"][languageStatus]);
			$("#selectDaily_Y01_dailyView_settingHeader_div01").css(selectDaily_Y01_dailyView_settingHeader_inner_class);
			$("#selectDaily_Y01_dailyView_settingHeader_div01").css("left","-60%");
			$("#selectDaily_Y01_dailyView_settingHeader_div01").click(function(){
				createSelelctDailyPage();
			})
			//週誌分類
			$("#selectDaily_Y01_dailyView_settingHeader").append("<div id='selectDaily_Y01_dailyView_settingHeader_div02'></div>");	
			$("#selectDaily_Y01_dailyView_settingHeader_div02").html("<img src='./image/arrow_right.png' height='30px' width='100px' style='float:left;margin-top:15px;'>"+language["DailyName"][languageStatus]);
			$("#selectDaily_Y01_dailyView_settingHeader_div02").css(selectDaily_Y01_dailyView_settingHeader_inner_class);
			$("#selectDaily_Y01_dailyView_settingHeader_div02").css("left","-30%");
			$("#selectDaily_Y01_dailyView_settingHeader_div02").click(function(){
				createSelectDailyClassPage();
			})
		}
		//載入資料
		selectDailyClassView.load();
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}

//產生SelectDailylist View
function createSelectDailyListPage()
{
	try
	{
		//新增一個 tab
		//addTab('selectDailyTab_Y01_list',language[56][languageStatus]);
		//建立daily grid
		selectDailyListView = Grid_Panel_Define.Initialize();
		selectDailyListView.setId('selectDailyTab_Y01');
		selectDailyListView.setResizer_ID('selectDailyViewPage_Y01_list');
		selectDailyListView.setHeader_Title(['No.','DailyDetailId',"日誌標題","上傳時間","工作時數"]);
		selectDailyListView.setModel(['Number','DailyDetailId','DailyDetailTitle','UpdatedTime','UsageTime']);
		selectDailyListView.setPagesize(10);
		selectDailyListView.setfieldShow([true,false,true,true,true]);
		selectDailyListView.setHeader_Width(['10%','0%','40%','24.8%','24.8%']); 
		selectDailyListView.createHeader();
		selectDailyListView.createTable();

		//改寫欄位
		selectDailyListView.setLoad_Callback(function()
		{
			for(var i = 0; i < $('#selectDailyTab_Y01_Table').children().length; i++)
			{
				//編號
				$('#selectDailyTab_Y01_Table_Inner_' + i).children().eq(0).html(i+1+selectDailyListView.getStart());
				//設定雙點擊事件
				$('#selectDailyTab_Y01_Table_Inner_' + i).dblclick(function(){
					selectDailyDetailId=$('#'+this.id).children().eq(1).html();
					createSelectDailyContentPage();
				});
				//上傳時間
				$('#selectDailyTab_Y01_Table_Inner_' + i).children().eq(3).html(getDate($('#selectDailyTab_Y01_Table_Inner_' + i).children().eq(3).html()) + " " + getTime($('#selectDailyTab_Y01_Table_Inner_' + i).children().eq(3).html()));
			};
		});
		selectDailyListView.createPagging();
		//設定網址取用方法
		selectDailyListView.getUrl = function getUrl()
		{
			try
			{
				//組合參數
				var Start = selectDailyListView.getStart();
				var Limit = selectDailyListView.getPagesize();
				var dc = (+new Date());
				return localStorage.daily+"/Daily/"+selectDailyEmployee+"/"+selectDailyID+"/list?dailyTypeID="+selectDailyTypeID+"&start="+Start+"&limit="+Limit+"&_dc="+dc;
			}
			catch(err)
			{
				if(App_Debug)
				{
					console.log(err);
				}
			}
		}
		//新增 標頭列
		new function()
		{
			$('#selectDailyTab_Y01').prepend("<div id='selectDaily_Y01_dailyView_settingHeader'></div>");
			$("#selectDaily_Y01_dailyView_settingHeader").css
			({
				"height":"60px",
			    "width":"101%",
		        "margin-left":"-1px",
			    "background-color":"rgb(84,116,165)",
			    "position":"relative"
			});
			var selectDaily_Y01_dailyView_settingHeader_inner_class = 
			{
				"line-height":"60px",
				"width":"250px",
				"font-size":'14pt',
				"color":"white",
				"text-align":"center",
				"float":"left",
				"position":"absolute",
				"top":"0px",
				"right":"0px",
				"bottom":"0px",
				"margin":"auto",
				"cursor":"pointer",

			};
			//我的週誌
			$("#selectDaily_Y01_dailyView_settingHeader").append("<div id='selectDaily_Y01_dailyView_settingHeader_div01'></div>");
			$("#selectDaily_Y01_dailyView_settingHeader_div01").html(language["myDaily"][languageStatus]);
			$("#selectDaily_Y01_dailyView_settingHeader_div01").css(selectDaily_Y01_dailyView_settingHeader_inner_class);
			$("#selectDaily_Y01_dailyView_settingHeader_div01").css("left","-60%");
			$("#selectDaily_Y01_dailyView_settingHeader_div01").click(function(){
				createSelelctDailyPage();
			})
			//週誌分類
			$("#selectDaily_Y01_dailyView_settingHeader").append("<div id='selectDaily_Y01_dailyView_settingHeader_div02'></div>");	
			$("#selectDaily_Y01_dailyView_settingHeader_div02").html("<img src='./image/arrow_right.png' height='30px' width='100px' style='float:left;margin-top:15px;'>"+language["DailyName"][languageStatus]);
			$("#selectDaily_Y01_dailyView_settingHeader_div02").css(selectDaily_Y01_dailyView_settingHeader_inner_class);
			$("#selectDaily_Y01_dailyView_settingHeader_div02").css("left","-30%");
			$("#selectDaily_Y01_dailyView_settingHeader_div02").click(function(){
				createSelectDailyClassPage();
			})
			//週誌明細
			$("#selectDaily_Y01_dailyView_settingHeader").append("<div id='selectDaily_Y01_dailyView_settingHeader_div03'></div>");
			$("#selectDaily_Y01_dailyView_settingHeader_div03").html("<img src='./image/arrow_right.png' height='30px' width='100px' style='float:left;margin-top:15px;'>"+language["dailyTetail"][languageStatus]);
			$("#selectDaily_Y01_dailyView_settingHeader_div03").css(selectDaily_Y01_dailyView_settingHeader_inner_class);
			$("#selectDaily_Y01_dailyView_settingHeader_div03").css("left","10%");
			$("#selectDaily_Y01_dailyView_settingHeader_div03").click(function(){
				createSelectDailyListPage();
			})
		}
		//載入資料
		selectDailyListView.load();
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}

//產生SelectDaily Content View
function createSelectDailyContentPage()
{
	try
	{
		$('#selectDailyTab_Y01').empty();
		//新增一個 tab
		//addTab('selectDailyTab_Y01',language[73][languageStatus]);
		//新增 標頭列
		new function()
		{
			$('#selectDailyTab_Y01').prepend("<div id='selectDaily_Y01_dailyView_settingHeader'></div>");
			$("#selectDaily_Y01_dailyView_settingHeader").css
			({
				"height":"60px",
			    "width":"101%",
		        "margin-left":"-1px",
			    "background-color":"rgb(84,116,165)",
			    "position":"relative"
			});
			var selectDaily_Y01_dailyView_settingHeader_inner_class = 
			{
				"line-height":"60px",
				"width":"250px",
				"font-size":'14pt',
				"color":"white",
				"text-align":"center",
				"float":"left",
				"position":"absolute",
				"top":"0px",
				"right":"0px",
				"bottom":"0px",
				"margin":"auto",
				"cursor":"pointer",

			};
			//我的週誌
			$("#selectDaily_Y01_dailyView_settingHeader").append("<div id='selectDaily_Y01_dailyView_settingHeader_div01'></div>");
			$("#selectDaily_Y01_dailyView_settingHeader_div01").html(language["myDaily"][languageStatus]);
			$("#selectDaily_Y01_dailyView_settingHeader_div01").css(selectDaily_Y01_dailyView_settingHeader_inner_class);
			$("#selectDaily_Y01_dailyView_settingHeader_div01").css("left","-60%");
			$("#selectDaily_Y01_dailyView_settingHeader_div01").click(function(){
				createSelelctDailyPage();
			})
			//週誌分類
			$("#selectDaily_Y01_dailyView_settingHeader").append("<div id='selectDaily_Y01_dailyView_settingHeader_div02'></div>");	
			$("#selectDaily_Y01_dailyView_settingHeader_div02").html("<img src='./image/arrow_right.png' height='30px' width='100px' style='float:left;margin-top:15px;'>"+language["DailyName"][languageStatus]);
			$("#selectDaily_Y01_dailyView_settingHeader_div02").css(selectDaily_Y01_dailyView_settingHeader_inner_class);
			$("#selectDaily_Y01_dailyView_settingHeader_div02").css("left","-30%");
			$("#selectDaily_Y01_dailyView_settingHeader_div02").click(function(){
				createSelectDailyClassPage();
			})
			//週誌明細
			$("#selectDaily_Y01_dailyView_settingHeader").append("<div id='selectDaily_Y01_dailyView_settingHeader_div03'></div>");
			$("#selectDaily_Y01_dailyView_settingHeader_div03").html("<img src='./image/arrow_right.png' height='30px' width='100px' style='float:left;margin-top:15px;'>"+language["dailyTetail"][languageStatus]);
			$("#selectDaily_Y01_dailyView_settingHeader_div03").css(selectDaily_Y01_dailyView_settingHeader_inner_class);
			$("#selectDaily_Y01_dailyView_settingHeader_div03").css("left","10%");
			$("#selectDaily_Y01_dailyView_settingHeader_div03").click(function(){
				createSelectDailyListPage();
			})
			//日誌明細
			$("#selectDaily_Y01_dailyView_settingHeader").append("<div id='selectDaily_Y01_dailyView_settingHeader_div04'></div>");
			$("#selectDaily_Y01_dailyView_settingHeader_div04").html("<img src='./image/arrow_right.png' height='30px' width='100px' style='float:left;margin-top:15px;'>"+language["dailyContent"][languageStatus]);
			$("#selectDaily_Y01_dailyView_settingHeader_div04").css(selectDaily_Y01_dailyView_settingHeader_inner_class);
			$("#selectDaily_Y01_dailyView_settingHeader_div04").css("left","50%");		
		}
		//取得daily Content
		var dc = (+new Date());
		jqueryAjax_Get(localStorage.daily+"/Daily/"+selectDailyEmployee+"/"+selectDailyID+'/'+selectDailyDetailId+"?_dc="+dc,
			//成功後
			function(result){
				//主頁面
				$('#selectDailyTab_Y01').append('<div id="selectDailyTab_Y01_content_main"></div>');
				$('#selectDailyTab_Y01_content_main').css({
					"background-color":"#cecece",
					"height":"100%",
					"width":"100%",
					"position":"absolute"
				});
				//主白色框架
				$('#selectDailyTab_Y01_content_main').append('<div id="selectDailyTab_Y01_content_whitePanel"></div>');
				var whitePanelWidth=($('#selectDailyTab_Y01').width()/2-350)+"px";
				$('#selectDailyTab_Y01_content_whitePanel').css({
					"background-color":"rgb(255, 255, 255)",
					"border-radius":"30pt",
					"height":"600px",
					"width":"700px",
					"margin-left":whitePanelWidth,
					"margin-top":"30px",
					"position":"absolute"
				});
				//TitleText
				var TitleText=result.data.DailyDetailTitle;
				$('#selectDailyTab_Y01_content_whitePanel').append("<div id='selectDailyTab_Y01_content_titleText'>"+language["DailyDetailTitle"][languageStatus]+"："+TitleText+"</div>");
				$('#selectDailyTab_Y01_content_titleText').css({
								"width":$('#selectDailyTab_Y01_content_whitePanel').width()+"px",
								"font-size":"12pt",
								"margin-top":"30px",
								"margin-left":"250px"
								});
				//classText
				var classText=result.data.DailyName;
				$('#selectDailyTab_Y01_content_whitePanel').append("<div id='selectDailyTab_Y01_content_classText'>"+language["DailyName"][languageStatus]+"："+classText+"</div>");
				$('#selectDailyTab_Y01_content_classText').css({
								"width":$('#selectDailyTab_Y01_content_whitePanel').width()+"px",
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//useTimeText
				var useTimeText=result.data.UsageTime;
				$('#selectDailyTab_Y01_content_whitePanel').append("<div id='selectDailyTab_Y01_content_useTimeText'>"+language["UsageTime"][languageStatus]+"："+useTimeText+"</div>");
				$('#selectDailyTab_Y01_content_useTimeText').css({
								"width":$('#selectDailyTab_Y01_content_useTimeText').width()+"px",
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//contentPanel
				$('#selectDailyTab_Y01_content_whitePanel').append('<div id="selectDailyTab_Y01_content_ContentPanel"></div>');
				$('#selectDailyTab_Y01_content_ContentPanel').css({
					"background-color":"rgb(255, 255, 255)",
					"border-radius":"30pt",
					"height":"400px",
					"width":"500px",
					"margin-left":"100px",
					"margin-top":"30px",
					"position":"absolute",
					"border-style":"double",
				});
				//contentPanelTitle
				$('#selectDailyTab_Y01_content_ContentPanel').append('<div id="selectDailyTab_Y01_content_ContentPanelTitle">'+language["dailyContentTetail"][languageStatus]+'</div>');
				$('#selectDailyTab_Y01_content_ContentPanelTitle').css({
					"border-top-left-radius":"30pt",
					"border-top-right-radius":"30pt",
					"height":"50px",
					"width":"500px",
					"text-align":"center",
					"font-size":"12pt",
					"line-height":"50px",
					"color":"white",
					"background": "rgb(84,116,165)",
				    "background": "-moz-linear-gradient(left, rgb(84,116,165) 1%, rgb(102,144,190) 100%)",
				    "background": "-webkit-linear-gradient(left, rgb(84,116,165) 1%,rgb(102,144,190) 100%)",
				    "background": "linear-gradient(to right, rgb(84,116,165) 1%,rgb(102,144,190) 100%)",
				    "filter": "progid:DXImageTransform.Microsoft.gradient( startColorstr='#5474a5', endColorstr='#6690be',GradientType=1 )",

				});
				//contentText
				var contentText=result.data.DailyDetailContent;
				$('#selectDailyTab_Y01_content_ContentPanel').append("<div id='selectDailyTab_Y01_content_contentText'>"+contentText+"</div>");
				$('#selectDailyTab_Y01_content_contentText').css({
								"width":"460px",
								"height":"300px",
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"20px",
								"word-wrap":"break-word",
								"overflow":"auto"
								});		
			},
			//失敗時
			function(){
				var selectDailyContentErr_Msg = YesNo_Msg_Define.Initialize();
				selectDailyContentErr_Msg.setMask(false);
				selectDailyContentErr_Msg.setSmartdetect(false);
				selectDailyContentErr_Msg.setWidth(300);
				selectDailyContentErr_Msg.setHeight(168);
				selectDailyContentErr_Msg.setId('selectDailyContentErr_Msg');
				selectDailyContentErr_Msg.setTitle(language[66][languageStatus]);
				selectDailyContentErr_Msg.show();
				selectDailyContentErr_Msg.addMsgContent(error.message);
				selectDailyContentErr_Msg.addYesNO_Button('',language[69][languageStatus],null,
				function()
				{
					//關閉 Msg
				    selectDailyContentErr_Msg.close();
				});
				//隱藏 No 按鈕
				$('#selectDailyContentErr_Msg_No').css("display","none");
				//置中 Yes 按鈕
				$('#selectDailyContentErr_MsgYes').css({"margin-left":"0px","width":"100%"});
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

//上傳檔案
function updateFile(){
	//建立 YesNo_Msg
	var YesNo_Msg = YesNo_Msg_Define.Initialize();
	YesNo_Msg.setMask(true);
	YesNo_Msg.setSmartdetect(true);
	YesNo_Msg.setWidth(350);
	YesNo_Msg.setHeight(320);
	YesNo_Msg.setId('dailyFileupdate_Msg');
	YesNo_Msg.setTitle('檔案上傳');
	YesNo_Msg.show();
	YesNo_Msg.addMsgContent(
		'<div id="drop">'+
			'拖曳至此上傳<br/>'+
		'<input type="file" id="fileupload" name="files" multiple />'+
		'</div>'+
		'<div id="progress">'+
	  		'<div class="bar" style="width: 0%;"></div>'+
	 		'<div class="item"></div>'+
		'</div>');
	$("#drop").css({
		"width": "200px",
		"height": "50px",
		"background": "#eee",
		"border": "3px dashed",
		"text-align": "center",
		"padding": "50",
	});
	$(".active").css({
		"border": "3px dashed red !important"
	});
	$(".bar").css({
		"height": "18px",
	    "background": "red",
    	"text-align": "center",
	    "font-weight": "bold",
	});
	$('#fileupload').fileupload({
			dropZone: $('#drop'),	//拖曳上傳區域
	    	url: 'ajax/upload.php',		//上傳處理的PHP
	        dataType: 'json',

	        //將要上傳的資料顯示
	        add: function (e, data) {
	            var tpl = $('<div class="working"><span class="pro" /><span class="info"></span><span class="ctrl">取消</span></div>');
	            tpl.find('.info').text(data.files[0].name);
	            data.context = tpl.appendTo($(".item"));

	            tpl.find('.ctrl').click(function(){
	                //if(tpl.hasClass('working')){
	                //    jqXHR.abort();  //取消上傳
	                //}

	                tpl.fadeOut(function(){
	                    tpl.remove();
	                });
	            });
	            //執行 data.submit() 開始上傳
	            $("#daily_Msg_Yes").click(function() {
	            	var jqXHR = data.submit();
	            });
	        },

	        //單一檔案進度
	        progress: function(e, data){
	            var progress = parseInt(data.loaded / data.total * 100, 10);
	            data.context.find('.pro').text(progress+"%　　").change();
	            if(progress == 100){
	                data.context.removeClass('working');
	            }
	        },

			//整體進度
			progressall: function (e, data) {
				var progress = parseInt(data.loaded / data.total * 100, 10);
				$('#progress .bar').css('width', progress + '%');
				$('#progress .bar').text(progress + '%');
			},

	        //上傳失敗
	        fail:function(e, data){
	            data.context.addClass('error');
	        },

	        //單一檔案上傳完成
	        done: function (e, data) {
	        	var tmp = data.context.find('.pro').text();
	            data.context.find('.pro').text(tmp + data.result.status + "　　");
	        },

	        //全部上傳完畢
	        stop: function (e) {
	        	alert("上傳完畢");
	        }
	    });
	
		//拖曳成功讓框變色
		$("#drop").bind({
		   	dragenter: function() {
		   		$(this).addClass("active");
		   	},
			dragleave: function() {
		   		$(this).removeClass("active");
		   	}
		});	
	YesNo_Msg.addYesNO_Button('取消','確定',
	//No
	function()
	{
		$('#dailyFileupdate_Msg').remove();
	},
	//Yes
	function()
	{
		$('#dailyFileupdate_Msg').hide();		
	});
	//開啟物化效果
	addBlur_Css('Mainpage');
}

//下載檔案 
function doneloadFile(){
 
$.fileDownload('http://localhost/ys3s.zip', {
    successCallback: function (url) {
 
        alert('You just got a file download dialog or ribbon for this URL :' + url);
    },
    failCallback: function (html, url) {
 
        alert('Your file download just failed for this URL:' + url + '\r\n' +
                'Here was the resulting error HTML: \r\n' + html
                );
    }
});
 
		// //建立 YesNo_Msg
		// var YesNo_Msg = YesNo_Msg_Define.Initialize();
		// YesNo_Msg.setMask(true);
		// YesNo_Msg.setSmartdetect(true);
		// YesNo_Msg.setWidth(350);
		// YesNo_Msg.setHeight(350);
		// YesNo_Msg.setId('dailyFiledoneload_Msg');
		// YesNo_Msg.setTitle('檔案下載');
		// YesNo_Msg.show();
		// YesNo_Msg.addMsgContent('<progress id="p"></progress>');
		// $.ajax({
  //           type: 'POST',
		// 	url: 'http://localhost/ys3s.zip',
  //           xhrFields: {
  //               onprogress: function (event) {
		// 		//Download progress
		// 		if (event.lengthComputable) {  
		// 			$('#p').attr('max', event.total);
		// 			$('#p').attr('value', event.loaded);
		// 			}
		// 		}
		// 	}
  //       });
		//開啟物化效果
		addBlur_Css('Mainpage');
}