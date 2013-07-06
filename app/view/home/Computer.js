Ext.define('Controller.view.home.Computer', {
	extend: 'Ext.Panel',
	xtype: 'homecomputercard',

	config: {
		title: 'Computer',
		scrollable: 'vertical',
		defaults: { xtype: 'button' },
		items: [
			{ 
				text: 'poweroff',
				action: 'poweroff'
			},
			{ 
				text: 'reboot',
				action: 'reboot'
			}
		]
	}
});
