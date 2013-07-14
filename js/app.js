if(typeof(settings) === 'undefined') {
	settings = {};
}
settings.sessionVal = null;
settings.MyWebSocket = null;
settings.myWebSocket = null;
settings.GetUserSessionUrl = 'https://tools.johnson.uicp.net:88/user/session/jsonp';
settings.WebSocketUrl = "wss://tools.johnson.uicp.net:88/device/socket";

function app_start() {
	Ext.application({
		name: "Autohome",

		requires: [
		'Autohome.view.Login',
		'Autohome.view.Main',
		'Autohome.view.Arduino',
		'Autohome.view.Windows',
		'Autohome.view.Linux',
		'Autohome.view.Settings'
		],

		views: [
		'Login',
		'Main',
		'Arduino',
		'Windows',
		'Linux',
		'Settings'
		],

		controllers: [
		'Login',
		'Main',
		'Arduino', 
		'Windows', 
		'Linux',
		'Settings'
		],

		launch: function() {
			Ext.Viewport.add({
				xclass: 'Autohome.view.Login' 
			});
		}
	});
}

app_start();
