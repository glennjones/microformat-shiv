/*
   Example Chrome Extension - microformat-shiv
   Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
   MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
   
   */


function init() {

  chrome.windows.getCurrent(function(win) {
    chrome.tabs.query({active:true, windowId:win.id}, function(tabs) {
     var request = {'method': 'getData', 'tabid': tabs[0].id};
      chrome.extension.sendMessage(request, function(data) {
        show(data);
      });
    });
  });
}

function show( envelope ){
  var code = document.getElementById("code");

  if (envelope && envelope.data){
    code = document.getElementById("code");
    jsonstring = JSON.stringify(envelope.data)
    code.innerText = js_beautify(jsonstring);
    found(envelope.data.items, envelope.url);
  }
}

function found(items, url){
  var found = document.getElementById("found"),
      address = document.getElementById("address"),
      out = [],
      types;

  for (var i=0; i<items.length; i++){
    types = items[i].type;
    for (var x=0; x<types.length; x++){
      if(out.indexOf(types[x]) === -1){
        out.push(types[x])
      }
    }
  }
  found.innerText = " Found: " + out.join(", ");
  address.innerText = url;
}

window.onload = init;

