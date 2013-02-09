const self = require("self");
const widgets = require('widget');
const tabs = require('tabs');
const pageMod = require('page-mod');
const panels = require('panel');
const privateBrowsing = require('private-browsing');
const pageWorkers = require("page-worker");
const data = require("self").data;

var tabData = {}


var workers = [];
function detachWorker(worker, workerArray) {
    var index = workerArray.indexOf(worker);
    if(index != -1) {
        workerArray.splice(index, 1);
    }
} 


var popup = require("sdk/panel").Panel({
    width: 780,
    height: 600,
    contentURL: data.url("popup.html"),
    contentScriptFile: data.url("popup.js")
});
 

var icon = require("sdk/widget").Widget({
    label: "BETA DEVELOPMENT VERSION - Display microformats from the page.",
    id: "icon",
    contentURL: data.url("icon-16-gray.png"),
    panel: popup
});


pageMod.PageMod({
    include: ["https://*","http://*","file://*"],
    contentScriptWhen: 'ready',
    attachTo: ["existing", "top"],
    contentScriptFile: data.url("microformat-shiv.js"),
    onAttach: function(worker) {
        workers.push(worker);
        worker.port.on('storeData', function(data) {

            popup.port.emit("displayData",  data);
            appendTabData(data);
            updateIcon(data);

        });
        worker.on('detach', function () {
          detachWorker(this, workers);
        });
    }
});



tabs.on('activate', function(tab) {
  var data = getTabData(tab.url);
  updateIcon(data);
  popup.port.emit("displayData",  data);
});

tabs.on('ready', function(tab) {
  var data = getTabData(tab.url);
  updateIcon(data);
  popup.port.emit("displayData",  data);
});



// turn icon colour on/off 
function updateIcon(data){
    if(data.data.items && data.data.items.length > 0){
        icon.contentURL = self.data.url("icon-16.png");
    }else{
        icon.contentURL = self.data.url("icon-16-gray.png");
    }
}


// get data from object store
function getTabData(url){
    var key,
        data;

    key = urlToKey(url);
    obj = tabData[key];
    return (obj)? obj : {data: {}, url: url};
}

// append data to the object store
function appendTabData(json){
    var key;

    if(!getTabData(json.url).data.items){
        key = urlToKey(json.url);
        tabData[key] = json;
    }
}

// remove a data item from object store
function removeTabData(url){
    var key;

    key = urlToKey(url);
    delete tabData[key];
}

// turn url into a string key
function urlToKey(url){
    return encodeURIComponent(url) 
}





