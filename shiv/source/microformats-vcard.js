/*! 
Copyright (C) 2010 Glenn Jones. All Rights Reserved.
License: http://microformatshiv.com/license/
*/


function hCardtovCard(hcard, lineending) {
    var crlf = "\r\n";
    if (lineending) {
        crlf = lineending;
    }
    var vcf;
    var i;
    var j;
    vcf = "BEGIN:VCARD" + crlf;
    vcf += "PRODID:-//kaply.com//Operator 0.8//EN" + crlf;
    vcf += "SOURCE:" + document.location.href + crlf;
    vcf += "NAME:" + document.title + crlf;
    vcf += "VERSION:3.0" + crlf;
    if (hcard.n && (hcard.n["family-name"] || hcard.n["given-name"] ||
        hcard.n["additional-name"] || hcard.n["honorific-prefix"] ||
        hcard.n["honorific-suffix"])) {
        vcf += "N;CHARSET=UTF-8:";
        if (hcard.n["family-name"]) {
            vcf += hcard.n["family-name"].join(",");
        }
        vcf += ";";
        if (hcard.n["given-name"]) {
            vcf += hcard.n["given-name"].join(",");
        }
        vcf += ";";
        if (hcard.n["additional-name"]) {
            vcf += hcard.n["additional-name"].join(",");
        }
        vcf += ";";
        if (hcard.n["honorific-prefix"]) {
            vcf += hcard.n["honorific-prefix"].join(",");
        }
        vcf += ";";
        if (hcard.n["honorific-suffix"]) {
            vcf += hcard.n["honorific-suffix"].join(",");
        }
        vcf += crlf;
    } else {
        vcf += "N:;;;;" + crlf;
    }
    if (hcard.org) {
        vcf += "ORG;CHARSET=UTF-8:";
        if (hcard.org[0]["organization-name"]) {
            vcf += hcard.org[0]["organization-name"];
        }
        if (hcard.org[0]["organization-unit"]) {
            vcf += ";";
            vcf += hcard.org[0]["organization-unit"].join(";");
        }
        vcf += crlf;
    }
    if (hcard.fn) {
        vcf += "FN;CHARSET=UTF-8:" + hcard.fn + crlf;
    }
    if (hcard.title) {
        vcf += "TITLE;CHARSET=UTF-8:" + hcard.title[0] + crlf;
    }
    if (hcard.role) {
        vcf += "ROLE;CHARSET=UTF-8:" + hcard.role[0] + crlf;
    }
    if (hcard["sort-string"]) {
        vcf += "SORT-STRING;CHARSET=UTF-8:" + hcard["sort-string"] + crlf;
    }
    if (hcard["class"]) {
        vcf += "CLASS;CHARSET=UTF-8:" + hcard["class"] + crlf;
    }
    if (hcard.tz) {
        vcf += "TZ;CHARSET=UTF-8:" + hcard.tz + crlf;
    }
    if (hcard.category) {
        vcf += "CATEGORIES;CHARSET=UTF-8:" + hcard.category.join(",") + crlf;
    }
    if (hcard.rev) {
        vcf += "REV:" + hcard.rev + crlf;
    }
    if (hcard.bday) {
        vcf += "BDAY:" + hcard.bday + crlf;
    }
    if (hcard.uid) {
        vcf += "UID:" + hcard.uid + crlf;
    } else {
        vcf += "UID:" + crlf;
    }
    if (hcard.url) {
        for (i = 0; i < hcard.url.length; i++) {
            if (/^aim:/.test(hcard.url[i])) {
                vcf += "X-AIM:" + hcard.url[i].split('=')[1] + crlf;
            } else if (/^ymsgr:/.test(hcard.url[i])) {
                vcf += "X-YAHOO:" + hcard.url[i].split('?')[1] + crlf;
            } else if (/^msnim:/.test(hcard.url[i])) {
                vcf += "X-MSN:" + hcard.url[i].split('=')[1] + crlf;
            } else if (/^skype/.test(hcard.url[i])) {
                vcf += "X-SKYPE:" + hcard.url[i].split(':')[1].split('?')[0] + crlf;
            }
            vcf += "URL:" + hcard.url[i] + crlf;
        }
    }
    if (hcard.email) {
        for (i = 0; i < hcard.email.length; i++) {
            vcf += "EMAIL";
            if (hcard.email[i].type) {
                vcf += ";TYPE=";
                vcf += hcard.email[i].type.join(",");
            }
            vcf += ":";
            vcf += hcard.email[i].value;
            vcf += crlf;
        }
    }
    if (hcard.adr) {
        for (i = 0; i < hcard.adr.length; i++) {
            vcf += "ADR;CHARSET=UTF-8";
            if (hcard.adr[i].type) {
                vcf += ";TYPE=";
                vcf += hcard.adr[i].type.join(",");
            }
            vcf += ":";
            if (hcard.adr[i]["post-office-box"]) {
                vcf += hcard.adr[i]["post-office-box"];
            }
            vcf += ";";
            if (hcard.adr[i]["extended-address"]) {
                vcf += hcard.adr[i]["extended-address"];
            }
            vcf += ";";
            if (hcard.adr[i]["street-address"]) {
                vcf += hcard.adr[i]["street-address"].join(",");
            }
            vcf += ";";
            if (hcard.adr[i].locality) {
                vcf += hcard.adr[i].locality;
            }
            vcf += ";";
            if (hcard.adr[i].region) {
                vcf += hcard.adr[i].region;
            }
            vcf += ";";
            if (hcard.adr[i]["postal-code"]) {
                vcf += hcard.adr[i]["postal-code"];
            }
            vcf += ";";
            if (hcard.adr[i]["country-name"]) {
                vcf += hcard.adr[i]["country-name"];
            }
            vcf += crlf;
        }
    }
    if (hcard.tel) {
        for (i = 0; i < hcard.tel.length; i++) {
            vcf += "TEL;TYPE=";
            if (hcard.tel[i].type) {
                vcf += hcard.tel[i].type.join(",");
            } else {
                /* Default to voice if there is no type */
                vcf += "VOICE";
            }
            vcf += ":";
            vcf += hcard.tel[i].value;
            vcf += crlf;
        }
    }
    if (hcard.geo) {
        vcf += "GEO:" + hcard.geo.latitude + ";" + hcard.geo.longitude + crlf;
    }
    if (hcard.note) {
        vcf += "NOTE;CHARSET=UTF-8:";
        for (i = 0; i < hcard.note.length; i++) {
            var s = hcard.note[i].toString();
            if (!s) {
                continue;
            }
            s = s.replace(/\<.*?\>/gi, ' ');
            s = s.replace(/[\n\r\t]/gi, ' ');
            s = s.replace(/\s{2,}/gi, ' ');
            s = s.replace(/\s{2,}/gi, '');
            s = s.replace(/^\s+/, '');
            if (i != 0) {
                vcf += " ";
            }
            vcf += s;
        }
        vcf += crlf;
    }
    if (hcard.nickname) {
        vcf += "NICKNAME;CHARSET=UTF-8:" + hcard.nickname + crlf;
    }
    /* Add code to handle data URLs */
    if (hcard.photo) {
        vcf += "PHOTO;VALUE=uri:" + hcard.photo + crlf;
    }
    if (hcard.logo) {
        vcf += "LOGO;VALUE=uri:" + hcard.logo + crlf;
    }
    if (hcard.label) {
        vcf += "LABEL:" + hcard.label + crlf;
    }
    vcf += "END:VCARD" + crlf;
    return vcf;
}