



    var Microformats = {};
    
	// creates an instance of parser before firing get
    Microformats.get = function(options){
    	var parser = new modules.Parser();
    	return parser.get( options );
    };
    
    
    Microformats.count = function(options){
    	var parser = new modules.Parser();
    	return parser.count( options );
    };
    
    
    Microformats.isMicroformat = function( node ){
    	var parser = new modules.Parser();
    	return parser.isMicroformat( node );
    };

    return Microformats;
}));