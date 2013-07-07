Ext.application({
	name: "Autohome",

	requires: [
		'Autohome.view.Login',
		'Autohome.view.Main'
	],

	views: [
		'Main',
		'Login'
	],

	controllers: [
		'Login',
		'home.Arduino', 
		'home.Windows', 
		'home.Linux'
	],

	launch: function() {
		Ext.Viewport.add({
			xclass: 'Autohome.view.Login' 
		});
	}
});

var SessionKey = 'usr_sid';
var sessionVal = null;
var MyWebSocket = null;
var myWebSocket = null;
var GetUserSessionUrl = 'https://tools.johnson.uicp.net:88/user/session/jsonp';
var WebSocketUrl = "wss://tools.johnson.uicp.net:88/device/socket";

function login_success(sessionId)
{
	window.sessionVal = sessionId;

	Ext.ComponentQuery.query('card_login')[0].destroy();
	Ext.Viewport.add({
		xclass: 'Autohome.view.Main' 
	});
	
	socket_init();
	socket_connect();
}

//============ helpers ======================================================================
function update_arduino(data, animation)
{
	titlebar = Ext.ComponentQuery.query('card_home_arduino titlebar')[0];
	offlineContainer = Ext.ComponentQuery.query('card_home_arduino #offline')[0];
	onlineContainer = Ext.ComponentQuery.query('card_home_arduino #online')[0];

	titlebar.setTitle(data.name);

	if(data.online)
	{
		offlineContainer.hide(animation);
		onlineContainer.show(animation);

		windowspcBtn = Ext.ComponentQuery.query('card_home_arduino #windowspc')[0];
		switch2Btn = Ext.ComponentQuery.query('card_home_arduino #switch2')[0];
		switch3Btn = Ext.ComponentQuery.query('card_home_arduino #switch3')[0];
		
		if(data.values.switch1 === 'on')
		{
			windowspcBtn.setBadgeText('on');
		}
		else
		{
			windowspcBtn.setBadgeText(null);
		}

		if(data.values.switch2 === 'on')
		{
			switch2Btn.setBadgeText('on');
		}
		else
		{
			switch2Btn.setBadgeText(null);
		}

		if(data.values.switch3 === 'on')
		{
			switch3Btn.setBadgeText('on');
		}
		else
		{
			switch3Btn.setBadgeText(null);
		}
	}
	else
	{
		offlineContainer.show(animation);
		onlineContainer.hide(animation);
	}
}

function update_windows(data, animation)
{
	titlebar = Ext.ComponentQuery.query('card_home_windows titlebar')[0];
	offlineContainer = Ext.ComponentQuery.query('card_home_windows #offline')[0];
	onlineContainer = Ext.ComponentQuery.query('card_home_windows #online')[0];

	titlebar.setTitle(data.name);

	if(data.online)
	{
		offlineContainer.hide(animation);
		onlineContainer.show(animation);
	}
	else
	{
		offlineContainer.show(animation);
		onlineContainer.hide(animation);
	}
}

function update_linux(data, animation)
{
	titlebar = Ext.ComponentQuery.query('card_home_linux titlebar')[0];
	offlineContainer = Ext.ComponentQuery.query('card_home_linux #offline')[0];
	onlineContainer = Ext.ComponentQuery.query('card_home_linux #online')[0];

	titlebar.setTitle(data.name);

	if(data.online)
	{
		offlineContainer.hide(animation);
		onlineContainer.show(animation);
	}
	else
	{
		offlineContainer.show(animation);
		onlineContainer.hide(animation);
	}
}

function get_device_id(deviceType)
{
	switch(deviceType)
	{
		case 'arduino':
			return '000000000002';
			break;
		case 'windows':
			return '000000000003';
			break;
		case 'linux':
			return '000000000004';
			break;
		default:
			return '';
	}
}

//============ web socket operations ===========================================================
function update_socket() 
{
	var msg = {
		cmd: "update_socket",
		sid: window.sessionVal,
		data: ""
	};
	this.socket_send_msg(msg);
}

function update_socket_success(data) 
{
}

function update_socket_error(data) 
{			
	Ext.Msg.alert(data);
}

function list_devices()
{
	var msg = {
		cmd: "list_devices",
		sid: window.sessionVal,
		data: ""
	};
	this.socket_send_msg(msg);
}

function list_devices_success(data) 
{
	for(var i=0; i< data.length; i++)
	{
		switch(data[i].type)
		{
			case "arduino":
				update_arduino(data[i], false);
				break;
			case "windows":
				update_windows(data[i], false);
				break;
			case "linux":
				update_linux(data[i], false);
				break;
		}
	}
}

function list_devices_error(data) 
{
	Ext.Msg.alert(data);
}

function update_switch_status(deviceType, switchId, status) 
{
	var deviceId = get_device_id(deviceType);
	var msg = {
		cmd: "update_switch_status",
		sid: window.sessionVal,
		data: {"device_id": deviceId, "switch_id": switchId, "status": status}
	};
	this.socket_send_msg(msg);
}

function update_switch_status_success(data) 
{
}

function update_switch_status_error(data) 
{			
	Ext.Msg.alert(data);
}

function send_command(deviceType, cmd) 
{
	var deviceId = get_device_id(deviceType);
	var msg = {
		cmd: "send_command",
		sid: window.sessionVal,
		data: {"device_id": deviceId, "cmd": cmd}
	};
	socket_send_msg(msg);
}

function send_command_success(data) 
{
}

function send_command_error(data) 
{			
	Ext.Msg.alert(data);
}

function device_status_changed_success(data) 
{
	switch(data.type)
	{
		case "arduino":
			update_arduino(data, true);
			break;
		case "windows":
			update_windows(data, true);
			break;
		case "linux":
			update_linux(data, true);
			break;
	}
}

//============ web socket ======================================================================
function socket_init()
{
	if (window.WebSocket) window.MyWebSocket = window.WebSocket;
	if (!window.MyWebSocket && window.MozWebSocket) window.MyWebSocket = window.MozWebSocket;
	if (!window.MyWebSocket)
	{
		Ext.Msg.alert("Your browser is not supported. Please use Firefox or Google Chrome.");
	}
}

function socket_connect()
{
	var socket_on_open = function()
	{
		// upate session to the new socket PID whenever connect(re-connect)
		update_socket();

		list_devices();
	};

	var socket_on_message = function(msg)
	{
		if(msg.data)
		{
			var response = window.JSON.parse(msg.data);
			if(response.success)
			{
				window[response.cmd + "_success"].apply(this, [response.data]);
			}
			else
			{
				window[response.cmd + "_error"].apply(this, [response.data]);
			}
		}

		// log
		if(console && console.log)
		{
			console.log("received: %o", msg);
		}
	};

	var socket_on_close = function()
	{
		if(console && console.log)
		{
			console.log("Socket is closed, is reconnecting...");
		}
		window.setTimeout(function(){socket_connect();}, 6000);
	};
	
	myWebSocket = new window.MyWebSocket(WebSocketUrl);
	myWebSocket.onopen = socket_on_open;
	myWebSocket.onmessage = socket_on_message;
	myWebSocket.onclose = socket_on_close;
}

function socket_send_msg(msgObj)
{
	if(myWebSocket && myWebSocket.readyState === myWebSocket.OPEN && msgObj)
	{
		var msg = window.JSON.stringify(msgObj);
		var sendResult = myWebSocket.send(msg);
		
		if(sendResult === false)
		{
			window.setTimeout(function(){socket_send_msg(msgObj);}, 5000);
			if(console && console.log)
			{
				console.log("Communication error, is retrying...");
			}
		}
	}
	else
	{
		if(console && console.log)
		{
			console.log("Communication error, is retrying...");
		}
		window.setTimeout(function(){socket_send_msg(msgObj);}, 5000);
	}

	// log
	if(console && console.log)
	{
		console.log("sending: %o", msgObj);
	}
}
