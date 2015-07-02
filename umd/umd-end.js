

    var Microformats = {
        version: modules.version,
        livingStandard: modules.livingStandard,
    };
    
    
    Microformats.get = function(options){
    	var parser = new modules.Parser();
    	return parser.get( options );
    };
    
    
    Microformats.count = function(options){
    	var parser = new modules.Parser();
        addV1(parser, options);
    	return parser.count( options );
    };
    
    
    Microformats.isMicroformat = function( node, options ){
    	var parser = new modules.Parser();
        addV1(parser, options);
    	return parser.isMicroformat( node );
    };
    
    
    function addV1(parser, options){
		if(options.maps){
			if(Array.isArray(options.maps)){
				parser.add(options.maps);
			}else{
				parser.add([options.maps]);
			}
		}
    };
    
    
    return Microformats;
    
    
}));