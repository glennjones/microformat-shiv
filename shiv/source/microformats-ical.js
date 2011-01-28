/*! 
Copyright (C) 2010 Glenn Jones. All Rights Reserved.
License: http://microformatshiv.com/license/
*/


function hCalandertoiCalendar(hcalendar, header, footer)
{
    var crlf = "\n";
    var ics = "";
    if (header) {
      ics += "BEGIN:VCALENDAR" + crlf;;
      ics += "PRODID:" + crlf;;
      ics += "X-ORIGINAL-URL:" + content.document.location.href + crlf;;
      ics += "X-WR-CALNAME:" + crlf;;
      ics += "VERSION:2.0" + crlf;;
      ics += "METHOD:PUBLISH" + crlf;;
    }
    ics += "BEGIN:VEVENT" + crlf;;
    if (hcalendar["class"]) {
      ics += "CLASS:" + hcalendar["class"] + crlf;;
    }
    if (hcalendar.description) {
      var s = hcalendar.description;
      s = s.replace(/\<.*?\>/gi, '');
      s = s.replace(/[\n\r\t]/gi, ' ');
      s = s.replace(/\s{2,}/gi, ' ');
      s = s.replace(/\s{2,}/gi, '');
      s = s.replace(/^\s+/, '');

      ics += "DESCRIPTION;CHARSET=UTF-8:" + s + crlf;;
    }
    if (hcalendar.location) {
      ics += "LOCATION;CHARSET=UTF-8:";
      if (typeof hcalendar.location == "object") {
        if (hcalendar.location.fn) {
          ics += hcalendar.location.fn;
        }
        if (hcalendar.location.adr) {
          if (hcalendar.location.adr[0]["street-address"]) {
            ics += ", ";
            ics += hcalendar.location.adr[0]["street-address"][0];
          }
          if (hcalendar.location.adr[0]["extended-address"]) {
            ics += ", ";
            ics += hcalendar.location.adr[0]["extended-address"];
          }
          if (hcalendar.location.adr[0].locality) {
            ics += ", ";
            ics += hcalendar.location.adr[0].locality;
          }
          if (hcalendar.location.adr[0].region) {
            ics += ", ";
            ics += hcalendar.location.adr[0].region;
          }
          if (hcalendar.location.adr[0]["postal-code"]) {
            ics += " ";
            ics += hcalendar.location.adr[0]["postal-code"];
          }
          if (hcalendar.location.adr[0]["country-name"]) {
            ics += ",";
            ics += hcalendar.location.adr[0]["country-name"];
          }
        }
      } else {
        ics += hcalendar.location;
      }
      ics += crlf;;
    }
    if (hcalendar.summary) {
      ics += "SUMMARY;CHARSET=UTF-8:" + hcalendar.summary + crlf;;
    }
    if (hcalendar.status) {
      ics += "STATUS:" + hcalendar.status + crlf;;
    }
    if (hcalendar.transp) {
      ics += "TRANSP:" + hcalendar.transp + crlf;;
    }
    /* OUTLOOK REQUIRES UID */
    ics += "UID:";
    if (hcalendar.uid) {
      ics += hcalendar.uid;
    }
    ics += crlf;;
    if (hcalendar.url) {
      ics += "URL:" + hcalendar.url + crlf;;
    }
    var date;
    var time;
    if (hcalendar.dtstart) {
      ics += "DTSTART;VALUE=DATE";
      var T = hcalendar.dtstart.indexOf("T");
      if (T > -1) {
        ics += "-TIME";
        /* This is some seriously ugly code that accomodates the fact that */
        /* ICS don't support TZ offsets, only UTC (Z) */
        var tzpos = hcalendar.dtstart.lastIndexOf("+");
        if (tzpos == -1) {
          tzpos = hcalendar.dtstart.lastIndexOf("-");
        }
        if (tzpos > T) {
          var js_date = Microformats.dateFromISO8601(hcalendar.dtstart.substr(0, tzpos));
          var tzhours = parseInt(hcalendar.dtstart.substr(tzpos+1, 2), 10);
          var tzminutes = parseInt(hcalendar.dtstart.substr(tzpos+3, 2), 10);
          if (hcalendar.dtstart.charAt(tzpos) == "-") {
            js_date.setHours(js_date.getHours()+tzhours);
            js_date.setMinutes(js_date.getMinutes()+tzminutes);
          } else if (hcalendar.dtstart.charAt(tzpos) == "+") {
            js_date.setHours(js_date.getHours()-tzhours);
            js_date.setMinutes(js_date.getMinutes()-tzminutes);
          }
          var dtstart = Microformats.iso8601FromDate(js_date, true);
          date = dtstart.substr(0, T);
          time = dtstart.substr(T) + "Z";
        } else {
          var js_date = Microformats.dateFromISO8601(hcalendar.dtstart);
          var dtstart = Microformats.iso8601FromDate(js_date, true);
          date = dtstart.substr(0, T);
          time = dtstart.substr(T);
		  if (hcalendar.dtstart.indexOf('Z') != -1) {
			time += "Z";
		  }
        }
      } else {
        date = hcalendar.dtstart;
      }
      ics += ":" + date.replace(/-/g,"");
      if (time) {
        ics += time.replace(/:/g,"");
      }
      ics += crlf;
    }
    if (hcalendar.dtend) {
      ics += "DTEND;VALUE=DATE";
      var T = hcalendar.dtend.indexOf("T");
      if (T > -1) {
        ics += "-TIME";
        /* This is some seriously ugly code that accomodates the fact that */
        /* ICS don't support TZ offsets, only UTC (Z) */
        var tzpos = hcalendar.dtend.lastIndexOf("+");
        if (tzpos == -1) {
          tzpos = hcalendar.dtend.lastIndexOf("-");
        }
        if (tzpos > T) {
          var js_date = Microformats.dateFromISO8601(hcalendar.dtend.substr(0, tzpos));
          var tzhours = parseInt(hcalendar.dtend.substr(tzpos+1, 2), 10);
          var tzminutes = parseInt(hcalendar.dtend.substr(tzpos+3, 2), 10);
          if (hcalendar.dtend.charAt(tzpos) == "-") {
            js_date.setHours(js_date.getHours()+tzhours);
            js_date.setMinutes(js_date.getMinutes()+tzminutes);
          } else if (hcalendar.dtend.charAt(tzpos) == "+") {
            js_date.setHours(js_date.getHours()-tzhours);
            js_date.setMinutes(js_date.getMinutes()-tzminutes);
          }
          var dtend = Microformats.iso8601FromDate(js_date, true);
          date = dtend.substr(0, T);
          time = dtend.substr(T) + "Z";
        } else {
          var js_date = Microformats.dateFromISO8601(hcalendar.dtend);
          var dtend = Microformats.iso8601FromDate(js_date, true);
          date = dtend.substr(0, T);
          time = dtend.substr(T);
		  if (hcalendar.dtend.indexOf('Z') != -1) {
			time += "Z";
		  }
        }
      } else {
        date = hcalendar.dtend;
//        if (!Operator.upcomingBugFixed) {
//          if (content.document.location.href.indexOf("http://upcoming.yahoo.com") == 0) {
            date = date.replace(/-/g, "");
            date = (parseInt(date, 10)+1).toString();
//          }
//        }
      }
      ics += ":" + date.replace(/-/g,"");
      if (time) {
        ics += time.replace(/:/g,"");
      }
      ics += crlf;
    }
    if (hcalendar.rrule) {
      ics += "RRULE:";
      for (var i in hcalendar.rrule) {
        ics += i.toUpperCase() + "=" + hcalendar.rrule[i].toUpperCase() + ";";
      }
      ics += crlf;
    }
    
    /* OUTLOOK REQUIRES DTSTAMP */
    ics += "DTSTAMP:";
    if (hcalendar.dtstamp) {
      ics += hcalendar.dtstamp;
    } else {
      ics += "19701209T000000Z";
    }
    ics += crlf;;
    if (hcalendar.category) {
      ics += "CATEGORIES;CHARSET=UTF-8:" + hcalendar.category.join(",") + crlf;;
    }
    if (hcalendar.location) {
      if (typeof hcalendar.location == "object") {
        if (hcalendar.location.geo) {
          ics += "GEO:" + hcalendar.location.geo.latitude + ";" + hcalendar.location.geo.longitude + crlf;;
        }
      }
    }
    ics += "END:VEVENT" + crlf;;
    if (footer) {
      ics += "END:VCALENDAR" + crlf;;
    }

    return ics;
  }
