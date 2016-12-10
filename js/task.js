//Jquery 準備好
$(document).ready(function()
{
	try
	{
		//我發出的工單
		var view = {};
		view.Title = "工單總表(舊)";
		view.Content = "我發出的工單";
		view.Content_Func = function()
		{
			//我發出的工單首頁
			createMyTaskPage(true);
		};
		createMainpage_Menu(view);
		$("div[myId='我發出的工單']").css('margin-left','-23px');
		//我簽核的工單
		var ProcessingView = {};
		ProcessingView.Title = "工單總表(舊)";
		ProcessingView.Content = "我簽核的工單";
		ProcessingView.Content_Func = function()
		{
			//我簽核的工單首頁
			createMyProcessingTaskPage(true);
		};
		createMainpage_Menu(ProcessingView);
		$("div[myId='我簽核的工單']").css('margin-left','-23px');
		//我執行的工單
		var ExecuteView = {};
		ExecuteView.Title = "工單總表(舊)";
		ExecuteView.Content = "我執行的工單";
		ExecuteView.Content_Func = function()
		{
			//我簽核的工單首頁
			createMyExecuteTaskPage(true);
		};
		createMainpage_Menu(ExecuteView);
		$("div[myId='我執行的工單']").css('margin-left','-23px');
		//查詢工單
		var SelectView = {};
		SelectView.Title = "工單總表(舊)";
		SelectView.Content = "查詢工單";
		SelectView.Content_Func = function()
		{
			//查詢工單首頁
			createSelectViewTaskWindow(true);
		};
		createMainpage_Menu(SelectView);
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
});

//我發出的工單頁面
function createMyTaskPage(firstView)
{
	try
	{
		//新增一個 tab
		addTab('taskTab_Y01',language["list_myTask"][languageStatus]);
		var myTaskStatus="";
		//建立daily grid
		myTaskView = Grid_Panel_Define.Initialize();
		myTaskView.setId('taskTab_Y01');
		myTaskView.setResizer_ID('myTaskViewPage_Y01');
		myTaskView.setHeader_Title(['No.','ID',"工單編號","工單名稱","發單者","檢查者","接單者","開始時間","結束時間","工單狀態",'TaskAssignedListID']);
		myTaskView.setModel(['Number','TaskAssignedID','TaskAssignedNumber','TaskAssignedTitle','OwnerName','MainCheckEmployeeName','MainResponsibleEmployeeName','TaskAssignedStartTime','TaskAssignedEndTime','TaskAssignedStatus','TaskAssignedListID']);
		myTaskView.setPagesize(10);
		myTaskView.setfieldShow([true,false,true,true,false,true,true,true,true,true,false]);
		myTaskView.setHeader_Width(['5%','0%','10%','15%','0%','10%','10%','15%','15%','19%','0%']); // 99.5%
		myTaskView.createPagging();
		myTaskView.addPagging_Button('newTaskButton',language["newTask"][languageStatus]);
		myTaskView.createHeader();
		myTaskView.createTable();
		//修改高度
		$('#taskTab_Y01_Table').css('height','calc(100% - 150px)');
		$('#newTaskButton').click(function(){
			newTaskFunction();
		});
		//改寫欄位
		myTaskView.setLoad_Callback(function()
		{
			for(var i = 0; i < $('#taskTab_Y01_Table').children().length; i++)
			{
				//編號
				$('#taskTab_Y01_Table_Inner_' + i).children().eq(0).html(i+1+myTaskView.getStart());
				//時間欄位顯示設定
				$('#taskTab_Y01_Table_Inner_' + i).children().eq(7).html(getDate($('#taskTab_Y01_Table_Inner_' + i).children().eq(7).html()) + ' ' + getTime($('#taskTab_Y01_Table_Inner_' + i).children().eq(7).html()));
				$('#taskTab_Y01_Table_Inner_' + i).children().eq(8).html(getDate($('#taskTab_Y01_Table_Inner_' + i).children().eq(8).html()) + ' ' + getTime($('#taskTab_Y01_Table_Inner_' + i).children().eq(8).html()));
				//設定雙點擊事件
				$('#taskTab_Y01_Table_Inner_' + i).dblclick(function(){
					var params={};
					params.statusHtml=$('#'+this.id).children().eq(9).html();
					params.MyTaskID=$('#'+this.id).children().eq(1).html();
					params.TaskAssignedListID=$('#'+this.id).children().eq(10).html();
					if($('#taskTab_Y01_content').size()){
						$('#taskTab_Y01_content').empty();
						createMyTaskContentPage(params,myTaskStatus);
					}else{
						createMyTaskContentPage(params,myTaskStatus);
					}
				});
				//狀態顯示
				if($('#taskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="工單成功完成"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:140px;color:white;background-color:green;margin:0px auto;border-radius:4px'>"+language["task_status_success"][languageStatus]+"</div>";
					$('#taskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#taskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="進行中"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:80px;color:white;background-color:blue;margin:0px auto;border-radius:4px'>"+language["task_status_doing"][languageStatus]+"</div>";
					$('#taskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#taskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="工單逾期失敗"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:80px;color:white;background-color:red;margin:0px auto;border-radius:4px'>"+language["task_status_fail"][languageStatus]+"</div>";
					$('#taskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#taskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="已逾期,等待開單者確認"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:140px;color:white;background-color:red;margin:0px auto;border-radius:4px'>"+language["task_status_waitcheck"][languageStatus]+"</div>";
					$('#taskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#taskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="執行人不同意執行"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:140px;color:white;background-color:red;margin:0px auto;border-radius:4px'>"+language["task_status_maindont"][languageStatus]+"</div>";
					$('#taskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#taskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="作廢工單"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:70px;color:white;background-color:red;margin:0px auto;border-radius:4px'>"+language["task_status_failtask"][languageStatus]+"</div>";
					$('#taskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#taskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="失敗"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:70px;color:white;background-color:red;margin:0px auto;border-radius:4px'>"+language["task_status_failtask"][languageStatus]+"</div>";
					$('#taskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#taskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="檢查人檢查失敗"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:140px;color:white;background-color:red;margin:0px auto;border-radius:4px'>"+language["task_status_checkfail"][languageStatus]+"</div>";
					$('#taskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#taskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="執行人放棄執行"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:140px;color:white;background-color:red;margin:0px auto;border-radius:4px'>"+language["task_status_domanquit"][languageStatus]+"</div>";
					$('#taskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#taskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="必要通知人不同意執行"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:140px;color:white;background-color:red;margin:0px auto;border-radius:4px'>"+language["task_status_taskingquit"][languageStatus]+"</div>";
					$('#taskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}
				
				
			};
		});
		//設定網址取用方法
		myTaskView.getUrl = function getUrl()
		{
			try
			{
				//組合參數
				var Start = myTaskView.getStart();
				var Limit = myTaskView.getPagesize();
				var dc = (+new Date());
				return localStorage.task+"/Task/me/General?status=processing&start="+Start+"&limit="+Limit+"&_dc="+dc;
			}
			catch(err)
			{
				if(App_Debug)
				{
					console.log(err);
				}
			}
		}
		//新增 settingHeader
		new function()
		{
			//新增 Header
			$('#' + myTaskView.getId()).prepend("<div id='task_Y02_myTaskView_settingHeader'></div>");
			$("#task_Y02_myTaskView_settingHeader").css
			({
				"height":"50px",
			    "width":"101%",
		        "margin-left":"-1px",
			    "background-color":"rgb(22, 103, 119)",
			    "position":"relative"
			});
			var task_Y02_myTaskView_settingHeader_Button_Class = 
			{
				"height":"24px",
				"width":"135px",
				"font-size":'16pt',
				"color":"white",
				"text-align":"center",
				"padding-bottom":"5px",
				"border-bottom-style":"solid",
				"border-color":"rgb(22, 103, 119)",
				"border-width":'3px',
				"float":"left",
				"position":"absolute",
				"top":"0px",
				"right":"0px",
				"bottom":"0px",
				"margin":"auto",
				"cursor":"pointer"
			};
			//進行中
			$("#task_Y02_myTaskView_settingHeader").append("<div id='task_Y02_myTaskView_settingHeader_Button01'></div>");
			$("#task_Y02_myTaskView_settingHeader_Button01").html(language["status_onDoing"][languageStatus]);
			$("#task_Y02_myTaskView_settingHeader_Button01").css(task_Y02_myTaskView_settingHeader_Button_Class);
			$("#task_Y02_myTaskView_settingHeader_Button01").css("left","-66.67%");
			$("#task_Y02_myTaskView_settingHeader_Button01").click(function()
			{
				//設定頁面初始值
				myTaskView.setStart(0);
				myTaskView.setPage(1);
				myTaskStatus="processing";
				$("#task_Y02_myTaskView_settingHeader_Button01").css("border-color","rgb(33, 183, 208)");
				$("#task_Y02_myTaskView_settingHeader_Button02").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myTaskView_settingHeader_Button03").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myTaskView_settingHeader_Button04").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myTaskView_settingHeader_Button05").css("border-color","rgb(22, 103, 119)");
				//設定網址取用方法
				myTaskView.getUrl = function getUrl()
				{
					try
					{
						//組合參數
						var Start = myTaskView.getStart();
						var Limit = myTaskView.getPagesize();
						var dc = (+new Date());
						return localStorage.task+"/Task/me/General?status=processing&start="+Start+"&limit="+Limit+"&_dc="+dc;
					}
					catch(err)
					{
						if(App_Debug)
						{
							console.log(err);
						}
					}
				}
				//載入資料
				myTaskView.load();
			});
			//已成功
			$("#task_Y02_myTaskView_settingHeader").append("<div id='task_Y02_myTaskView_settingHeader_Button02'></div>");
			$("#task_Y02_myTaskView_settingHeader_Button02").html(language["status_success"][languageStatus]);
			$("#task_Y02_myTaskView_settingHeader_Button02").css(task_Y02_myTaskView_settingHeader_Button_Class);
			$("#task_Y02_myTaskView_settingHeader_Button02").css("left","-33.34%");
			$("#task_Y02_myTaskView_settingHeader_Button02").click(function()
			{
				//設定頁面初始值
				myTaskView.setStart(0);
				myTaskView.setPage(1);
				myTaskStatus="success";
				$("#task_Y02_myTaskView_settingHeader_Button01").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myTaskView_settingHeader_Button02").css("border-color","rgb(33, 183, 208)");
				$("#task_Y02_myTaskView_settingHeader_Button03").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myTaskView_settingHeader_Button04").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myTaskView_settingHeader_Button05").css("border-color","rgb(22, 103, 119)");
				//設定網址取用方法
				myTaskView.getUrl = function getUrl()
				{
					try
					{
						//組合參數
						var Start = myTaskView.getStart();
						var Limit = myTaskView.getPagesize();
						var dc = (+new Date());
						return localStorage.task+"/Task/me/General?status=success&start="+Start+"&limit="+Limit+"&_dc="+dc;
					}
					catch(err)
					{
						if(App_Debug)
						{
							console.log(err);
						}
					}
				}
				//載入資料
				myTaskView.load();
			});
			//已失敗
			$("#task_Y02_myTaskView_settingHeader").append("<div id='task_Y02_myTaskView_settingHeader_Button03'></div>");
			$("#task_Y02_myTaskView_settingHeader_Button03").html(language["status_fail"][languageStatus]);
			$("#task_Y02_myTaskView_settingHeader_Button03").css(task_Y02_myTaskView_settingHeader_Button_Class);
			$("#task_Y02_myTaskView_settingHeader_Button03").css("left","0%");
			$("#task_Y02_myTaskView_settingHeader_Button03").css("left","0px");
			$("#task_Y02_myTaskView_settingHeader_Button03").click(function()
			{
				//設定頁面初始值
				myTaskView.setStart(0);
				myTaskView.setPage(1);
				myTaskStatus="fail";
				$("#task_Y02_myTaskView_settingHeader_Button01").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myTaskView_settingHeader_Button02").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myTaskView_settingHeader_Button03").css("border-color","rgb(33, 183, 208)");
				$("#task_Y02_myTaskView_settingHeader_Button04").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myTaskView_settingHeader_Button05").css("border-color","rgb(22, 103, 119)");
				//設定網址取用方法
				myTaskView.getUrl = function getUrl()
				{
					try
					{
						//組合參數
						var Start = myTaskView.getStart();
						var Limit = myTaskView.getPagesize();
						var dc = (+new Date());
						return localStorage.task+"/Task/me/General?status=fail&start="+Start+"&limit="+Limit+"&_dc="+dc;
					}
					catch(err)
					{
						if(App_Debug)
						{
							console.log(err);
						}
					}
				}
				//載入資料
				myTaskView.load();
			});
			//待處理
			$("#task_Y02_myTaskView_settingHeader").append("<div id='task_Y02_myTaskView_settingHeader_Button04'></div>");
			$("#task_Y02_myTaskView_settingHeader_Button04").html(language["status_wait"][languageStatus]);
			$("#task_Y02_myTaskView_settingHeader_Button04").css(task_Y02_myTaskView_settingHeader_Button_Class);
			$("#task_Y02_myTaskView_settingHeader_Button04").css("left","33.34%");
			$("#task_Y02_myTaskView_settingHeader_Button04").click(function()
			{
				//設定頁面初始值
				myTaskView.setStart(0);
				myTaskView.setPage(1);
				myTaskStatus="processed";
				$("#task_Y02_myTaskView_settingHeader_Button01").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myTaskView_settingHeader_Button02").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myTaskView_settingHeader_Button03").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myTaskView_settingHeader_Button04").css("border-color","rgb(33, 183, 208)");
				$("#task_Y02_myTaskView_settingHeader_Button05").css("border-color","rgb(22, 103, 119)");
				//設定網址取用方法
				myTaskView.getUrl = function getUrl()
				{
					try
					{
						//組合參數
						var Start = myTaskView.getStart();
						var Limit = myTaskView.getPagesize();
						var dc = (+new Date());
						return localStorage.task+"/Task/me/General?status=processed&start="+Start+"&limit="+Limit+"&_dc="+dc;
					}
					catch(err)
					{
						if(App_Debug)
						{
							console.log(err);
						}
					}
				}
				//載入資料
				myTaskView.load();
			});
			//已作廢
			$("#task_Y02_myTaskView_settingHeader").append("<div id='task_Y02_myTaskView_settingHeader_Button05'></div>");
			$("#task_Y02_myTaskView_settingHeader_Button05").html(language["status_invalid"][languageStatus]);
			$("#task_Y02_myTaskView_settingHeader_Button05").css(task_Y02_myTaskView_settingHeader_Button_Class);
			$("#task_Y02_myTaskView_settingHeader_Button05").css("left","66.67%");
			$("#task_Y02_myTaskView_settingHeader_Button05").click(function()
			{
				//設定頁面初始值
				myTaskView.setStart(0);
				myTaskView.setPage(1);
				myTaskStatus="invalid";
				$("#task_Y02_myTaskView_settingHeader_Button01").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myTaskView_settingHeader_Button02").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myTaskView_settingHeader_Button03").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myTaskView_settingHeader_Button04").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myTaskView_settingHeader_Button05").css("border-color","rgb(33, 183, 208)");
				//設定網址取用方法
				myTaskView.getUrl = function getUrl()
				{
					try
					{
						//組合參數
						var Start = myTaskView.getStart();
						var Limit = myTaskView.getPagesize();
						var dc = (+new Date());
						return localStorage.task+"/Task/me/General?status=invalid&start="+Start+"&limit="+Limit+"&_dc="+dc;
					}
					catch(err)
					{
						if(App_Debug)
						{
							console.log(err);
						}
					}
				}
				//載入資料
				myTaskView.load();
			});
		}
		//預設 settingHeader
		if(firstView){
			$("#task_Y02_myTaskView_settingHeader_Button01").click();
		}else{
			$("#task_Y02_myTaskView_settingHeader_Button04").click();
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

//我發出的工單內容頁面
function createMyTaskContentPage(params,myTaskStatus)
{
	try
	{
		//新增一個 tab
		addTab('taskTab_Y01_content',language["task_myDetail"][languageStatus]);
		//取得daily Content
		var dc = (+new Date());
		jqueryAjax_Get(localStorage.daily+"/Task/me/General/"+params.MyTaskID+"?_dc="+dc,
			//成功後
			function(result){
				//主頁面
				$('#taskTab_Y01_content').append('<div id="taskTab_Y01_content_main"></div>');
				$('#taskTab_Y01_content_main').css({
					"background-color":"#cecece",
					"height":"calc(100% - 35px)",
					"width":"100%",
					"position":"absolute"
				});
				//主白色框架內容
				$('#taskTab_Y01_content_main').append('<div id="taskTab_Y01_content_whitePanel"></div>');
				$('#taskTab_Y01_content_whitePanel').css({
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
				$('#taskTab_Y01_content_whitePanel').append("<div id='taskTab_Y01_content_Number'>"+language["TaskAssignedNumber"][languageStatus]+"："+TaskAssignedNumber+"</div>");
				$('#taskTab_Y01_content_Number').css({
								"font-size":"12pt",
								"margin-top":"30px",
								"margin-left":"250px"
								});
				//TitleText
				var TitleText=result.data.TaskAssignedTitle;
				$('#taskTab_Y01_content_whitePanel').append("<div id='taskTab_Y01_content_titleText'>"+language["TaskAssignedTitle"][languageStatus]+"："+TitleText+"</div>");
				$('#taskTab_Y01_content_titleText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//createDateText
				var createDateText=getDate(result.data.TaskAssignedCreateTime)+" "+getTime(result.data.TaskAssignedCreateTime);
				$('#taskTab_Y01_content_whitePanel').append("<div id='taskTab_Y01_content_createDateText'>"+language["TaskAssignedCreateTime"][languageStatus]+"："+createDateText+"</div>");
				$('#taskTab_Y01_content_createDateText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//startDateText
				var startDateText=getDate(result.data.TaskAssignedStartTime)+" "+getTime(result.data.TaskAssignedStartTime);
				$('#taskTab_Y01_content_whitePanel').append("<div id='taskTab_Y01_content_startDateText'>"+language["TaskAssignedStartTime"][languageStatus]+"："+startDateText+"</div>");
				$('#taskTab_Y01_content_startDateText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//endDateText
				var endDateText=getDate(result.data.TaskAssignedEndTime)+" "+getTime(result.data.TaskAssignedEndTime);
				$('#taskTab_Y01_content_whitePanel').append("<div id='taskTab_Y01_content_endDateText'>"+language["TaskAssignedEndTime"][languageStatus]+"："+endDateText+"</div>");
				$('#taskTab_Y01_content_endDateText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//OwnerNameText
				var ownerNameText=result.data.OwnerName;
				$('#taskTab_Y01_content_whitePanel').append("<div id='taskTab_Y01_content_OwnerNameText'>"+language["OwnerName"][languageStatus]+"："+ownerNameText+"</div>");
				$('#taskTab_Y01_content_OwnerNameText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//MainCheckEmployeeNameText
				var mainCheckEmployeeNameText=result.data.MainCheckEmployeeName;
				$('#taskTab_Y01_content_whitePanel').append("<div id='taskTab_Y01_content_MainCheckEmployeeNameText'>"+language["MainCheckEmployeeName"][languageStatus]+"："+mainCheckEmployeeNameText+"</div>");
				$('#taskTab_Y01_content_MainCheckEmployeeNameText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//MainResponsibleEmployeeNameText
				var mainResponsibleEmployeeNameText=result.data.MainResponsibleEmployeeName;
				$('#taskTab_Y01_content_whitePanel').append("<div id='taskTab_Y01_content_MainResponsibleEmployeeNameText'>"+language["MainResponsibleEmployeeName"][languageStatus]+"："+mainResponsibleEmployeeNameText+"</div>");
				$('#taskTab_Y01_content_MainResponsibleEmployeeNameText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//successPoint
				var TaskAssignedSuccessRewardText=result.data.TaskAssignedSuccessReward;
				$('#taskTab_Y01_content_whitePanel').append("<div id='taskTab_Y01_content_TaskAssignedSuccessRewardText'>"+language["task_successPoint"][languageStatus]+"："+TaskAssignedSuccessRewardText+"</div>");
				$('#taskTab_Y01_content_TaskAssignedSuccessRewardText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//failPoint
				var TaskAssignedFailPunishText=result.data.TaskAssignedFailPunish;
				$('#taskTab_Y01_content_whitePanel').append("<div id='taskTab_Y01_content_TaskAssignedFailPunishText'>"+language["task_failPoint"][languageStatus]+"："+TaskAssignedFailPunishText+"</div>");
				$('#taskTab_Y01_content_TaskAssignedFailPunishText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//TaskAssignedStatusText
				var taskAssignedStatusText=result.data.TaskAssignedStatus;
				$('#taskTab_Y01_content_whitePanel').append("<div id='taskTab_Y01_content_TaskAssignedStatusText'>"+language["TaskAssignedStatus"][languageStatus]+"："+taskAssignedStatusText+"</div>");
				$('#taskTab_Y01_content_TaskAssignedStatusText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//簽核按鈕
				if(myTaskStatus=="processed"){
					$('#taskTab_Y01_content_whitePanel').append("<button id='taskTab_Y01_content_singOffButton'>"+language["task_sing"][languageStatus]+"</button>");
					$('#taskTab_Y01_content_singOffButton').css({
									"width":"150px",
									"height":"40px",
									"font-size":"12pt",
									"border-radius":"10px",
									"position":"absolute",
									"right":"10px",
									"top":"30px",
									"background-color":"rgb(236,113,116)",
									"color":"white"
									});
					$('#taskTab_Y01_content_singOffButton').click(function(){
						singOffmineMineWindow(params,myTaskStatus);
					});
				}
				//contentPanel
				$('#taskTab_Y01_content_whitePanel').append('<div id="taskTab_Y01_content_ContentPanel"></div>');
				$('#taskTab_Y01_content_ContentPanel').css({
					"background-color":"rgb(255, 255, 255)",
					"border-radius":"15pt",
					"height":"200px",
					"width":"400px",
					"margin-left":"240px",
					"margin-top":"15px",
					"position":"absolute",
					"border-style":"groove",
					"box-shadow":"2px 2px rgba(20%,20%,40%,0.5)",
				});
				//contentPanelTitle
				$('#taskTab_Y01_content_ContentPanel').append('<div id="taskTab_Y01_content_ContentPanelTitle">'+language["TaskAssignedContent"][languageStatus]+'</div>');
				$('#taskTab_Y01_content_ContentPanelTitle').css({
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
				    "filter": "progid:DXImageTransform.Microsoft.gradient( startColorstr='#5474a5', endColorstr='#6690be',GradientType=1 )",

				});
				//contentText
				var taskContentText=result.data.TaskAssignedContent;
				$('#taskTab_Y01_content_ContentPanel').append("<div id='taskTab_Y01_content_contentText'>"+taskContentText+"</div>");
				$('#taskTab_Y01_content_contentText').css({
								"width":"360px",
								"height":"200px",
								"font-size":"12pt",
								"margin-top":"10px",
								"margin-left":"20px",
								"word-wrap":"break-word",
								"overflow":"auto"
								});
				//流程框架內容
				$('#taskTab_Y01_content_main').append('<div id="taskTab_Y01_content_whiteListPanel"></div>');
				$('#taskTab_Y01_content_whiteListPanel').css({
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
				$('#taskTab_Y01_content_whiteListPanel').append("<div id='taskTab_Y01_content_listTitleText'>"+language["task_schedule"][languageStatus]+"</div>");
				$('#taskTab_Y01_content_listTitleText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"text-align":"center"
								});
				//工單流程圖筐
				$('#taskTab_Y01_content_whiteListPanel').append("<div id='taskTab_Y01_content_listChartView'></div>");
				$('#taskTab_Y01_content_listChartView').css({
								"height":"calc(100% - 21px)",
								"font-size":"12pt",
								"margin-top":"15px",
								"width":"300px",
								"text-align":"center",
								"position":"absolute",
								"word-wrap":"break-word",
								"overflow":"auto"
								});
				//流程線框架
				$('#taskTab_Y01_content_listChartView').append("<div id='taskTab_Y01_content_listChartLineContent'></div>");
				$('#taskTab_Y01_content_listChartLineContent').css({
								"height":"600px",
								"font-size":"12pt",
								"margin-top":"15px",
								"width":"60px",
								"text-align":"center",
								"position":"absolute",
								});
				jqueryAjax_Get(localStorage.daily+"/Task/me/General/"+params.MyTaskID+"/list?_dc="+dc,
					//成功後
					function(result){
						//將每個流程會製成圖
						for(var i=0;i<result.data.length;i++){
							var output=result.data[i];
							var inputColor="";
							var imgSrc="";
							var line1Height="0px";
							var line2Height="160px";
							//繪製流程線
							if(output.TaskAssignedExecutionStatus=="已完成"){
								inputColor="green";
								imgSrc="status_completed";
								line1Height="15px";
								line2Height="180px";
							}else if(output.TaskAssignedExecutionStatus=="進行中"){
								inputColor="#005AB5";
								imgSrc="status_in-progress";
								line1Height="10px";
								line2Height="170px";
							}else if(output.TaskAssignedExecutionStatus=="已失敗"){
								inputColor="red";
								imgSrc="status_fail";
								line1Height="10px";
								line2Height="170px";
							}else{
								inputColor="rgb(206,206,206)";
								imgSrc="status_not-work";
							}
							$('#taskTab_Y01_content_listChartLineContent').append("<div id='taskTab_Y01_content_listChartLine1_"+i+"'></div>");
								$('#taskTab_Y01_content_listChartLine1_'+i).css({
												"border-left-style":"solid",
												"border-width":"2px",
												"width":"2px",
												"height":line1Height,
												"border-color":inputColor,
												"margin-left":"30px"
												});
								$('#taskTab_Y01_content_listChartLineContent').append("<img src='./image/"+imgSrc+".png' id='taskTab_Y01_content_listChartLineIMG_"+i+"'></img>");
								$('#taskTab_Y01_content_listChartLineIMG_'+i).css({
												"position":"absolute",
												"margin-top":"-10px",
												"margin-left":"-15px",
												});
								$('#taskTab_Y01_content_listChartLineContent').append("<div id='taskTab_Y01_content_listChartLine2_"+i+"'></div>");
								$('#taskTab_Y01_content_listChartLine2_'+i).css({
												"border-left-style":"solid",
												"border-width":"2px",
												"width":"2px",
												"height":line2Height,
												"border-color":inputColor,
												"margin-left":"30px"
												});
							//小白筐
							$('#taskTab_Y01_content_listChartView').append("<div id='taskTab_Y01_content_listChartDiv_"+i+"'></div>");
							$('#taskTab_Y01_content_listChartDiv_'+i).css({
											"height":"150px",
											"font-size":"12pt",
											"margin-top":"15px",
											"width":"200px",
											"color":"white",
											"border-radius":"15pt",
											"margin-left":"80px",
											"text-align":"center",	
											"word-wrap":"break-word",
											"overflow":"auto",										
											"background-color":inputColor
											});
							//員工姓名
							$('#taskTab_Y01_content_listChartDiv_'+i).append("<div id='taskTab_Y01_content_listChartName_"+i+"'>"+language["task_employeeName"][languageStatus]+"："+output.OwnerName+"</div>");
							$('#taskTab_Y01_content_listChartName_'+i).css({
											"font-size":"12pt",
											"margin-top":"10px",
											"margin-left":"20px",
											"text-align":"left"
											});
							//員工身份
							$('#taskTab_Y01_content_listChartDiv_'+i).append("<div id='taskTab_Y01_content_listChartExplanation_"+i+"'>"+language["task_employeeIdentification"][languageStatus]+"："+output.TaskAssignedExplanation+"</div>");
							$('#taskTab_Y01_content_listChartExplanation_'+i).css({
											"font-size":"12pt",
											"margin-top":"10px",
											"margin-left":"20px",
											"text-align":"left"
											});
							//開單狀態
							$('#taskTab_Y01_content_listChartDiv_'+i).append("<div id='taskTab_Y01_content_listChartStatus_"+i+"'>"+language["TaskAssignedStatus"][languageStatus]+"："+((output.TaskAssignedExecutionStatus == null || output.TaskAssignedExecutionStatus == '')?"無":output.TaskAssignedExecutionStatus)+"</div>");
							$('#taskTab_Y01_content_listChartStatus_'+i).css({
											"font-size":"12pt",
											"margin-top":"10px",
											"margin-left":"20px",
											"text-align":"left"
											});
							//工單意見
							$('#taskTab_Y01_content_listChartDiv_'+i).append("<div id='taskTab_Y01_content_listChartExecution_"+i+"'>"+language["task_employeeFeedback"][languageStatus]+"："+((output.TaskAssignedExecutionContent == null || output.TaskAssignedExecutionContent == '')?"無":output.TaskAssignedExecutionContent)+"</div>");
							$('#taskTab_Y01_content_listChartExecution_'+i).css({
											"font-size":"12pt",
											"margin-top":"10px",
											"margin-left":"20px",
											"text-align":"left"
											});
							//開單時間
							if(output.TaskAssignedExecutionTime){
								$('#taskTab_Y01_content_listChartView').append("<div id='taskTab_Y01_content_listChartTime_"+i+"'>"+getDate(output.TaskAssignedExecutionTime)+" "+getTime(output.TaskAssignedExecutionTime)+"</div>");
								$('#taskTab_Y01_content_listChartTime_'+i).css({
												"font-size":"10pt",
												"margin-top":"10px",
												"margin-left":"100px",
												"text-align":"left"
												});
							}
							
						}
					},
					//失敗時
					function(){
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
			},
			//失敗時
			function(){
				var taskContentErr_Msg = YesNo_Msg_Define.Initialize();
				taskContentErr_Msg.setMask(false);
				taskContentErr_Msg.setSmartdetect(false);
				taskContentErr_Msg.setWidth(300);
				taskContentErr_Msg.setHeight(168);
				taskContentErr_Msg.setId('taskContentErr_Msg');
				taskContentErr_Msg.setTitle(language["system_error"][languageStatus]);
				taskContentErr_Msg.show();
				taskContentErr_Msg.addMsgContent(error.message);
				taskContentErr_Msg.addYesNO_Button('',language["system_ok"][languageStatus],null,
				function()
				{
					//關閉 Msg
				    taskContentErr_Msg.close();
				});
				//隱藏 No 按鈕
				$('#taskContentErr_Msg_No').css("display","none");
				//置中 Yes 按鈕
				$('#taskContentErr_Msg_Yes').css({"margin-left":"0px","width":"100%"});
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

//我簽核的工單頁面
function createMyProcessingTaskPage(firstView)
{
	try
	{
		//新增一個 tab
		addTab('processingTaskTab_Y01',language["list_mySing"][languageStatus]);
		var ProcessingTaskStatus="";
		//建立daily grid
		myProcessingTaskView = Grid_Panel_Define.Initialize();
		myProcessingTaskView.setId('processingTaskTab_Y01');
		myProcessingTaskView.setResizer_ID('myProcessingTaskViewPage_Y01');
		myProcessingTaskView.setHeader_Title(['No.','ID',"工單編號","工單名稱","發單者","檢查者","接單者","開始時間","結束時間","工單狀態",'TaskAssignedListID','TaskAssignedOwner','TaskAssignedMainCheck']);
		myProcessingTaskView.setModel(['Number','TaskAssignedID','TaskAssignedNumber','TaskAssignedTitle','OwnerName','MainCheckEmployeeName','MainResponsibleEmployeeName','TaskAssignedStartTime','TaskAssignedEndTime','TaskAssignedStatus','TaskAssignedListID','TaskAssignedOwner','TaskAssignedMainCheck']);
		myProcessingTaskView.setPagesize(10);
		myProcessingTaskView.setfieldShow([true,false,true,true,false,true,true,true,true,true,false,false,false]);
		myProcessingTaskView.setHeader_Width(['5%','0%','10%','15%','0%','10%','10%','15%','15%','19%','0%','0%','0%']); // 99.5%
		myProcessingTaskView.createHeader();
		myProcessingTaskView.createTable();
		//修改高度
		$('#processingTaskTab_Y01_Table').css('height','calc(100% - 150px)');
		//改寫欄位
		myProcessingTaskView.setLoad_Callback(function()
		{
			for(var i = 0; i < $('#processingTaskTab_Y01_Table').children().length; i++)
			{
				//編號
				$('#processingTaskTab_Y01_Table_Inner_' + i).children().eq(0).html(i+1+myProcessingTaskView.getStart());
				//時間欄位顯示設定
				$('#processingTaskTab_Y01_Table_Inner_' + i).children().eq(7).html(getDate($('#processingTaskTab_Y01_Table_Inner_' + i).children().eq(7).html()) + ' ' + getTime($('#processingTaskTab_Y01_Table_Inner_' + i).children().eq(7).html()));
				$('#processingTaskTab_Y01_Table_Inner_' + i).children().eq(8).html(getDate($('#processingTaskTab_Y01_Table_Inner_' + i).children().eq(8).html()) + ' ' + getTime($('#processingTaskTab_Y01_Table_Inner_' + i).children().eq(8).html()));
				//狀態顯示
				if($('#processingTaskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="工單成功完成"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:140px;color:white;background-color:green;margin:0px auto;border-radius:4px'>"+language["task_status_success"][languageStatus]+"</div>";
					$('#processingTaskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#processingTaskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="進行中"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:80px;color:white;background-color:blue;margin:0px auto;border-radius:4px'>"+language["task_status_doing"][languageStatus]+"</div>";
					$('#processingTaskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#processingTaskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="工單逾期失敗"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:80px;color:white;background-color:red;margin:0px auto;border-radius:4px'>"+language["task_status_fail"][languageStatus]+"</div>";
					$('#processingTaskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#processingTaskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="已逾期,等待開單者確認"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:140px;color:white;background-color:red;margin:0px auto;border-radius:4px'>"+language["task_status_waitcheck"][languageStatus]+"</div>";
					$('#processingTaskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#processingTaskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="執行人不同意執行"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:140px;color:white;background-color:red;margin:0px auto;border-radius:4px'>"+language["task_status_maindont"][languageStatus]+"</div>";
					$('#processingTaskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#processingTaskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="作廢工單"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:70px;color:white;background-color:red;margin:0px auto;border-radius:4px'>"+language["task_status_failtask"][languageStatus]+"</div>";
					$('#processingTaskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#processingTaskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="失敗"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:70px;color:white;background-color:red;margin:0px auto;border-radius:4px'>"+language["task_status_failtask"][languageStatus]+"</div>";
					$('#processingTaskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#processingTaskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="檢查人檢查失敗"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:140px;color:white;background-color:red;margin:0px auto;border-radius:4px'>"+language["task_status_checkfail"][languageStatus]+"</div>";
					$('#processingTaskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#processingTaskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="執行人放棄執行"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:140px;color:white;background-color:red;margin:0px auto;border-radius:4px'>"+language["task_status_domanquit"][languageStatus]+"</div>";
					$('#processingTaskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#processingTaskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="必要通知人不同意執行"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:140px;color:white;background-color:red;margin:0px auto;border-radius:4px'>"+language["task_status_taskingquit"][languageStatus]+"</div>";
					$('#processingTaskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}

				//設定雙點擊事件
				$('#processingTaskTab_Y01_Table_Inner_' + i).dblclick(function(){
					var params={};
					params.OwnerId=$('#'+this.id).children().eq(11).html();
					params.MyTaskID=$('#'+this.id).children().eq(1).html();
					params.TaskAssignedListID=$('#'+this.id).children().eq(10).html();
					params.TaskAssignedMainCheck=$('#'+this.id).children().eq(12).html();
					if($('#processingTaskTab_Y01_content').size()){
						$('#processingTaskTab_Y01_content').empty();
						createMyProcessingContentPage(params,ProcessingTaskStatus);
					}else{
						createMyProcessingContentPage(params,ProcessingTaskStatus);
					}
				});
				
			};
		});
		myProcessingTaskView.createPagging();
		//設定網址取用方法
		myProcessingTaskView.getUrl = function getUrl()
		{
			try
			{
				//組合參數
				var Start = myProcessingTaskView.getStart();
				var Limit = myProcessingTaskView.getPagesize();
				var dc = (+new Date());
				return localStorage.task+"/Task/me/General/Processing?status=processing&start="+Start+"&limit="+Limit+"&_dc="+dc;
			}
			catch(err)
			{
				if(App_Debug)
				{
					console.log(err);
				}
			}
		}

		//新增 settingHeader
		new function()
		{
			//新增 Header
			$('#' + myProcessingTaskView.getId()).prepend("<div id='task_Y02_myProcessing_settingHeader'></div>");
			$("#task_Y02_myProcessing_settingHeader").css
			({
				"height":"50px",
			    "width":"101%",
		        "margin-left":"-1px",
			    "background-color":"rgb(22, 103, 119)",
			    "position":"relative"
			});
			var task_Y02_myProcessing_settingHeader_Button_Class = 
			{
				"height":"24px",
				"width":"100px",
				"font-size":'16pt',
				"color":"white",
				"text-align":"center",
				"padding-bottom":"5px",
				"border-bottom-style":"solid",
				"border-color":"rgb(22, 103, 119)",
				"border-width":'3px',
				"float":"left",
				"position":"absolute",
				"top":"0px",
				"right":"0px",
				"bottom":"0px",
				"margin":"auto",
				"cursor":"pointer"
			};
			//待簽核
			$("#task_Y02_myProcessing_settingHeader").append("<div id='task_Y02_myProcessing_settingHeader_Button01'></div>");
			$("#task_Y02_myProcessing_settingHeader_Button01").html(language["status_waitSing"][languageStatus]);
			$("#task_Y02_myProcessing_settingHeader_Button01").css(task_Y02_myProcessing_settingHeader_Button_Class);
			$("#task_Y02_myProcessing_settingHeader_Button01").css("left","-50%");
			$("#task_Y02_myProcessing_settingHeader_Button01").click(function()
			{
				//設定頁面初始值
				myProcessingTaskView.setStart(0);
				myProcessingTaskView.setPage(1);
				ProcessingTaskStatus="processing";
				$("#task_Y02_myProcessing_settingHeader_Button01").css("border-color","rgb(33, 183, 208)");
				$("#task_Y02_myProcessing_settingHeader_Button02").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myProcessing_settingHeader_Button03").css("border-color","rgb(22, 103, 119)");
				//設定網址取用方法
				myProcessingTaskView.getUrl = function getUrl()
				{
					try
					{
						//組合參數
						var Start = myProcessingTaskView.getStart();
						var Limit = myProcessingTaskView.getPagesize();
						var dc = (+new Date());
						return localStorage.task+"/Task/me/General/Processing?status=processing&start="+Start+"&limit="+Limit+"&_dc="+dc;
					}
					catch(err)
					{
						if(App_Debug)
						{
							console.log(err);
						}
					}
				}
				//載入資料
				myProcessingTaskView.load();
			});
			//已簽核
			$("#task_Y02_myProcessing_settingHeader").append("<div id='task_Y02_myProcessing_settingHeader_Button02'></div>");
			$("#task_Y02_myProcessing_settingHeader_Button02").html(language["status_Singed"][languageStatus]);
			$("#task_Y02_myProcessing_settingHeader_Button02").css(task_Y02_myProcessing_settingHeader_Button_Class);
			$("#task_Y02_myProcessing_settingHeader_Button02").css("left","0%");
			$("#task_Y02_myProcessing_settingHeader_Button02").click(function()
			{
				//設定頁面初始值
				myProcessingTaskView.setStart(0);
				myProcessingTaskView.setPage(1);
				ProcessingTaskStatus="processed";
				$("#task_Y02_myProcessing_settingHeader_Button01").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myProcessing_settingHeader_Button02").css("border-color","rgb(33, 183, 208)");
				$("#task_Y02_myProcessing_settingHeader_Button03").css("border-color","rgb(22, 103, 119)");
				//設定網址取用方法
				myProcessingTaskView.getUrl = function getUrl()
				{
					try
					{
						//組合參數
						var Start = myProcessingTaskView.getStart();
						var Limit = myProcessingTaskView.getPagesize();
						var dc = (+new Date());
						return localStorage.task+"/Task/me/General/Processing?status=processed&start="+Start+"&limit="+Limit+"&_dc="+dc;
					}
					catch(err)
					{
						if(App_Debug)
						{
							console.log(err);
						}
					}
				}
				//載入資料
				myProcessingTaskView.load();
			});
			//已逾期
			$("#task_Y02_myProcessing_settingHeader").append("<div id='task_Y02_myProcessing_settingHeader_Button03'></div>");
			$("#task_Y02_myProcessing_settingHeader_Button03").html(language["status_overdue"][languageStatus]);
			$("#task_Y02_myProcessing_settingHeader_Button03").css(task_Y02_myProcessing_settingHeader_Button_Class);
			$("#task_Y02_myProcessing_settingHeader_Button03").css("left","50%");
			$("#task_Y02_myProcessing_settingHeader_Button03").click(function()
			{
				//設定頁面初始值
				myProcessingTaskView.setStart(0);
				myProcessingTaskView.setPage(1);
				ProcessingTaskStatus="overdue";
				$("#task_Y02_myProcessing_settingHeader_Button01").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myProcessing_settingHeader_Button02").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myProcessing_settingHeader_Button03").css("border-color","rgb(33, 183, 208)");
				//設定網址取用方法
				myProcessingTaskView.getUrl = function getUrl()
				{
					try
					{
						//組合參數
						var Start = myProcessingTaskView.getStart();
						var Limit = myProcessingTaskView.getPagesize();
						var dc = (+new Date());
						return localStorage.task+"/Task/me/General/Processing?status=overdue&start="+Start+"&limit="+Limit+"&_dc="+dc;
					}
					catch(err)
					{
						if(App_Debug)
						{
							console.log(err);
						}
					}
				}
				//載入資料
				myProcessingTaskView.load();
			});
		}
		//預設 settingHeader
		$("#task_Y02_myProcessing_settingHeader_Button01").click();
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}

//我簽核的工單內容頁面
function createMyProcessingContentPage(params,ProcessingTaskStatus)
{
	try
	{
		//新增一個 tab
		addTab('processingTaskTab_Y01_content',language["task_mySingDetail"][languageStatus]);
		//取得daily Content
		var dc = (+new Date());
		jqueryAjax_Get(localStorage.daily+"/Task/me/General/"+params.MyTaskID+"?_dc="+dc,
			//成功後
			function(result){
				//主頁面
				$('#processingTaskTab_Y01_content').append('<div id="processingTaskTab_Y01_content_main"></div>');
				$('#processingTaskTab_Y01_content_main').css({
					"background-color":"#cecece",
					"height":"calc(100% - 35px)",
					"width":"100%",
					"position":"absolute"
				});
				//主白色框架內容
				$('#processingTaskTab_Y01_content_main').append('<div id="processingTaskTab_Y01_content_whitePanel"></div>');
				$('#processingTaskTab_Y01_content_whitePanel').css({
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
				$('#processingTaskTab_Y01_content_whitePanel').append("<div id='processingTaskTab_Y01_content_Number'>"+language["TaskAssignedNumber"][languageStatus]+"："+TaskAssignedNumber+"</div>");
				$('#processingTaskTab_Y01_content_Number').css({
								"font-size":"12pt",
								"margin-top":"30px",
								"margin-left":"250px"
								});
				//TitleText
				var TitleText=result.data.TaskAssignedTitle;
				$('#processingTaskTab_Y01_content_whitePanel').append("<div id='processingTaskTab_Y01_content_titleText'>"+language["TaskAssignedTitle"][languageStatus]+"："+TitleText+"</div>");
				$('#processingTaskTab_Y01_content_titleText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//createDateText
				var createDateText=getDate(result.data.TaskAssignedCreateTime)+" "+getTime(result.data.TaskAssignedCreateTime);
				$('#processingTaskTab_Y01_content_whitePanel').append("<div id='processingTaskTab_Y01_content_createDateText'>"+language["TaskAssignedCreateTime"][languageStatus]+"："+createDateText+"</div>");
				$('#processingTaskTab_Y01_content_createDateText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//startDateText
				var startDateText=getDate(result.data.TaskAssignedStartTime)+" "+getTime(result.data.TaskAssignedStartTime);
				$('#processingTaskTab_Y01_content_whitePanel').append("<div id='processingTaskTab_Y01_content_startDateText'>"+language["TaskAssignedStartTime"][languageStatus]+"："+startDateText+"</div>");
				$('#processingTaskTab_Y01_content_startDateText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//endDateText
				var endDateText=getDate(result.data.TaskAssignedEndTime)+" "+getTime(result.data.TaskAssignedEndTime);
				$('#processingTaskTab_Y01_content_whitePanel').append("<div id='processingTaskTab_Y01_content_endDateText'>"+language["TaskAssignedEndTime"][languageStatus]+"："+endDateText+"</div>");
				$('#processingTaskTab_Y01_content_endDateText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//OwnerNameText
				var ownerNameText=result.data.OwnerName;
				$('#processingTaskTab_Y01_content_whitePanel').append("<div id='processingTaskTab_Y01_content_OwnerNameText'>"+language["OwnerName"][languageStatus]+"："+ownerNameText+"</div>");
				$('#processingTaskTab_Y01_content_OwnerNameText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//MainCheckEmployeeNameText
				var mainCheckEmployeeNameText=result.data.MainCheckEmployeeName;
				$('#processingTaskTab_Y01_content_whitePanel').append("<div id='processingTaskTab_Y01_content_MainCheckEmployeeNameText'>"+language["MainCheckEmployeeName"][languageStatus]+"："+mainCheckEmployeeNameText+"</div>");
				$('#processingTaskTab_Y01_content_MainCheckEmployeeNameText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//MainResponsibleEmployeeNameText
				var mainResponsibleEmployeeNameText=result.data.MainResponsibleEmployeeName;
				$('#processingTaskTab_Y01_content_whitePanel').append("<div id='processingTaskTab_Y01_content_MainResponsibleEmployeeNameText'>"+language["MainResponsibleEmployeeName"][languageStatus]+"："+mainResponsibleEmployeeNameText+"</div>");
				$('#processingTaskTab_Y01_content_MainResponsibleEmployeeNameText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//successPoint
				var TaskAssignedSuccessRewardText=result.data.TaskAssignedSuccessReward;
				$('#processingTaskTab_Y01_content_whitePanel').append("<div id='processingTaskTab_Y01_content_TaskAssignedSuccessRewardText'>"+language["task_successPoint"][languageStatus]+"："+TaskAssignedSuccessRewardText+"</div>");
				$('#processingTaskTab_Y01_content_TaskAssignedSuccessRewardText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//failPoint
				var TaskAssignedFailPunishText=result.data.TaskAssignedFailPunish;
				$('#processingTaskTab_Y01_content_whitePanel').append("<div id='processingTaskTab_Y01_content_TaskAssignedFailPunishText'>"+language["task_failPoint"][languageStatus]+"："+TaskAssignedFailPunishText+"</div>");
				$('#processingTaskTab_Y01_content_TaskAssignedFailPunishText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//TaskAssignedStatusText
				var taskAssignedStatusText=result.data.TaskAssignedStatus;
				$('#processingTaskTab_Y01_content_whitePanel').append("<div id='processingTaskTab_Y01_content_TaskAssignedStatusText'>"+language["TaskAssignedStatus"][languageStatus]+"："+taskAssignedStatusText+"</div>");
				$('#processingTaskTab_Y01_content_TaskAssignedStatusText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//簽核按鈕ProcessingTaskStatus
				if(ProcessingTaskStatus=="processing"){
					$('#processingTaskTab_Y01_content_whitePanel').append("<button id='processingTaskTab_Y01_content_singOffButton'>"+language["task_sing"][languageStatus]+"</button>");
					$('#processingTaskTab_Y01_content_singOffButton').css({
									"width":"150px",
									"height":"40px",
									"font-size":"12pt",
									"border-radius":"10px",
									"position":"absolute",
									"right":"10px",
									"top":"30px",
									"background-color":"rgb(236,113,116)",
									"color":"white"
									});
					$('#processingTaskTab_Y01_content_singOffButton').click(function(){
						singOffProcessingWindow(params,ProcessingTaskStatus);
					});
				}
				//contentPanel
				$('#processingTaskTab_Y01_content_whitePanel').append('<div id="processingTaskTab_Y01_content_ContentPanel"></div>');
				$('#processingTaskTab_Y01_content_ContentPanel').css({
					"background-color":"rgb(255, 255, 255)",
					"border-radius":"15pt",
					"height":"200px",
					"width":"400px",
					"margin-left":"240px",
					"margin-top":"15px",
					"position":"absolute",
					"border-style":"groove",
					"box-shadow":"2px 2px rgba(20%,20%,40%,0.5)",
				});
				//contentPanelTitle
				$('#processingTaskTab_Y01_content_ContentPanel').append('<div id="processingTaskTab_Y01_content_ContentPanelTitle">'+language["TaskAssignedContent"][languageStatus]+'</div>');
				$('#processingTaskTab_Y01_content_ContentPanelTitle').css({
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
				    "filter": "progid:DXImageTransform.Microsoft.gradient( startColorstr='#5474a5', endColorstr='#6690be',GradientType=1 )",

				});
				//contentText
				var taskContentText=result.data.TaskAssignedContent;
				$('#processingTaskTab_Y01_content_ContentPanel').append("<div id='processingTaskTab_Y01_content_contentText'>"+taskContentText+"</div>");
				$('#processingTaskTab_Y01_content_contentText').css({
								"width":"360px",
								"height":"200px",
								"font-size":"12pt",
								"margin-top":"10px",
								"margin-left":"20px",
								"word-wrap":"break-word",
								"overflow":"auto"
								});
				//流程框架內容
				$('#processingTaskTab_Y01_content_main').append('<div id="processingTaskTab_Y01_content_whiteListPanel"></div>');
				$('#processingTaskTab_Y01_content_whiteListPanel').css({
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
				$('#processingTaskTab_Y01_content_whiteListPanel').append("<div id='processingTaskTab_Y01_content_listTitleText'>"+language["task_schedule"][languageStatus]+"</div>");
				$('#processingTaskTab_Y01_content_listTitleText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"text-align":"center"
								});
				//工單流程圖筐
				$('#processingTaskTab_Y01_content_whiteListPanel').append("<div id='processingTaskTab_Y01_content_listChartView'></div>");
				$('#processingTaskTab_Y01_content_listChartView').css({
								"height":"calc(100% - 21px)",
								"font-size":"12pt",
								"margin-top":"15px",
								"width":"300px",
								"text-align":"center",
								"position":"absolute",
								"word-wrap":"break-word",
								"overflow":"auto"
								});
				//流程線框架
				$('#processingTaskTab_Y01_content_listChartView').append("<div id='processingTaskTab_Y01_content_listChartLineContent'></div>");
				$('#processingTaskTab_Y01_content_listChartLineContent').css({
								"height":"600px",
								"font-size":"12pt",
								"margin-top":"15px",
								"width":"60px",
								"text-align":"center",
								"position":"absolute",
								});
				jqueryAjax_Get(localStorage.daily+"/Task/me/General/"+params.MyTaskID+"/list?_dc="+dc,
					//成功後
					function(result){
						//將每個流程會製成圖
						for(var i=0;i<result.data.length;i++){
							var output=result.data[i];
							var inputColor="";
							var imgSrc="";
							var line1Height="0px";
							var line2Height="160px";
							//繪製流程線
							if(output.TaskAssignedExecutionStatus=="已完成"){
								inputColor="green";
								imgSrc="status_completed";
								line1Height="15px";
								line2Height="180px";
							}else if(output.TaskAssignedExecutionStatus=="進行中"){
								inputColor="#005AB5";
								imgSrc="status_in-progress";
								line1Height="10px";
								line2Height="170px";
							}else if(output.TaskAssignedExecutionStatus=="已失敗"){
								inputColor="red";
								imgSrc="status_fail";
								line1Height="10px";
								line2Height="170px";
							}else{
								inputColor="rgb(206,206,206)";
								imgSrc="status_not-work";
							}
							$('#processingTaskTab_Y01_content_listChartLineContent').append("<div id='processingTaskTab_Y01_content_listChartLine1_"+i+"'></div>");
								$('#processingTaskTab_Y01_content_listChartLine1_'+i).css({
												"border-left-style":"solid",
												"border-width":"2px",
												"width":"2px",
												"height":line1Height,
												"border-color":inputColor,
												"margin-left":"30px"
												});
								$('#processingTaskTab_Y01_content_listChartLineContent').append("<img src='./image/"+imgSrc+".png' id='processingTaskTab_Y01_content_listChartLineIMG_"+i+"'></img>");
								$('#processingTaskTab_Y01_content_listChartLineIMG_'+i).css({
												"position":"absolute",
												"margin-top":"-10px",
												"margin-left":"-15px",
												});
								$('#processingTaskTab_Y01_content_listChartLineContent').append("<div id='processingTaskTab_Y01_content_listChartLine2_"+i+"'></div>");
								$('#processingTaskTab_Y01_content_listChartLine2_'+i).css({
												"border-left-style":"solid",
												"border-width":"2px",
												"width":"2px",
												"height":line2Height,
												"border-color":inputColor,
												"margin-left":"30px"
												});
							//小白筐
							$('#processingTaskTab_Y01_content_listChartView').append("<div id='processingTaskTab_Y01_content_listChartDiv_"+i+"'></div>");
							$('#processingTaskTab_Y01_content_listChartDiv_'+i).css({
											"height":"150px",
											"font-size":"12pt",
											"margin-top":"15px",
											"width":"200px",
											"color":"white",
											"border-radius":"15pt",
											"margin-left":"80px",
											"text-align":"center",	
											"word-wrap":"break-word",
											"overflow":"auto",										
											"background-color":inputColor
											});
							//員工姓名
							$('#processingTaskTab_Y01_content_listChartDiv_'+i).append("<div id='processingTaskTab_Y01_content_listChartName_"+i+"'>"+language["task_employeeName"][languageStatus]+"："+output.OwnerName+"</div>");
							$('#processingTaskTab_Y01_content_listChartName_'+i).css({
											"font-size":"12pt",
											"margin-top":"10px",
											"margin-left":"20px",
											"text-align":"left"
											});
							//員工身份
							$('#processingTaskTab_Y01_content_listChartDiv_'+i).append("<div id='processingTaskTab_Y01_content_listChartExplanation_"+i+"'>"+language["task_employeeIdentification"][languageStatus]+"："+output.TaskAssignedExplanation+"</div>");
							$('#processingTaskTab_Y01_content_listChartExplanation_'+i).css({
											"font-size":"12pt",
											"margin-top":"10px",
											"margin-left":"20px",
											"text-align":"left"
											});
							//開單狀態
							$('#processingTaskTab_Y01_content_listChartDiv_'+i).append("<div id='processingTaskTab_Y01_content_listChartStatus_"+i+"'>"+language["TaskAssignedStatus"][languageStatus]+"："+((output.TaskAssignedExecutionStatus == null || output.TaskAssignedExecutionStatus == '')?"無":output.TaskAssignedExecutionStatus)+"</div>");
							$('#processingTaskTab_Y01_content_listChartStatus_'+i).css({
											"font-size":"12pt",
											"margin-top":"10px",
											"margin-left":"20px",
											"text-align":"left"
											});
							//工單意見
							$('#processingTaskTab_Y01_content_listChartDiv_'+i).append("<div id='processingTaskTab_Y01_content_listChartExecution_"+i+"'>"+language["task_employeeFeedback"][languageStatus]+"："+((output.TaskAssignedExecutionContent == null || output.TaskAssignedExecutionContent == '')?"無":output.TaskAssignedExecutionContent)+"</div>");
							$('#processingTaskTab_Y01_content_listChartExecution_'+i).css({
											"font-size":"12pt",
											"margin-top":"10px",
											"margin-left":"20px",
											"text-align":"left"
											});
							//開單時間
							if(output.TaskAssignedExecutionTime){
								$('#processingTaskTab_Y01_content_listChartView').append("<div id='processingTaskTab_Y01_content_listChartTime_"+i+"'>"+getDate(output.TaskAssignedExecutionTime)+" "+getTime(output.TaskAssignedExecutionTime)+"</div>");
								$('#processingTaskTab_Y01_content_listChartTime_'+i).css({
												"font-size":"10pt",
												"margin-top":"10px",
												"margin-left":"100px",
												"text-align":"left"
												});
							}
							
						}
					},
					//失敗時
					function(){
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
						$('#taskListErr_MsgYes').css({"margin-left":"0px","width":"100%"});
					});
			},
			//失敗時
			function(){
				var taskContentErr_Msg = YesNo_Msg_Define.Initialize();
				taskContentErr_Msg.setMask(false);
				taskContentErr_Msg.setSmartdetect(false);
				taskContentErr_Msg.setWidth(300);
				taskContentErr_Msg.setHeight(168);
				taskContentErr_Msg.setId('taskContentErr_Msg');
				taskContentErr_Msg.setTitle(language["system_error"][languageStatus]);
				taskContentErr_Msg.show();
				taskContentErr_Msg.addMsgContent(error.message);
				taskContentErr_Msg.addYesNO_Button('',language["system_ok"][languageStatus],null,
				function()
				{
					//關閉 Msg
				    taskContentErr_Msg.close();
				});
				//隱藏 No 按鈕
				$('#taskContentErr_Msg_No').css("display","none");
				//置中 Yes 按鈕
				$('#taskContentErr_Msg_Yes').css({"margin-left":"0px","width":"100%"});
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

//我執行的工單頁面
function createMyExecuteTaskPage(firstView)
{
	try
	{
		//新增一個 tab
		addTab('executeTaskTab_Y01',language["list_myDoing"][languageStatus]);
		//建立daily grid
		var ExecuteTaskStatus="";
		myExecuteTaskView = Grid_Panel_Define.Initialize();
		myExecuteTaskView.setId('executeTaskTab_Y01');
		myExecuteTaskView.setResizer_ID('myExecuteTaskViewPage_Y01');
		myExecuteTaskView.setHeader_Title(['No.','ID',"工單編號","工單名稱","發單者","檢查者","接單者","開始時間","結束時間","工單狀態",'TaskAssignedListID']);
		myExecuteTaskView.setModel(['Number','TaskAssignedID','TaskAssignedNumber','TaskAssignedTitle','OwnerName','MainCheckEmployeeName','MainResponsibleEmployeeName','TaskAssignedStartTime','TaskAssignedEndTime','TaskAssignedStatus','TaskAssignedListID']);
		myExecuteTaskView.setPagesize(10);
		myExecuteTaskView.setfieldShow([true,false,true,true,true,true,false,true,true,true,false]);
		myExecuteTaskView.setHeader_Width(['5%','0%','10%','15%','10%','10%','0%','15%','15%','19%','0%']); // 99.5%
		myExecuteTaskView.createHeader();
		myExecuteTaskView.createTable();
		//修改高度
		$('#executeTaskTab_Y01_Table').css('height','calc(100% - 150px)');
		//改寫欄位
		myExecuteTaskView.setLoad_Callback(function()
		{
			for(var i = 0; i < $('#executeTaskTab_Y01_Table').children().length; i++)
			{
				//編號
				$('#executeTaskTab_Y01_Table_Inner_' + i).children().eq(0).html(i+1+myExecuteTaskView.getStart());
				//時間欄位顯示設定
				$('#executeTaskTab_Y01_Table_Inner_' + i).children().eq(7).html(getDate($('#executeTaskTab_Y01_Table_Inner_' + i).children().eq(7).html()) + ' ' + getTime($('#executeTaskTab_Y01_Table_Inner_' + i).children().eq(7).html()));
				$('#executeTaskTab_Y01_Table_Inner_' + i).children().eq(8).html(getDate($('#executeTaskTab_Y01_Table_Inner_' + i).children().eq(8).html()) + ' ' + getTime($('#executeTaskTab_Y01_Table_Inner_' + i).children().eq(8).html()));
				//狀態顯示
				if($('#executeTaskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="工單成功完成"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:140px;color:white;background-color:green;margin:0px auto;border-radius:4px'>"+language["task_status_success"][languageStatus]+"</div>";
					$('#executeTaskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#executeTaskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="進行中"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:80px;color:white;background-color:blue;margin:0px auto;border-radius:4px'>"+language["task_status_doing"][languageStatus]+"</div>";
					$('#executeTaskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#executeTaskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="工單逾期失敗"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:80px;color:white;background-color:red;margin:0px auto;border-radius:4px'>"+language["task_status_fail"][languageStatus]+"</div>";
					$('#executeTaskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#executeTaskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="已逾期,等待開單者確認"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:140px;color:white;background-color:red;margin:0px auto;border-radius:4px'>"+language["task_status_waitcheck"][languageStatus]+"</div>";
					$('#executeTaskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#executeTaskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="執行人不同意執行"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:140px;color:white;background-color:red;margin:0px auto;border-radius:4px'>"+language["task_status_maindont"][languageStatus]+"</div>";
					$('#executeTaskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#executeTaskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="作廢工單"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:70px;color:white;background-color:red;margin:0px auto;border-radius:4px'>"+language["task_status_failtask"][languageStatus]+"</div>";
					$('#executeTaskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#executeTaskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="失敗"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:70px;color:white;background-color:red;margin:0px auto;border-radius:4px'>"+language["task_status_failtask"][languageStatus]+"</div>";
					$('#executeTaskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#executeTaskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="檢查人檢查失敗"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:140px;color:white;background-color:red;margin:0px auto;border-radius:4px'>"+language["task_status_checkfail"][languageStatus]+"</div>";
					$('#executeTaskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#executeTaskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="執行人放棄執行"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:140px;color:white;background-color:red;margin:0px auto;border-radius:4px'>"+language["task_status_domanquit"][languageStatus]+"</div>";
					$('#executeTaskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#executeTaskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="必要通知人不同意執行"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:140px;color:white;background-color:red;margin:0px auto;border-radius:4px'>"+language["task_status_taskingquit"][languageStatus]+"</div>";
					$('#executeTaskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}

				//設定雙點擊事件
				$('#executeTaskTab_Y01_Table_Inner_' + i).dblclick(function(){
					var params={};
					params.MyTaskID=$('#'+this.id).children().eq(1).html();
					params.TaskAssignedListID=$('#'+this.id).children().eq(10).html();
					if($('#executeTaskTab_Y01_content').size()){
						$('#executeTaskTab_Y01_content').empty();
						createMyExecuteContentPage(params,ExecuteTaskStatus);
					}else{
						createMyExecuteContentPage(params,ExecuteTaskStatus);
					}
				});
				
			};
		});
		myExecuteTaskView.createPagging();
		//設定網址取用方法
		myExecuteTaskView.getUrl = function getUrl()
		{
			try
			{
				//組合參數
				var Start = myExecuteTaskView.getStart();
				var Limit = myExecuteTaskView.getPagesize();
				var dc = (+new Date());
				return localStorage.task+"/Task/me/General/Execute?status=waitingReceive&start="+Start+"&limit="+Limit+"&_dc="+dc;
			}
			catch(err)
			{
				if(App_Debug)
				{
					console.log(err);
				}
			}
		}

		//新增 settingHeader
		new function()
		{
			//新增 Header
			$('#' + myExecuteTaskView.getId()).prepend("<div id='task_Y02_myExecuteTaskView_settingHeader'></div>");
			$("#task_Y02_myExecuteTaskView_settingHeader").css
			({
				"height":"50px",
			    "width":"101%",
		        "margin-left":"-1px",
			    "background-color":"rgb(22, 103, 119)",
			    "position":"relative"
			});
			var task_Y02_myExecuteTaskView_settingHeader_Button_Class = 
			{
				"height":"24px",
				"width":"135px",
				"font-size":'16pt',
				"color":"white",
				"text-align":"center",
				"padding-bottom":"5px",
				"border-bottom-style":"solid",
				"border-color":"rgb(22, 103, 119)",
				"border-width":'3px',
				"float":"left",
				"position":"absolute",
				"top":"0px",
				"right":"0px",
				"bottom":"0px",
				"margin":"auto",
				"cursor":"pointer"
			};
			//待接單
			$("#task_Y02_myExecuteTaskView_settingHeader").append("<div id='task_Y02_myExecuteTaskView_settingHeader_Button01'></div>");
			$("#task_Y02_myExecuteTaskView_settingHeader_Button01").html(language["status_waitTask"][languageStatus]);
			$("#task_Y02_myExecuteTaskView_settingHeader_Button01").css(task_Y02_myExecuteTaskView_settingHeader_Button_Class);
			$("#task_Y02_myExecuteTaskView_settingHeader_Button01").css("left","-71.42%");
			$("#task_Y02_myExecuteTaskView_settingHeader_Button01").click(function()
			{
				//設定頁面初始值
				myExecuteTaskView.setStart(0);
				myExecuteTaskView.setPage(1);
				ExecuteTaskStatus="waitingReceive";
				$("#task_Y02_myExecuteTaskView_settingHeader_Button01").css("border-color","rgb(33, 183, 208)");
				$("#task_Y02_myExecuteTaskView_settingHeader_Button02").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myExecuteTaskView_settingHeader_Button03").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myExecuteTaskView_settingHeader_Button04").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myExecuteTaskView_settingHeader_Button05").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myExecuteTaskView_settingHeader_Button06").css("border-color","rgb(22, 103, 119)");
				//設定網址取用方法
				myExecuteTaskView.getUrl = function getUrl()
				{
					try
					{
						//組合參數
						var Start = myExecuteTaskView.getStart();
						var Limit = myExecuteTaskView.getPagesize();
						var dc = (+new Date());
						return localStorage.task+"/Task/me/General/Execute?status=waitingReceive&start="+Start+"&limit="+Limit+"&_dc="+dc;
					}
					catch(err)
					{
						if(App_Debug)
						{
							console.log(err);
						}
					}
				}
				//載入資料
				myExecuteTaskView.load();
			});
			//執行中
			$("#task_Y02_myExecuteTaskView_settingHeader").append("<div id='task_Y02_myExecuteTaskView_settingHeader_Button02'></div>");
			$("#task_Y02_myExecuteTaskView_settingHeader_Button02").html(language["status_onDoing"][languageStatus]);
			$("#task_Y02_myExecuteTaskView_settingHeader_Button02").css(task_Y02_myExecuteTaskView_settingHeader_Button_Class);
			$("#task_Y02_myExecuteTaskView_settingHeader_Button02").css("left","-42.85%");
			$("#task_Y02_myExecuteTaskView_settingHeader_Button02").click(function()
			{
				//設定頁面初始值
				myExecuteTaskView.setStart(0);
				myExecuteTaskView.setPage(1);
				ExecuteTaskStatus="processing";
				$("#task_Y02_myExecuteTaskView_settingHeader_Button01").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myExecuteTaskView_settingHeader_Button02").css("border-color","rgb(33, 183, 208)");
				$("#task_Y02_myExecuteTaskView_settingHeader_Button03").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myExecuteTaskView_settingHeader_Button04").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myExecuteTaskView_settingHeader_Button05").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myExecuteTaskView_settingHeader_Button06").css("border-color","rgb(22, 103, 119)");
				//設定網址取用方法
				myExecuteTaskView.getUrl = function getUrl()
				{
					try
					{
						//組合參數
						var Start = myExecuteTaskView.getStart();
						var Limit = myExecuteTaskView.getPagesize();
						var dc = (+new Date());
						return localStorage.task+"/Task/me/General/Execute?status=processing&start="+Start+"&limit="+Limit+"&_dc="+dc;
					}
					catch(err)
					{
						if(App_Debug)
						{
							console.log(err);
						}
					}
				}
				//載入資料
				myExecuteTaskView.load();
			});
			//待審核
			$("#task_Y02_myExecuteTaskView_settingHeader").append("<div id='task_Y02_myExecuteTaskView_settingHeader_Button03'></div>");
			$("#task_Y02_myExecuteTaskView_settingHeader_Button03").html(language["status_waitCheck"][languageStatus]);
			$("#task_Y02_myExecuteTaskView_settingHeader_Button03").css(task_Y02_myExecuteTaskView_settingHeader_Button_Class);
			$("#task_Y02_myExecuteTaskView_settingHeader_Button03").css("left","-14.28%");
			$("#task_Y02_myExecuteTaskView_settingHeader_Button03").click(function()
			{
				//設定頁面初始值
				myExecuteTaskView.setStart(0);
				myExecuteTaskView.setPage(1);
				ExecuteTaskStatus="waitingCheck";
				$("#task_Y02_myExecuteTaskView_settingHeader_Button01").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myExecuteTaskView_settingHeader_Button02").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myExecuteTaskView_settingHeader_Button03").css("border-color","rgb(33, 183, 208)");
				$("#task_Y02_myExecuteTaskView_settingHeader_Button04").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myExecuteTaskView_settingHeader_Button05").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myExecuteTaskView_settingHeader_Button06").css("border-color","rgb(22, 103, 119)");
				//設定網址取用方法
				myExecuteTaskView.getUrl = function getUrl()
				{
					try
					{
						//組合參數
						var Start = myExecuteTaskView.getStart();
						var Limit = myExecuteTaskView.getPagesize();
						var dc = (+new Date());
						return localStorage.task+"/Task/me/General/Execute?status=waitingCheck&start="+Start+"&limit="+Limit+"&_dc="+dc;
					}
					catch(err)
					{
						if(App_Debug)
						{
							console.log(err);
						}
					}
				}
				//載入資料
				myExecuteTaskView.load();
			});
			//已成功
			$("#task_Y02_myExecuteTaskView_settingHeader").append("<div id='task_Y02_myExecuteTaskView_settingHeader_Button04'></div>");
			$("#task_Y02_myExecuteTaskView_settingHeader_Button04").html(language["status_success"][languageStatus]);
			$("#task_Y02_myExecuteTaskView_settingHeader_Button04").css(task_Y02_myExecuteTaskView_settingHeader_Button_Class);
			$("#task_Y02_myExecuteTaskView_settingHeader_Button04").css("left","14.28%");
			$("#task_Y02_myExecuteTaskView_settingHeader_Button04").click(function()
			{
				//設定頁面初始值
				myExecuteTaskView.setStart(0);
				myExecuteTaskView.setPage(1);
				ExecuteTaskStatus="success";
				$("#task_Y02_myExecuteTaskView_settingHeader_Button01").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myExecuteTaskView_settingHeader_Button02").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myExecuteTaskView_settingHeader_Button03").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myExecuteTaskView_settingHeader_Button04").css("border-color","rgb(33, 183, 208)");
				$("#task_Y02_myExecuteTaskView_settingHeader_Button05").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myExecuteTaskView_settingHeader_Button06").css("border-color","rgb(22, 103, 119)");
				//設定網址取用方法
				myExecuteTaskView.getUrl = function getUrl()
				{
					try
					{
						//組合參數
						var Start = myExecuteTaskView.getStart();
						var Limit = myExecuteTaskView.getPagesize();
						var dc = (+new Date());
						return localStorage.task+"/Task/me/General/Execute?status=success&start="+Start+"&limit="+Limit+"&_dc="+dc;
					}
					catch(err)
					{
						if(App_Debug)
						{
							console.log(err);
						}
					}
				}
				//載入資料
				myExecuteTaskView.load();
			});
			//已失敗
			$("#task_Y02_myExecuteTaskView_settingHeader").append("<div id='task_Y02_myExecuteTaskView_settingHeader_Button05'></div>");
			$("#task_Y02_myExecuteTaskView_settingHeader_Button05").html(language["status_fail"][languageStatus]);
			$("#task_Y02_myExecuteTaskView_settingHeader_Button05").css(task_Y02_myExecuteTaskView_settingHeader_Button_Class);
			$("#task_Y02_myExecuteTaskView_settingHeader_Button05").css("left","42.85%");
			$("#task_Y02_myExecuteTaskView_settingHeader_Button05").click(function()
			{
				//設定頁面初始值
				myExecuteTaskView.setStart(0);
				myExecuteTaskView.setPage(1);
				ExecuteTaskStatus="fail";
				$("#task_Y02_myExecuteTaskView_settingHeader_Button01").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myExecuteTaskView_settingHeader_Button02").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myExecuteTaskView_settingHeader_Button03").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myExecuteTaskView_settingHeader_Button04").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myExecuteTaskView_settingHeader_Button05").css("border-color","rgb(33, 183, 208)");
				$("#task_Y02_myExecuteTaskView_settingHeader_Button06").css("border-color","rgb(22, 103, 119)");
				//設定網址取用方法
				myExecuteTaskView.getUrl = function getUrl()
				{
					try
					{
						//組合參數
						var Start = myExecuteTaskView.getStart();
						var Limit = myExecuteTaskView.getPagesize();
						var dc = (+new Date());
						return localStorage.task+"/Task/me/General/Execute?status=fail&start="+Start+"&limit="+Limit+"&_dc="+dc;
					}
					catch(err)
					{
						if(App_Debug)
						{
							console.log(err);
						}
					}
				}
				//載入資料
				myExecuteTaskView.load();
			});
			//已逾期
			$("#task_Y02_myExecuteTaskView_settingHeader").append("<div id='task_Y02_myExecuteTaskView_settingHeader_Button06'></div>");
			$("#task_Y02_myExecuteTaskView_settingHeader_Button06").html(language["status_overdue"][languageStatus]);
			$("#task_Y02_myExecuteTaskView_settingHeader_Button06").css(task_Y02_myExecuteTaskView_settingHeader_Button_Class);
			$("#task_Y02_myExecuteTaskView_settingHeader_Button06").css("left","71.42%");
			$("#task_Y02_myExecuteTaskView_settingHeader_Button06").click(function()
			{
				//設定頁面初始值
				myExecuteTaskView.setStart(0);
				myExecuteTaskView.setPage(1);
				ExecuteTaskStatus="overdue";
				$("#task_Y02_myExecuteTaskView_settingHeader_Button01").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myExecuteTaskView_settingHeader_Button02").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myExecuteTaskView_settingHeader_Button03").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myExecuteTaskView_settingHeader_Button04").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myExecuteTaskView_settingHeader_Button05").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_myExecuteTaskView_settingHeader_Button06").css("border-color","rgb(33, 183, 208)");
				//設定網址取用方法
				myExecuteTaskView.getUrl = function getUrl()
				{
					try
					{
						//組合參數
						var Start = myExecuteTaskView.getStart();
						var Limit = myExecuteTaskView.getPagesize();
						var dc = (+new Date());
						return localStorage.task+"/Task/me/General/Execute?status=overdue&start="+Start+"&limit="+Limit+"&_dc="+dc;
					}
					catch(err)
					{
						if(App_Debug)
						{
							console.log(err);
						}
					}
				}
				//載入資料
				myExecuteTaskView.load();
			});
		}
		//預設 settingHeader
		if(firstView){
			$("#task_Y02_myExecuteTaskView_settingHeader_Button01").click();
		}else{
			$("#task_Y02_myExecuteTaskView_settingHeader_Button02").click();
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

//我執行的工單內容頁面
function createMyExecuteContentPage(params,ExecuteTaskStatus)
{
	try
	{
		//新增一個 tab
		addTab('executeTaskTab_Y01_content',language["task_myDoDetail"][languageStatus]);
		//取得daily Content
		var dc = (+new Date());
		jqueryAjax_Get(localStorage.daily+"/Task/me/General/"+params.MyTaskID+"?_dc="+dc,
			//成功後
			function(result){
				//主頁面
				$('#executeTaskTab_Y01_content').append('<div id="executeTaskTab_Y01_content_main"></div>');
				$('#executeTaskTab_Y01_content_main').css({
					"background-color":"#cecece",
					"height":"calc(100% - 35px)",
					"width":"100%",
					"position":"absolute"
				});
				//主白色框架內容
				$('#executeTaskTab_Y01_content_main').append('<div id="executeTaskTab_Y01_content_whitePanel"></div>');
				$('#executeTaskTab_Y01_content_whitePanel').css({
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
				$('#executeTaskTab_Y01_content_whitePanel').append("<div id='executeTaskTab_Y01_content_Number'>"+language["TaskAssignedNumber"][languageStatus]+"："+TaskAssignedNumber+"</div>");
				$('#executeTaskTab_Y01_content_Number').css({
								"font-size":"12pt",
								"margin-top":"30px",
								"margin-left":"250px"
								});
				//TitleText
				var TitleText=result.data.TaskAssignedTitle;
				$('#executeTaskTab_Y01_content_whitePanel').append("<div id='executeTaskTab_Y01_content_titleText'>"+language["TaskAssignedTitle"][languageStatus]+"："+TitleText+"</div>");
				$('#executeTaskTab_Y01_content_titleText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//createDateText
				var createDateText=getDate(result.data.TaskAssignedCreateTime)+" "+getTime(result.data.TaskAssignedCreateTime);
				$('#executeTaskTab_Y01_content_whitePanel').append("<div id='executeTaskTab_Y01_content_createDateText'>"+language["TaskAssignedCreateTime"][languageStatus]+"："+createDateText+"</div>");
				$('#executeTaskTab_Y01_content_createDateText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//startDateText
				var startDateText=getDate(result.data.TaskAssignedStartTime)+" "+getTime(result.data.TaskAssignedStartTime);
				$('#executeTaskTab_Y01_content_whitePanel').append("<div id='executeTaskTab_Y01_content_startDateText'>"+language["TaskAssignedStartTime"][languageStatus]+"："+startDateText+"</div>");
				$('#executeTaskTab_Y01_content_startDateText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//endDateText
				var endDateText=getDate(result.data.TaskAssignedEndTime)+" "+getTime(result.data.TaskAssignedEndTime);
				$('#executeTaskTab_Y01_content_whitePanel').append("<div id='executeTaskTab_Y01_content_endDateText'>"+language["TaskAssignedEndTime"][languageStatus]+"："+endDateText+"</div>");
				$('#executeTaskTab_Y01_content_endDateText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//OwnerNameText
				var ownerNameText=result.data.OwnerName;
				$('#executeTaskTab_Y01_content_whitePanel').append("<div id='executeTaskTab_Y01_content_OwnerNameText'>"+language["OwnerName"][languageStatus]+"："+ownerNameText+"</div>");
				$('#executeTaskTab_Y01_content_OwnerNameText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//MainCheckEmployeeNameText
				var mainCheckEmployeeNameText=result.data.MainCheckEmployeeName;
				$('#executeTaskTab_Y01_content_whitePanel').append("<div id='executeTaskTab_Y01_content_MainCheckEmployeeNameText'>"+language["MainCheckEmployeeName"][languageStatus]+"："+mainCheckEmployeeNameText+"</div>");
				$('#executeTaskTab_Y01_content_MainCheckEmployeeNameText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//MainResponsibleEmployeeNameText
				var mainResponsibleEmployeeNameText=result.data.MainResponsibleEmployeeName;
				$('#executeTaskTab_Y01_content_whitePanel').append("<div id='executeTaskTab_Y01_content_MainResponsibleEmployeeNameText'>"+language["MainResponsibleEmployeeName"][languageStatus]+"："+mainResponsibleEmployeeNameText+"</div>");
				$('#executeTaskTab_Y01_content_MainResponsibleEmployeeNameText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//successPoint
				var TaskAssignedSuccessRewardText=result.data.TaskAssignedSuccessReward;
				$('#executeTaskTab_Y01_content_whitePanel').append("<div id='executeTaskTab_Y01_content_TaskAssignedSuccessRewardText'>"+language["task_successPoint"][languageStatus]+"："+TaskAssignedSuccessRewardText+"</div>");
				$('#executeTaskTab_Y01_content_TaskAssignedSuccessRewardText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//failPoint
				var TaskAssignedFailPunishText=result.data.TaskAssignedFailPunish;
				$('#executeTaskTab_Y01_content_whitePanel').append("<div id='executeTaskTab_Y01_content_TaskAssignedFailPunishText'>"+language["task_failPoint"][languageStatus]+"："+TaskAssignedFailPunishText+"</div>");
				$('#executeTaskTab_Y01_content_TaskAssignedFailPunishText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//TaskAssignedStatusText
				var taskAssignedStatusText=result.data.TaskAssignedStatus;
				$('#executeTaskTab_Y01_content_whitePanel').append("<div id='executeTaskTab_Y01_content_TaskAssignedStatusText'>"+language["TaskAssignedStatus"][languageStatus]+"："+taskAssignedStatusText+"</div>");
				$('#executeTaskTab_Y01_content_TaskAssignedStatusText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//contentPanel
				$('#executeTaskTab_Y01_content_whitePanel').append('<div id="executeTaskTab_Y01_content_ContentPanel"></div>');
				$('#executeTaskTab_Y01_content_ContentPanel').css({
					"background-color":"rgb(255, 255, 255)",
					"border-radius":"15pt",
					"height":"200px",
					"width":"400px",
					"margin-left":"240px",
					"margin-top":"15px",
					"position":"absolute",
					"border-style":"groove",
					"box-shadow":"2px 2px rgba(20%,20%,40%,0.5)",
				});
				//contentPanelTitle
				$('#executeTaskTab_Y01_content_ContentPanel').append('<div id="executeTaskTab_Y01_content_ContentPanelTitle">'+language["TaskAssignedContent"][languageStatus]+'</div>');
				$('#executeTaskTab_Y01_content_ContentPanelTitle').css({
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
				    "filter": "progid:DXImageTransform.Microsoft.gradient( startColorstr='#5474a5', endColorstr='#6690be',GradientType=1 )",

				});
				//contentText
				var taskContentText=result.data.TaskAssignedContent;
				$('#executeTaskTab_Y01_content_ContentPanel').append("<div id='executeTaskTab_Y01_content_contentText'>"+taskContentText+"</div>");
				$('#executeTaskTab_Y01_content_contentText').css({
								"width":"360px",
								"height":"200px",
								"font-size":"12pt",
								"margin-top":"10px",
								"margin-left":"20px",
								"word-wrap":"break-word",
								"overflow":"auto"
								});
				//簽核按鈕
				if(ExecuteTaskStatus=="waitingReceive" || ExecuteTaskStatus=="processing"){
					$('#executeTaskTab_Y01_content_whitePanel').append("<button id='executeTaskTab_Y01_content_singOffButton'>"+language["task_sing"][languageStatus]+"</button>");
					$('#executeTaskTab_Y01_content_singOffButton').css({
									"width":"150px",
									"height":"40px",
									"font-size":"12pt",
									"border-radius":"10px",
									"position":"absolute",
									"right":"10px",
									"top":"30px",
									"background-color":"rgb(236,113,116)",
									"color":"white"
									});
					$('#executeTaskTab_Y01_content_singOffButton').click(function(){
						singOffWindow(params,ExecuteTaskStatus);
					});
				}
				//流程框架內容
				$('#executeTaskTab_Y01_content_main').append('<div id="executeTaskTab_Y01_content_whiteListPanel"></div>');
				$('#executeTaskTab_Y01_content_whiteListPanel').css({
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
				$('#executeTaskTab_Y01_content_whiteListPanel').append("<div id='executeTaskTab_Y01_content_listTitleText'>"+language["task_schedule"][languageStatus]+"</div>");
				$('#executeTaskTab_Y01_content_listTitleText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"text-align":"center"
								});
				//工單流程圖筐
				$('#executeTaskTab_Y01_content_whiteListPanel').append("<div id='executeTaskTab_Y01_content_listChartView'></div>");
				$('#executeTaskTab_Y01_content_listChartView').css({
								"height":"calc(100% - 21px)",
								"font-size":"12pt",
								"margin-top":"15px",
								"width":"300px",
								"text-align":"center",
								"position":"absolute",
								"word-wrap":"break-word",
								"overflow":"auto"
								});
				//流程線框架
				$('#executeTaskTab_Y01_content_listChartView').append("<div id='executeTaskTab_Y01_content_listChartLineContent'></div>");
				$('#executeTaskTab_Y01_content_listChartLineContent').css({
								"height":"600px",
								"font-size":"12pt",
								"margin-top":"15px",
								"width":"60px",
								"text-align":"center",
								"position":"absolute",
								});
				jqueryAjax_Get(localStorage.daily+"/Task/me/General/"+params.MyTaskID+"/list?_dc="+dc,
					//成功後
					function(result){
						//將每個流程會製成圖
						for(var i=0;i<result.data.length;i++){
							var output=result.data[i];
							var inputColor="";
							var imgSrc="";
							var line1Height="0px";
							var line2Height="160px";
							//繪製流程線
							if(output.TaskAssignedExecutionStatus=="已完成"){
								inputColor="green";
								imgSrc="status_completed";
								line1Height="15px";
								line2Height="180px";
							}else if(output.TaskAssignedExecutionStatus=="進行中"){
								inputColor="#005AB5";
								imgSrc="status_in-progress";
								line1Height="10px";
								line2Height="170px";
							}else if(output.TaskAssignedExecutionStatus=="已失敗"){
								inputColor="red";
								imgSrc="status_fail";
								line1Height="10px";
								line2Height="170px";
							}else{
								inputColor="rgb(206,206,206)";
								imgSrc="status_not-work";
							}
							$('#executeTaskTab_Y01_content_listChartLineContent').append("<div id='executeTaskTab_Y01_content_listChartLine1_"+i+"'></div>");
								$('#executeTaskTab_Y01_content_listChartLine1_'+i).css({
												"border-left-style":"solid",
												"border-width":"2px",
												"width":"2px",
												"height":line1Height,
												"border-color":inputColor,
												"margin-left":"30px"
												});
								$('#executeTaskTab_Y01_content_listChartLineContent').append("<img src='./image/"+imgSrc+".png' id='executeTaskTab_Y01_content_listChartLineIMG_"+i+"'></img>");
								$('#executeTaskTab_Y01_content_listChartLineIMG_'+i).css({
												"position":"absolute",
												"margin-top":"-10px",
												"margin-left":"-15px",
												});
								$('#executeTaskTab_Y01_content_listChartLineContent').append("<div id='executeTaskTab_Y01_content_listChartLine2_"+i+"'></div>");
								$('#executeTaskTab_Y01_content_listChartLine2_'+i).css({
												"border-left-style":"solid",
												"border-width":"2px",
												"width":"2px",
												"height":line2Height,
												"border-color":inputColor,
												"margin-left":"30px"
												});
							//小白筐
							$('#executeTaskTab_Y01_content_listChartView').append("<div id='executeTaskTab_Y01_content_listChartDiv_"+i+"'></div>");
							$('#executeTaskTab_Y01_content_listChartDiv_'+i).css({
											"height":"150px",
											"font-size":"12pt",
											"margin-top":"15px",
											"width":"200px",
											"color":"white",
											"border-radius":"15pt",
											"margin-left":"80px",
											"text-align":"center",	
											"word-wrap":"break-word",
											"overflow":"auto",										
											"background-color":inputColor
											});
							//員工姓名
							$('#executeTaskTab_Y01_content_listChartDiv_'+i).append("<div id='executeTaskTab_Y01_content_listChartName_"+i+"'>"+language["task_employeeName"][languageStatus]+"："+output.OwnerName+"</div>");
							$('#executeTaskTab_Y01_content_listChartName_'+i).css({
											"font-size":"12pt",
											"margin-top":"10px",
											"margin-left":"20px",
											"text-align":"left"
											});
							//員工身份
							$('#executeTaskTab_Y01_content_listChartDiv_'+i).append("<div id='executeTaskTab_Y01_content_listChartExplanation_"+i+"'>"+language["task_employeeIdentification"][languageStatus]+"："+output.TaskAssignedExplanation+"</div>");
							$('#executeTaskTab_Y01_content_listChartExplanation_'+i).css({
											"font-size":"12pt",
											"margin-top":"10px",
											"margin-left":"20px",
											"text-align":"left"
											});
							//開單狀態
							$('#executeTaskTab_Y01_content_listChartDiv_'+i).append("<div id='executeTaskTab_Y01_content_listChartStatus_"+i+"'>"+language["TaskAssignedStatus"][languageStatus]+"："+((output.TaskAssignedExecutionStatus == null || output.TaskAssignedExecutionStatus == '')?"無":output.TaskAssignedExecutionStatus)+"</div>");
							$('#executeTaskTab_Y01_content_listChartStatus_'+i).css({
											"font-size":"12pt",
											"margin-top":"10px",
											"margin-left":"20px",
											"text-align":"left"
											});
							//工單意見
							$('#executeTaskTab_Y01_content_listChartDiv_'+i).append("<div id='executeTaskTab_Y01_content_listChartExecution_"+i+"'>"+language["task_employeeFeedback"][languageStatus]+"："+((output.TaskAssignedExecutionContent == null || output.TaskAssignedExecutionContent == '')?"無":output.TaskAssignedExecutionContent)+"</div>");
							$('#executeTaskTab_Y01_content_listChartExecution_'+i).css({
											"font-size":"12pt",
											"margin-top":"10px",
											"margin-left":"20px",
											"text-align":"left"
											});
							//開單時間
							if(output.TaskAssignedExecutionTime){
								$('#executeTaskTab_Y01_content_listChartView').append("<div id='executeTaskTab_Y01_content_listChartTime_"+i+"'>"+getDate(output.TaskAssignedExecutionTime)+" "+getTime(output.TaskAssignedExecutionTime)+"</div>");
								$('#executeTaskTab_Y01_content_listChartTime_'+i).css({
												"font-size":"10pt",
												"margin-top":"10px",
												"margin-left":"100px",
												"text-align":"left"
												});
							}
							
						}
					},
					//失敗時
					function(){
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
						$('#taskListErr_MsgYes').css({"margin-left":"0px","width":"100%"});
					});
			},
			//失敗時
			function(){
				var taskContentErr_Msg = YesNo_Msg_Define.Initialize();
				taskContentErr_Msg.setMask(false);
				taskContentErr_Msg.setSmartdetect(false);
				taskContentErr_Msg.setWidth(300);
				taskContentErr_Msg.setHeight(168);
				taskContentErr_Msg.setId('taskContentErr_Msg');
				taskContentErr_Msg.setTitle(language["system_error"][languageStatus]);
				taskContentErr_Msg.show();
				taskContentErr_Msg.addMsgContent(error.message);
				taskContentErr_Msg.addYesNO_Button('',language["system_ok"][languageStatus],null,
				function()
				{
					//關閉 Msg
				    taskContentErr_Msg.close();
				});
				//隱藏 No 按鈕
				$('#taskContentErr_Msg_No').css("display","none");
				//置中 Yes 按鈕
				$('#taskContentErr_Msg_Yes').css({"margin-left":"0px","width":"100%"});
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

//我發出的工單的簽核畫面
function singOffmineMineWindow(params,myTaskStatus){
	try{
		//定義介面
		var ReceiveMyTask_Window = Window_Define.Initialize();
		ReceiveMyTask_Window.setMask(true);
		ReceiveMyTask_Window.setSmartdetect(false);
		ReceiveMyTask_Window.setWidth(350);
		ReceiveMyTask_Window.setHeight(200);
		ReceiveMyTask_Window.setId('ReceiveMyTask_Window');
		ReceiveMyTask_Window.setTitle(language["processingTable"][languageStatus]);
		ReceiveMyTask_Window.show();
		ReceiveMyTask_Window.addCombobox('ReceiveWay',language["treatment"][languageStatus]+' :');
		$('#ReceiveWay').append('<option disabled="" hidden="" selected=""></option><option value="addTime">'+language["treatment_addTime"][languageStatus]+'</option>');
		$('#ReceiveWay').append('<option disabled="" hidden="" selected=""></option><option value="invalid">'+language["treatment_invalid"][languageStatus]+'</option>');
		$('#ReceiveWay').append('<option disabled="" hidden="" selected=""></option><option value="fail">'+language["scheduleBack_delpoint"][languageStatus]+'</option>');
		if(params.statusHtml.match("通知人不同意執行")){
			$('#ReceiveWay option[value=fail]').remove();
		}
		if(params.statusHtml.match("執行人不同意執行")){
			$('#ReceiveWay option[value=fail]').remove();
		}
		ReceiveMyTask_Window.addDatetimeField('ReceiveTime',language["changeTime"][languageStatus]+' :');
		$("#ReceiveTime_Group").children().attr("disabled","disabled");
		$("#ReceiveTime_Group").children().css('color','#BEBEBE');
		$("#ReceiveWay").change(function(){
			if($("#ReceiveWay").val()=="addTime"){
				$("#ReceiveTime_Group").children().attr("disabled",false);
				$("#ReceiveTime_Group").children().css('color','');
			}else{
				$("#ReceiveTime_Group").children().attr("disabled","disabled");
				$("#ReceiveTime_Group").children().css('color','#BEBEBE');
			}
		});
		ReceiveMyTask_Window.addYesNO_Button('',language["system_send"][languageStatus],null,function(){
			if($('#ReceiveTime').val()){
				//修改時差 改成＋0時區
				$.dateFormat = function(dateObject) {
				    var d = new Date(dateObject);
					return d.toISOString();
				};
				var data={
					"updateDate":$.dateFormat($('#ReceiveTime').val()),
					"status":$('#ReceiveWay').val()
				};
			}else{
				var data={
					"status":$('#ReceiveWay').val()
				};
			}
			var dc = (+new Date());
			jqueryAjax_Put(localStorage.task+'/Task/me/General/'+params.MyTaskID+'/'+params.TaskAssignedListID+'?_dc='+dc,JSON.stringify(data),function(Result)
						{
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
							    ReceiveMyTask_Window.close();
							    //刪除本頁面
							    deleteTab('taskTab_Y01_content');
							    //重新整理
							    myTaskView.load();
							    //跳到瀏覽頁面
							    $('#taskTab_Y01_a').click();
							});
							//隱藏 No 按鈕
							$('#task_Msg_No').css("display","none");
							//置中 Yes 按鈕
							$('#task_Msg_Yes').css({"margin-left":"0px","width":"100%"});
							
						},function(result){
							normalError_Msg_Withmask(result.message);
							$("#YesNo_Msg").width(300);
							$("#YesNo_Msg").height(168);
							$("#YesNo_Msg_Title").html(language["system_error"][languageStatus]);
							$("#YesNo_Msg_Yes").html(language["system_ok"][languageStatus]);
							//Debug
							$('#YesNo_Msg').css('z-index',100);
							$('#YesNo_Msg_Mask').css('z-index',100);
							// var taskErr_Msg = YesNo_Msg_Define.Initialize();
							// taskErr_Msg.setMask(false);
							// taskErr_Msg.setSmartdetect(false);
							// taskErr_Msg.setWidth(300);
							// taskErr_Msg.setHeight(168);
							// taskErr_Msg.setId('taskErr_Msg');
							// taskErr_Msg.setTitle(language["system_error"][languageStatus]);
							// taskErr_Msg.show();
							// taskErr_Msg.addMsgContent(result.message);
							// taskErr_Msg.addYesNO_Button('',language["system_ok"][languageStatus],null,
							// function()
							// {
							// 	//關閉 Msg
							//     taskErr_Msg.close();
							//     ReceiveMyTask_Window.close();
							//     //重新整理
							//     myTaskView.load();
							// });
							// //隱藏 No 按鈕
							// $('#taskErr_Msg_No').css("display","none");
							// //置中 Yes 按鈕
							// $('#taskErr_Msg_Yes').css({"margin-left":"0px","width":"100%"});
						},null);
		});
		//隱藏 No 按鈕
		$('#ReceiveMyTask_Window_No').css("display","none");
		//置中 Yes 按鈕
		$('#ReceiveMyTask_Window_Yes').css({"margin-left":"0px","width":"100%"});
	}catch(err){
		if(App_Debug)
		{
			console.log(err);
		}
	}

}

//我執行的工單的簽核畫面
function singOffWindow(params,ExecuteTaskStatus){
	try{
		//定義介面
		var ReceiveTask_Window = Window_Define.Initialize();
		ReceiveTask_Window.setMask(true);
		ReceiveTask_Window.setSmartdetect(false);
		ReceiveTask_Window.setWidth(350);
		ReceiveTask_Window.setHeight(200);
		ReceiveTask_Window.setId('ReceiveTask_Window');
		ReceiveTask_Window.setTitle(language["singTable"][languageStatus]);
		ReceiveTask_Window.show();
		ReceiveTask_Window.addTextarea('ExecuteTask_ReceiveContent',language["scheduleBack"][languageStatus]);
		//我執行的工單＿待接單
		if(ExecuteTaskStatus=="waitingReceive"){
			ReceiveTask_Window.addYesNO_Button(language["scheduleBack_no"][languageStatus],language["scheduleBack_ok"][languageStatus],
				//拒絕時
				function(){
					var data={
						"TaskAssignedExecutionContent":$('#ExecuteTask_ReceiveContent').val(),
						"TaskAssignedExecutionResult":false
					};
					var dc = (+new Date());
					jqueryAjax_Put(localStorage.task+'/Task/me/General/'+params.MyTaskID+'/'+params.TaskAssignedListID+'?_dc='+dc,JSON.stringify(data),function(Result)
								{
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
									    ReceiveTask_Window.close();
									    //刪除本頁面
									    deleteTab('executeTaskTab_Y01_content');
									    //重新整理
									    myExecuteTaskView.load();
									    //跳到瀏覽頁面
									    $('#executeTaskTab_Y01_a').click();    
									});
									//隱藏 No 按鈕
									$('#task_Msg_No').css("display","none");
									//置中 Yes 按鈕
									$('#task_Msg_Yes').css({"margin-left":"0px","width":"100%"});
									
								},function(result){
									normalError_Msg_Withmask(result.message);
									$("#YesNo_Msg").width(300);
									$("#YesNo_Msg").height(168);
									$("#YesNo_Msg_Title").html(language["system_error"][languageStatus]);
									$("#YesNo_Msg_Yes").html(language["system_ok"][languageStatus]);
									//Debug
									$('#YesNo_Msg').css('z-index',100);
									$('#YesNo_Msg_Mask').css('z-index',100);
									// var taskErr_Msg = YesNo_Msg_Define.Initialize();
									// taskErr_Msg.setMask(false);
									// taskErr_Msg.setSmartdetect(false);
									// taskErr_Msg.setWidth(300);
									// taskErr_Msg.setHeight(168);
									// taskErr_Msg.setId('taskErr_Msg');
									// taskErr_Msg.setTitle(language["system_error"][languageStatus]);
									// taskErr_Msg.show();
									// taskErr_Msg.addMsgContent(result.message);
									// taskErr_Msg.addYesNO_Button('',language["system_ok"][languageStatus],null,
									// function()
									// {
									// 	//關閉 Msg
									//     taskErr_Msg.close();
									//     ReceiveTask_Window.close();
									//     //重新整理
									//     myExecuteTaskView.load();	
									// });
									// //隱藏 No 按鈕
									// $('#taskErr_Msg_No').css("display","none");
									// //置中 Yes 按鈕
									// $('#taskErr_Msg_Yes').css({"margin-left":"0px","width":"100%"});
								},null);
				},
				//接受時
				function(){
					var data={
						"TaskAssignedExecutionContent":$('#ExecuteTask_ReceiveContent').val(),
						"TaskAssignedExecutionResult":true
					};
					var dc = (+new Date());
					jqueryAjax_Put(localStorage.task+'/Task/me/General/'+params.MyTaskID+'/'+params.TaskAssignedListID+'?_dc='+dc,JSON.stringify(data),function(Result)
								{
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
									    ReceiveTask_Window.close();
									    //刪除本頁面
									    deleteTab('executeTaskTab_Y01_content');
									    //重新整理
									    myExecuteTaskView.load();
									    //跳到瀏覽頁面
									    $('#executeTaskTab_Y01_a').click(); 
									});
									//隱藏 No 按鈕
									$('#task_Msg_No').css("display","none");
									//置中 Yes 按鈕
									$('#task_Msg_Yes').css({"margin-left":"0px","width":"100%"});
									
								},function(result){
									var taskErr_Msg = YesNo_Msg_Define.Initialize();
									taskErr_Msg.setMask(false);
									taskErr_Msg.setSmartdetect(false);
									taskErr_Msg.setWidth(300);
									taskErr_Msg.setHeight(168);
									taskErr_Msg.setId('taskErr_Msg');
									taskErr_Msg.setTitle(language["system_error"][languageStatus]);
									taskErr_Msg.show();
									taskErr_Msg.addMsgContent(result.message);
									taskErr_Msg.addYesNO_Button('',language["system_ok"][languageStatus],null,
									function()
									{
										//關閉 Msg
									    taskErr_Msg.close();
									    ReceiveTask_Window.close();
									    //重新整理
									    myExecuteTaskView.load();
									});
									//隱藏 No 按鈕
									$('#taskErr_Msg_No').css("display","none");
									//置中 Yes 按鈕
									$('#taskErr_Msg_Yes').css({"margin-left":"0px","width":"100%"});
								},null);
					ReceiveTask_Window.close();
				});
		}
		//我執行的工單＿進行中
		if(ExecuteTaskStatus=="processing"){
			ReceiveTask_Window.addYesNO_Button(language["scheduleBack_Nosuccess"][languageStatus],language["scheduleBack_success"][languageStatus],
				//拒絕時
				function(){
					var data={
						"TaskAssignedExecutionContent":$('#ExecuteTask_ReceiveContent').val(),
						"TaskAssignedExecutionResult":false
					};
					var dc = (+new Date());
					jqueryAjax_Put(localStorage.task+'/Task/me/General/'+params.MyTaskID+'/'+params.TaskAssignedListID+'?_dc='+dc,JSON.stringify(data),function(Result)
								{
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
									    ReceiveTask_Window.close();
									    //刪除本頁面
									    deleteTab('executeTaskTab_Y01_content');
									    //重新整理
									    myExecuteTaskView.load();
									    //跳到瀏覽頁面
									    $('#executeTaskTab_Y01_a').click(); 
									});
									//隱藏 No 按鈕
									$('#task_Msg_No').css("display","none");
									//置中 Yes 按鈕
									$('#task_Msg_Yes').css({"margin-left":"0px","width":"100%"});
									
								},function(result){
									var taskErr_Msg = YesNo_Msg_Define.Initialize();
									taskErr_Msg.setMask(false);
									taskErr_Msg.setSmartdetect(false);
									taskErr_Msg.setWidth(300);
									taskErr_Msg.setHeight(168);
									taskErr_Msg.setId('taskErr_Msg');
									taskErr_Msg.setTitle(language["system_error"][languageStatus]);
									taskErr_Msg.show();
									taskErr_Msg.addMsgContent(result.message);
									taskErr_Msg.addYesNO_Button('',language["system_ok"][languageStatus],null,
									function()
									{
										//關閉 Msg
									    taskErr_Msg.close();
									    ReceiveTask_Window.close();
									    //重新整理
									    myExecuteTaskView.load();
									});
									//隱藏 No 按鈕
									$('#taskErr_Msg_No').css("display","none");
									//置中 Yes 按鈕
									$('#taskErr_Msg_Yes').css({"margin-left":"0px","width":"100%"});
								},null);
				},
				//接受時
				function(){
					var data={
						"TaskAssignedExecutionContent":$('#ExecuteTask_ReceiveContent').val(),
						"TaskAssignedExecutionResult":true
					};
					var dc = (+new Date());
					jqueryAjax_Put(localStorage.task+'/Task/me/General/'+params.MyTaskID+'/'+params.TaskAssignedListID+'?_dc='+dc,JSON.stringify(data),function(Result)
								{
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
									    ReceiveTask_Window.close();
									    //刪除本頁面
									    deleteTab('executeTaskTab_Y01_content');
									    //重新整理
									    myExecuteTaskView.load();
									    //跳到瀏覽頁面
									    $('#executeTaskTab_Y01_a').click(); 
									});
									//隱藏 No 按鈕
									$('#task_Msg_No').css("display","none");
									//置中 Yes 按鈕
									$('#task_Msg_Yes').css({"margin-left":"0px","width":"100%"});
									
								},function(result){
									var taskErr_Msg = YesNo_Msg_Define.Initialize();
									taskErr_Msg.setMask(false);
									taskErr_Msg.setSmartdetect(false);
									taskErr_Msg.setWidth(300);
									taskErr_Msg.setHeight(168);
									taskErr_Msg.setId('taskErr_Msg');
									taskErr_Msg.setTitle(language["system_error"][languageStatus]);
									taskErr_Msg.show();
									taskErr_Msg.addMsgContent(result.message);
									taskErr_Msg.addYesNO_Button('',language["system_ok"][languageStatus],null,
									function()
									{
										//關閉 Msg
									    taskErr_Msg.close();
									    ReceiveTask_Window.close();
									    //重新整理
									    myExecuteTaskView.load();
									});
									//隱藏 No 按鈕
									$('#taskErr_Msg_No').css("display","none");
									//置中 Yes 按鈕
									$('#taskErr_Msg_Yes').css({"margin-left":"0px","width":"100%"});
								},null);
					ReceiveTask_Window.close();
				});
		}
		
		

	}catch(err){
		if(App_Debug)
		{
			console.log(err);
		}
	}

}

//我簽核的工單的執行畫面
function singOffProcessingWindow(params,ProcessingTaskStatus){
	try{
		console.log(params);
		console.log(ProcessingTaskStatus);
		//定義介面
		ReceiveProcessingTask_Window = Window_Define.Initialize();
		ReceiveProcessingTask_Window.setMask(true);
		ReceiveProcessingTask_Window.setSmartdetect(false);
		ReceiveProcessingTask_Window.setWidth(350);
		ReceiveProcessingTask_Window.setHeight(240);
		ReceiveProcessingTask_Window.setId('ReceiveProcessingTask_Window');
		ReceiveProcessingTask_Window.setTitle(language["singTable"][languageStatus]);
		ReceiveProcessingTask_Window.show();
		ReceiveProcessingTask_Window.addCombobox('singReceiveWay',language["treatment"][languageStatus]+' :');
		//若是開單者
		if(params.OwnerId==localStorage.userID){
			$('#singReceiveWay').append('<option disabled="" hidden="" selected=""></option><option value="scheduleBack_pass">'+language["scheduleBack_pass"][languageStatus]+'</option>');
			$('#singReceiveWay').append('<option disabled="" hidden="" selected=""></option><option value="scheduleBack_return">'+language["scheduleBack_return"][languageStatus]+'</option>');
			//$('#singReceiveWay').append('<option disabled="" hidden="" selected=""></option><option value="invalid">'+language["treatment_invalid"][languageStatus]+'</option>');
		}//若是檢查者
		else if(params.TaskAssignedMainCheck==localStorage.userID){
			$('#singReceiveWay').append('<option disabled="" hidden="" selected=""></option><option value="scheduleBack_pass">'+language["schedule_pass"][languageStatus]+'</option>');
			$('#singReceiveWay').append('<option disabled="" hidden="" selected=""></option><option value="scheduleBack_return">'+language["schedule_return"][languageStatus]+'</option>');
		}else{
			$('#singReceiveWay').append('<option disabled="" hidden="" selected=""></option><option value="scheduleBack_pass">'+language["scheduleBack_pass"][languageStatus]+'</option>');
			$('#singReceiveWay').append('<option disabled="" hidden="" selected=""></option><option value="scheduleBack_return">'+language["scheduleBack_return"][languageStatus]+'</option>');
		}

		ReceiveProcessingTask_Window.addTextarea('ProcessingTask_ReceiveContent',language["scheduleSuggestion"][languageStatus]);
		ReceiveProcessingTask_Window.addYesNO_Button('',language["system_send"][languageStatus],null,
			function(){
				var data={};
				if($('#singReceiveWay').val()=="scheduleBack_pass"){
					data={
						"TaskAssignedExecutionContent":$('#ProcessingTask_ReceiveContent').val(),
						"TaskAssignedExecutionResult":true
					};
				}else if($('#singReceiveWay').val()=="scheduleBack_return"){
					data={
						"TaskAssignedExecutionContent":$('#ProcessingTask_ReceiveContent').val(),
						"TaskAssignedExecutionResult":false
					};
				}else if($('#singReceiveWay').val()=="treatment_invalid"){
					data={
						"TaskAssignedExecutionContent":$('#ProcessingTask_ReceiveContent').val(),
						"TaskAssignedExecutionResult":'invalid'
					};
				}
				var dc = (+new Date());
				jqueryAjax_Put(localStorage.task+'/Task/me/General/'+params.MyTaskID+'/'+params.TaskAssignedListID+'?_dc='+dc,JSON.stringify(data),function(Result)
							{
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
								    ReceiveProcessingTask_Window.close();
								    //刪除本頁面
								    deleteTab('processingTaskTab_Y01_content');
								    //重新整理
								    myProcessingTaskView.load();
								    //跳到瀏覽頁面
								    $('#processingTaskTab_Y01_a').click();
								});
								//隱藏 No 按鈕
								$('#task_Msg_No').css("display","none");
								//置中 Yes 按鈕
								$('#task_Msg_Yes').css({"margin-left":"0px","width":"100%"});
								
							},function(result){
								normalError_Msg_Withmask(result.message);
								$("#YesNo_Msg").width(300);
								$("#YesNo_Msg").height(168);
								$("#YesNo_Msg_Title").html(language["system_error"][languageStatus]);
								$("#YesNo_Msg_Yes").html(language["system_ok"][languageStatus]);
								//Debug
								$('#YesNo_Msg').css('z-index',100);
								$('#YesNo_Msg_Mask').css('z-index',100);
								// var taskErr_Msg = YesNo_Msg_Define.Initialize();
								// taskErr_Msg.setMask(false);
								// taskErr_Msg.setSmartdetect(false);
								// taskErr_Msg.setWidth(300);
								// taskErr_Msg.setHeight(168);
								// taskErr_Msg.setId('taskErr_Msg');
								// taskErr_Msg.setTitle(language["system_error"][languageStatus]);
								// taskErr_Msg.show();
								// taskErr_Msg.addMsgContent(result.message);
								// taskErr_Msg.addYesNO_Button('',language["system_ok"][languageStatus],null,
								// function()
								// {
								// 	//關閉 Msg
								//     taskErr_Msg.close();
								//     ReceiveProcessingTask_Window.close();
								//     //重新整理
								//     myProcessingTaskView.load();
								// });
								// //隱藏 No 按鈕
								// $('#taskErr_Msg_No').css("display","none");
								// //置中 Yes 按鈕
								// $('#taskErr_Msg_Yes').css({"margin-left":"0px","width":"100%"});
							},null);
			});
		$('#ReceiveProcessingTask_Window_No').css("display","none");
		//置中 Yes 按鈕
		$('#ReceiveProcessingTask_Window_Yes').css({"margin-left":"0px","width":"100%"});

	}catch(err){
		if(App_Debug)
		{
			console.log(err);
		}
	}

}

//搜尋工單的視窗
function createSelectViewTaskWindow(firstView){
	try{
		//定義介面
		var selectTask_Window = Window_Define.Initialize();
		selectTask_Window.setMask(true);
		selectTask_Window.setWidth(480);
		selectTask_Window.setHeight(200);
		selectTask_Window.setId('selectTask_Window');
		selectTask_Window.setTitle(language["selectTask"][languageStatus]);
		selectTask_Window.show();
		selectDept="";
		selectTask_Window.addComboboxPagging('selectTaskDeptment',language["selectDepartment"][languageStatus]+' :',{
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
		$("#selectTaskDeptment_valueField").bind("DOMSubtreeModified", function() {
		    selectTask_Window.selectTaskEmployee.setComboboxPagging_Value(null);
		    selectDept=selectTask_Window.selectTaskDeptment.getComboboxPagging_Value();
		    empObject.Url=localStorage.human+'/Department/' + selectDept +'/empList?_dc=' + new Date().getTime();
			empObject.searchUrl=localStorage.human+'/Department/' + selectDept +'/empList?_dc=' + new Date().getTime();
			selectTask_Window.selectTaskEmployee.ComboboxPagging_load();
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
		selectTask_Window.addComboboxPagging('selectTaskEmployee',language["selectEmployee"][languageStatus]+' :',empObject);

		selectTask_Window.addYesNO_Button('',language["system_ok"][languageStatus],null,
			//Yes Function
			function(){
				//送出資料
				if(selectTask_Window.selectTaskEmployee.getComboboxPagging_Value()){
					createSelectTaskPage(selectTask_Window.selectTaskEmployee.getComboboxPagging_Value(),$('#selectTaskEmployee_displayField').html());
					selectTask_Window.close();
				}else{
					var selectDaily_Msg = YesNo_Msg_Define.Initialize();
					selectDaily_Msg.setMask(false);
					selectDaily_Msg.setSmartdetect(false);
					selectDaily_Msg.setWidth(300);
					selectDaily_Msg.setHeight(168);
					selectDaily_Msg.setId('selectDaily_Msg');
					selectDaily_Msg.setTitle(language["system_msg"][languageStatus]);
					selectDaily_Msg.show();
					selectDaily_Msg.addMsgContent("缺少必要欄位");
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
		$('#selectTask_Window_No').css("display","none");
		//置中 Yes 按鈕
		$('#selectTask_Window_Yes').css({"margin-left":"0px","width":"100%"});

	}catch(err){
		if(App_Debug)
		{
			console.log(err);
		}
	}

}

//搜尋工單的頁面
function createSelectTaskPage(id,empName)
{
	try
	{
		//如果沒有的話新增一個 tab
		if(!$('#selectTaskTab_Y01').size()){
			addTab('selectTaskTab_Y01',empName+language["byTask"][languageStatus]);
		}else{
		//如果有的話改變tab名字
			$('#selectTaskTab_Y01_a').html(empName+language["byTask"][languageStatus]);
		}
		//建立daily grid
		var selectTaskView = Grid_Panel_Define.Initialize();
		selectTaskView.setId('selectTaskTab_Y01');
		selectTaskView.setResizer_ID('selectTaskViewPage_Y01');
		selectTaskView.setHeader_Title(['No.','ID',"工單編號","工單名稱","發單者","檢查者","接單者","開始時間","結束時間","工單狀態"]);
		selectTaskView.setModel(['Number','TaskAssignedID','TaskAssignedNumber','TaskAssignedTitle','OwnerName','MainCheckEmployeeName','MainResponsibleEmployeeName','TaskAssignedStartTime','TaskAssignedEndTime','TaskAssignedStatus']);
		selectTaskView.setPagesize(10);
		selectTaskView.setfieldShow([true,false,true,true,false,true,true,true,true,true]);
		selectTaskView.setHeader_Width(['5%','0%','10%','15%','0%','15%','15%','15%','15%','9%']); // 99.5%
		selectTaskView.createHeader();
		selectTaskView.createTable();
		//改寫欄位
		selectTaskView.setLoad_Callback(function()
		{
			for(var i = 0; i < $('#selectTaskTab_Y01_Table').children().length; i++)
			{
				//編號
				$('#selectTaskTab_Y01_Table_Inner_' + i).children().eq(0).html(i+1);
				//時間欄位顯示設定
				$('#selectTaskTab_Y01_Table_Inner_' + i).children().eq(7).html(getDate($('#selectTaskTab_Y01_Table_Inner_' + i).children().eq(7).html()) + ' ' + getTime($('#selectTaskTab_Y01_Table_Inner_' + i).children().eq(7).html()));
				$('#selectTaskTab_Y01_Table_Inner_' + i).children().eq(8).html(getDate($('#selectTaskTab_Y01_Table_Inner_' + i).children().eq(8).html()) + ' ' + getTime($('#selectTaskTab_Y01_Table_Inner_' + i).children().eq(8).html()));
				//狀態顯示
				if($('#selectTaskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="工單成功完成"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:140px;color:white;background-color:green;margin:0px auto;border-radius:4px'>"+language["task_status_success"][languageStatus]+"</div>";
					$('#selectTaskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#selectTaskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="進行中"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:80px;color:white;background-color:blue;margin:0px auto;border-radius:4px'>"+language["task_status_doing"][languageStatus]+"</div>";
					$('#selectTaskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#selectTaskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="工單逾期失敗"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:80px;color:white;background-color:red;margin:0px auto;border-radius:4px'>"+language["task_status_fail"][languageStatus]+"</div>";
					$('#selectTaskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#selectTaskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="已逾期,等待開單者確認"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:140px;color:white;background-color:red;margin:0px auto;border-radius:4px'>"+language["task_status_waitcheck"][languageStatus]+"</div>";
					$('#selectTaskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#selectTaskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="執行人不同意執行"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:140px;color:white;background-color:red;margin:0px auto;border-radius:4px'>"+language["task_status_maindont"][languageStatus]+"</div>";
					$('#selectTaskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#selectTaskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="作廢工單"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:70px;color:white;background-color:red;margin:0px auto;border-radius:4px'>"+language["task_status_failtask"][languageStatus]+"</div>";
					$('#selectTaskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#selectTaskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="失敗"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:70px;color:white;background-color:red;margin:0px auto;border-radius:4px'>"+language["task_status_failtask"][languageStatus]+"</div>";
					$('#selectTaskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#selectTaskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="檢查人檢查失敗"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:140px;color:white;background-color:red;margin:0px auto;border-radius:4px'>"+language["task_status_checkfail"][languageStatus]+"</div>";
					$('#selectTaskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#selectTaskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="執行人放棄執行"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:140px;color:white;background-color:red;margin:0px auto;border-radius:4px'>"+language["task_status_domanquit"][languageStatus]+"</div>";
					$('#selectTaskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}else if($('#selectTaskTab_Y01_Table_Inner_' + i).children().eq(9).html()=="必要通知人不同意執行"){
					var input="<div style='margin-top:6% !important;line-height:40px;width:140px;color:white;background-color:red;margin:0px auto;border-radius:4px'>"+language["task_status_taskingquit"][languageStatus]+"</div>";
					$('#selectTaskTab_Y01_Table_Inner_' + i).children().eq(9).html(input);
				}
	
				//設定雙點擊事件
				$('#selectTaskTab_Y01_Table_Inner_' + i).dblclick(function(){
					var params={};
					params.MyTaskID=$('#'+this.id).children().eq(1).html();
					if($('#selectTaskTab_Y01_content').size()){
						$('#selectTaskTab_Y01_content').empty();
						createSelectContentPage(params);
					}else{
						createSelectContentPage(params);
					}
				});
				
			};
		});
		selectTaskView.createPagging();
		//設定網址取用方法
		selectTaskView.getUrl = function getUrl()
		{
			try
			{
				//組合參數
				var Start = selectTaskView.getStart();
				var Limit = selectTaskView.getPagesize();
				var dc = (+new Date());
				return localStorage.task+"/Task/"+id+"/General/Execute?status=waitingReceive&start="+Start+"&limit="+Limit+"&_dc="+dc;
			}
			catch(err)
			{
				if(App_Debug)
				{
					console.log(err);
				}
			}
		}

		//新增 settingHeader
		new function()
		{
			//新增 Header
			$('#' + selectTaskView.getId()).prepend("<div id='task_Y02_selectTaskView_settingHeader'></div>");
			$("#task_Y02_selectTaskView_settingHeader").css
			({
				"height":"50px",
			    "width":"101%",
		        "margin-left":"-1px",
			    "background-color":"rgb(22, 103, 119)",
			    "position":"relative"
			});
			var task_Y02_selectTaskView_settingHeader_Button_Class = 
			{
				"height":"24px",
				"width":"150px",
				"font-size":'16pt',
				"color":"white",
				"text-align":"center",
				"padding-bottom":"5px",
				"border-bottom-style":"solid",
				"border-color":"rgb(22, 103, 119)",
				"border-width":'3px',
				"float":"left",
				"position":"absolute",
				"top":"0px",
				"right":"0px",
				"bottom":"0px",
				"margin":"auto",
				"cursor":"pointer"
			};
			//待接單
			$("#task_Y02_selectTaskView_settingHeader").append("<div id='task_Y02_selectTaskView_settingHeader_Button01'></div>");
			$("#task_Y02_selectTaskView_settingHeader_Button01").html(language["status_waitTask"][languageStatus]);
			$("#task_Y02_selectTaskView_settingHeader_Button01").css(task_Y02_selectTaskView_settingHeader_Button_Class);
			$("#task_Y02_selectTaskView_settingHeader_Button01").css("left","-71.42%");
			$("#task_Y02_selectTaskView_settingHeader_Button01").click(function()
			{
				$("#task_Y02_selectTaskView_settingHeader_Button01").css("border-color","rgb(33, 183, 208)");
				$("#task_Y02_selectTaskView_settingHeader_Button02").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_selectTaskView_settingHeader_Button03").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_selectTaskView_settingHeader_Button04").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_selectTaskView_settingHeader_Button05").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_selectTaskView_settingHeader_Button06").css("border-color","rgb(22, 103, 119)");
				//設定網址取用方法
				selectTaskView.getUrl = function getUrl()
				{
					try
					{
						//組合參數
						var Start = selectTaskView.getStart();
						var Limit = selectTaskView.getPagesize();
						var dc = (+new Date());
						return localStorage.task+"/Task/"+id+"/General/Execute?status=waitingReceive&start="+Start+"&limit="+Limit+"&_dc="+dc;
					}
					catch(err)
					{
						if(App_Debug)
						{
							console.log(err);
						}
					}
				}
				//載入資料
				selectTaskView.load();
			});
			//執行中
			$("#task_Y02_selectTaskView_settingHeader").append("<div id='task_Y02_selectTaskView_settingHeader_Button02'></div>");
			$("#task_Y02_selectTaskView_settingHeader_Button02").html(language["status_onDoing"][languageStatus]);
			$("#task_Y02_selectTaskView_settingHeader_Button02").css(task_Y02_selectTaskView_settingHeader_Button_Class);
			$("#task_Y02_selectTaskView_settingHeader_Button02").css("left","-42.85%");
			$("#task_Y02_selectTaskView_settingHeader_Button02").click(function()
			{
				$("#task_Y02_selectTaskView_settingHeader_Button01").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_selectTaskView_settingHeader_Button02").css("border-color","rgb(33, 183, 208)");
				$("#task_Y02_selectTaskView_settingHeader_Button03").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_selectTaskView_settingHeader_Button04").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_selectTaskView_settingHeader_Button05").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_selectTaskView_settingHeader_Button06").css("border-color","rgb(22, 103, 119)");
				//設定網址取用方法
				selectTaskView.getUrl = function getUrl()
				{
					try
					{
						//組合參數
						var Start = selectTaskView.getStart();
						var Limit = selectTaskView.getPagesize();
						var dc = (+new Date());
						return localStorage.task+"/Task/"+id+"/General/Execute?status=processing&start="+Start+"&limit="+Limit+"&_dc="+dc;
					}
					catch(err)
					{
						if(App_Debug)
						{
							console.log(err);
						}
					}
				}
				//載入資料
				selectTaskView.load();
			});
			//待審核
			$("#task_Y02_selectTaskView_settingHeader").append("<div id='task_Y02_selectTaskView_settingHeader_Button03'></div>");
			$("#task_Y02_selectTaskView_settingHeader_Button03").html(language["status_waitCheck"][languageStatus]);
			$("#task_Y02_selectTaskView_settingHeader_Button03").css(task_Y02_selectTaskView_settingHeader_Button_Class);
			$("#task_Y02_selectTaskView_settingHeader_Button03").css("left","-14.28%");
			$("#task_Y02_selectTaskView_settingHeader_Button03").click(function()
			{
				$("#task_Y02_selectTaskView_settingHeader_Button01").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_selectTaskView_settingHeader_Button02").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_selectTaskView_settingHeader_Button03").css("border-color","rgb(33, 183, 208)");
				$("#task_Y02_selectTaskView_settingHeader_Button04").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_selectTaskView_settingHeader_Button05").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_selectTaskView_settingHeader_Button06").css("border-color","rgb(22, 103, 119)");
				//設定網址取用方法
				selectTaskView.getUrl = function getUrl()
				{
					try
					{
						//組合參數
						var Start = selectTaskView.getStart();
						var Limit = selectTaskView.getPagesize();
						var dc = (+new Date());
						return localStorage.task+"/Task/"+id+"/General/Execute?status=waitingCheck&start="+Start+"&limit="+Limit+"&_dc="+dc;
					}
					catch(err)
					{
						if(App_Debug)
						{
							console.log(err);
						}
					}
				}
				//載入資料
				selectTaskView.load();
			});
			//已成功
			$("#task_Y02_selectTaskView_settingHeader").append("<div id='task_Y02_selectTaskView_settingHeader_Button04'></div>");
			$("#task_Y02_selectTaskView_settingHeader_Button04").html(language["status_success"][languageStatus]);
			$("#task_Y02_selectTaskView_settingHeader_Button04").css(task_Y02_selectTaskView_settingHeader_Button_Class);
			$("#task_Y02_selectTaskView_settingHeader_Button04").css("left","14.28%");
			$("#task_Y02_selectTaskView_settingHeader_Button04").click(function()
			{
				$("#task_Y02_selectTaskView_settingHeader_Button01").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_selectTaskView_settingHeader_Button02").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_selectTaskView_settingHeader_Button03").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_selectTaskView_settingHeader_Button04").css("border-color","rgb(33, 183, 208)");
				$("#task_Y02_selectTaskView_settingHeader_Button05").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_selectTaskView_settingHeader_Button06").css("border-color","rgb(22, 103, 119)");
				//設定網址取用方法
				selectTaskView.getUrl = function getUrl()
				{
					try
					{
						//組合參數
						var Start = selectTaskView.getStart();
						var Limit = selectTaskView.getPagesize();
						var dc = (+new Date());
						return localStorage.task+"/Task/"+id+"/General/Execute?status=success&start="+Start+"&limit="+Limit+"&_dc="+dc;
					}
					catch(err)
					{
						if(App_Debug)
						{
							console.log(err);
						}
					}
				}
				//載入資料
				selectTaskView.load();
			});
			//已失敗
			$("#task_Y02_selectTaskView_settingHeader").append("<div id='task_Y02_selectTaskView_settingHeader_Button05'></div>");
			$("#task_Y02_selectTaskView_settingHeader_Button05").html(language["status_fail"][languageStatus]);
			$("#task_Y02_selectTaskView_settingHeader_Button05").css(task_Y02_selectTaskView_settingHeader_Button_Class);
			$("#task_Y02_selectTaskView_settingHeader_Button05").css("left","42.85%");
			$("#task_Y02_selectTaskView_settingHeader_Button05").click(function()
			{
				$("#task_Y02_selectTaskView_settingHeader_Button01").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_selectTaskView_settingHeader_Button02").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_selectTaskView_settingHeader_Button03").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_selectTaskView_settingHeader_Button04").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_selectTaskView_settingHeader_Button05").css("border-color","rgb(33, 183, 208)");
				$("#task_Y02_selectTaskView_settingHeader_Button06").css("border-color","rgb(22, 103, 119)");
				//設定網址取用方法
				selectTaskView.getUrl = function getUrl()
				{
					try
					{
						//組合參數
						var Start = selectTaskView.getStart();
						var Limit = selectTaskView.getPagesize();
						var dc = (+new Date());
						return localStorage.task+"/Task/"+id+"/General/Execute?status=fail&start="+Start+"&limit="+Limit+"&_dc="+dc;
					}
					catch(err)
					{
						if(App_Debug)
						{
							console.log(err);
						}
					}
				}
				//載入資料
				selectTaskView.load();
			});
			//已逾期
			$("#task_Y02_selectTaskView_settingHeader").append("<div id='task_Y02_selectTaskView_settingHeader_Button06'></div>");
			$("#task_Y02_selectTaskView_settingHeader_Button06").html(language["status_overdue"][languageStatus]);
			$("#task_Y02_selectTaskView_settingHeader_Button06").css(task_Y02_selectTaskView_settingHeader_Button_Class);
			$("#task_Y02_selectTaskView_settingHeader_Button06").css("left","71.42%");
			$("#task_Y02_selectTaskView_settingHeader_Button06").click(function()
			{
				$("#task_Y02_selectTaskView_settingHeader_Button01").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_selectTaskView_settingHeader_Button02").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_selectTaskView_settingHeader_Button03").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_selectTaskView_settingHeader_Button04").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_selectTaskView_settingHeader_Button05").css("border-color","rgb(22, 103, 119)");
				$("#task_Y02_selectTaskView_settingHeader_Button06").css("border-color","rgb(33, 183, 208)");
				//設定網址取用方法
				selectTaskView.getUrl = function getUrl()
				{
					try
					{
						//組合參數
						var Start = selectTaskView.getStart();
						var Limit = selectTaskView.getPagesize();
						var dc = (+new Date());
						return localStorage.task+"/Task/"+id+"/General/Execute?status=overdue&start="+Start+"&limit="+Limit+"&_dc="+dc;
					}
					catch(err)
					{
						if(App_Debug)
						{
							console.log(err);
						}
					}
				}
				//載入資料
				selectTaskView.load();
			});
		}
		//預設 settingHeader
		$("#task_Y02_selectTaskView_settingHeader_Button01").click();
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}

//搜尋工單內容頁面
function createSelectContentPage(params)
{
	try
	{
		//新增一個 tab
		addTab('selectTaskTab_Y01_content',language["selectTaskDetail"][languageStatus]);
		//取得selectTask Content
		var dc = (+new Date());
		jqueryAjax_Get(localStorage.task+"/Task/me/General/"+params.MyTaskID+"?_dc="+dc,
			//成功後
			function(result){
				//主頁面
				$('#selectTaskTab_Y01_content').append('<div id="selectTaskTab_Y01_content_main"></div>');
				$('#selectTaskTab_Y01_content_main').css({
					"background-color":"#cecece",
					"height":"calc(100% - 35px)",
					"width":"100%",
					"position":"absolute"
				});
				//主白色框架內容
				$('#selectTaskTab_Y01_content_main').append('<div id="selectTaskTab_Y01_content_whitePanel"></div>');
				$('#selectTaskTab_Y01_content_whitePanel').css({
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
				$('#selectTaskTab_Y01_content_whitePanel').append("<div id='selectTaskTab_Y01_content_Number'>"+language["TaskAssignedNumber"][languageStatus]+"："+TaskAssignedNumber+"</div>");
				$('#selectTaskTab_Y01_content_Number').css({
								"font-size":"12pt",
								"margin-top":"30px",
								"margin-left":"250px"
								});
				//TitleText
				var TitleText=result.data.TaskAssignedTitle;
				$('#selectTaskTab_Y01_content_whitePanel').append("<div id='selectTaskTab_Y01_content_titleText'>"+language["TaskAssignedTitle"][languageStatus]+"："+TitleText+"</div>");
				$('#selectTaskTab_Y01_content_titleText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//createDateText
				var createDateText=getDate(result.data.TaskAssignedCreateTime)+" "+getTime(result.data.TaskAssignedCreateTime);
				$('#selectTaskTab_Y01_content_whitePanel').append("<div id='selectTaskTab_Y01_content_createDateText'>"+language["TaskAssignedCreateTime"][languageStatus]+"："+createDateText+"</div>");
				$('#selectTaskTab_Y01_content_createDateText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//startDateText
				var startDateText=getDate(result.data.TaskAssignedStartTime)+" "+getTime(result.data.TaskAssignedStartTime);
				$('#selectTaskTab_Y01_content_whitePanel').append("<div id='selectTaskTab_Y01_content_startDateText'>"+language["TaskAssignedStartTime"][languageStatus]+"："+startDateText+"</div>");
				$('#selectTaskTab_Y01_content_startDateText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//endDateText
				var endDateText=getDate(result.data.TaskAssignedEndTime)+" "+getTime(result.data.TaskAssignedEndTime);
				$('#selectTaskTab_Y01_content_whitePanel').append("<div id='selectTaskTab_Y01_content_endDateText'>"+language["TaskAssignedEndTime"][languageStatus]+"："+endDateText+"</div>");
				$('#selectTaskTab_Y01_content_endDateText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//OwnerNameText
				var ownerNameText=result.data.OwnerName;
				$('#selectTaskTab_Y01_content_whitePanel').append("<div id='selectTaskTab_Y01_content_OwnerNameText'>"+language["OwnerName"][languageStatus]+"："+ownerNameText+"</div>");
				$('#selectTaskTab_Y01_content_OwnerNameText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//MainCheckEmployeeNameText
				var mainCheckEmployeeNameText=result.data.MainCheckEmployeeName;
				$('#selectTaskTab_Y01_content_whitePanel').append("<div id='selectTaskTab_Y01_content_MainCheckEmployeeNameText'>"+language["MainCheckEmployeeName"][languageStatus]+"："+mainCheckEmployeeNameText+"</div>");
				$('#selectTaskTab_Y01_content_MainCheckEmployeeNameText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//MainResponsibleEmployeeNameText
				var mainResponsibleEmployeeNameText=result.data.MainResponsibleEmployeeName;
				$('#selectTaskTab_Y01_content_whitePanel').append("<div id='selectTaskTab_Y01_content_MainResponsibleEmployeeNameText'>"+language["MainResponsibleEmployeeName"][languageStatus]+"："+mainResponsibleEmployeeNameText+"</div>");
				$('#selectTaskTab_Y01_content_MainResponsibleEmployeeNameText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//successPoint
				var TaskAssignedSuccessRewardText=result.data.TaskAssignedSuccessReward;
				$('#selectTaskTab_Y01_content_whitePanel').append("<div id='selectTaskTab_content_TaskAssignedSuccessRewardText'>"+language["task_successPoint"][languageStatus]+"："+TaskAssignedSuccessRewardText+"</div>");
				$('#selectTaskTab_content_TaskAssignedSuccessRewardText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//failPoint
				var TaskAssignedFailPunishText=result.data.TaskAssignedFailPunish;
				$('#selectTaskTab_Y01_content_whitePanel').append("<div id='selectTaskTab_content_TaskAssignedFailPunishText'>"+language["task_failPoint"][languageStatus]+"："+TaskAssignedFailPunishText+"</div>");
				$('#selectTaskTab_content_TaskAssignedFailPunishText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//TaskAssignedStatusText
				var taskAssignedStatusText=result.data.TaskAssignedStatus;
				$('#selectTaskTab_Y01_content_whitePanel').append("<div id='selectTaskTab_Y01_content_TaskAssignedStatusText'>"+language["TaskAssignedStatus"][languageStatus]+"："+taskAssignedStatusText+"</div>");
				$('#selectTaskTab_Y01_content_TaskAssignedStatusText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"margin-left":"250px"
								});
				//contentPanel
				$('#selectTaskTab_Y01_content_whitePanel').append('<div id="selectTaskTab_Y01_content_ContentPanel"></div>');
				$('#selectTaskTab_Y01_content_ContentPanel').css({
					"background-color":"rgb(255, 255, 255)",
					"border-radius":"15pt",
					"height":"200px",
					"width":"400px",
					"margin-left":"240px",
					"margin-top":"15px",
					"position":"absolute",
					"border-style":"groove",
					"box-shadow":"2px 2px rgba(20%,20%,40%,0.5)",
				});
				//contentPanelTitle
				$('#selectTaskTab_Y01_content_ContentPanel').append('<div id="selectTaskTab_Y01_content_ContentPanelTitle">'+language["TaskAssignedContent"][languageStatus]+'</div>');
				$('#selectTaskTab_Y01_content_ContentPanelTitle').css({
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
				    "filter": "progid:DXImageTransform.Microsoft.gradient( startColorstr='#5474a5', endColorstr='#6690be',GradientType=1 )",

				});
				//contentText
				var taskContentText=result.data.TaskAssignedContent;
				$('#selectTaskTab_Y01_content_ContentPanel').append("<div id='selectTaskTab_Y01_content_contentText'>"+taskContentText+"</div>");
				$('#selectTaskTab_Y01_content_contentText').css({
								"width":"360px",
								"height":"200px",
								"font-size":"12pt",
								"margin-top":"10px",
								"margin-left":"20px",
								"word-wrap":"break-word",
								"overflow":"auto"
								});
				//流程框架內容
				$('#selectTaskTab_Y01_content_main').append('<div id="selectTaskTab_Y01_content_whiteListPanel"></div>');
				$('#selectTaskTab_Y01_content_whiteListPanel').css({
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
				$('#selectTaskTab_Y01_content_whiteListPanel').append("<div id='selectTaskTab_Y01_content_listTitleText'>"+language["task_schedule"][languageStatus]+"</div>");
				$('#selectTaskTab_Y01_content_listTitleText').css({
								"font-size":"12pt",
								"margin-top":"15px",
								"text-align":"center"
								});
				//工單流程圖筐
				$('#selectTaskTab_Y01_content_whiteListPanel').append("<div id='selectTaskTab_Y01_content_listChartView'></div>");
				$('#selectTaskTab_Y01_content_listChartView').css({
								"height":"calc(100% - 21px)",
								"font-size":"12pt",
								"margin-top":"15px",
								"width":"300px",
								"text-align":"center",
								"position":"absolute",
								"word-wrap":"break-word",
								"overflow":"auto"
								});
				//流程線框架
				$('#selectTaskTab_Y01_content_listChartView').append("<div id='selectTaskTab_Y01_content_listChartLineContent'></div>");
				$('#selectTaskTab_Y01_content_listChartLineContent').css({
								"height":"600px",
								"font-size":"12pt",
								"margin-top":"15px",
								"width":"60px",
								"text-align":"center",
								"position":"absolute",
								});
				jqueryAjax_Get(localStorage.daily+"/Task/me/General/"+params.MyTaskID+"/list?_dc="+dc,
					//成功後
					function(result){
						//將每個流程會製成圖
						for(var i=0;i<result.data.length;i++){
							var output=result.data[i];
							var inputColor="";
							var imgSrc="";
							var line1Height="0px";
							var line2Height="160px";
							//繪製流程線
							if(output.TaskAssignedExecutionStatus=="已完成"){
								inputColor="green";
								imgSrc="status_completed";
								line1Height="30px";
								line2Height="190px";
							}else if(output.TaskAssignedExecutionStatus=="進行中"){
								inputColor="#005AB5";
								imgSrc="status_in-progress";
								line2Height="170px";
							}else if(output.TaskAssignedExecutionStatus=="已失敗"){
								inputColor="red";
								imgSrc="status_fail";
								line2Height="170px";
							}else{
								inputColor="rgb(206,206,206)";
								imgSrc="status_not-work";
							}
							$('#selectTaskTab_Y01_content_listChartLineContent').append("<div id='selectTaskTab_Y01_content_listChartLine1_"+i+"'></div>");
								$('#selectTaskTab_Y01_content_listChartLine1_'+i).css({
												"border-left-style":"solid",
												"border-width":"2px",
												"width":"2px",
												"height":line1Height,
												"border-color":inputColor,
												"margin-left":"30px"
												});
								$('#selectTaskTab_Y01_content_listChartLineContent').append("<img src='./image/"+imgSrc+".png' id='selectTaskTab_Y01_content_listChartLineIMG_"+i+"'></img>");
								$('#selectTaskTab_Y01_content_listChartLineIMG_'+i).css({
												"position":"absolute",
												"margin-top":"-10px",
												"margin-left":"-15px",
												});
								$('#selectTaskTab_Y01_content_listChartLineContent').append("<div id='selectTaskTab_Y01_content_listChartLine2_"+i+"'></div>");
								$('#selectTaskTab_Y01_content_listChartLine2_'+i).css({
												"border-left-style":"solid",
												"border-width":"2px",
												"width":"2px",
												"height":line2Height,
												"border-color":inputColor,
												"margin-left":"30px"
												});
							//小白筐
							$('#selectTaskTab_Y01_content_listChartView').append("<div id='selectTaskTab_Y01_content_listChartDiv_"+i+"'></div>");
							$('#selectTaskTab_Y01_content_listChartDiv_'+i).css({
											"height":"150px",
											"font-size":"12pt",
											"margin-top":"15px",
											"width":"200px",
											"color":"white",
											"border-radius":"15pt",
											"margin-left":"80px",
											"text-align":"center",	
											"word-wrap":"break-word",
											"overflow":"auto",										
											"background-color":inputColor
											});
							//員工姓名
							$('#selectTaskTab_Y01_content_listChartDiv_'+i).append("<div id='selectTaskTab_Y01_content_listChartName_"+i+"'>"+language["task_employeeName"][languageStatus]+"："+output.OwnerName+"</div>");
							$('#selectTaskTab_Y01_content_listChartName_'+i).css({
											"font-size":"12pt",
											"margin-top":"10px",
											"margin-left":"20px",
											"text-align":"left"
											});
							//員工身份
							$('#selectTaskTab_Y01_content_listChartDiv_'+i).append("<div id='selectTaskTab_Y01_content_listChartExplanation_"+i+"'>"+language["task_employeeIdentification"][languageStatus]+"："+output.TaskAssignedExplanation+"</div>");
							$('#selectTaskTab_Y01_content_listChartExplanation_'+i).css({
											"font-size":"12pt",
											"margin-top":"10px",
											"margin-left":"20px",
											"text-align":"left"
											});
							//開單狀態
							$('#selectTaskTab_Y01_content_listChartDiv_'+i).append("<div id='selectTaskTab_Y01_content_listChartStatus_"+i+"'>"+language["TaskAssignedStatus"][languageStatus]+"："+output.TaskAssignedExecutionStatus+"</div>");
							$('#selectTaskTab_Y01_content_listChartStatus_'+i).css({
											"font-size":"12pt",
											"margin-top":"10px",
											"margin-left":"20px",
											"text-align":"left"
											});
							//工單意見
							$('#selectTaskTab_Y01_content_listChartDiv_'+i).append("<div id='selectTaskTab_Y01_content_listChartExecution_"+i+"'>"+language["task_employeeFeedback"][languageStatus]+"："+output.TaskAssignedExecutionContent+"</div>");
							$('#selectTaskTab_Y01_content_listChartExecution_'+i).css({
											"font-size":"12pt",
											"margin-top":"10px",
											"margin-left":"20px",
											"text-align":"left"
											});
							//開單時間
							if(output.TaskAssignedExecutionTime){
								$('#selectTaskTab_Y01_content_listChartView').append("<div id='selectTaskTab_Y01_content_listChartTime_"+i+"'>"+getDate(output.TaskAssignedExecutionTime)+" "+getTime(output.TaskAssignedExecutionTime)+"</div>");
								$('#selectTaskTab_Y01_content_listChartTime_'+i).css({
												"font-size":"10pt",
												"margin-top":"10px",
												"margin-left":"100px",
												"text-align":"left"
												});
							}
							
						}
					},
					//失敗時
					function(){
						var taskListErr_Msg = YesNo_Msg_Define.Initialize();
						taskListErr_Msg.setMask(false);
						taskListErr_Msg.setSmartdetect(false);
						taskListErr_Msg.setWidth(300);
						taskListErr_Msg.setHeight(168);
						taskListErr_Msg.setId('taskListErr_Msg');
						taskListErr_Msg.setTitle(language["system_msg"][languageStatus]);
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
						$('#taskListErr_MsgYes').css({"margin-left":"0px","width":"100%"});
					});
			},
			//失敗時
			function(){
				var taskContentErr_Msg = YesNo_Msg_Define.Initialize();
				taskContentErr_Msg.setMask(false);
				taskContentErr_Msg.setSmartdetect(false);
				taskContentErr_Msg.setWidth(300);
				taskContentErr_Msg.setHeight(168);
				taskContentErr_Msg.setId('taskContentErr_Msg');
				taskContentErr_Msg.setTitle(language["system_error"][languageStatus]);
				taskContentErr_Msg.show();
				taskContentErr_Msg.addMsgContent(error.message);
				taskContentErr_Msg.addYesNO_Button('',language["system_ok"][languageStatus],null,
				function()
				{
					//關閉 Msg
				    taskContentErr_Msg.close();
				});
				//隱藏 No 按鈕
				$('#taskContentErr_Msg_No').css("display","none");
				//置中 Yes 按鈕
				$('#taskContentErr_Msg_Yes').css({"margin-left":"0px","width":"100%"});
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
//新增工單頁面
function newTaskFunction(){
	try{
			//定義介面
			var newTask_Window = Window_Define.Initialize();
			newTask_Window.setMask(true);
			newTask_Window.setWidth(480);
			newTask_Window.setHeight(550);
			newTask_Window.setId('newTask_Window');
			newTask_Window.setTitle(language["newTask"][languageStatus]);
			newTask_Window.show();
			newTask_Window.addTextfield('newTaskTitle',language["TaskAssignedTitle"][languageStatus]+' :');
			newTask_Window.addComboboxPagging('newTaskAssignedMainResponsible',language["MainResponsibleEmployeeName"][languageStatus]+' :',{
				'Url':localStorage.human+'/Employee' + '?_dc=' + new Date().getTime(),
			    'rootProperty':'data',
			    'displayField':'EmployeeName',
			    'valueField':'EmployeeID',
			    'pageSize':'5',
			    'searchUrl':localStorage.human+'/Employee' + '?_dc=' + new Date().getTime(),
			    'searchPlaceholder':'搜尋員工',
			    'searchKey':'searchKey'
			});
			newTask_Window.addComboboxPagging('newTaskAssignedMainCheck',language["MainCheckEmployeeName"][languageStatus]+' :',{
				'Url':localStorage.human+'/Employee' + '?_dc=' + new Date().getTime(),
			    'rootProperty':'data',
			    'displayField':'EmployeeName',
			    'valueField':'EmployeeID',
			    'pageSize':'5',
			    'searchUrl':localStorage.human+'/Employee' + '?_dc=' + new Date().getTime(),
			    'searchPlaceholder':'搜尋員工',
			    'searchKey':'searchKey'
			});
			newTask_Window.addDatetimeField('newTaskAssignedStartTime',language["TaskAssignedStartTime"][languageStatus]+' :');
			newTask_Window.addDatetimeField('newTaskAssignedEndTime',language["TaskAssignedEndTime"][languageStatus]+' :');
			newTask_Window.addTextfield('newTaskPoint',language["task_usePoint"][languageStatus]);
			jqueryAjax_Get(localStorage.task+'/Reward/me',function(response)
						{
							//最高可開單積分
							$('#newTaskAssignedSuccessReward').attr('max',response.data.openPoint);
							$('#newTaskPoint_Label').html(language["task_usePoint"][languageStatus]+' : '+response.data.openPoint);
						},null,null);
			
			newTask_Window.addTextfield('newTaskAssignedSuccessReward',language["task_successPoint"][languageStatus]+' :');
			newTask_Window.addTextfield('newTaskAssignedFailPunish',language["task_failPoint"][languageStatus]+' :');
			$('#newTaskAssignedSuccessReward').attr('type','Number');
			$('#newTaskAssignedSuccessReward').attr('min',0);
			$('#newTaskAssignedFailPunish').attr('type','Number');
			$('#newTaskAssignedFailPunish').attr('min',0);
			$('#newTaskPoint').hide();
			$('#newTaskPoint_Label').css({
				"width":"100%",
				"margin-bottom":"10px"
			});
			newTask_Window.addTextfield('newTaskCommonManagerAgreeLabel',language["TaskCommonManagerAgree"][languageStatus]+' :  <input id="newTaskCommonManagerAgree" type="checkbox" style="zoom: 1.5;margin-left:30px">');
			$('#newTaskCommonManagerAgreeLabel').hide();
			$('#newTaskCommonManagerAgreeLabel_Label').css({
				"width":"100%",
				"margin-bottom":"10px"
			});
			newTask_Window.addTextarea('newTaskAssignedContent',language["TaskAssignedContent"][languageStatus]+' :');
			newTask_Window.addYesNO_Button(language["system_cancel"][languageStatus],language["system_send"][languageStatus],
				//NO Dunction()
				function(){
					newTask_Window.close();
				},
				//Yes Function
				function(){
					//若缺少欄位則不發出request
					try{
						//修改時差 改成＋0時區
						$.dateFormat = function(dateObject) {
						    var d = new Date(dateObject);
							return d.toISOString();
						};
						//送出資料
						var data={
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
						jqueryAjax_Post(localStorage.task+'/Task/me/General',JSON.stringify(data),function(response)
									{
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
										    myTaskView.load();
								
										});
										//隱藏 No 按鈕
										$('#taskSuccess_Msg_No').css("display","none");
										//置中 Yes 按鈕
										$('#taskSuccess_Msg_Yes').css({"margin-left":"0px","width":"100%"});
									},function(error){
										normalError_Msg_Withmask(error.message);
										$("#YesNo_Msg").width(300);
										$("#YesNo_Msg").height(168);
										$("#YesNo_Msg_Title").html(language["system_error"][languageStatus]);
										$("#YesNo_Msg_Yes").html(language["system_ok"][languageStatus]);
										//Debug
										$('#YesNo_Msg').css('z-index',100);
										$('#YesNo_Msg_Mask').css('z-index',100);
										// var taskFail_Msg = YesNo_Msg_Define.Initialize();
										// taskFail_Msg.setMask(false);
										// taskFail_Msg.setSmartdetect(false);
										// taskFail_Msg.setWidth(300);
										// taskFail_Msg.setHeight(168);
										// taskFail_Msg.setId('taskFail_Msg');
										// taskFail_Msg.setTitle(language["system_error"][languageStatus]);
										// taskFail_Msg.show();
										// taskFail_Msg.addMsgContent(error.message);
										// taskFail_Msg.addYesNO_Button('',language["system_ok"][languageStatus],null,
										// function()
										// {
										// 	//關閉 Msg
										//     taskFail_Msg.close();
										//     //霧面持續
										// 	addBlur_Css('Mainpage');
										// });
										// //隱藏 No 按鈕
										// $('#taskFail_Msg_No').css("display","none");
										// //置中 Yes 按鈕
										// $('#taskFail_Msg_Yes').css({"margin-left":"0px","width":"100%"});
									},null);
					}catch(err){
						normalError_Msg_Withmask(language["system_lose"][languageStatus]);
						$("#YesNo_Msg").width(300);
						$("#YesNo_Msg").height(168);
						$("#YesNo_Msg_Title").html(language["system_error"][languageStatus]);
						$("#YesNo_Msg_Yes").html(language["system_ok"][languageStatus]);
						//Debug
						$('#YesNo_Msg').css('z-index',100);
						$('#YesNo_Msg_Mask').css('z-index',100);
						// var taskFail_Msg = YesNo_Msg_Define.Initialize();
						// taskFail_Msg.setMask(false);
						// taskFail_Msg.setSmartdetect(false);
						// taskFail_Msg.setWidth(300);
						// taskFail_Msg.setHeight(168);
						// taskFail_Msg.setId('taskFail_Msg');
						// taskFail_Msg.setTitle(language["system_error"][languageStatus]);
						// taskFail_Msg.show();
						// taskFail_Msg.addMsgContent(language["system_lose"][languageStatus]);
						// taskFail_Msg.addYesNO_Button('',language["system_ok"][languageStatus],null,
						// function()
						// {
						// 	//關閉 Msg
						//     taskFail_Msg.close();
						//     //霧面持續
						// 	addBlur_Css('Mainpage');
						// });
						// //隱藏 No 按鈕
						// $('#taskFail_Msg_No').css("display","none");
						// //置中 Yes 按鈕
						// $('#taskFail_Msg_Yes').css({"margin-left":"0px","width":"100%"});
					}
				});
			


		}catch(err){
			if(App_Debug)
			{
				console.log(err);
			}
		}
};
