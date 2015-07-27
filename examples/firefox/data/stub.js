/*
   Example Firefox Addon - microformat-shiv
   Copyright (C) 2010 - 2015 Glenn Jones. All Rights Reserved.
   MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
   
   */
   

var items = Microformats.get( {'textFormat': 'normalised'} ),
	data = {'data': items, 'url': document.location.href};

self.port.emit("storeData",  data);

self.port.on("getData",  function(){
	self.port.emit("storeData",  data);
});
