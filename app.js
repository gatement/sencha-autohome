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
var GetUserSessionUrl = 'http://tp.wolf.com:8080/user/session/jsonp';
var WebSocketUrl = "ws://tp.wolf.com:8080/device/socket";

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
	debugger;
	for(var i=0; i< data.length; i++)
	{
		switch(data[i].type)
		{
			case "arduino":
				update_arduino(data[i]);
				break;
			case "windows":
				update_windows(data[i]);
				break;
			case "linux":
				update_linux(data[i]);
				break;
		}
	}
}

function list_devices_error(data) 
{
	Ext.Msg.alert(data);
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
