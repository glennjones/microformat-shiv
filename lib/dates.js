/*!
    Date
    Helper functions for microformat english date parsing, and date fragment concat
    Copyright (C) 2010 - 2015 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
    
    Dependencies  utilities.js
*/


var Modules = (function (m) {
    
    m.dates = {

        
        // does string contain am
        hasAM: function(time) {
            time = time.toLowerCase();
            return(time.indexOf('am') > -1 || time.indexOf('a.m.') > -1);
        },
    
    
        // does string contain pm
        hasPM: function(time) {
            time = time.toLowerCase();
            return(time.indexOf('pm') > -1 || time.indexOf('p.m.') > -1);
        },
    
    
        // remove am and pm from a string and return it
        removeAMPM: function(str) {
            return str.replace('pm', '').replace('p.m.', '').replace('am', '').replace('a.m.', '');
        },
    
       
    
        // very simple test of weather ISO date string is a duration  i.e.  PY17M or PW12
        isDuration: function(str) {
            if(m.utils.isString(str)){
                str = str.toLowerCase();
                if(m.utils.startWith(str, 'p') ){
                    return true;
                }
            }
            return false;
        },
    
    
        // is str a time or timezone
        // ie HH-MM-SS or z+-HH-MM-SS 08:43 | 15:23:00:0567 | 10:34pm | 10:34 p.m. | +01:00:00 | -02:00 | z15:00 | 0843 
        isTime: function(str) {
            if(m.utils.isString(str)){
                str = str.toLowerCase();
                str = m.utils.trim( str );
                // start with timezone char
                if( str.match(':') && ( m.utils.startWith(str, 'z') || m.utils.startWith(str, '-')  || m.utils.startWith(str, '+') )) {
                    return true;
                }
                // has ante meridiem or post meridiem
                if( str.match(/^[0-9]/) && 
                    ( this.hasAM(str) || this.hasPM(str) )) {
                    return true;
                }
                // contains time delimiter but not datetime delimiter
                if( str.match(':') && !str.match(/t|\s/) ) {
                    return true;
                }
                
                // if its a number of 2, 4 or 6 chars
                if(m.utils.isNumber(str)){
                    if(str.length === 2 || str.length === 4 || str.length === 6){
                        return true;
                    }
                }
            }
            return false;
        },
    
    
    
        // parses a time string and turns it into a 24hr time string
        // 5:34am = 05:34:00 and 1:52:04p.m. = 13:52:04
        parseAmPmTime: function(time) {
            var out = time,
                times = [];
    
            // if the string has a time : or am or pm
            if(m.utils.isString(out)) {
                time = time.toLowerCase();
                time = time.replace(/[ ]+/g, '');
    
                if(time.match(':') || this.hasAM(time) || this.hasPM(time)) {
    
                    if(time.match(':')) {
                        times = time.split(':');
                    } else {
                        // single number time ie 5pm
                        times[0] = time;
                        times[0] = this.removeAMPM(times[0]);
                    }
                    
                    // change pm hours to 24 hour number
                    if(this.hasPM(time)) {
                        if(times[0] < 12) {
                            times[0] = parseInt(times[0], 10) + 12;
                        }
                    }
    
                    // add leading zero's where needed
                    if(times[0] && times[0].length === 1) {
                        times[0] = '0' + times[0];
                    }
                    
                    // rejoin time elements together
                    if(times[0]) {
                        time = times.join(':');
                    }
                }
            }
            
            // remove am/pm strings
            return this.removeAMPM(time);
        },
    
    
        // overlays a different time on a given data to return the union of the two
        dateTimeUnion: function(date, time, format) {
            var isodate = new m.ISODate(date, format),
                isotime = new m.ISODate();
    
            isotime.parseTime(this.parseAmPmTime(time));
            if(isodate.hasFullDate() && isotime.hasTime()) {
                isodate.tH = isotime.tH;
                isodate.tM = isotime.tM;
                isodate.tS = isotime.tS;
                isodate.tD = isotime.tD;
                return isodate;
            } else {
                if(isodate.hasFullDate()){
                    return isodate;
                }
                return new m.ISODate();
            }
        },
    
    
        // passed an array of date/time string fragments it creates an iso datetime
        // used for microformat value and value-title rules
        concatFragments: function (arr, format) {
            var out = new m.ISODate(),
                i = 0,
                value = '';
            
            // if the fragment already contains a full date just return it once its converted to profile
            if(arr[0].toUpperCase().match('T')) {
                return new m.ISODate(arr[0], format);
            }else{
                for(i = 0; i < arr.length; i++) {
                value = arr[i];
      
                // date pattern
                if( value.charAt(4) === '-' && out.hasFullDate() === false ){
                    out.parseDate(value);
                }
                
                // time pattern
                if( (value.indexOf(':') > -1 || m.utils.isNumber( this.parseAmPmTime(value) )) && out.hasTime() === false ) {
                    // split time And timezone
                    var items = this.splitTimeAndZone(value);
                    value = items[0];
                    
                    // parse any use of am/pm
                    value = this.parseAmPmTime(value);
                    out.parseTime(value);
                    
                    // parse any timezone that ws appended to time
                    if(items.length > 1){
                         out.parseTimeZone(items[1]);
                    }
                }
                
                // timezone pattern
                if(value.charAt(0) === '-' || value.charAt(0) === '+' || value.toUpperCase() === 'Z') {
                    if( out.hasTimeZone() === false ){
                        out.parseTimeZone(value);
                    }
                }
    
            }
            return out;
                
            }
        },
        
        
        // parses time string by spliting time and timezone, return an array
        splitTimeAndZone: function ( time ){
           var out = [time],
               chars = ['-','+','z','Z'],
               i = chars.length;
               
            while (i--) {
              if(time.indexOf(chars[i]) > -1){
                  out[0] = time.slice( 0, time.indexOf(chars[i]) );
                  out.push( time.slice( time.indexOf(chars[i]) ) );
                  break;
               }
            }
           return out;
        }
        
    };


    return m;

} (Modules || {}));




