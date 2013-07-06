Ext.define('Autohome.view.home.Arduino', {
	extend: 'Ext.Container',
	xtype: 'card_home_arduino',

	config: {
		title: 'Arduino',
		scrollable: 'vertical',
		layout: {
			type: 'vbox',
			align: 'middle'
		},
		defaults: { 
			styleHtmlContent: true
	   	},
		items: [
			{
				itemId: "offline",
				xtype: "container",
				padding: 10,
				html: "<h2>offline</h2>"
			},
			{ 
				itemId: "online",
				hidden: true,
				xtype: "container",
				padding: 10,
				width: '100%',
				defaults: { 
					xtype: 'button',
					margin: 10,
					height: 50,
					width: '90%',
					ui: 'normal'
				},
				items: [
					{
						itemId: 'windowspc',
						text: 'window pc'
					},
					{ 
						itemId: 'switch2',
						text: 'switch2'
					},
					{ 
						itemId: 'switch3',
						text: 'switch3'
					}
				]
			}
		]
	}
});
