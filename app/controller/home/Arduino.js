Ext.define('Autohome.controller.home.Arduino', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			windowspcBtn: 'card_home_arduino #windowspc',
			switch2Btn: 'card_home_arduino #switch2',
			switch3Btn: 'card_home_arduino #switch3'
		},
		control: {
			windowspcBtn: {
				tap: 'tungle_windowspc'
			},
			switch2Btn: {
				tap: 'tungle_switch2'
			},
			switch3Btn: {
				tap: 'tungle_switch3'
			},
		},
	},

	tungle_windowspc: function(target)
	{
		var badgeText = target.getBadgeText();
		if(badgeText)
		{
			target.setBadgeText(null);
		}
		else
		{
			target.setBadgeText('on');
		}
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
