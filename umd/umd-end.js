

    var External = {
        version: modules.version,
        livingStandard: modules.livingStandard
    };
    
    
    External.get = function(options){
    	var parser = new modules.Parser();
        addV1(parser, options);
    	return parser.get( options );
    };
    
    
    External.getParent = function(node, options){
    	var parser = new modules.Parser();
        addV1(parser, options);
    	return parser.getParent( node, options );
    };
    
    
    External.count = function(options){
    	var parser = new modules.Parser();
        addV1(parser, options);
    	return parser.count( options );
    };
    
    
    External.isMicroformat = function( node, options ){
    	var parser = new modules.Parser();
        addV1(parser, options);
    	return parser.isMicroformat( node, options );
    };
    
    
    External.hasMicroformats = function( node, options ){
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
    }
    
    
    return External;
    
    
}));