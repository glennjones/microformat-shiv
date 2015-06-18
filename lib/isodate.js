/*!
    ISO Date Parser
    Parses and builds ISO dates to the  W3C, HTML5 or RFC3339 profiles
    Copyright (C) 2010 - 2015 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt

    */

function ISODate( dateString, format ) {
    this.dY = -1;
    this.dM = -1;
    this.dD = -1;
    this.dDDD = -1;
    this.tH = -1;
    this.tM = -1;
    this.tS = -1;
    this.tD = -1;
    this.tzH = -1;
    this.tzM = -1;
    this.tzPN = '+';
    this.z = false;

    // auto defaults to W3C
    this.autoProfile = {
       sep: 'T',
       dsep: '-',
       tsep: ':',
       tzsep: ':'
    };
    this.format = (format)? format : 'auto'; // auto or uf or W3C or RFC3339 or HTML5
    this.setFormatSep();

    // optional should be full iso date/time string 
    if(arguments[0]) {
        this.parse(dateString, format);
    }
}

ISODate.prototype = {

    // parses a full iso date/time string i.e. 2008-05-01T15:45:19Z
    parse: function( dateString, format ) {
        var dateNormalised = '',
            parts = [],
            tzArray = [],
            position = 0,
            datePart = '',
            timePart = '',
            timeZonePart = '';
        
        // discover date time separtor for auto profile
        if(dateString.toString().indexOf('t') > -1) {
            this.autoProfile.sep = 't';
        }
        if(dateString.toString().toUpperCase().indexOf('T') === -1) {
            this.autoProfile.sep = ' ';
        }     


        dateString = dateString.toString().toUpperCase().replace(' ','T');

        // break on 'T' divider or space
        if(dateString.indexOf('T') > -1) {
            parts = dateString.split('T');
            datePart = parts[0];
            timePart = parts[1];

            // zulu UTC                 
            if(timePart.indexOf( 'Z' ) > -1) {
                this.z = true;
            }

            // timezone
            if(timePart.indexOf( '+' ) > -1 || timePart.indexOf( '-' ) > -1) {
                tzArray = timePart.split( 'Z' ); // incase of incorrect use of Z
                timePart = tzArray[0];
                timeZonePart = tzArray[1];

                // timezone
                if(timePart.indexOf( '+' ) > -1 || timePart.indexOf( '-' ) > -1) {
                    position = 0;

                    if(timePart.indexOf( '+' ) > -1) {
                        position = timePart.indexOf( '+' );
                    } else {
                        position = timePart.indexOf( '-' );
                    }

                    timeZonePart = timePart.substring( position, timePart.length );
                    timePart = timePart.substring( 0, position );
                }
            }

        } else {
            datePart = dateString;
        }

        if(datePart !== '') {
            this.parseDate( datePart );
            if(timePart !== '') {
                this.parseTime( timePart );
                if(timeZonePart !== '') {
                    this.parseTimeZone( timeZonePart );
                }
            }
        }
        return this.toString();
    },


    // parses just the date element of a iso date/time string i.e. 2008-05-01
    parseDate: function( dateString ) {
        var dateNormalised = '',
            parts = [];
            
        // discover timezone separtor for auto profile // default is ':'
        if(dateString.indexOf('-') === -1) {
            this.autoProfile.tsep = '';
        }  

        // YYYY-DDD
        parts = dateString.match( /(\d\d\d\d)-(\d\d\d)/ );
        if(parts) {
            if(parts[1]) {
                this.dY = parts[1];
            }
            if(parts[2]) {
                this.dDDD = parts[2];
            }
        }

        if(this.dDDD === -1) {
            // YYYY-MM-DD ie 2008-05-01 and YYYYMMDD ie 20080501
            parts = dateString.match( /(\d\d\d\d)?-?(\d\d)?-?(\d\d)?/ );
            if(parts[1]) {
                this.dY = parts[1];
            }
            if(parts[2]) {
                this.dM = parts[2];
            }
            if(parts[3]) {
                this.dD = parts[3];
            }
        }
        return this.toString();
    },


    // parses just the time element of a iso date/time string i.e. 13:30:45
    parseTime: function( timeString ) {
        var timeNormalised = '',
            parts = [];
            
        // discover date separtor for auto profile // default is ':'
        if(timeString.indexOf(':') === -1) {
            this.autoProfile.tsep = '';
        }      

        // finds timezone HH:MM:SS and HHMMSS  ie 13:30:45, 133045 and 13:30:45.0135
        parts = timeString.match( /(\d\d)?:?(\d\d)?:?(\d\d)?.?([0-9]+)?/ );
        if(parts[1]) {
            this.tH = parts[1];
        }
        if(parts[2]) {
            this.tM = parts[2];
        }
        if(parts[3]) {
            this.tS = parts[3];
        }
        if(parts[4]) {
            this.tD = parts[4];
        }
        return this.toString();
    },


    // parses just the time element of a iso date/time string i.e. +08:00
    parseTimeZone: function( timeString ) {
        var timeNormalised = '',
            parts = [];
            
        // discover timezone separtor for auto profile // default is ':'
        if(timeString.indexOf(':') === -1) {
            this.autoProfile.tzsep = '';
        }   
       
        // finds timezone +HH:MM and +HHMM  ie +13:30 and +1330
        parts = timeString.match( /([\-\+]{1})?(\d\d)?:?(\d\d)?/ );
        if(parts[1]) {
            this.tzPN = parts[1];
        }
        if(parts[2]) {
            this.tzH = parts[2];
        }
        if(parts[3]) {
            this.tzM = parts[3];
        }
        return this.toString();
    },


    // returns iso date/time string in in W3C Note, RFC 3339, HTML5, Microformat profile or auto
    toString: function( format ) {
        var output = '';

        if(format){
            this.format = format;
        }
        this.setFormatSep();

        if(this.dY  > -1) {
            output = this.dY;
            if(this.dM > 0 && this.dM < 13) {
                output += this.dsep + this.dM;
                if(this.dD > 0 && this.dD < 32) {
                    output += this.dsep + this.dD;
                    if(this.tH > -1 && this.tH < 25) {
                        output += this.sep + this.toTimeString( this );
                    }
                }
            }
            if(this.dDDD > -1) {
                output += this.dsep + this.dDDD;
            }
        } else if(this.tH > -1) {
            output += this.toTimeString( this );
        }

        return output;
    },


    // returns just the time string element of a iso date/time
    toTimeString: function( iso, format ) {
        var out = '';

        if(format){
            this.format = format;
        }
        this.setFormatSep();
        
        // time and can only be created with a full date
        if(iso.tH) {
            if(iso.tH > -1 && iso.tH < 25) {
                out += iso.tH;
                if(iso.tM > -1 && iso.tM < 61){
                    out += this.tsep + iso.tM;
                    if(iso.tS > -1 && iso.tS < 61){
                        out += this.tsep + iso.tS;
                        if(iso.tD > -1){
                            out += '.' + iso.tD;
                        }
                    }
                }
                
                // time zone offset 
                if(iso.z) {
                    out += 'Z';
                } else {
                    if(iso.tzH && iso.tzH > -1 && iso.tzH < 25) {
                        out += iso.tzPN + iso.tzH;
                        if(iso.tzM > -1 && iso.tzM < 61){
                            out += this.tzsep + iso.tzM;
                        }
                    }
                }
            }
        }
        return out;
    },


    // congifures the separators for a given profile
    setFormatSep: function() {
        switch( this.format ) {
            case 'RFC3339':
                this.sep = 'T';
                this.dsep = '';
                this.tsep = '';
                this.tzsep = '';
                break;
            case 'W3C':
                this.sep = 'T';
                this.dsep = '-';
                this.tsep = ':';
                this.tzsep = ':';
                break;
            case 'HTML5':
                this.sep = ' ';
                this.dsep = '-';
                this.tsep = ':';
                this.tzsep = ':';
                break;
            case 'uf':
                // old microformats profiles
                this.sep = ' ';
                this.dsep = '-';
                this.tsep = ':';
                this.tzsep = ':';
                break;
            default:
                // auto - defined by format of input string
                this.sep = this.autoProfile.sep;
                this.dsep = this.autoProfile.dsep;
                this.tsep = this.autoProfile.tsep;
                this.tzsep = this.autoProfile.tzsep;
        }
    },

    hasFullDate: function() {
        return(this.dY !== -1 && this.dM !== -1 && this.dD !== -1);
    },


    hasDate: function() {
        return(this.dY !== -1);
    },


    hasTime: function() {
        return(this.tH !== -1);
    },


    hasTimeZone: function() {
        return(this.tzH !== -1);
    }

};



