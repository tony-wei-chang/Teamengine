//Jquery 準備好
$(document).ready(function()
{
	try
	{
		//工單清單
		var ListView = {};
		ListView.Title = "工單總表";
		ListView.Content = "工單清單";
		ListView.Content_Func = function()
		{
			//工單清單頁面
			$("#HomeTab").children().eq(0).click();
		};
		createMainpage_Menu(ListView);
		//新增工單
		var ListView = {};
		ListView.Title = "工單總表";
		ListView.Content = "新增工單";
		ListView.Content_Func = function()
		{
			//新增工單
			addTaskFunction();
		};
		createMainpage_Menu(ListView);
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
});