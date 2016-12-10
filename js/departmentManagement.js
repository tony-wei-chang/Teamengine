/*部門管理 Y02*/
//Jquery 準備好
$('#Mainpage_Menu').ready(function()
{
	try
	{
		//有找到 新增部門權限 與 維護部門權限
		if(jQuery.inArray("新增部門",Y02_System_Authorization) != -1 && jQuery.inArray("維護部門",Y02_System_Authorization) != -1)
		{
			//部門清單
			var view = {};
			view.Title = "部門管理";
			view.Content = "部門清單";
			view.Content_Func = function()
			{
				//新增一個 tab
				addTab('deparmentManagement_Y02','部門清單');
				//部門清單畫面
				deparmentManagement_Y02_addDepartment_Window_Func();
			}
			createMainpage_Menu(view);
		}
		//有找到 新增部門權限
		if(jQuery.inArray("新增部門",Y02_System_Authorization) != -1)
		{
			//新增部門
			var view = {};
			view.Title = "部門管理";
			view.Content = "新增部門";
			view.Content_Func = function()
			{
				//新增畫面
				deparmentManagement_Y02_addDepartment_Window = Window_Define.Initialize();
				deparmentManagement_Y02_addDepartment_Window.setMask(true);
				deparmentManagement_Y02_addDepartment_Window.setSmartdetect(false);
				deparmentManagement_Y02_addDepartment_Window.setWidth(480);
				deparmentManagement_Y02_addDepartment_Window.setHeight(367);
				deparmentManagement_Y02_addDepartment_Window.setId('deparmentManagement_Y02_addDepartment_Window');
				deparmentManagement_Y02_addDepartment_Window.setTitle('新增部門');
				deparmentManagement_Y02_addDepartment_Window.show();
				deparmentManagement_Y02_addDepartment_Window.addTextfield('deparmentManagement_Y02_addDepartment_Window_DepartmentNumber','部門編號 :');
				deparmentManagement_Y02_addDepartment_Window.addTextfield('deparmentManagement_Y02_addDepartment_Window_DepartmentName','部門名稱 :');
				deparmentManagement_Y02_addDepartment_Window.addTextfield('deparmentManagement_Y02_addDepartment_Window_DepartmentInfo','部門資訊 :');
				deparmentManagement_Y02_addDepartment_Window.addComboboxPagging('deparmentManagement_Y02_addDepartment_Window_DirectDepartment','所屬部門 :',
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
				$("#deparmentManagement_Y02_addDepartment_Window_DirectDepartment").attr('placeholder','留白即為最高部門');
				$("#deparmentManagement_Y02_addDepartment_Window_DirectDepartment").addClass('translatePlaceholder');
				Y02_changeLanguage_Placeholder(languageStatus);
				deparmentManagement_Y02_addDepartment_Window.addComboboxPagging('deparmentManagement_Y02_addDepartment_Window_DirectManager','直屬主管 :',
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
				deparmentManagement_Y02_addDepartment_Window.addRadio('deparmentManagement_Y02_addDepartment_Window_DepartmentDefault','預設部門 :','departmentDefaut','是','否',true,false);
				document.getElementById("deparmentManagement_Y02_addDepartment_Window_DepartmentDefault_2").checked = true;
				//Radio Debug
				var Radio_Debug_Func = function()
				{
					$("#deparmentManagement_Y02_addDepartment_Window_DepartmentDefault_Label").css("color","rgb(69,60,60)");
					$("#deparmentManagement_Y02_addDepartment_Window_DepartmentDefault_1_Div").css("color","rgb(69,60,60)");
					$("#deparmentManagement_Y02_addDepartment_Window_DepartmentDefault_2_Div").css("color","rgb(69,60,60)");
				}
				$("#deparmentManagement_Y02_addDepartment_Window_DepartmentNumber").click(Radio_Debug_Func);
				$("#deparmentManagement_Y02_addDepartment_Window_DepartmentName").click(Radio_Debug_Func);
				$("#deparmentManagement_Y02_addDepartment_Window_DepartmentInfo").click(Radio_Debug_Func);
				$("#deparmentManagement_Y02_addDepartment_Window_DirectDepartment").click(Radio_Debug_Func);
				$("#deparmentManagement_Y02_addDepartment_Window_DirectManager").click(Radio_Debug_Func);
				//YesNo
				deparmentManagement_Y02_addDepartment_Window.addYesNO_Button('取消','確認',
				//No
				function()
				{
					//關閉 Window
					deparmentManagement_Y02_addDepartment_Window.close();
					//關閉霧化效果
					removeBlur_Css('Mainpage');
				},
				//Yes
				function()
				{
					//Radio Debug
					Radio_Debug_Func();
					//參數
					var data = {};
					data.DepartmentNumber = $("#deparmentManagement_Y02_addDepartment_Window_DepartmentNumber").val();
					data.DepartmentName = $("#deparmentManagement_Y02_addDepartment_Window_DepartmentName").val();
					data.DepartmentInfo = $("#deparmentManagement_Y02_addDepartment_Window_DepartmentInfo").val();
					data.DirectDepartment = (deparmentManagement_Y02_addDepartment_Window.deparmentManagement_Y02_addDepartment_Window_DirectDepartment.getComboboxPagging_Value())?deparmentManagement_Y02_addDepartment_Window.deparmentManagement_Y02_addDepartment_Window_DirectDepartment.getComboboxPagging_Value():null;
					data.DefaultDepartment = JSON.parse($('input[type=radio][name=departmentDefaut]:checked').attr('value'));
					data.DepartmentManager = deparmentManagement_Y02_addDepartment_Window.deparmentManagement_Y02_addDepartment_Window_DirectManager.getComboboxPagging_Value();
					data.DirectCompany = null;
					//新增部門
					deparmentManagement_Y02_addDepartment(data);
				});
				//YesNo Css
				$("#deparmentManagement_Y02_addDepartment_Window_Yes").css('margin-left',"65px");
				//開啟霧化效果
				addBlur_Css('Mainpage');
				//部門管理語言包
				departmentManagement_Y02_changeLanguage(languageStatus);
			}
			createMainpage_Menu(view);
		}
		//有找到 維護部門權限
		if(jQuery.inArray("維護部門",Y02_System_Authorization) != -1)
		{
			//修改部門
			var view = {};
			view.Title = "部門管理";
			view.Content = "修改部門";
			view.Content_Func = function()
			{
				//新增畫面
				deparmentManagement_Y02_selectorDepartment_Window = Window_Define.Initialize();
				deparmentManagement_Y02_selectorDepartment_Window.setMask(true);
				deparmentManagement_Y02_selectorDepartment_Window.setSmartdetect(false);
				deparmentManagement_Y02_selectorDepartment_Window.setWidth(480);
				deparmentManagement_Y02_selectorDepartment_Window.setHeight(168);
				deparmentManagement_Y02_selectorDepartment_Window.setId('deparmentManagement_Y02_selectorDepartment_Window');
				deparmentManagement_Y02_selectorDepartment_Window.setTitle('選擇修改部門');
				deparmentManagement_Y02_selectorDepartment_Window.show();
				deparmentManagement_Y02_selectorDepartment_Window.addComboboxPagging('deparmentManagement_Y02_selectorDepartment_Window_DirectDepartment','修改部門 :',
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
				$("#deparmentManagement_Y02_selectorDepartment_Window_DirectDepartment").focus(function()
				{
					//控制語言 - 部門管理
					departmentManagement_Y02_changeLanguage(languageStatus);
				});
				//YesNo
				deparmentManagement_Y02_selectorDepartment_Window.addYesNO_Button('取消','確認',
				//No
				function()
				{
					//關閉 Window
					deparmentManagement_Y02_selectorDepartment_Window.close();
					//關閉霧化效果
					removeBlur_Css('Mainpage');
				},
				//Yes
				function()
				{
					if(deparmentManagement_Y02_selectorDepartment_Window.deparmentManagement_Y02_selectorDepartment_Window_DirectDepartment.getComboboxPagging_Value())
					{
						//取得要修改的部門名稱
						var ClickedDepartmentName = deparmentManagement_Y02_selectorDepartment_Window.deparmentManagement_Y02_selectorDepartment_Window_DirectDepartment.getComboboxPagging_Value('displayField');
						//取得要修改的部門系統編號
						var ClickedDepartmentID = deparmentManagement_Y02_selectorDepartment_Window.deparmentManagement_Y02_selectorDepartment_Window_DirectDepartment.getComboboxPagging_Value();
						//新增畫面
						deparmentManagement_Y02_modifyDepartment_Window = Window_Define.Initialize();
						deparmentManagement_Y02_modifyDepartment_Window.setMask(true);
						deparmentManagement_Y02_modifyDepartment_Window.setSmartdetect(false);
						deparmentManagement_Y02_modifyDepartment_Window.setWidth(480);
						deparmentManagement_Y02_modifyDepartment_Window.setHeight(367);
						deparmentManagement_Y02_modifyDepartment_Window.setId('deparmentManagement_Y02_modifyDepartment_Window');
						deparmentManagement_Y02_modifyDepartment_Window.setTitle('修改' + ClickedDepartmentName);
						deparmentManagement_Y02_modifyDepartment_Window.show();
						deparmentManagement_Y02_modifyDepartment_Window.addTextfield('deparmentManagement_Y02_modifyDepartment_Window_DepartmentNumber','部門編號 :');
						deparmentManagement_Y02_modifyDepartment_Window.addTextfield('deparmentManagement_Y02_modifyDepartment_Window_DepartmentName','部門名稱 :');
						deparmentManagement_Y02_modifyDepartment_Window.addTextfield('deparmentManagement_Y02_modifyDepartment_Window_DepartmentInfo','部門資訊 :');
						deparmentManagement_Y02_modifyDepartment_Window.addComboboxPagging('deparmentManagement_Y02_modifyDepartment_Window_DirectDepartment','所屬部門 :',
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
						deparmentManagement_Y02_modifyDepartment_Window.addComboboxPagging('deparmentManagement_Y02_modifyDepartment_Window_DirectManager','部門主管 :',
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
						deparmentManagement_Y02_modifyDepartment_Window.addRadio('deparmentManagement_Y02_modifyDepartment_Window_DepartmentDefault','預設部門 :','departmentDefaut','是','否',true,false);
						//Radio Debug
						var Radio_Debug_Func = function()
						{
							$("#deparmentManagement_Y02_modifyDepartment_Window_DepartmentDefault_Label").css("color","rgb(69,60,60)");
							$("#deparmentManagement_Y02_modifyDepartment_Window_DepartmentDefault_1_Div").css("color","rgb(69,60,60)");
							$("#deparmentManagement_Y02_modifyDepartment_Window_DepartmentDefault_2_Div").css("color","rgb(69,60,60)");
						}
						$("#deparmentManagement_Y02_modifyDepartment_Window_DepartmentNumber").click(Radio_Debug_Func);
						$("#deparmentManagement_Y02_modifyDepartment_Window_DepartmentName").click(Radio_Debug_Func);
						$("#deparmentManagement_Y02_modifyDepartment_Window_DepartmentInfo").click(Radio_Debug_Func);
						$("#deparmentManagement_Y02_modifyDepartment_Window_DirectDepartment").click(Radio_Debug_Func);
						$("#deparmentManagement_Y02_modifyDepartment_Window_DirectManager").click(Radio_Debug_Func);
						//YesNo
						deparmentManagement_Y02_modifyDepartment_Window.addYesNO_Button('取消','確認',
						//No
						function()
						{
							//關閉 Window
							deparmentManagement_Y02_modifyDepartment_Window.close();
							//關閉霧化效果
							removeBlur_Css('Mainpage');
						},
						//Yes
						function()
						{
							//Radio Debug
							Radio_Debug_Func();
							//參數
							var data = {};
							data.DepartmentNumber = $("#deparmentManagement_Y02_modifyDepartment_Window_DepartmentNumber").val();
							data.DepartmentName = $("#deparmentManagement_Y02_modifyDepartment_Window_DepartmentName").val();
							data.DepartmentInfo = $("#deparmentManagement_Y02_modifyDepartment_Window_DepartmentInfo").val();
							data.DirectDepartment = (deparmentManagement_Y02_modifyDepartment_Window.deparmentManagement_Y02_modifyDepartment_Window_DirectDepartment.getComboboxPagging_Value())?deparmentManagement_Y02_modifyDepartment_Window.deparmentManagement_Y02_modifyDepartment_Window_DirectDepartment.getComboboxPagging_Value():null;
							data.DefaultDepartment = String($('input[type=radio][name=departmentDefaut]:checked').attr('value'));
							data.DepartmentManager = deparmentManagement_Y02_modifyDepartment_Window.deparmentManagement_Y02_modifyDepartment_Window_DirectManager.getComboboxPagging_Value();
							data.DirectCompany = null;
							data.DepartmentID = ClickedDepartmentID;
							//修改部門
							deparmentManagement_Y02_modifyDepartment(data);
						});
						//YesNo Css
						$("#deparmentManagement_Y02_modifyDepartment_Window_Yes").css('margin-left',"65px");
						//Loading Mask
						var loadingMask = Loading_Mask.Initialize();
						loadingMask.setTarget('deparmentManagement_Y02_modifyDepartment_Window');
						loadingMask.show();
						//取得部門資料
						jqueryAjax_Get(localStorage.getItem('human') + "/Department/" + ClickedDepartmentID + "?_Y02=" + new Date().getTime(),function(result)
						{
							//避免物件產生延誤造成錯誤
							setTimeout(function()
							{
								//設定預設值
								$("#deparmentManagement_Y02_modifyDepartment_Window_DepartmentNumber").val(result.data.DepartmentNumber);
								$("#deparmentManagement_Y02_modifyDepartment_Window_DepartmentName").val(result.data.DepartmentName);
								$("#deparmentManagement_Y02_modifyDepartment_Window_DepartmentInfo").val(result.data.DepartmentInfo);
								var setValue_Count = 0;
								$("#deparmentManagement_Y02_modifyDepartment_Window_DirectDepartment_valueField").bind("DOMSubtreeModified", function()
								{
									setValue_Count++;
									if(setValue_Count == 2)
									{
										loadingMask.close();
									}
								});
								$("#deparmentManagement_Y02_modifyDepartment_Window_DirectManager_valueField").bind("DOMSubtreeModified", function()
								{
									setValue_Count++;
									if(setValue_Count == 2)
									{
										loadingMask.close();
									}
								});
								setTimeout(function()
								{
									deparmentManagement_Y02_modifyDepartment_Window.deparmentManagement_Y02_modifyDepartment_Window_DirectDepartment.setComboboxPagging_Value(result.data.DirectDepartment);
									deparmentManagement_Y02_modifyDepartment_Window.deparmentManagement_Y02_modifyDepartment_Window_DirectManager.setComboboxPagging_Value(result.data.EmployeeID);
								},500);
								if(result.data.DefaultDepartment)
								{
									document.getElementById("deparmentManagement_Y02_modifyDepartment_Window_DepartmentDefault_1").checked = true;
								}
								else
								{
									document.getElementById("deparmentManagement_Y02_modifyDepartment_Window_DepartmentDefault_2").checked = true;
								}
							},500);
						},function()
						{
							loadingMask.close();
						},null);
						//關閉 Window
						deparmentManagement_Y02_selectorDepartment_Window.close();
						//控制語言 - 部門管理
						departmentManagement_Y02_changeLanguage(languageStatus);
					}
				});
				//YesNo Button Css
				$("#deparmentManagement_Y02_selectorDepartment_Window_Yes").css('margin-left',"65px");
				//開啟霧化效果
				addBlur_Css('Mainpage');
				//控制語言 - 部門管理
				departmentManagement_Y02_changeLanguage(languageStatus);
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
//部門清單畫面
function deparmentManagement_Y02_addDepartment_Window_Func()
{
	try
	{
		//建立部門清單
		deparmentManagement_Y02 = Grid_Panel_Define.Initialize();
		deparmentManagement_Y02.setId('deparmentManagement_Y02');
		deparmentManagement_Y02.setResizer_ID('deparmentManagement_Y02_Resizer');
		deparmentManagement_Y02.setHeader_Title(['No.','圖片','部門名稱','部門編號','主管姓名','部門系統編號']);
		deparmentManagement_Y02.setModel(['Number','EmployeeID','DepartmentName','DepartmentNumber','EmployeeName',"DepartmentID"]);
		deparmentManagement_Y02.setPagesize(10);
		deparmentManagement_Y02.setfieldShow([true,true,true,true,true,false]);
		deparmentManagement_Y02.setHeader_Width(['4.5%','20%','25%','25%','25%','0%']); // 99.5%
		deparmentManagement_Y02.createHeader();
		deparmentManagement_Y02.createTable();
		//改寫欄位
		deparmentManagement_Y02.setLoad_Callback(function()
		{
			for(var i = 0; i < $('#deparmentManagement_Y02_Table').children().length; i++)
			{
				//編號
				$('#deparmentManagement_Y02_Table_Inner_' + i).children().eq(0).html(i + 1 + parseInt(deparmentManagement_Y02.getStart()));
				//圖片
				var EmployeeID = $('#deparmentManagement_Y02_Table_Inner_' + i).children().eq(1).html();
				$('#deparmentManagement_Y02_Table_Inner_' + i).children().eq(1).css("position","relative");
				$('#deparmentManagement_Y02_Table_Inner_' + i).children().eq(1).html("<img src='" + localStorage.getItem('human') + "/employee/" + EmployeeID + "/showImages' style='height: 50px;width: 40px;position: absolute;top: 0px;bottom: 0px;right: 0px;left: 0px;margin: auto;'></img>");
			};
		});
		deparmentManagement_Y02.createPagging();
		//部門搜尋
		deparmentManagement_Y02.addPagging_Textfield("deparmentManagement_Y02_Searchdepartment","部門搜尋");
		//keyup
		$("#deparmentManagement_Y02_Searchdepartment").keyup(function(e)
		{
			//紀錄原始網址
			$("#" + this.id).attr("oldUrl",deparmentManagement_Y02.getUrl());
			//Enter 且 文字方塊有文字
			if(e.keyCode == 13 && $('#' + this.id).val().length != 0)
			{
				$('#' + this.id).removeAttr('name');
				var searchKey = $('#' + this.id).val();
				//複寫網址取用
				deparmentManagement_Y02.getUrl = function getUrl()
				{
					//組合參數
					var Start = deparmentManagement_Y02.getStart();
					var Limit = deparmentManagement_Y02.getPagesize();
					return localStorage.human + "/Department/all?showDefault=true&_Y02=" + new Date().getTime() + "&searchKey=" + searchKey + "&start=" + Start + "&limit=" + Limit;
				};
				//回復初始值(回到第一頁且從第一筆出發)
				deparmentManagement_Y02.setStart(0);
				deparmentManagement_Y02.setPage(1);
				deparmentManagement_Y02.load();
				$('#' + this.id).blur();
			}
			//Backspace 且內容無文字
			else if((e.keyCode == 8 || e.keyCode == 46) && $('#' + this.id).val().length == 0 && $('#' + this.id).attr('name') != 'reload')
			{
				$('#' + this.id).attr('name','reload');
				//複寫網址取用
				deparmentManagement_Y02.getUrl = function getUrl()
				{
					//組合參數
					var Start = deparmentManagement_Y02.getStart();
					var Limit = deparmentManagement_Y02.getPagesize();
					return localStorage.human + "/Department/all?showDefault=true&_Y02=" + new Date().getTime() + "&start=" + Start + "&limit=" + Limit;
				};
				//回復初始值(回到第一頁且從第一筆出發)
				deparmentManagement_Y02.setStart(0);
				deparmentManagement_Y02.setPage(1);
				deparmentManagement_Y02.load();
				$('#' + this.id).blur();
			}
		});
		//設定網址取用方法
		deparmentManagement_Y02.getUrl = function getUrl()
		{
			try
			{
				//組合參數
				var Start = deparmentManagement_Y02.getStart();
				var Limit = deparmentManagement_Y02.getPagesize();
				return localStorage.human + "/Department/all?showDefault=true&_Y02=" + new Date().getTime() + "&start=" + Start + "&limit=" + Limit;
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
		deparmentManagement_Y02.load();
		//設定右鍵產生選項
		deparmentManagement_Y02.setContextmenu(true);
		deparmentManagement_Y02.setContextmenu_Func(function(ID)
		{
			var deparmentManagement_Contextmenu = Contextmenu_Define.Initialize();
			deparmentManagement_Contextmenu.setId(ID);
			deparmentManagement_Contextmenu.setWidth(100);
			deparmentManagement_Contextmenu.show();
			deparmentManagement_Contextmenu.setMenu('新增部門','deparmentManagement_Y02_addDepartment_Menu',function()
			{
				//取得選取的單行編號
				var ClickedID = deparmentManagement_Contextmenu.getClickedID();
				//新增畫面
				deparmentManagement_Y02_addDepartment_Window = Window_Define.Initialize();
				deparmentManagement_Y02_addDepartment_Window.setMask(true);
				deparmentManagement_Y02_addDepartment_Window.setSmartdetect(false);
				deparmentManagement_Y02_addDepartment_Window.setWidth(480);
				deparmentManagement_Y02_addDepartment_Window.setHeight(367);
				deparmentManagement_Y02_addDepartment_Window.setId('deparmentManagement_Y02_addDepartment_Window');
				deparmentManagement_Y02_addDepartment_Window.setTitle('新增部門');
				deparmentManagement_Y02_addDepartment_Window.show();
				deparmentManagement_Y02_addDepartment_Window.addTextfield('deparmentManagement_Y02_addDepartment_Window_DepartmentNumber','部門編號 :');
				deparmentManagement_Y02_addDepartment_Window.addTextfield('deparmentManagement_Y02_addDepartment_Window_DepartmentName','部門名稱 :');
				deparmentManagement_Y02_addDepartment_Window.addTextfield('deparmentManagement_Y02_addDepartment_Window_DepartmentInfo','部門資訊 :');
				deparmentManagement_Y02_addDepartment_Window.addComboboxPagging('deparmentManagement_Y02_addDepartment_Window_DirectDepartment','所屬部門 :',
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
				$("#deparmentManagement_Y02_addDepartment_Window_DirectDepartment").focus(function()
				{
					//控制語言 - 部門管理
					departmentManagement_Y02_changeLanguage(languageStatus);
				});
				$("#deparmentManagement_Y02_addDepartment_Window_DirectDepartment").attr('placeholder','留白即為最高部門');
				$("#deparmentManagement_Y02_addDepartment_Window_DirectDepartment").addClass('translatePlaceholder');
				Y02_changeLanguage_Placeholder(languageStatus);
				deparmentManagement_Y02_addDepartment_Window.addComboboxPagging('deparmentManagement_Y02_addDepartment_Window_DirectManager','部門主管 :',
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
				$("#deparmentManagement_Y02_addDepartment_Window_DirectManager").focus(function()
				{
					//控制語言 - 部門管理
					departmentManagement_Y02_changeLanguage(languageStatus);
				});
				deparmentManagement_Y02_addDepartment_Window.addRadio('deparmentManagement_Y02_addDepartment_Window_DepartmentDefault','預設部門 :','departmentDefaut','是','否',true,false);
				document.getElementById("deparmentManagement_Y02_addDepartment_Window_DepartmentDefault_2").checked = true;
				//Radio Debug
				var Radio_Debug_Func = function()
				{
					$("#deparmentManagement_Y02_addDepartment_Window_DepartmentDefault_Label").css("color","rgb(69,60,60)");
					$("#deparmentManagement_Y02_addDepartment_Window_DepartmentDefault_1_Div").css("color","rgb(69,60,60)");
					$("#deparmentManagement_Y02_addDepartment_Window_DepartmentDefault_2_Div").css("color","rgb(69,60,60)");
				}
				$("#deparmentManagement_Y02_addDepartment_Window_DepartmentNumber").click(Radio_Debug_Func);
				$("#deparmentManagement_Y02_addDepartment_Window_DepartmentName").click(Radio_Debug_Func);
				$("#deparmentManagement_Y02_addDepartment_Window_DepartmentInfo").click(Radio_Debug_Func);
				$("#deparmentManagement_Y02_addDepartment_Window_DirectDepartment").click(Radio_Debug_Func);
				$("#deparmentManagement_Y02_addDepartment_Window_DirectManager").click(Radio_Debug_Func);
				//YesNo
				deparmentManagement_Y02_addDepartment_Window.addYesNO_Button('取消','確認',
				//No
				function()
				{
					//關閉 Window
					deparmentManagement_Y02_addDepartment_Window.close();
					//關閉霧化效果
					removeBlur_Css('Mainpage');
				},
				//Yes
				function()
				{
					//Radio Debug
					Radio_Debug_Func();
					//參數
					var data = {};
					data.DepartmentNumber = $("#deparmentManagement_Y02_addDepartment_Window_DepartmentNumber").val();
					data.DepartmentName = $("#deparmentManagement_Y02_addDepartment_Window_DepartmentName").val();
					data.DepartmentInfo = $("#deparmentManagement_Y02_addDepartment_Window_DepartmentInfo").val();
					data.DirectDepartment = (deparmentManagement_Y02_addDepartment_Window.deparmentManagement_Y02_addDepartment_Window_DirectDepartment.getComboboxPagging_Value())?deparmentManagement_Y02_addDepartment_Window.deparmentManagement_Y02_addDepartment_Window_DirectDepartment.getComboboxPagging_Value():null;
					data.DefaultDepartment = JSON.parse($('input[type=radio][name=departmentDefaut]:checked').attr('value'));
					data.DepartmentManager = deparmentManagement_Y02_addDepartment_Window.deparmentManagement_Y02_addDepartment_Window_DirectManager.getComboboxPagging_Value();
					data.DirectCompany = null;
					//新增部門
					deparmentManagement_Y02_addDepartment(data);
				});
				//YesNo Css
				$("#deparmentManagement_Y02_addDepartment_Window_Yes").css('margin-left',"65px");
				//關閉
				deparmentManagement_Contextmenu.close();
			});
			deparmentManagement_Contextmenu.setMenu('修改部門','deparmentManagement_Y02_modifyDepartment_Menu',function()
			{
				//取得選取的單行編號
				var ClickedID = deparmentManagement_Contextmenu.getClickedID();
				//取得要修改的部門名稱
				var ClickedDepartmentName = $("#" + ClickedID).children().eq(2).html();
				//取得要修改的部門系統編號
				var ClickedDepartmentID = $("#" + ClickedID).children().eq(5).html();
				//新增畫面
				deparmentManagement_Y02_modifyDepartment_Window = Window_Define.Initialize();
				deparmentManagement_Y02_modifyDepartment_Window.setMask(true);
				deparmentManagement_Y02_modifyDepartment_Window.setSmartdetect(false);
				deparmentManagement_Y02_modifyDepartment_Window.setWidth(480);
				deparmentManagement_Y02_modifyDepartment_Window.setHeight(367);
				deparmentManagement_Y02_modifyDepartment_Window.setId('deparmentManagement_Y02_modifyDepartment_Window');
				deparmentManagement_Y02_modifyDepartment_Window.setTitle('修改' + ClickedDepartmentName);
				deparmentManagement_Y02_modifyDepartment_Window.show();
				deparmentManagement_Y02_modifyDepartment_Window.addTextfield('deparmentManagement_Y02_modifyDepartment_Window_DepartmentNumber','部門編號 :');
				deparmentManagement_Y02_modifyDepartment_Window.addTextfield('deparmentManagement_Y02_modifyDepartment_Window_DepartmentName','部門名稱 :');
				deparmentManagement_Y02_modifyDepartment_Window.addTextfield('deparmentManagement_Y02_modifyDepartment_Window_DepartmentInfo','部門資訊 :');
				deparmentManagement_Y02_modifyDepartment_Window.addComboboxPagging('deparmentManagement_Y02_modifyDepartment_Window_DirectDepartment','所屬部門 :',
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
				$("#deparmentManagement_Y02_modifyDepartment_Window_DirectDepartment").focus(function()
				{
					//控制語言 - 部門管理
					departmentManagement_Y02_changeLanguage(languageStatus);
				});
				deparmentManagement_Y02_modifyDepartment_Window.addComboboxPagging('deparmentManagement_Y02_modifyDepartment_Window_DirectManager','部門主管 :',
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
				$("#deparmentManagement_Y02_modifyDepartment_Window_DirectManager").focus(function()
				{
					//控制語言 - 部門管理
					departmentManagement_Y02_changeLanguage(languageStatus);
				});
				deparmentManagement_Y02_modifyDepartment_Window.addRadio('deparmentManagement_Y02_modifyDepartment_Window_DepartmentDefault','預設部門 :','departmentDefaut','是','否',true,false);
				//Radio Debug
				var Radio_Debug_Func = function()
				{
					$("#deparmentManagement_Y02_modifyDepartment_Window_DepartmentDefault_Label").css("color","rgb(69,60,60)");
					$("#deparmentManagement_Y02_modifyDepartment_Window_DepartmentDefault_1_Div").css("color","rgb(69,60,60)");
					$("#deparmentManagement_Y02_modifyDepartment_Window_DepartmentDefault_2_Div").css("color","rgb(69,60,60)");
				}
				$("#deparmentManagement_Y02_modifyDepartment_Window_DepartmentNumber").click(Radio_Debug_Func);
				$("#deparmentManagement_Y02_modifyDepartment_Window_DepartmentName").click(Radio_Debug_Func);
				$("#deparmentManagement_Y02_modifyDepartment_Window_DepartmentInfo").click(Radio_Debug_Func);
				$("#deparmentManagement_Y02_modifyDepartment_Window_DirectDepartment").click(Radio_Debug_Func);
				$("#deparmentManagement_Y02_modifyDepartment_Window_DirectManager").click(Radio_Debug_Func);
				//YesNo
				deparmentManagement_Y02_modifyDepartment_Window.addYesNO_Button('取消','確認',
				//No
				function()
				{
					//關閉 Window
					deparmentManagement_Y02_modifyDepartment_Window.close();
					//關閉霧化效果
					removeBlur_Css('Mainpage');
				},
				//Yes
				function()
				{
					//Radio Debug
					Radio_Debug_Func();
					//參數
					var data = {};
					data.DepartmentNumber = $("#deparmentManagement_Y02_modifyDepartment_Window_DepartmentNumber").val();
					data.DepartmentName = $("#deparmentManagement_Y02_modifyDepartment_Window_DepartmentName").val();
					data.DepartmentInfo = $("#deparmentManagement_Y02_modifyDepartment_Window_DepartmentInfo").val();
					data.DirectDepartment = (deparmentManagement_Y02_modifyDepartment_Window.deparmentManagement_Y02_modifyDepartment_Window_DirectDepartment.getComboboxPagging_Value())?deparmentManagement_Y02_modifyDepartment_Window.deparmentManagement_Y02_modifyDepartment_Window_DirectDepartment.getComboboxPagging_Value():null;
					data.DefaultDepartment = String($('input[type=radio][name=departmentDefaut]:checked').attr('value'));
					data.DepartmentManager = deparmentManagement_Y02_modifyDepartment_Window.deparmentManagement_Y02_modifyDepartment_Window_DirectManager.getComboboxPagging_Value();
					data.DirectCompany = null;
					data.DepartmentID = ClickedDepartmentID;
					//修改部門
					deparmentManagement_Y02_modifyDepartment(data);
				});
				//YesNo Css
				$("#deparmentManagement_Y02_modifyDepartment_Window_Yes").css('margin-left',"65px");
				//Loading Mask
				var loadingMask = Loading_Mask.Initialize();
				loadingMask.setTarget('deparmentManagement_Y02_modifyDepartment_Window');
				loadingMask.show();
				//取得部門資料
				jqueryAjax_Get(localStorage.getItem('human') + "/Department/" + ClickedDepartmentID + "?_Y02=" + new Date().getTime(),function(result)
				{
					//避免物件產生延誤造成錯誤
					setTimeout(function()
					{
						loadingMask.close();
						//設定預設值
						$("#deparmentManagement_Y02_modifyDepartment_Window_DepartmentNumber").val(result.data.DepartmentNumber);
						$("#deparmentManagement_Y02_modifyDepartment_Window_DepartmentName").val(result.data.DepartmentName);
						$("#deparmentManagement_Y02_modifyDepartment_Window_DepartmentInfo").val(result.data.DepartmentInfo);
						deparmentManagement_Y02_modifyDepartment_Window.deparmentManagement_Y02_modifyDepartment_Window_DirectDepartment.setComboboxPagging_Value(result.data.DirectDepartment);
						deparmentManagement_Y02_modifyDepartment_Window.deparmentManagement_Y02_modifyDepartment_Window_DirectManager.setComboboxPagging_Value(result.data.EmployeeID);
						if(result.data.DefaultDepartment)
						{
							document.getElementById("deparmentManagement_Y02_modifyDepartment_Window_DepartmentDefault_1").checked = true;
						}
						else
						{
							document.getElementById("deparmentManagement_Y02_modifyDepartment_Window_DepartmentDefault_2").checked = true;
						}
					},500);
				},function()
				{
					loadingMask.close();
				},null);
				//關閉
				deparmentManagement_Contextmenu.close();
				//控制語言 - 部門管理
				departmentManagement_Y02_changeLanguage(languageStatus);
			});
		});
		//控制語言 - 部門管理
		departmentManagement_Y02_changeLanguage(languageStatus);
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}
//新增部門
function deparmentManagement_Y02_addDepartment(values)
{
	try
	{
		//必填判斷
		if($("#deparmentManagement_Y02_addDepartment_Window_DepartmentNumber").val() == "")
		{
			$("#deparmentManagement_Y02_addDepartment_Window_DepartmentNumber").focus();
			return;
		}
		else if($("#deparmentManagement_Y02_addDepartment_Window_DepartmentName").val() == "")
		{
			$("#deparmentManagement_Y02_addDepartment_Window_DepartmentName").focus();
			return;
		}
		else if($("#deparmentManagement_Y02_addDepartment_Window_DepartmentInfo").val() == "")
		{
			$("#deparmentManagement_Y02_addDepartment_Window_DepartmentInfo").focus();
			return;
		}
		else if(deparmentManagement_Y02_addDepartment_Window.deparmentManagement_Y02_addDepartment_Window_DirectManager.getComboboxPagging_Value() == "")
		{
			$("#deparmentManagement_Y02_addDepartment_Window_DirectManager").focus();
			return;
		}
		//Loading Mask
		loadingMask = Loading_Mask.Initialize();
		loadingMask.setTarget('deparmentManagement_Y02_addDepartment_Window');
		loadingMask.show();
		//Ajax Post
		jqueryAjax_Post(localStorage.getItem('human') + '/Department',JSON.stringify(values),function(result)
		{
			loadingMask.close();
			//關閉 Window
			deparmentManagement_Y02_addDepartment_Window.close();
			//顯示成功訊息
			normalSucceed_Msg(result.message);
			//如果部門頁已開啟則需要重整
			if(typeof(deparmentManagement_Y02) != "undefined")
			{
				deparmentManagement_Y02.load();
			}
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
//修改部門資料
function deparmentManagement_Y02_modifyDepartment(values)
{
	try
	{
		//Loading Mask
		loadingMask = Loading_Mask.Initialize();
		loadingMask.setTarget('deparmentManagement_Y02_modifyDepartment_Window');
		loadingMask.show();
		//ajax
		jqueryAjax_Put(localStorage.getItem('human') + '/Department/' + values.DepartmentID,JSON.stringify(values),function(result)
		{
			loadingMask.close();
			//關閉 Window
			deparmentManagement_Y02_modifyDepartment_Window.close();
			//顯示成功訊息
			normalSucceed_Msg(result.message);
			//如果部門頁已開啟則需要重整
			if(typeof(deparmentManagement_Y02) != "undefined")
			{
				deparmentManagement_Y02.load();
			}
		},function(content)
		{
			loadingMask.close();
			normalError_Msg_Withmask(content.message);
		},null);
	}
	catch(err)
	{
		if(Management_App_Debug)
		{
			console.log(err);
		}		
	}
}
//部門管理語言包
function departmentManagement_Y02_changeLanguage(status)
{
	try
	{
		var departmentManagement_Y02_Language = 
		{
			"departmentManagement": 
			{
				"T": "部門管理",
				"S": "部门管理"
			},
			"departmentList": 
			{
				"T": "部門清單",
				"S": "部门清单"
			},
			"departmentInsert": 
			{
				"T": "新增部門",
				"S": "新增部门"
			},
			"departmentModify": 
			{
				"T": "修改部門",
				"S": "修改部门"
			},
			"departmentModify_1": 
			{
				"T": "修改部門 :",
				"S": "修改部门 :"
			},
			"departmentImg": 
			{
				"T": "圖片",
				"S": "图片"
			},
			"departmentName": 
			{
				"T": "部門名稱",
				"S": "部门名称"
			},
			"departmentNumber": 
			{
				"T": "部門編號",
				"S": "部门编号"
			},
			"departmentManagerName": 
			{
				"T": "主管姓名",
				"S": "主管姓名"
			},
			"modifyDepartment_Selector": 
			{
				"T": "選擇修改部門",
				"S": "选择修改部门"
			}
		};
		$("div[myId='部門管理']").html(departmentManagement_Y02_Language['departmentManagement'][status]);
		$("div[myId='部門清單']").html(departmentManagement_Y02_Language['departmentList'][status]);
		$("#deparmentManagement_Y02_a").html(departmentManagement_Y02_Language['departmentList'][status]);
		$("div[myId='新增部門']").html(departmentManagement_Y02_Language['departmentInsert'][status]);
		$("div[myId='修改部門']").html(departmentManagement_Y02_Language['departmentModify'][status]);
		$("div[myId='圖片']").html(departmentManagement_Y02_Language['departmentImg'][status]);
		$("div[myId='部門名稱']").html(departmentManagement_Y02_Language['departmentName'][status]);
		$("div[myId='部門編號']").html(departmentManagement_Y02_Language['departmentNumber'][status]);
		$("div[myId='主管姓名']").html(departmentManagement_Y02_Language['departmentManagerName'][status]);
		$("#deparmentManagement_Y02_selectorDepartment_Window_Title").html(departmentManagement_Y02_Language['modifyDepartment_Selector'][status]);
		$("#deparmentManagement_Y02_selectorDepartment_Window_DirectDepartment_Label").html(departmentManagement_Y02_Language['departmentModify_1'][status]);

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
		$("#deparmentManagement_Y02_Pagging").children().eq(3).html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_1'][status]);
		$("#deparmentManagement_Y02_Pagging").children().eq(5).html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_2'][status]);
		$("#deparmentManagement_Y02_Pagging").children().eq(7).html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_3'][status]);
		$("#deparmentManagement_Y02_Pagging").children().eq(13).html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_4'][status]);
		$("#deparmentManagement_Y02_Pagging").children().eq(17).html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_5'][status]);
		$("#deparmentManagement_Y02_Pagging").children().eq(19).html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_6'][status]);

		$("#deparmentManagement_Y02_addDepartment_Window_DirectDepartment_Combobox_Pagging_Top_Input").attr('placeholder',gridPanel_Pagging_Language['gridPanel_Pagging_Language_7'][status]);
		$("#deparmentManagement_Y02_addDepartment_Window_DirectDepartment_Combobox_Pagging_Bottom_Record_0").html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_4'][status]);
		$("#deparmentManagement_Y02_addDepartment_Window_DirectDepartment_Combobox_Pagging_Bottom_Record_4").html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_5'][status]);
		$("#deparmentManagement_Y02_addDepartment_Window_DirectDepartment_Combobox_Pagging_Bottom_Record_6").html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_6'][status]);

		$("#deparmentManagement_Y02_addDepartment_Window_DirectManager_Combobox_Pagging_Top_Input").attr('placeholder',gridPanel_Pagging_Language['gridPanel_Pagging_Language_8'][status]);
		$("#deparmentManagement_Y02_addDepartment_Window_DirectManager_Combobox_Pagging_Bottom_Record_0").html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_4'][status]);
		$("#deparmentManagement_Y02_addDepartment_Window_DirectManager_Combobox_Pagging_Bottom_Record_4").html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_5'][status]);
		$("#deparmentManagement_Y02_addDepartment_Window_DirectManager_Combobox_Pagging_Bottom_Record_6").html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_6'][status]);

		$("#deparmentManagement_Y02_modifyDepartment_Window_DirectDepartment_Combobox_Pagging_Top_Input").attr('placeholder',gridPanel_Pagging_Language['gridPanel_Pagging_Language_7'][status]);
		$("#deparmentManagement_Y02_modifyDepartment_Window_DirectDepartment_Combobox_Pagging_Bottom_Record_0").html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_4'][status]);
		$("#deparmentManagement_Y02_modifyDepartment_Window_DirectDepartment_Combobox_Pagging_Bottom_Record_4").html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_5'][status]);
		$("#deparmentManagement_Y02_modifyDepartment_Window_DirectDepartment_Combobox_Pagging_Bottom_Record_6").html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_6'][status]);

		$("#deparmentManagement_Y02_modifyDepartment_Window_DirectManager_Combobox_Pagging_Top_Input").attr('placeholder',gridPanel_Pagging_Language['gridPanel_Pagging_Language_8'][status]);
		$("#deparmentManagement_Y02_modifyDepartment_Window_DirectManager_Combobox_Pagging_Bottom_Record_0").html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_4'][status]);
		$("#deparmentManagement_Y02_modifyDepartment_Window_DirectManager_Combobox_Pagging_Bottom_Record_4").html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_5'][status]);
		$("#deparmentManagement_Y02_modifyDepartment_Window_DirectManager_Combobox_Pagging_Bottom_Record_6").html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_6'][status]);

		$("#deparmentManagement_Y02_selectorDepartment_Window_DirectDepartment_Combobox_Pagging_Top_Input").attr('placeholder',gridPanel_Pagging_Language['gridPanel_Pagging_Language_7'][status]);
		$("#deparmentManagement_Y02_selectorDepartment_Window_DirectDepartment_Combobox_Pagging_Bottom_Record_0").html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_4'][status]);
		$("#deparmentManagement_Y02_selectorDepartment_Window_DirectDepartment_Combobox_Pagging_Bottom_Record_4").html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_5'][status]);
		$("#deparmentManagement_Y02_selectorDepartment_Window_DirectDepartment_Combobox_Pagging_Bottom_Record_6").html(gridPanel_Pagging_Language['gridPanel_Pagging_Language_6'][status]);

		var departmentInsert_Y02_Language = 
		{
			"departmentInsert_Y02_Language_1": 
			{
				"T": "新增部門",
				"S": "新增部门"
			},
			"departmentInsert_Y02_Language_2": 
			{
				"T": "部門編號 :",
				"S": "部门编号 :"
			},
			"departmentInsert_Y02_Language_3": 
			{
				"T": "部門名稱 :",
				"S": "部门名称 :"
			},
			"departmentInsert_Y02_Language_4": 
			{
				"T": "部門資訊 :",
				"S": "部门资讯 :"
			},
			"departmentInsert_Y02_Language_5": 
			{
				"T": "所屬部門 :",
				"S": "所属部门 :"
			},
			"departmentInsert_Y02_Language_6": 
			{
				"T": "直屬主管 :",
				"S": "直属主管 :"
			},
			"departmentInsert_Y02_Language_7": 
			{
				"T": "預設部門 :",
				"S": "预设部门 :"
			},
			"departmentInsert_Y02_Language_8": 
			{
				"T": "取消",
				"S": "取消"
			},
			"departmentInsert_Y02_Language_9": 
			{
				"T": "確認",
				"S": "确认"
			}
		};
		$("#deparmentManagement_Y02_addDepartment_Window_Title").html(departmentInsert_Y02_Language['departmentInsert_Y02_Language_1'][status]);
		$("#deparmentManagement_Y02_addDepartment_Window_DepartmentNumber_Label").html(departmentInsert_Y02_Language['departmentInsert_Y02_Language_2'][status]);
		$("#deparmentManagement_Y02_addDepartment_Window_DepartmentName_Label").html(departmentInsert_Y02_Language['departmentInsert_Y02_Language_3'][status]);
		$("#deparmentManagement_Y02_addDepartment_Window_DepartmentInfo_Label").html(departmentInsert_Y02_Language['departmentInsert_Y02_Language_4'][status]);
		$("#deparmentManagement_Y02_addDepartment_Window_DirectDepartment_Label").html(departmentInsert_Y02_Language['departmentInsert_Y02_Language_5'][status]);
		$("#deparmentManagement_Y02_addDepartment_Window_DirectManager_Label").html(departmentInsert_Y02_Language['departmentInsert_Y02_Language_6'][status]);
		$("#deparmentManagement_Y02_addDepartment_Window_DepartmentDefault_Label").html(departmentInsert_Y02_Language['departmentInsert_Y02_Language_7'][status]);
		$("#deparmentManagement_Y02_addDepartment_Window_No").html(departmentInsert_Y02_Language['departmentInsert_Y02_Language_8'][status]);
		$("#deparmentManagement_Y02_addDepartment_Window_Yes").html(departmentInsert_Y02_Language['departmentInsert_Y02_Language_9'][status]);

		$("#deparmentManagement_Y02_modifyDepartment_Window_DepartmentNumber_Label").html(departmentInsert_Y02_Language['departmentInsert_Y02_Language_2'][status]);
		$("#deparmentManagement_Y02_modifyDepartment_Window_DepartmentName_Label").html(departmentInsert_Y02_Language['departmentInsert_Y02_Language_3'][status]);
		$("#deparmentManagement_Y02_modifyDepartment_Window_DepartmentInfo_Label").html(departmentInsert_Y02_Language['departmentInsert_Y02_Language_4'][status]);
		$("#deparmentManagement_Y02_modifyDepartment_Window_DirectDepartment_Label").html(departmentInsert_Y02_Language['departmentInsert_Y02_Language_5'][status]);
		$("#deparmentManagement_Y02_modifyDepartment_Window_DirectManager_Label").html(departmentInsert_Y02_Language['departmentInsert_Y02_Language_6'][status]);
		$("#deparmentManagement_Y02_modifyDepartment_Window_DepartmentDefault_Label").html(departmentInsert_Y02_Language['departmentInsert_Y02_Language_7'][status]);
		$("#deparmentManagement_Y02_modifyDepartment_Window_No").html(departmentInsert_Y02_Language['departmentInsert_Y02_Language_8'][status]);
		$("#deparmentManagement_Y02_modifyDepartment_Window_Yes").html(departmentInsert_Y02_Language['departmentInsert_Y02_Language_9'][status]);

		$("#deparmentManagement_Y02_selectorDepartment_Window_No").html(departmentInsert_Y02_Language['departmentInsert_Y02_Language_8'][status]);
		$("#deparmentManagement_Y02_selectorDepartment_Window_Yes").html(departmentInsert_Y02_Language['departmentInsert_Y02_Language_9'][status]);

		$("#deparmentManagement_Y02_addDepartment_Menu").html(departmentInsert_Y02_Language['departmentInsert_Y02_Language_1'][status]);
		$("#deparmentManagement_Y02_modifyDepartment_Menu").html(departmentManagement_Y02_Language['departmentModify'][status]);
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}