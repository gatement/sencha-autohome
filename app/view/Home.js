Ext.define('Controller.view.Home', {
	extend: 'Ext.tab.Panel',
	xtype: 'homecard',
	requires: [
		'Controller.view.home.Controller',
		'Controller.view.home.Computer'
	],

	config: {
		title: 'Home',
		iconCls: 'home',
		defaults: {
			styleHtmlContent: true
		},
		items: [
			{ 
				xtype: 'homecontrollercard' 
			},
			{ 
				xtype: 'homecomputercard',
				title: 'Windows'
			},
			{ 
				xtype: 'homecomputercard',
				title: 'Linux'
			}
		]
	}
});
