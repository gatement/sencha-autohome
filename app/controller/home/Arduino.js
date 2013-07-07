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
		var status = 1;
		var badgeText = target.getBadgeText();
		if(badgeText)
		{
			status = 0;
		}

		var deviceType = 'arduino';
		var switchId = '1';
		update_switch_status(deviceType, switchId, status);
	},

	tungle_switch2: function(target)
	{
		var status = 1;
		var badgeText = target.getBadgeText();
		if(badgeText)
		{
			status = 0;
		}

		var deviceType = 'arduino';
		var switchId = '2';
		update_switch_status(deviceType, switchId, status);
	},

	tungle_switch3: function(target)
	{
		var status = 1;
		var badgeText = target.getBadgeText();
		if(badgeText)
		{
			status = 0;
		}

		var deviceType = 'arduino';
		var switchId = '3';
		update_switch_status(deviceType, switchId, status);
	}
});
