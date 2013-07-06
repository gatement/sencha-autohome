Ext.application({
	name: "Autohome",

	requires: [
		'Autohome.view.Login',
		'Autohome.view.Main'
	],

	views: [
		'Main'
	],

	controllers: [
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

var MyWebSocket = null;
var myWebSocket = null;
var WebSocketUrl = "wss://tools.johnson.uicp.net/device/socket";

function my_launch()
{
	//socket_init();
	//socket_connect();
}

//============ web socket operations ===========================================================
function update_socket() 
{
	var msg = {
		cmd: "update_socket",
		sid: $.cookie(this.sessionCookieId),
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

//============ web socket ======================================================================
function socket_init()
{
	if (window.WebSocket) MyWebSocket = window.WebSocket;
	if (!MyWebSocket && window.MozWebSocket) MyWebSocket = window.MozWebSocket;
	if (!MyWebSocket)
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
	
	myWebSocket = new MyWebSocket(WebSocketUrl);
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
