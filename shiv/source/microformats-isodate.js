/*! 
A compact JavaScript cross browser microformats parser by Glenn Jones. Based 
on the Mozilla Labs Operator microformats parser created by Michael Kaply 

Copyright (C) 2010 Glenn Jones. All Rights Reserved.
License: http://microformatshiv.com/license/
*/
 
 
/**
* Converts an ISO8601 date into a JavaScript date object, honoring the TZ
* offset and Z if present to convert the date to local time
* NOTE: I'm using an extra parameter on the date object for this function.
* I set date.time to true if there is a date, otherwise date.time is false.
* 
* @param  string ISO8601 formatted date
* @return JavaScript date object that represents the ISO date. 
*/
function dateFromISO8601(string) {
    var dateArray = string.match(/(\d\d\d\d)(?:-?(\d\d[\d]*)(?:-?([\d]*)(?:[T ](\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(?:Z|(?:([-+])(\d\d)(?::?(\d\d))?)?)?)?)?)?/);

    if (dateArray[2] && !dateArray[3]) {
        /* This indicates we have a month only */
        var d = new Date("01/01/" + dateArray[1]);
        d.setDate(dateArray[2]);
        dateArray[2] = d.getMonth() + 1;
        dateArray[3] = d.getDate();
    }

    var date = new Date(dateArray[1], 0, 1);
    date.time = false;

    if (dateArray[2]) {
        date.setMonth(dateArray[2] - 1);
    }
    if (dateArray[3]) {
        date.setDate(dateArray[3]);
    }
    if (dateArray[4]) {
        date.setHours(dateArray[4]);
        date.time = true;
        if (dateArray[5]) {
            date.setMinutes(dateArray[5]);
            if (dateArray[6]) {
                date.setSeconds(dateArray[6]);
                if (dateArray[7]) {
                    date.setMilliseconds(Number("0." + dateArray[7]) * 1000);
                }
            }
        }
    }
    if (dateArray[8]) {
        if (dateArray[8] == "-") {
            if (dateArray[9] && dateArray[10]) {
                date.setHours(date.getHours() + parseInt(dateArray[9], 10));
                date.setMinutes(date.getMinutes() + parseInt(dateArray[10], 10));
            }
        } else if (dateArray[8] == "+") {
            if (dateArray[9] && dateArray[10]) {
                date.setHours(date.getHours() - parseInt(dateArray[9], 10));
                date.setMinutes(date.getMinutes() - parseInt(dateArray[10], 10));
            }
        }
        /* at this point we have the time in gmt */
        /* convert to local if we had a Z - or + */
        if (dateArray[8]) {
            var tzOffset = date.getTimezoneOffset();
            if (tzOffset < 0) {
                date.setMinutes(date.getMinutes() + tzOffset);
            } else if (tzOffset > 0) {
                date.setMinutes(date.getMinutes() - tzOffset);
            }
        }
    }
    return date;
}



/**
* Converts a Javascript date object into an ISO 8601 formatted date
* NOTE: I'm using an extra parameter on the date object for this function.
* If date.time is NOT true, this function only outputs the date.
* 
* @param  date        Javascript Date object
* @param  punctuation true if the date should have -/:
* @return string with the ISO date. 
*/
function iso8601FromDate(date, punctuation) {
    var string = date.getFullYear().toString();
    if (punctuation) {
        string += "-";
    }
    string += (date.getMonth() + 1).toString().replace(/\b(\d)\b/g, '0$1');
    if (punctuation) {
        string += "-";
    }
    string += date.getDate().toString().replace(/\b(\d)\b/g, '0$1');
    if (date.time) {
        string += "T";
        string += date.getHours().toString().replace(/\b(\d)\b/g, '0$1');
        if (punctuation) {
            string += ":";
        }
        string += date.getMinutes().toString().replace(/\b(\d)\b/g, '0$1');
        if (punctuation) {
            string += ":";
        }
        string += date.getSeconds().toString().replace(/\b(\d)\b/g, '0$1');
        if (date.getMilliseconds() > 0) {
            if (punctuation) {
                string += ".";
            }
            string += date.getMilliseconds().toString();
        }
    }
    return string;
}