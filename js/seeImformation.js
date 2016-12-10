/*檢視資料 Y02*/
//Jquery 準備好
$('#Mainpage_Menu').ready(function()
{
	try
	{
		var view = {};
		view.Title = "個人資料";
		view.Content = "檢視資料";
		view.Content_Func = function()
		{
		createseeImformationPage();
		}
		var view_edit_pw = {};
		view_edit_pw.Title = "個人資料";
		view_edit_pw.Content = "修改密碼";
		view_edit_pw.Content_Func = function()
		{
		 edit_pw_fn();
		}
		
		createMainpage_Menu(view);
		createMainpage_Menu(view_edit_pw);
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
});

//產生seeImformation View
function createseeImformationPage()
{
	try
	{
		//新增一個 tab
			addTab('seeImformation_Y02',language["ViewProfile"][languageStatus]);
			//刻板
			new function()
			{				
				//第一部份刻板
				new function()
				{
					//檢視資料主頁面
					$('#seeImformation_Y02').empty();
					$('#seeImformation_Y02').append("<div id='seeImformation_Y02_Main'></div>");
					
					//---------------開始刻CSS
					var seeImformation_Y02_css ='';
					
				
					seeImformation_Y02_css+= '.seeImformation_Y02_editable>i{position:absolute; right:0;color:rgb(69, 200, 200);} ';
					seeImformation_Y02_css+= '.seeImformation_Y02_editable{position: relative;top:-40px; opacity:0; height:100%;cursor:pointer;} ';
					seeImformation_Y02_css+= '.seeImformation_Y02_editable:hover { opacity:1;} ';
					seeImformation_Y02_css+= '#seeImformation_Y02_Pic:hover{transition: 0.5s;background-image: url("./image/edit_my_images.png")!important; }';
					
					$('#seeImformation_Y02_Main').append('<style>'+seeImformation_Y02_css+'</style>');
					
					
					
					$('#seeImformation_Y02_Main').append('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');
					
					
					
					$('#seeImformation_Y02_Main').css
					({
						"width":"550px",
						"margin":"auto"
					});
					$('#seeImformation_Y02').css
					({
						"display":"block",
						"height":"calc(100% - 52px)",
						"padding":"0px",
						"margin-left":"-2px",
						"padding-top":"20px",
						"background-color":"rgb(237, 237, 237)",
					    "overflow":"auto"
					});
					//圖片
					$('#seeImformation_Y02_Main').append("<img id='seeImformation_Y02_Pic' onclick='edit_img()'></img>");
					$('#seeImformation_Y02_Pic').css
					({
						"display":"block",
					    "border-radius":"50%",
					    "width":"160px",
					    "height":"160px",
				        "margin-left":"134px",
				        "margin-top":"20px",
				        "background-color":"white",
		    			"border":"rgb(69,200,200) 4px solid",
					    "background-image":"url(http://teamengine.ys3s.com/image/login.jpg)",
					    "background-size":"100% 100%",
					    "box-shadow":"rgb(136, 136, 136) 0px 0px 10px",
						"cursor":"pointer",
						"position": "relative",
						"z-index":"1"
					});
					//圖片左邊方塊
					$('#seeImformation_Y02_Main').append("<div id='seeImformation_Y02_PicLeft'></div>");
					$('#seeImformation_Y02_PicLeft').css
					({
						"border-radius":"14px",
						"width":"220px",
						"height":"70px",
						"background-color":"rgb(69, 200, 200)",
						"margin-top":"-70px",
					    "box-shadow":"rgb(136, 136, 136) 0px 0px 10px"
					});
					//圖片左邊方塊 - 姓名
					$('#seeImformation_Y02_PicLeft').append("<div id='seeImformation_Y02_PicLeft_Username' ></div>");
					$('#seeImformation_Y02_PicLeft_Username').css
					({
						"color":"rgb(255,255,255)",
					    "font-size":"16pt",
					    "display":"inline-block",
					    "text-overflow":"ellipsis",
					    "white-space":"nowrap",
					    "overflow":"hidden",
				        "width":"152px",
				        "padding-top":"8px",
				        "padding-left":"9px"
					});
					//圖片左邊方塊 - 員工編號
					$('#seeImformation_Y02_PicLeft').append("<div id='seeImformation_Y02_PicLeft_Userid'></div>");
					$('#seeImformation_Y02_PicLeft_Userid').css
					({
						"color":"rgb(255,255,255)",
					    "font-size":"12pt",
					    "display":"inline-block",
					    "text-overflow":"ellipsis",
					    "white-space":"nowrap",
					    "overflow":"hidden",
				        "width":"170px",
				        "padding-top":"3px",
				        "padding-left":"9px"
					});
					//圖片右邊方塊
					$('#seeImformation_Y02_Main').append("<div id='seeImformation_Y02_PicRight'></div>");
					$('#seeImformation_Y02_PicRight').css
					({
						"border-radius":"14px",
						"width":"340px",
						"height":"40px",
						"margin-left":"210px",
						"margin-top":"-168px",
						"box-shadow":"rgb(136, 136, 136) 0px 0px 10px",
						"background-color":"rgb(255, 255, 255)",
						"position":"relative",
						"z-index":"0",
						"margin-bottom":"145px"
					});
					//圖片右邊方塊 - 可開積分
					// $('#seeImformation_Y02_PicRight').append("<div id='seeImformation_Y02_PicRight_01'></div>");
					// $('#seeImformation_Y02_PicRight_01').html("可開積分：");
					// $('#seeImformation_Y02_PicRight_01').css
					// ({
					// 	"font-size":"10pt",
					// 	"display":"inline-block",
					// 	"text-overflow":"ellipsis",
					// 	"white-space":"nowrap",
					// 	"overflow":"hidden",
					// 	"width":"152px",
					// 	"padding-top":"6px",
					// 	"padding-left":"105px",
					// 	"display":"inline-block",
					// 	"text-overflow":"ellipsis",
					// 	"white-space":"nowrap",
					// 	"overflow":"hidden"
					// });
					//圖片右邊方塊共用 Class 02~06
					var seeImformation_Y02_PicRight_Class = 
					{
						"font-size":"10pt",
					    "display":"inline-block",
					    "text-overflow":"ellipsis",
					    "white-space":"nowrap",
					    "overflow":"hidden",
				        "width":"152px",
				        "padding-left":"105px",
				        "display":"inline-block",
				        "text-overflow":"ellipsis",
				        "white-space":"nowrap"
					};
					//圖片右邊方塊 - 實得積分
					$('#seeImformation_Y02_PicRight').append("<div id='seeImformation_Y02_PicRight_02'></div>");
					$('#seeImformation_Y02_PicRight_02').html("實得積分：");
					$('#seeImformation_Y02_PicRight_02').css(seeImformation_Y02_PicRight_Class);
					$('#seeImformation_Y02_PicRight_02').css("margin-top","10px");
					//圖片右邊方塊 - 待處理的工單
					$('#seeImformation_Y02_PicRight').append("<div id='seeImformation_Y02_PicRight_03'></div>");
					$('#seeImformation_Y02_PicRight_03').html("待處理的工單：");
					$('#seeImformation_Y02_PicRight_03').css(seeImformation_Y02_PicRight_Class);
					$('#seeImformation_Y02_PicRight_03').hide();
					//圖片右邊方塊 - 待接單的工單
					$('#seeImformation_Y02_PicRight').append("<div id='seeImformation_Y02_PicRight_04'></div>");
					$('#seeImformation_Y02_PicRight_04').html("待接單的工單：");
					$('#seeImformation_Y02_PicRight_04').css(seeImformation_Y02_PicRight_Class);
					$('#seeImformation_Y02_PicRight_04').hide();
					//圖片右邊方塊 - 執行中的工單
					$('#seeImformation_Y02_PicRight').append("<div id='seeImformation_Y02_PicRight_05'></div>");
					$('#seeImformation_Y02_PicRight_05').html("執行中的工單：");
					$('#seeImformation_Y02_PicRight_05').css(seeImformation_Y02_PicRight_Class);
					$('#seeImformation_Y02_PicRight_05').hide();
					//圖片右邊方塊 - 待簽核的工單
					$('#seeImformation_Y02_PicRight').append("<div id='seeImformation_Y02_PicRight_06'></div>");
					$('#seeImformation_Y02_PicRight_06').html("待簽核的工單：");
					$('#seeImformation_Y02_PicRight_06').css(seeImformation_Y02_PicRight_Class);
					$('#seeImformation_Y02_PicRight_06').hide();
				};
				//第二部份刻板
				new function()
				{
					//基本資料主方框 - 外框
					$('#seeImformation_Y02_Main').append("<div id='seeImformation_Y02_Basic'>");
					$('#seeImformation_Y02_Basic').css
					({
						"height":"315px",
						"background-color":"white",
						"margin-top":"160px",
					    "border-radius":"14px",
					    "box-shadow":"rgb(136, 136, 136) 0px 0px 10px"
					});
					//資料標題共用 Class
					var seeImformation_Y02_Title_Class = 
					{
						"background-color":"rgb(69,200,200)",
						"border-top-right-radius":"14px",
						"border-top-left-radius":"14px",
						"width":"550px",
						"height":"50px",
						"margin-bottom":"15px"
					};
					//資料標題文字共用 Class
					var seeImformation_Y02_TitleText_Class = 
					{
						"font-size":"14pt",
					    "color":"white",
					    "line-height":"50px",
					    "margin":"auto",
				        "width":"75px"
					};
					//資料內容共用 Class
					var seeImformation_Y02_Content_Class = 
					{
				        "height": "40px",
				        "width":"510px",
				        "margin":"auto"
					};
					//資料內容奇數列共用 Class 01
					var seeImformation_Y02_Content_Odd_Class_01 = 
					{
						"color":"black",
						"font-size":"13px",
						"font-weight":"300",
						"font-family":"helvetica, arial, verdana, sans-serif",
						"background-color":"rgb(236,236,236)",
				        "height": "40px",
				        "width":"235px",
				        "line-height":"40px",
				        "padding-left":"15px",
				        "float":"left",
				        "display":"inline-block",
				        "text-overflow":"ellipsis",
				        "white-space":"nowrap",
				        "overflow":"hidden"
					};
					//資料內容奇數列共用 Class 02
					var seeImformation_Y02_Content_Odd_Class_02 = 
					{
						"color":"black",
						"font-size":"13px",
						"font-weight":"300",
						"font-family":"helvetica, arial, verdana, sans-serif",
						"background-color":"rgb(236,236,236)",
				        "height": "40px",
				        "width":"235px",
				        "line-height":"40px",
				        "padding-left":"15px",
				        "margin-left":"10px",
				        "float":"left",
				        "display":"inline-block",
				        "text-overflow":"ellipsis",
				        "white-space":"nowrap",
				        "overflow":"hidden"
					};
					//資料內容偶數列共用 Class 01
					var seeImformation_Y02_Content_Even_Class_01 = 
					{
						"color":"black",
						"font-size":"13px",
						"font-weight":"300",
						"font-family":"helvetica, arial, verdana, sans-serif",
						"background-color":"white",
				        "height": "40px",
				        "width":"235px",
				        "line-height":"40px",
				        "padding-left":"15px",
				        "float":"left",
				        "display":"inline-block",
				        "text-overflow":"ellipsis",
				        "white-space":"nowrap",
				        "overflow":"hidden"
					};
					//資料內容偶數列共用 Class 02
					var seeImformation_Y02_Content_Even_Class_02 = 
					{
						"color":"black",
						"font-size":"13px",
						"font-weight":"300",
						"font-family":"helvetica, arial, verdana, sans-serif",
						"background-color":"white",
				        "height": "40px",
				        "width":"235px",
				        "line-height":"40px",
				        "padding-left":"15px",
				        "margin-left":"10px",
				        "float":"left",
				        "display":"inline-block",
				        "text-overflow":"ellipsis",
				        "white-space":"nowrap",
				        "overflow":"hidden"
					};
					//基本資料主方框 - 標題
					$('#seeImformation_Y02_Basic').append("<div id='seeImformation_Y02_Basic_Title'>");
					$('#seeImformation_Y02_Basic_Title').css(seeImformation_Y02_Title_Class);
					//基本資料主方框 - 標題文字
					$('#seeImformation_Y02_Basic_Title').append("<div id='seeImformation_Y02_Basic_TitleText' >");
					$('#seeImformation_Y02_Basic_TitleText').css(seeImformation_Y02_TitleText_Class);
					$('#seeImformation_Y02_Basic_TitleText').html(language["basicInformation"][languageStatus]);
					//基本資料主方框 - 內容
					$('#seeImformation_Y02_Basic').append("<div id='seeImformation_Y02_Basic_Content'>");
					$('#seeImformation_Y02_Basic_Content').css(seeImformation_Y02_Content_Class);
					//基本資料主方框 - 內容 - 姓名
					$('#seeImformation_Y02_Basic_Content').append("<div id='seeImformation_Y02_Basic_Content_Username'>");
					$('#seeImformation_Y02_Basic_Content_Username').css(seeImformation_Y02_Content_Odd_Class_01);
					$('#seeImformation_Y02_Basic_Content_Username').html("姓名：");
					//基本資料主方框 - 內容 - 生日
					$('#seeImformation_Y02_Basic_Content').append("<div id='seeImformation_Y02_Basic_Content_Birthday'  >");
					$('#seeImformation_Y02_Basic_Content_Birthday').css(seeImformation_Y02_Content_Odd_Class_02);
					$('#seeImformation_Y02_Basic_Content_Birthday').html("生日：");
					//基本資料主方框 - 內容 - 身份證字號			
					$('#seeImformation_Y02_Basic_Content').append("<div id='seeImformation_Y02_Basic_Content_ID'>");
					$('#seeImformation_Y02_Basic_Content_ID').css(seeImformation_Y02_Content_Even_Class_01);
					$('#seeImformation_Y02_Basic_Content_ID').html("身份證字號：");
					//基本資料主方框 - 內容 - 性別
					$('#seeImformation_Y02_Basic_Content').append("<div id='seeImformation_Y02_Basic_Content_Gender'>");
					$('#seeImformation_Y02_Basic_Content_Gender').css(seeImformation_Y02_Content_Even_Class_02);
					$('#seeImformation_Y02_Basic_Content_Gender').html("性別：");
					//基本資料主方框 - 內容 - 通訊地址
					$('#seeImformation_Y02_Basic_Content').append("<div id='seeImformation_Y02_Basic_Content_Addr01' >");
					$('#seeImformation_Y02_Basic_Content_Addr01').css(seeImformation_Y02_Content_Odd_Class_01);
					$('#seeImformation_Y02_Basic_Content_Addr01').html("通訊地址：");
					//基本資料主方框 - 內容 - 戶籍地址
					$('#seeImformation_Y02_Basic_Content').append("<div id='seeImformation_Y02_Basic_Content_Addr02'>");
					$('#seeImformation_Y02_Basic_Content_Addr02').css(seeImformation_Y02_Content_Odd_Class_02);
					$('#seeImformation_Y02_Basic_Content_Addr02').html("戶籍地址：");
					//基本資料主方框 - 內容 - 信箱			
					$('#seeImformation_Y02_Basic_Content').append("<div id='seeImformation_Y02_Basic_Content_Email01'>");
					$('#seeImformation_Y02_Basic_Content_Email01').css(seeImformation_Y02_Content_Even_Class_01);
					$('#seeImformation_Y02_Basic_Content_Email01').html("信箱：");
					//基本資料主方框 - 內容 - 備用信箱
					$('#seeImformation_Y02_Basic_Content').append("<div id='seeImformation_Y02_Basic_Content_Email02'>");
					$('#seeImformation_Y02_Basic_Content_Email02').css(seeImformation_Y02_Content_Even_Class_02);
					$('#seeImformation_Y02_Basic_Content_Email02').html("備用信箱：");
					//基本資料主方框 - 內容 - 分機
					$('#seeImformation_Y02_Basic_Content').append("<div id='seeImformation_Y02_Basic_Content_Tel01'>");
					$('#seeImformation_Y02_Basic_Content_Tel01').css(seeImformation_Y02_Content_Odd_Class_01);
					$('#seeImformation_Y02_Basic_Content_Tel01').html("分機：");
					//基本資料主方框 - 內容 - 就學狀態
					$('#seeImformation_Y02_Basic_Content').append("<div id='seeImformation_Y02_Basic_Content_SchoolStatus'>");
					$('#seeImformation_Y02_Basic_Content_SchoolStatus').css(seeImformation_Y02_Content_Odd_Class_02);
					$('#seeImformation_Y02_Basic_Content_SchoolStatus').html("就學狀況：");
					//基本資料主方框 - 內容 - 家電			
					$('#seeImformation_Y02_Basic_Content').append("<div id='seeImformation_Y02_Basic_Content_Tel02'>");
					$('#seeImformation_Y02_Basic_Content_Tel02').css(seeImformation_Y02_Content_Even_Class_01);
					$('#seeImformation_Y02_Basic_Content_Tel02').html("家電：");
					//基本資料主方框 - 內容 - 行動電話
					$('#seeImformation_Y02_Basic_Content').append("<div id='seeImformation_Y02_Basic_Content_Tel03'>");
					$('#seeImformation_Y02_Basic_Content_Tel03').css(seeImformation_Y02_Content_Even_Class_02);
					$('#seeImformation_Y02_Basic_Content_Tel03').html("行動電話：");
				};
				//第三部份刻板
				new function()
				{
					//學歷資料主方框 - 外框
					$('#seeImformation_Y02_Main').append("<div id='seeImformation_Y02_Experience'>");
					$('#seeImformation_Y02_Experience').css
					({
						"height":"200px",
						"background-color":"white",
						"margin-top":"30px",
					    "border-radius":"14px",
					    "box-shadow":"rgb(136, 136, 136) 0px 0px 10px"
					});
					//資料標題共用 Class
					var seeImformation_Y02_Title_Class = 
					{
						"background-color":"rgb(69,200,200)",
						"border-top-right-radius":"14px",
						"border-top-left-radius":"14px",
						"width":"550px",
						"height":"50px",
						"margin-bottom":"15px"
					};
					//資料標題文字共用 Class
					var seeImformation_Y02_TitleText_Class = 
					{
						"font-size":"14pt",
					    "color":"white",
					    "line-height":"50px",
					    "margin":"auto",
				        "width":"38px"
					};
					//資料內容共用 Class
					var seeImformation_Y02_Content_Class = 
					{
				        "height": "40px",
				        "width":"510px",
				        "margin":"auto"
					};
					//資料內容奇數列共用 Class 01
					var seeImformation_Y02_Content_Odd_Class_01 = 
					{
						"color":"black",
						"font-size":"13px",
						"font-weight":"300",
						"font-family":"helvetica, arial, verdana, sans-serif",
						"background-color":"rgb(236,236,236)",
				        "height": "40px",
				        "width":"235px",
				        "line-height":"40px",
				        "padding-left":"15px",
				        "float":"left",
				        "display":"inline-block",
				        "text-overflow":"ellipsis",
				        "white-space":"nowrap",
				        "overflow":"hidden"
					};
					//資料內容奇數列共用 Class 02
					var seeImformation_Y02_Content_Odd_Class_02 = 
					{
						"color":"black",
						"font-size":"13px",
						"font-weight":"300",
						"font-family":"helvetica, arial, verdana, sans-serif",
						"background-color":"rgb(236,236,236)",
				        "height": "40px",
				        "width":"235px",
				        "line-height":"40px",
				        "padding-left":"15px",
				        "margin-left":"10px",
				        "float":"left",
				        "display":"inline-block",
				        "text-overflow":"ellipsis",
				        "white-space":"nowrap",
				        "overflow":"hidden"
					};
					//資料內容偶數列共用 Class 01
					var seeImformation_Y02_Content_Even_Class_01 = 
					{
						"color":"black",
						"font-size":"13px",
						"font-weight":"300",
						"font-family":"helvetica, arial, verdana, sans-serif",
						"background-color":"white",
				        "height": "40px",
				        "width":"235px",
				        "line-height":"40px",
				        "padding-left":"15px",
				        "float":"left",
				        "display":"inline-block",
				        "text-overflow":"ellipsis",
				        "white-space":"nowrap",
				        "overflow":"hidden"
					};
					//資料內容偶數列共用 Class 02
					var seeImformation_Y02_Content_Even_Class_02 = 
					{
						"color":"black",
						"font-size":"13px",
						"font-weight":"300",
						"font-family":"helvetica, arial, verdana, sans-serif",
						"background-color":"white",
				        "height": "40px",
				        "width":"235px",
				        "line-height":"40px",
				        "padding-left":"15px",
				        "margin-left":"10px",
				        "float":"left",
				        "display":"inline-block",
				        "text-overflow":"ellipsis",
				        "white-space":"nowrap",
				        "overflow":"hidden"
					};
					//經歷資料主方框 - 標題
					$('#seeImformation_Y02_Experience').append("<div id='seeImformation_Y02_Experience_Title'>");
					$('#seeImformation_Y02_Experience_Title').css(seeImformation_Y02_Title_Class);
					//經歷資料主方框 - 標題文字
					$('#seeImformation_Y02_Experience_Title').append("<div id='seeImformation_Y02_Experience_TitleText'>");
					$('#seeImformation_Y02_Experience_TitleText').css(seeImformation_Y02_TitleText_Class);
					$('#seeImformation_Y02_Experience_TitleText').html(language["experience"][languageStatus]);
					//經歷資料主方框 - 內容
					$('#seeImformation_Y02_Experience').append("<div id='seeImformation_Y02_Experience_Content'>");
					$('#seeImformation_Y02_Experience_Content').css(seeImformation_Y02_Content_Class);
					//經歷資料主方框 - 內容 - 最高學歷
					$('#seeImformation_Y02_Experience_Content').append("<div id='seeImformation_Y02_Experience_Content_FirstExperience'>");
					$('#seeImformation_Y02_Experience_Content_FirstExperience').css(seeImformation_Y02_Content_Odd_Class_01);
					$('#seeImformation_Y02_Experience_Content_FirstExperience').html("最高學歷：");
					//經歷資料主方框 - 內容 - 次高學歷
					$('#seeImformation_Y02_Experience_Content').append("<div id='seeImformation_Y02_Experience_Content_SecondExperience'>");
					$('#seeImformation_Y02_Experience_Content_SecondExperience').css(seeImformation_Y02_Content_Odd_Class_02);
					$('#seeImformation_Y02_Experience_Content_SecondExperience').html("次高學歷：");
					//經歷資料主方框 - 內容 - 最高學校			
					$('#seeImformation_Y02_Experience_Content').append("<div id='seeImformation_Y02_Experience_Content_FirstSchool'>");
					$('#seeImformation_Y02_Experience_Content_FirstSchool').css(seeImformation_Y02_Content_Even_Class_01);
					$('#seeImformation_Y02_Experience_Content_FirstSchool').html("最高學校：");
					//經歷資料主方框 - 內容 - 次高學校
					$('#seeImformation_Y02_Experience_Content').append("<div id='seeImformation_Y02_Experience_Content_SecondSchool'>");
					$('#seeImformation_Y02_Experience_Content_SecondSchool').css(seeImformation_Y02_Content_Even_Class_02);
					$('#seeImformation_Y02_Experience_Content_SecondSchool').html("次高學校：");
					//經歷資料主方框 - 內容 - 最高學系
					$('#seeImformation_Y02_Experience_Content').append("<div id='seeImformation_Y02_Experience_Content_FisrtDepartment'>");
					$('#seeImformation_Y02_Experience_Content_FisrtDepartment').css(seeImformation_Y02_Content_Odd_Class_01);
					$('#seeImformation_Y02_Experience_Content_FisrtDepartment').html("最高學系：");
					//經歷資料主方框 - 內容 - 次高學系
					$('#seeImformation_Y02_Experience_Content').append("<div id='seeImformation_Y02_Experience_Content_SecondDepartment'>");
					$('#seeImformation_Y02_Experience_Content_SecondDepartment').css(seeImformation_Y02_Content_Odd_Class_02);
					$('#seeImformation_Y02_Experience_Content_SecondDepartment').html("次高學系：");
				};
				//第四部份刻板
				new function()
				{
					//部門資料主方框 - 外框
					$('#seeImformation_Y02_Main').append("<div id='seeImformation_Y02_Department'>");
					$('#seeImformation_Y02_Department').css
					({
						"height":"200px",
						"background-color":"white",
						"margin-top":"30px",
					    "border-radius":"14px",
				        "margin-bottom":"26px",
					    "box-shadow":"rgb(136, 136, 136) 0px 0px 10px"
					});
					//資料標題共用 Class
					var seeImformation_Y02_Title_Class = 
					{
						"background-color":"rgb(69,200,200)",
						"border-top-right-radius":"14px",
						"border-top-left-radius":"14px",
						"width":"550px",
						"height":"50px",
						"margin-bottom":"15px"
					};
					//資料標題文字共用 Class
					var seeImformation_Y02_TitleText_Class = 
					{
						"font-size":"14pt",
					    "color":"white",
					    "line-height":"50px",
					    "margin":"auto",
				        "width":"75px"
					};
					//資料內容共用 Class
					var seeImformation_Y02_Content_Class = 
					{
				        "height": "40px",
				        "width":"510px",
				        "margin":"auto"
					};
					//資料內容奇數列共用 Class 01
					var seeImformation_Y02_Content_Odd_Class_01 = 
					{
						"color":"black",
						"font-size":"13px",
						"font-weight":"300",
						"font-family":"helvetica, arial, verdana, sans-serif",
						"background-color":"rgb(236,236,236)",
				        "height": "40px",
				        "width":"235px",
				        "line-height":"40px",
				        "padding-left":"15px",
				        "float":"left",
				        "display":"inline-block",
				        "text-overflow":"ellipsis",
				        "white-space":"nowrap",
				        "overflow":"hidden"
					};
					//資料內容奇數列共用 Class 02
					var seeImformation_Y02_Content_Odd_Class_02 = 
					{
						"color":"black",
						"font-size":"13px",
						"font-weight":"300",
						"font-family":"helvetica, arial, verdana, sans-serif",
						"background-color":"rgb(236,236,236)",
				        "height": "40px",
				        "width":"235px",
				        "line-height":"40px",
				        "padding-left":"15px",
				        "margin-left":"10px",
				        "float":"left",
				        "display":"inline-block",
				        "text-overflow":"ellipsis",
				        "white-space":"nowrap",
				        "overflow":"hidden"
					};
					//資料內容偶數列共用 Class 01
					var seeImformation_Y02_Content_Even_Class_01 = 
					{
						"color":"black",
						"font-size":"13px",
						"font-weight":"300",
						"font-family":"helvetica, arial, verdana, sans-serif",
						"background-color":"white",
				        "height": "40px",
				        "width":"235px",
				        "line-height":"40px",
				        "padding-left":"15px",
				        "float":"left",
				        "display":"inline-block",
				        "text-overflow":"ellipsis",
				        "white-space":"nowrap",
				        "overflow":"hidden"
					};
					//資料內容偶數列共用 Class 02
					var seeImformation_Y02_Content_Even_Class_02 = 
					{
						"color":"black",
						"font-size":"13px",
						"font-weight":"300",
						"font-family":"helvetica, arial, verdana, sans-serif",
						"background-color":"white",
				        "height": "40px",
				        "width":"235px",
				        "line-height":"40px",
				        "padding-left":"15px",
				        "margin-left":"10px",
				        "float":"left",
				        "display":"inline-block",
				        "text-overflow":"ellipsis",
				        "white-space":"nowrap",
				        "overflow":"hidden"
					};
					//部門資料主方框 - 標題
					$('#seeImformation_Y02_Department').append("<div id='seeImformation_Y02_Department_Title'>");
					$('#seeImformation_Y02_Department_Title').css(seeImformation_Y02_Title_Class);
					//部門資料主方框 - 標題文字
					$('#seeImformation_Y02_Department_Title').append("<div id='seeImformation_Y02_Department_TitleText'>");
					$('#seeImformation_Y02_Department_TitleText').css(seeImformation_Y02_TitleText_Class);
					//部門資料主方框 - 內容
					$('#seeImformation_Y02_Department').append("<div id='seeImformation_Y02_Department_Content'>");
					$('#seeImformation_Y02_Department_Content').css(seeImformation_Y02_Content_Class);
					//部門資料主方框 - 內容 - 部門職稱
					$('#seeImformation_Y02_Department_Content').append("<div id='seeImformation_Y02_Department_Content_PositionTitle'>");
					$('#seeImformation_Y02_Department_Content_PositionTitle').css(seeImformation_Y02_Content_Odd_Class_01);
					$('#seeImformation_Y02_Department_Content_PositionTitle').html("部門職稱：");
					//部門資料主方框 - 內容 - 直屬上司
					$('#seeImformation_Y02_Department_Content').append("<div id='seeImformation_Y02_Department_Content_DirectManager'>");
					$('#seeImformation_Y02_Department_Content_DirectManager').css(seeImformation_Y02_Content_Odd_Class_02);
					$('#seeImformation_Y02_Department_Content_DirectManager').html("直屬上司：");
					//部門資料主方框 - 內容 - 任職時間			
					$('#seeImformation_Y02_Department_Content').append("<div id='seeImformation_Y02_Department_Content_HireDate'>");
					$('#seeImformation_Y02_Department_Content_HireDate').css(seeImformation_Y02_Content_Even_Class_01);
					$('#seeImformation_Y02_Department_Content_HireDate').html("任職時間：");
					//部門資料主方框 - 內容 - 離職日期
					$('#seeImformation_Y02_Department_Content').append("<div id='seeImformation_Y02_Department_Content_LeaveDate'>");
					$('#seeImformation_Y02_Department_Content_LeaveDate').css(seeImformation_Y02_Content_Even_Class_02);
					$('#seeImformation_Y02_Department_Content_LeaveDate').html("離職日期：");
					//部門資料主方框 - 內容 - 工作職掌
					$('#seeImformation_Y02_Department_Content').append("<div id='seeImformation_Y02_Department_Content_WorkerContent'>");
					$('#seeImformation_Y02_Department_Content_WorkerContent').css(seeImformation_Y02_Content_Odd_Class_01);
					$('#seeImformation_Y02_Department_Content_WorkerContent').css("width","100%");
					$('#seeImformation_Y02_Department_Content_WorkerContent').html("工作執掌：");
				};
			};
			//載入資料
			new function()
			{
				var dc = (+new Date());
				jqueryAjax_Get(localStorage.human+'/task/me?_dc='+dc,function(Result)
				{
					//待處理的工單
					$('#seeImformation_Y02_PicRight_03').html(language["home_waitPendingTask"][languageStatus]+"："+Result.data.myselfProcessed);
					//待接單的工單
					$('#seeImformation_Y02_PicRight_04').html(language["home_waitCheckTask"][languageStatus]+"："+Result.data.executeWaitingReceive);
					//執行中的工單
					$('#seeImformation_Y02_PicRight_05').html(language["home_onDoingTask"][languageStatus]+"："+Result.data.executeProcessing);
					//待簽核的工單
					$('#seeImformation_Y02_PicRight_06').html(language["home_waitSignTask"][languageStatus]+"："+Result.data.signatureProcessing);
				},null,null);
				jqueryAjax_Get(localStorage.human+'/Reward/' + localStorage.getItem('userID') + '?_dc='+dc,function(Result)
				{
					//可開積分
					// $('#seeImformation_Y02_PicRight_01').html(language["openPoint"][languageStatus]+"："+Result.data.openPoint);
					//實得積分
					$('#seeImformation_Y02_PicRight_02').html(language["rewardPoint"][languageStatus]+"："+((Result.data.length == 0)?0:Result.data[0].RewardPoint));
				},null,null);
				jqueryAjax_Get(localStorage.human+'/Employee/me?_dc='+dc,function(Result)
				{
					//部門名稱
					$('#seeImformation_Y02_Department_TitleText').html(Result.data.DepartmentName);
					//圖片
					$('#seeImformation_Y02_Pic').css("background-image","url("+localStorage.human+"/Employee/"+Result.data.EmployeeID+"/showImages?_dc="+dc+")");
					//姓名
					$("#seeImformation_Y02_PicLeft_Username").html(Result.data.EmployeeName);
					$("#seeImformation_Y02_PicLeft_Username").attr('title',Result.data.EmployeeName);
					//員工編號
					$("#seeImformation_Y02_PicLeft_Userid").html(Result.data.EmployeeNumber);
					$("#seeImformation_Y02_PicLeft_Userid").attr("data-EmployeeID",Result.data.EmployeeID);
					$("#seeImformation_Y02_PicLeft_Userid").attr('title',Result.data.EmployeeNumber);
					//姓名
					$("#seeImformation_Y02_Basic_Content_Username").html(language["EmployeeName"][languageStatus]+"："+Result.data.EmployeeName);
					$("#seeImformation_Y02_Basic_Content_Username").attr('title',Result.data.EmployeeName);
					//生日
					$("#seeImformation_Y02_Basic_Content_Birthday").html(language["EmployeeBirthday"][languageStatus]+"："+getDate(Result.data.EmployeeBirthday));
					$("#seeImformation_Y02_Basic_Content_Birthday").attr('title',getDate(Result.data.EmployeeBirthday));
					
					//身份證字號
					$("#seeImformation_Y02_Basic_Content_ID").html(language["EmployeeIdentity"][languageStatus]+"："+Result.data.EmployeeIdentity);
					$("#seeImformation_Y02_Basic_Content_ID").attr('title',Result.data.EmployeeIdentity);
					//性別
					if(Result.data.EmployeeGender)
					{
						$("#seeImformation_Y02_Basic_Content_Gender").html(language["EmployeeGender"][languageStatus]+"："+language["boy"][languageStatus]);
						$("#seeImformation_Y02_Basic_Content_Gender").attr('title',language["boy"][languageStatus]);
					}
					else
					{
						$("#seeImformation_Y02_Basic_Content_Gender").html(language["EmployeeGender"][languageStatus]+"："+language["girl"][languageStatus]);
						$("#seeImformation_Y02_Basic_Content_Gender").attr('title',language["girl"][languageStatus]);
					}
					//通訊地址(可修改)
					temp_value= seeImformation_Y02_check_isunll(Result.data.EmployeeMailingAddress);
					$("#seeImformation_Y02_Basic_Content_Addr01").html(language["EmployeeMailingAddress"][languageStatus]+"：" +temp_value);
					$("#seeImformation_Y02_Basic_Content_Addr01").attr('title',temp_value);
					$('#seeImformation_Y02_Basic_Content_Addr01').append('<div class="seeImformation_Y02_editable" onclick="edit_fn(this)"  data-title="'+language["EmployeeMailingAddress"][languageStatus]+'" data-original="'+temp_value+'" data-name="EmployeeMailingAddress" ><i class="fa fa-pencil"></i></div>');
					
					//戶籍地址
					$("#seeImformation_Y02_Basic_Content_Addr02").html(language["EmployeeResidentAddress"][languageStatus]+"："+ seeImformation_Y02_check_isunll(Result.data.EmployeeResidentAddress));
					$("#seeImformation_Y02_Basic_Content_Addr02").attr('title',seeImformation_Y02_check_isunll(Result.data.EmployeeResidentAddress));
					
					
					//信箱
					$("#seeImformation_Y02_Basic_Content_Email01").html(language["EmployeeMainEmail"][languageStatus]+"：" + ((Result.data.EmployeeMainEmail == null || Result.data.EmployeeMainEmail == '')?"無":Result.data.EmployeeMainEmail));
					$("#seeImformation_Y02_Basic_Content_Email01").attr('title',((Result.data.EmployeeMainEmail == null || Result.data.EmployeeMainEmail == '')?"無":Result.data.EmployeeMainEmail));
					
					//備用信箱(可修改)
					temp_value= seeImformation_Y02_check_isunll(Result.data.EmployeeSecondEmail);
					$("#seeImformation_Y02_Basic_Content_Email02").html(language["EmployeeSecondEmail"][languageStatus]+"：" +temp_value );
					$("#seeImformation_Y02_Basic_Content_Email02").attr('title',temp_value );
					$('#seeImformation_Y02_Basic_Content_Email02').append('<div class="seeImformation_Y02_editable" onclick="edit_fn(this)" data-title="'+language["EmployeeSecondEmail"][languageStatus]+'" data-original="'+temp_value+'" data-name="EmployeeSecondEmail"><i class="fa fa-pencil"></i></div>');
					
					//分機(可修改)
					temp_value= seeImformation_Y02_check_isunll(Result.data.EmployeeExtensionNumber);
					$("#seeImformation_Y02_Basic_Content_Tel01").html(language["EmployeeExtensionNumber"][languageStatus]+"：" +temp_value );
					$("#seeImformation_Y02_Basic_Content_Tel01").attr('title',temp_value );
					$('#seeImformation_Y02_Basic_Content_Tel01').append('<div class="seeImformation_Y02_editable" onclick="edit_fn(this)" data-title="'+language["EmployeeExtensionNumber"][languageStatus]+'" data-original="'+temp_value+'" data-name="EmployeeExtensionNumber"><i class="fa fa-pencil"></i></div>');
					
					//就學狀況
					$("#seeImformation_Y02_Basic_Content_SchoolStatus").html(language["EmployeeHighEduStatus"][languageStatus]+"：" + seeImformation_Y02_check_isunll(Result.data.EmployeeHighEduStatus));
					$("#seeImformation_Y02_Basic_Content_SchoolStatus").attr('title',seeImformation_Y02_check_isunll(Result.data.EmployeeHighEduStatus));
					
					//家電(可修改)
					temp_value= seeImformation_Y02_check_isunll(Result.data.EmployeeHomeNumber);
					$("#seeImformation_Y02_Basic_Content_Tel02").html(language["EmployeeHomeNumber"][languageStatus]+"：" +temp_value );
					$("#seeImformation_Y02_Basic_Content_Tel02").attr('title',temp_value );
					$('#seeImformation_Y02_Basic_Content_Tel02').append('<div class="seeImformation_Y02_editable" onclick="edit_fn(this)" data-title="'+language["EmployeeHomeNumber"][languageStatus]+'" data-original="'+temp_value+'" data-name="EmployeeHomeNumber"><i class="fa fa-pencil"></i></div>');
					
					//行動電話(可修改)
					temp_value= seeImformation_Y02_check_isunll(Result.data.EmployeeMobileNumber);
					$("#seeImformation_Y02_Basic_Content_Tel03").html(language["EmployeeMobileNumber"][languageStatus]+"：" +temp_value );
					$("#seeImformation_Y02_Basic_Content_Tel03").attr('title',temp_value );
					$('#seeImformation_Y02_Basic_Content_Tel03').append('<div class="seeImformation_Y02_editable" onclick="edit_fn(this)" data-title="'+language["EmployeeMobileNumber"][languageStatus]+'" data-original="'+temp_value+'" data-name="EmployeeMobileNumber"><i class="fa fa-pencil"></i></div>');
					//最高學歷
					$("#seeImformation_Y02_Experience_Content_FirstExperience").html(language["EmployeeHighEduLevel"][languageStatus]+"：" + ((Result.data.employeeHighEdu.EmployeeHighEduLevel == null || Result.data.employeeHighEdu.EmployeeHighEduLevel == '')?"無":Result.data.employeeHighEdu.EmployeeHighEduLevel));
					$("#seeImformation_Y02_Experience_Content_FirstExperience").attr('title',((Result.data.employeeHighEdu.EmployeeHighEduLevel == null || Result.data.employeeHighEdu.EmployeeHighEduLevel == '')?"無":Result.data.employeeHighEdu.EmployeeHighEduLevel));
					//次高學歷
					$("#seeImformation_Y02_Experience_Content_SecondExperience").html(language["EmployeeSecondEduLevel"][languageStatus]+"："  + ((Result.data.employeeSecondEdu.EmployeeSecondEduLevel == null || Result.data.employeeSecondEdu.EmployeeSecondEduLevel == '')?"無":Result.data.employeeSecondEdu.EmployeeSecondEduLevel));
					$("#seeImformation_Y02_Experience_Content_SecondExperience").attr('title',((Result.data.employeeSecondEdu.EmployeeSecondEduLevel == null || Result.data.employeeSecondEdu.EmployeeSecondEduLevel == '')?"無":Result.data.employeeSecondEdu.EmployeeSecondEduLevel));
					//最高學校
					$("#seeImformation_Y02_Experience_Content_FirstSchool").html(language["EmployeeHighEduSchool"][languageStatus]+"：" + ((Result.data.employeeHighEdu.EmployeeHighEduSchool == null || Result.data.employeeHighEdu.EmployeeHighEduSchool == '')?"無":Result.data.employeeHighEdu.EmployeeHighEduSchool));
					$("#seeImformation_Y02_Experience_Content_FirstSchool").attr('title',((Result.data.employeeHighEdu.EmployeeHighEduSchool == null || Result.data.employeeHighEdu.EmployeeHighEduSchool == '')?"無":Result.data.employeeHighEdu.EmployeeHighEduSchool));
					//次高學校
					$("#seeImformation_Y02_Experience_Content_SecondSchool").html(language["EmployeeSecondEduSchool"][languageStatus]+"：" + ((Result.data.employeeSecondEdu.EmployeeSecondEduSchool == null || Result.data.employeeSecondEdu.EmployeeSecondEduSchool == '')?"無":Result.data.employeeSecondEdu.EmployeeSecondEduSchool));
					$("#seeImformation_Y02_Experience_Content_SecondSchool").attr('title',((Result.data.employeeSecondEdu.EmployeeSecondEduSchool == null || Result.data.employeeSecondEdu.EmployeeSecondEduSchool == '')?"無":Result.data.employeeSecondEdu.EmployeeSecondEduSchool));
					//最高學系
					$("#seeImformation_Y02_Experience_Content_FisrtDepartment").html(language["EmployeeHighEduDepartment"][languageStatus]+"："  + ((Result.data.employeeHighEdu.EmployeeHighEduDepartment == null || Result.data.employeeHighEdu.EmployeeHighEduDepartment == '')?"無":Result.data.employeeHighEdu.EmployeeHighEduDepartment));
					$("#seeImformation_Y02_Experience_Content_FisrtDepartment").attr('title',((Result.data.employeeHighEdu.EmployeeHighEduDepartment == null || Result.data.employeeHighEdu.EmployeeHighEduDepartment == '')?"無":Result.data.employeeHighEdu.EmployeeHighEduDepartment));
					//次高學系
					$("#seeImformation_Y02_Experience_Content_SecondDepartment").html(language["EmployeeSecondEduDepartment"][languageStatus]+"：" + ((Result.data.employeeSecondEdu.EmployeeSecondEduDepartment == null || Result.data.employeeSecondEdu.EmployeeSecondEduDepartment == '')?"無":Result.data.employeeSecondEdu.EmployeeSecondEduDepartment));
					$("#seeImformation_Y02_Experience_Content_SecondDepartment").attr('title',((Result.data.employeeSecondEdu.EmployeeSecondEduDepartment == null || Result.data.employeeSecondEdu.EmployeeSecondEduDepartment == '')?"無":Result.data.employeeSecondEdu.EmployeeSecondEduDepartment));
					//部門名稱
					$("#seeImformcation_Y02_Department_TitleText").html("部門名稱：" + ((Result.data.DepartmentName == null || Result.data.DepartmentName == '')?"無":Result.data.DepartmentName));
					$("#seeImformcation_Y02_Department_TitleText").attr('title',((Result.data.DepartmentName == null || Result.data.DepartmentName == '')?"無":Result.data.DepartmentName));
					//部門職稱
					$("#seeImformation_Y02_Department_Content_PositionTitle").html(language["EmployeePositionTitle"][languageStatus]+"：" + ((Result.data.EmployeePositionTitle == null || Result.data.EmployeePositionTitle == '')?"無":Result.data.EmployeePositionTitle));
					$("#seeImformation_Y02_Department_Content_PositionTitle").attr('title',((Result.data.EmployeePositionTitle == null || Result.data.EmployeePositionTitle == '')?"無":Result.data.EmployeePositionTitle));
					//直屬上司
					$("#seeImformation_Y02_Department_Content_DirectManager").html(language["DirectManagerName"][languageStatus]+"：" + ((Result.data.DirectManagerName == null || Result.data.DirectManagerName == '')?"無":Result.data.DirectManagerName));
					$("#seeImformation_Y02_Department_Content_DirectManager").attr('title',((Result.data.DirectManagerName == null || Result.data.DirectManagerName == '')?"無":Result.data.DirectManagerName));
					//任職時間
					$("#seeImformation_Y02_Department_Content_HireDate").html(language["EmployeeHireDate"][languageStatus]+"：" + ((getDate(Result.data.EmployeeHireDate) == null || getDate(Result.data.EmployeeHireDate) == ' ')?"無":getDate(Result.data.EmployeeHireDate)));
					$("#seeImformation_Y02_Department_Content_HireDate").attr('title',((getDate(Result.data.EmployeeHireDate) == null || getDate(Result.data.EmployeeHireDate) == ' ')?"無":getDate(Result.data.EmployeeHireDate)));
					//離職日期
					$("#seeImformation_Y02_Department_Content_LeaveDate").html(language["EmployeeLeaveDate"][languageStatus]+"：" + ((getDate(Result.data.EmployeeLeaveDate) == null || getDate(Result.data.EmployeeLeaveDate) == ' ')?"無":getDate(Result.data.EmployeeLeaveDate)));
					$("#seeImformation_Y02_Department_Content_LeaveDate").attr('title',((getDate(Result.data.EmployeeLeaveDate) == null || getDate(Result.data.EmployeeLeaveDate) == ' ')?"無":getDate(Result.data.EmployeeLeaveDate)));
					
					//工作職掌 (可修改)
					temp_value= seeImformation_Y02_check_isunll(Result.data.EmployeeWorkerContent);
					$("#seeImformation_Y02_Department_Content_WorkerContent").html(language["EmployeeWorkerContent"][languageStatus]+"：" +temp_value);
					$("#seeImformation_Y02_Department_Content_WorkerContent").attr('title',temp_value);
					$('#seeImformation_Y02_Department_Content_WorkerContent').append('<div class="seeImformation_Y02_editable" onclick="edit_fn(this)" data-title="'+language["EmployeeWorkerContent"][languageStatus]+'" data-original="'+temp_value+'" data-name="EmployeeWorkerContent"><i class="fa fa-pencil"></i></div>');
				},null,null);
			};
		
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
}


//空值回傳無 
function seeImformation_Y02_check_isunll(obj)  
  {  
     if (typeof(obj) == 'undefined' || obj == null || obj=='' )  return '無';  
      return obj;  
}  


	
function edit_fn(obj)
{
		edit_original = (obj.getAttribute("data-original")== '無')?"":(obj.getAttribute("data-original"));
		
		var edit_msg=showMsg(
			'編輯 '+ obj.getAttribute("data-title") ,
			'<div><input id="seeImformation_Y02_edited_value" value="'+edit_original+'" style="padding:8px;display:block;border:none;border-bottom:1px solid #808080;width:95%; text-align: center;" ></input></div>',
			
			function(){ //取消
					edit_msg.close();
			} ,
			
			function(){
					var submit_value =$('#seeImformation_Y02_edited_value')[0].value;
					if ( (submit_value) !=  (obj.getAttribute("data-original")) ){  //判斷有無更動資料
							//組合
							var edited_data='{"EmployeeID": "' + seeImformation_Y02_PicLeft_Userid.getAttribute("data-EmployeeID") + '", "'+ obj.getAttribute("data-name") +'" : "'+submit_value+'"}';						
							//送出
							jqueryAjax_Put(localStorage.human + '/Employee/me/detail',edited_data,
							function (){//成功訊息
								edit_msg.close();
									var okMsg = showMsg( obj.getAttribute("data-title") , '修改成功' ,
										function(){okMsg.close()},
										function(){okMsg.close()}
										);
										//隱藏 No 按鈕
										$('#YesNo_Msg_No').css("display","none");
										//置中 Yes 按鈕
										$('#YesNo_Msg_Yes').css({"margin-left":"4px","width":"97%"});
								createseeImformationPage();//重載頁面
							},
							function (result){//錯誤訊息
								normalError_Msg(result.message);
							},null);			
					}
					else {edit_msg.close();}//無更動則直接關閉
			}
		);
		$("#YesNo_Msg").css
		({
			"height":"175px",
			"z-index":"101"
		});
}
 

function edit_img() {
		//建立 YesNo_Msg
		var YesNo_Msg = YesNo_Msg_Define.Initialize();
		YesNo_Msg.setMask(true);
		YesNo_Msg.setSmartdetect(true);
		YesNo_Msg.setWidth(350);
		YesNo_Msg.setHeight(350);
		YesNo_Msg.setId('YesNo_Msg');
		YesNo_Msg.setTitle('編輯個人照');
		YesNo_Msg.show();
		YesNo_Msg.addMsgContent('<style>#seeImformation_Y02_show_img{box-shadow:4px 4px 3px rgba(20%,20%,40%,0.5);} .seeImformation_Y02_choose_img_btn { background-color:#599bb3; 	border-radius:11px; 	display:inline-block; 	cursor:pointer; 	color:#ffffff; 	font-family:Arial; 	font-size:12px; 	font-weight:bold; 	padding:12px 24px; 	text-decoration:none; border:none; display:block;margin:0px auto; margin-top:10px;} .seeImformation_Y02_choose_img_btn:hover { 	background-color:#408c99; }</style><img  id="seeImformation_Y02_show_img" src="' + localStorage.human + '/Employee/'+seeImformation_Y02_PicLeft_Userid.getAttribute("data-EmployeeID")+'/showImages?_dc='+(+new Date())+'"  style="width:150px;height:150px;" ><input id="choose_file" type="file" accept="image/*" onchange="seeImformation_Y02_showfile(event)" style="display:none"></input><input type="button" value="選擇照片" class="seeImformation_Y02_choose_img_btn" onclick="$(\'#choose_file\').click();"></input>');
		YesNo_Msg.addYesNO_Button('取消','上傳更新',

		//No
		function()
		{
			YesNo_Msg.close();
		},
		//Yes
		function()
		{
			//送出
			jqueryAjax_Put(localStorage.human + '/Employee/me/images',  $('#seeImformation_Y02_show_img')[0].src.split(',')[1]  ,
			function (){//成功訊息
				YesNo_Msg.close();
					var okMsg = showMsg( '編輯照片' , '修改成功' ,
						function(){okMsg.close()},
						function(){okMsg.close()}
						);
						//隱藏 No 按鈕
						$('#YesNo_Msg_No').css("display","none");
						//置中 Yes 按鈕
						$('#YesNo_Msg_Yes').css({"margin-left":"4px","width":"97%"});
				createseeImformationPage();//重載頁面
			},
			null,null);
			
		});
		//開啟物化效果
		addBlur_Css('Mainpage');
		

}
			
//圖片預視
var seeImformation_Y02_showfile = function(event)
{ 
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function(){
      var dataURL = reader.result;
      var seeImformation_Y02_show_img = document.getElementById('seeImformation_Y02_show_img');
      seeImformation_Y02_show_img.src = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
};