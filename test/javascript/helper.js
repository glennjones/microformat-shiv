var helper = {};
helper.parseHTML = function(htmlFragment,baseUrl){

	var doc,
		node,
		options;

	doc = document.implementation.createHTMLDocument("New Document");
	node =  document.createElement('div')
	node.innerHTML = htmlFragment;
	doc.body.appendChild(node);

	var options = {
		'baseUrl': baseUrl,
		'document': doc,
		'node': node
	};

	return microformats.getItems(options);

}