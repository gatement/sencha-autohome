Ext.define('Autohome.controller.home.Windows', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			poweroffBtn: 'card_home_windows #poweroff',
			rebootBtn: 'card_home_windows #reboot'
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
