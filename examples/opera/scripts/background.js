/*
   Example Opera Extension - microformat-shiv
   Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
   MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
   
   */
   
var data = {},
	button,
	buttonProperties;

buttonProperties = {
	disabled: false,
	title: "BETA DEVELOPMENT VERSION - Displays microformats from a page.",
	icon: "images/icon-18.png",
	popup: {
		href: "popup.html",
		width: 780,
		height: 600
	},
};

button = opera.contexts.toolbar.createItem(buttonProperties);
opera.contexts.toolbar.addItem(button);


function tabChange() {
	var tab = opera.extension.tabs.getFocused();
	if(!!tab.port) {
		tab.postMessage({'method': 'getData'});
	}
	button.icon = "images/icon-18-gray.png";
}
opera.extension.tabs.onfocus = tabChange;



opera.extension.onmessage = function(event) {
	if(event.data.method === 'storeData'){
		data = event.data;

		var tab = opera.extension.tabs.getFocused();
		if(!!tab.port) {
			if(event.data.data && event.data.data.items.length > 0){
				button.icon = "images/icon-18.png";
			}
		}
	}
};


function getMicroformatData(){
	return data;
}


	




