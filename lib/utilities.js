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
    
    // is the object a number
    isNumber: function( obj ) {
        return !isNaN(parseFloat( obj )) && isFinite( obj );
    },


    // does a string start with the test
    startWith: function( str, test ) {
        return(str.indexOf(test) === 0);
    },


    // remove spaces at front and back of string
    trim: function( str ) {
        if(str && this.isString(str)){
            return str.replace(/^\s+|\s+$/g, '');
        }else{
            return '';
        }
    },
    
    
    // replaces a character in a string and return the new string
    replaceCharAt: function( str, index, character ) {
        if(str && str.length > index){
           return str.substr(0, index) + character + str.substr(index+character.length); 
        }else{
            return str;
        }
    },
    
    
    // removes whitespace, tabs and returns from start and end of text
    trimWhitespace: function( text ){
        if(text && text.length){
            var i = text.length,
                x = 0;
            
            // turn all whitespace chars at end into spaces
            while (i--) {
                if(this.isOnlyWhiteSpace(text[i])){
                    text = this.replaceCharAt( text, i, ' ' );
                }else{
                    break;
                }
            }
            
            // turn all whitespace chars at start into spaces
            i = text.length;
            while (x < i) {
                if(this.isOnlyWhiteSpace(text[x])){
                    text = this.replaceCharAt( text, i, ' ' );
                }else{
                    break;
                }
                x++;
            }
        }
        return this.trim(text);
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
    },
    
    
    // sort objects in an array by given property
    sortObjects: function(property, reverse) {
        reverse = (reverse) ? -1 : 1;
        return function (a, b) {
            a = a[property];
            b = b[property];
            if (a < b) {
                return reverse * -1;
            }
            if (a > b) {
                return reverse * 1;
            }
            return 0;
        };
    }

};




