Ext.define('Autohome.view.Home', {
	extend: 'Ext.tab.Panel',
	xtype: 'card_home',
	requires: [
		'Autohome.view.home.Arduino',
		'Autohome.view.home.Windows',
		'Autohome.view.home.Linux'
	],

	config: {
		title: 'Home',
		iconCls: 'home',
		items: [
			{ 
				xtype: 'card_home_arduino' 
			},
			{ 
				xtype: 'card_home_windows'
			},
			{ 
				xtype: 'card_home_linux'
			}
		]
	}
});
