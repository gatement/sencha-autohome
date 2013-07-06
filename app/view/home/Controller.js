Ext.define('Controller.view.home.Controller', {
	extend: 'Ext.Panel',
	xtype: 'homecontrollercard',

	config: {
		title: 'Controller',
		scrollable: 'vertical',
		defaults: { xtype: 'button' },
		items: [
			{ 
				text: 'window pc (off)',
				action: 'windowpc'
			},
			{ 
				text: 'switch2 (on)',
				action: 'switch2',
			},
			{ 
				text: 'switch3 (off)',
				action: 'switch3'
			}
		]
	}
});
