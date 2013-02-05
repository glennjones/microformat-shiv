/*
   Utilities
   Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
   MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
   
   */

microformats.parser.utils = {

    // is the object a string
    isString: function( obj ) {
        return typeof( obj ) === 'string';
    },


    // does a string start with the test
    startWith: function( str, test ) {
        return(str.indexOf(test) === 0);
    },


    // remove spaces at front and back of string
    trim: function( str ) {
        if(this.isString(str)){
            return str.replace(/^\s+|\s+$/g, '');
        }else{
            return '';
        }
    },


    // is a string only contain white space chars
    isOnlyWhiteSpace: function( str ){
        return !(/[^\t\n\r ]/.test( str ));
    },


    // removes white space from a string
    removeWhiteSpace: function( str ){
        return str.replace(/[\t\n\r ]+/g, ' ');
    },


    // is the object a array
    isArray: function( obj ) {
        return obj && !( obj.propertyIsEnumerable( 'length' ) ) && typeof obj === 'object' && typeof obj.length === 'number';
    },


    // simple function to find out if a object has any properties. 
    hasProperties: function( obj ) {
        var key;
        for(key in obj) {
            if( obj.hasOwnProperty( key ) ) {
                return true;
            }
        }
        return false;
    }

};




