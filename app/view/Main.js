Ext.define('Controller.view.Main', {
	extend: 'Ext.tab.Panel',
	requires: [
		'Controller.view.Home',
		'Controller.view.Settings'
	],

	config: {
		tabBar: {
			docked: 'bottom',
			layout: {
				pack: 'center'
			}
		},
		defaults: {
			html: 'placeholder text',
			styleHtmlContent: true
		},
		items: [
			{ xtype: 'homecard' },
			{ xtype: 'settingscard' }
		]	
	}
})
