/*公司管理 Y02*/
//Jquery 準備好
$('#Mainpage_Menu').ready(function()
{
	try
	{
		//有找到 新增公司權限 與 維護公司權限
		if(jQuery.inArray("新增公司",Y02_System_Authorization) != -1 && jQuery.inArray("維護公司",Y02_System_Authorization) != -1)
		{
			var view = {};
			view.Title = "公司管理";
			view.Content = "公司清單";
			view.Content_Func = function()
			{
				//新增一個 tab
				addTab('companyManagement_Y02',view.Content);
				//建立公司清單
				companyManagement = Grid_Panel_Define.Initialize();
				companyManagement.setId('companyManagement_Y02');
				companyManagement.setResizer_ID('companyManagement_Y02_Resizer');
				companyManagement.setHeader_Title(['No.','公司號碼','公司名稱','公司簡介','公司網域']);
				companyManagement.setModel(['Number','companyNumber','companyName','companyInfo','companyDomain']);
				companyManagement.setPagesize(10);
				companyManagement.setfieldShow([true,true,true,true,true]);
				companyManagement.setHeader_Width(['4.5%','20%','25%','25%','25%']); // 99.5%
				companyManagement.createHeader();
				companyManagement.createTable();
				//改寫欄位
				companyManagement.setLoad_Callback(function()
				{
					for(var i = 0; i < $('#companyManagement_Y02_Table').children().length; i++)
					{
						//編號
						$('#companyManagement_Y02_Table_Inner_' + i).children().eq(0).html(i + 1);
					};
				});
				companyManagement.createPagging();
				//設定網址取用方法
				companyManagement.getUrl = function getUrl()
				{
					try
					{
						//組合參數
						return localStorage.human + "/Company?_Y02=" + new Date().getTime();
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
				companyManagement.load();
				//控制語言 - 公司管理
				companyManagement_Y02_changeLanguage(languageStatus);
			}
			createMainpage_Menu(view);
			setTimeout(function()
			{
				//控制語言
				changeLanguage(languageStatus);
			},10);
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
function companyManagement_Y02_changeLanguage(status)
{
	try
	{
		var companyManagement_Y02_Language = 
		{
			"companyManagement": 
			{
				"T": "公司管理",
				"S": "公司管理"
			},
			"companyList": 
			{
				"T": "公司清單",
				"S": "公司清单"
			},
			"companyNumber": 
			{
				"T": "公司號碼",
				"S": "公司号码"
			},
			"companyName": 
			{
				"T": "公司名稱",
				"S": "公司名称"
			},
			"companyInfo": 
			{
				"T": "公司簡介",
				"S": "公司简介"
			},
			"companyDomain": 
			{
				"T": "公司網域",
				"S": "公司网域"
			}
		};
		$("div[myId='公司管理']").html(companyManagement_Y02_Language['companyManagement'][status]);
		$("div[myId='公司清單']").html(companyManagement_Y02_Language['companyList'][status]);
		$("#companyManagement_Y02_a").html(companyManagement_Y02_Language['companyList'][status]);
		$("div[myId='公司號碼']").html(companyManagement_Y02_Language['companyNumber'][status]);
		$("div[myId='公司名稱']").html(companyManagement_Y02_Language['companyName'][status]);
		$("div[myId='公司簡介']").html(companyManagement_Y02_Language['companyInfo'][status]);
		$("div[myId='公司網域']").html(companyManagement_Y02_Language['companyDomain'][status]);

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
			}
		};
		$("#companyManagement_Y02_Pagging").children().eq(3).html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_1'][status]);
		$("#companyManagement_Y02_Pagging").children().eq(5).html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_2'][status]);
		$("#companyManagement_Y02_Pagging").children().eq(7).html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_3'][status]);
		$("#companyManagement_Y02_Pagging").children().eq(13).html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_4'][status]);
		$("#companyManagement_Y02_Pagging").children().eq(17).html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_5'][status]);
		$("#companyManagement_Y02_Pagging").children().eq(19).html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_6'][status]);
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}