/*首頁 Y02*/
//首頁語系轉換
function Home_Y02_changeLanguage(status)
{
	//針對 html 文字轉換
	Y02_changeLanguage_HTML(status);
	//針對 Title 文字轉換
	Y02_changeLanguage_Title(status);
	//針對 Placeholder 文字轉換
	Y02_changeLanguage_Placeholder(status);
	//針對 Input 文字轉換
	Y02_changeLanguage_Input(status);
}
//針對 div html 文字轉換
function Y02_changeLanguage_HTML(status)
{
	//需要翻譯的數量
	var translateCount = $(".translateHtml").length;
	//翻譯每一個文字
	for(var i=0;i<translateCount;i++)
	{
		//需要轉成簡體
		if(status == "S")
		{
			$(".translateHtml").eq(i).html($.t2s($(".translateHtml").eq(i).html()));
		}
		//需要轉成繁體
		else if(status == "T")
		{
			$(".translateHtml").eq(i).html($.s2t($(".translateHtml").eq(i).html()));
		}
	}
}
//針對 div html 文字轉換
function Y02_changeLanguage_Title(status)
{
	//需要翻譯的數量
	var translateCount = $(".translateTitle").length;
	//翻譯每一個文字
	for(var i=0;i<translateCount;i++)
	{
		//需要轉成簡體
		if(status == "S")
		{
			$(".translateTitle").eq(i).attr('title',$.t2s($(".translateTitle").eq(i).attr('title')));
		}
		//需要轉成繁體
		else if(status == "T")
		{
			$(".translateTitle").eq(i).attr('title',$.s2t($(".translateTitle").eq(i).attr('title')));
		}
	}
}
//針對 div html 文字轉換
function Y02_changeLanguage_Placeholder(status)
{
	//需要翻譯的數量
	var translateCount = $(".translatePlaceholder").length;
	//翻譯每一個文字
	for(var i=0;i<translateCount;i++)
	{
		//需要轉成簡體
		if(status == "S")
		{
			$(".translatePlaceholder").eq(i).attr('placeholder',$.t2s($(".translatePlaceholder").eq(i).attr('placeholder')));
		}
		//需要轉成繁體
		else if(status == "T")
		{
			$(".translatePlaceholder").eq(i).attr('placeholder',$.s2t($(".translatePlaceholder").eq(i).attr('placeholder')));
		}
	}
}
//針對 div html 文字轉換
function Y02_changeLanguage_Input(status)
{
	//需要翻譯的數量
	var translateCount = $(".translateHtml:input").length;
	//翻譯每一個文字
	for(var i=0;i<translateCount;i++)
	{
		//需要轉成簡體
		if(status == "S")
		{
			$(".translateHtml:input").eq(i).attr('value',$.t2s($(".translateHtml:input").eq(i).attr('value')));
		}
		//需要轉成繁體
		else if(status == "T")
		{
			$(".translateHtml:input").eq(i).attr('value',$.s2t($(".translateHtml:input").eq(i).attr('value')));
		}
	}
}

//首頁 準備好
$('#Home_Y02_a').ready(function()
{
	try
	{
		//如果已經產生過畫面 則不重複產生
		if($("#waitingProcess_Y02").size() == 0)
		{
			//新增 待處理
			$("#Home_Y02_a").css
			({
				"height":"calc(100% - 56px)",
			    "width":"calc(100% - 34px)",
			    "overflow":"auto"
			});
			$("#Home_Y02_a").append("<div id='waitingProcess_Y02'></div>");
			$("#waitingProcess_Y02").css
			({
			    "height":"100%",
			    "width":"33%",
			    "float":"left"
			});
			$("#waitingProcess_Y02").append
			(
				"<table style='width: calc(100% - 10px);height:600px;background-color: rgb(244,241,232);margin-left: 5px;margin-top: 10px;'>"+
				  	"<tr class='translateTitle' title='重整待處理'><th style='cursor:pointer;font-size: 22px;background-color: rgb(64,185,180);color: white;height: 50px;' class='translateHtml'>待處理</th></tr>"+
				  	"<tr id='waitingProcess_00_Y02' style='height:90px;color:rgb(65,65,65);font-size:18px;font-weight:bold;'><td style='cursor:pointer'><div style='float:left;margin-left:15px;' class='translateHtml'>退回</div><div style='float:right;margin-right:15px;'><span style='color:rgb(252,142,44);background-image:url(image/loading3.gif);background-size:100% 100%;'>　</span> 件</div></td></tr>"+
				  	"<tr class='tr_after_new'></tr>"+
				  	"<tr id='waitingProcess_01_Y02' style='height:90px;color:rgb(65,65,65);font-size:18px;font-weight:bold;'><td style='cursor:pointer'><div style='float:left;margin-left:15px;' class='translateHtml'>待轉發</div><div style='float:right;margin-right:15px;'><span style='color:rgb(252,142,44);background-image:url(image/loading3.gif);background-size:100% 100%;'>　</span> 件</div></td></tr>"+
				  	"<tr class='tr_after_new'></tr>"+
				  	"<tr id='waitingProcess_02_Y02' style='height:90px;color:rgb(65,65,65);font-size:18px;font-weight:bold;'><td style='cursor:pointer'><div style='float:left;margin-left:15px;' class='translateHtml'>待接單</div><div style='float:right;margin-right:15px;'><span style='color:rgb(252,142,44);background-image:url(image/loading3.gif);background-size:100% 100%;'>　</span> 件</div></td></tr>"+
				  	"<tr class='tr_after_new'></tr>"+
				  	"<tr id='waitingProcess_03_Y02' style='height:90px;color:rgb(65,65,65);font-size:18px;font-weight:bold;'><td style='cursor:pointer'><div style='float:left;margin-left:15px;' class='translateHtml'>執行中</div><div style='float:right;margin-right:15px;'><span style='color:rgb(252,142,44);background-image:url(image/loading3.gif);background-size:100% 100%;'>　</span> 件</div></td></tr>"+
				  	"<tr class='tr_after_new'></tr>"+
				  	"<tr id='waitingProcess_04_Y02' style='height:90px;color:rgb(65,65,65);font-size:18px;font-weight:bold;'><td style='cursor:pointer'><div style='float:left;margin-left:15px;' class='translateHtml'>待檢查</div><div style='float:right;margin-right:15px;'><span style='color:rgb(252,142,44);background-image:url(image/loading3.gif);background-size:100% 100%;'>　</span> 件</div></td></tr>"+
				  	"<tr class='tr_after_new'></tr>"+
				  	"<tr id='waitingProcess_05_Y02' style='height:90px;color:rgb(65,65,65);font-size:18px;font-weight:bold;'><td style='cursor:pointer'><div style='float:left;margin-left:15px;' class='translateHtml'>下屬爭議</div><div style='float:right;margin-right:15px;'><span style='color:rgb(252,142,44);background-image:url(image/loading3.gif);background-size:100% 100%;'>　</span> 件</div></td></tr>"+
				  	"<tr class='tr_after_new'></tr>"+
				"</table>"+
				"<div style='width: calc(100% - 10px);height: 20px;margin-left: 5px;background-color: rgb(64,185,180);margin-top: -20px;'></div>"
			);
			//底線顏色變換
			$("#Home_Y02_a table").eq(0).find('td').mousedown(function()
			{
			    $(this).parent().next().css('background-color','rgb(64,185,180)');
			}).mouseenter(function()
			{
			    $(this).parent().next().css('background-color','rgb(64,185,180)');
			}).mouseup(function()
			{
			    $(this).parent().next().css('background-color','rgb(204,205,201)');
			}).mouseout(function()
			{
			    $(this).parent().next().css('background-color','rgb(204,205,201)');
			});
			//bug
			$("#Home_Y02_a table").eq(0).find(".tr_after_new").mouseenter(function()
			{
			    $(this).css('background-color','rgb(64,185,180)');
			}).mouseout(function()
			{
			    $(this).css('background-color','rgb(204,205,201)');
			});
			//重載主題
			$("#waitingProcess_Y02 th").click(function(e)
			{
				(e.which == 1)?getNewTaskPage_Record("waitingProcess"):null;
			});

			//新增 主辦
			$("#Home_Y02_a").append("<div id='mainProcess_Y02'></div>");
			$("#mainProcess_Y02").css
			({
				"height":"100%",
			    "width":"34%",
			    "float":"left"
			});
			$("#mainProcess_Y02").append
			(
				"<table style='width: calc(100% - 10px);height:600px;background-color: rgb(244,241,232);margin-left: 5px;margin-top: 10px;'>"+
				  	"<tr class='translateTitle' title='重整主辦'><th style='cursor:pointer;font-size: 22px;background-color: rgb(248,118,67);color: white;height: 50px;' class='translateHtml'>主辦</th></tr>"+
				  	"<tr id='mainProcess_00_Y02' style='height:90px;color:rgb(65,65,65);font-size:18px;font-weight:bold;'><td style='cursor:pointer'><div style='float:left;margin-left:15px;' class='translateHtml'>進行中</div><div style='float:right;margin-right:15px;'><span style='color:rgb(252,142,44);'>0</span> 件</div></td></tr>"+
				  	"<tr class='tr_after_new'></tr>"+
				  	"<tr id='mainProcess_01_Y02' style='height:90px;color:rgb(65,65,65);font-size:18px;font-weight:bold;'><td style='cursor:pointer'><div style='float:left;margin-left:15px;' class='translateHtml'>成功</div><div style='float:right;margin-right:15px;'><span style='color:rgb(252,142,44);'>0</span> 件</div></td></tr>"+
				  	"<tr class='tr_after_new'></tr>"+
				  	"<tr id='mainProcess_02_Y02' style='height:90px;color:rgb(65,65,65);font-size:18px;font-weight:bold;'><td style='cursor:pointer'><div style='float:left;margin-left:15px;' class='translateHtml'>失敗</div><div style='float:right;margin-right:15px;'><span style='color:rgb(252,142,44);'>0</span> 件</div></td></tr>"+
				  	"<tr class='tr_after_new'></tr>"+
				  	"<tr id='mainProcess_03_Y02' style='height:90px;color:rgb(65,65,65);font-size:18px;font-weight:bold;'><td style='cursor:pointer'><div style='float:left;margin-left:15px;' class='translateHtml'>作廢</div><div style='float:right;margin-right:15px;'><span style='color:rgb(252,142,44);'>0</span> 件</div></td></tr>"+
				  	"<tr class='tr_after_new'></tr>"+
				  	"<tr style='visibility:hidden;height:90px;'><td style='cursor:pointer'><div style='float:left;color:rgb(65,65,65);font-size:18px;font-weight:bold;'>作廢</div><div style='float:right;margin-right:15px;'><span style='color:rgb(252,142,44);'>0 </span>件</div></td></tr>"+
				  	"<tr style='visibility:hidden;height:90px;'><td style='cursor:pointer'><div style='float:left;color:rgb(65,65,65);font-size:18px;font-weight:bold;'>作廢</div><div style='float:right;margin-right:15px;'><span style='color:rgb(252,142,44);'>0 </span>件</div></td></tr>"+
				"</table>"+
				"<div style='width: calc(100% - 10px);height: 20px;margin-left: 5px;background-color: rgb(248,118,67);margin-top: -201px;'></div>"+
				"<div style='width: calc(100% - 10px);height: 198px;margin-left: 5px;background-color: white;'></div>"
			);
			//底線顏色變換
			$("#Home_Y02_a table").eq(1).find('td').mousedown(function()
			{
			    $(this).parent().next().css('background-color','rgb(248,118,67)');
			}).mouseenter(function()
			{
			    $(this).parent().next().css('background-color','rgb(248,118,67)');
			}).mouseup(function()
			{
			    $(this).parent().next().css('background-color','rgb(204,205,201)');
			}).mouseout(function()
			{
			    $(this).parent().next().css('background-color','rgb(204,205,201)');
			});
			//bug
			$("#Home_Y02_a table").eq(1).find(".tr_after_new").mouseenter(function()
			{
			    $(this).css('background-color','rgb(248,118,67)');
			}).mouseout(function()
			{
			    $(this).css('background-color','rgb(204,205,201)');
			});
			//重載主題
			$("#waitingProcess_Y02 th").click(function(e)
			{
				(e.which == 1)?getNewTaskPage_Record("waitingProcess"):null;
			});
			//重載主題
			$("#mainProcess_Y02 th").click(function(e)
			{
				(e.which == 1)?getNewTaskPage_Record("mainProcess"):null;
			});

			//新增 已處理
			$("#Home_Y02_a").append("<div id='alreadyProcess_Y02'></div>");
			$("#alreadyProcess_Y02").css
			({
				"height":"100%",
			    "width":"33%",
			    "float":"left"
			});
			$("#alreadyProcess_Y02").append
			(
				"<table style='width: calc(100% - 10px);height:600px;background-color: rgb(244,241,232);margin-left: 5px;margin-top: 10px;'>"+
				  	"<tr class='translateTitle' title='重整已處理'><th style='cursor:pointer;font-size: 22px;background-color: rgb(102,102,102);color: white;height: 50px;' class='translateHtml'>已處理</th></tr>"+
				  	"<tr id='alreadyProcess_00_Y02' style='height:90px;color:rgb(65,65,65);font-size:18px;font-weight:bold;'><td style='cursor:pointer'><div style='float:left;margin-left:15px;' class='translateHtml'>待結案</div><div style='float:right;margin-right:15px;'><span style='color:rgb(252,142,44);'>0</span> 件</div></td></tr>"+
				  	"<tr class='tr_after_new'></tr>"+
				  	"<tr id='alreadyProcess_01_Y02' style='height:90px;color:rgb(65,65,65);font-size:18px;font-weight:bold;'><td style='cursor:pointer'><div style='float:left;margin-left:15px;' class='translateHtml'>成功</div><div style='float:right;margin-right:15px;'><span style='color:rgb(252,142,44);'>0</span> 件</div></td></tr>"+
				  	"<tr class='tr_after_new'></tr>"+
				  	"<tr id='alreadyProcess_02_Y02' style='height:90px;color:rgb(65,65,65);font-size:18px;font-weight:bold;'><td style='cursor:pointer'><div style='float:left;margin-left:15px;' class='translateHtml'>失敗</div><div style='float:right;margin-right:15px;'><span style='color:rgb(252,142,44);'>0</span> 件</div></td></tr>"+
				  	"<tr class='tr_after_new'></tr>"+
				  	"<tr id='alreadyProcess_03_Y02' style='height:90px;color:rgb(65,65,65);font-size:18px;font-weight:bold;'><td style='cursor:pointer'><div style='float:left;margin-left:15px;' class='translateHtml'>作廢</div><div style='float:right;margin-right:15px;'><span style='color:rgb(252,142,44);'>0</span> 件</div></td></tr>"+
				  	"<tr class='tr_after_new'></tr>"+
				  	"<tr id='alreadyProcess_04_Y02' style='height:90px;color:rgb(65,65,65);font-size:18px;font-weight:bold;'><td style='cursor:pointer'><div style='float:left;margin-left:15px;' class='translateHtml'>轉發</div><div style='float:right;margin-right:15px;'><span style='color:rgb(252,142,44);'>0</span> 件</div></td></tr>"+
				  	"<tr class='tr_after_new'></tr>"+
				  	"<tr id='alreadyProcess_05_Y02' style='height:90px;color:rgb(65,65,65);font-size:18px;font-weight:bold;'><td style='cursor:pointer'><div style='float:left;margin-left:15px;' class='translateHtml'>已檢查</div><div style='float:right;margin-right:15px;'><span style='color:rgb(252,142,44);'>0</span> 件</div></td></tr>"+
					"<tr class='tr_after_new'></tr>"+
				"</table>"+
				"<div style='width: calc(100% - 10px);height: 20px;margin-left: 5px;background-color: rgb(102,102,102);margin-top: -20px;'></div>"
			);
			//底線顏色變換
			$("#Home_Y02_a table").eq(2).find('td').mousedown(function()
			{
			    $(this).parent().next().css('background-color','rgb(102,102,102)');
			}).mouseenter(function()
			{
			    $(this).parent().next().css('background-color','rgb(102,102,102)');
			}).mouseup(function()
			{
			    $(this).parent().next().css('background-color','rgb(204,205,201)');
			}).mouseout(function()
			{
			    $(this).parent().next().css('background-color','rgb(204,205,201)');
			});
			//bug
			$("#Home_Y02_a table").eq(2).find(".tr_after_new").mouseenter(function()
			{
			    $(this).css('background-color','rgb(102,102,102)');
			}).mouseout(function()
			{
			    $(this).css('background-color','rgb(204,205,201)');
			});
			//重載主題
			$("#alreadyProcess_Y02 th").click(function(e)
			{
				(e.which == 1)?getNewTaskPage_Record("alreadyProcess"):null;
			});
			//清單點擊監聽
			addListViewPage_Eventlistner();
		}
		//點擊代表需要重整清單
		$("#HomeTab").click(function(e)
		{
			//重整清單
			(e.which == 1)?getNewTaskPage_Record("all"):null;
		});
		$("#HomeTab a").click(function(e)
		{
			//重整清單
			(e.which == 1)?getNewTaskPage_Record("all"):null;
		});
		$("#HomeTab div").click(function(e)
		{
			//重整清單
			(e.which == 1)?getNewTaskPage_Record("all"):null;
		});
		//Title
		$("#HomeTab").attr('title','首頁重整');
		$("#HomeTab").addClass('translateTitle');
		$("#HomeTab a").css("height","calc(100% - 10px)");
		//選擇時間外層div
		$("#Home_Y02_a").prepend('<div id="dateSelect"></div>');
		//選擇年份
		$("#dateSelect").append("<div id='Home_Y02_yearSearch_Group'></div>");
		var Home_Y02_yearSearch = Window_Define.Initialize();
		Home_Y02_yearSearch.addCombobox('Home_Y02_yearSearch','選擇年份 :');
		$("#Home_Y02_yearSearch").css({"margin-top":"4px","width":"100px","margin-top":"2px","font-size":"15px"});
		$("#Home_Y02_yearSearch_Label").width(100);
		$("#Home_Y02_yearSearch_Group").css({"margin-top":"8px","margin-left":"7px","display":"inline-block"});
		$("#Home_Y02_yearSearch").change(function()
		{
			getNewTaskPage_Record("all");
		});
		//選擇月份
		$("#dateSelect").append("<div id='Home_Y02_monthSearch_Group'></div>");
		var Home_Y02_monthSearch = Window_Define.Initialize();
		Home_Y02_monthSearch.addCombobox('Home_Y02_monthSearch','選擇月份 :');
		$("#Home_Y02_monthSearch").css({"margin-top":"4px","width":"100px","margin-top":"2px","font-size":"15px"});
		$("#Home_Y02_monthSearch_Label").width(100);
		$("#Home_Y02_monthSearch_Group").css({"margin-top":"-21px","margin-left":"7px","display":"inline-block"});
		$("#Home_Y02_a").css("padding","0em 1.4em 1em 1.4em");
		$("#Home_Y02_monthSearch").change(function()
		{
			getNewTaskPage_Record("all");
		});
		//建立 2014 年開始到現在的年份
		var start = 2014;
		var now = new Date().getFullYear();
		var options = "";
		for(var year = start ; year <= now; year++)
		{
			options = options + "<option value=" + year + ">"+ year +"</option>";
		}
		$("#Home_Y02_yearSearch").html(options);
		$("#Home_Y02_yearSearch").val(now);
		//建立月份 + 整年選項
		var start = 1;
		var now = 12;
		var options = "<option value=0 class='translateHtml'>顯示整年</option>";
		for(var month = start ; month <= now; month++)
		{
			options = options + "<option value=" + month + ">"+ month +"月</option>";
		}
		$("#Home_Y02_monthSearch").html(options);
		$("#Home_Y02_monthSearch").val(0);
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
});

//儲存工單變數物件
var taskObject = {};
//公用新增畫面
function createNewTaskPage(id,url,title)
{
	try
	{
		//新增一個 tab 如果有需要顯示才執行
		addTab(id,title);
		//工單狀態
		var myTaskStatus="";
		//建立daily grid
		taskObject[id] = Grid_Panel_Define.Initialize();
		taskObject[id].setId(id);
		taskObject[id].setResizer_ID(id+ '_Page_Y01');
		taskObject[id].setHeader_Title(['No.','ID',"工單編號","工單名稱","發單者","檢查者","接單者","開始時間","結束時間","工單狀態",'TaskAssignedListID']);
		taskObject[id].setModel(['Number','TaskAssignedID','TaskAssignedNumber','TaskAssignedTitle','OwnerName','MainCheckEmployeeName','MainResponsibleEmployeeName','TaskAssignedStartTime','TaskAssignedEndTime','TaskAssignedStatus','TaskAssignedListID']);
		taskObject[id].setPagesize(10);
		taskObject[id].setfieldShow([true,false,true,true,false,true,true,true,true,true,false]);
		taskObject[id].setHeader_Width(['5%','0%','10%','15%','0%','10%','10%','15%','15%','19%','0%']); // 99.5%
		taskObject[id].createPagging();
		taskObject[id].addPagging_Button(id + '_newTaskButton',language["newTask"][languageStatus]);
		taskObject[id].createHeader();
		taskObject[id].createTable();
		//新增工單按鈕
		$('#' + id + '_newTaskButton').css('height','23px');
		$('#' + id + '_newTaskButton').click(function()
		{
			addTaskFunction();
		});
		//改寫欄位
		taskObject[id].setLoad_Callback(function()
		{
			for(var i = 0; i < $('#' + id + '_Table').children().length; i++)
			{
				//編號
				$('#' + id + '_Table_Inner_' + i).children().eq(0).html(i+1+taskObject[id].getStart());
				//時間欄位顯示設定
				$('#' + id + '_Table_Inner_' + i).children().eq(7).html(getDate($('#' + id + '_Table_Inner_' + i).children().eq(7).html()) + ' ' + getTime($('#' + id + '_Table_Inner_' + i).children().eq(7).html()));
				$('#' + id + '_Table_Inner_' + i).children().eq(8).html(getDate($('#' + id + '_Table_Inner_' + i).children().eq(8).html()) + ' ' + getTime($('#' + id + '_Table_Inner_' + i).children().eq(8).html()));
				//設定雙點擊事件
				$('#' + id + '_Table_Inner_' + i).dblclick(function()
				{
					//參數
					var params = {};
					params.statusHtml = $('#'+this.id).children().eq(9).html();
					params.MyTaskID = $('#'+this.id).children().eq(1).html();
					params.MyTaskName = $('#'+this.id).children().eq(3).html();
					params.TaskAssignedListID = $('#'+this.id).children().eq(10).html();
					//依照原始呼叫判定是否出現簽核按鈕
					var singOffButton = false;
					//依照原始呼叫設定畫面參數
					var singOffWindow_Params = {};
					//待處理 - 待轉發
					if(id == "waitingProcess_01")
					{
						singOffButton = true;
						singOffWindow_Params.buttonName = "簽核";
						singOffWindow_Params.windowTitle = "簽核表";
						singOffWindow_Params.selectOption = 
							'<option disabled="" hidden="" selected=""></option>'+
							'<option class="translateHtml" value="Accept">同意</option>'+
							'<option class="translateHtml" value="Reject">不同意</option>';
					}
					//待處理 - 待接單
					else if(id == "waitingProcess_02")
					{
						singOffButton = true;
						singOffWindow_Params.buttonName = "接單確認";
						singOffWindow_Params.windowTitle = "接單確認表";
						singOffWindow_Params.selectOption = 
							'<option disabled="" hidden="" selected=""></option>'+
							'<option class="translateHtml" value="Accept">同意</option>'+
							'<option class="translateHtml" value="Reject">不同意</option>';
					}
					//待處理 - 執行中
					else if(id == "waitingProcess_03")
					{
						singOffButton = true;
						singOffWindow_Params.buttonName = "完成確認";
						singOffWindow_Params.windowTitle = "完成確認表";
						singOffWindow_Params.selectOption = 
							'<option disabled="" hidden="" selected=""></option>'+
							'<option class="translateHtml" value="Finished">已完成</option>';
					}
					//待處理 - 待檢查
					else if(id == "waitingProcess_04" || id == "waitingProcess_05" )
					{
						singOffButton = true;
						singOffWindow_Params.buttonName = "檢查確認";
						singOffWindow_Params.windowTitle = "檢查確認表";
						//主要檢查人&最終審查人
						singOffWindow_Params.selectOption = 
							'<option disabled="" hidden="" selected=""></option>'+
							'<option class="translateHtml" value="Pass">通過</option>'+
							'<option class="translateHtml" value="Fail">不通過</option>'+
							'<option class="translateHtml" value="Backtrack">退回</option>';
						//開單檢察人
						singOffWindow_Params.selectOption2 = 
							'<option disabled="" hidden="" selected=""></option>'+
							'<option class="translateHtml" value="Pass">通過</option>'+
							'<option class="translateHtml" value="Fail">不通過</option>'+
							'<option class="translateHtml" value="Invalid">廢單</option>'+
							'<option class="translateHtml" value="Backtrack">退回</option>'+
							'<option class="translateHtml" value="AddTime">加時</option>';
					}
					//待處理 - 退回 (逾時:等待開單者審查是否同意加時)
					else if(id == "waitingProcess_00" && params.statusHtml == "逾時:等待開單者審查是否同意加時或工單失敗")
					{
						singOffButton = true;
						singOffWindow_Params.buttonName = "檢查確認";
						singOffWindow_Params.windowTitle = "檢查確認表";
						singOffWindow_Params.selectOption = 
							'<option disabled="" hidden="" selected=""></option>'+
							'<option class="translateHtml" value="AddTime">加時</option>'+
							'<option class="translateHtml" value="Fail">扣分</option>'+
							'<option class="translateHtml" value="Invalid">廢單</option>';
						//開單檢察人
						singOffWindow_Params.selectOption2 = 
							'<option disabled="" hidden="" selected=""></option>'+
							'<option class="translateHtml" value="Pass">通過</option>'+
							'<option class="translateHtml" value="Fail">不通過</option>'+
							'<option class="translateHtml" value="Invalid">廢單</option>'+
							'<option class="translateHtml" value="Backtrack">退回</option>'+
							'<option class="translateHtml" value="AddTime">加時</option>';
					}
					//待處理 - 退回
					else if(id == "waitingProcess_00")
					{
						singOffButton = true;
						singOffWindow_Params.buttonName = "檢查確認";
						singOffWindow_Params.windowTitle = "檢查確認表";
						singOffWindow_Params.selectOption = 
							'<option disabled="" hidden="" selected=""></option>'+
							'<option class="translateHtml" value="AddTime">加時</option>'+
							'<option class="translateHtml" value="Invalid">廢單</option>';
					}
					//獨立判斷 如果工單狀態為(params.statusHtml == "逾時:等待開單者審查是否同意加時")且為"待處理-退回"
					if(params.statusHtml == "逾時:等待開單者審查是否同意加時" && id != "waitingProcess_00")
					{
						singOffButton = false;
					}
					//判斷不應該重複產生畫面
					if($('#' + $(this).attr('id') + '_Y02_content').size())
					{
						$('#' + $(this).attr('id') + '_Y02_content').empty();
						createNewTaskContentPage(singOffWindow_Params,id,$(this).attr('id'),params,singOffButton);
					}
					else
					{
						createNewTaskContentPage(singOffWindow_Params,id,$(this).attr('id'),params,singOffButton);
					}
				});
			};
			//延遲執行 回復重整之前的排序圖示
			setTimeout(function()
			{
				resetSort_Status(taskObject[id].getId());
			}, 1);
		});
		//設定網址取用方法
		taskObject[id].getUrl = function getUrl()
		{
			try
			{
				//組合參數
				var Start = taskObject[id].getStart();
				var Limit = taskObject[id].getPagesize();
				var dc = (+new Date());
				return localStorage.task + url + "&start=" + Start + "&limit=" + Limit + "&_dc=" + dc + "&year=" + $("#Home_Y02_yearSearch").val() + "&month=" + $("#Home_Y02_monthSearch").val();
			}
			catch(err)
			{
				if(App_Debug)
				{
					console.log(err);
				}
			}
		}
		//紀錄特殊 url
		$("#" + id).attr('myurl',url);
		//紀錄特殊排序 並啟用預設排序包含已結案內容(成功 失敗 作廢) 以結束時間排序 由近至遠
		if(id == "mainProcess_01" || id == "mainProcess_02" || id == "mainProcess_03")
		{
			//更改顯示 CSS
			$("#" + id + "_Header div[name='TaskAssignedEndTime']")
			.next()
			.addClass('Mainpage_Header_Desc')
			.removeClass('Mainpage_Header_All')
			.removeClass('Mainpage_Header_Asc');

			//更改紀錄中的排序資料
			$("#" + id).attr("sort","Desc");
			$("#" + id).attr("ordertitle","TaskAssignedEndTime");
		}
		//剩餘的工單都預設使用 開始日期 由近至遠
		else
		{
			//更改顯示 CSS
			$("#" + id + "_Header div[name='TaskAssignedStartTime']")
			.next()
			.addClass('Mainpage_Header_Desc')
			.removeClass('Mainpage_Header_All')
			.removeClass('Mainpage_Header_Asc');

			//更改紀錄中的排序資料
			$("#" + id).attr("sort","Desc");
			$("#" + id).attr("ordertitle","TaskAssignedStartTime");
		}
		//載入資料
		taskObject[id].load();
		//語言包
		Home_Y02_changeLanguage(languageStatus);
		//新增排序
		sortTask(id);
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}

//新增工單頁面
function addTaskFunction()
{
	try
	{
		//定義介面
		var newTask_Window = Window_Define.Initialize();
		newTask_Window.setMask(true);
		newTask_Window.setWidth(480);
		newTask_Window.setHeight(515);
		newTask_Window.setId('newTask_Window');
		newTask_Window.setTitle(language["newTask"][languageStatus]);
		newTask_Window.show();
		//工單名稱
		newTask_Window.addTextfield('newTaskTitle',"工單名稱 :");
		$("#newTaskTitle").width("calc(100% - 135px)");
		$("#newTaskTitle_Label").width(130);
		$("#newTaskTitle_Label").css
		({
			"text-align":"right",
			"margin-right":"3px"
		});
		//接單者
		newTask_Window.addComboboxPagging('newTaskAssignedMainResponsible','接單者 :',
		{
			'Url':localStorage.human+'/Employee' + '?_dc=' + new Date().getTime(),
		    'rootProperty':'data',
		    'displayField':'EmployeeName',
		    'valueField':'EmployeeID',
		    'pageSize':'5',
		    'searchUrl':localStorage.human+'/Employee' + '?_dc=' + new Date().getTime(),
		    'searchPlaceholder':'搜尋員工',
		    'searchKey':'searchKey' 
		});
		$("#newTaskAssignedMainResponsible_Combobox_Pagging").css('left','135px');
		$("#newTaskAssignedMainResponsible").width("calc(100% - 135px)");
		$("#newTaskAssignedMainResponsible_Label").width(130);
		$("#newTaskAssignedMainResponsible_Label").css
		({
			"text-align":"right",
			"margin-right":"3px"
		});
		//檢查者
		newTask_Window.addComboboxPagging('newTaskAssignedMainCheck','檢查者 :',
		{
			'Url':localStorage.human+'/Employee' + '?_dc=' + new Date().getTime(),
		    'rootProperty':'data',
		    'displayField':'EmployeeName',
		    'valueField':'EmployeeID',
		    'pageSize':'5',
		    'searchUrl':localStorage.human+'/Employee' + '?_dc=' + new Date().getTime(),
		    'searchPlaceholder':'搜尋員工',
		    'searchKey':'searchKey'
		});
		$("#newTaskAssignedMainCheck_Combobox_Pagging").css('left','135px');
		$("#newTaskAssignedMainCheck").width("calc(100% - 135px)");
		$("#newTaskAssignedMainCheck_Label").width(130);
		$("#newTaskAssignedMainCheck_Label").css
		({
			"text-align":"right",
			"margin-right":"3px"
		});
		//開始時間
		newTask_Window.addDatetimeField('newTaskAssignedStartTime','開始時間 :');
		$("#newTaskAssignedStartTime").width("calc(100% - 135px)");
		$("#newTaskAssignedStartTime_Label").width(130);
		$("#newTaskAssignedStartTime_Label").css
		({
			"text-align":"right",
			"margin-right":"3px"
		});
		//結束時間
		newTask_Window.addDatetimeField('newTaskAssignedEndTime','結束時間 :');
		$("#newTaskAssignedEndTime").width("calc(100% - 135px)");
		$("#newTaskAssignedEndTime_Label").width(130);
		$("#newTaskAssignedEndTime_Label").css
		({
			"text-align":"right",
			"margin-right":"3px"
		});
		//可開單積分
		newTask_Window.addTextfield('newTaskPoint',"可開單積分 :");
		$("#newTaskPoint").width("calc(100% - 135px)");
		$('#newTaskPoint').attr('type','Number');
		$('#newTaskPoint').attr('min',0);
		$('#newTaskPoint').attr('readonly','');
		$("#newTaskPoint_Label").css
		({
			"text-align":"right",
			"margin-right":"3px"
		});
		$('#newTaskPoint_Label').css
		({
			"width":"100%",
			"margin-bottom":"10px",
			"width":"130px"
		});
		$("#newTaskPoint_Group").hide();
		//撈取可開單積分
		// jqueryAjax_Get(localStorage.task+'/Reward/me',function(response)
		// {
		// 	//最高可開單積分
		// 	$('#newTaskAssignedSuccessReward').attr('max',(response.data.openPoint >= 5)?5:response.data.openPoint);
		// 	//可開單積分
		// 	$("#newTaskPoint").val(response.data.openPoint);
		// },null,null);
		//獎勵積分
		newTask_Window.addTextfield('newTaskAssignedSuccessReward','獎勵積分 :');
		$("#newTaskAssignedSuccessReward_Label").css
		({
			"text-align":"right",
			"margin-right":"3px"
		});
		$("#newTaskAssignedSuccessReward").width("calc(100% - 135px)");
		$("#newTaskAssignedSuccessReward_Label").width(130);
		$('#newTaskAssignedSuccessReward').attr('type','Number');
		$('#newTaskAssignedSuccessReward').attr('min',0);
		$('#newTaskAssignedSuccessReward').attr('max',5);
		$('#newTaskAssignedSuccessReward').attr('placeholder','請輸入0~5分');
		// $('#newTaskAssignedSuccessReward').blur(function()
		// {
		// 	var thisValue = $(this).val();
		// 	$(this).val(thisValue >= 5?($("#newTaskPoint").val() >= 5?"5":$("#newTaskPoint").val()):thisValue);
		// });
		//懲罰積分
		newTask_Window.addTextfield('newTaskAssignedFailPunish','懲罰積分 :');
		$("#newTaskAssignedFailPunish_Label").css
		({
			"text-align":"right",
			"margin-right":"3px"
		});
		$("#newTaskAssignedFailPunish").width("calc(100% - 135px)");
		$("#newTaskAssignedFailPunish_Label").width(130);
		$('#newTaskAssignedFailPunish').attr('type','Number');
		$('#newTaskAssignedFailPunish').attr('min',0);
		$('#newTaskAssignedFailPunish').attr('max',5);
		$('#newTaskAssignedFailPunish').attr('placeholder','請輸入0~5分');
		$('#newTaskAssignedFailPunish').blur(function()
		{
			var thisValue = $(this).val();
			$(this).val(thisValue >= 5?"5":thisValue);
		});
		//共同主管同意
		newTask_Window.addTextfield('newTaskCommonManagerAgreeLabel','共同主管同意 :  <input class="Window_Textfield" id="newTaskCommonManagerAgree" type="checkbox" style="zoom:1.5;position:absolute;margin-top:2.8px;">');
		$('#newTaskCommonManagerAgreeLabel').hide();
		$('#newTaskCommonManagerAgreeLabel_Label').css
		({
			"width":"100%",
			"margin-bottom":"15px",
			"margin-left":"6px"
		});
		//建立 Textfield Focus
		$('#newTaskCommonManagerAgree').focus(function()
		{
			$('#' + this.id).parent().css("color","rgb(69,200,200)");
		});
		//建立 Textfield Blur
		$('#newTaskCommonManagerAgree').blur(function()
		{
			$('#' + this.id).parent().css("color","rgb(60,60,60)");
		});
		//工單內容
		newTask_Window.addTextarea('newTaskAssignedContent','工單內容 :');
		$("#newTaskAssignedContent").width("calc(100% - 137px)");
		$("#newTaskAssignedContent_Label").width(130);
		$("#newTaskAssignedContent_Label").css
		({
			"text-align":"right",
			"margin-right":"3px"
		});
		newTask_Window.addYesNO_Button(language["system_cancel"][languageStatus],language["system_send"][languageStatus],
		//NO Dunction()
		function()
		{
			newTask_Window.close();
		},
		//Yes Function
		function()
		{
			//若缺少欄位則不發出request
			try
			{
				//檢查輸入
				if($('#newTaskTitle').val() == "")
				{
					$('#newTaskTitle').focus();
					return;
				}
				else if(newTask_Window.newTaskAssignedMainResponsible.getComboboxPagging_Value() == "")
				{
					$("#newTaskAssignedMainResponsible").focus();
					return;
				}
				else if(newTask_Window.newTaskAssignedMainCheck.getComboboxPagging_Value() == "")
				{
					$("#newTaskAssignedMainCheck").focus();
					return;
				}
				else if($("#newTaskAssignedStartTime").val() == "")
				{
					$("#newTaskAssignedStartTime").focus();
					return;
				}
				else if($('#newTaskAssignedEndTime').val() == "")
				{
					$('#newTaskAssignedEndTime').focus();
					return;
				}
				else if($('#newTaskAssignedSuccessReward').val() == "")
				{
					$('#newTaskAssignedSuccessReward').focus();
					return;
				}
				else if($('#newTaskAssignedFailPunish').val() == "")
				{
					$('#newTaskAssignedFailPunish').focus();
					return;
				}
				else if($('#newTaskAssignedContent').val() == "")
				{
					$('#newTaskAssignedContent').focus();
					return;
				}
				//修改時差 改成＋0時區
				$.dateFormat = function(dateObject)
				{
				    var d = new Date(dateObject);
					return d.toISOString();
				};
				//送出資料
				var data = 
				{
					"TaskAssignedContent": $('#newTaskAssignedContent').val(),
					"TaskAssignedEndTime": $.dateFormat($('#newTaskAssignedEndTime').val()),
					"TaskAssignedFailPunish": $('#newTaskAssignedFailPunish').val(),
					"TaskAssignedMainCheck": newTask_Window.newTaskAssignedMainCheck.getComboboxPagging_Value(),
					"TaskAssignedMainResponsible": newTask_Window.newTaskAssignedMainResponsible.getComboboxPagging_Value(),
					"TaskAssignedStartTime": $.dateFormat($('#newTaskAssignedStartTime').val()),
					"TaskAssignedSuccessReward": $('#newTaskAssignedSuccessReward').val(),
					"TaskAssignedTitle": $('#newTaskTitle').val(),
					"commonManagerAgree": $("#newTaskCommonManagerAgree").is(":checked")
				};
				//Loading Mask
				loadingMask = Loading_Mask.Initialize();
				loadingMask.setTarget('newTask_Window');
				loadingMask.show();
				//Post ajax
				jqueryAjax_Post(localStorage.task+'/Task/me/General',JSON.stringify(data),function(response)
				{
					loadingMask.close();
					var taskSuccess_Msg = YesNo_Msg_Define.Initialize();
					taskSuccess_Msg.setMask(false);
					taskSuccess_Msg.setSmartdetect(false);
					taskSuccess_Msg.setWidth(300);
					taskSuccess_Msg.setHeight(168);
					taskSuccess_Msg.setId('taskSuccess_Msg');
					taskSuccess_Msg.setTitle(language["system_msg"][languageStatus]);
					taskSuccess_Msg.show();
					taskSuccess_Msg.addMsgContent(response.message);
					taskSuccess_Msg.addYesNO_Button('',language["system_ok"][languageStatus],null,
					function()
					{
						//關閉 Msg
						newTask_Window.close();
					    taskSuccess_Msg.close();
					    //判斷要重整哪一個頁面 首頁
					    if($("#tabs .ui-state-active").attr('id') == "HomeTab")
					    {
					    	//重整首頁
					    	getNewTaskPage_Record("all");
					    }
					    else
					    {
					    	//如果是需要重整的頁面則重整
					    	(taskObject[$("#tabs .ui-state-active").attr('id').replace('_li','')] == undefined)?null:taskObject[$("#tabs .ui-state-active").attr('id').replace('_li','')].load();
					    }
					});
					//隱藏 No 按鈕
					$('#taskSuccess_Msg_No').css("display","none");
					//置中 Yes 按鈕
					$('#taskSuccess_Msg_Yes').css({"margin-left":"0px","width":"100%"});
				},
				function(error)
				{
					loadingMask.close();
					normalError_Msg_Withmask(error.message);
					$("#YesNo_Msg").width(300);
					$("#YesNo_Msg").height(168);
					$("#YesNo_Msg_Title").html(language["system_error"][languageStatus]);
					$("#YesNo_Msg_Yes").html(language["system_ok"][languageStatus]);
					//Debug
					$('#YesNo_Msg').css('z-index',100);
					$('#YesNo_Msg_Mask').css('z-index',99);
				},null);
			}
			catch(err)
			{
				loadingMask.close();
				normalError_Msg_Withmask(language["system_lose"][languageStatus]);
				$("#YesNo_Msg").width(300);
				$("#YesNo_Msg").height(168);
				$("#YesNo_Msg_Title").html(language["system_error"][languageStatus]);
				$("#YesNo_Msg_Yes").html(language["system_ok"][languageStatus]);
				//Debug
				$('#YesNo_Msg').css('z-index',100);
				$('#YesNo_Msg_Mask').css('z-index',99);
			}
		});
		$("#newTask_Window .Window_Cancel").css("margin-left","20px");
		$("#newTask_Window .Window_Yes").css("margin-left","55px");
		//修改語言
		Home_Y02_changeLanguage(languageStatus);
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
};

//工單內容頁面
function createNewTaskContentPage(singOffWindow_Params,viewId,id,params,singOffButton)
{
	try
	{
		//新增一個 tab
		addTab(id + '_Y02_content',params.MyTaskName + " - 工單明細");
		//先清空避免重複
		$("#" + id + '_Y02_content').empty();
		//取得daily Content
		var dc = (+new Date());
		jqueryAjax_Get(localStorage.task+"/Task/me/General/"+params.MyTaskID+"?_dc="+dc,
		//成功後
		function(result)
		{
			//主頁面
			$('#' + id + '_Y02_content').append('<div id="' + id + '_Y02_content_main"></div>');
			$('#' + id + '_Y02_content_main').css
			({
				"background-color":"#cecece",
				"height":"calc(100% - 35px)",
				"width":"100%",
				"position":"absolute"
			});
			//主白色框架內容
			$('#' + id + '_Y02_content_main').append('<div id="' + id + '_Y02_content_whitePanel"></div>');
			$('#' + id + '_Y02_content_whitePanel').css
			({
				"background-color":"rgb(255, 255, 255)",
				"border-radius":"30pt",
				"height":"calc(100% - 60px)",
				"width":"calc(100% - 400px)",
				"overflow":"auto",
				"margin-left":"30px",
				"margin-top":"30px",
				"position":"absolute"
			});
			//TaskAssignedNumber
			var TaskAssignedNumber=result.data.TaskAssignedNumber;
			$('#' + id + '_Y02_content_whitePanel').append("<div class='translateHtml' id='" + id + "_Y02_content_Number'>"+language["TaskAssignedNumber"][languageStatus]+"："+TaskAssignedNumber+"</div>");
			$('#' + id + '_Y02_content_Number').css
			({
				"font-size":"12pt",
				"margin-top":"30px",
				"margin-left":(($("#" + id + "_Y02_content_whitePanel").width() - 400) / 2 + 10) + "px",
				"width":"400px"
			});
			//TitleText
			var TitleText=result.data.TaskAssignedTitle;
			$('#' + id + '_Y02_content_whitePanel').append("<div class='translateHtml' id='" + id + "_Y02_content_titleText'>"+language["TaskAssignedTitle"][languageStatus]+"："+TitleText+"</div>");
			$('#' + id + '_Y02_content_titleText').css
			({
				"font-size":"12pt",
				"margin-top":"15px",
				"margin-left":(($("#" + id + "_Y02_content_whitePanel").width() - 400) / 2 + 10) + "px",
				"width":"400px"
			});
			//createDateText
			var createDateText=getDate(result.data.TaskAssignedCreateTime)+" "+getTime(result.data.TaskAssignedCreateTime);
			$('#' + id + '_Y02_content_whitePanel').append("<div class='translateHtml' id='" + id + "_Y02_content_createDateText'>"+language["TaskAssignedCreateTime"][languageStatus]+"："+createDateText+"</div>");
			$('#' + id + '_Y02_content_createDateText').css
			({
				"font-size":"12pt",
				"margin-top":"15px",
				"margin-left":(($("#" + id + "_Y02_content_whitePanel").width() - 400) / 2 + 10) + "px",
				"width":"400px"
			});
			//startDateText
			var startDateText=getDate(result.data.TaskAssignedStartTime)+" "+getTime(result.data.TaskAssignedStartTime);
			$('#' + id + '_Y02_content_whitePanel').append("<div class='translateHtml' id='" + id + "_Y02_content_startDateText'>"+language["TaskAssignedStartTime"][languageStatus]+"："+startDateText+"</div>");
			$('#' + id + '_Y02_content_startDateText').css
			({
				"font-size":"12pt",
				"margin-top":"15px",
				"margin-left":(($("#" + id + "_Y02_content_whitePanel").width() - 400) / 2 + 10) + "px",
				"width":"400px"
			});
			//endDateText
			var endDateText=getDate(result.data.TaskAssignedEndTime)+" "+getTime(result.data.TaskAssignedEndTime);
			$('#' + id + '_Y02_content_whitePanel').append("<div class='translateHtml' id='" + id + "_Y02_content_endDateText'>"+language["TaskAssignedEndTime"][languageStatus]+"："+endDateText+"</div>");
			$('#' + id + '_Y02_content_endDateText').css
			({
				"font-size":"12pt",
				"margin-top":"15px",
				"margin-left":(($("#" + id + "_Y02_content_whitePanel").width() - 400) / 2 + 10) + "px",
				"width":"400px"
			});
			//OwnerNameText
			var ownerNameText=result.data.OwnerName;
			$('#' + id + '_Y02_content_whitePanel').append("<div class='translateHtml' id='" + id + "_Y02_content_OwnerNameText'>"+language["OwnerName"][languageStatus]+"："+ownerNameText+"</div>");
			$('#' + id + '_Y02_content_OwnerNameText').css
			({
				"font-size":"12pt",
				"margin-top":"15px",
				"margin-left":(($("#" + id + "_Y02_content_whitePanel").width() - 400) / 2 + 10) + "px",
				"width":"400px"
			});
			//MainCheckEmployeeNameText
			var mainCheckEmployeeNameText=result.data.MainCheckEmployeeName;
			$('#' + id + '_Y02_content_whitePanel').append("<div class='translateHtml' id='" + id + "_Y02_content_MainCheckEmployeeNameText'>"+language["MainCheckEmployeeName"][languageStatus]+"："+mainCheckEmployeeNameText+"</div>");
			$('#' + id + '_Y02_content_MainCheckEmployeeNameText').css
			({
				"font-size":"12pt",
				"margin-top":"15px",
				"margin-left":(($("#" + id + "_Y02_content_whitePanel").width() - 400) / 2 + 10) + "px",
				"width":"400px"
			});
			//MainResponsibleEmployeeNameText
			var mainResponsibleEmployeeNameText=result.data.MainResponsibleEmployeeName;
			$('#' + id + '_Y02_content_whitePanel').append("<div class='translateHtml' id='" + id + "_Y02_content_MainResponsibleEmployeeNameText'>"+language["MainResponsibleEmployeeName"][languageStatus]+"："+mainResponsibleEmployeeNameText+"</div>");
			$('#' + id + '_Y02_content_MainResponsibleEmployeeNameText').css
			({
				"font-size":"12pt",
				"margin-top":"15px",
				"margin-left":(($("#" + id + "_Y02_content_whitePanel").width() - 400) / 2 + 10) + "px",
				"width":"400px"
			});
			//successPoint
			var TaskAssignedSuccessRewardText=(typeof(result.data.TaskAssignedSuccessReward) == "undefined")?0:result.data.TaskAssignedSuccessReward;
			$('#' + id + '_Y02_content_whitePanel').append("<div class='translateHtml' id='" + id + "_Y02_content_TaskAssignedSuccessRewardText'>"+language["task_successPoint"][languageStatus]+"："+TaskAssignedSuccessRewardText+"</div>");
			$('#' + id + '_Y02_content_TaskAssignedSuccessRewardText').css
			({
				"font-size":"12pt",
				"margin-top":"15px",
				"margin-left":(($("#" + id + "_Y02_content_whitePanel").width() - 400) / 2 + 10) + "px",
				"width":"400px"
			});
			//failPoint
			var TaskAssignedFailPunishText=(typeof(result.data.TaskAssignedFailPunish) == "undefined")?0:result.data.TaskAssignedFailPunish;
			$('#' + id + '_Y02_content_whitePanel').append("<div class='translateHtml' id='" + id + "_Y02_content_TaskAssignedFailPunishText'>"+language["task_failPoint"][languageStatus]+"："+TaskAssignedFailPunishText+"</div>");
			$('#' + id + '_Y02_content_TaskAssignedFailPunishText').css
			({
				"font-size":"12pt",
				"margin-top":"15px",
				"margin-left":(($("#" + id + "_Y02_content_whitePanel").width() - 400) / 2 + 10) + "px",
				"width":"400px"
			});
			//TaskAssignedStatusText
			var taskAssignedStatusText=result.data.TaskAssignedStatus;
			$('#' + id + '_Y02_content_whitePanel').append("<div class='translateHtml' id='" + id + "_Y02_content_TaskAssignedStatusText'>"+language["TaskAssignedStatus"][languageStatus]+"："+taskAssignedStatusText+"</div>");
			$('#' + id + '_Y02_content_TaskAssignedStatusText').css
			({
				"font-size":"12pt",
				"margin-top":"15px",
				"margin-left":(($("#" + id + "_Y02_content_whitePanel").width() - 400) / 2 + 10) + "px",
				"width":"400px"
			});
			//簽核按鈕
			if(singOffButton)
			{
				$('#' + id + '_Y02_content_whitePanel').append("<button class='translateHtml' id='" + id + "_Y02_content_singOffButton'>"+singOffWindow_Params.buttonName+"</button>");
				$('#' + id + '_Y02_content_singOffButton').css
				({
					"width":"150px",
					"height":"40px",
					"font-size":"12pt",
					"border-radius":"10px",
					"position":"absolute",
					"right":"30px",
					"top":(viewId != "waitingProcess_00")?"90px":"30px",
					"background-color":"rgb(236,113,116)",
					"color":"white"
				});
				$('#' + id + '_Y02_content_singOffButton').click(function()
				{
					NewTask_singOffProcessingWindow(singOffWindow_Params,viewId,id,params,singOffButton);
				});
				if(viewId != "waitingProcess_00")
				{
					$('#' + id + '_Y02_content_whitePanel').append("<button class='translateHtml' id='" + id + "_Y02_content_uploadFileButton'>上傳附件</button>");
					$('#' + id + '_Y02_content_uploadFileButton').css
					({
						"width":"150px",
						"height":"40px",
						"font-size":"12pt",
						"border-radius":"10px",
						"position":"absolute",
						"right":"30px",
						"top":"30px",
					    "background-color":"rgb(52, 164, 251)",
						"color":"white"
					});
					$('#' + id + '_Y02_content_uploadFileButton').click(function()
					{
						NewTask_uploadFileWindow(singOffWindow_Params,viewId,id,params,singOffButton);
					});
				}
			}
			//語言包
			Home_Y02_changeLanguage(languageStatus);
			//contentPanel
			$('#' + id + '_Y02_content_whitePanel').append('<div id="' + id + '_Y02_content_ContentPanel"></div>');
			$('#' + id + '_Y02_content_ContentPanel').css
			({
				"background-color":"rgb(255, 255, 255)",
				"border-radius":"15pt",
				"height":"200px",
				"width":"400px",
				"margin-left":(($("#" + id + "_Y02_content_whitePanel").width() - 400) / 2) + "px",
				"margin-top":"15px",
				"position":"absolute",
				"border-style":"groove",
				"box-shadow":"2px 2px rgba(20%,20%,40%,0.5)",
			});
			//contentPanelTitle
			$('#' + id + '_Y02_content_ContentPanel').append('<div class="translateHtml" id="' + id + '_Y02_content_ContentPanelTitle">'+language["TaskAssignedContent"][languageStatus]+'</div>');
			$('#' + id + '_Y02_content_ContentPanelTitle').css
			({
				"border-top-left-radius":"15pt",
				"border-top-right-radius":"15pt",
				"height":"30px",
				"width":"400px",
				"text-align":"center",
				"font-size":"12pt",
				"line-height":"30px",
				"color":"white",
				"background": "rgb(84,116,165)",
			    "background": "-moz-linear-gradient(left, rgb(84,116,165) 1%, rgb(102,144,190) 100%)",
			    "background": "-webkit-linear-gradient(left, rgb(84,116,165) 1%,rgb(102,144,190) 100%)",
			    "background": "linear-gradient(to right, rgb(84,116,165) 1%,rgb(102,144,190) 100%)",
			    "filter": "progid:DXImageTransform.Microsoft.gradient( startColorstr='#5474a5', endColorstr='#6690be',GradientType=1 )"
			});
			//contentText
			var taskContentText=result.data.TaskAssignedContent;
			$('#' + id + '_Y02_content_ContentPanel').append("<div class='translateHtml' id='" + id + "_Y02_content_contentText'>"+taskContentText+"</div>");
			$('#' + id + '_Y02_content_contentText').css
			({
				"width":"360px",
				"height":"200px",
				"font-size":"12pt",
				"margin-top":"10px",
				"margin-left":"20px",
				"word-wrap":"break-word",
				"overflow":"auto"
			});
			//流程框架內容
			$('#' + id + '_Y02_content_main').append('<div id="' + id + '_Y02_content_whiteListPanel"></div>');
			$('#' + id + '_Y02_content_whiteListPanel').css
			({
				"background-color":"rgb(255, 255, 255)",
				"border-radius":"30pt",
				"height":"calc(100% - 60px)",
				"overflow":"hidden",
				"width":"300px",
				"margin-left":"calc(100% - 330px)",
				"margin-top":"30px",
				"position":"absolute"
			});
			//框架title
			$('#' + id + '_Y02_content_whiteListPanel').append("<div id='" + id + "_Y02_content_listTitleText' class='translateHtml'>"+language["task_schedule"][languageStatus]+"</div>");
			$('#' + id + '_Y02_content_listTitleText').css
			({
				"font-size":"12pt",
				"margin-top":"15px",
				"text-align":"center"
			});
			//工單流程圖筐
			$('#' + id + '_Y02_content_whiteListPanel').append("<div id='" + id + "_Y02_content_listChartView'></div>");
			$('#' + id + '_Y02_content_listChartView').css
			({
				"height":"calc(100% - 85px)",
				"font-size":"12pt",
				"margin-top":"15px",
				"width":"300px",
				"text-align":"center",
				"position":"absolute",
				"word-wrap":"break-word",
				"overflow":"auto"
			});
			//流程線框架
			$('#' + id + '_Y02_content_listChartView').append("<div id='" + id + "_Y02_content_listChartLineContent'></div>");
			$('#' + id + '_Y02_content_listChartLineContent').css
			({
				"height":"600px",
				"font-size":"12pt",
				"margin-top":"15px",
				"width":"60px",
				"text-align":"center",
				"position":"absolute",
			});
			//Loading Mask
			var loadingMask = Loading_Mask.Initialize();
			loadingMask.setTarget(id + '_Y02_content_listChartView');
			loadingMask.show();
			//工單詳細清單
			jqueryAjax_Get(localStorage.task+"/Task/me/General/"+params.MyTaskID+"/list?_dc="+dc,
			//成功後
			function(result)
			{
				//將每個流程會製成圖
				for(var i=0;i<result.data.length;i++)
				{
					var output=result.data[i];
					var inputColor="";
					var imgSrc="";
					var line1Height="0px";
					var line2Height="160px";
					//繪製流程線
					if(output.TaskAssignedExecutionStatus=="已完成" || output.TaskAssignedExecutionStatus=="同意" || output.TaskAssignedExecutionStatus=="接受" || output.TaskAssignedExecutionStatus=="完成工單" || output.TaskAssignedExecutionStatus=="檢查人檢查通過" || output.TaskAssignedExecutionStatus=="開單人檢查通過" || output.TaskAssignedExecutionStatus=="上級主管檢查通過")
					{
						inputColor="rgb(105,212,41)";
						imgSrc="status_completed";
						line1Height="15px";
						line2Height="180px";
					}
					else if(output.TaskAssignedExecutionStatus=="進行中")
					{
						inputColor="rgb(52,164,251)";
						imgSrc="status_in-progress";
						line1Height="10px";
						line2Height="170px";
					}
					else if(output.TaskAssignedExecutionStatus=="已失敗" || output.TaskAssignedExecutionStatus=="檢查人檢查不通過" || output.TaskAssignedExecutionStatus=="作廢" || output.TaskAssignedExecutionStatus=="開單人檢查不通過" || output.TaskAssignedExecutionStatus=="不接受")
					{
						inputColor="rgb(253,61,61)";
						imgSrc="status_fail";
						line1Height="10px";
						line2Height="170px";
					}
					else
					{
						inputColor="rgb(206,206,206)";
						imgSrc="status_not-work";
					}
					//小白筐
					$('#' + id + '_Y02_content_listChartView').append("<div id='" + id + "_Y02_content_listChartDiv_" + i + "'></div>");
					$('#' + id + '_Y02_content_listChartDiv_'+i).css
					({
						"font-size":"12pt",
						"margin-top":"15px",
						"width":"200px",
						"color":"white",
						"border-radius":"15pt",
						"margin-left":"70px",
						"text-align":"center",	
						"word-wrap":"break-word",
						"overflow":"auto",										
						"background-color":inputColor
					});
					//附件 Icon
					var marginRight = (getClintOS() == "MacOS")?"40px":"25px";
					var marginTop = (getClintOS() == "MacOS")?"23px":"25px";
					var fileIcon = '<div class="translateTitle fileIcon_Y02" listID="' + result['data'][i]['TaskAssignedListID'] + '" style="display:none;background-image: url(\'image/taskFile.png\');width: 30px;background-size: 100% 100%;height: 20px;float: right;margin-top:' + marginTop +';margin-right:' + marginRight + ';cursor: pointer;" title="查看附件"></div>';
					$(fileIcon).insertBefore($("#" + id + "_Y02_content_listChartDiv_" + i));
					//員工姓名
					$('#' + id + '_Y02_content_listChartDiv_'+i).append("<div class='translateHtml' id='" + id + "_Y02_content_listChartName_" + i + "'>員工姓名："+output.OwnerName+"</div>");
					$('#' + id + '_Y02_content_listChartName_'+i).css
					({
						"font-size":"12pt",
						"margin-top":"10px",
						"margin-left":"20px",
						"margin-right":"20px",
						"text-align":"left"
					});
					//Title 語言包
					Y02_changeLanguage_Title(languageStatus);
					//員工身份
					$('#' + id + '_Y02_content_listChartDiv_'+i).append("<div class='translateHtml' id='" + id + "_Y02_content_listChartExplanation_" + i + "'>員工身份："+output.TaskAssignedExplanation+"</div>");
					$('#' + id + '_Y02_content_listChartExplanation_'+i).css
					({
						"font-size":"12pt",
						"margin-top":"10px",
						"margin-left":"20px",
						"margin-right":"20px",
						"text-align":"left"
					});
					//開單狀態
					$('#' + id + '_Y02_content_listChartDiv_'+i).append("<div class='translateHtml' id='" + id + "_Y02_content_listChartStatus_" + i + "'>工單狀態："+((output.TaskAssignedExecutionStatus == null || output.TaskAssignedExecutionStatus == '')?"無":output.TaskAssignedExecutionStatus)+"</div>");
					$('#' + id + '_Y02_content_listChartStatus_'+i).css
					({
						"font-size":"12pt",
						"margin-top":"10px",
						"margin-left":"20px",
						"margin-right":"20px",
						"text-align":"left"
					});
					//工單意見
					$('#' + id + '_Y02_content_listChartDiv_'+i).append("<div class='translateHtml' id='" + id + "_Y02_content_listChartExecution_" + i + "'>工單意見："+((output.TaskAssignedExecutionContent == null || output.TaskAssignedExecutionContent == '')?"無":output.TaskAssignedExecutionContent)+"</div>");
					$('#' + id + '_Y02_content_listChartExecution_'+i).css
					({
						"font-size":"12pt",
						"margin-top":"10px",
						"margin-bottom":"10px",
						"margin-left":"20px",
						"margin-right":"20px",
						"text-align":"left"
					});

					//用小白框高度 計算上線及下線高度
					var divLineHeightTop = $("#" + id + "_Y02_content_listChartDiv_" + i).height() / 2;
					var divLineHeightBottom = $("#" + id + "_Y02_content_listChartDiv_" + i).height() / 2;

					//開單時間 如果有開單時間才會顯示
					if(output.TaskAssignedExecutionTime)
					{
						$('#' + id + '_Y02_content_listChartView').append("<div id='" + id + "_Y02_content_listChartTime_"+i+"'>"+getDate(output.TaskAssignedExecutionTime)+" "+getTime(output.TaskAssignedExecutionTime)+"</div>");
						$('#' + id + '_Y02_content_listChartTime_'+i).css
						({
							"font-size":"10pt",
							"margin-top":"10px",
							"margin-left":"100px",
							"text-align":"left"
						});
						//加上 時間方框高度 
						divLineHeightBottom = divLineHeightBottom + 26;
					}
					//加上下方小白框margin-top(第二個小白框才要加)
					divLineHeightTop = (i > 0)?divLineHeightTop + 15:divLineHeightTop;

					//上線
					$('#' + id + '_Y02_content_listChartLineContent').append("<div id='" + id + "_Y02_content_listChartLine1_" + i + "'></div>");
					$('#' + id + '_Y02_content_listChartLine1_'+i).css
					({
						"border-left-style":"solid",
						"border-width":"2px",
						"width":"2px",
						"height":line1Height,
						"border-color":inputColor,
						"margin-left":"30px",
						"height":divLineHeightTop - 7
					});
					//中框
					$('#' + id + '_Y02_content_listChartLineContent').append("<img src='./image/"+imgSrc+".png' id='" + id + "_Y02_content_listChartLineIMG_"+i+"'></img>");
					$('#' + id + '_Y02_content_listChartLineIMG_'+i).css
					({
						"position":"absolute",
						"margin-top":"-10px",
						"margin-left":"-15px",
					});
					//下線
					$('#' + id + '_Y02_content_listChartLineContent').append("<div id='" + id + "_Y02_content_listChartLine2_"+i+"'></div>");
					$('#' + id + '_Y02_content_listChartLine2_'+i).css
					({
						"border-left-style":"solid",
						"border-width":"2px",
						"width":"2px",
						"height":line2Height,
						"border-color":inputColor,
						"margin-left":"30px",
						"height":divLineHeightBottom + 7
					});
					//刪除 loading Mask
					if(i == result.data.length - 1)
					{
						loadingMask.close();
					}
				}
				//記錄 taskList 
				for(var j=0;j<result.data.length;j++) 
				{
					//取的相同清單擁有者編號的 list id
					if(result.data[j]['TaskAssignedListOwnerID'] == localStorage.getItem('userID') && result.data[j]['TaskAssignedExecutionStatus'] == "進行中")
					{
						params.TaskAssignedListID = result.data[j]['TaskAssignedListID'];
						params.TaskAssignedExplanation = result.data[j]['TaskAssignedExplanation'];
						break;
					}
				}
				//點選工單進度可載入是否有附件
				$('#' + id + '_Y02_content_listTitleText').click(function()
				{
					//載入工單附件資料
					for(var k=0;k<result.data.length;k++) 
					{
						//載入工單附件方法
						getTask_FileList(result['data'][k]['TaskAssignedListID']);
					}
					//載入工單附件方法
					Task_FileList = {};
					function getTask_FileList(TaskAssignedListID)
					{
						//工單詳細清單
						jqueryAjax_Get(localStorage.task + "/Task/General/" + params.MyTaskID + "/" + TaskAssignedListID + "/filelist?_Y02=" + new Date().getTime(),
						//成功後
						function(taskList_Result)
						{
							//如果成功 且 筆數大於零
							if(taskList_Result.success && taskList_Result.count > 0)
							{
								//共用工單變數
								Task_FileList[TaskAssignedListID] = taskList_Result;
								Task_FileList[TaskAssignedListID].TaskAssignedListID = TaskAssignedListID;
								//顯示附件圖片
								$(".fileIcon_Y02[listid='" + TaskAssignedListID + "']").show();
								//新增附件 Icon 監聽
								$("div[listId='" + TaskAssignedListID + "']").click(function()
								{
									//開啟查看附件畫面 先顯示Loding圖示
									NewTask_ImgSliderWindow(Task_FileList[$(this).attr('listID')],$(this).attr('listID'));
									//工單附件清單
									var FileList_Detail = Task_FileList[$(this).attr('listID')];
									//工單附件清單包含圖片完整物件
									var FileList_Detail_Object = {};
									//紀錄數量
									FileList_Detail_Object['count'] = FileList_Detail.count;
									for(var i=0;i<FileList_Detail.count;i++)
									{
										//將工單清單的附件的 標題及內容存進物件
										FileList_Detail_Object[i] = {};
										FileList_Detail_Object[i]['TaskFileContent'] = FileList_Detail['data'][i]['TaskFileContent'];
										FileList_Detail_Object[i]['TaskFileName'] = FileList_Detail['data'][i]['TaskFileName'];
										//取得圖片
										getFileList_Detail_Img(FileList_Detail['data'][i].TaskFileID,i,FileList_Detail.count);
									};
									//取得圖片
									function getFileList_Detail_Img(fileID,i,count)
									{
										//工單詳細清單
										var myUrl = localStorage.task + "/Task/General/" + params.MyTaskID + "/" + FileList_Detail.TaskAssignedListID + "/" + fileID + "/images";
										jqueryAjax_Get(myUrl,
										//成功後
										function(fileResult)
										{
											$("img[imgfileid='" + fileID + "']").attr('src','data:image/png;base64,' + fileResult.data);
										},
										//失敗時
										function()
										{
											var taskListErr_Msg = YesNo_Msg_Define.Initialize();
											taskListErr_Msg.setMask(false);
											taskListErr_Msg.setSmartdetect(false);
											taskListErr_Msg.setWidth(300);
											taskListErr_Msg.setHeight(168);
											taskListErr_Msg.setId('taskListErr_Msg');
											taskListErr_Msg.setTitle(language["system_error"][languageStatus]);
											taskListErr_Msg.show();
											taskListErr_Msg.addMsgContent(error.message);
											taskListErr_Msg.addYesNO_Button('',language["system_ok"][languageStatus],null,
											function()
											{
												//關閉 Msg
											    taskListErr_Msg.close();
											});
											//隱藏 No 按鈕
											$('#taskListErr_Msg_No').css("display","none");
											//置中 Yes 按鈕
											$('#taskListErr_Msg_Yes').css({"margin-left":"0px","width":"100%"});
										});
									}
								});
							}
						},
						//失敗時
						function()
						{
							var taskListErr_Msg = YesNo_Msg_Define.Initialize();
							taskListErr_Msg.setMask(false);
							taskListErr_Msg.setSmartdetect(false);
							taskListErr_Msg.setWidth(300);
							taskListErr_Msg.setHeight(168);
							taskListErr_Msg.setId('taskListErr_Msg');
							taskListErr_Msg.setTitle(language["system_error"][languageStatus]);
							taskListErr_Msg.show();
							taskListErr_Msg.addMsgContent(error.message);
							taskListErr_Msg.addYesNO_Button('',language["system_ok"][languageStatus],null,
							function()
							{
								//關閉 Msg
							    taskListErr_Msg.close();
							});
							//隱藏 No 按鈕
							$('#taskListErr_Msg_No').css("display","none");
							//置中 Yes 按鈕
							$('#taskListErr_Msg_Yes').css({"margin-left":"0px","width":"100%"});
						});
					}
				});
				$('#' + id + '_Y02_content_listTitleText').click();
				//語言包
				Home_Y02_changeLanguage(languageStatus);
			},
			function(error)
			{
				normalError_Msg(error.message);
			});
		},
		function(error)
		{
			normalError_Msg(error.message);
		});
		//新增畫面大小改變監聽
		$(window).resize(newTaskContentResize);
		//畫面大小改變方法
		function newTaskContentResize()
		{
			//寬度
			var divWidth = (($("#" + id + "_Y02_content_whitePanel").width() - 400) / 2 + 10) + "px";
			var divWidth2 = (($("#" + id + "_Y02_content_whitePanel").width() - 400) / 2) + "px";
			//工單內容寬度修改
			$('#' + id + '_Y02_content_Number').css("margin-left",divWidth);
			$('#' + id + '_Y02_content_titleText').css("margin-left",divWidth);
			$('#' + id + '_Y02_content_createDateText').css("margin-left",divWidth);
			$('#' + id + '_Y02_content_startDateText').css("margin-left",divWidth);
			$('#' + id + '_Y02_content_endDateText').css("margin-left",divWidth);
			$('#' + id + '_Y02_content_OwnerNameText').css("margin-left",divWidth);
			$('#' + id + '_Y02_content_MainCheckEmployeeNameText').css("margin-left",divWidth);
			$('#' + id + '_Y02_content_MainResponsibleEmployeeNameText').css("margin-left",divWidth);
			$('#' + id + '_Y02_content_TaskAssignedSuccessRewardText').css("margin-left",divWidth);
			$('#' + id + '_Y02_content_TaskAssignedFailPunishText').css("margin-left",divWidth);
			$('#' + id + '_Y02_content_TaskAssignedStatusText').css("margin-left",divWidth);
			$('#' + id + '_Y02_content_ContentPanel').css("margin-left",divWidth2);
		}
		//刪除畫面大小改變監聽
		$("#" + id + "_Y02_content").on("remove",function()
		{
			$(window).off("resize",newTaskContentResize);
		});
		//避免 bug 
		$("#" + id + '_Y02_content_li').click(function()
		{
			//重新載入畫面大小改變方法
			newTaskContentResize();
		});
		//語言包
		Home_Y02_changeLanguage(languageStatus);
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}

//清單點擊監聽
function addListViewPage_Eventlistner()
{
	try
	{
		//待處理
		new function ()
		{
			//待處理 - 退回
			$("#waitingProcess_Y02 td").eq(0).click(function()
			{
				//新增畫面
				createNewTaskPage('waitingProcess_00','/Task/me/General?result=processing&userType=1&taskStatus=processing&desc=true&orderTitle=StartTime','待處理 - 退回');
			});
			//待處理 - 待轉發
			$("#waitingProcess_Y02 td").eq(1).click(function()
			{
				//新增畫面
				createNewTaskPage('waitingProcess_01','/Task/me/General?result=processing&userType=2&taskStatus=processing&desc=true&orderTitle=StartTime','待處理 - 待轉發');
			});
			//待處理 - 待接單
			$("#waitingProcess_Y02 td").eq(2).click(function()
			{
				//新增畫面
				createNewTaskPage('waitingProcess_02','/Task/me/General?result=processing&userType=3&taskStatus=processing&desc=true&orderTitle=StartTime','待處理 - 待接單');
			});
			//待處理 - 執行中
			$("#waitingProcess_Y02 td").eq(3).click(function()
			{
				//新增畫面
				createNewTaskPage('waitingProcess_03','/Task/me/General?result=processing&userType=4&taskStatus=processing&desc=true&orderTitle=StartTime','待處理 - 執行中');
			});
			//待處理 - 待檢查
			$("#waitingProcess_Y02 td").eq(4).click(function()
			{
				//新增畫面
				createNewTaskPage('waitingProcess_04','/Task/me/General?result=processing&userType=5,6&taskStatus=processing&desc=true&orderTitle=StartTime','待處理 - 待檢查');
			});
			//待處理 - 下屬爭議
			$("#waitingProcess_Y02 td").eq(5).click(function()
			{
				//新增畫面
				createNewTaskPage('waitingProcess_05','/Task/me/General?result=processing&userType=7&taskStatus=processing&desc=true&orderTitle=StartTime','待處理 - 下屬爭議');
			});
		}
		//主辦
		new function ()
		{
			//主辦 - 進行中
			$("#mainProcess_Y02 td").eq(0).click(function()
			{
				//新增畫面
				createNewTaskPage('mainProcess_00','/Task/me/General?result=processing&userType=1&taskStatus=all&desc=true&orderTitle=StartTime','主辦 - 進行中');
			});
			//主辦 - 成功
			$("#mainProcess_Y02 td").eq(1).click(function()
			{
				//新增畫面
				createNewTaskPage('mainProcess_01','/Task/me/General?result=success&userType=1&taskStatus=all&desc=true&orderTitle=EndTime','主辦 - 成功');
			});
			//主辦 - 失敗
			$("#mainProcess_Y02 td").eq(2).click(function()
			{
				//新增畫面
				createNewTaskPage('mainProcess_02','/Task/me/General?result=fail&userType=1&taskStatus=all&desc=true&orderTitle=EndTime','主辦 - 失敗');
			});
			//主辦 - 作廢
			$("#mainProcess_Y02 td").eq(3).click(function()
			{
				//新增畫面
				createNewTaskPage('mainProcess_03','/Task/me/General?result=invalid&userType=1&taskStatus=all&desc=true&orderTitle=EndTime','主辦 - 作廢');
			});
		}
		//已處理
		new function ()
		{
			//已處理 - 待結案
			$("#alreadyProcess_Y02 td").eq(0).click(function()
			{
				//新增畫面
				createNewTaskPage('alreadyProcess_00','/Task/me/General?result=processing&userType=4&taskStatus=processed&desc=true&orderTitle=StartTime','已處理 - 待結案');
			});
			//已處理 - 成功
			$("#alreadyProcess_Y02 td").eq(1).click(function()
			{
				//新增畫面
				createNewTaskPage('alreadyProcess_01','/Task/me/General?result=success&userType=4&taskStatus=processed&desc=true&orderTitle=StartTime','已處理 - 成功');
			});
			//已處理 - 失敗
			$("#alreadyProcess_Y02 td").eq(2).click(function()
			{
				//新增畫面
				createNewTaskPage('alreadyProcess_02','/Task/me/General?result=fail&userType=4&taskStatus=processed&desc=true&orderTitle=StartTime','已處理 - 失敗');
			});
			//已處理 - 作廢
			$("#alreadyProcess_Y02 td").eq(3).click(function()
			{
				//新增畫面
				createNewTaskPage('alreadyProcess_03','/Task/me/General?result=invalid&userType=4&taskStatus=processed&desc=true&orderTitle=StartTime','已處理 - 作廢');
			});
			//已處理 - 轉發
			$("#alreadyProcess_Y02 td").eq(4).click(function()
			{
				//新增畫面
				createNewTaskPage('alreadyProcess_04','/Task/me/General?result=all&userType=2&taskStatus=processed&desc=true&orderTitle=StartTime','已處理 - 轉發');
			});
			//已處理 - 已檢查
			$("#alreadyProcess_Y02 td").eq(5).click(function()
			{
				//新增畫面
				createNewTaskPage('alreadyProcess_05','/Task/me/General?result=all&userType=5,6&taskStatus=processed&desc=true&orderTitle=StartTime','已處理 - 已檢查');
			});
		}
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
};

//更新筆數資料 預先載入資料
getNewTaskPage_Record("all");
function getNewTaskPage_Record(func)
{
	try
	{
		var ajaxUrl_First = localStorage.task;
		var ajaxUrl_Last = "&start=0&_Y02="+new Date().getTime();//&limit=0
		//待處理
		if(func == "all" || func == "waitingProcess")
		{
			new function ()
			{
				//待處理 - 退回
				sendRequest('waitingProcess_00','/Task/me/General?result=processing&userType=1&taskStatus=processing');
				//待處理 - 待轉發
				sendRequest('waitingProcess_01','/Task/me/General?result=processing&userType=2&taskStatus=processing');
				//待處理 - 待接單
				sendRequest('waitingProcess_02','/Task/me/General?result=processing&userType=3&taskStatus=processing');
				//待處理 - 執行中
				sendRequest('waitingProcess_03','/Task/me/General?result=processing&userType=4&taskStatus=processing');
				//待處理 - 待檢查
				sendRequest('waitingProcess_04','/Task/me/General?result=processing&userType=5,6&taskStatus=processing');
				//待處理 - 下屬爭議
				sendRequest('waitingProcess_05','/Task/me/General?result=processing&userType=7&taskStatus=processing');
			}
		}
		//主辦
		if(func == "all" || func == "mainProcess")
		{
			new function ()
			{
				//主辦 - 進行中
				sendRequest('mainProcess_00','/Task/me/General?result=processing&userType=1&taskStatus=all');
				//主辦 - 成功
				sendRequest('mainProcess_01','/Task/me/General?result=success&userType=1&taskStatus=all');
				//主辦 - 失敗
				sendRequest('mainProcess_02','/Task/me/General?result=fail&userType=1&taskStatus=all');
				//主辦 - 作廢
				sendRequest('mainProcess_03','/Task/me/General?result=invalid&userType=1&taskStatus=all');
			}
		}
		//已處理
		if(func == "all" || func == "alreadyProcess")
		{
			new function ()
			{
				//已處理 - 待結案
				sendRequest('alreadyProcess_00','/Task/me/General?result=processing&userType=4&taskStatus=processed');
				//已處理 - 成功
				sendRequest('alreadyProcess_01','/Task/me/General?result=success&userType=4&taskStatus=processed');
				//已處理 - 失敗
				sendRequest('alreadyProcess_02','/Task/me/General?result=fail&userType=4&taskStatus=processed');
				//已處理 - 作廢
				sendRequest('alreadyProcess_03','/Task/me/General?result=invalid&userType=4&taskStatus=processed');
				//已處理 - 轉發
				sendRequest('alreadyProcess_04','/Task/me/General?result=all&userType=2&taskStatus=processed');
				//已處理 - 已檢查
				sendRequest('alreadyProcess_05','/Task/me/General?result=all&userType=5,6&taskStatus=processed');
			}
		}
		//共用發 Request
		function sendRequest(id,url)
		{
			//清空
			$("#" + id + "_Y02 span").html("　");
			$("#" + id + "_Y02 span").attr('style','color:rgb(252,142,44);background-image:url(image/loading3.gif);background-size:100% 100%;');
			jqueryAjax_Get(ajaxUrl_First + url + "&year=" + $("#Home_Y02_yearSearch").val() + "&month=" + $("#Home_Y02_monthSearch").val() + ajaxUrl_Last,function(result)
			{
				//載入後設定筆數
				$("#" + id + "_Y02 span").html(result.maxCount);
				$("#" + id + "_Y02 span").attr('style','color:rgb(252,142,44);');
			},null,null);
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

//我簽核的工單的執行畫面
function NewTask_singOffProcessingWindow(singOffWindow_Params,viewId,id,params,ProcessingTaskStatus)
{
	try
	{
		//定義介面
		NewTask_ReceiveProcessingTask_Window = Window_Define.Initialize();
		NewTask_ReceiveProcessingTask_Window.setMask(true);
		NewTask_ReceiveProcessingTask_Window.setSmartdetect(false);
		NewTask_ReceiveProcessingTask_Window.setWidth(350);
		NewTask_ReceiveProcessingTask_Window.setHeight(236);
		NewTask_ReceiveProcessingTask_Window.setId('NewTask_ReceiveProcessingTask_Window');
		NewTask_ReceiveProcessingTask_Window.setTitle(singOffWindow_Params.windowTitle);
		NewTask_ReceiveProcessingTask_Window.show();
		NewTask_ReceiveProcessingTask_Window.addCombobox('singReceiveWay',language["treatment"][languageStatus]+' :');
		//加上下拉式選單選項 如果是開單檢查人要檢查 則使用另一個下拉式選單
		$('#singReceiveWay').append((params.TaskAssignedExplanation == "開單檢查人")?singOffWindow_Params.selectOption2:singOffWindow_Params.selectOption);
		NewTask_ReceiveProcessingTask_Window.addTextarea('ProcessingTask_ReceiveContent',language["scheduleSuggestion"][languageStatus]+' :');
		NewTask_ReceiveProcessingTask_Window.addYesNO_Button('',language["system_send"][languageStatus],null,
		function()
		{
			//多於判斷參數 之後應該會拿掉
			var TaskAssignedExecutionResult = null;
			var userSelect = $('#singReceiveWay').val();
			var userContent = $('#ProcessingTask_ReceiveContent').val();
			//判斷輸入
			if(userSelect == null)
			{
				$('#singReceiveWay').focus();
			}
			else if(userContent == "")
			{
				$('#ProcessingTask_ReceiveContent').focus();
			}
			else if((viewId == "waitingProcess_00" || viewId == "waitingProcess_04") && $('#ReceiveTime').val() == "")
			{
				$('#ReceiveTime').focus();
			}
			else
			{
				//判斷結果
				if(userSelect == "Accept" || userSelect == "Finished" || userSelect == "Pass")
				{
					TaskAssignedExecutionResult = true;
				}
				else
				{
					TaskAssignedExecutionResult = false;
				}
				//主要參數
				var data = 
				{
					"TaskAssignedExecutionContent":userContent,
					"TaskResult":userSelect,
					"TaskAssignedExecutionResult":TaskAssignedExecutionResult
				};
				//如果需要處理時間
				if((viewId == "waitingProcess_00" || viewId == "waitingProcess_04") && $('#ReceiveTime').val() != undefined)
				{
					//修改時差 改成＋0時區
					$.dateFormat = function(dateObject)
					{
					    var d = new Date(dateObject);
						return d.toISOString();
					};
					data.updateDate = $.dateFormat($('#ReceiveTime').val());
				}
				var dc = (+new Date());
				//Loading Mask
				loadingMask = Loading_Mask.Initialize();
				loadingMask.setTarget('NewTask_ReceiveProcessingTask_Window');
				loadingMask.show();
				jqueryAjax_Put(localStorage.task+'/Task/me/General/'+params.MyTaskID+'/'+params.TaskAssignedListID+'?_dc='+dc,JSON.stringify(data),function(Result)
				{
					//語言包
					Y02_changeLanguage_HTML(languageStatus);
					//loading close
					loadingMask.close();
					var task_Msg = YesNo_Msg_Define.Initialize();
					task_Msg.setMask(false);
					task_Msg.setSmartdetect(false);
					task_Msg.setWidth(300);
					task_Msg.setHeight(168);
					task_Msg.setId('task_Msg');
					task_Msg.setTitle(language["system_msg"][languageStatus]);
					task_Msg.show();
					task_Msg.addMsgContent(Result.message);
					task_Msg.addYesNO_Button('',language["system_ok"][languageStatus],null,
					function()
					{
						//關閉 Msg
						task_Msg.close();
					    NewTask_ReceiveProcessingTask_Window.close();
					    //刪除本頁面
					    deleteTab(id + '_Y02_content');
					    //重新整理
					    taskObject[viewId].load();
					    //跳到瀏覽頁面
					    $('#' + viewId + '_a').click();
					});
					//隱藏 No 按鈕
					$('#task_Msg_No').css("display","none");
					//置中 Yes 按鈕
					$('#task_Msg_Yes').css({"margin-left":"0px","width":"100%"});
					//語言包
					Y02_changeLanguage_HTML(languageStatus);
				},
				function(result)
				{
					normalError_Msg_Withmask(result.message);
					$("#YesNo_Msg").width(300);
					$("#YesNo_Msg").height(168);
					$("#YesNo_Msg_Title").html(language["system_error"][languageStatus]);
					$("#YesNo_Msg_Yes").html(language["system_ok"][languageStatus]);
					//Debug
					$('#YesNo_Msg').css('z-index',100);
					$('#YesNo_Msg_Mask').css('z-index',99);
					$("#YesNo_Msg_Yes").click(function()
					{
						loadingMask.close();
					});
				},null);
			}
		});
		//如果是待處理 - 退回 或是 待處理 - 待檢查
		if(viewId == "waitingProcess_00" || viewId == "waitingProcess_04")
		{
			$("#singReceiveWay").change(function()
			{
				if($(this).val() == "AddTime")
				{
					//新增時間欄位
					addTimeField('ReceiveTime','加時時間 :');
					//改變高度
					$("#NewTask_ReceiveProcessingTask_Window").height(275);
					NewTask_ReceiveProcessingTask_Window.setHeight(275);
				}
				else
				{
					//刪除時間欄位
					$("#ReceiveTime_Group").remove();
					//改回高度
					$("#NewTask_ReceiveProcessingTask_Window").height(236);
					NewTask_ReceiveProcessingTask_Window.setHeight(236);
				}
			});
			//新增時間欄位
			function addTimeField(ID,Label)
			{
				//建立 Window DatetimeField 群組 Div
				$("#singReceiveWay_Group").after("<div id='" + ID + "_Group'></div>");
				//建立 Window DatetimeField label
				$('#' + ID + "_Group").append("<div class='Font translateHtml' id='" + ID + "_Label'>" + Label + "</div>");
				//建立 Window DatetimeField text
				$('#' + ID + "_Group").append("<input class='Font Window_Textfield' id='" + ID + "' type='text'></input>");
				//設定語言選項
				$.datetimepicker.setLocale('zh');
				//產生日期選擇
				$('#' + ID).datetimepicker();
				//Group Css
				$('#' + ID + "_Group").css
				({
					"margin-top":"15px"
				});
				//label Css
				$('#' + ID + "_Label").css
				({
					"float":"left",
					"width":"95px"
				});
				//DatetimeField Css
				$('#' + ID).css
				({
					"width":"calc(100% - 100px)",
					"border":"0px",
					"border-bottom":"rgb(152,152,152) 1px solid",
					"margin-top":"0px",
					"padding":"0px"
				});
				//建立 Focus Focus
				$('#' + ID).focus(function()
				{
					$('#' + this.id).css("border-bottom","rgb(69,200,200) 1px solid");
					$('#' + this.id).prev().css("color","rgb(69,200,200)");
				});
				//建立 Focus Blur
				$('#' + ID).blur(function()
				{
					$('#' + this.id).css("border-bottom","rgb(152,152,152) 1px solid");
					$('#' + this.id).prev().css("color","rgb(60,60,60)");
				});
			}
		}
		$('#NewTask_ReceiveProcessingTask_Window_No').css("display","none");
		//置中 Yes 按鈕
		$('#NewTask_ReceiveProcessingTask_Window_Yes').css({"margin-left":"0px","width":"100%"});
		//語言包
		Y02_changeLanguage_HTML(languageStatus);
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}
//檔案上傳畫面
function NewTask_uploadFileWindow(singOffWindow_Params,viewId,id,params,ProcessingTaskStatus)
{
	try
	{
		//定義介面
		NewTask_add_uploadFile_Window = Window_Define.Initialize();
		NewTask_add_uploadFile_Window.setMask(true);
		NewTask_add_uploadFile_Window.setSmartdetect(false);
		NewTask_add_uploadFile_Window.setWidth(385);
		NewTask_add_uploadFile_Window.setHeight(280);
		NewTask_add_uploadFile_Window.setId('NewTask_add_uploadFile_Window');
		NewTask_add_uploadFile_Window.setTitle('上傳檔案');
		NewTask_add_uploadFile_Window.show();
		NewTask_add_uploadFile_Window.addTextfield('NewTask_add_uploadFile_Window_uploadTitle','檔案標題 :');
		//上傳文字方塊
		NewTask_add_uploadFile_Window.addTextfield('NewTask_add_uploadFile_Window_upload','上傳檔案 :');
		$("#NewTask_add_uploadFile_Window_upload").focus(function()
		{
			$("#NewTask_add_uploadFile_Window_upload_hide").click();
		});
		$("#NewTask_add_uploadFile_Window_upload").click(function()
		{
			$("#NewTask_add_uploadFile_Window_upload_hide").click();
		});
		//上傳實際輸入框
		NewTask_add_uploadFile_Window.addTextfield('NewTask_add_uploadFile_Window_upload_hide','上傳檔案 :');
		$("#NewTask_add_uploadFile_Window_upload_hide").attr('type','file');
		$("#NewTask_add_uploadFile_Window_upload_hide").attr('accept','image/jpeg');
		$("#NewTask_add_uploadFile_Window_upload_hide_Group").hide();
		$("#NewTask_add_uploadFile_Window_upload_hide").change(function()
		{
			var fileName = $("#NewTask_add_uploadFile_Window_upload_hide").val().split("\\")[$("#NewTask_add_uploadFile_Window_upload_hide").val().split("\\").length - 1];
			$("#NewTask_add_uploadFile_Window_upload").val(fileName);
			$("#NewTask_add_uploadFile_Window_upload").attr('title',$("#NewTask_add_uploadFile_Window_upload_hide").val());
		});
		NewTask_add_uploadFile_Window.addTextarea('NewTask_add_uploadFile_Window_uploadContent','檔案內容 :');
		NewTask_add_uploadFile_Window.addYesNO_Button('','上傳',null,
		function()
		{
			//參數
			var NewTask_add_uploadFile_Window_upload = $('#NewTask_add_uploadFile_Window_upload_hide').val();
			var NewTask_add_uploadFile_Window_uploadTitle = $('#NewTask_add_uploadFile_Window_uploadTitle').val();
			var NewTask_add_uploadFile_Window_uploadContent = $('#NewTask_add_uploadFile_Window_uploadContent').val();
			//判斷輸入
			if(NewTask_add_uploadFile_Window_upload == "")
			{
				$('#NewTask_add_uploadFile_Window_upload').click();
			}
			else if(NewTask_add_uploadFile_Window_uploadTitle == "")
			{
				$('#NewTask_add_uploadFile_Window_uploadTitle').focus();
			}
			else if(NewTask_add_uploadFile_Window_uploadContent == "")
			{
				$('#NewTask_add_uploadFile_Window_uploadContent').focus();
			}
			else
			{
				//Loading Mask
				loadingMask = Loading_Mask.Initialize();
				loadingMask.setTarget('NewTask_add_uploadFile_Window');
				loadingMask.show();
				//上傳檔案
				var formData = new FormData();
				formData.append('image',$('#NewTask_add_uploadFile_Window_upload_hide')[0].files[0]);
			    $.ajax
				({
					url: localStorage.task + '/Task/General/' + params.MyTaskID + "/" + params.TaskAssignedListID + "/file?_Y02=" + new Date().getTime(),
					type: "POST",
					data: formData,
					beforeSend:function(xhr)
					{
						xhr.setRequestHeader("Authorization","JAUTH "+localStorage.Auth);
					},
					processData: false,
					contentType: false,
					success: function(response)
					{
						//檔案內容
						var fileData = {};
						fileData.FileName = NewTask_add_uploadFile_Window_uploadTitle;
						fileData.FileContent = NewTask_add_uploadFile_Window_uploadContent;
						//Put
						jqueryAjax_Put(localStorage.task + '/Task/General/' + params.MyTaskID + "/" + params.TaskAssignedListID + "/" + response.data + "?_Y02=" + new Date().getTime(),JSON.stringify(fileData),function(Result)
						{
							//loading close
							loadingMask.close();
							var task_Msg = YesNo_Msg_Define.Initialize();
							task_Msg.setMask(false);
							task_Msg.setSmartdetect(false);
							task_Msg.setWidth(300);
							task_Msg.setHeight(168);
							task_Msg.setId('task_Msg');
							task_Msg.setTitle(language["system_msg"][languageStatus]);
							task_Msg.show();
							task_Msg.addMsgContent(Result.message);
							task_Msg.addYesNO_Button('',language["system_ok"][languageStatus],null,
							function()
							{
								//關閉 Msg
								task_Msg.close();
							    NewTask_add_uploadFile_Window.close();
							    //重載附件狀況
							    $('#' + id + '_Y02_content_listTitleText').click();
							});
							//隱藏 No 按鈕
							$('#task_Msg_No').css("display","none");
							//置中 Yes 按鈕
							$('#task_Msg_Yes').css({"margin-left":"0px","width":"100%"});
							//語言包
							Y02_changeLanguage_HTML(languageStatus);
						},
						function(result)
						{
							normalError_Msg_Withmask(result.message);
							$("#YesNo_Msg").width(300);
							$("#YesNo_Msg").height(168);
							$("#YesNo_Msg_Title").html(language["system_error"][languageStatus]);
							$("#YesNo_Msg_Yes").html(language["system_ok"][languageStatus]);
							//Debug
							$('#YesNo_Msg').css('z-index',100);
							$('#YesNo_Msg_Mask').css('z-index',99);
						},null);
					},
					error: function(jqXHR, textStatus, errorMessage)
					{
						normalError_Msg_Withmask(result.message);
						$("#YesNo_Msg").width(300);
						$("#YesNo_Msg").height(168);
						$("#YesNo_Msg_Title").html(language["system_error"][languageStatus]);
						$("#YesNo_Msg_Yes").html(language["system_ok"][languageStatus]);
						//Debug
						$('#YesNo_Msg').css('z-index',100);
						$('#YesNo_Msg_Mask').css('z-index',99);
					}
				});
			}
		});
		//隱藏 No 按鈕
		$('#NewTask_add_uploadFile_Window_No').css("display","none");
		//置中 Yes 按鈕
		$('#NewTask_add_uploadFile_Window_Yes').css({"margin-left":"0px","width":"100%"});
		//語言包
		Y02_changeLanguage_HTML(languageStatus);
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}
//檔案顯示畫面
function NewTask_ImgSliderWindow(FileList_Detail_Object,TaskAssignedListID)
{
	//定義介面
	var NewTask_ImgSliderWindow = Window_Define.Initialize();
	NewTask_ImgSliderWindow.setMask(true);
	NewTask_ImgSliderWindow.setSmartdetect(false);
	NewTask_ImgSliderWindow.setWidth(550);
	NewTask_ImgSliderWindow.setHeight(705);
	NewTask_ImgSliderWindow.setId('NewTask_ImgSliderWindow');
	NewTask_ImgSliderWindow.setTitle('查看附件');
	NewTask_ImgSliderWindow.show();
	//Debug
	$("#NewTask_ImgSliderWindow").css
	({
		"overflow-y":"auto",
    	"overflow-x":"hidden"
	});
	$("#NewTask_ImgSliderWindow_Body").css
	({
	    "padding-top":"20px",
	    "padding-bottom":"20px"
	});
	//新增畫面
	$("#NewTask_ImgSliderWindow_Body").append
	(
		'<div id="NewTask_ImgSliderWindow_Main" role="main">'+
		  	'<section class="slider" style="padding-bottom:10px;">'+
		    	'<div id="slider" class="flexslider">'+
		      		'<ul class="slides"></ul>'+
	    		'</div>'+
		    	'<div id="carousel" class="flexslider">'+
		      		'<ul class="slides"></ul>'+
		    	'</div>'+
		  	'</section>'+
		'</div>'
	);
	//新增畫面內容
	function addImgSlider_Content(title,content,imgFileID,imgUrl)
	{
		$("#NewTask_ImgSliderWindow_Main #slider .slides").append
		(
			'<li>' + 
				'<div class="flex-caption" style="height:18.01px;">' +
					'<span class="translateHtml" style="float:left;display: block;width:calc(100% - 35px);">' + title + '</span>' +
					'<span class="translateHtml" style="float:left;text-align:right;display: block;width: 30px;visibility:hidden;">下载</span>' +
				'</div>' +
				'<img src="' + imgUrl + '" style="width:100%;height:305.55px;" imgFileID="' + imgFileID + '" />'+
	        	'<p class="flex-caption translateHtml">' + content + '</p>'+
	        '</li>'
		);
		$("#NewTask_ImgSliderWindow_Main #carousel .slides").append
		(
			'<li>' + 
				'<img src="' + imgUrl + '" style="cursor:pointer;width:210px;height:157.5px;" imgFileID="' + imgFileID + '" />'+
	        '</li>'
		);
	}
	//動態新增畫面內容
	for(var i = 0; i < FileList_Detail_Object.count; i++)
	{
		var TaskFileName = FileList_Detail_Object['data'][i]['TaskFileName'];
		var TaskFileContent = FileList_Detail_Object['data'][i]['TaskFileContent'];
		var TaskFileID = FileList_Detail_Object['data'][i]['TaskFileID'];

		addImgSlider_Content(TaskFileName,TaskFileContent,TaskFileID,"image/loading.gif");
		if(i == FileList_Detail_Object.count - 1)
		{
			//啟動圖片播放套件
			$('#carousel').flexslider
			({
				animation: "slide",
				controlNav: false,
				animationLoop: false,
				slideshow: false,
				itemWidth: 210,
				itemMargin: 5,
				asNavFor: '#slider'
			});
			$('#slider').flexslider
			({
				animation: "slide",
				controlNav: false,
				animationLoop: false,
				slideshow: false,
				sync: "#carousel",
				smoothHeight: true
			});
			//語言包
			Y02_changeLanguage_HTML(languageStatus);
		}
	};
	//新增按鈕
	$("#NewTask_ImgSliderWindow_Body").append
	(
		'<div style="height:40px;width:calc(100% - 30px);padding-bottom:18px;position: absolute;">' + 
			'<div class="Window_Cancel translateHtml" id="NewTask_ImgSliderWindow_Window_No" style="display: none;"></div>' + 
			'<div class="Window_Yes translateHtml" id="NewTask_ImgSliderWindow_Window_Yes" style="margin-left: 0px; width: 100%;">關閉</div>' + 
		'</div>'
	);
	//語言包
	Y02_changeLanguage_HTML(languageStatus);
	$("#NewTask_ImgSliderWindow_Window_Yes").click(function()
	{
		NewTask_ImgSliderWindow.close();
	});
}