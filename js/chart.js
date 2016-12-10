//Jquery 準備好
$(document).ready(function()
{
	try
	{
		//我發出的工單
		var  view = {};
		view.Title = "企業通訊錄";
		view.Content = "組織圖";
		view.Content_Func = function()
		{
			//組織圖頁
			createMyChartPage(); //chartTab_Y03_organization
		}
		createMainpage_Menu(view);
		$("div[myId='組織圖']").parent().parent().css("marginLeft","-13px");
	}
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}
});

var dc = (+new Date());

//createMyChartPage
function createMyChartPage()
{
	try
	{
		//新增一個 tab
		addTab('chartTab_Y03_organization_content',"組織圖");
		//取得daily Content
		
		Y02_changeLanguage_HTML(languageStatus);
		
		$('#chartTab_Y03_organization_content').empty();
		$('#chartTab_Y03_organization_element_to_pop_up').remove();
		$('#chartTab_Y03_organization_content').append('<div id="chartTab_Y03_organization_content_main" ></div>');
		$('#chartTab_Y03_organization_content_main').css({'word-wrap': 'break-word',  'overflow': 'auto','height':'100%'});
		
		//---------------開始刻CSS
		var chartTab_Y03_organization_content_css ='';
		
		/* 組織圖示意
		　　　｜←ｕｌ
			┌────┐
			│圖　資訊│
			└────┘
			　　│←ｕｌ
			┌─┴──┐←Ｂｅｆｏｒｅ
			　↑ａｆｔｅｒ
		*/
		
		
		//組織圖
		chartTab_Y03_organization_content_css +='.chartTab_Y03_organization_tree ul {   position: relative;   padding: 1em 0;   white-space: nowrap;   margin: 0 auto;   text-align: center; }  ';
		chartTab_Y03_organization_content_css +=' .chartTab_Y03_organization_tree ul::after {   content: "";   display: .chartTab_Y03_organization_pop_table;   clear: both; }';
		chartTab_Y03_organization_content_css +=' .chartTab_Y03_organization_tree li {   display: inline-block;   vertical-align: top;   text-align: center;   list-style-type: none;   position: relative;   padding: 1em .5em 0 .5em; }';
		chartTab_Y03_organization_content_css +='.chartTab_Y03_organization_tree li::before, .chartTab_Y03_organization_tree li::after {   content: "";   position: absolute;   top: 0;   right: 50%;   border-top: 1px solid #141414;   width: 50%;   height: 1em; }';
		chartTab_Y03_organization_content_css +='.chartTab_Y03_organization_tree li::after {   right: auto;   left: 50%;   border-left: 1px solid #141414; }'; 
		chartTab_Y03_organization_content_css +='.chartTab_Y03_organization_tree li:only-child::after, .chartTab_Y03_organization_tree li:only-child::before {   display: none; }'; 
		chartTab_Y03_organization_content_css +='.chartTab_Y03_organization_tree li:only-child {   padding-top: 0; }'; 
		chartTab_Y03_organization_content_css +='.chartTab_Y03_organization_tree li:first-child::before, .chartTab_Y03_organization_tree li:last-child::after {   border: 0 none; }'; 
		chartTab_Y03_organization_content_css +='.chartTab_Y03_organization_tree li:last-child::before {   border-right: 1px solid #141414;   border-radius: 0 5px 0 0; }'; 
		chartTab_Y03_organization_content_css +='.chartTab_Y03_organization_tree li:first-child::after {   border-radius: 5px 0 0 0; }'; 
		chartTab_Y03_organization_content_css +='.chartTab_Y03_organization_tree ul ul::before {   content: "";   position: absolute;   top: 0;   left: 50%;   border-left: 1px solid #141414;   width: 0;   height: 1em; }'; 
		
		//組織圖_區塊
		chartTab_Y03_organization_content_css +='.chartTab_Y03_organization_tree li>div {   border: 1px solid #ccc;   padding: .5em .75em;   display: inline-block;   border-radius: 5px;   color: #333;   position: relative;   width: 250px;   height: 100px;   top: 1px;   text-align:left;   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);   transition: 0.5s; }'; 
		
		//下方箭頭
		chartTab_Y03_organization_content_css +='.chartTab_Y03_organization_tree li>div span {   cursor: pointer;   display: block;   transition: 0.5s;   position:absolute;   width:90%;   left:5%;   height:15%;   bottom:2%; }'; 
		chartTab_Y03_organization_content_css +='.chartTab_Y03_organization_tree li>div span:hover {   background-color:#DDDDDD;   border-radius: 50px;  }'; 
		chartTab_Y03_organization_content_css +='.chartTab_Y03_organization_tree li>div span:after {   content: "»";   position: absolute;   opacity: 0;   bottom: 0;   transition: 0.5s;    right: 49%;    left: 49.5%;    transform-origin:  50% 58%; transform:  rotate(90deg); }'; 
		
		//下方箭頭_hover效果
		chartTab_Y03_organization_content_css +='.chartTab_Y03_organization_tree li>div:hover  {   padding-bottom: 25px; }'; 
		chartTab_Y03_organization_content_css +='.chartTab_Y03_organization_tree li>div:hover span:after {   opacity: 1; }'; 
		
		//下方箭頭_點擊後加上Class_箭頭往上&固定高度
		chartTab_Y03_organization_content_css +='.chartTab_Y03_organization_show_active  { 	padding-bottom: 25px!important; }'; 
		chartTab_Y03_organization_content_css +='.chartTab_Y03_organization_show_active>span:after {   	opacity: 1!important; 	transform:  rotate(270deg)!important; }'; 
		
		//左圓圖片  右info
		chartTab_Y03_organization_content_css +='.chartTab_Y03_organization_card_info {   width: 140px;   height: 40%;   position:absolute; left:45%;  top:25px; text-align:center; font-family:Microsoft JhengHei;!important }'; 
		chartTab_Y03_organization_content_css +='.chartTab_Y03_organization_tree img{ 	border-radius: 50%; }'; 
		
		//彈出視窗_Main(X符號)
		chartTab_Y03_organization_content_css +='#chartTab_Y03_organization_element_to_pop_up {  background-color:#fff;     border-radius:15px;     color:#000;     display:none;      padding:20px;  max-width:880px;  width:80vw;     height: 470px; }'; 
		chartTab_Y03_organization_content_css +='#chartTab_Y03_organization_pop_content{    height:80%;    overflow-y: auto; }'; 
		chartTab_Y03_organization_content_css +='.chartTab_Y03_organization_pop_table_b-close{ 	color:#fff;     cursor:pointer;     position:absolute;     right:-25px;     top:-45px; 	font-size:2rem;  }'; 
		
		//彈出視窗_table內容調整
		chartTab_Y03_organization_content_css +='.chartTab_Y03_organization_pop_table {    max-height: 90%; 	border: 1px solid 	#AAAAAA; 	border-collapse: collapse;     width: 100%;     border-radius:11px; 	border-collapse: separate;     border-spacing: 0;  }'; 
		chartTab_Y03_organization_content_css +='.chartTab_Y03_organization_pop_table th,.chartTab_Y03_organization_pop_table td {     text-align: center;     padding: 8px; }'; 
		chartTab_Y03_organization_content_css +='.chartTab_Y03_organization_pop_table tr:nth-child(even){background-color: #CCEEFF;}'; 
		chartTab_Y03_organization_content_css +='.chartTab_Y03_organization_pop_table th {     background-color: #05668D;     color: white; }'; 
		chartTab_Y03_organization_content_css +='.chartTab_Y03_organization_pop_table tr:first-child th:first-child {  border-top-left-radius: 10px;}'; 
		chartTab_Y03_organization_content_css +='.chartTab_Y03_organization_pop_table tr:first-child th:last-child {  border-top-right-radius: 10px;}'; 
		chartTab_Y03_organization_content_css +='.chartTab_Y03_organization_pop_table tr:last-child td:first-child {  border-bottom-left-radius: 10px;}'; 
		chartTab_Y03_organization_content_css +='.chartTab_Y03_organization_pop_table tr:last-child td:last-child {  border-bottom-right-radius: 10px;}'; 
		
		//彈出視窗_下方的選頁
		chartTab_Y03_organization_content_css +='#chartTab_Y03_organization_pagination {     display: inline-block;     padding: 0;     margin: 0; }'; 
		chartTab_Y03_organization_content_css +='#chartTab_Y03_organization_pagination li {display: inline;}'; 
		chartTab_Y03_organization_content_css +='#chartTab_Y03_organization_pagination li a {     color: black;     float: left;     padding: 8px 16px;     text-decoration: none;     border-radius: 5px; }'; 
		chartTab_Y03_organization_content_css +='#chartTab_Y03_organization_pagination li a.chartTab_Y03_organization_page_active {     background-color: #00A8E8;     color: white;     border-radius: 5px; }'; 
		chartTab_Y03_organization_content_css +='#chartTab_Y03_organization_pagination li a:hover:not(.chartTab_Y03_organization_page_active) {background-color: #ddd;}'; 

		$('#chartTab_Y03_organization_content_main').append('<style>'+chartTab_Y03_organization_content_css+'</style>');
		//-----------結束CSS
		
		
		$('#chartTab_Y03_organization_content_main').append('<div class="chartTab_Y03_organization_tree"></div>');
		
		
		$('#chartTab_Y03_organization_content_main').append('<div id="chartTab_Y03_organization_element_to_pop_up" >  		<a class="chartTab_Y03_organization_pop_table_b-close">x</a> 	<div style="text-align:center;padding: 8px;">員工資訊</div> 		<div id="chartTab_Y03_organization_pop_content" style="padding:6px;"> 			<table class="chartTab_Y03_organization_pop_table" > 				<thead> 					<tr> 					<th width="15%">員工編號</th> 					<th width="12.5%"></th> 					<th width="12.5%">姓名</th> 					<th width="30%">Email</th> 					<th width="30%">電話</th> 				  </tr> 				</thead> 			  <tbody id="chartTab_Y03_organization_table_emplist" >  				 </tbody> 			</table> 	</div>	<div style="text-align:center;padding:8px;"><ul id="chartTab_Y03_organization_pagination" ></ul></div> 		</div>');
	
		
		
		//套件載入
		$('#chartTab_Y03_organization_content_main').append('<script> (function(c){c.fn.chartTab_Y03_organization_bPopup=function(A,E){function L(){a.contentContainer=c(a.contentContainer||b);switch(a.content){case "iframe":var d=c(\'<iframe class="b-iframe" \'+a.iframeAttr+"></iframe>");d.appendTo(a.contentContainer);t=b.outerHeight(!0);u=b.outerWidth(!0);B();d.attr("src",a.loadUrl);l(a.loadCallback);break;case "image":B();c("<img />").load(function(){l(a.loadCallback);F(c(this))}).attr("src",a.loadUrl).hide().appendTo(a.contentContainer);break;default:B(),c(\'<div class="b-ajax-wrapper"></div>\').load(a.loadUrl,a.loadData,function(d,b,e){l(a.loadCallback,b);F(c(this))}).hide().appendTo(a.contentContainer)}}function B(){a.modal&&c(\'<div class="b-modal \'+e+\'"></div>\').css({backgroundColor:a.modalColor,position:"fixed",top:0,right:0,bottom:0,left:0,opacity:0,zIndex:a.zIndex+v}).appendTo(a.appendTo).fadeTo(a.speed,a.opacity);C();b.data("chartTab_Y03_organization_bPopup",a).data("id",e).css({left:"slideIn"==a.transition||"slideBack"==a.transition?"slideBack"==a.transition?f.scrollLeft()+w:-1*(x+u):m(!(!a.follow[0]&&n||g)),position:a.positionStyle||"absolute",top:"slideDown"==a.transition||"slideUp"==a.transition?"slideUp"==a.transition?f.scrollTop()+y:z+-1*t:p(!(!a.follow[1]&&q||g)),"z-index":a.zIndex+v+1}).each(function(){a.appending&&c(this).appendTo(a.appendTo)});G(!0)}function r(){a.modal&&c(".b-modal."+b.data("id")).fadeTo(a.speed,0,function(){c(this).remove()});a.scrollBar||c("html").css("overflow","auto");c(".b-modal."+e).unbind("click");f.unbind("keydown."+e);k.unbind("."+e).data("chartTab_Y03_organization_bPopup",0<k.data("chartTab_Y03_organization_bPopup")-1?k.data("chartTab_Y03_organization_bPopup")-1:null);b.undelegate(".bClose, ."+a.closeClass,"click."+e,r).data("chartTab_Y03_organization_bPopup",null);clearTimeout(H);G();return!1}function I(d){y=k.height();w=k.width();h=D();if(h.x||h.y)clearTimeout(J),J=setTimeout(function(){C();d=d||a.followSpeed;var e={};h.x&&(e.left=a.follow[0]?m(!0):"auto");h.y&&(e.top=a.follow[1]?p(!0):"auto");b.dequeue().each(function(){g?c(this).css({left:x,top:z}):c(this).animate(e,d,a.followEasing)})},50)}function F(d){var c=d.width(),e=d.height(),f={};a.contentContainer.css({height:e,width:c});e>=b.height()&&(f.height=b.height());c>=b.width()&&(f.width=b.width());t=b.outerHeight(!0);u=b.outerWidth(!0);C();a.contentContainer.css({height:"auto",width:"auto"});f.left=m(!(!a.follow[0]&&n||g));f.top=p(!(!a.follow[1]&&q||g));b.animate(f,250,function(){d.show();h=D()})}function M(){k.data("chartTab_Y03_organization_bPopup",v);b.delegate(".bClose, ."+a.closeClass,"click."+e,r);a.modalClose&&c(".b-modal."+e).css("cursor","pointer").bind("click",r);N||!a.follow[0]&&!a.follow[1]||k.bind("scroll."+e,function(){if(h.x||h.y){var d={};h.x&&(d.left=a.follow[0]?m(!g):"auto");h.y&&(d.top=a.follow[1]?p(!g):"auto");b.dequeue().animate(d,a.followSpeed,a.followEasing)}}).bind("resize."+e,function(){I()});a.escClose&&f.bind("keydown."+e,function(a){27==a.which&&r()})}function G(d){function c(e){b.css({display:"block",opacity:1}).animate(e,a.speed,a.easing,function(){K(d)})}switch(d?a.transition:a.transitionClose||a.transition){case "slideIn":c({left:d?m(!(!a.follow[0]&&n||g)):f.scrollLeft()-(u||b.outerWidth(!0))-200});break;case "slideBack":c({left:d?m(!(!a.follow[0]&&n||g)):f.scrollLeft()+w+200});break;case "slideDown":c({top:d?p(!(!a.follow[1]&&q||g)):f.scrollTop()-(t||b.outerHeight(!0))-200});break;case "slideUp":c({top:d?p(!(!a.follow[1]&&q||g)):f.scrollTop()+y+200});break;default:b.stop().fadeTo(a.speed,d?1:0,function(){K(d)})}}function K(d){d?(M(),l(E),a.autoClose&&(H=setTimeout(r,a.autoClose))):(b.hide(),l(a.onClose),a.loadUrl&&(a.contentContainer.empty(),b.css({height:"auto",width:"auto"})))}function m(a){return a?x+f.scrollLeft():x}function p(a){return a?z+f.scrollTop():z}function l(a,e){c.isFunction(a)&&a.call(b,e)}function C(){z=q?a.position[1]:Math.max(0,(y-b.outerHeight(!0))/2-a.amsl);x=n?a.position[0]:(w-b.outerWidth(!0))/2;h=D()}function D(){return{x:w>b.outerWidth(!0),y:y>b.outerHeight(!0)}}c.isFunction(A)&&(E=A,A=null);var a=c.extend({},c.fn.chartTab_Y03_organization_bPopup.defaults,A);a.scrollBar||c("html").css("overflow","hidden");var b=this,f=c(document),k=c(window),y=k.height(),w=k.width(),N=/OS 6(_\d)+/i.test(navigator.userAgent),v=0,e,h,q,n,g,z,x,t,u,J,H;b.close=function(){r()};b.reposition=function(a){I(a)};return b.each(function(){c(this).data("chartTab_Y03_organization_bPopup")||(l(a.onOpen),v=(k.data("chartTab_Y03_organization_bPopup")||0)+1,e="__b-popup"+v+"__",q="auto"!==a.position[1],n="auto"!==a.position[0],g="fixed"===a.positionStyle,t=b.outerHeight(!0),u=b.outerWidth(!0),a.loadUrl?L():B())})};c.fn.chartTab_Y03_organization_bPopup.defaults={amsl:50,appending:!0,appendTo:"body",autoClose:!1,closeClass:"chartTab_Y03_organization_pop_table_b-close",content:"ajax",contentContainer:!1,easing:"swing",escClose:!0,follow:[!0,!0],followEasing:"swing",followSpeed:500,iframeAttr:\'scrolling="no" frameborder="0"\',loadCallback:!1,loadData:!1,loadUrl:!1,modal:!0,modalClose:!0,modalColor:"#000",onClose:!1,onOpen:!1,opacity:.7,position:["auto","auto"],positionStyle:"absolute",scrollBar:!0,speed:250,transition:"fadeIn",transitionClose:!1,zIndex:9997}})(jQuery);</script>');
		
		
			jqueryAjax_Get(localStorage.human+'/Company?dc='+ (+new Date()) ,function(Result)
					{
							$('.chartTab_Y03_organization_tree').append('<ul> <li id="chartTab_Y03_organization_li_Company"> <div   style="width:430px;" data-companyID="'+Result.data.companyID+'">  <a   href="javascript: void(0)" onclick="chartTab_Y03_organization_show_Company_emplist(this.parentNode)" ><img src="./image/login.jpg"  style="width:100px;height:100px;"></a>   <div class="chartTab_Y03_organization_card_info"> <p>'+Result.data.companyName+'</p>  </div><span onclick="chartTab_Y03_organization_show_BOSS(this.parentNode)"></span></div>    <ul id="chartTab_Y03_organization_ul_Company" style="display:none;"></ul>  </li> </ul>');
							
					},null,null);
			
	}
		

	
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}

}

//------------副程式開始-------------

//------------取得公司最高單位-----------
function chartTab_Y03_organization_show_BOSS(parameter){ 
		
	if ( $(parameter).hasClass('gotten') != true ){
		//預設已開啟避免BUG
		$(parameter).addClass('gotten');
		jqueryAjax_Get(localStorage.human+'/Department?dc='+(+new Date()) ,function(request)
		{
						jqueryAjax_Get(localStorage.human+'/Department/'+request.data[0].DepartmentID +'?dc='+(+new Date()) ,function(manager)
						{
								
									$('#chartTab_Y03_organization_ul_Company').append(' <li id="li_'+request.data[0].DepartmentID+'"> <div    data-DepartmentID="'+request.data[0].DepartmentID+'">  <a   href="javascript: void(0)" onclick="chartTab_Y03_organization_show_emplist(this.parentNode)" ><img src="' + localStorage.human + '/Employee/'+manager.data.EmployeeID+'/showImages?_dc='+ (+new Date()) +'"  style="width:100px;height:100px;" ></a>   <div class="chartTab_Y03_organization_card_info"> <p>'+request.data[0].DepartmentName+'</br>'+manager.data.EmployeeName+'</p>  </div>  <span onclick="chartTab_Y03_organization_show_deptlist(this.parentNode);chartTab_Y03_organization_check_active(this.parentNode);"></span> </div>    <ul id="ul_'+request.data[0].DepartmentID+'" style="display:none;"></ul>  </li>').hide().slideDown();
								
						},null,null);		
		},null,null);	
		
	<!-- ... 取得最高部門END ... -->	 
	}	
	else{
		$('#chartTab_Y03_organization_ul_Company' ).slideToggle();
	}	
		
		chartTab_Y03_organization_check_active(parameter); //css add active
 }	
 
 

 
 //------------取得部門_及部門管理員-----------
 	 function chartTab_Y03_organization_show_deptlist(parameter){
		var dept_ID =  parameter.getAttribute('data-DepartmentID');
		if ( $(parameter).hasClass('gotten') != true ){
			//預設已開啟避免BUG
			$(parameter).addClass('gotten');
			 jqueryAjax_Get(localStorage.human+'/Department/'  + dept_ID + '/deptlist?dc=' + (+new Date()) ,function(deptlist)
			{
					for  ( var i=0;i< deptlist.count ;i++){
											$('#ul_'+dept_ID).append('<li id="li_'+deptlist.data[i].DepartmentID+'"> <div   data-DepartmentID="'+deptlist.data[i].DepartmentID+'"> <a href="javascript: void(0)" onclick="chartTab_Y03_organization_show_emplist(this.parentNode)" > <img src="' + localStorage.human + '/Employee/'+deptlist.data[i].DepartmentManager+'/showImages?_dc='+ (+new Date()) +'"  style="width:100px;height:100px;" ></a>  <div class="chartTab_Y03_organization_card_info"> <p>'+deptlist.data[i].DepartmentName+'</br>'+deptlist.data[i].EmployeeName+'</p>  </div>  <span onclick="chartTab_Y03_organization_show_deptlist(this.parentNode);chartTab_Y03_organization_check_active(this.parentNode);"></span> </div>    <ul id="ul_'+deptlist.data[i].DepartmentID+'" style="display:none;"></ul>  </li>');
									}
								if (deptlist.count>0){
									$('#ul_'+dept_ID).hide().slideDown();
								}
								else {
									
						}
			},null,null);	
		<!-- ... 取得部門_及部門管理員END ... -->	 
		}
		else{
			$('#ul_'+dept_ID).slideToggle();
		}
	 }
	 

//----------------組織圖下方展開箭頭
	function chartTab_Y03_organization_check_active(parameter){
		if ( $(parameter).hasClass('chartTab_Y03_organization_show_active') ){
			$(parameter).removeClass('chartTab_Y03_organization_show_active');
		}
		else{
			$(parameter).addClass('chartTab_Y03_organization_show_active');
		}	
	}	 
	

//---------------取得部門員工資訊-------
var getShow_emplist_Able = true;
	function chartTab_Y03_organization_show_emplist(parameter){
		if(!getShow_emplist_Able)
		{
			return;
		}
		getShow_emplist_Able = false;
		$('#chartTab_Y03_organization_table_emplist').empty();
		$('#chartTab_Y03_organization_pagination').empty(); 
		
		var dept_ID =  parameter.getAttribute('data-DepartmentID');
		
		<!-- ... 取得部門_員工Start ... -->			
			jqueryAjax_Get(localStorage.human+'/Department/'+ dept_ID + '/emplist?dc=' + (+new Date()) ,function(emplist)
			{
				getShow_emplist_Able = true;
				if (emplist.count>5){ //筆數大於五
					for  ( var i=0;i< 5 ;i++){
							emplist.data[i].EmployeeMobileNumber=chartTab_Y03_check_isunll(emplist.data[i].EmployeeMobileNumber); //判斷是否有資料
							$('#chartTab_Y03_organization_table_emplist').append('<tr>	<td>'+emplist.data[i].EmployeeNumber+'</td>	<td><img src="' + localStorage.human + '/Employee/'+emplist.data[i].EmployeeID+'/showImages?_dc='+(+new Date()) +'" style="width:50px;height:50px;border-radius: 8px;" ></td>	<td>'+emplist.data[i].EmployeeName+'</td>	<td>'+emplist.data[i].EmployeeMainEmail+'</td>	<td>'+emplist.data[i].EmployeeMobileNumber+'</td>	</tr>');
					}								
					var first ='class="chartTab_Y03_organization_page_active"'; //Pagination 頁碼
					for (var j =1;j <= Math.ceil(emplist.count/5);j++){
						$('#chartTab_Y03_organization_pagination').append('<li><a '+first+' href="javascript: void(0)"  onclick="chartTab_Y03_organization_table_page( \'Company\',\''+companyID+'\','+j+');$(\'.chartTab_Y03_organization_page_active\').removeClass(\'chartTab_Y03_organization_page_active\');$(this).addClass(\'chartTab_Y03_organization_page_active\');" > '+j+'</a></li>');									
						first='';
					}
				}
				else {
					for  ( var i=0;i< emplist.count ;i++){
						emplist.data[i].EmployeeMobileNumber=chartTab_Y03_check_isunll(emplist.data[i].EmployeeMobileNumber); //判斷是否有資料
							$('#chartTab_Y03_organization_table_emplist').append('<tr>	<td>'+emplist.data[i].EmployeeNumber+'</td>	<td><img src="' + localStorage.human + '/Employee/'+emplist.data[i].EmployeeID+'/showImages?_dc='+ (+new Date()) +'" style="width:50px;height:50px;border-radius: 8px;" ></td>	<td>'+emplist.data[i].EmployeeName+'</td>	<td>'+emplist.data[i].EmployeeMainEmail+'</td>	<td>'+emplist.data[i].EmployeeMobileNumber+'</td>	</tr>');
					}
				}	
				$('#chartTab_Y03_organization_element_to_pop_up').chartTab_Y03_organization_bPopup();  //出現視窗	
			},null,null);	
		<!-- ... 取得部門_員工END ... -->
	}

//---------------取得公司員工資訊-------
var getCompany_emplist_Able = true;
	function chartTab_Y03_organization_show_Company_emplist(parameter){
		if(!getCompany_emplist_Able)
		{
			return;
		}
		getCompany_emplist_Able = false;
		$('#chartTab_Y03_organization_table_emplist').empty();
		$('#chartTab_Y03_organization_pagination').empty(); 
		
		var companyID =  parameter.getAttribute('data-companyID');
		
		<!-- ... 取得全公司_員工Start ... -->
		jqueryAjax_Get(localStorage.human+'/Company/'+ companyID + '/emplist?dc='+(+new Date()) ,function(emplist)
			{
				getCompany_emplist_Able = true;
				if (emplist.count>5){
							for  ( var i=0;i< 5 ;i++){
									emplist.data[i].EmployeeMobileNumber=chartTab_Y03_check_isunll(emplist.data[i].EmployeeMobileNumber); //判斷是否有資料
									$('#chartTab_Y03_organization_table_emplist').append('<tr>	<td>'+emplist.data[i].EmployeeNumber+'</td>	<td><img src="' + localStorage.human + '/Employee/'+emplist.data[i].EmployeeID+'/showImages?_dc='+ (+new Date()) +'" style="width:50px;height:50px;border-radius: 8px;" ></td>	<td>'+emplist.data[i].EmployeeName+'</td>	<td>'+emplist.data[i].EmployeeMainEmail +'</td>	<td>'+emplist.data[i].EmployeeMobileNumber+'</td>	</tr>');
							}				
							var first ='class="chartTab_Y03_organization_page_active"';
							for (var j =1;j <= Math.ceil(emplist.count/5);j++){
								$('#chartTab_Y03_organization_pagination').append('<li><a '+first+' href="javascript: void(0)"  onclick="chartTab_Y03_organization_table_page( \'Company\',\''+companyID+'\','+j+');$(\'.chartTab_Y03_organization_page_active\').removeClass(\'chartTab_Y03_organization_page_active\');$(this).addClass(\'chartTab_Y03_organization_page_active\');" > '+j+' </a></li>');									
								first='';
							}
						}
						else {
							for  ( var i=0;i< emplist.count ;i++){
									emplist.data[i].EmployeeMobileNumber=chartTab_Y03_check_isunll(emplist.data[i].EmployeeMobileNumber); //判斷是否有資料
									$('#chartTab_Y03_organization_table_emplist').append('<tr>	<td>'+emplist.data[i].EmployeeNumber+'</td>	<td><img src="' + localStorage.human + '/Employee/'+emplist.data[i].EmployeeID+'/showImages?_dc='+  (+new Date())  +'" style="width:50px;height:50px;border-radius: 8px;" ></td>	<td>'+emplist.data[i].EmployeeName+'</td>	<td>'+emplist.data[i].EmployeeMainEmail+'</td>	<td>'+emplist.data[i].EmployeeMobileNumber+'</td>	</tr>');
							}
						}
						
						$('#chartTab_Y03_organization_element_to_pop_up').chartTab_Y03_organization_bPopup();  //出現視窗
			},null,null);	
		<!-- ... 取得全公司_員工END ... -->
		
	}
	
//某最多五筆員工資訊

function chartTab_Y03_organization_table_page(this_unit,this_ID,start){ 
		$('#chartTab_Y03_organization_table_emplist').empty();
		jqueryAjax_Get(localStorage.human+'/' +this_unit+"/" + this_ID + "/emplist?dc="+(+new Date())+"&start="+(start*5-5)+"&limit=5",function(emplist)
		{
			$('#chartTab_Y03_organization_table_emplist').hide();
			for  ( var i=0;i< emplist.count ;i++){
					emplist.data[i].EmployeeMobileNumber=chartTab_Y03_check_isunll(emplist.data[i].EmployeeMobileNumber); //判斷是否有資料
					$('#chartTab_Y03_organization_table_emplist').append('<tr>	<td>'+emplist.data[i].EmployeeNumber+'</td>	<td><img src="' + localStorage.human + '/Employee/'+emplist.data[i].EmployeeID+'/showImages?_dc='+(+new Date())+'" style="width:50px;height:50px;border-radius: 8px;" ></td>	<td>'+emplist.data[i].EmployeeName+'</td>	<td>'+emplist.data[i].EmployeeMainEmail+'</td>	<td>'+emplist.data[i].EmployeeMobileNumber+'</td>	</tr>');
			}
			$('#chartTab_Y03_organization_table_emplist').show("slow");
		},null,null);	
	}	
	
//空值回傳無 

function chartTab_Y03_check_isunll(obj)  
  {  
     if (typeof(obj) == 'undefined' || obj == null)  return '無資料';  
      return obj;  
}  
	