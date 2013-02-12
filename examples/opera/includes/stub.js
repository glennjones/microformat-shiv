var pack = {};

window.addEventListener('DOMContentLoaded', function() {
	
	if(window.top === window.self) {
		var items = microformats.getItems();
		pack = {'method':'storeData', 'data': items, 'url': document.location.href};
		opera.extension.postMessage(pack);	
	}

	opera.extension.onmessage = function(event) {
		if(event.data.method === 'getData'){
			opera.extension.postMessage(pack);
		}
	};

}, false);