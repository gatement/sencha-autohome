Ext.define('Autohome.view.Main', {
	extend: 'Ext.tab.Panel',
	requires: [
		'Autohome.view.Home',
		'Autohome.view.Settings'
	],

	config: {
		tabBar: {
			docked: 'bottom',
		},
		items: [
			{ 
				xtype: 'card_home'
			},
			{ 
				xtype: 'card_settings'
			}
		]	
	}
})
