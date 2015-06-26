/*!
	helper 
	Used by test framework to get results from parser
	Copyright (C) 2010 - 2015 Glenn Jones. All Rights Reserved.
	MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
*/

var helper = {};

helper.parseHTML = function(htmlFragment,baseUrl){

	var doc,
		node,
		options;

	doc = document.implementation.createHTMLDocument("New Document");
	node =  document.createElement('div')
	node.innerHTML = htmlFragment;
	doc.body.appendChild(node);

	options = {
		'baseUrl': baseUrl,
		'document': doc,
		'node': node
	};

	return microformats.getItems(options);

}