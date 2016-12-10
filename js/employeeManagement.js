/*員工管理 Y02*/
//Jquery 準備好
$('#Mainpage_Menu').ready(function()
{
	try
	{
		//有找到 新增員工基本資料權限 與 維護員工基本資料權限 與 設定離職員工權限
		if(jQuery.inArray("新增員工基本資料",Y02_System_Authorization) != -1 && jQuery.inArray("維護員工基本資料",Y02_System_Authorization) != -1 && jQuery.inArray("設定離職員工",Y02_System_Authorization) != -1)
		{
			//員工清單
			var view = {};
			view.Title = "員工管理";
			view.Content = "員工清單";
			view.Content_Func = function()
			{
				//新增一個 tab
				addTab('employeeManagement_Y02','員工清單');
				//部門清單畫面
				employeeManagement_Y02_Emplist();
			}
			createMainpage_Menu(view);
		}
		//有找到 新增員工基本資料權限
		if(jQuery.inArray("新增員工基本資料",Y02_System_Authorization) != -1)
		{
			//新增員工
			var view = {};
			view.Title = "員工管理";
			view.Content = "新增員工";
			view.Content_Func = function()
			{
				//新增員工畫面
				employeeManagement_Y02_addEmployee_Window_View();
			}
			createMainpage_Menu(view);
		}
		//有找到 維護員工基本資料權限
		if(jQuery.inArray("維護員工基本資料",Y02_System_Authorization) != -1)
		{
			//重設密碼
			var view = {};
			view.Title = "員工管理";
			view.Content = "重設密碼";
			view.Content_Func = function()
			{
				//選擇修改員工畫面
				employeeManagement_Y02_Employee_Selector('resetPassword');
			}
			createMainpage_Menu(view);
			//修改基本資料
			var view = {};
			view.Title = "員工管理";
			view.Content = "修改基本資料";
			view.Content_Func = function()
			{
				//選擇修改員工畫面
				employeeManagement_Y02_Employee_Selector('basic');
			}
			createMainpage_Menu(view);
			$("div[myId='修改基本資料']").css('margin-left','-23px');
			//修改詳細資料
			var view = {};
			view.Title = "員工管理";
			view.Content = "修改詳細資料";
			view.Content_Func = function()
			{
				//選擇修改員工畫面
				employeeManagement_Y02_Employee_Selector('detail');
			}
			createMainpage_Menu(view);
			$("div[myId='修改詳細資料']").css('margin-left','-23px');
			//修改詳細資料
			var view = {};
			view.Title = "員工管理";
			view.Content = "修改學歷資料";
			view.Content_Func = function()
			{
				//選擇修改員工畫面
				employeeManagement_Y02_Employee_Selector('edu');
			}
			createMainpage_Menu(view);
			$("div[myId='修改學歷資料']").css('margin-left','-23px');
		}
		//有找到 設定離職員工權限
		if(jQuery.inArray("設定離職員工",Y02_System_Authorization) != -1)
		{
			//離職指定員工
			var view = {};
			view.Title = "員工管理";
			view.Content = "離職指定員工";
			view.Content_Func = function()
			{
				//選擇修改員工畫面
				employeeManagement_Y02_Employee_Selector('deleteEmployee');
			}
			createMainpage_Menu(view);
			$("div[myId='離職指定員工']").css('margin-left','-23px');
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
//部門清單畫面
function employeeManagement_Y02_Emplist()
{
	try
	{
		//建立員工清單
		employeeManagement_Y02 = Grid_Panel_Define.Initialize();
		employeeManagement_Y02.setId('employeeManagement_Y02');
		employeeManagement_Y02.setResizer_ID('employeeManagement_Y02_Resizer');
		employeeManagement_Y02.setHeader_Title(['No.','圖片','所屬部門','員工姓名','員工編號','員工系統編號']);
		employeeManagement_Y02.setModel(['Number','EmployeeID','DepartmentName','EmployeeName','EmployeeNumber',"EmployeeID"]);
		employeeManagement_Y02.setPagesize(10);
		employeeManagement_Y02.setfieldShow([true,true,true,true,true,false]);
		employeeManagement_Y02.setHeader_Width(['4.5%','20%','25%','25%','25%','0%']); // 99.5%
		employeeManagement_Y02.createHeader();
		employeeManagement_Y02.createTable();
		//改寫欄位
		employeeManagement_Y02.setLoad_Callback(function()
		{
			for(var i = 0; i < $('#employeeManagement_Y02_Table').children().length; i++)
			{
				//編號
				$('#employeeManagement_Y02_Table_Inner_' + i).children().eq(0).html(i + 1 + parseInt(employeeManagement_Y02.getStart()));
				//圖片
				var EmployeeID = $('#employeeManagement_Y02_Table_Inner_' + i).children().eq(1).html();
				$('#employeeManagement_Y02_Table_Inner_' + i).children().eq(1).css("position","relative");
				$('#employeeManagement_Y02_Table_Inner_' + i).children().eq(1).html("<img src='" + localStorage.getItem('human') + "/employee/" + EmployeeID + "/showImages' style='height: 50px;width: 40px;position: absolute;top: 0px;bottom: 0px;right: 0px;left: 0px;margin: auto;'></img>");
			};
		});
		employeeManagement_Y02.createPagging();
		//員工搜尋
		employeeManagement_Y02.addPagging_Textfield("employeeManagement_Y02_Searchemployee","搜尋員工");
		//keyup
		$("#employeeManagement_Y02_Searchemployee").keyup(function(e)
		{
			//紀錄原始網址
			$("#" + this.id).attr("oldUrl",employeeManagement_Y02.getUrl());
			//Enter 且 文字方塊有文字
			if(e.keyCode == 13 && $('#' + this.id).val().length != 0)
			{
				$('#' + this.id).removeAttr('name');
				var searchKey = $('#' + this.id).val();
				//複寫網址取用
				employeeManagement_Y02.getUrl = function getUrl()
				{
					//組合參數
					var Start = employeeManagement_Y02.getStart();
					var Limit = employeeManagement_Y02.getPagesize();
					return localStorage.human + "/Employee/?type=" + employeeManagement_Y02.employeeManagement_Y02_employeeType.getValue() + "&_Y02=" + new Date().getTime() + "&searchKey=" + searchKey + "&start=" + Start + "&limit=" + Limit;
				};
				//回復初始值(回到第一頁且從第一筆出發)
				employeeManagement_Y02.setStart(0);
				employeeManagement_Y02.setPage(1);
				employeeManagement_Y02.load();
				$('#' + this.id).blur();
			}
			//Backspace 且內容無文字
			else if((e.keyCode == 8 || e.keyCode == 46) && $('#' + this.id).val().length == 0 && $('#' + this.id).attr('name') != 'reload')
			{
				$('#' + this.id).attr('name','reload');
				//複寫網址取用
				employeeManagement_Y02.getUrl = function getUrl()
				{
					//組合參數
					var Start = employeeManagement_Y02.getStart();
					var Limit = employeeManagement_Y02.getPagesize();
					return localStorage.human + "/Employee/?type=" + employeeManagement_Y02.employeeManagement_Y02_employeeType.getValue() + "&_Y02=" + new Date().getTime() + "&start=" + Start + "&limit=" + Limit;
				};
				//回復初始值(回到第一頁且從第一筆出發)
				employeeManagement_Y02.setStart(0);
				employeeManagement_Y02.setPage(1);
				employeeManagement_Y02.load();
				$('#' + this.id).blur();
			}
		});
		//設定網址取用方法
		employeeManagement_Y02.getUrl = function getUrl()
		{
			try
			{
				//組合參數
				var Start = employeeManagement_Y02.getStart();
				var Limit = employeeManagement_Y02.getPagesize();
				return localStorage.human + "/Employee/?type=" + employeeManagement_Y02.employeeManagement_Y02_employeeType.getValue() + "&_Y02=" + new Date().getTime() + "&start=" + Start + "&limit=" + Limit;
			}
			catch(err)
			{
				if(App_Debug)
				{
					console.log(err);
				}
			}
		};
		//員工在職狀況
		employeeManagement_Y02.addPagging_Combobox("employeeManagement_Y02_employeeType");
		//在職狀況取用設定物件
		var employeeManagement_Y02_employeeType_Object = {};
		//在職狀況取用函數
		employeeManagement_Y02_employeeType_Object.getValue = function()
		{
			return employeeManagement_Y02.employeeManagement_Y02_employeeType.value;
		};
		//在職狀況設定函數
		employeeManagement_Y02_employeeType_Object.setValue = function(value)
		{
			employeeManagement_Y02.employeeManagement_Y02_employeeType.value = value;
		};
		//新增至原 Grid Panel 物件
		employeeManagement_Y02["employeeManagement_Y02_employeeType"] = employeeManagement_Y02_employeeType_Object;
		//員工在職狀況預設值
		employeeManagement_Y02.employeeManagement_Y02_employeeType.setValue('inservice');
		//Css
		$("#employeeManagement_Y02_employeeType").width(90);
		//放置內容
		$("#employeeManagement_Y02_employeeType").html
		(
			"<select>" + 
				"<option value='all'>顯示全部</option>" + 
				"<option value='inservice' selected>在職中</option>" + 
				"<option value='leave'>已離職</option>" + 
			"</select>"
		);
		//員工在職狀況下拉式選單改變
		$("#employeeManagement_Y02_employeeType").change(function()
		{
			//修改員工在職狀況
			employeeManagement_Y02.employeeManagement_Y02_employeeType.setValue(this.value);
			//載入資料
			employeeManagement_Y02.load();
		});
		//載入資料
		employeeManagement_Y02.load();
		//設定右鍵產生選項
		employeeManagement_Y02.setContextmenu(true);
		employeeManagement_Y02.setContextmenu_Func(function(ID)
		{
			var employeeManagement_Contextmenu = Contextmenu_Define.Initialize();
			employeeManagement_Contextmenu.setId(ID);
			employeeManagement_Contextmenu.setWidth(85);
			employeeManagement_Contextmenu.show();
			employeeManagement_Contextmenu.setMenu('新增員工','employeeManagement_Y02_addEmployee_Menu',function()
			{
				//新增員工畫面
				employeeManagement_Y02_addEmployee_Window_View();
				//關閉
				employeeManagement_Contextmenu.close();
			});
			employeeManagement_Contextmenu.setMenu('重設密碼','employeeManagement_Y02_resetPassword_Menu',function()
			{
				//取得選取的單行編號
				var ClickedID = employeeManagement_Contextmenu.getClickedID();
				//語言包
				var resetPassword_Msg_Language = 
				{
					"worning": 
					{
						"T": "警告",
						"S": "警告"
					},
					"modify": 
					{
						"T": "確定修改",
						"S": "确定修改"
					},
					"password":
					{
						"T": "的密碼?",
						"S": "的密码?"
					}
				};
				//顯示確認訊息
				resetPassword_Msg = showMsg(resetPassword_Msg_Language['worning'][languageStatus],resetPassword_Msg_Language['modify'][languageStatus] + $("#" + ClickedID).children().eq(3).html() + resetPassword_Msg_Language['password'][languageStatus],function()
				{
					resetPassword_Msg.close();
				},function()
				{
					//重設密碼
					var EmployeeID = $("#" + ClickedID).children().eq(5).html();
					employeeManagement_Y02_resetPassword(EmployeeID,resetPassword_Msg);
				});
				//關閉
				employeeManagement_Contextmenu.close();
			});
			employeeManagement_Contextmenu.setMenu('修改基本資料','employeeManagement_Y02_modifyBasic_Menu',function()
			{
				//取得選取的單行編號
				var ClickedID = employeeManagement_Contextmenu.getClickedID();
				//員工編號
				var EmployeeID = $("#" + ClickedID).children().eq(5).html();
				//開啟修改畫面
				employeeManagement_Y02_modifyBasic_Window_View(EmployeeID);
				//關閉
				employeeManagement_Contextmenu.close();
			});
			employeeManagement_Contextmenu.setMenu('修改詳細資料','employeeManagement_Y02_modifyDetail_Menu',function()
			{
				//取得選取的單行編號
				var ClickedID = employeeManagement_Contextmenu.getClickedID();
				//員工編號
				var EmployeeID = $("#" + ClickedID).children().eq(5).html();
				//開啟修改畫面
				employeeManagement_Y02_modifyDetail_Window_View(EmployeeID);
				//關閉
				employeeManagement_Contextmenu.close();
			});
			employeeManagement_Contextmenu.setMenu('修改學歷資料','employeeManagement_Y02_modifyEdu_Menu',function()
			{
				//取得選取的單行編號
				var ClickedID = employeeManagement_Contextmenu.getClickedID();
				//員工編號
				var EmployeeID = $("#" + ClickedID).children().eq(5).html();
				//開啟修改畫面
				employeeManagement_Y02_modifyEdu_Window_View(EmployeeID);
				//關閉
				employeeManagement_Contextmenu.close();
			});
			employeeManagement_Contextmenu.setMenu('離職員工','employeeManagement_Y02_deleteEmployee_Menu',function()
			{
				//取得選取的單行編號
				var ClickedID = employeeManagement_Contextmenu.getClickedID();
				//員工編號
				var EmployeeID = $("#" + ClickedID).children().eq(5).html();
				//員工姓名
				var EmployeeName = $("#" + ClickedID).children().eq(3).html();
				//開啟修改畫面
				employeeManagement_Y02_deleteEmployee(EmployeeID,EmployeeName)
				//關閉
				employeeManagement_Contextmenu.close();
			});
		});
		//員工管理 - 語言包
		employeeManagement_Y02_changeLanguage(languageStatus);
		//儲存頁面物件
		GridPanel_Object['employeeManagement_Y02'] = employeeManagement_Y02;
		//紀錄特殊 url
		$("#employeeManagement_Y02").attr('myurl',"/Employee/?type=" + employeeManagement_Y02.employeeManagement_Y02_employeeType.getValue());
		//控制員工排序
		sortEmployee();
		//刪除判斷
		$("#employeeManagement_Y02").bind('remove',function()
		{
			employeeManagement_Y02 = undefined;
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
//新增員工畫面
function employeeManagement_Y02_addEmployee_Window_View()
{
	try
	{
		//新增畫面
		employeeManagement_Y02_addEmployee_Window = Window_Define.Initialize();
		employeeManagement_Y02_addEmployee_Window.setMask(true);
		employeeManagement_Y02_addEmployee_Window.setSmartdetect(false);
		employeeManagement_Y02_addEmployee_Window.setWidth(480);
		employeeManagement_Y02_addEmployee_Window.setHeight(447);
		employeeManagement_Y02_addEmployee_Window.setId('employeeManagement_Y02_addEmployee_Window');
		employeeManagement_Y02_addEmployee_Window.setTitle('新增員工');
		employeeManagement_Y02_addEmployee_Window.show();
		//帳號
		employeeManagement_Y02_addEmployee_Window.addTextfield('employeeManagement_Y02_addEmployee_Window_EmployeeAccount','　　　帳號 :');
		$("#employeeManagement_Y02_addEmployee_Window_EmployeeAccount_Label").width(115);
		$("#employeeManagement_Y02_addEmployee_Window_EmployeeAccount").width("calc(100% - 120px)");
		$("#employeeManagement_Y02_addEmployee_Window_EmployeeAccount").blur(function()
		{
			$("#employeeManagement_Y02_addEmployee_Window_EmployeeEmail").val(this.value);
		});
		//員工編號
		employeeManagement_Y02_addEmployee_Window.addTextfield('employeeManagement_Y02_addEmployee_Window_EmployeeNumber','　員工編號 :');
		$("#employeeManagement_Y02_addEmployee_Window_EmployeeNumber_Label").width(115);
		$("#employeeManagement_Y02_addEmployee_Window_EmployeeNumber").width("calc(100% - 120px)");
		//員工姓名
		employeeManagement_Y02_addEmployee_Window.addTextfield('employeeManagement_Y02_addEmployee_Window_EmployeeName','　員工姓名 :');
		$("#employeeManagement_Y02_addEmployee_Window_EmployeeName_Label").width(115);
		$("#employeeManagement_Y02_addEmployee_Window_EmployeeName").width("calc(100% - 120px)");
		//身份證字號
		employeeManagement_Y02_addEmployee_Window.addTextfield('employeeManagement_Y02_addEmployee_Window_EmployeeIdentify','身份證字號 :');
		$("#employeeManagement_Y02_addEmployee_Window_EmployeeIdentify_Label").width(115);
		$("#employeeManagement_Y02_addEmployee_Window_EmployeeIdentify").width("calc(100% - 120px)");
		//員工信箱
		employeeManagement_Y02_addEmployee_Window.addTextfield('employeeManagement_Y02_addEmployee_Window_EmployeeEmail','　員工信箱 :');
		$("#employeeManagement_Y02_addEmployee_Window_EmployeeEmail_Label").width(115);
		$("#employeeManagement_Y02_addEmployee_Window_EmployeeEmail").width("calc(100% - 120px)");
		//所屬部門
		employeeManagement_Y02_addEmployee_Window.addComboboxPagging('employeeManagement_Y02_addEmployee_Window_DirectDepartment','　所屬部門 :',
		{
			//分頁設定
			'Url':localStorage.human + '/Department/all?showDefault=true' + '&_Y02=' + new Date().getTime(),
		    'rootProperty':'data',
		    'displayField':'DepartmentName',
		    'valueField':'DepartmentID',
		    'pageSize':'5',
		    'searchUrl':localStorage.human + '/Department/all?showDefault=true' + '&_Y02=' + new Date().getTime(),
		    'searchPlaceholder':'搜尋部門',
		    'searchKey':'searchKey'
		});
		$("#employeeManagement_Y02_addEmployee_Window_DirectDepartment").focus(function()
		{
			employeeManagement_Y02_changeLanguage(languageStatus);
		});
		$("#employeeManagement_Y02_addEmployee_Window_DirectDepartment_Label").width(115);
		$("#employeeManagement_Y02_addEmployee_Window_DirectDepartment").width("calc(100% - 120px)");
		$("#employeeManagement_Y02_addEmployee_Window_DirectDepartment_Combobox_Pagging").css("left","130px");
		$("#employeeManagement_Y02_addEmployee_Window_DirectDepartment_valueField").bind("DOMSubtreeModified", function()
		{
			employeeManagement_Y02_addEmployee_Window_DirectManager_Object.Url = localStorage.human+'/Department/' + employeeManagement_Y02_addEmployee_Window.employeeManagement_Y02_addEmployee_Window_DirectDepartment.getComboboxPagging_Value() +'?_Y02=' + new Date().getTime();
			employeeManagement_Y02_addEmployee_Window_DirectManager_Object.searchUrl = localStorage.human+'/Department/' + employeeManagement_Y02_addEmployee_Window.employeeManagement_Y02_addEmployee_Window_DirectDepartment.getComboboxPagging_Value() +'?_Y02=' + new Date().getTime();
			employeeManagement_Y02_addEmployee_Window.employeeManagement_Y02_addEmployee_Window_DirectManager.ComboboxPagging_load();
			employeeManagement_Y02_addEmployee_Window.employeeManagement_Y02_addEmployee_Window_DirectManager.ComboboxPagging_callBack = function()
			{
				$("#employeeManagement_Y02_addEmployee_Window_DirectManager_Combobox_Pagging_0").click()
			};
		});
		//直屬主管
		employeeManagement_Y02_addEmployee_Window_DirectManager_Object = 
		{
			//分頁設定
			'Url':localStorage.human + '/Employee' + '?_Y02=' + new Date().getTime(),
		    'rootProperty':'data',
		    'displayField':'EmployeeName',
		    'valueField':'EmployeeID',
		    'pageSize':'5',
		    'searchUrl':localStorage.human + '/Employee' + '?_Y02=' + new Date().getTime(),
		    'searchPlaceholder':'搜尋員工',
		    'searchKey':'searchKey'
		};
		employeeManagement_Y02_addEmployee_Window.addComboboxPagging('employeeManagement_Y02_addEmployee_Window_DirectManager','　直屬主管 :',employeeManagement_Y02_addEmployee_Window_DirectManager_Object);
		$("#employeeManagement_Y02_addEmployee_Window_DirectManager_Label").width(115);
		$("#employeeManagement_Y02_addEmployee_Window_DirectManager").width("calc(100% - 120px)");
		$("#employeeManagement_Y02_addEmployee_Window_DirectManager_Combobox_Pagging").css("left","130px");
		$("#employeeManagement_Y02_addEmployee_Window_DirectManager").focus(function()
		{
			employeeManagement_Y02_changeLanguage(languageStatus);
		});
		//員工性別
		employeeManagement_Y02_addEmployee_Window.addRadio('employeeManagement_Y02_addEmployee_Window_EmployeeGender','　員工性別 :','EmployeeGender','男','女',true,false);
		$("#employeeManagement_Y02_addEmployee_Window_EmployeeGender_Label").width(115);
		$("#employeeManagement_Y02_addEmployee_Window_EmployeeGender").width("calc(100% - 120px)");
		document.getElementById("employeeManagement_Y02_addEmployee_Window_EmployeeGender_1").checked = true;
		//Radio Debug
		var Radio_Debug_Func = function()
		{
			$("#employeeManagement_Y02_addEmployee_Window_EmployeeGender_Label").css("color","rgb(69,60,60)");
			$("#employeeManagement_Y02_addEmployee_Window_EmployeeGender_1_Div").css("color","rgb(69,60,60)");
			$("#employeeManagement_Y02_addEmployee_Window_EmployeeGender_2_Div").css("color","rgb(69,60,60)");
		}
		$("#employeeManagement_Y02_addEmployee_Window_EmployeeAccount").click(Radio_Debug_Func);
		$("#employeeManagement_Y02_addEmployee_Window_EmployeeNumber").click(Radio_Debug_Func);
		$("#employeeManagement_Y02_addEmployee_Window_EmployeeName").click(Radio_Debug_Func);
		$("#employeeManagement_Y02_addEmployee_Window_EmployeeIdentify").click(Radio_Debug_Func);
		$("#employeeManagement_Y02_addEmployee_Window_EmployeeEmail").click(Radio_Debug_Func);
		$("#employeeManagement_Y02_addEmployee_Window_DirectDepartment").click(Radio_Debug_Func);
		$("#employeeManagement_Y02_addEmployee_Window_DirectManager").click(Radio_Debug_Func);
		//YesNo
		employeeManagement_Y02_addEmployee_Window.addYesNO_Button('取消','確認',
		//No
		function()
		{
			//關閉 Window
			employeeManagement_Y02_addEmployee_Window.close();
			//關閉霧化效果
			removeBlur_Css('Mainpage');
		},
		//Yes
		function()
		{
			//必填偵測
			if(!$("#employeeManagement_Y02_addEmployee_Window_EmployeeAccount").val())
			{
				$("#employeeManagement_Y02_addEmployee_Window_EmployeeAccount").focus();
				return;
			}
			if(!$("#employeeManagement_Y02_addEmployee_Window_EmployeeNumber").val())
			{
				$("#employeeManagement_Y02_addEmployee_Window_EmployeeNumber").focus();
				return;
			}
			if(!$("#employeeManagement_Y02_addEmployee_Window_EmployeeName").val())
			{
				$("#employeeManagement_Y02_addEmployee_Window_EmployeeName").focus();
				return;
			}
			if(!$("#employeeManagement_Y02_addEmployee_Window_EmployeeIdentify").val())
			{
				$("#employeeManagement_Y02_addEmployee_Window_EmployeeIdentify").focus();
				return;
			}
			if(!$("#employeeManagement_Y02_addEmployee_Window_EmployeeEmail").val())
			{
				$("#employeeManagement_Y02_addEmployee_Window_EmployeeEmail").focus();
				return;
			}
			if(employeeManagement_Y02_addEmployee_Window.employeeManagement_Y02_addEmployee_Window_DirectDepartment.getComboboxPagging_Value().length == 0)
			{
				$("#employeeManagement_Y02_addEmployee_Window_DirectDepartment").focus();
				return;
			}
			if(employeeManagement_Y02_addEmployee_Window.employeeManagement_Y02_addEmployee_Window_DirectManager.getComboboxPagging_Value().length == 0)
			{
				$("#employeeManagement_Y02_addEmployee_Window_DirectManager").focus();
				return;
			}
			//Radio Debug
			Radio_Debug_Func();
			//新增員工
			employeeManagement_Y02_addEmployee();
		});
		//YesNo Css
		$("#employeeManagement_Y02_addEmployee_Window_Yes").css('margin-left',"65px");
		//員工管理語言包
		employeeManagement_Y02_changeLanguage(languageStatus);
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}
//新增員工
function employeeManagement_Y02_addEmployee(values)
{
	try
	{
		//Loading Mask
		loadingMask = Loading_Mask.Initialize();
		loadingMask.setTarget('employeeManagement_Y02_addEmployee_Window');
		loadingMask.show();
		//參數
		var data = {};
		data.account = $("#employeeManagement_Y02_addEmployee_Window_EmployeeAccount").val();
		data.password = $("#employeeManagement_Y02_addEmployee_Window_EmployeeIdentify").val();
		data.ConfirmPassword = $("#employeeManagement_Y02_addEmployee_Window_EmployeeIdentify").val();
		if(typeof(employeeManagement_Y02_addEmployee_EmployeeID) != "undefined")
		{
			employeeManagement_Y02_addEmployee_Info();
		}
		else
		{
			//Ajax Post
			jqueryAjax_Post(localStorage.getItem('human') + '/OAuth/registration',JSON.stringify(data),function(result)
			{
				//帳號建立完成後 取得新的員工編號
				employeeManagement_Y02_addEmployee_EmployeeID = result.data;
				employeeManagement_Y02_addEmployee_Info();
			},function(content)
			{
				loadingMask.close();
				normalError_Msg_Withmask(content.message).close = function()
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
			},null);
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
//新增員工詳細資料
function employeeManagement_Y02_addEmployee_Info()
{
	try
	{
		//參數
		var data = {};
		data.EmployeeNumber = $("#employeeManagement_Y02_addEmployee_Window_EmployeeNumber").val();
		data.EmployeeName = $("#employeeManagement_Y02_addEmployee_Window_EmployeeName").val();
		data.EmployeeIdentity = $("#employeeManagement_Y02_addEmployee_Window_EmployeeIdentify").val();
		data.EmployeeGender = JSON.parse($('input[type=radio][name=EmployeeGender]:checked').attr('value'));
		data.EmployeeSalary = 0;
		data.EmployeeMainEmail = $("#employeeManagement_Y02_addEmployee_Window_EmployeeEmail").val();
		data.DirectDepartment = employeeManagement_Y02_addEmployee_Window.employeeManagement_Y02_addEmployee_Window_DirectDepartment.getComboboxPagging_Value();
		data.DirectManager = employeeManagement_Y02_addEmployee_Window.employeeManagement_Y02_addEmployee_Window_DirectManager.getComboboxPagging_Value();
		data.EmployeeID = employeeManagement_Y02_addEmployee_EmployeeID;

		//Ajax Post
		jqueryAjax_Post(localStorage.getItem('human') + '/Employee',JSON.stringify(data),function(result)
		{
			loadingMask.close();
			//關閉 Window
			employeeManagement_Y02_addEmployee_Window.close();
			//顯示成功訊息
			normalSucceed_Msg(result.message);
			//如果員工頁已開啟則需要重整
			if(typeof(employeeManagement_Y02) != "undefined")
			{
				employeeManagement_Y02.load();
			}
			//帳號建立完成後 取得新的員工編號
			employeeManagement_Y02_addEmployee_EmployeeID = undefined;
		},function(content)
		{
			loadingMask.close();
			normalError_Msg_Withmask(content.message);
		},null);
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}
//選擇修改員工
function employeeManagement_Y02_Employee_Selector(func)
{
	try
	{
		//新增畫面
		employeeManagement_Y02_Employee_Selector_Window = Window_Define.Initialize();
		employeeManagement_Y02_Employee_Selector_Window.setMask(true);
		employeeManagement_Y02_Employee_Selector_Window.setSmartdetect(false);
		employeeManagement_Y02_Employee_Selector_Window.setWidth(480);
		employeeManagement_Y02_Employee_Selector_Window.setHeight(168);
		employeeManagement_Y02_Employee_Selector_Window.setId('employeeManagement_Y02_Employee_Selector_Window');
		employeeManagement_Y02_Employee_Selector_Window.setTitle('選擇修改員工');
		employeeManagement_Y02_Employee_Selector_Window.show();
		employeeManagement_Y02_Employee_Selector_Window.addComboboxPagging('employeeManagement_Y02_Employee_Selector_Window_DirectDepartment','修改員工 :',
		{
			//分頁設定
			'Url':localStorage.human + '/Employee' + '?_Y02=' + new Date().getTime(),
		    'rootProperty':'data',
		    'displayField':'EmployeeName',
		    'valueField':'EmployeeID',
		    'pageSize':'5',
		    'searchUrl':localStorage.human + '/Employee' + '?_Y02=' + new Date().getTime(),
		    'searchPlaceholder':'搜尋員工',
		    'searchKey':'searchKey'
		});
		$("#employeeManagement_Y02_Employee_Selector_Window_DirectDepartment").focus(function()
		{
			//員工管理語言包
			employeeManagement_Y02_changeLanguage(languageStatus);
		});
		//YesNo
		employeeManagement_Y02_Employee_Selector_Window.addYesNO_Button('取消','確認',
		//No
		function()
		{
			//關閉 Window
			employeeManagement_Y02_Employee_Selector_Window.close();
			//關閉霧化效果
			removeBlur_Css('Mainpage');
		},
		//Yes
		function()
		{
			//參數
			var EmployeeID = employeeManagement_Y02_Employee_Selector_Window.employeeManagement_Y02_Employee_Selector_Window_DirectDepartment.getComboboxPagging_Value();
			var EmployeeName = employeeManagement_Y02_Employee_Selector_Window.employeeManagement_Y02_Employee_Selector_Window_DirectDepartment.getComboboxPagging_Value('displayField');
			//開啟指定畫面
			if(func == 'resetPassword')
			{
				//重設員工密碼
				employeeManagement_Y02_resetPassword(EmployeeID,employeeManagement_Y02_Employee_Selector_Window);
			}
			else if(func == 'basic')
			{
				//關閉選擇員工畫面
				employeeManagement_Y02_Employee_Selector_Window.close();
				//修改基本資料畫面
				employeeManagement_Y02_modifyBasic_Window_View(EmployeeID);
			}
			else if(func == 'detail')
			{
				//關閉選擇員工畫面
				employeeManagement_Y02_Employee_Selector_Window.close();
				//修改詳細資料畫面
				employeeManagement_Y02_modifyDetail_Window_View(EmployeeID);
			}
			else if(func == 'edu')
			{
				//關閉選擇員工畫面
				employeeManagement_Y02_Employee_Selector_Window.close();
				//修改學歷資料畫面
				employeeManagement_Y02_modifyEdu_Window_View(EmployeeID,EmployeeName);
			}
			else if(func == 'deleteEmployee')
			{
				//關閉選擇員工畫面
				employeeManagement_Y02_Employee_Selector_Window.close();
				//修改學歷資料畫面
				employeeManagement_Y02_deleteEmployee(EmployeeID,EmployeeName);
			}
		});
		//YesNo Button Css
		$("#employeeManagement_Y02_Employee_Selector_Window_Yes").css('margin-left',"65px");
		//開啟霧化效果
		addBlur_Css('Mainpage');
		//員工管理語言包
		employeeManagement_Y02_changeLanguage(languageStatus);
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}
//重設員工密碼
function employeeManagement_Y02_resetPassword(EmployeeID,originalWindow)
{
	try
	{
		//Loading Mask
		loadingMask = Loading_Mask.Initialize();
		loadingMask.setTarget(originalWindow.getId());
		loadingMask.show();
		//Ajax Post
		jqueryAjax_Post(localStorage.getItem('human') + "/OAuth/defaultPassword/" + EmployeeID,null,function(result)
		{
			loadingMask.close();
			//關閉 Window
			originalWindow.close();
			//如果員工頁已開啟則需要重整
			if(typeof(employeeManagement_Y02) != "undefined")
			{
				employeeManagement_Y02.load();
			}
			//顯示成功訊息
			normalSucceed_Msg(result.message);
		},function(content)
		{
			loadingMask.close();
			normalError_Msg_Withmask(content.message);
		},null);
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}
//修改基本資料畫面
function employeeManagement_Y02_modifyBasic_Window_View(EmployeeID)
{
	try
	{
		//新增畫面
		employeeManagement_Y02_modifyBasic_Window = Window_Define.Initialize();
		employeeManagement_Y02_modifyBasic_Window.setMask(true);
		employeeManagement_Y02_modifyBasic_Window.setSmartdetect(false);
		employeeManagement_Y02_modifyBasic_Window.setWidth(480);
		employeeManagement_Y02_modifyBasic_Window.setHeight(607);
		employeeManagement_Y02_modifyBasic_Window.setId('employeeManagement_Y02_modifyBasic_Window');
		employeeManagement_Y02_modifyBasic_Window.setTitle('修改員工基本資料');
		employeeManagement_Y02_modifyBasic_Window.show();
		//員工編號
		employeeManagement_Y02_modifyBasic_Window.addTextfield('employeeManagement_Y02_modifyBasic_Window_EmployeeNumber','　員工編號 :');
		$("#employeeManagement_Y02_modifyBasic_Window_EmployeeNumber_Label").width(115);
		$("#employeeManagement_Y02_modifyBasic_Window_EmployeeNumber").width("calc(100% - 117px)");
		//員工姓名
		employeeManagement_Y02_modifyBasic_Window.addTextfield('employeeManagement_Y02_modifyBasic_Window_EmployeeName','　員工姓名 :');
		$("#employeeManagement_Y02_modifyBasic_Window_EmployeeName_Label").width(115);
		$("#employeeManagement_Y02_modifyBasic_Window_EmployeeName").width("calc(100% - 117px)");
		//身份證字號
		employeeManagement_Y02_modifyBasic_Window.addTextfield('employeeManagement_Y02_modifyBasic_Window_EmployeeIdentify','身份證字號 :');
		$("#employeeManagement_Y02_modifyBasic_Window_EmployeeIdentify_Label").width(115);
		$("#employeeManagement_Y02_modifyBasic_Window_EmployeeIdentify").width("calc(100% - 117px)");
		//員工信箱
		employeeManagement_Y02_modifyBasic_Window.addTextfield('employeeManagement_Y02_modifyBasic_Window_EmployeeEmail','　員工信箱 :');
		$("#employeeManagement_Y02_modifyBasic_Window_EmployeeEmail_Label").width(115);
		$("#employeeManagement_Y02_modifyBasic_Window_EmployeeEmail").width("calc(100% - 117px)");
		//所屬部門
		employeeManagement_Y02_modifyBasic_Window.addComboboxPagging('employeeManagement_Y02_modifyBasic_Window_DirectDepartment','　所屬部門 :',
		{
			//分頁設定
			'Url':localStorage.human + '/Department/all?showDefault=true' + '&_Y02=' + new Date().getTime(),
		    'rootProperty':'data',
		    'displayField':'DepartmentName',
		    'valueField':'DepartmentID',
		    'pageSize':'5',
		    'searchUrl':localStorage.human + '/Department/all?showDefault=true' + '&_Y02=' + new Date().getTime(),
		    'searchPlaceholder':'搜尋部門',
		    'searchKey':'searchKey'
		});
		$("#employeeManagement_Y02_modifyBasic_Window_DirectDepartment_Label").width(115);
		$("#employeeManagement_Y02_modifyBasic_Window_DirectDepartment").width("calc(100% - 117px)");
		$("#employeeManagement_Y02_modifyBasic_Window_DirectDepartment").attr("readonly",true);
		$("#employeeManagement_Y02_modifyBasic_Window_DirectDepartment_Combobox_Pagging").css("left","130px");
		$("#employeeManagement_Y02_modifyBasic_Window_DirectDepartment").focus(function()
		{
			//員工管理語言包
			employeeManagement_Y02_changeLanguage(languageStatus);
		});
		//直屬主管
		employeeManagement_Y02_modifyBasic_Window_DirectManager_Object = 
		{
			//分頁設定
			'Url':localStorage.human + '/Employee' + '?_Y02=' + new Date().getTime(),
		    'rootProperty':'data',
		    'displayField':'EmployeeName',
		    'valueField':'EmployeeID',
		    'pageSize':'5',
		    'searchUrl':localStorage.human + '/Employee' + '?_Y02=' + new Date().getTime(),
		    'searchPlaceholder':'搜尋員工',
		    'searchKey':'searchKey'
		};
		employeeManagement_Y02_modifyBasic_Window.addComboboxPagging('employeeManagement_Y02_modifyBasic_Window_DirectManager','　直屬主管 :',employeeManagement_Y02_modifyBasic_Window_DirectManager_Object);
		$("#employeeManagement_Y02_modifyBasic_Window_DirectManager_Label").width(115);
		$("#employeeManagement_Y02_modifyBasic_Window_DirectManager").width("calc(100% - 117px)");
		$("#employeeManagement_Y02_modifyBasic_Window_DirectManager").attr("readonly",true);
		$("#employeeManagement_Y02_modifyBasic_Window_DirectManager_Combobox_Pagging").css("left","130px");
		$("#employeeManagement_Y02_modifyBasic_Window_DirectManager").focus(function()
		{
			//員工管理語言包
			employeeManagement_Y02_changeLanguage(languageStatus);
		});
		//員工生日
		employeeManagement_Y02_modifyBasic_Window.addDatetimeField('employeeManagement_Y02_modifyBasic_Window_EmployeeBirthday','　員工生日 :');
		$("#employeeManagement_Y02_modifyBasic_Window_EmployeeBirthday_Label").width(115);
		$("#employeeManagement_Y02_modifyBasic_Window_EmployeeBirthday").width("calc(100% - 117px)");
		//雇用日期
		employeeManagement_Y02_modifyBasic_Window.addDatetimeField('employeeManagement_Y02_modifyBasic_Window_EmployeeHireDate','　雇用日期 :');
		$("#employeeManagement_Y02_modifyBasic_Window_EmployeeHireDate_Label").width(115);
		$("#employeeManagement_Y02_modifyBasic_Window_EmployeeHireDate").width("calc(100% - 117px)");
		//居住地址
		employeeManagement_Y02_modifyBasic_Window.addTextfield('employeeManagement_Y02_modifyBasic_Window_EmployeeResidentAddress','　居住地址 :');
		$("#employeeManagement_Y02_modifyBasic_Window_EmployeeResidentAddress_Label").width(115);
		$("#employeeManagement_Y02_modifyBasic_Window_EmployeeResidentAddress").width("calc(100% - 117px)");
		//郵寄地址
		employeeManagement_Y02_modifyBasic_Window.addTextfield('employeeManagement_Y02_modifyBasic_Window_EmployeeMailingAddress','　郵寄地址 :');
		$("#employeeManagement_Y02_modifyBasic_Window_EmployeeMailingAddress_Label").width(115);
		$("#employeeManagement_Y02_modifyBasic_Window_EmployeeMailingAddress").width("calc(100% - 117px)");
		//職位名稱
		employeeManagement_Y02_modifyBasic_Window.addTextfield('employeeManagement_Y02_modifyBasic_Window_EmployeePositionTitle','　職位名稱 :');
		$("#employeeManagement_Y02_modifyBasic_Window_EmployeePositionTitle_Label").width(115);
		$("#employeeManagement_Y02_modifyBasic_Window_EmployeePositionTitle").width("calc(100% - 117px)");
		//員工性別
		employeeManagement_Y02_modifyBasic_Window.addRadio('employeeManagement_Y02_modifyBasic_Window_EmployeeGender','　員工性別 :','EmployeeGender','男','女',true,false);
		$("#employeeManagement_Y02_modifyBasic_Window_EmployeeGender_Label").width(115);
		$("#employeeManagement_Y02_modifyBasic_Window_EmployeeGender").width("calc(100% - 117px)");
		document.getElementById("employeeManagement_Y02_modifyBasic_Window_EmployeeGender_1").checked = true;
		//Radio Debug
		var Radio_Debug_Func = function()
		{
			$("#employeeManagement_Y02_modifyBasic_Window_EmployeeGender_Label").css("color","rgb(69,60,60)");
			$("#employeeManagement_Y02_modifyBasic_Window_EmployeeGender_1_Div").css("color","rgb(69,60,60)");
			$("#employeeManagement_Y02_modifyBasic_Window_EmployeeGender_2_Div").css("color","rgb(69,60,60)");
		}
		$("#employeeManagement_Y02_modifyBasic_Window_EmployeeAccount").click(Radio_Debug_Func);
		$("#employeeManagement_Y02_modifyBasic_Window_EmployeeNumber").click(Radio_Debug_Func);
		$("#employeeManagement_Y02_modifyBasic_Window_EmployeeName").click(Radio_Debug_Func);
		$("#employeeManagement_Y02_modifyBasic_Window_EmployeeIdentify").click(Radio_Debug_Func);
		$("#employeeManagement_Y02_modifyBasic_Window_EmployeeEmail").click(Radio_Debug_Func);
		$("#employeeManagement_Y02_modifyBasic_Window_DirectDepartment").click(Radio_Debug_Func);
		$("#employeeManagement_Y02_modifyBasic_Window_DirectManager").click(Radio_Debug_Func);
		//YesNo
		employeeManagement_Y02_modifyBasic_Window.addYesNO_Button('取消','確認',
		//No
		function()
		{
			//關閉 Window
			employeeManagement_Y02_modifyBasic_Window.close();
			//關閉霧化效果
			removeBlur_Css('Mainpage');
		},
		//Yes
		function()
		{
			//Radio Debug
			Radio_Debug_Func();
			//修改員工基本資料
			employeeManagement_Y02_modifyBasic(EmployeeID);
		});
		//YesNo Css
		$("#employeeManagement_Y02_modifyBasic_Window_Yes").css('margin-left',"65px");

		//Loading Mask
		var loadingMask = Loading_Mask.Initialize();
		loadingMask.setTarget('employeeManagement_Y02_modifyBasic_Window');
		loadingMask.show();
		//Ajax Post
		jqueryAjax_Get(localStorage.getItem('human') + "/Employee/" + EmployeeID + "?_Y02=" + new Date().getTime(),function(result)
		{
			//設定值
			$("#employeeManagement_Y02_modifyBasic_Window_EmployeeNumber").val(result.data.EmployeeNumber);
			$("#employeeManagement_Y02_modifyBasic_Window_EmployeeName").val(result.data.EmployeeName);
			$("#employeeManagement_Y02_modifyBasic_Window_EmployeeIdentify").val(result.data.EmployeeIdentity);
			$("#employeeManagement_Y02_modifyBasic_Window_EmployeeEmail").val(result.data.EmployeeMainEmail);
			$("#employeeManagement_Y02_modifyBasic_Window_EmployeeBirthday").datetimepicker
			({
				timepicker:false,
			    format:'Y/m/d',
				value:getDate(result.data.EmployeeBirthday)
			});
			$("#employeeManagement_Y02_modifyBasic_Window_EmployeeHireDate").datetimepicker
			({
				timepicker:false,
			    format:'Y/m/d',
				value:getDate(result.data.EmployeeHireDate)
			});
			$("#employeeManagement_Y02_modifyBasic_Window_EmployeeResidentAddress").val(result.data.EmployeeResidentAddress);
			$("#employeeManagement_Y02_modifyBasic_Window_EmployeeMailingAddress").val(result.data.EmployeeMailingAddress);
			$("#employeeManagement_Y02_modifyBasic_Window_EmployeePositionTitle").val(result.data.EmployeePositionTitle);
			if(result.data.EmployeeGender)
			{
				document.getElementById("employeeManagement_Y02_modifyBasic_Window_EmployeeGender_1").checked = true;
			}
			else
			{
				document.getElementById("employeeManagement_Y02_modifyBasic_Window_EmployeeGender_2").checked = true;
			}
			var setValue_Count = 0;
			$("#employeeManagement_Y02_modifyBasic_Window_DirectDepartment_valueField").bind("DOMSubtreeModified", function()
			{
				setValue_Count++;
				if(setValue_Count == 2)
				{
					loadingMask.close();
				}
			});
			$("#employeeManagement_Y02_modifyBasic_Window_DirectManager_valueField").bind("DOMSubtreeModified", function()
			{
				setValue_Count++;
				if(setValue_Count == 2)
				{
					loadingMask.close();
				}
			});
			setTimeout(function()
			{
				employeeManagement_Y02_modifyBasic_Window.employeeManagement_Y02_modifyBasic_Window_DirectDepartment.setComboboxPagging_Value(result.data.DepartmentID);
				employeeManagement_Y02_modifyBasic_Window.employeeManagement_Y02_modifyBasic_Window_DirectManager.setComboboxPagging_Value(result.data.DirectManagerID);
			},500);
		},function(content)
		{
			loadingMask.close();
			normalError_Msg_Withmask(content.message);
		},null);
		//員工管理語言包
		employeeManagement_Y02_changeLanguage(languageStatus);
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}
//修改基本資料方法
function employeeManagement_Y02_modifyBasic(EmployeeID)
{
	try
	{
		//參數
		var values = {};
		values.DirectDepartment = employeeManagement_Y02_modifyBasic_Window.employeeManagement_Y02_modifyBasic_Window_DirectDepartment.getComboboxPagging_Value();
		values.DirectManager = employeeManagement_Y02_modifyBasic_Window.employeeManagement_Y02_modifyBasic_Window_DirectManager.getComboboxPagging_Value();
		values.EmployeeBirthday = $("#employeeManagement_Y02_modifyBasic_Window_EmployeeBirthday").val();
		values.EmployeeGender = JSON.parse($('input[type=radio][name=EmployeeGender]:checked').attr('value'));;
		values.EmployeeHireDate = $("#employeeManagement_Y02_modifyBasic_Window_EmployeeHireDate").val();
		values.EmployeeID = EmployeeID;
		values.EmployeeIdentity = $("#employeeManagement_Y02_modifyBasic_Window_EmployeeIdentify").val();
		values.EmployeeMailingAddress = $("#employeeManagement_Y02_modifyBasic_Window_EmployeeMailingAddress").val();
		values.EmployeeMainEmail = $("#employeeManagement_Y02_modifyBasic_Window_EmployeeEmail").val();
		values.EmployeeName = $("#employeeManagement_Y02_modifyBasic_Window_EmployeeName").val();
		values.EmployeeNumber = $("#employeeManagement_Y02_modifyBasic_Window_EmployeeNumber").val();
		values.EmployeePositionTitle = $("#employeeManagement_Y02_modifyBasic_Window_EmployeePositionTitle").val();
		values.EmployeeResidentAddress = $("#employeeManagement_Y02_modifyBasic_Window_EmployeeResidentAddress").val();
		values.EmployeeSalary = 0;
		//Loading Mask
		var loadingMask = Loading_Mask.Initialize();
		loadingMask.setTarget('employeeManagement_Y02_modifyBasic_Window');
		loadingMask.show();
		//Ajax Post
		jqueryAjax_Put(localStorage.getItem('human') + '/Employee/' + EmployeeID + '/basic',JSON.stringify(values),function(result)
		{
			loadingMask.close();
			//關閉 Window
			employeeManagement_Y02_modifyBasic_Window.close();
			//如果員工頁已開啟則需要重整
			if(typeof(employeeManagement_Y02) != "undefined")
			{
				employeeManagement_Y02.load();
			}
			//顯示成功訊息
			normalSucceed_Msg(result.message);
		},function(content)
		{
			loadingMask.close();
			normalError_Msg_Withmask(content.message);
		},null);
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}
//修改詳細資料畫面
function employeeManagement_Y02_modifyDetail_Window_View(EmployeeID)
{
	try
	{
		//新增畫面
		employeeManagement_Y02_modifyDetail_Window = Window_Define.Initialize();
		employeeManagement_Y02_modifyDetail_Window.setMask(true);
		employeeManagement_Y02_modifyDetail_Window.setSmartdetect(false);
		employeeManagement_Y02_modifyDetail_Window.setWidth(480);
		employeeManagement_Y02_modifyDetail_Window.setHeight(360);
		employeeManagement_Y02_modifyDetail_Window.setId('employeeManagement_Y02_modifyDetail_Window');
		employeeManagement_Y02_modifyDetail_Window.setTitle('修改員工詳細資料');
		employeeManagement_Y02_modifyDetail_Window.show();
		//次要信箱
		employeeManagement_Y02_modifyDetail_Window.addTextfield('employeeManagement_Y02_modifyDetail_Window_EmployeeSecondEmail','次要信箱 :');
		//分機號碼
		employeeManagement_Y02_modifyDetail_Window.addTextfield('employeeManagement_Y02_modifyDetail_Window_EmployeeExtensionNumber','分機號碼 :');
		$("#employeeManagement_Y02_modifyDetail_Window_EmployeeExtensionNumber").attr('type','number');
		$("#employeeManagement_Y02_modifyDetail_Window_EmployeeExtensionNumber").attr('onkeypress','return event.charCode >= 48 && event.charCode <= 57');
		//家用電話
		employeeManagement_Y02_modifyDetail_Window.addTextfield('employeeManagement_Y02_modifyDetail_Window_EmployeeHomeNumber','家用電話 :');
		$("#employeeManagement_Y02_modifyDetail_Window_EmployeeHomeNumber").attr('type','number');
		$("#employeeManagement_Y02_modifyDetail_Window_EmployeeHomeNumber").attr('onkeypress','return event.charCode >= 48 && event.charCode <= 57');
		//手機號碼
		employeeManagement_Y02_modifyDetail_Window.addTextfield('employeeManagement_Y02_modifyDetail_Window_EmployeeMobileNumber','手機號碼 :');
		$("#employeeManagement_Y02_modifyDetail_Window_EmployeeMobileNumber").attr('type','number');
		$("#employeeManagement_Y02_modifyDetail_Window_EmployeeMobileNumber").attr('onkeypress','return event.charCode >= 48 && event.charCode <= 57');
		//工作內容
		employeeManagement_Y02_modifyDetail_Window.addTextarea('employeeManagement_Y02_modifyDetail_Window_EmployeeWorkerContent','工作內容 :');
		//YesNo
		employeeManagement_Y02_modifyDetail_Window.addYesNO_Button('取消','確認',
		//No
		function()
		{
			//關閉 Window
			employeeManagement_Y02_modifyDetail_Window.close();
			//關閉霧化效果
			removeBlur_Css('Mainpage');
		},
		//Yes
		function()
		{
			//修改員工基本資料
			employeeManagement_Y02_modifyDetail(EmployeeID);
		});
		//YesNo Css
		$("#employeeManagement_Y02_modifyDetail_Window_Yes").css('margin-left',"65px");

		//Loading Mask
		var loadingMask = Loading_Mask.Initialize();
		loadingMask.setTarget('employeeManagement_Y02_modifyDetail_Window');
		loadingMask.show();
		//Ajax Post
		jqueryAjax_Get(localStorage.getItem('human') + "/Employee/" + EmployeeID + "?_Y02=" + new Date().getTime(),function(result)
		{
			//設定值
			$("#employeeManagement_Y02_modifyDetail_Window_EmployeeSecondEmail").val(result.data.EmployeeSecondEmail);
			$("#employeeManagement_Y02_modifyDetail_Window_EmployeeExtensionNumber").val(result.data.EmployeeExtensionNumber);
			$("#employeeManagement_Y02_modifyDetail_Window_EmployeeHomeNumber").val(result.data.EmployeeHomeNumber);
			$("#employeeManagement_Y02_modifyDetail_Window_EmployeeMobileNumber").val(result.data.EmployeeMobileNumber);
			$("#employeeManagement_Y02_modifyDetail_Window_EmployeeWorkerContent").val(result.data.EmployeeWorkerContent);
			loadingMask.close();
		},function(content)
		{
			loadingMask.close();
			normalError_Msg_Withmask(content.message);
		},null);
		//員工管理語言包
		employeeManagement_Y02_changeLanguage(languageStatus);
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}
//修改詳細資料方法
function employeeManagement_Y02_modifyDetail(EmployeeID)
{
	try
	{
		//參數
		var Params = {};
		if($("#employeeManagement_Y02_modifyDetail_Window_EmployeeSecondEmail").val())
		{
			Params.EmployeeSecondEmail = $("#employeeManagement_Y02_modifyDetail_Window_EmployeeSecondEmail").val();
		}
		if($("#employeeManagement_Y02_modifyDetail_Window_EmployeeExtensionNumber").val())
		{
			Params.EmployeeExtensionNumber = $("#employeeManagement_Y02_modifyDetail_Window_EmployeeExtensionNumber").val();
		}
		if($("#employeeManagement_Y02_modifyDetail_Window_EmployeeHomeNumber").val())
		{
			Params.EmployeeHomeNumber = $("#employeeManagement_Y02_modifyDetail_Window_EmployeeHomeNumber").val();
		}
		if($("#employeeManagement_Y02_modifyDetail_Window_EmployeeMobileNumber").val())
		{
			Params.EmployeeMobileNumber = $("#employeeManagement_Y02_modifyDetail_Window_EmployeeMobileNumber").val();
		}
		if($("#employeeManagement_Y02_modifyDetail_Window_EmployeeWorkerContent").val())
		{
			Params.EmployeeWorkerContent = $("#employeeManagement_Y02_modifyDetail_Window_EmployeeWorkerContent").val();
		}
		Params.EmployeeID = EmployeeID;
		//Loading Mask
		var loadingMask = Loading_Mask.Initialize();
		loadingMask.setTarget('employeeManagement_Y02_modifyDetail_Window');
		loadingMask.show();
		//Ajax Post
		jqueryAjax_Put(localStorage.getItem('human') + '/Employee/' + EmployeeID + '/detail',JSON.stringify(Params),function(result)
		{
			loadingMask.close();
			//關閉 Window
			employeeManagement_Y02_modifyDetail_Window.close();
			//如果員工頁已開啟則需要重整
			if(typeof(employeeManagement_Y02) != "undefined")
			{
				employeeManagement_Y02.load();
			}
			//顯示成功訊息
			normalSucceed_Msg(result.message);
		},function(content)
		{
			loadingMask.close();
			normalError_Msg_Withmask(content.message);
		},null);
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}
//修改學歷資料畫面
function employeeManagement_Y02_modifyEdu_Window_View(EmployeeID)
{
	try
	{
		//新增畫面
		employeeManagement_Y02_modifyEdu_Window = Window_Define.Initialize();
		employeeManagement_Y02_modifyEdu_Window.setMask(true);
		employeeManagement_Y02_modifyEdu_Window.setSmartdetect(false);
		employeeManagement_Y02_modifyEdu_Window.setWidth(480);
		employeeManagement_Y02_modifyEdu_Window.setHeight(402);
		employeeManagement_Y02_modifyEdu_Window.setId('employeeManagement_Y02_modifyEdu_Window');
		employeeManagement_Y02_modifyEdu_Window.setTitle('修改員工學歷資料');
		employeeManagement_Y02_modifyEdu_Window.show();
		//最高學歷
		employeeManagement_Y02_modifyEdu_Window.addCombobox('employeeManagement_Y02_modifyEdu_Window_EmployeeHighEduLevel','最高學歷 :');
		$("#employeeManagement_Y02_modifyEdu_Window_EmployeeHighEduLevel").append
		(
			'<option disabled="" hidden="" selected=""></option>' +
			'<option value="博士">博士</option>' +
			'<option value="碩士">碩士</option>' +
			'<option value="大學">大學</option>' +
			'<option value="大專">大專</option>' +
			'<option value="高中">高中</option>' +
			'<option value="國中">國中</option>' +
			'<option value="國小">國小</option>'
		);
		//最高學校
		employeeManagement_Y02_modifyEdu_Window.addTextfield('employeeManagement_Y02_modifyEdu_Window_EmployeeHighEduSchool','最高學校 :');
		//最高學系
		employeeManagement_Y02_modifyEdu_Window.addTextfield('employeeManagement_Y02_modifyEdu_Window_EmployeeHighEduDepartment','最高學系 :');
		//就學狀態
		employeeManagement_Y02_modifyEdu_Window.addCombobox('employeeManagement_Y02_modifyEdu_Window_EmployeeHighEduStatus','就學狀態 :');
		$("#employeeManagement_Y02_modifyEdu_Window_EmployeeHighEduStatus").append
		(
			'<option disabled="" hidden="" selected=""></option>' +
			'<option value="應屆畢業生">應屆畢業生</option>' +
			'<option value="已畢業">已畢業</option>' +
			'<option value="肄業">肄業</option>' +
			'<option value="休學">休學</option>' +
			'<option value="就學中">就學中</option>'
		);
		//次高學歷
		employeeManagement_Y02_modifyEdu_Window.addCombobox('employeeManagement_Y02_modifyEdu_Window_EmployeeSecondEduLevel','次高學歷 :');
		$("#employeeManagement_Y02_modifyEdu_Window_EmployeeSecondEduLevel").append
		(
			'<option disabled="" hidden="" selected=""></option>' +
			'<option value="博士">博士</option>' +
			'<option value="碩士">碩士</option>' +
			'<option value="大學">大學</option>' +
			'<option value="大專">大專</option>' +
			'<option value="高中">高中</option>' +
			'<option value="國中">國中</option>' +
			'<option value="國小">國小</option>'
		);
		//次高學校
		employeeManagement_Y02_modifyEdu_Window.addTextfield('employeeManagement_Y02_modifyEdu_Window_EmployeeSecondEduSchool','次高學校 :');
		//次高學系
		employeeManagement_Y02_modifyEdu_Window.addTextfield('employeeManagement_Y02_modifyEdu_Window_EmployeeSecondEduDepartment','次高學系 :');
		//YesNo
		employeeManagement_Y02_modifyEdu_Window.addYesNO_Button('取消','確認',
		//No
		function()
		{
			//關閉 Window
			employeeManagement_Y02_modifyEdu_Window.close();
			//關閉霧化效果
			removeBlur_Css('Mainpage');
		},
		//Yes
		function()
		{
			//修改員工學歷資料
			employeeManagement_Y02_modifyEdu(EmployeeID);
		});
		//YesNo Css
		$("#employeeManagement_Y02_modifyEdu_Window_Yes").css('margin-left',"65px");

		//Loading Mask
		var loadingMask = Loading_Mask.Initialize();
		loadingMask.setTarget('employeeManagement_Y02_modifyEdu_Window');
		loadingMask.show();
		//Ajax Post
		jqueryAjax_Get(localStorage.getItem('human') + "/Employee/" + EmployeeID + "?_Y02=" + new Date().getTime(),function(result)
		{
			//設定值
			$("#employeeManagement_Y02_modifyEdu_Window_EmployeeHighEduLevel").val(result.data.employeeHighEdu.EmployeeHighEduLevel);
			$("#employeeManagement_Y02_modifyEdu_Window_EmployeeHighEduSchool").val(result.data.employeeHighEdu.EmployeeHighEduSchool);
			$("#employeeManagement_Y02_modifyEdu_Window_EmployeeHighEduDepartment").val(result.data.employeeHighEdu.EmployeeHighEduDepartment);
			$("#employeeManagement_Y02_modifyEdu_Window_EmployeeHighEduStatus").val(result.data.employeeHighEdu.EmployeeHighEduStatus);
			$("#employeeManagement_Y02_modifyEdu_Window_EmployeeSecondEduLevel").val(result.data.employeeSecondEdu.EmployeeSecondEduLevel);
			$("#employeeManagement_Y02_modifyEdu_Window_EmployeeSecondEduSchool").val(result.data.employeeSecondEdu.EmployeeSecondEduSchool);
			$("#employeeManagement_Y02_modifyEdu_Window_EmployeeSecondEduDepartment").val(result.data.employeeSecondEdu.EmployeeSecondEduDepartment);
			loadingMask.close();
		},function(content)
		{
			loadingMask.close();
			normalError_Msg_Withmask(content.message);
		},null);
		//員工管理語言包
		employeeManagement_Y02_changeLanguage(languageStatus);
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}
//修改學歷資料方法
function employeeManagement_Y02_modifyEdu(EmployeeID)
{
	try
	{
		//參數
		var Params = {};
		if($("#employeeManagement_Y02_modifyEdu_Window_EmployeeHighEduLevel").val())
		{
			Params.EmployeeHighEduLevel = $("#employeeManagement_Y02_modifyEdu_Window_EmployeeHighEduLevel").val();
		}
		if($("#employeeManagement_Y02_modifyEdu_Window_EmployeeHighEduDepartment").val())
		{
			Params.EmployeeHighEduDepartment = $("#employeeManagement_Y02_modifyEdu_Window_EmployeeHighEduDepartment").val();
		}
		if($("#employeeManagement_Y02_modifyEdu_Window_EmployeeHighEduSchool").val())
		{
			Params.EmployeeHighEduSchool = $("#employeeManagement_Y02_modifyEdu_Window_EmployeeHighEduSchool").val();
		}
		if($("#employeeManagement_Y02_modifyEdu_Window_EmployeeHighEduStatus").val())
		{
			Params.EmployeeHighEduStatus = $("#employeeManagement_Y02_modifyEdu_Window_EmployeeHighEduStatus").val();
		}
		if($("#employeeManagement_Y02_modifyEdu_Window_EmployeeSecondEduLevel").val())
		{
			Params.EmployeeSecondEduLevel = $("#employeeManagement_Y02_modifyEdu_Window_EmployeeSecondEduLevel").val();
		}
		if($("#employeeManagement_Y02_modifyEdu_Window_EmployeeSecondEduDepartment").val())
		{
			Params.EmployeeSecondEduDepartment = $("#employeeManagement_Y02_modifyEdu_Window_EmployeeSecondEduDepartment").val();
		}
		if($("#employeeManagement_Y02_modifyEdu_Window_EmployeeSecondEduSchool").val())
		{
			Params.EmployeeSecondEduSchool = $("#employeeManagement_Y02_modifyEdu_Window_EmployeeSecondEduSchool").val();
		}
		Params.EmployeeID = EmployeeID;
		//Loading Mask
		var loadingMask = Loading_Mask.Initialize();
		loadingMask.setTarget('employeeManagement_Y02_modifyEdu_Window');
		loadingMask.show();
		//Ajax Post
		jqueryAjax_Put(localStorage.getItem('human') + '/Employee/' + EmployeeID + '/edu',JSON.stringify(Params),function(result)
		{
			loadingMask.close();
			//關閉 Window
			employeeManagement_Y02_modifyEdu_Window.close();
			//如果員工頁已開啟則需要重整
			if(typeof(employeeManagement_Y02) != "undefined")
			{
				employeeManagement_Y02.load();
			}
			//顯示成功訊息
			normalSucceed_Msg(result.message);
		},function(content)
		{
			loadingMask.close();
			normalError_Msg_Withmask(content.message);
		},null);
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}
//離職員工方法
function employeeManagement_Y02_deleteEmployee(EmployeeID,EmployeeName)
{
	try
	{
		var deleteEmployee_Msg_Language = 
		{
			"leave":
			{
				"T": "確認離職",
				"S": "确认离职"
			}
		};
		var deleteEmployee_Msg = showMsg('警告',deleteEmployee_Msg_Language['leave'][languageStatus] + EmployeeName + '?',function()
		{
			deleteEmployee_Msg.close();
		},function()
		{
			//參數
			var values = {};
			values.DirectDepartment = 'a23a165a-8413-4199-b6d1-afef3b257037'; //寫死離職部門系統編號
			values.EmployeeID = EmployeeID;
			//Loading Mask
			var loadingMask = Loading_Mask.Initialize();
			loadingMask.setTarget(deleteEmployee_Msg.getId());
			loadingMask.show();
			//刪除員工
			jqueryAjax_Delete(localStorage.getItem('human') + '/Employee/' + EmployeeID,null,function(result)
			{
				loadingMask.close();
				//如果員工頁已開啟則需要重整
				if(typeof(employeeManagement_Y02) != "undefined")
				{
					employeeManagement_Y02.load();
				}
				//Ajax Post
				jqueryAjax_Put(localStorage.getItem('human') + '/Employee/' + EmployeeID + '/basic',JSON.stringify(values),function(result)
				{
					//關閉 Window
					deleteEmployee_Msg.close();
					//如果員工頁已開啟則需要重整
					if(typeof(employeeManagement_Y02) != "undefined")
					{
						employeeManagement_Y02.load();
					}
					//顯示成功訊息
					normalSucceed_Msg(result.message);		
				},function(content)
				{
					loadingMask.close();
					var msg = normalError_Msg(content.message);
					msg.setHeight(190);
					$("#YesNo_Msg").height(190);
				},null);
			},function(content)
			{
				loadingMask.close();
				var msg = normalError_Msg(content.message);
				msg.setHeight(190);
				$("#YesNo_Msg").height(190);
			},null);
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
//員工管理語言包
function employeeManagement_Y02_changeLanguage(status)
{
	try
	{
		var employeeManagement_Y02_Language = 
		{
			"employeeManagement": 
			{
				"T": "員工管理",
				"S": "员工管理"
			},
			"employeeList": 
			{
				"T": "員工清單",
				"S": "员工清单"
			},
			"employeeResetPassword": 
			{
				"T": "重設密碼",
				"S": "重设密码"
			},
			"employeeModifyBasic": 
			{
				"T": "修改基本資料",
				"S": "修改基本资料"
			},
			"employeeModifyDetail": 
			{
				"T": "修改詳細資料",
				"S": "修改详细资料"
			},
			"employeeModifyEdu": 
			{
				"T": "修改學歷資料",
				"S": "修改学历资料"
			},
			"employeeDelete": 
			{
				"T": "離職指定員工",
				"S": "离职指定员工"
			},
			"employeeImg": 
			{
				"T": "圖片",
				"S": "图片"
			},
			"employeeDepartment": 
			{
				"T": "所屬部門",
				"S": "所属部门"
			},
			"employeeName": 
			{
				"T": "員工姓名",
				"S": "员工姓名"
			},
			"employeeNumber": 
			{
				"T": "員工編號",
				"S": "员工编号"
			},
			"displayAll": 
			{
				"T": "顯示全部",
				"S": "显示全部"
			},
			"displayDuty": 
			{
				"T": "在職中",
				"S": "在职中"
			},
			"displayLeave": 
			{
				"T": "已離職",
				"S": "已离职"
			}
		};
		$("div[myId='員工管理']").html(employeeManagement_Y02_Language['employeeManagement'][status]);
		$("div[myId='員工清單']").html(employeeManagement_Y02_Language['employeeList'][status]);
		$("div[myId='重設密碼']").html(employeeManagement_Y02_Language['employeeResetPassword'][status]);
		$("div[myId='修改基本資料']").html(employeeManagement_Y02_Language['employeeModifyBasic'][status]);
		$("div[myId='修改詳細資料']").html(employeeManagement_Y02_Language['employeeModifyDetail'][status]);
		$("div[myId='修改學歷資料']").html(employeeManagement_Y02_Language['employeeModifyEdu'][status]);
		$("div[myId='離職指定員工']").html(employeeManagement_Y02_Language['employeeDelete'][status]);
		$("div[myId='圖片']").html(employeeManagement_Y02_Language['employeeImg'][status]);
		$("div[myId='所屬部門']").html(employeeManagement_Y02_Language['employeeDepartment'][status]);
		$("div[myId='員工姓名']").html(employeeManagement_Y02_Language['employeeName'][status]);
		$("div[myId='員工編號']").html(employeeManagement_Y02_Language['employeeNumber'][status]);

		$("#employeeManagement_Y02_employeeType").children().eq(0).html(employeeManagement_Y02_Language['displayAll'][status]);
		$("#employeeManagement_Y02_employeeType").children().eq(1).html(employeeManagement_Y02_Language['displayDuty'][status]);
		$("#employeeManagement_Y02_employeeType").children().eq(2).html(employeeManagement_Y02_Language['displayLeave'][status]);

		$("#employeeManagement_Y02_a").html(employeeManagement_Y02_Language['employeeList'][status]);

		var gridPanel_Pagging_Language = 
		{
			"gridPanel_Pagging_Language_1": 
			{
				"T": "第",
				"S": "第"
			},
			"gridPanel_Pagging_Language_2": 
			{
				"T": "頁，共",
				"S": "页，共"
			},
			"gridPanel_Pagging_Language_3": 
			{
				"T": "頁",
				"S": "页"
			},
			"gridPanel_Pagging_Language_4": 
			{
				"T": "紀錄 : 從",
				"S": "纪录：从"
			},
			"gridPanel_Pagging_Language_5": 
			{
				"T": "共",
				"S": "共"
			},
			"gridPanel_Pagging_Language_6": 
			{
				"T": "筆",
				"S": "笔"
			},
			"gridPanel_Pagging_Language_7": 
			{
				"T": "搜尋部門",
				"S": "搜寻部门"
			},
			"gridPanel_Pagging_Language_8": 
			{
				"T": "搜尋員工",
				"S": "搜寻员工"
			}
		};
		$("#employeeManagement_Y02_Pagging").children().eq(3).html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_1'][status]);
		$("#employeeManagement_Y02_Pagging").children().eq(5).html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_2'][status]);
		$("#employeeManagement_Y02_Pagging").children().eq(7).html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_3'][status]);
		$("#employeeManagement_Y02_Pagging").children().eq(13).html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_4'][status]);
		$("#employeeManagement_Y02_Pagging").children().eq(17).html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_5'][status]);
		$("#employeeManagement_Y02_Pagging").children().eq(19).html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_6'][status]);

		$("#employeeManagement_Y02_Searchemployee").attr('placeholder',gridPanel_Pagging_Language['gridPanel_Pagging_Language_8'][status]);

		$("#employeeManagement_Y02_addEmployee_Window_DirectDepartment_Combobox_Pagging_Top_Input").attr('placeholder',gridPanel_Pagging_Language['gridPanel_Pagging_Language_7'][status]);
		$("#employeeManagement_Y02_addEmployee_Window_DirectDepartment_Combobox_Pagging_Bottom_Record_0").html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_4'][status]);
		$("#employeeManagement_Y02_addEmployee_Window_DirectDepartment_Combobox_Pagging_Bottom_Record_4").html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_5'][status]);
		$("#employeeManagement_Y02_addEmployee_Window_DirectDepartment_Combobox_Pagging_Bottom_Record_6").html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_6'][status]);

		$("#employeeManagement_Y02_addEmployee_Window_DirectManager_Combobox_Pagging_Top_Input").attr('placeholder',gridPanel_Pagging_Language['gridPanel_Pagging_Language_8'][status]);
		$("#employeeManagement_Y02_addEmployee_Window_DirectManager_Combobox_Pagging_Bottom_Record_0").html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_4'][status]);
		$("#employeeManagement_Y02_addEmployee_Window_DirectManager_Combobox_Pagging_Bottom_Record_4").html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_5'][status]);
		$("#employeeManagement_Y02_addEmployee_Window_DirectManager_Combobox_Pagging_Bottom_Record_6").html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_6'][status]);

		$("#employeeManagement_Y02_Employee_Selector_Window_DirectDepartment_Combobox_Pagging_Top_Input").attr('placeholder',gridPanel_Pagging_Language['gridPanel_Pagging_Language_8'][status]);
		$("#employeeManagement_Y02_Employee_Selector_Window_DirectDepartment_Combobox_Pagging_Bottom_Record_0").html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_4'][status]);
		$("#employeeManagement_Y02_Employee_Selector_Window_DirectDepartment_Combobox_Pagging_Bottom_Record_4").html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_5'][status]);
		$("#employeeManagement_Y02_Employee_Selector_Window_DirectDepartment_Combobox_Pagging_Bottom_Record_6").html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_6'][status]);

		$("#employeeManagement_Y02_modifyBasic_Window_DirectManager_Combobox_Pagging_Top_Input").attr('placeholder',gridPanel_Pagging_Language['gridPanel_Pagging_Language_8'][status]);
		$("#employeeManagement_Y02_modifyBasic_Window_DirectManager_Combobox_Pagging_Bottom_Record_0").html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_4'][status]);
		$("#employeeManagement_Y02_modifyBasic_Window_DirectManager_Combobox_Pagging_Bottom_Record_4").html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_5'][status]);
		$("#employeeManagement_Y02_modifyBasic_Window_DirectManager_Combobox_Pagging_Bottom_Record_6").html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_6'][status]);

		$("#employeeManagement_Y02_modifyBasic_Window_DirectDepartment_Combobox_Pagging_Top_Input").attr('placeholder',gridPanel_Pagging_Language['gridPanel_Pagging_Language_8'][status]);
		$("#employeeManagement_Y02_modifyBasic_Window_DirectDepartment_Combobox_Pagging_Bottom_Record_0").html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_4'][status]);
		$("#employeeManagement_Y02_modifyBasic_Window_DirectDepartment_Combobox_Pagging_Bottom_Record_4").html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_5'][status]);
		$("#employeeManagement_Y02_modifyBasic_Window_DirectDepartment_Combobox_Pagging_Bottom_Record_6").html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_6'][status]);

		var employeeInsert_Y02_Language = 
		{
			"employeeInsert": 
			{
				"T": "新增員工",
				"S": "新增员工"
			},
			"employeeAccount": 
			{
				"T": "　　　帳號 :",
				"S": "　　　帐号 :"
			},
			"employeeNumber": 
			{
				"T": "　員工編號 :",
				"S": "　员工编号 :"
			},
			"employeeName": 
			{
				"T": "　員工姓名 :",
				"S": "　员工姓名 :"
			},
			"employeeIdentify": 
			{
				"T": "身份證字號 :",
				"S": "身分证字号 :"
			},
			"employeeEmail": 
			{
				"T": "　員工信箱 :",
				"S": "　员工信箱 :"
			},
			"employeeDepartment": 
			{
				"T": "　所屬部門 :",
				"S": "　所属部门 :"
			},
			"employeeManager": 
			{
				"T": "　直屬主管 :",
				"S": "　直属主管 :"
			},
			"employeeGender": 
			{
				"T": "　員工性別 :",
				"S": "　员工性别 :"
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
			"employeeSeletor": 
			{
				"T": "選擇修改員工",
				"S": "选择修改员工"
			},
			"employeeModify": 
			{
				"T": "修改員工 :",
				"S": "修改员工 :"
			}
		};
		$("#employeeManagement_Y02_addEmployee_Window_Title").html(employeeInsert_Y02_Language['employeeInsert'][status]);
		$("#employeeManagement_Y02_addEmployee_Window_EmployeeAccount_Label").html(employeeInsert_Y02_Language['employeeAccount'][status]);
		$("#employeeManagement_Y02_addEmployee_Window_EmployeeNumber_Label").html(employeeInsert_Y02_Language['employeeNumber'][status]);
		$("#employeeManagement_Y02_addEmployee_Window_EmployeeName_Label").html(employeeInsert_Y02_Language['employeeName'][status]);
		$("#employeeManagement_Y02_addEmployee_Window_EmployeeIdentify_Label").html(employeeInsert_Y02_Language['employeeIdentify'][status]);
		$("#employeeManagement_Y02_addEmployee_Window_EmployeeEmail_Label").html(employeeInsert_Y02_Language['employeeEmail'][status]);
		$("#employeeManagement_Y02_addEmployee_Window_DirectDepartment_Label").html(employeeInsert_Y02_Language['employeeDepartment'][status]);
		$("#employeeManagement_Y02_addEmployee_Window_DirectManager_Label").html(employeeInsert_Y02_Language['employeeManager'][status]);
		$("#employeeManagement_Y02_addEmployee_Window_EmployeeGender_Label").html(employeeInsert_Y02_Language['employeeGender'][status]);
		$("#employeeManagement_Y02_addEmployee_Window_No").html(employeeInsert_Y02_Language['No'][status]);
		$("#employeeManagement_Y02_addEmployee_Window_Yes").html(employeeInsert_Y02_Language['Yes'][status]);
		$("#employeeManagement_Y02_Employee_Selector_Window_Title").html(employeeInsert_Y02_Language['employeeSeletor'][status]);
		$("#employeeManagement_Y02_Employee_Selector_Window_DirectDepartment_Label").html(employeeInsert_Y02_Language['employeeModify'][status]);
		$("#employeeManagement_Y02_Employee_Selector_Window_No").html(employeeInsert_Y02_Language['No'][status]);
		$("#employeeManagement_Y02_Employee_Selector_Window_Yes").html(employeeInsert_Y02_Language['Yes'][status]);

		var employeeModifyBasic_Y02_Language = 
		{
			"employeeModifyBasic": 
			{
				"T": "修改員工基本資料",
				"S": "修改员工基本资料"
			},
			"employeeNumber": 
			{
				"T": "　員工編號 :",
				"S": "　员工编号 :"
			},
			"employeeName": 
			{
				"T": "　員工姓名 :",
				"S": "　员工姓名 :"
			},
			"employeeIdentify": 
			{
				"T": "身份證字號 :",
				"S": "身分证字号 :"
			},
			"employeeEmail": 
			{
				"T": "　員工信箱 :",
				"S": "　员工信箱 :"
			},
			"employeeDepartment": 
			{
				"T": "　所屬部門 :",
				"S": "　所属部门 :"
			},
			"employeeManager": 
			{
				"T": "　直屬主管 :",
				"S": "　直属主管 :"
			},
			"employeeGender": 
			{
				"T": "　員工性別 :",
				"S": "　员工性别 :"
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
			"employeeBirthday": 
			{
				"T": "　員工生日 :",
				"S": "　员工生日 :"
			},
			"employeeHireDate": 
			{
				"T": "　雇用日期 :",
				"S": "　雇用日期 :"
			},
			"employeeAddr0": 
			{
				"T": "　居住地址 :",
				"S": "　居住地址 :"
			},
			"employeeAddr1": 
			{
				"T": "　郵寄地址 :",
				"S": "　邮寄地址 :"
			},
			"employeePositionTitle": 
			{
				"T": "　職位名稱 :",
				"S": "　职位名称 :"
			}
		};
		$("#employeeManagement_Y02_modifyBasic_Window_Title").html(employeeModifyBasic_Y02_Language['employeeModifyBasic'][status]);
		$("#employeeManagement_Y02_modifyBasic_Window_EmployeeNumber_Label").html(employeeModifyBasic_Y02_Language['employeeNumber'][status]);
		$("#employeeManagement_Y02_modifyBasic_Window_EmployeeName_Label").html(employeeModifyBasic_Y02_Language['employeeName'][status]);
		$("#employeeManagement_Y02_modifyBasic_Window_EmployeeIdentify_Label").html(employeeModifyBasic_Y02_Language['employeeIdentify'][status]);
		$("#employeeManagement_Y02_modifyBasic_Window_EmployeeEmail_Label").html(employeeModifyBasic_Y02_Language['employeeEmail'][status]);
		$("#employeeManagement_Y02_modifyBasic_Window_DirectDepartment_Label").html(employeeModifyBasic_Y02_Language['employeeDepartment'][status]);
		$("#employeeManagement_Y02_modifyBasic_Window_DirectManager_Label").html(employeeModifyBasic_Y02_Language['employeeManager'][status]);
		$("#employeeManagement_Y02_modifyBasic_Window_EmployeeBirthday_Label").html(employeeModifyBasic_Y02_Language['employeeBirthday'][status]);
		$("#employeeManagement_Y02_modifyBasic_Window_EmployeeHireDate_Label").html(employeeModifyBasic_Y02_Language['employeeHireDate'][status]);
		$("#employeeManagement_Y02_modifyBasic_Window_EmployeeResidentAddress_Label").html(employeeModifyBasic_Y02_Language['employeeAddr0'][status]);
		$("#employeeManagement_Y02_modifyBasic_Window_EmployeeMailingAddress_Label").html(employeeModifyBasic_Y02_Language['employeeAddr1'][status]);
		$("#employeeManagement_Y02_modifyBasic_Window_EmployeePositionTitle_Label").html(employeeModifyBasic_Y02_Language['employeePositionTitle'][status]);
		$("#employeeManagement_Y02_modifyBasic_Window_EmployeeGender_Label").html(employeeModifyBasic_Y02_Language['employeeGender'][status]);
		$("#employeeManagement_Y02_modifyBasic_Window_No").html(employeeModifyBasic_Y02_Language['No'][status]);
		$("#employeeManagement_Y02_modifyBasic_Window_Yes").html(employeeModifyBasic_Y02_Language['Yes'][status]);

		var employeeModifyDetail_Y02_Language = 
		{
			"employeeModifyDetail": 
			{
				"T": "修改員工詳細資料",
				"S": "修改员工详细资料"
			},
			"employeeModifyDetail_1": 
			{
				"T": "次要信箱 :",
				"S": "次要信箱 :"
			},
			"employeeModifyDetail_2": 
			{
				"T": "分機號碼 :",
				"S": "分机号码 :"
			},
			"employeeModifyDetail_3": 
			{
				"T": "家用電話 :",
				"S": "家用电话 :"
			},
			"employeeModifyDetail_4": 
			{
				"T": "手機號碼 :",
				"S": "手机号码 :"
			},
			"employeeModifyDetail_5": 
			{
				"T": "工作內容 :",
				"S": "工作内容 :"
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
			}
		};
		$("#employeeManagement_Y02_modifyDetail_Window_Title").html(employeeModifyDetail_Y02_Language['employeeModifyDetail'][status]);
		$("#employeeManagement_Y02_modifyDetail_Window_EmployeeSecondEmail_Label").html(employeeModifyDetail_Y02_Language['employeeModifyDetail_1'][status]);
		$("#employeeManagement_Y02_modifyDetail_Window_EmployeeExtensionNumber_Label").html(employeeModifyDetail_Y02_Language['employeeModifyDetail_2'][status]);
		$("#employeeManagement_Y02_modifyDetail_Window_EmployeeHomeNumber_Label").html(employeeModifyDetail_Y02_Language['employeeModifyDetail_3'][status]);
		$("#employeeManagement_Y02_modifyDetail_Window_EmployeeMobileNumber_Label").html(employeeModifyDetail_Y02_Language['employeeModifyDetail_4'][status]);
		$("#employeeManagement_Y02_modifyDetail_Window_EmployeeWorkerContent_Label").html(employeeModifyDetail_Y02_Language['employeeModifyDetail_5'][status]);
		$("#employeeManagement_Y02_modifyDetail_Window_No").html(employeeModifyDetail_Y02_Language['No'][status]);
		$("#employeeManagement_Y02_modifyDetail_Window_Yes").html(employeeModifyDetail_Y02_Language['Yes'][status]);

		var employeeModifyEdu_Y02_Language = 
		{
			"employeeModifyEdu": 
			{
				"T": "修改員工學歷資料",
				"S": "修改员工学历资料"
			},
			"employeeModifyEdu_1": 
			{
				"T": "最高學歷 :",
				"S": "最高学历 :"
			},
			"employeeModifyEdu_2": 
			{
				"T": "最高學校 :",
				"S": "最高学校 :"
			},
			"employeeModifyEdu_3": 
			{
				"T": "最高學系 :",
				"S": "最高学系 :"
			},
			"employeeModifyEdu_4": 
			{
				"T": "就學狀態 :",
				"S": "就学状态 :"
			},
			"employeeModifyEdu_5": 
			{
				"T": "次高學歷 :",
				"S": "次高学历 :"
			},
			"employeeModifyEdu_6": 
			{
				"T": "次高學校 :",
				"S": "次高学校 :"
			},
			"employeeModifyEdu_7": 
			{
				"T": "次高學系 :",
				"S": "次高学系 :"
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
			"select_1_1": 
			{
				"T": "博士",
				"S": "博士"
			},
			"select_1_2": 
			{
				"T": "碩士",
				"S": "硕士"
			},
			"select_1_3": 
			{
				"T": "大學",
				"S": "大学"
			},
			"select_1_4": 
			{
				"T": "大專",
				"S": "大专"
			},
			"select_1_5": 
			{
				"T": "高中",
				"S": "高中"
			},
			"select_1_6": 
			{
				"T": "國中",
				"S": "国中"
			},
			"select_1_7": 
			{
				"T": "國小",
				"S": "国小"
			},
			"select_2_1": 
			{
				"T": "應屆畢業生",
				"S": "应届毕业生"
			},
			"select_2_2": 
			{
				"T": "已畢業",
				"S": "已毕业"
			},
			"select_2_3": 
			{
				"T": "肄業",
				"S": "肄业"
			},
			"select_2_4": 
			{
				"T": "休學",
				"S": "休学"
			},
			"select_2_5": 
			{
				"T": "就學中",
				"S": "就学中"
			}
		};
		$("#employeeManagement_Y02_modifyEdu_Window_Title").html(employeeModifyEdu_Y02_Language['employeeModifyEdu'][status]);
		$("#employeeManagement_Y02_modifyEdu_Window_EmployeeHighEduLevel_Label").html(employeeModifyEdu_Y02_Language['employeeModifyEdu_1'][status]);
		$("#employeeManagement_Y02_modifyEdu_Window_EmployeeHighEduSchool_Label").html(employeeModifyEdu_Y02_Language['employeeModifyEdu_2'][status]);
		$("#employeeManagement_Y02_modifyEdu_Window_EmployeeHighEduDepartment_Label").html(employeeModifyEdu_Y02_Language['employeeModifyEdu_3'][status]);
		$("#employeeManagement_Y02_modifyEdu_Window_EmployeeHighEduStatus_Label").html(employeeModifyEdu_Y02_Language['employeeModifyEdu_4'][status]);
		$("#employeeManagement_Y02_modifyEdu_Window_EmployeeSecondEduLevel_Label").html(employeeModifyEdu_Y02_Language['employeeModifyEdu_5'][status]);
		$("#employeeManagement_Y02_modifyEdu_Window_EmployeeSecondEduSchool_Label").html(employeeModifyEdu_Y02_Language['employeeModifyEdu_6'][status]);
		$("#employeeManagement_Y02_modifyEdu_Window_EmployeeSecondEduDepartment_Label").html(employeeModifyEdu_Y02_Language['employeeModifyEdu_7'][status]);
		$("#employeeManagement_Y02_modifyEdu_Window_No").html(employeeModifyEdu_Y02_Language['No'][status]);
		$("#employeeManagement_Y02_modifyEdu_Window_Yes").html(employeeModifyEdu_Y02_Language['Yes'][status]);
		
		$("#employeeManagement_Y02_modifyEdu_Window_EmployeeHighEduLevel").children().eq(1).html(employeeModifyEdu_Y02_Language['select_1_1'][status]);
		$("#employeeManagement_Y02_modifyEdu_Window_EmployeeHighEduLevel").children().eq(2).html(employeeModifyEdu_Y02_Language['select_1_2'][status]);
		$("#employeeManagement_Y02_modifyEdu_Window_EmployeeHighEduLevel").children().eq(3).html(employeeModifyEdu_Y02_Language['select_1_3'][status]);
		$("#employeeManagement_Y02_modifyEdu_Window_EmployeeHighEduLevel").children().eq(4).html(employeeModifyEdu_Y02_Language['select_1_4'][status]);
		$("#employeeManagement_Y02_modifyEdu_Window_EmployeeHighEduLevel").children().eq(5).html(employeeModifyEdu_Y02_Language['select_1_5'][status]);
		$("#employeeManagement_Y02_modifyEdu_Window_EmployeeHighEduLevel").children().eq(6).html(employeeModifyEdu_Y02_Language['select_1_6'][status]);
		$("#employeeManagement_Y02_modifyEdu_Window_EmployeeHighEduLevel").children().eq(7).html(employeeModifyEdu_Y02_Language['select_1_7'][status]);

		$("#employeeManagement_Y02_modifyEdu_Window_EmployeeHighEduStatus").children().eq(1).html(employeeModifyEdu_Y02_Language['select_2_1'][status]);
		$("#employeeManagement_Y02_modifyEdu_Window_EmployeeHighEduStatus").children().eq(2).html(employeeModifyEdu_Y02_Language['select_2_2'][status]);
		$("#employeeManagement_Y02_modifyEdu_Window_EmployeeHighEduStatus").children().eq(3).html(employeeModifyEdu_Y02_Language['select_2_3'][status]);
		$("#employeeManagement_Y02_modifyEdu_Window_EmployeeHighEduStatus").children().eq(4).html(employeeModifyEdu_Y02_Language['select_2_4'][status]);
		$("#employeeManagement_Y02_modifyEdu_Window_EmployeeHighEduStatus").children().eq(5).html(employeeModifyEdu_Y02_Language['select_2_5'][status]);

		$("#employeeManagement_Y02_modifyEdu_Window_EmployeeSecondEduLevel").children().eq(1).html(employeeModifyEdu_Y02_Language['select_1_1'][status]);
		$("#employeeManagement_Y02_modifyEdu_Window_EmployeeSecondEduLevel").children().eq(2).html(employeeModifyEdu_Y02_Language['select_1_2'][status]);
		$("#employeeManagement_Y02_modifyEdu_Window_EmployeeSecondEduLevel").children().eq(3).html(employeeModifyEdu_Y02_Language['select_1_3'][status]);
		$("#employeeManagement_Y02_modifyEdu_Window_EmployeeSecondEduLevel").children().eq(4).html(employeeModifyEdu_Y02_Language['select_1_4'][status]);
		$("#employeeManagement_Y02_modifyEdu_Window_EmployeeSecondEduLevel").children().eq(5).html(employeeModifyEdu_Y02_Language['select_1_5'][status]);
		$("#employeeManagement_Y02_modifyEdu_Window_EmployeeSecondEduLevel").children().eq(6).html(employeeModifyEdu_Y02_Language['select_1_6'][status]);
		$("#employeeManagement_Y02_modifyEdu_Window_EmployeeSecondEduLevel").children().eq(7).html(employeeModifyEdu_Y02_Language['select_1_7'][status]);
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}