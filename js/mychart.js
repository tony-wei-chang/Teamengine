//Jquery 準備好
$(document).ready(function()
{
	try
	{
		//各部門達成率統計
		var  view_com = {};
		view_com.Title = "執行力分析";
		view_com.Content = "各部門達成率";
		view_com.Content_Func = function()
		{
			createDeptChartWindow(); 
		}
		createMainpage_Menu(view_com);
		$("div[myId='各部門達成率']").css('margin-left','-22px');
		
		//部門達成率統計
		var  view_dept = {};
		view_dept.Title = "執行力分析";
		view_dept.Content = "查詢部門內達成率";
		view_dept.Content_Func = function()
		{
			createSelectdeptChartWindow(); 
		}
		createMainpage_Menu(view_dept);
		$("div[myId='查詢部門內達成率']").css('margin-left','5px');
		
		//員工達成率
		var  view_emp = {};
		view_emp.Title = "執行力分析";
		view_emp.Content = "查詢員工達成率";
		view_emp.Content_Func = function()
		{
			createSelectEmpChartWindow();
		}
		createMainpage_Menu(view_emp);
		$("div[myId='查詢員工達成率']").css('margin-left','-8px');
		
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

//公司各部門的達成率
function createDeptChartWindow()
{
	try
	{
		//新增一個 tab
		addTab('mychart_Y03_Dept_content',"各部門狀況");
		//取得daily Content
		
		$('#mychart_Y03_Dept_content').empty();
		$('#mychart_Y03_Dept_content').append('<div id="mychart_Y03_Dept_content_main" ></div>');
		$('#mychart_Y03_Dept_content_main').css({'word-wrap': 'break-word',  'overflow': 'auto','height':'100%','padding-top':'10vh','margin':'0px','text-align':'center'});
				
		
		$('#mychart_Y03_Dept_content_main').append('<div><input type="button" value="成功率" data-stat="success" onclick="btn_action(this,myBarChart);"></input>		<input type="button" value="失敗率" data-stat="fail" onclick="btn_action(this,myBarChart);"></input>		<input type="button" value="廢單率" data-stat="quit" onclick="btn_action(this,myBarChart);"></input>		<input type="button" value="公司總體分析" data-stat="test" onclick="btn_action(this,myBarChart);"></input>		<input type="button" value="積分榜" data-stat="rank" onclick="btn_action(this,myBarChart);"></input>	</div>');
		
			
		
		$('#mychart_Y03_Dept_content_main').append('<H2>各部門工單狀態統計圖</H2>');
		$('#mychart_Y03_Dept_content_main').append('<H1 id="my_title"></H1>');
		$('#mychart_Y03_Dept_content_main').append('<canvas id="mychart_Y03_Dept_myChart" style="width:60vw;height:50vh;"></canvas>');
		
			 data = {
			labels: ["A部門", "B部門", "C部門", "D部門", "E部門", "F部門", "G部門"],
			datasets: [
				{
					label: "歸零",
					fillColor: "rgba(100,220,220,0.5)",
					strokeColor: "rgba(100,220,220,0.8)",
					highlightFill: "rgba(100,220,220,0.75)",
					highlightStroke: "rgba(100,220,220,1)",
					data: [0, 0,0,0,0,0,0],
					workload: [0,0, 0, 0,0, 0, 0]
				}
			]
			};	
		 var ctx = document.getElementById("mychart_Y03_Dept_myChart").getContext("2d");
	 	myBarChart = new Chart(ctx).Bar(data);
		
		
	}
		

	
	catch(err)
	{
		if(App_Debug)
		{
			console.log(err);
		}
	}

}

//某部門內員工達成率
function createSelectdeptChartWindow()
{
	try
	{
		//新增一個 tab
		addTab('mychart_Y03_content',"部門內統計");
		//取得daily Content
		
		
		
		$('#mychart_Y03_content').empty();
		$('#mychart_Y03_content').append('<div id="mychart_Y03_content_main" ></div>');
		$('#mychart_Y03_content_main').css({'word-wrap': 'break-word',  'overflow': 'auto','height':'100%'});
		
		//---------------開始刻CSS
		var mychart_Y03_content_css ='';

		//組織圖
		mychart_Y03_content_css +='#yo_g {padding-top:10vh;margin: 0px auto;text-align:center;}';

		$('#mychart_Y03_content_main').append('<style>'+mychart_Y03_content_css+'</style>');
		//-----------結束CSS
		
		
		
		$('#mychart_Y03_content_main').append('<div id="yo_g" ></div>');
		
		
		$('#yo_g').append('<div><input type="button" value="成功率" data-stat="success" onclick="btn_action(this,myBarChart);"></input>		<input type="button" value="失敗率" data-stat="fail" onclick="btn_action(this,myBarChart);"></input>		<input type="button" value="廢單率" data-stat="quit" onclick="btn_action(this,myBarChart);"></input>		<input type="button" value="該部門總體分析" data-stat="test" onclick="btn_action(this,myBarChart);"></input>		<input type="button" value="積分榜" data-stat="rank" onclick="btn_action(this,myBarChart);"></input>	</div>');
		
		$('#yo_g').append('<H2 >某部門內員工達成率</H2>');
		$('#yo_g').append('<H1 id="my_title"></H1>');
		$('#yo_g').append('<canvas id="myChart" style="width:60vw;height:50vh;"></canvas>');
		
			 data = {
			labels: ["A員工", "B員工", "C員工", "D員工", "E員工", "F員工", "G員工"],
			datasets: [
				{
					label: "歸零",
					fillColor: "rgba(100,220,220,0.5)",
					strokeColor: "rgba(100,220,220,0.8)",
					highlightFill: "rgba(100,220,220,0.75)",
					highlightStroke: "rgba(100,220,220,1)",
					data: [0, 0,0,0,0,0,0],
					workload: [0,0, 0, 0,0, 0, 0]
				}
			]
			};	
		 var ctx = document.getElementById("myChart").getContext("2d");
	 	myBarChart = new Chart(ctx).Bar(data);
		
		
		try{
		//定義介面
		var selectTask_Window = Window_Define.Initialize();
		selectTask_Window.setMask(true);
		selectTask_Window.setWidth(300);
		selectTask_Window.setHeight(150);
		selectTask_Window.setId('selectTask_Window');
		selectTask_Window.setTitle('查看部門達成率');
		selectTask_Window.show();
		selectTask_Window.addCombobox('selectTaskDeptment','選擇部門 :');
		//撈取部門項目
		var dc = (+new Date());
		jqueryAjax_Get(localStorage.human+'/Department/all?_dc='+dc,function(Result)
					{
						for(var i=0;i<Result.data.length;i++)
						{
							$('#selectTaskDeptment').append('<option disabled="" hidden="" selected=""></option><option value="' + Result.data[i].DepartmentID + '">' + Result.data[i].DepartmentName + '</option>');
						}
					},null,null);

		selectTask_Window.addYesNO_Button('','確認',null,
			//Yes Function
			function(){
		
				selectTask_Window.close();
			});
		//隱藏 No 按鈕
		$('#selectTask_Window_No').css("display","none");
		//置中 Yes 按鈕
		$('#selectTask_Window_Yes').css({"margin-left":"0px","width":"100%"});

		//定義ＣＳＳ
		$('#selectTaskDeptment').css({
			"text-align":"center"
		});
		$('#selectTaskEmployee').css({
			"text-align":"center"
		});

	}catch(err){
		if(App_Debug)
		{
			console.log(err);
		}
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

function createSelectEmpChartWindow(){
	try{
		//定義介面
		var selectTask_Window = Window_Define.Initialize();
		selectTask_Window.setMask(true);
		selectTask_Window.setWidth(300);
		selectTask_Window.setHeight(200);
		selectTask_Window.setId('selectTask_Window');
		selectTask_Window.setTitle('查詢員工達成率');
		selectTask_Window.show();
		selectTask_Window.addCombobox('selectTaskDeptment','選擇部門 :');
		selectTask_Window.addCombobox('selectTaskEmployee','選擇人員 :');
		//撈取部門項目
		var dc = (+new Date());
		jqueryAjax_Get(localStorage.human+'/Department/all?_dc='+dc,function(Result)
					{
						for(var i=0;i<Result.data.length;i++)
						{
							$('#selectTaskDeptment').append('<option disabled="" hidden="" selected=""></option><option value="' + Result.data[i].DepartmentID + '">' + Result.data[i].DepartmentName + '</option>');
						}
					},null,null);
		$('#selectTaskDeptment').change(function(){
			$('#selectTaskEmployee').empty();
			//撈取員工項目
			var dc = (+new Date());
			jqueryAjax_Get(localStorage.daily+'/Department/'+$('#selectTaskDeptment').val()+'/empList?_dc='+dc,function(Result)
						{
							for(var i=0;i<Result.data.length;i++)
							{
								$('#selectTaskEmployee').append('<option disabled="" hidden="" selected=""></option><option value="' + Result.data[i].EmployeeID + '">' + Result.data[i].EmployeeName + '</option>');
							}
						},null,null);
		});

		selectTask_Window.addYesNO_Button('','確認',null,
			//Yes Function
			function(){
				//送出資料
				selectTask_Window.close();
			});
		//隱藏 No 按鈕
		$('#selectTask_Window_No').css("display","none");
		//置中 Yes 按鈕
		$('#selectTask_Window_Yes').css({"margin-left":"0px","width":"100%"});

		//定義ＣＳＳ
		$('#selectTaskDeptment').css({
			"text-align":"center"
		});
		$('#selectTaskEmployee').css({
			"text-align":"center"
		});

	}catch(err){
		if(App_Debug)
		{
			console.log(err);
		}
	}

}


my_canvas='<canvas id="myChart" style="width:60vw;height:50vh;"></canvas>';
	

	
	 data2 = {
    labels: ["A員工", "B員工", "C員工", "D員工", "E員工", "F員工", "G員工"],
    datasets: [
        {
            label: "達成率",
            fillColor: "rgba(100,220,220,0.5)",
            strokeColor: "rgba(100,220,220,0.8)",
            highlightFill: "rgba(100,220,220,0.75)",
            highlightStroke: "rgba(100,220,220,1)",
            data: [5, 16, 30, 35, 24, 20, 48],
			workload: [2,4, 6, 8,10, 22, 24]
        }
	]
	};	
	
	 data3 = {
    labels: ["A員工", "B員工", "C員工", "D員工", "E員工", "F員工", "G員工"],
    datasets: [
        {
            label: "失敗率",
            fillColor: "rgba(239,35,60,0.5)",
            strokeColor: "rgba(239,35,60,0.8)",
            highlightFill: "rgba(239,35,60,0.75)",
            highlightStroke: "rgba(239,35,60,1)",
            data: [1, 4, 30, 40, 60, 70, 10],
			workload: [8,9, 4, 10,10, 10, 5]
        }
	]
	};
	 data4 = {
    labels: ["A員工", "B員工", "C員工", "D員工", "E員工", "F員工", "G員工"],
    datasets: [
        {
            label: "廢單率",
            fillColor: "rgba(255,224,102,0.5)",
            strokeColor: "rgba(255,224,102,0.8)",
            highlightFill: "rgba(255,224,102,0.75)",
            highlightStroke: "rgba(255,224,102,1)",
            data: [5, 9, 6, 7, 14, 20, 42],
			workload: [8,54, 20, 14,54, 2, 21]
        }
	]
	}; 
	data6= {
    labels: ["A員工", "B員工", "C員工", "D員工", "E員工", "F員工", "G員工"],
    datasets: [
        {
            label: "積分",
            fillColor: "rgba(255,159,62,0.5)",
            strokeColor: "rgba(255,159,62,0.8)",
            highlightFill: "rgba(255,159,62,0.75)",
            highlightStroke: "rgba(255,159,62,1)",
            data: [5, 9, 6, 7, 14, 20, 42],
            workload: [2, 3, 2, 4, 10, 16, 24]
        }
	]
	};
	 data5 = [
    {
        value: 48,
		workload:24,
        color:"rgba(100,220,220,0.5)",
        highlight: "rgba(100,220,220,1)",
        label: "成功率"
    },
    {
        value: 10,
		workload:5,
        color: "rgba(239,35,60,0.5)",
        highlight: "rgba(239,35,60,1)",
        label: "失敗率"
    },
    {
        value: 42,
		workload:21,
        color: "rgba(255,224,102,0.5)",
        highlight: "rgba(255,224,102,1)",
        label: "廢單率"
    }
];

	
	
	
	var options={
		//Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
		scaleBeginAtZero : true,
		
		//Boolean - Whether grid lines are shown across the chart
		scaleShowGridLines : true,

		//String - Colour of the grid lines 內框線
		scaleGridLineColor : "rgba(0,0,0,.09)",

		//Number - Width of the grid lines 內框線框度
		scaleGridLineWidth : 1,

		//Number - Pixel width of the bar stroke
		barStrokeWidth : 2,
		
		//Interpolated JS string - can access value 左方數值顯示
		scaleLabel : '<%=value + "%" %>',

		//Number - Spacing between each of the X value sets 相間距離
		barValueSpacing : 10,

		//Number - Spacing between data sets within X values 同組內相間距離
		barDatasetSpacing : 1,
		
		
		//上方顯示 *% / * 件
		tooltipTemplate: function (d) {
		    var index = (data.labels.indexOf(d.label));
			return  d.value + '% / ' +  data.datasets[0].workload[index]  +' 件';
		},
		
		//圖表繪製完成，執行顯示
        onAnimationComplete: function()
        {   
            this.showTooltip(this.datasets[0].bars, true);
        },
		
		//關閉滑鼠在圖上動作
        tooltipEvents: []
        
       
		
	}
	

	
	function btn_action(parameter,myBarChart){
		
		
		$('#myChart').remove();
		$('#yo_g').append(my_canvas);
		var ctx = document.getElementById("myChart").getContext("2d");
		
		
		switch(parameter.getAttribute('data-stat')) {
			case 'success':
					data = data2;
					$('#my_title').text(data.datasets[0].label) ;
					myBarChart = new Chart(ctx).Bar(data, options);
				break;
			case 'fail':
					data = data3;
					$('#my_title').text(data.datasets[0].label) ;
					myBarChart = new Chart(ctx).Bar(data, options);
				break;
			case 'quit':	
					data = data4;
					$('#my_title').text(data.datasets[0].label) ;
					myBarChart = new Chart(ctx).Bar(data, options);
				break;
			case 'rank':	
					data = data6;
					$('#my_title').text(data.datasets[0].label) ;
					myBarChart = new Chart(ctx).Bar(data, options);
				break;
			case 'test':	
			
					data= data5;
					$('#my_title').text('G員工總表') ;
					index = 0; 
					myBarChart = new Chart(ctx).Pie(data5,{
						tooltipTemplate: function (d) {
							console.log(data[index].workload);
							temp =d.label +':'+ d.value + '% / ' +  data[index].workload  +' 件'
							index++;
							return  temp;
						},
						animationSteps : 50,
						onAnimationComplete: function()
						{
							this.showTooltip(this.segments, true);
						},
						
						tooltipEvents: [],
						
						showTooltips: true
					});
				break;
		}
	
	}