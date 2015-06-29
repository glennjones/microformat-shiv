
    var Microformats = {};
    
	// creates an instance of parser before firing get
    Microformats.get = function(options){
    	var parser,
			dom,
    		node;
    
    	dom = (options && options.document)? options.document : document;
    	node = (options && options.node)? options.node : dom;
    
    	options = (options)? options : {};
    	if(!options.baseUrl && dom && dom.location){
    		options.baseUrl = dom.location.href;
    	}
    
		parser = new Modules.Parser();
    	return parser.get(node, options);
    };

    return Microformats;
}));