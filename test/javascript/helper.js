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
		umd == false;
	}
	
	var dom = new DOMParser();
    doc = dom.parseFromString( htmlFragment, 'text/html' );

	options = {
		'node': doc,
		'document': doc,
		'baseUrl': baseUrl,
	};

	// either Modules or Microformats (umd) object
    if(umd === false){
        var parser = new Modules.Parser();
        return parser.get(doc, node, options);
    }else if(window.Microformats){
        return Microformats.get(options);
    }

}