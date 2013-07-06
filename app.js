Ext.application({
	name: "Controller",

	views: ['Main'],
	controllers: ['home.Controller'],

	launch: function() {
		Ext.Viewport.add({
			xclass: 'Controller.view.Main' 
		});

		my_launch();
	}
});


function my_launch()
{
	//Ext.Msg.alert('launch');		
}
