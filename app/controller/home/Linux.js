Ext.define('Autohome.controller.home.Linux', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			poweroffBtn: 'card_home_linux #poweroff',
			rebootBtn: 'card_home_linux #reboot'
		},
		control: {
			poweroffBtn: {
				tap: 'poweroff'
			},
			rebootBtn: {
				tap: 'reboot'
			}
		},
	},

	poweroff: function()
	{
		Ext.Msg.alert('power off');
	},

	reboot: function()
	{
		Ext.Msg.alert('reboot');
	}
});
