/*流量總表 Y02*/
//Jquery 準備好
$('#Mainpage_Menu').ready(function()
{
	try
	{
		//有找到 查詢公司流量權限
		if(jQuery.inArray("查詢公司流量",Y02_System_Authorization) != -1)
		{
			//查詢公司流量
			var view = {};
			view.Title = "流量總表";
			view.Content = "查詢公司流量";
			view.Content_Func = function()
			{
				//新增一個 tab
				addTab('flowList_Y02','查詢公司流量');
				//部門清單畫面
				flowList_Y02();
			}
			createMainpage_Menu(view);
			$("div[myId='查詢公司流量']").css('margin-left','-23px');
		}
		//有找到 查詢員工流量權限
		if(jQuery.inArray("查詢員工流量",Y02_System_Authorization) != -1)
		{		
			//查詢員工流量
			var view = {};
			view.Title = "流量總表";
			view.Content = "查詢員工流量";
			view.Content_Func = function()
			{
				//流量總表員工搜尋
				EmployeeSearch_flowList_Y02_Window();
			}
			createMainpage_Menu(view);
			$("div[myId='查詢員工流量']").css('margin-left','-23px');
		}
		//語言包
		changeLanguage(languageStatus);
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
});
//流量總表畫面
function flowList_Y02()
{
	try
	{
		//建立積分清單
		var flowList_Y02 = Grid_Panel_Define.Initialize();
		flowList_Y02.setId('flowList_Y02');
		flowList_Y02.setResizer_ID('flowList_Y02_Resizer');
		flowList_Y02.setHeader_Title(['No.','年份','上傳流量','下載流量','總流量']);
		flowList_Y02.setModel(['Number','logYear','inputSize','outputSize','totalSize']);
		flowList_Y02.setPagesize(10);
		flowList_Y02.setfieldShow([true,true,true,true,true]);
		flowList_Y02.setHeader_Width(['4.5%','23.875%','23.875%','23.875%','23.875%']);
		flowList_Y02.createHeader();
		flowList_Y02.createTable();
		//改寫欄位
		flowList_Y02.setLoad_Callback(function()
		{
			for(var i = 0; i < $('#flowList_Y02_Table').children().length; i++)
			{
				//編號
				$('#flowList_Y02_Table_Inner_' + i).children().eq(0).html(i + 1 + parseInt(flowList_Y02.getStart()));
				//上傳流量換算 四捨五入到小數點第二位 換算成GB 且三位一逗點
				var inputSize = $('#flowList_Y02_Table_Inner_' + i).children().eq(2).html();
				$('#flowList_Y02_Table_Inner_' + i).children().eq(2).html(FormatNumber(roundDecimal(inputSize / 1000 / 1000 / 1000 , 2 )) + " GB");
				//下載流量換算 四捨五入到小數點第二位 換算成GB 且三位一逗點
				var outputSize = $('#flowList_Y02_Table_Inner_' + i).children().eq(3).html();
				$('#flowList_Y02_Table_Inner_' + i).children().eq(3).html(FormatNumber(roundDecimal(outputSize / 1000 / 1000 / 1000 , 2 )) + " GB");
				//總流量換算 四捨五入到小數點第二位 換算成GB 且三位一逗點
				var totalSize = $('#flowList_Y02_Table_Inner_' + i).children().eq(4).html();
				$('#flowList_Y02_Table_Inner_' + i).children().eq(4).html(FormatNumber(roundDecimal(totalSize / 1000 / 1000 / 1000 , 2 )) + " GB");
				//查詢月流量
				$('#flowList_Y02_Table_Inner_' + i).dblclick(function()
				{
					flowList_Y02_Year($(this).children().eq(1).html());
				});
			};
		});
		flowList_Y02.createPagging();
		//設定網址取用方法
		flowList_Y02.getUrl = function getUrl()
		{
			try
			{
				return localStorage.human + "/Logs/?_Y02=" + new Date().getTime();
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
		flowList_Y02.load();
		//積分管理語言包
		changeLanguage(languageStatus);
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}
//流量總表畫面 月流量
function flowList_Y02_Year(Year)
{
	try
	{
		//新增一個 tab
		addTab('flowList_Y02_Year_' + Year,Year + '年流量');
		//建立積分清單
		var flowList_Y02_Year = Grid_Panel_Define.Initialize();
		flowList_Y02_Year.setId('flowList_Y02_Year_' + Year);
		flowList_Y02_Year.setResizer_ID('flowList_Y02_Year_Resizer_' + Year);
		flowList_Y02_Year.setHeader_Title(['No.','月份','上傳流量','下載流量','總流量','年份','月份']);
		flowList_Y02_Year.setModel(['Number','logMonth','inputSize','outputSize','totalSize','logYear','logMonth']);
		flowList_Y02_Year.setPagesize(10);
		flowList_Y02_Year.setfieldShow([true,true,true,true,true,false,false]);
		flowList_Y02_Year.setHeader_Width(['4.5%','23.875%','23.875%','23.875%','23.875%','0%','0%']);
		flowList_Y02_Year.createHeader();
		flowList_Y02_Year.createTable();
		//改寫欄位
		flowList_Y02_Year.setLoad_Callback(function()
		{
			for(var i = 0; i < $('#flowList_Y02_Year_' + Year + '_Table').children().length; i++)
			{
				//編號
				$('#flowList_Y02_Year_' + Year + '_Table_Inner_' + i).children().eq(0).html(i + 1 + parseInt(flowList_Y02_Year.getStart()));
				//年份+月份
				var year = $('#flowList_Y02_Year_' + Year + '_Table_Inner_' + i).children().eq(5).html();
				var month = $('#flowList_Y02_Year_' + Year + '_Table_Inner_' + i).children().eq(1).html();
				$('#flowList_Y02_Year_' + Year + '_Table_Inner_' + i).children().eq(1).html(year + "/" + month);
				//上傳流量換算 四捨五入到小數點第二位 換算成GB 且三位一逗點
				var inputSize = $('#flowList_Y02_Year_' + Year + '_Table_Inner_' + i).children().eq(2).html();
				$('#flowList_Y02_Year_' + Year + '_Table_Inner_' + i).children().eq(2).html(FormatNumber(roundDecimal(inputSize / 1000 / 1000 / 1000 , 2 )) + " GB");
				//下載流量換算 四捨五入到小數點第二位 換算成GB 且三位一逗點
				var outputSize = $('#flowList_Y02_Year_' + Year + '_Table_Inner_' + i).children().eq(3).html();
				$('#flowList_Y02_Year_' + Year + '_Table_Inner_' + i).children().eq(3).html(FormatNumber(roundDecimal(outputSize / 1000 / 1000 / 1000 , 2 )) + " GB");
				//總流量換算 四捨五入到小數點第二位 換算成GB 且三位一逗點
				var totalSize = $('#flowList_Y02_Year_' + Year + '_Table_Inner_' + i).children().eq(4).html();
				$('#flowList_Y02_Year_' + Year + '_Table_Inner_' + i).children().eq(4).html(FormatNumber(roundDecimal(totalSize / 1000 / 1000 / 1000 , 2 )) + " GB");
				//查詢日流量
				$('#flowList_Y02_Year_' + Year + '_Table_Inner_' + i).dblclick(function()
				{
					flowList_Y02_Month(Year,$(this).children().eq(6).html());
				});
			};
		});
		flowList_Y02_Year.createPagging();
		//設定網址取用方法
		flowList_Y02_Year.getUrl = function getUrl()
		{
			try
			{
				return localStorage.human + "/Logs/company/" + Year + "/?_Y02=" + new Date().getTime();
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
		flowList_Y02_Year.load();
		//積分管理語言包
		changeLanguage(languageStatus);
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}
//流量總表畫面 月流量
function flowList_Y02_Month(Year,Month)
{
	try
	{
		//新增一個 tab
		addTab('flowList_Y02_Month_' + Year + "_" + Month,Year + "年" + Month + '月流量');
		//建立積分清單
		var flowList_Y02_Month = Grid_Panel_Define.Initialize();
		flowList_Y02_Month.setId('flowList_Y02_Month_' + Year + "_" + Month);
		flowList_Y02_Month.setResizer_ID('flowList_Y02_Month_Resizer_' + Year + "_" + Month);
		flowList_Y02_Month.setHeader_Title(['No.','日期','上傳流量','下載流量','總流量','月份']);
		flowList_Y02_Month.setModel(['Number','logDay','inputSize','outputSize','totalSize','logMonth']);
		flowList_Y02_Month.setPagesize(10);
		flowList_Y02_Month.setfieldShow([true,true,true,true,true]);
		flowList_Y02_Month.setHeader_Width(['4.5%','23.875%','23.875%','23.875%','23.875%','0%']);
		flowList_Y02_Month.createHeader();
		flowList_Y02_Month.createTable();
		//改寫欄位
		flowList_Y02_Month.setLoad_Callback(function()
		{
			for(var i = 0; i < $('#flowList_Y02_Month_' + Year + "_" + Month + '_Table').children().length; i++)
			{
				//編號
				$('#flowList_Y02_Month_' + Year + "_" + Month + '_Table_Inner_' + i).children().eq(0).html(i + 1 + parseInt(flowList_Y02_Month.getStart()));
				//年份+月份
				var year = $('#flowList_Y02_Month_' + Year + "_" + Month + '_Table_Inner_' + i).children().eq(5).html();
				var month = $('#flowList_Y02_Month_' + Year + "_" + Month + '_Table_Inner_' + i).children().eq(1).html();
				$('#flowList_Y02_Month_' + Year + "_" + Month + '_Table_Inner_' + i).children().eq(1).html(year + "/" + month);
				//上傳流量換算 四捨五入到小數點第二位 換算成GB 且三位一逗點
				var inputSize = $('#flowList_Y02_Month_' + Year + "_" + Month + '_Table_Inner_' + i).children().eq(2).html();
				$('#flowList_Y02_Month_' + Year + "_" + Month + '_Table_Inner_' + i).children().eq(2).html(FormatNumber(roundDecimal(inputSize / 1000 / 1000 / 1000 , 2 )) + " GB");
				//下載流量換算 四捨五入到小數點第二位 換算成GB 且三位一逗點
				var outputSize = $('#flowList_Y02_Month_' + Year + "_" + Month + '_Table_Inner_' + i).children().eq(3).html();
				$('#flowList_Y02_Month_' + Year + "_" + Month + '_Table_Inner_' + i).children().eq(3).html(FormatNumber(roundDecimal(outputSize / 1000 / 1000 / 1000 , 2 )) + " GB");
				//總流量換算 四捨五入到小數點第二位 換算成GB 且三位一逗點
				var totalSize = $('#flowList_Y02_Month_' + Year + "_" + Month + '_Table_Inner_' + i).children().eq(4).html();
				$('#flowList_Y02_Month_' + Year + "_" + Month + '_Table_Inner_' + i).children().eq(4).html(FormatNumber(roundDecimal(totalSize / 1000 / 1000 / 1000 , 2 )) + " GB");
			};			
		});
		flowList_Y02_Month.createPagging();
		//設定網址取用方法
		flowList_Y02_Month.getUrl = function getUrl()
		{
			try
			{
				return localStorage.human + "/Logs/company/" + Year + "/" + Month + "/?_Y02=" + new Date().getTime();
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
		flowList_Y02_Month.load();
		//積分管理語言包
		changeLanguage(languageStatus);
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}
//流量總表員工搜尋
function EmployeeSearch_flowList_Y02_Window()
{
	try
	{
		//定義介面
		var EmployeeSearch_flowList_Y02 = Window_Define.Initialize();
		EmployeeSearch_flowList_Y02.setMask(true);
		EmployeeSearch_flowList_Y02.setWidth(480);
		EmployeeSearch_flowList_Y02.setHeight(165);
		EmployeeSearch_flowList_Y02.setId('EmployeeSearch_flowList_Y02');
		EmployeeSearch_flowList_Y02.setTitle('員工流量總表');
		EmployeeSearch_flowList_Y02.show();
		EmployeeSearch_flowList_Y02.addComboboxPagging('selectedEmployee','選擇員工 :',
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
		EmployeeSearch_flowList_Y02.addYesNO_Button('取消','確認',function()
		{
			EmployeeSearch_flowList_Y02.close();
		},
		function()
		{
			//確認有選擇部門
			if(EmployeeSearch_flowList_Y02.selectedEmployee.getComboboxPagging_Value())
			{
				var EmployeeID = EmployeeSearch_flowList_Y02.selectedEmployee.getComboboxPagging_Value();
				var EmployeeName = EmployeeSearch_flowList_Y02.selectedEmployee.getComboboxPagging_Value('displayfield');

				//開啟部門歷程績分頁面
				EmployeeSearch_flowList_Y02.close();
				EmployeeSearch_flowList_Y02_Func(EmployeeName,EmployeeID,localStorage.human+'/Logs/' + EmployeeID);
			}
			else
			{
				$("#selectedEmployee").focus();
			}		
		});
		//Yes 按鈕
		$("#EmployeeSearch_flowList_Y02_Yes").css('margin-left','70px');
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
//流量總表畫面
function EmployeeSearch_flowList_Y02_Func(EmployeeName,EmployeeID,Url)
{
	try
	{
		//新增一個 tab
		addTab('EmployeeSearch_flowList_Y02_' + EmployeeID,EmployeeName + ' - 流量總表');
		//建立積分清單
		var EmployeeSearch_flowList_Y02 = Grid_Panel_Define.Initialize();
		EmployeeSearch_flowList_Y02.setId('EmployeeSearch_flowList_Y02_' + EmployeeID);
		EmployeeSearch_flowList_Y02.setResizer_ID('EmployeeSearch_flowList_Y02_Resizer');
		EmployeeSearch_flowList_Y02.setHeader_Title(['No.','年份','上傳流量','下載流量','總流量']);
		EmployeeSearch_flowList_Y02.setModel(['Number','logYear','inputSize','outputSize','totalSize']);
		EmployeeSearch_flowList_Y02.setPagesize(10);
		EmployeeSearch_flowList_Y02.setfieldShow([true,true,true,true,true]);
		EmployeeSearch_flowList_Y02.setHeader_Width(['4.5%','23.875%','23.875%','23.875%','23.875%']);
		EmployeeSearch_flowList_Y02.createHeader();
		EmployeeSearch_flowList_Y02.createTable();
		//改寫欄位
		EmployeeSearch_flowList_Y02.setLoad_Callback(function()
		{
			for(var i = 0; i < $('#EmployeeSearch_flowList_Y02_' + EmployeeID + '_Table').children().length; i++)
			{
				//編號
				$('#EmployeeSearch_flowList_Y02_' + EmployeeID + '_Table_Inner_' + i).children().eq(0).html(i + 1 + parseInt(EmployeeSearch_flowList_Y02.getStart()));
				//上傳流量換算 四捨五入到小數點第二位 換算成GB 且三位一逗點
				var inputSize = $('#EmployeeSearch_flowList_Y02_' + EmployeeID + '_Table_Inner_' + i).children().eq(2).html();
				$('#EmployeeSearch_flowList_Y02_' + EmployeeID + '_Table_Inner_' + i).children().eq(2).html(FormatNumber(roundDecimal(inputSize / 1000 / 1000 / 1000 , 2 )) + " GB");
				//下載流量換算 四捨五入到小數點第二位 換算成GB 且三位一逗點
				var outputSize = $('#EmployeeSearch_flowList_Y02_' + EmployeeID + '_Table_Inner_' + i).children().eq(3).html();
				$('#EmployeeSearch_flowList_Y02_' + EmployeeID + '_Table_Inner_' + i).children().eq(3).html(FormatNumber(roundDecimal(outputSize / 1000 / 1000 / 1000 , 2 )) + " GB");
				//總流量換算 四捨五入到小數點第二位 換算成GB 且三位一逗點
				var totalSize = $('#EmployeeSearch_flowList_Y02_' + EmployeeID + '_Table_Inner_' + i).children().eq(4).html();
				$('#EmployeeSearch_flowList_Y02_' + EmployeeID + '_Table_Inner_' + i).children().eq(4).html(FormatNumber(roundDecimal(totalSize / 1000 / 1000 / 1000 , 2 )) + " GB");
				//查詢月流量
				$('#EmployeeSearch_flowList_Y02_' + EmployeeID + '_Table_Inner_' + i).dblclick(function()
				{
					EmployeeSearch_flowList_Y02_Year_Func(EmployeeName,EmployeeID,Url,$(this).children().eq(1).html());
				});
			};
		});
		EmployeeSearch_flowList_Y02.createPagging();
		//設定網址取用方法
		EmployeeSearch_flowList_Y02.getUrl = function getUrl()
		{
			try
			{
				return Url + "/?_Y02=" + new Date().getTime();
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
		EmployeeSearch_flowList_Y02.load();
		//積分管理語言包
		changeLanguage(languageStatus);
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}
//流量總表畫面 月流量
function EmployeeSearch_flowList_Y02_Year_Func(EmployeeName,EmployeeID,Url,Year)
{
	try
	{
		//新增一個 tab
		addTab('EmployeeSearch_flowList_Y02_Year_' + EmployeeID + "_" + Year,EmployeeName + " - " + Year + '年流量');
		//建立積分清單
		var EmployeeSearch_flowList_Y02_Year = Grid_Panel_Define.Initialize();
		EmployeeSearch_flowList_Y02_Year.setId('EmployeeSearch_flowList_Y02_Year_' + EmployeeID + "_" + Year);
		EmployeeSearch_flowList_Y02_Year.setResizer_ID('EmployeeSearch_flowList_Y02_Year_Resizer_' + EmployeeID + "_" + Year);
		EmployeeSearch_flowList_Y02_Year.setHeader_Title(['No.','月份','上傳流量','下載流量','總流量','年份','月份']);
		EmployeeSearch_flowList_Y02_Year.setModel(['Number','logMonth','inputSize','outputSize','totalSize','logYear','logMonth']);
		EmployeeSearch_flowList_Y02_Year.setPagesize(10);
		EmployeeSearch_flowList_Y02_Year.setfieldShow([true,true,true,true,true,false,false]);
		EmployeeSearch_flowList_Y02_Year.setHeader_Width(['4.5%','23.875%','23.875%','23.875%','23.875%','0%','0%']);
		EmployeeSearch_flowList_Y02_Year.createHeader();
		EmployeeSearch_flowList_Y02_Year.createTable();
		//改寫欄位
		EmployeeSearch_flowList_Y02_Year.setLoad_Callback(function()
		{
			for(var i = 0; i < $('#EmployeeSearch_flowList_Y02_Year_' + EmployeeID + "_" + Year + '_Table').children().length; i++)
			{
				//編號
				$('#EmployeeSearch_flowList_Y02_Year_' + EmployeeID + "_" + Year + '_Table_Inner_' + i).children().eq(0).html(i + 1 + parseInt(EmployeeSearch_flowList_Y02_Year.getStart()));
				//年份+月份
				var year = $('#EmployeeSearch_flowList_Y02_Year_' + EmployeeID + "_" + Year + '_Table_Inner_' + i).children().eq(5).html();
				var month = $('#EmployeeSearch_flowList_Y02_Year_' + EmployeeID + "_" + Year + '_Table_Inner_' + i).children().eq(1).html();
				$('#EmployeeSearch_flowList_Y02_Year_' + EmployeeID + "_" + Year + '_Table_Inner_' + i).children().eq(1).html(year + "/" + month);
				//上傳流量換算 四捨五入到小數點第二位 換算成GB 且三位一逗點
				var inputSize = $('#EmployeeSearch_flowList_Y02_Year_' + EmployeeID + "_" + Year + '_Table_Inner_' + i).children().eq(2).html();
				$('#EmployeeSearch_flowList_Y02_Year_' + EmployeeID + "_" + Year + '_Table_Inner_' + i).children().eq(2).html(FormatNumber(roundDecimal(inputSize / 1000 / 1000 / 1000 , 2 )) + " GB");
				//下載流量換算 四捨五入到小數點第二位 換算成GB 且三位一逗點
				var outputSize = $('#EmployeeSearch_flowList_Y02_Year_' + EmployeeID + "_" + Year + '_Table_Inner_' + i).children().eq(3).html();
				$('#EmployeeSearch_flowList_Y02_Year_' + EmployeeID + "_" + Year + '_Table_Inner_' + i).children().eq(3).html(FormatNumber(roundDecimal(outputSize / 1000 / 1000 / 1000 , 2 )) + " GB");
				//總流量換算 四捨五入到小數點第二位 換算成GB 且三位一逗點
				var totalSize = $('#EmployeeSearch_flowList_Y02_Year_' + EmployeeID + "_" + Year + '_Table_Inner_' + i).children().eq(4).html();
				$('#EmployeeSearch_flowList_Y02_Year_' + EmployeeID + "_" + Year + '_Table_Inner_' + i).children().eq(4).html(FormatNumber(roundDecimal(totalSize / 1000 / 1000 / 1000 , 2 )) + " GB");
				//查詢日流量
				$('#EmployeeSearch_flowList_Y02_Year_' + EmployeeID + "_" + Year + '_Table_Inner_' + i).dblclick(function()
				{
					EmployeeSearch_flowList_Y02_Month_Func(EmployeeName,EmployeeID,Url,Year,$(this).children().eq(6).html());
				});
			};
		});
		EmployeeSearch_flowList_Y02_Year.createPagging();
		//設定網址取用方法
		EmployeeSearch_flowList_Y02_Year.getUrl = function getUrl()
		{
			try
			{
				return Url + "/" + Year + "/?_Y02=" + new Date().getTime();
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
		EmployeeSearch_flowList_Y02_Year.load();
		//積分管理語言包
		changeLanguage(languageStatus);
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}
//流量總表畫面 月流量
function EmployeeSearch_flowList_Y02_Month_Func(EmployeeName,EmployeeID,Url,Year,Month)
{
	try
	{
		//新增一個 tab
		addTab('EmployeeSearch_flowList_Y02_Month_' + EmployeeID + "_" + Year + "_" + Month,EmployeeName + " - " + Year + "年" + Month + '月流量');
		//建立積分清單
		var EmployeeSearch_flowList_Y02_Month = Grid_Panel_Define.Initialize();
		EmployeeSearch_flowList_Y02_Month.setId('EmployeeSearch_flowList_Y02_Month_' + EmployeeID + "_" + Year + "_" + Month);
		EmployeeSearch_flowList_Y02_Month.setResizer_ID('EmployeeSearch_flowList_Y02_Month_Resizer_' + EmployeeID + "_" + Year + "_" + Month);
		EmployeeSearch_flowList_Y02_Month.setHeader_Title(['No.','日期','上傳流量','下載流量','總流量','月份']);
		EmployeeSearch_flowList_Y02_Month.setModel(['Number','logDay','inputSize','outputSize','totalSize','logMonth']);
		EmployeeSearch_flowList_Y02_Month.setPagesize(10);
		EmployeeSearch_flowList_Y02_Month.setfieldShow([true,true,true,true,true]);
		EmployeeSearch_flowList_Y02_Month.setHeader_Width(['4.5%','23.875%','23.875%','23.875%','23.875%','0%']);
		EmployeeSearch_flowList_Y02_Month.createHeader();
		EmployeeSearch_flowList_Y02_Month.createTable();
		//改寫欄位
		EmployeeSearch_flowList_Y02_Month.setLoad_Callback(function()
		{
			for(var i = 0; i < $('#EmployeeSearch_flowList_Y02_Month_' + EmployeeID + "_" + Year + "_" + Month + '_Table').children().length; i++)
			{
				//編號
				$('#EmployeeSearch_flowList_Y02_Month_' + EmployeeID + "_" + Year + "_" + Month + '_Table_Inner_' + i).children().eq(0).html(i + 1 + parseInt(EmployeeSearch_flowList_Y02_Month.getStart()));
				//年份+月份
				var year = $('#EmployeeSearch_flowList_Y02_Month_' + EmployeeID + "_" + Year + "_" + Month + '_Table_Inner_' + i).children().eq(5).html();
				var month = $('#EmployeeSearch_flowList_Y02_Month_' + EmployeeID + "_" + Year + "_" + Month + '_Table_Inner_' + i).children().eq(1).html();
				$('#EmployeeSearch_flowList_Y02_Month_' + EmployeeID + "_" + Year + "_" + Month + '_Table_Inner_' + i).children().eq(1).html(year + "/" + month);
				//上傳流量換算 四捨五入到小數點第二位 換算成GB 且三位一逗點
				var inputSize = $('#EmployeeSearch_flowList_Y02_Month_' + EmployeeID + "_" + Year + "_" + Month + '_Table_Inner_' + i).children().eq(2).html();
				$('#EmployeeSearch_flowList_Y02_Month_' + EmployeeID + "_" + Year + "_" + Month + '_Table_Inner_' + i).children().eq(2).html(FormatNumber(roundDecimal(inputSize / 1000 / 1000 / 1000 , 2 )) + " GB");
				//下載流量換算 四捨五入到小數點第二位 換算成GB 且三位一逗點
				var outputSize = $('#EmployeeSearch_flowList_Y02_Month_' + EmployeeID + "_" + Year + "_" + Month + '_Table_Inner_' + i).children().eq(3).html();
				$('#EmployeeSearch_flowList_Y02_Month_' + EmployeeID + "_" + Year + "_" + Month + '_Table_Inner_' + i).children().eq(3).html(FormatNumber(roundDecimal(outputSize / 1000 / 1000 / 1000 , 2 )) + " GB");
				//總流量換算 四捨五入到小數點第二位 換算成GB 且三位一逗點
				var totalSize = $('#EmployeeSearch_flowList_Y02_Month_' + EmployeeID + "_" + Year + "_" + Month + '_Table_Inner_' + i).children().eq(4).html();
				$('#EmployeeSearch_flowList_Y02_Month_' + EmployeeID + "_" + Year + "_" + Month + '_Table_Inner_' + i).children().eq(4).html(FormatNumber(roundDecimal(totalSize / 1000 / 1000 / 1000 , 2 )) + " GB");
			};			
		});
		EmployeeSearch_flowList_Y02_Month.createPagging();
		//設定網址取用方法
		EmployeeSearch_flowList_Y02_Month.getUrl = function getUrl()
		{
			try
			{
				return Url + "/" + Year + "/" + Month + "?_Y02=" + new Date().getTime();
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
		EmployeeSearch_flowList_Y02_Month.load();
		//積分管理語言包
		changeLanguage(languageStatus);
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}