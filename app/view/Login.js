Ext.define('Autohome.view.Login', {
	extend: 'Ext.Container',

	config: {
		title: 'Login',
		iconCls: 'user',
		fullscreen: true,
		layout: 'vbox',
		items: [
			{
				xtype: 'toolbar',
				title: 'Login'
			},
			{
				xtype: 'formpanel',
				title: 'User Login',
				fullscreen: true,
				url: '/devcie/sdfds',
				layout: 'vbox',
				items: [
					{
						xtype: 'fieldset',
						items: [
							{
								xtype: 'textfield',
								label: 'Name'
							},
							{
								xtype: 'passwordfield',
								label: 'Password'
							}
						]
					},
					{
						xtype: 'button',
						text: 'Login',
						ui: 'confirm',
						handler: function() {
							this.up('formpanel').submit();
						}
					}
				]
			},
			{
				xtype: 'button',
				text: 'b'	
			}
		]
	}
});
