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
		var deviceType = 'windows';
		var cmd = 'poweroff';
		send_command(deviceType, cmd);
	},

	reboot: function()
	{
		var deviceType = 'windows';
		var cmd = 'restart';
		send_command(deviceType, cmd);
	}
});
