Ext.define('Controller.controller.home.Controller', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			windowpc: 'homecontrollercard button[action=windowpc]',
			switch2: 'homecontrollercard button[action=switch2]',
			switch3: 'homecontrollercard button[action=switch3]'
		},
		control: {
			windowpc: {
				tap: 'tungle_windowpc'
			},
			switch2: {
				tap: 'tungle_switch2'
			},
			switch3: {
				tap: 'tungle_switch3'
			},
		},
		
	},

	tungle_windowpc: function()
	{
		Ext.Msg.alert('tungle windowpc');
	},

	tungle_switch2: function()
	{
		Ext.Msg.alert('tungle switch2');
	},

	tungle_switch3: function()
	{
		Ext.Msg.alert('tungle switch3');
	}
});
