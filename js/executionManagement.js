/*執行力管理 Y02*/
//Jquery 準備好
$('#Mainpage_Menu').ready(function()
{
	try
	{
		//有找到 新增開單積分權限
		if(jQuery.inArray("執行力管理",Y02_System_Authorization) != -1 || true)
		{		
			//部門積分歷程
			var view = {};
			view.Title = "執行力分析";
			view.Content = "查詢部門";
			view.Content_Func = function()
			{
				//部門積分歷程
				DepartmentSearch_executionManagement_Y02_Window();
			}
			createMainpage_Menu(view);
			$("div[myId='部門積分歷程']").css('margin-left','-23px');
		}
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
});
//部門歷程積分搜尋
function DepartmentSearch_executionManagement_Y02_Window()
{
	try
	{
		//定義介面
		var DepartmentSearch_executionManagement_Y02 = Window_Define.Initialize();
		DepartmentSearch_executionManagement_Y02.setMask(true);
		DepartmentSearch_executionManagement_Y02.setWidth(480);
		DepartmentSearch_executionManagement_Y02.setHeight(280);
		DepartmentSearch_executionManagement_Y02.setId('DepartmentSearch_executionManagement_Y02');
		DepartmentSearch_executionManagement_Y02.setTitle('執行力分析');
		DepartmentSearch_executionManagement_Y02.show();
		DepartmentSearch_executionManagement_Y02.addCombobox('selectIdentify','　選擇身份 :');
		$("#selectIdentify").append('<option disabled="" hidden="" selected=""></option>');
		$("#selectIdentify").append('<option value="ExecuteGeneral" class="translateHtml">執行人</option>');
		$("#selectIdentify").append('<option value="OwnerGeneral" class="translateHtml">開單人</option>');
		$("#selectIdentify").css("margin-top","1px");
		DepartmentSearch_executionManagement_Y02.addComboboxPagging('selectedDepartment','　選擇部門 :',
		{
			//分頁設定
			'Url':localStorage.human+'/Department/all' + '?_Y02=' + new Date().getTime(),
		    'rootProperty':'data',
		    'displayField':'DepartmentName',
		    'valueField':'DepartmentID',
		    'pageSize':'5',
		    'searchUrl':localStorage.human+'/Department/all' + '?_Y02=' + new Date().getTime(),
		    'searchPlaceholder':'搜尋部門',
		    'searchKey':'searchKey'
		});
		//CSS
		$("#selectedDepartment_Combobox_Pagging").css
		({
			"left":"120px",
			"top":"127px"
		});
		DepartmentSearch_executionManagement_Y02.addCombobox('selectYear','　選擇年份 :');
		$("#selectYear").css('margin-top','1px');
		//建立 2014 年開始到現在的年份
		var start = 2014;
		var now = new Date().getFullYear();
		var options = "";
		for(var year = start ; year <= now; year++)
		{
			options = options + "<option value=" + year + ">"+ year +"</option>";
		}
		$("#selectYear").html(options);
		$("#selectYear").val(now);
		DepartmentSearch_executionManagement_Y02.addCombobox('selectMonth','　選擇月份 :');
		$("#selectMonth").css('margin-top','1px');
		//建立月份 + 整年選項
		var start = 1;
		var now = 12;
		var options = "<option value=0 class='translateHtml'>顯示整年</option>";
		for(var month = start ; month <= now; month++)
		{
			options = options + "<option value=" + month + ">"+ month +"月</option>";
		}
		$("#selectMonth").html(options);
		$("#selectMonth").val(now);
		//Css
		$("#DepartmentSearch_executionManagement_Y02_Body .Font.translateHtml").width(110);
		$("#DepartmentSearch_executionManagement_Y02_Body input").width("calc(100% - 115px)");
		$("#DepartmentSearch_executionManagement_Y02_Body select").width("calc(100% - 115px)");
		DepartmentSearch_executionManagement_Y02.addYesNO_Button('取消','確認',function()
		{
			DepartmentSearch_executionManagement_Y02.close();
		},
		function()
		{
			var selectID = $("#selectIdentify").val();
			var selectName = $("#selectIdentify option:selected").text();
			var DepartmentID = DepartmentSearch_executionManagement_Y02.selectedDepartment.getComboboxPagging_Value();
			var DepartmentName = DepartmentSearch_executionManagement_Y02.selectedDepartment.getComboboxPagging_Value('displayfield');
			//沒有選擇部門
			if(!selectID)
			{
				$("#selectIdentify").focus();
			}
			else if(!DepartmentID)
			{
				$("#selectedDepartment").focus();
			}
			else
			{
				var Url = localStorage.human + '/Task/History/' + selectID + "/" + DepartmentID + "?year=" + $("#selectYear").val() + "&month=" + $("#selectMonth").val();
				//關閉部門歷程績分頁面
				DepartmentSearch_executionManagement_Y02.close();
				Department_executionManagement_Y02_executionlist(DepartmentName,DepartmentID,Url,selectName);
			}		
		});
		//Yes 按鈕
		$("#DepartmentSearch_executionManagement_Y02_Yes").css('margin-left','70px');
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
//部門積分歷程 積分清單畫面
function Department_executionManagement_Y02_executionlist(DepartmentName,DepartmentID,Url,selectName)
{
	try
	{
		//新增一個 tab
		addTab("Department_executionManagement_Y02_executionlist_" + DepartmentID + "_" + selectName,'執行力分析(' + selectName + ') - ' + DepartmentName);
		//建立積分清單
		var Department_executionManagement_Y02_executionlist = Grid_Panel_Define.Initialize();
		Department_executionManagement_Y02_executionlist.setId("Department_executionManagement_Y02_executionlist_" + DepartmentID + "_" + selectName);
		Department_executionManagement_Y02_executionlist.setResizer_ID('Department_executionManagement_Y02_executionlist_Resizer');
		Department_executionManagement_Y02_executionlist.setHeader_Title(['No.','員工系統編號','員工姓名','執行中','成功','失敗','作廢','成功率','失敗率']);
		Department_executionManagement_Y02_executionlist.setModel(['Number','EmployeeID','EmployeeName','processing','success','fail','invalid','successPercentage','failPercentage']);
		Department_executionManagement_Y02_executionlist.setPagesize(10);
		Department_executionManagement_Y02_executionlist.setfieldShow([true,false,true,true,true,true,true,true,true]);
		Department_executionManagement_Y02_executionlist.setHeader_Width(['4.5%','0%','13.64%','13.64%','13.64%','13.64%','13.64%','13.64%','13.64%']);
		Department_executionManagement_Y02_executionlist.createHeader();
		Department_executionManagement_Y02_executionlist.createTable();
		//改寫欄位
		Department_executionManagement_Y02_executionlist.setLoad_Callback(function()
		{
			for(var i = 0; i < $('#' + Department_executionManagement_Y02_executionlist.getId() + '_Table').children().length; i++)
			{
				//編號
				$('#' + Department_executionManagement_Y02_executionlist.getId() + '_Table_Inner_' + i).children().eq(0).html(i + 1 + parseInt(Department_executionManagement_Y02_executionlist.getStart()));
				//執行中 預設為零
				var processing = ($('#' + Department_executionManagement_Y02_executionlist.getId() + '_Table_Inner_' + i).children().eq(3).html().length == 0)?"0":$('#' + Department_executionManagement_Y02_executionlist.getId() + '_Table_Inner_' + i).children().eq(3).html();
				$('#' + Department_executionManagement_Y02_executionlist.getId() + '_Table_Inner_' + i).children().eq(3).html(processing);
				//成功   預設為零
				var success = ($('#' + Department_executionManagement_Y02_executionlist.getId() + '_Table_Inner_' + i).children().eq(4).html().length == 0)?"0":$('#' + Department_executionManagement_Y02_executionlist.getId() + '_Table_Inner_' + i).children().eq(4).html();
				$('#' + Department_executionManagement_Y02_executionlist.getId() + '_Table_Inner_' + i).children().eq(4).html(success);
				//失敗   預設為零
				var fail = ($('#' + Department_executionManagement_Y02_executionlist.getId() + '_Table_Inner_' + i).children().eq(5).html().length == 0)?"0":$('#' + Department_executionManagement_Y02_executionlist.getId() + '_Table_Inner_' + i).children().eq(5).html();
				$('#' + Department_executionManagement_Y02_executionlist.getId() + '_Table_Inner_' + i).children().eq(5).html(fail);
				//作廢   預設為零
				var invalid = ($('#' + Department_executionManagement_Y02_executionlist.getId() + '_Table_Inner_' + i).children().eq(6).html().length == 0)?"0":$('#' + Department_executionManagement_Y02_executionlist.getId() + '_Table_Inner_' + i).children().eq(6).html();
				$('#' + Department_executionManagement_Y02_executionlist.getId() + '_Table_Inner_' + i).children().eq(6).html(invalid);
				//成功率
				$('#' + Department_executionManagement_Y02_executionlist.getId() + '_Table_Inner_' + i).children().eq(7).html((parseInt(success) == 0)?"0%":(roundDecimal(parseInt(success) / (parseInt(success) + parseInt(fail)) * 100 * 100,0) / 100) + "%");
				//失敗率
				$('#' + Department_executionManagement_Y02_executionlist.getId() + '_Table_Inner_' + i).children().eq(8).html((parseInt(fail) == 0)?"0%":(roundDecimal(parseInt(fail) / (parseInt(success) + parseInt(fail)) * 100 * 100,0) / 100) + "%");
			};
		});
		Department_executionManagement_Y02_executionlist.createPagging();
		Department_executionManagement_Y02_executionlist.getUrl = function getUrl()
		{
			try
			{
				//組合參數
				var Start = Department_executionManagement_Y02_executionlist.getStart();
				var Limit = Department_executionManagement_Y02_executionlist.getPagesize();
				return Url + "&_Y02=" + new Date().getTime() + "&start=" + Start + "&limit=" + Limit;
			}
			catch(err)
			{
				if(App_Debug)
				{
					console.log(err);
				}
			}
		};
		Department_executionManagement_Y02_executionlist.load();
		//執行力管理語言包
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