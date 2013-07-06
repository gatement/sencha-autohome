Ext.define('Autohome.view.Login', {
	extend: 'Ext.form.Panel',
	xtype: 'card_login',

	config: {
		title: 'Login',
		iconCls: 'user',
		fullscreen: true,
		layout: {
			type: 'vbox',
			align: 'middle'
		},
		items: [
			{
				xtype: 'label',
				html: '<h2>Please Login</h2>',
				margin: 15
			},
			{
				xtype: 'textfield',
				label: 'Name',
				name: 'username',
				placeHolder: 'Enter your name',
				autoComplete: true,
				width: '100%'
			},
			{
				xtype: 'passwordfield',
				label: 'Password',
				name: 'password',
				placeHolder: 'Enter your password',
				width: '100%'
			},
			{
				itemId: 'login',
				xtype: 'button',
				text: 'Login',
				margin: 10,
				width: '90%',
				height: 50,
				ui: 'confirm',
			}
		]
	}
});
