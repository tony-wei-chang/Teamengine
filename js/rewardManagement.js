/*積分管理 Y02*/
//Jquery 準備好
$('#Mainpage_Menu').ready(function()
{
	try
	{
		//有找到 查看開單積分權限
		if(jQuery.inArray("查看開單積分",Y02_System_Authorization) != -1 && false)
		{
			//積分清單
			var view = {};
			view.Title = "積分管理";
			view.Content = "積分清單";
			view.Content_Func = function()
			{
				//新增一個 tab
				addTab('rewardManagement_Y02','積分清單');
				//部門清單畫面
				rewardManagement_Y02_rewardlist();
			}
			createMainpage_Menu(view);
		}
		//有找到 新增開單積分權限
		if(jQuery.inArray("新增開單積分",Y02_System_Authorization) != -1 && false)
		{		
			//新增員工積分
			var view = {};
			view.Title = "積分管理";
			view.Content = "新增員工積分";
			view.Content_Func = function()
			{
				//新增員工每月可開單積分畫面
				rewardManagement_Y02_addEmployee_Window_View();
			}
			createMainpage_Menu(view);
			$("div[myId='新增員工積分']").css('margin-left','-23px');
		}

		//部門積分歷程
		var view = {};
		view.Title = "積分管理";
		view.Content = "部門積分歷程";
		view.Content_Func = function()
		{
			//部門積分歷程
			DepartmentSearch_rewardManagement_Y02_Window();
		}
		createMainpage_Menu(view);
		$("div[myId='部門積分歷程']").css('margin-left','-23px');

		//員工積分歷程
		var view = {};
		view.Title = "積分管理";
		view.Content = "員工積分歷程";
		view.Content_Func = function()
		{
			//員工積分歷程
			EmployeeSearch_rewardManagement_Y02_Window();
		}
		createMainpage_Menu(view);
		$("div[myId='員工積分歷程']").css('margin-left','-23px');

		//積分管理語言包
		rewardManagement_Y02_changeLanguage(languageStatus);
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
});
//積分清單畫面
function rewardManagement_Y02_rewardlist()
{
	try
	{
		//建立積分清單
		rewardManagement_Y02 = Grid_Panel_Define.Initialize();
		rewardManagement_Y02.setId('rewardManagement_Y02');
		rewardManagement_Y02.setResizer_ID('rewardManagement_Y02_Resizer');
		rewardManagement_Y02.setHeader_Title(['No.','圖片','所屬部門','員工姓名','每月可配發積分','員工編號','員工系統編號']);
		rewardManagement_Y02.setModel(['Number','RewardPayEmployeeId','DepartmentName','EmployeeName','RewardPayPoint','EmployeeNumber',"RewardPayEmployeeId"]);
		rewardManagement_Y02.setPagesize(10);
		rewardManagement_Y02.setfieldShow([true,true,true,true,true,true,false]);
		rewardManagement_Y02.setHeader_Width(['4.5%','18.9%','19%','19%','19%','19%','0%']); // 99.5%
		rewardManagement_Y02.createHeader();
		rewardManagement_Y02.createTable();
		//改寫欄位
		rewardManagement_Y02.setLoad_Callback(function()
		{
			for(var i = 0; i < $('#rewardManagement_Y02_Table').children().length; i++)
			{
				//編號
				$('#rewardManagement_Y02_Table_Inner_' + i).children().eq(0).html(i + 1 + parseInt(rewardManagement_Y02.getStart()));
				//圖片
				var EmployeeID = $('#rewardManagement_Y02_Table_Inner_' + i).children().eq(1).html();
				$('#rewardManagement_Y02_Table_Inner_' + i).children().eq(1).css("position","relative");
				$('#rewardManagement_Y02_Table_Inner_' + i).children().eq(1).html("<img src='" + localStorage.getItem('human') + "/employee/" + EmployeeID + "/showImages' style='height: 50px;width: 40px;position: absolute;top: 0px;bottom: 0px;right: 0px;left: 0px;margin: auto;'></img>");
				//取得原工資料
				getEmployee_Basic(i,EmployeeID);
			};
		});
		//取得原工資料
		function getEmployee_Basic(i,EmployeeID)
		{
			jqueryAjax_Get(localStorage.getItem('human') + "/Employee/" + EmployeeID,function(result)
			{
				//設定值
				$('#rewardManagement_Y02_Table_Inner_' + i).children().eq(5).html(result.data.EmployeeNumber);
				$('#rewardManagement_Y02_Table_Inner_' + i).children().eq(3).html(result.data.EmployeeName);
				$('#rewardManagement_Y02_Table_Inner_' + i).children().eq(2).html(result.data.DepartmentName);
				
			},function(content)
			{
				loadingMask.close();
				normalError_Msg_Withmask(content.message);
			},null);
		}
		rewardManagement_Y02.createPagging();
		//設定網址取用方法
		rewardManagement_Y02.getUrl = function getUrl()
		{
			try
			{
				//組合參數
				var Start = rewardManagement_Y02.getStart();
				var Limit = rewardManagement_Y02.getPagesize();
				return localStorage.human + "/Reward/list/?_Y02=" + new Date().getTime() + "&start=" + Start + "&limit=" + Limit + "&desc=false";
			}
			catch(err)
			{
				if(App_Debug)
				{
					console.log(err);
				}
			}
		};
		//載入資料
		rewardManagement_Y02.load();
		//設定右鍵產生選項
		rewardManagement_Y02.setContextmenu(true);
		rewardManagement_Y02.setContextmenu_Func(function(ID)
		{
			var rewardManagement_Contextmenu = Contextmenu_Define.Initialize();
			rewardManagement_Contextmenu.setId(ID);
			rewardManagement_Contextmenu.setWidth(150);
			rewardManagement_Contextmenu.show();
			rewardManagement_Contextmenu.setMenu('新增員工每月可開單積分','rewardManagement_Y02_addEmployee_Menu',function()
			{
				//新增員工畫面
				rewardManagement_Y02_addEmployee_Window_View();
				//關閉
				rewardManagement_Contextmenu.close();
			});
			rewardManagement_Contextmenu.setMenu('修改員工每月可開單積分','rewardManagement_Y02_modifyEmployee_Menu',function()
			{
				//關閉
				rewardManagement_Contextmenu.close();
				//選擇資料
				var ClickedID = rewardManagement_Contextmenu.getClickedID();
				var EmployeeID = $("#" + ClickedID).children().eq(6).html();
				var RewardPayPoint = $("#" + ClickedID).children().eq(4).html();
				//新增員工畫面
				rewardManagement_Y02_addEmployee_Window_View('modify',EmployeeID,RewardPayPoint);
			});
		});
		//積分管理語言包
		rewardManagement_Y02_changeLanguage(languageStatus);
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}
//新增員工每月可開單積分畫面
function rewardManagement_Y02_addEmployee_Window_View(func,EmployeeID,RewardPayPoint)
{
	try
	{
		//新增畫面
		rewardManagement_Y02_addEmployee_Window = Window_Define.Initialize();
		rewardManagement_Y02_addEmployee_Window.setMask(true);
		rewardManagement_Y02_addEmployee_Window.setSmartdetect(false);
		rewardManagement_Y02_addEmployee_Window.setWidth(480);
		rewardManagement_Y02_addEmployee_Window.setHeight(208);
		rewardManagement_Y02_addEmployee_Window.setId('rewardManagement_Y02_addEmployee_Window');
		rewardManagement_Y02_addEmployee_Window.setTitle('新增員工每月可開單積分');
		rewardManagement_Y02_addEmployee_Window.show();
		//員工姓名
		rewardManagement_Y02_addEmployee_Window_EmployeeName_Object = 
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
		rewardManagement_Y02_addEmployee_Window.addComboboxPagging('rewardManagement_Y02_addEmployee_Window_EmployeeName','　員工姓名 :',rewardManagement_Y02_addEmployee_Window_EmployeeName_Object);
		$("#rewardManagement_Y02_addEmployee_Window_EmployeeName_Label").width(115);
		$("#rewardManagement_Y02_addEmployee_Window_EmployeeName").width("calc(100% - 115px)");
		$("#rewardManagement_Y02_addEmployee_Window_EmployeeName_Combobox_Pagging").css("left","130px");
		$("#rewardManagement_Y02_addEmployee_Window_EmployeeName").focus(function()
		{
			//積分管理語言包
			rewardManagement_Y02_changeLanguage(languageStatus);
		});
		//可開單積分
		rewardManagement_Y02_addEmployee_Window.addTextfield('rewardManagement_Y02_addEmployee_Window_RewardPayPoint','可開單積分 :');
		$("#rewardManagement_Y02_addEmployee_Window_RewardPayPoint_Label").width(115);
		$("#rewardManagement_Y02_addEmployee_Window_RewardPayPoint").width("calc(100% - 115px)");
		$("#rewardManagement_Y02_addEmployee_Window_RewardPayPoint").attr('type','number');
		$("#rewardManagement_Y02_addEmployee_Window_RewardPayPoint").attr('onkeypress','return event.charCode >= 48 && event.charCode <= 57');
		$("#rewardManagement_Y02_addEmployee_Window_RewardPayPoint").keyup(function(e)
		{
			if(e.keyCode == 13)
			{
				$("#rewardManagement_Y02_addEmployee_Window_Yes").click();
			}
		});
		//YesNo
		rewardManagement_Y02_addEmployee_Window.addYesNO_Button('取消','確認',
		//No
		function()
		{
			//關閉 Window
			rewardManagement_Y02_addEmployee_Window.close();
			//關閉霧化效果
			removeBlur_Css('Mainpage');
		},
		//Yes
		function()
		{
			//必填偵測
			if(rewardManagement_Y02_addEmployee_Window.rewardManagement_Y02_addEmployee_Window_EmployeeName.getComboboxPagging_Value().length == 0)
			{
				$("#rewardManagement_Y02_addEmployee_Window_EmployeeName").focus();
				return;
			}
			if(!$("#rewardManagement_Y02_addEmployee_Window_RewardPayPoint").val())
			{
				$("#rewardManagement_Y02_addEmployee_Window_RewardPayPoint").focus();
				return;
			}
			//新增員工每月可開單積分
			rewardManagement_Y02_addEmployee_Reward();
		});
		//YesNo Css
		$("#rewardManagement_Y02_addEmployee_Window_Yes").css('margin-left',"65px");
		//modify
		if(func == 'modify')
		{
			//Loading Mask
			var loadingMask = Loading_Mask.Initialize();
			loadingMask.setTarget('rewardManagement_Y02_addEmployee_Window');
			loadingMask.show();
			$("#rewardManagement_Y02_addEmployee_Window_EmployeeName_valueField").bind("DOMSubtreeModified", function()
			{
				loadingMask.close();
			});
			setTimeout(function()
			{
				//設定員工姓名
				rewardManagement_Y02_addEmployee_Window.rewardManagement_Y02_addEmployee_Window_EmployeeName.setComboboxPagging_Value(EmployeeID);
			},500);
			//設定
			$("#rewardManagement_Y02_addEmployee_Window_EmployeeName").attr('disabled',true);
			$("#rewardManagement_Y02_addEmployee_Window_EmployeeName").css('background','white');
			$("#rewardManagement_Y02_addEmployee_Window_RewardPayPoint").val(RewardPayPoint);
			$("#rewardManagement_Y02_addEmployee_Window_RewardPayPoint").focus();
			$("#rewardManagement_Y02_addEmployee_Window_RewardPayPoint").select();
			var rewardInsert_Y02_Language = 
			{
				"rewardInsert_1": 
				{
					"T": "修改員工每月可開單積分",
					"S": "修改员工每月可开单积分"
				}
			};
			$("#rewardManagement_Y02_addEmployee_Window_Title").html(rewardInsert_Y02_Language['rewardInsert_1'][languageStatus]);
		}
		else
		{
			var rewardInsert_Y02_Language = 
			{
				"rewardInsert_1": 
				{
					"T": "新增員工每月可開單積分",
					"S": "新增员工每月可开单积分"
				}
			};
			$("#rewardManagement_Y02_addEmployee_Window_Title").html(rewardInsert_Y02_Language['rewardInsert_1'][languageStatus]);
		}
		//積分管理語言包
		rewardManagement_Y02_changeLanguage(languageStatus);
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
function rewardManagement_Y02_addEmployee_Reward()
{
	try
	{
		//Loading Mask
		var loadingMask = Loading_Mask.Initialize();
		loadingMask.setTarget('rewardManagement_Y02_addEmployee_Window');
		loadingMask.show();
		//參數
		var data = {};
		data.RewardPoint = $("#rewardManagement_Y02_addEmployee_Window_RewardPayPoint").val();
		EmployeeID = rewardManagement_Y02_addEmployee_Window.rewardManagement_Y02_addEmployee_Window_EmployeeName.getComboboxPagging_Value();
		if(typeof(rewardManagement_Y02_addEmployee_EmployeeID) != "undefined")
		{
			rewardManagement_Y02_addEmployee_Info();
		}
		else
		{
			//Ajax Post
			jqueryAjax_Put(localStorage.getItem('human') + '/Reward/list/' + EmployeeID,JSON.stringify(data),function(result)
			{
				loadingMask.close();
				//關閉 Window
				rewardManagement_Y02_addEmployee_Window.close();
				//顯示成功訊息
				normalSucceed_Msg(result.message);
				//如果員工頁已開啟則需要重整
				if(typeof(rewardManagement_Y02) != "undefined")
				{
					rewardManagement_Y02.load();
				}
			},function(content)
			{
				loadingMask.close();
				normalError_Msg_Withmask(content.message);
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
//積分管理語言包
function rewardManagement_Y02_changeLanguage(status)
{
	try
	{
		var rewardManagement_Y02_Language = 
		{
			"rewardManagement": 
			{
				"T": "積分管理",
				"S": "积分管理"
			},
			"rewardList": 
			{
				"T": "積分清單",
				"S": "积分清单"
			},
			"rewardManagement_1": 
			{
				"T": "新增員工積分",
				"S": "新增员工积分"
			},
			"rewardManagement_2": 
			{
				"T": "圖片",
				"S": "图片"
			},
			"rewardManagement_3": 
			{
				"T": "所屬部門",
				"S": "所属部门"
			},
			"rewardManagement_4": 
			{
				"T": "員工姓名",
				"S": "员工姓名"
			},
			"rewardManagement_5": 
			{
				"T": "員工編號",
				"S": "员工编号"
			},
			"rewardManagement_6": 
			{
				"T": "每月可配發積分",
				"S": "每月可配发积分"
			}
		};
		$("div[myId='積分管理']").html(rewardManagement_Y02_Language['rewardManagement'][status]);
		$("div[myId='積分清單']").html(rewardManagement_Y02_Language['rewardList'][status]);
		$("div[myId='新增員工積分']").html(rewardManagement_Y02_Language['rewardManagement_1'][status]);
		$("div[myId='圖片']").html(rewardManagement_Y02_Language['rewardManagement_2'][status]);
		$("div[myId='所屬部門']").html(rewardManagement_Y02_Language['rewardManagement_3'][status]);
		$("div[myId='員工姓名']").html(rewardManagement_Y02_Language['rewardManagement_4'][status]);
		$("div[myId='員工編號']").html(rewardManagement_Y02_Language['rewardManagement_5'][status]);
		$("div[myId='每月可配發積分']").html(rewardManagement_Y02_Language['rewardManagement_6'][status]);

		$("#rewardManagement_Y02_a").html(rewardManagement_Y02_Language['rewardManagement'][status]);

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
		$("#rewardManagement_Y02_Pagging").children().eq(3).html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_1'][status]);
		$("#rewardManagement_Y02_Pagging").children().eq(5).html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_2'][status]);
		$("#rewardManagement_Y02_Pagging").children().eq(7).html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_3'][status]);
		$("#rewardManagement_Y02_Pagging").children().eq(13).html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_4'][status]);
		$("#rewardManagement_Y02_Pagging").children().eq(17).html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_5'][status]);
		$("#rewardManagement_Y02_Pagging").children().eq(19).html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_6'][status]);

		$("#rewardManagement_Y02_addEmployee_Window_EmployeeName_Combobox_Pagging_Top_Input").attr('placeholder',gridPanel_Pagging_Language['gridPanel_Pagging_Language_7'][status]);
		$("#rewardManagement_Y02_addEmployee_Window_EmployeeName_Combobox_Pagging_Bottom_Record_0").html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_4'][status]);
		$("#rewardManagement_Y02_addEmployee_Window_EmployeeName_Combobox_Pagging_Bottom_Record_4").html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_5'][status]);
		$("#rewardManagement_Y02_addEmployee_Window_EmployeeName_Combobox_Pagging_Bottom_Record_6").html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_6'][status]);

		var rewardInsert_Y02_Language = 
		{
			"rewardInsert_2": 
			{
				"T": "　員工姓名 :",
				"S": "　员工姓名 :"
			},
			"rewardInsert_3": 
			{
				"T": "可開單積分 :",
				"S": "可开单积分 :"
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
		$("#rewardManagement_Y02_addEmployee_Window_EmployeeName_Label").html(rewardInsert_Y02_Language['rewardInsert_2'][status]);
		$("#rewardManagement_Y02_addEmployee_Window_RewardPayPoint_Label").html(rewardInsert_Y02_Language['rewardInsert_3'][status]);
		$("#rewardManagement_Y02_addEmployee_Window_No").html(rewardInsert_Y02_Language['No'][status]);
		$("#rewardManagement_Y02_addEmployee_Window_Yes").html(rewardInsert_Y02_Language['Yes'][status]);
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}
//部門歷程積分搜尋
function DepartmentSearch_rewardManagement_Y02_Window()
{
	try
	{
		//定義介面
		var DepartmentSearch_rewardManagement_Y02 = Window_Define.Initialize();
		DepartmentSearch_rewardManagement_Y02.setMask(true);
		DepartmentSearch_rewardManagement_Y02.setWidth(480);
		DepartmentSearch_rewardManagement_Y02.setHeight(165);
		DepartmentSearch_rewardManagement_Y02.setId('DepartmentSearch_rewardManagement_Y02');
		DepartmentSearch_rewardManagement_Y02.setTitle('部門積分歷程');
		DepartmentSearch_rewardManagement_Y02.show();
		DepartmentSearch_rewardManagement_Y02.addComboboxPagging('selectedDepartment','選擇部門 :',
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
		DepartmentSearch_rewardManagement_Y02.addYesNO_Button('取消','確認',function()
		{
			DepartmentSearch_rewardManagement_Y02.close();
		},
		function()
		{
			//確認有選擇部門
			if(DepartmentSearch_rewardManagement_Y02.selectedDepartment.getComboboxPagging_Value())
			{
				var DepartmentID = DepartmentSearch_rewardManagement_Y02.selectedDepartment.getComboboxPagging_Value();
				var DepartmentName = DepartmentSearch_rewardManagement_Y02.selectedDepartment.getComboboxPagging_Value('displayfield');

				//開啟部門歷程績分頁面
				DepartmentSearch_rewardManagement_Y02.close();
				Department_rewardManagement_Y02_rewardlist(DepartmentName,DepartmentID,localStorage.human+'/Reward/Department/' + DepartmentID);
			}
			else
			{
				$("#selectedDepartment").focus();
			}		
		});
		//Yes 按鈕
		$("#DepartmentSearch_rewardManagement_Y02_Yes").css('margin-left','70px');
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
function Department_rewardManagement_Y02_rewardlist(DepartmentName,DepartmentID,Url)
{
	try
	{
		//新增一個 tab
		addTab("Department_rewardManagement_Y02_rewardlist_" + DepartmentID,'部門積分歷程 - ' + DepartmentName);
		//建立積分清單
		var Department_rewardManagement_Y02_rewardlist = Grid_Panel_Define.Initialize();
		Department_rewardManagement_Y02_rewardlist.setId("Department_rewardManagement_Y02_rewardlist_" + DepartmentID);
		Department_rewardManagement_Y02_rewardlist.setResizer_ID('Department_rewardManagement_Y02_rewardlist_Resizer');
		Department_rewardManagement_Y02_rewardlist.setHeader_Title(['No.','所屬月份','實得積分']);
		Department_rewardManagement_Y02_rewardlist.setModel(['Number','EndTime','RewardPoint']);
		Department_rewardManagement_Y02_rewardlist.setPagesize(10);
		Department_rewardManagement_Y02_rewardlist.setfieldShow([true,true,true]);
		Department_rewardManagement_Y02_rewardlist.setHeader_Width(['4.5%','47.75%','47.75%']);
		Department_rewardManagement_Y02_rewardlist.createHeader();
		Department_rewardManagement_Y02_rewardlist.createTable();
		//改寫欄位
		Department_rewardManagement_Y02_rewardlist.setLoad_Callback(function()
		{
			for(var i = 0; i < $('#' + Department_rewardManagement_Y02_rewardlist.getId() + '_Table').children().length; i++)
			{
				//編號
				$('#' + Department_rewardManagement_Y02_rewardlist.getId() + '_Table_Inner_' + i).children().eq(0).html(i + 1 + parseInt(Department_rewardManagement_Y02_rewardlist.getStart()));
				//時間格式
				$('#' + Department_rewardManagement_Y02_rewardlist.getId() + '_Table_Inner_' + i).children().eq(1).html($('#' + Department_rewardManagement_Y02_rewardlist.getId() + '_Table_Inner_' + i).children().eq(1).html().replace('-','/'));
				//沒有預設為零
				$('#' + Department_rewardManagement_Y02_rewardlist.getId() + '_Table_Inner_' + i).children().eq(2).html(($('#' + Department_rewardManagement_Y02_rewardlist.getId() + '_Table_Inner_' + i).children().eq(2).html() == "")?0:$('#' + Department_rewardManagement_Y02_rewardlist.getId() + '_Table_Inner_' + i).children().eq(2).html());
				//新增雙擊監聽
				$('#' + Department_rewardManagement_Y02_rewardlist.getId() + '_Table_Inner_' + i).dblclick(function()
				{
					var year = $(this).children().eq(1).html().split('/')[0];
					var month = $(this).children().eq(1).html().split('/')[1];
					//開啟明細
					Department_rewardManagement_Y02_Detail_rewardlist(year,month,Url + "/Detail/" + year + "/" + month,DepartmentID);
				});
			};
		});
		Department_rewardManagement_Y02_rewardlist.createPagging();
		Department_rewardManagement_Y02_rewardlist.getUrl = function getUrl()
		{
			try
			{
				//組合參數
				var Start = Department_rewardManagement_Y02_rewardlist.getStart();
				var Limit = Department_rewardManagement_Y02_rewardlist.getPagesize();
				return Url + "?_Y02=" + new Date().getTime() + "&start=" + Start + "&limit=" + Limit + "&desc=false";
			}
			catch(err)
			{
				if(App_Debug)
				{
					console.log(err);
				}
			}
		};
		Department_rewardManagement_Y02_rewardlist.load();
		//積分管理語言包
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
//部門積分歷程 積分清單詳細資料畫面
function Department_rewardManagement_Y02_Detail_rewardlist(Year,Month,Url,DepartmentID)
{
	try
	{
		//新增一個 tab
		addTab("Department_rewardManagement_Y02_Detail_rewardlist_" + DepartmentID + "_" + Year + "_" + Month,'部門積分歷程明細 - ' + Year + "/" + Month);
		//建立積分清單
		var Department_rewardManagement_Y02_Detail_rewardlist = Grid_Panel_Define.Initialize();
		Department_rewardManagement_Y02_Detail_rewardlist.setId("Department_rewardManagement_Y02_Detail_rewardlist_" + DepartmentID + "_" + Year + "_" + Month);
		Department_rewardManagement_Y02_Detail_rewardlist.setResizer_ID('Department_rewardManagement_Y02_Detail_rewardlist_Resizer');
		Department_rewardManagement_Y02_Detail_rewardlist.setHeader_Title(['No.','所屬日期','員工姓名','實得積分','工單編號']);
		Department_rewardManagement_Y02_Detail_rewardlist.setModel(['Number','EndTime','EmployeeName','RewardPoint','TaskAssignedMainResponsible']);
		Department_rewardManagement_Y02_Detail_rewardlist.setPagesize(10);
		Department_rewardManagement_Y02_Detail_rewardlist.setfieldShow([true,true,true,true,false]);
		Department_rewardManagement_Y02_Detail_rewardlist.setHeader_Width(['4.5%','31.8%','31.8%','31.8%','0%']);
		Department_rewardManagement_Y02_Detail_rewardlist.createHeader();
		Department_rewardManagement_Y02_Detail_rewardlist.createTable();
		//改寫欄位
		Department_rewardManagement_Y02_Detail_rewardlist.setLoad_Callback(function()
		{
			for(var i = 0; i < $('#' + Department_rewardManagement_Y02_Detail_rewardlist.getId() + '_Table').children().length; i++)
			{
				//編號
				$('#' + Department_rewardManagement_Y02_Detail_rewardlist.getId() + '_Table_Inner_' + i).children().eq(0).html(i + 1 + parseInt(Department_rewardManagement_Y02_Detail_rewardlist.getStart()));
				//時間格式
				$('#' + Department_rewardManagement_Y02_Detail_rewardlist.getId() + '_Table_Inner_' + i).children().eq(1).html(getDate($('#' + Department_rewardManagement_Y02_Detail_rewardlist.getId() + '_Table_Inner_' + i).children().eq(1).html().replace('-','/')));
				//新增雙擊監聽
				$('#' + Department_rewardManagement_Y02_Detail_rewardlist.getId() + '_Table_Inner_' + i).dblclick(function()
				{
					var EmployeeID = $(this).children().eq(4).html();
					var EmployeeName = $(this).children().eq(2).html();
					//開啟員工積分歷程
					Employee_rewardManagement_Y02_rewardlist(EmployeeName,EmployeeID,localStorage.human+'/Reward/' + EmployeeID);
				});
			};
		});
		Department_rewardManagement_Y02_Detail_rewardlist.createPagging();
		Department_rewardManagement_Y02_Detail_rewardlist.getUrl = function getUrl()
		{
			try
			{
				//組合參數
				var Start = Department_rewardManagement_Y02_Detail_rewardlist.getStart();
				var Limit = Department_rewardManagement_Y02_Detail_rewardlist.getPagesize();
				return Url + "?_Y02=" + new Date().getTime() + "&start=" + Start + "&limit=" + Limit + "&desc=false";
			}
			catch(err)
			{
				if(App_Debug)
				{
					console.log(err);
				}
			}
		};
		Department_rewardManagement_Y02_Detail_rewardlist.load();
		//積分管理語言包
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
//部門歷程積分搜尋
function EmployeeSearch_rewardManagement_Y02_Window()
{
	try
	{
		//定義介面
		var EmployeeSearch_rewardManagement_Y02 = Window_Define.Initialize();
		EmployeeSearch_rewardManagement_Y02.setMask(true);
		EmployeeSearch_rewardManagement_Y02.setWidth(480);
		EmployeeSearch_rewardManagement_Y02.setHeight(165);
		EmployeeSearch_rewardManagement_Y02.setId('EmployeeSearch_rewardManagement_Y02');
		EmployeeSearch_rewardManagement_Y02.setTitle('員工積分歷程');
		EmployeeSearch_rewardManagement_Y02.show();
		EmployeeSearch_rewardManagement_Y02.addComboboxPagging('selectedEmployee','選擇員工 :',
		{
			//分頁設定
			'Url':localStorage.human+'/Employee' + '?_Y02=' + new Date().getTime(),
		    'rootProperty':'data',
		    'displayField':'EmployeeName',
		    'valueField':'EmployeeID',
		    'pageSize':'5',
		    'searchUrl':localStorage.human+'/Employee' + '?_dc=' + new Date().getTime(),
		    'searchPlaceholder':'搜尋員工',
		    'searchKey':'searchKey'
		});
		EmployeeSearch_rewardManagement_Y02.addYesNO_Button('取消','確認',function()
		{
			EmployeeSearch_rewardManagement_Y02.close();
		},
		function()
		{
			//確認有選擇部門
			if(EmployeeSearch_rewardManagement_Y02.selectedEmployee.getComboboxPagging_Value())
			{
				var EmployeeID = EmployeeSearch_rewardManagement_Y02.selectedEmployee.getComboboxPagging_Value();
				var EmployeeName = EmployeeSearch_rewardManagement_Y02.selectedEmployee.getComboboxPagging_Value('displayfield');

				//開啟部門歷程績分頁面
				EmployeeSearch_rewardManagement_Y02.close();
				Employee_rewardManagement_Y02_rewardlist(EmployeeName,EmployeeID,localStorage.human+'/Reward/' + EmployeeID);
			}
			else
			{
				$("#selectedEmployee").focus();
			}		
		});
		//Yes 按鈕
		$("#EmployeeSearch_rewardManagement_Y02_Yes").css('margin-left','70px');
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
function Employee_rewardManagement_Y02_rewardlist(EmployeeName,EmployeeID,Url)
{
	try
	{
		//新增一個 tab
		addTab("Employee_rewardManagement_Y02_rewardlist_" + EmployeeID,'員工積分歷程 - ' + EmployeeName);
		//建立積分清單
		var Employee_rewardManagement_Y02_rewardlist = Grid_Panel_Define.Initialize();
		Employee_rewardManagement_Y02_rewardlist.setId("Employee_rewardManagement_Y02_rewardlist_" + EmployeeID);
		Employee_rewardManagement_Y02_rewardlist.setResizer_ID('Employee_rewardManagement_Y02_rewardlist_Resizer');
		Employee_rewardManagement_Y02_rewardlist.setHeader_Title(['No.','所屬月份','實得積分']);
		Employee_rewardManagement_Y02_rewardlist.setModel(['Number','EndTime','RewardPoint']);
		Employee_rewardManagement_Y02_rewardlist.setPagesize(10);
		Employee_rewardManagement_Y02_rewardlist.setfieldShow([true,true,true]);
		Employee_rewardManagement_Y02_rewardlist.setHeader_Width(['4.5%','47.75%','47.75%']);
		Employee_rewardManagement_Y02_rewardlist.createHeader();
		Employee_rewardManagement_Y02_rewardlist.createTable();
		//改寫欄位
		Employee_rewardManagement_Y02_rewardlist.setLoad_Callback(function()
		{
			for(var i = 0; i < $('#' + Employee_rewardManagement_Y02_rewardlist.getId() + '_Table').children().length; i++)
			{
				//編號
				$('#' + Employee_rewardManagement_Y02_rewardlist.getId() + '_Table_Inner_' + i).children().eq(0).html(i + 1 + parseInt(Employee_rewardManagement_Y02_rewardlist.getStart()));
				//時間格式
				$('#' + Employee_rewardManagement_Y02_rewardlist.getId() + '_Table_Inner_' + i).children().eq(1).html($('#' + Employee_rewardManagement_Y02_rewardlist.getId() + '_Table_Inner_' + i).children().eq(1).html().replace('-','/'));
				//新增雙擊監聽
				$('#' + Employee_rewardManagement_Y02_rewardlist.getId() + '_Table_Inner_' + i).dblclick(function()
				{
					var year = $(this).children().eq(1).html().split('/')[0];
					var month = $(this).children().eq(1).html().split('/')[1];
					//開啟明細
					Employee_rewardManagement_Y02_Detail_rewardlist(year,month,Url + "/Detail/" + year + "/" + month,EmployeeID,EmployeeName);
				});
			};
		});
		Employee_rewardManagement_Y02_rewardlist.createPagging();
		Employee_rewardManagement_Y02_rewardlist.getUrl = function getUrl()
		{
			try
			{
				//組合參數
				var Start = Employee_rewardManagement_Y02_rewardlist.getStart();
				var Limit = Employee_rewardManagement_Y02_rewardlist.getPagesize();
				return Url + "?_Y02=" + new Date().getTime() + "&start=" + Start + "&limit=" + Limit + "&desc=false";
			}
			catch(err)
			{
				if(App_Debug)
				{
					console.log(err);
				}
			}
		};
		Employee_rewardManagement_Y02_rewardlist.load();
		//積分管理語言包
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
//部門積分歷程 積分清單詳細資料畫面
function Employee_rewardManagement_Y02_Detail_rewardlist(Year,Month,Url,EmployeeID,EmployeeName)
{
	try
	{
		//新增一個 tab
		addTab("Employee_rewardManagement_Y02_Detail_rewardlist_" + EmployeeID + "_" + Year + "_" + Month,'員工積分歷程明細 - ' + Year + "/" + Month);
		//建立積分清單
		var Employee_rewardManagement_Y02_Detail_rewardlist = Grid_Panel_Define.Initialize();
		Employee_rewardManagement_Y02_Detail_rewardlist.setId("Employee_rewardManagement_Y02_Detail_rewardlist_" + EmployeeID + "_" + Year + "_" + Month);
		Employee_rewardManagement_Y02_Detail_rewardlist.setResizer_ID('Employee_rewardManagement_Y02_Detail_rewardlist_Resizer');
		Employee_rewardManagement_Y02_Detail_rewardlist.setHeader_Title(['No.','所屬日期','員工姓名','工單名稱','實得積分','工單編號']);
		Employee_rewardManagement_Y02_Detail_rewardlist.setModel(['Number','EndTime','EmployeeName','TaskAssignedTitle','RewardPoint','TaskAssignedID']);
		Employee_rewardManagement_Y02_Detail_rewardlist.setPagesize(10);
		Employee_rewardManagement_Y02_Detail_rewardlist.setfieldShow([true,true,false,true,true,false]);
		Employee_rewardManagement_Y02_Detail_rewardlist.setHeader_Width(['4.5%','31.83%','0%','31.83%','31.83%','0%']);
		Employee_rewardManagement_Y02_Detail_rewardlist.createHeader();
		Employee_rewardManagement_Y02_Detail_rewardlist.createTable();
		//改寫欄位
		Employee_rewardManagement_Y02_Detail_rewardlist.setLoad_Callback(function()
		{
			for(var i = 0; i < $('#' + Employee_rewardManagement_Y02_Detail_rewardlist.getId() + '_Table').children().length; i++)
			{
				//編號
				$('#' + Employee_rewardManagement_Y02_Detail_rewardlist.getId() + '_Table_Inner_' + i).children().eq(0).html(i + 1 + parseInt(Employee_rewardManagement_Y02_Detail_rewardlist.getStart()));
				//員工姓名
				$('#' + Employee_rewardManagement_Y02_Detail_rewardlist.getId() + '_Table_Inner_' + i).children().eq(2).html(EmployeeName);
				//工單時間
				var taskTime = $('#' + Employee_rewardManagement_Y02_Detail_rewardlist.getId() + '_Table_Inner_' + i).children().eq(1).html();
				$('#' + Employee_rewardManagement_Y02_Detail_rewardlist.getId() + '_Table_Inner_' + i).children().eq(1).html(getDate(taskTime));
				//新增雙擊監聽
				$('#' + Employee_rewardManagement_Y02_Detail_rewardlist.getId() + '_Table_Inner_' + i).dblclick(function()
				{
					var TaskID = $(this).children().eq(5).html();
					var EmployeeName = $(this).children().eq(2).html();
					var TaskName = '員工積分歷程明細 - ' + $(this).children().eq(1).html() + " - " + EmployeeName;
					//開啟內容頁
					createNewTaskContentPage(null,null,Employee_rewardManagement_Y02_Detail_rewardlist.getId() + "_" + TaskID,{MyTaskID: TaskID, MyTaskName: TaskName, TaskAssignedListID: ""},false)
				});
			};
			//積分管理語言包
			Y02_changeLanguage_HTML(languageStatus);
		});
		Employee_rewardManagement_Y02_Detail_rewardlist.createPagging();
		Employee_rewardManagement_Y02_Detail_rewardlist.getUrl = function getUrl()
		{
			try
			{
				//組合參數
				var Start = Employee_rewardManagement_Y02_Detail_rewardlist.getStart();
				var Limit = Employee_rewardManagement_Y02_Detail_rewardlist.getPagesize();
				return Url + "?_Y02=" + new Date().getTime() + "&start=" + Start + "&limit=" + Limit + "&desc=false";
			}
			catch(err)
			{
				if(App_Debug)
				{
					console.log(err);
				}
			}
		};
		Employee_rewardManagement_Y02_Detail_rewardlist.load();
		//積分管理語言包
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