

    var Microformats = {
        version: modules.version,
        livingStandard: modules.livingStandard
    };
    
    
    Microformats.get = function(options){
    	var parser = new modules.Parser();
        addV1(parser, options);
    	return parser.get( options );
    };
    
    
    Microformats.getParent = function(node, options){
    	var parser = new modules.Parser();
        addV1(parser, options);
    	return parser.getParent( node, options );
    };
    
    
    Microformats.count = function(options){
    	var parser = new modules.Parser();
        addV1(parser, options);
    	return parser.count( options );
    };
    
    
    Microformats.isMicroformat = function( node, options ){
    	var parser = new modules.Parser();
        addV1(parser, options);
    	return parser.isMicroformat( node, options );
    };
    
    
    Microformats.hasMicroformats = function( node, options ){
    	var parser = new modules.Parser();
        addV1(parser, options);
    	return parser.hasMicroformats( node, options );
    };
    
    
    function addV1(parser, options){
		if(options && options.maps){
			if(Array.isArray(options.maps)){
				parser.add(options.maps);
			}else{
				parser.add([options.maps]);
			}
		}
    };
    
    
    return Microformats;
    
    
}));