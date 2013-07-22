/*!
    Date Utilities
    Helper functions for microformat date parsing, and fragment concat
    Copyright (C) 2010 - 2013 Glenn Jones. All Rights Reserved.
    MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt

    */

microformats.parser.dates = {

    utils:  microformats.parser.utils,

    removeAMPM: function(str) {
        return str.replace('pm', '').replace('p.m.', '').replace('am', '').replace('a.m.', '');
    },


    hasAM: function(time) {
        time = time.toLowerCase();
        return(time.indexOf('am') > -1 || time.indexOf('a.m.') > -1);
    },


    hasPM: function(time) {
        time = time.toLowerCase();
        return(time.indexOf('pm') > -1 || time.indexOf('p.m.') > -1);
    },


    // is str a ISO duration  i.e.  PY17M or PW12
    isDuration: function(str) {
        if(this.utils.isString(str)){
            str = str.toLowerCase();
            str = this.utils.trim( str );
            if(this.utils.startWith(str, 'p') && !str.match(/t|\s/) && !str.match('-') && !str.match(':')) {
                return true;
            }
        }
        return false;
    },


    // is str a time or timezone
    // ie HH-MM-SS or z+-HH-MM-SS 08:43 | 15:23:00:0567 | 10:34pm | 10:34 p.m. | +01:00:00 | -02:00 | z15:00 
    isTime: function(str) {
        if(this.utils.isString(str)){
            str = str.toLowerCase();
            str = this.utils.trim( str );
            // start with timezone char
            if( str.match(':') 
                && ( this.utils.startWith(str, 'z') 
                    || this.utils.startWith(str, '-') 
                    || this.utils.startWith(str, '+') )) {
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
        }
        return false;
    },


    // parses a time string and turns it into a 24hr time string
    // 5:34am = 05:34:00 and 1:52:04p.m. = 13:52:04
    parseAmPmTime: function(time) {
        var out = time,
            times = [];

        // if the string has a time : or am or pm
        if(this.utils.isString(out)) {
            time = time.toLowerCase();
            time = time.replace(/[ ]+/g, '');

            if(time.match(':') || this.hasAM(time) || this.hasPM(time)) {

                if(time.match(':')) {
                    times = time.split(':');
                } else {
                    times[0] = time;
                    times[0] = this.removeAMPM(times[0]);
                }

                if(this.hasAM(time)) {
                    if(times[0] === '12') {
                        times[0] = '00';
                    }
                }
                if(this.hasPM(time)) {
                    if(times[0] < 12) {
                        times[0] = parseInt(times[0], 10) + 12;
                    }
                }

                // add leading zero's where needed
                if(times[0] && times[0].length === 1) {
                    times[0] = '0' + times[0];
                }
                if(times[0]) {
                    time = times.join(':');
                }
            }
        }
        return this.removeAMPM(time);
    },


    // overlays a different time on a given data to return the union of the two
    dateTimeUnion: function(date, time) {
        var isodate = new ISODate(date),
            isotime = new ISODate();

        isotime.parseTime(this.parseAmPmTime(time));
        if(isodate.hasFullDate() && isotime.hasTime()) {
            isodate.tH = isotime.tH;
            isodate.tM = isotime.tM;
            isodate.tS = isotime.tS;
            isodate.tD = isotime.tD;
            return isodate;
        } else {
            new ISODate();
        }
    },


    // passed an array of date/time string fragments it creates an iso 
    // datetime string using microformat rules for value and value-title
    concatFragments: function (arr) {
        var out = null,
            i = 0,
            date = '',
            time = '',
            offset = '',
            value = '';

        for(i = 0; i < arr.length; i++) {
            value = arr[i].toUpperCase();
            // if the fragment already contains a full date just return it once its converted W3C profile
            if(value.match('T')) {
                return new ISODate(value);
            }
            // if it looks like a date
            if(value.charAt(4) === '-') {
                date = value;
                // if it looks like a timezone    
            } else if((value.charAt(0) === '-') || (value.charAt(0) === '+') || (value === 'Z')) {
                if(value.length === 2) {
                    offset = value[0] + '0' + value[1];
                } else {
                    offset = value;
                }
            } else {
                // else if could be a time 
                time = this.parseAmPmTime(value);
            }
        }

        if(date !== '') {
            return new ISODate(date + (time ? 'T' : '') + time + offset);
        } else {
            out = new ISODate(value);
            if(time !== '') {
                out.parseTime(time);
            }
            if(offset !== '') {
                out.parseTime(offset);
            }
            return out;
        }
    }

};

