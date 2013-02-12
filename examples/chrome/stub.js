/*
   Example Chrome Extension - microformat-shiv
   Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
   MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
   
   */


items = microformats.getItems();
if(items && items.items.length > 0){
	var pack = {'method':'storeData', 'data': items, 'url': document.location.href};
	chrome.extension.sendMessage(pack, function(response) {});
}