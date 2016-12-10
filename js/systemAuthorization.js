/*系統權限 Y02*/
try
{
	//載入新版首頁
	loadJs('js/home_new.js',function()
	{
		//語言包
		Y02_changeLanguage_HTML(localStorage.getItem('languageStatus'));
		//進度條進入下一個進度
		goProcess();
		//載入公司管理
		loadJs('js/companyManagement.js',function()
		{
			//語言包
			Y02_changeLanguage_HTML(localStorage.getItem('languageStatus'));
			//進度條進入下一個進度
			goProcess();
			//載入部門管理
			loadJs('js/departmentManagement.js',function()
			{
				//語言包
				Y02_changeLanguage_HTML(localStorage.getItem('languageStatus'));
				//進度條進入下一個進度
				goProcess();
				//載入員工管理
				loadJs('js/employeeManagement.js',function()
				{
					//語言包
					Y02_changeLanguage_HTML(localStorage.getItem('languageStatus'));
					//進度條進入下一個進度
					goProcess();
					//載入新版工單
					loadJs('js/task_new.js',function()
					{
						//語言包
						Y02_changeLanguage_HTML(localStorage.getItem('languageStatus'));
						//進度條進入下一個進度
						goProcess();
						//載入個人資料
						loadJs('js/seeImformation.js',function()
						{
							//語言包
							Y02_changeLanguage_HTML(localStorage.getItem('languageStatus'));
							//進度條進入下一個進度
							goProcess();
							//載入日誌
							loadJs('js/daily.js',function()
							{
								//語言包
								Y02_changeLanguage_HTML(localStorage.getItem('languageStatus'));
								//進度條進入下一個進度
								goProcess();
								//載入積分管理
								loadJs('js/rewardManagement.js',function()
								{
									//語言包
									Y02_changeLanguage_HTML(localStorage.getItem('languageStatus'));
									//進度條進入下一個進度
									goProcess();
									//載入流量表
									loadJs('js/flowList.js',function()
									{
										//語言包
										Y02_changeLanguage_HTML(localStorage.getItem('languageStatus'));
										//進度條進入下一個進度
										goProcess();
										//載入執行力分析
										loadJs('js/executionManagement.js',function()
										{
											//語言包
											Y02_changeLanguage_HTML(localStorage.getItem('languageStatus'));
											//進度條進入下一個進度
											goProcess();
											//載入新版工單畫面
											loadJs('js/chart.js',function()
											{
												//語言包
												Y02_changeLanguage_HTML(localStorage.getItem('languageStatus'));
												//進度條進入下一個進度
												goProcess();
											});
										});	
									});
								});
							});
						});
					});
				});
			});
		});
	});

	//執行力分析
	//loadJs('js/mychart.js');
	//舊版工單
	//loadJs('js/task.js');
}
catch(err)
{
	if(App_Debug)
	{
		console.log(err);
	}
}