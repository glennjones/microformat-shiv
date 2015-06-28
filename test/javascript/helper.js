/*!
	helper 
	Used by test framework to get results from parser
	Copyright (C) 2010 - 2015 Glenn Jones. All Rights Reserved.
	MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
*/

var helper = {};

helper.parseHTML = function( htmlFragment, baseUrl, umd){

	var doc,
		node,
		options;
		
	if(umd !== undefined){
		umd === false;
	}

	doc = document.implementation.createHTMLDocument("New Document");
	node =  document.createElement('div')
	node.innerHTML = htmlFragment;
	doc.body.appendChild(node);

	options = {
		'baseUrl': baseUrl,
		'document': doc,
		'node': node
	};

	// either Modules or Microformats (umd) object
    if(umd === false){
        var parser = new Modules.Parser();
        return parser.get(document, node, options);
    }else if(window.Microformats){
        options.document = document;
        return Microformats.get(options);
    }

}