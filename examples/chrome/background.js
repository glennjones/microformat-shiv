/*
   Example Chrome Extension - microformat-shiv
   Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
   MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
   
   */

var tabData = {}

chrome.extension.onMessage.addListener(
  function(message, sender, sendResponse){
    switch (message.method) {

      case "getData":
        var data = tabData[message.tabid];
        sendResponse(data);
        break;

      case "storeData":
        tabData[sender.tab.id] = {'data': message.data, 'url': message.url};
        chrome.pageAction.show(sender.tab.id);
        sendResponse({});
        break;

    }
  }
);

chrome.tabs.onRemoved.addListener(function(tabid) {
  delete tabData[tabid];
});

