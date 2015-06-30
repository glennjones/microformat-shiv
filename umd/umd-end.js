



    var Microformats = {};
    
	// creates an instance of parser before firing get
    Microformats.get = function(options){
    	var parser;
        
		parser = new modules.Parser();
    	return parser.get(options.node, options);
    };

    return Microformats;
}));