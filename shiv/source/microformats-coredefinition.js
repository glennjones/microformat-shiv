/*
hCard,hCalendar,geo,adr,tag and xfn
Copyright (C) 2010 Glenn Jones. All Rights Reserved.
License: http://microformatshiv.com/license/
Version 0.2
*/


if (ufShiv) {

    // Keep out of global scope
    (function () {

        var adr = {
            className: "adr",
            properties: {
                "type": {
                    plural: true,
                    values: ["work", "home", "pref", "postal", "dom", "intl", "parcel"]
                },
                "post-office-box": {},
                "street-address": {
                    plural: true
                },
                "extended-address": {
                    plural: true
                },
                "locality": {},
                "region": {},
                "postal-code": {},
                "country-name": {}
            }
        };
        ufShiv.add("adr", adr);


        var hcard = {
            className: "vcard",
            properties: {
                "adr": {
                    plural: true,
                    datatype: "microformat",
                    microformat: "adr"
                },
                "agent": {
                    plural: true,
                    datatype: "microformat",
                    microformat: "hCard"
                },
                "bday": {
                    datatype: "dateTime"
                },
                "class": {},
                "category": {
                    plural: true,
                    datatype: "microformat",
                    microformat: "tag",
                    microformat_property: "tag"
                },
                "email": {
                    subproperties: {
                        "type": {
                            plural: true,
                            values: ["internet", "x400", "pref"]
                        },
                        "value": {
                            datatype: "email",
                            virtual: true
                        }
                    },
                    plural: true
                },
                "fn": {
                    virtual: true,
                    virtualGetter: function (context, mfnode) {
                        /* Changed to DOM based query - Glenn Jones */
                        if (context) {
                            if (context.getTextContent) {
                                var givenName = context.getElementsByClassName(mfnode, "given-name");
                                var additionalName = context.getElementsByClassName(mfnode, "additional-name");
                                var familyName = context.getElementsByClassName(mfnode, "family-name");
                                var fn = '';

                                if (context.getTextContent(givenName) != undefined)
                                    fn += givenName + ' ';

                                if (context.getTextContent(additionalName) != undefined)
                                    fn += additionalName + ' ';

                                if (context.getTextContent(familyName) != undefined)
                                    fn += familyName + ' ';

                            }
                        }
                    }
                },
                "geo": {
                    datatype: "microformat",
                    microformat: "geo"
                },
                "key": {
                    plural: true
                },
                "label": {
                    plural: true
                },
                "logo": {
                    plural: true,
                    datatype: "anyURI"
                },
                "mailer": {
                    plural: true
                },
                "n": {
                    subproperties: {
                        "honorific-prefix": {
                            plural: true
                        },
                        "given-name": {
                            plural: true
                        },
                        "additional-name": {
                            plural: true
                        },
                        "family-name": {
                            plural: true
                        },
                        "honorific-suffix": {
                            plural: true
                        }
                    },
                    virtual: true,
                    /*  Implied "n" Optimization */
                    /* http://microformats.org/wiki/hcard#Implied_.22n.22_Optimization */
                    virtualGetter: function (context, mfnode) {
                        var fn = context.getMicroformatProperty(mfnode, "hCard", "fn");
                        var orgs = context.getMicroformatProperty(mfnode, "hCard", "org");
                        var given_name = [];
                        var family_name = [];
                        if (fn && (!orgs || (orgs.length > 1) || (fn != orgs[0]["organization-name"]))) {
                            var fns = fn.split(" ");
                            if (fns.length === 2) {
                                if (fns[0].charAt(fns[0].length - 1) == ',') {
                                    given_name[0] = fns[1];
                                    family_name[0] = fns[0].substr(0, fns[0].length - 1);
                                } else if (fns[1].length == 1) {
                                    given_name[0] = fns[1];
                                    family_name[0] = fns[0];
                                } else if ((fns[1].length == 2) && (fns[1].charAt(fns[1].length - 1) == '.')) {
                                    given_name[0] = fns[1];
                                    family_name[0] = fns[0];
                                } else {
                                    given_name[0] = fns[0];
                                    family_name[0] = fns[1];
                                }
                                return { "given-name": given_name, "family-name": family_name };
                            }
                        }
                        return undefined;
                    }
                },
                "nickname": {
                    plural: true,
                    virtual: true,
                    /* Implied "nickname" Optimization */
                    /* http://microformats.org/wiki/hcard#Implied_.22nickname.22_Optimization */
                    virtualGetter: function (context, mfnode) {
                        var fn = context.getMicroformatProperty(mfnode, "hCard", "fn");
                        var orgs = context.getMicroformatProperty(mfnode, "hCard", "org");
                        var given_name;
                        var family_name;
                        if (fn && (!orgs || (orgs.length) > 1 || (fn != orgs[0]["organization-name"]))) {
                            var fns = fn.split(" ");
                            if (fns.length === 1) {
                                return [fns[0]];
                            }
                        }
                        return undefined;
                    }
                },
                "note": {
                    plural: true,
                    datatype: "HTML"
                },
                "org": {
                    subproperties: {
                        "organization-name": {
                            virtual: true
                        },
                        "organization-unit": {
                            plural: true
                        }
                    },
                    plural: true
                },
                "photo": {
                    plural: true,
                    datatype: "anyURI"
                },
                "rev": {
                    datatype: "dateTime"
                },
                "role": {
                    plural: true
                },
                "sequence": {},
                "sort-string": {},
                "sound": {
                    plural: true
                },
                "title": {
                    plural: true
                },
                "tel": {
                    subproperties: {
                        "type": {
                            plural: true,
                            values: ["msg", "home", "work", "pref", "voice", "fax", "cell", "video", "pager", "bbs", "car", "isdn", "pcs"]
                        },
                        "value": {
                            datatype: "tel",
                            virtual: true
                        }
                    },
                    plural: true
                },
                "tz": {},
                "uid": {
                    datatype: "anyURI"
                },
                "url": {
                    plural: true,
                    datatype: "anyURI"
                }
            }
        };

        ufShiv.add("hCard", hcard);



        var hcalendar = {
            className: "vevent",
            properties: {
                "category": {
                    plural: true,
                    datatype: "microformat",
                    microformat: "tag",
                    microformat_property: "tag"
                },
                "class": {
                    values: ["public", "private", "confidential"]
                },
                "description": {
                    datatype: "HTML"
                },
                "dtstart": {
                    datatype: "dateTime"
                },
                "dtend": {
                    datatype: "dateTime",
                    virtual: true,
                    /* This will only be called in the virtual case */
                    /* If we got here, we have a dtend time without date */
                    virtualGetter: function (context, mfnode) {
                        var dtends = context.getElementsByClassName(mfnode, "dtend");
                        if (dtends.length === 0) {
                            return undefined;
                        }
                        var dtend = context.dateTimeGetter(dtends[0], mfnode, true);
                        var dtstarts = context.getElementsByClassName(mfnode, "dtstart");
                        if (dtstarts.length > 0) {
                            var dtstart = context.dateTimeGetter(dtstarts[0], mfnode);
                            if (dtstart.match("T")) {
                                return context.normalizeISO8601(dtstart.split("T")[0] + "T" + dtend);
                            }
                        }
                        return undefined;
                    }
                },
                "dtstamp": {
                    datatype: "dateTime"
                },
                "duration": {
            },
            "geo": {
                datatype: "microformat",
                microformat: "geo"
            },
            "location": {
                datatype: "microformat",
                microformat: "hCard"
            },
            "status": {
                values: ["tentative", "confirmed", "cancelled"]
            },
            "summary": {},
            "transp": {
                values: ["opaque", "transparent"]
            },
            "uid": {
                datatype: "anyURI"
            },
            "url": {
                datatype: "anyURI"
            },
            "last-modified": {
                datatype: "dateTime"
            },
            "rrule": {
                subproperties: {
                    "interval": {
                        virtual: true,
                        /* This will only be called in the virtual case */
                        virtualGetter: function (context, mfnode) {
                            return context.hCalendar.properties.rrule.retrieve(mfnode, "interval");
                        }
                    },
                    "freq": {
                        virtual: true,
                        /* This will only be called in the virtual case */
                        virtualGetter: function (context, mfnode) {
                            return context.hCalendar.properties.rrule.retrieve(mfnode, "freq");
                        }
                    },
                    "bysecond": {
                        virtual: true,
                        /* This will only be called in the virtual case */
                        virtualGetter: function (context, mfnode) {
                            return context.hCalendar.properties.rrule.retrieve(mfnode, "bysecond");
                        }
                    },
                    "byminute": {
                        virtual: true,
                        /* This will only be called in the virtual case */
                        virtualGetter: function (context, mfnode) {
                            return context.hCalendar.properties.rrule.retrieve(mfnode, "byminute");
                        }
                    },
                    "byhour": {
                        virtual: true,
                        /* This will only be called in the virtual case */
                        virtualGetter: function (context, mfnode) {
                            return context.hCalendar.properties.rrule.retrieve(mfnode, "byhour");
                        }
                    },
                    "bymonthday": {
                        virtual: true,
                        /* This will only be called in the virtual case */
                        virtualGetter: function (context, mfnode) {
                            return context.hCalendar.properties.rrule.retrieve(mfnode, "bymonthday");
                        }
                    },
                    "byyearday": {
                        virtual: true,
                        /* This will only be called in the virtual case */
                        virtualGetter: function (context, mfnode) {
                            return context.hCalendar.properties.rrule.retrieve(mfnode, "byyearday");
                        }
                    },
                    "byweekno": {
                        virtual: true,
                        /* This will only be called in the virtual case */
                        virtualGetter: function (context, mfnode) {
                            return context.hCalendar.properties.rrule.retrieve(mfnode, "byweekno");
                        }
                    },
                    "bymonth": {
                        virtual: true,
                        /* This will only be called in the virtual case */
                        virtualGetter: function (context, mfnode) {
                            return context.hCalendar.properties.rrule.retrieve(mfnode, "bymonth");
                        }
                    },
                    "byday": {
                        virtual: true,
                        /* This will only be called in the virtual case */
                        virtualGetter: function (context, mfnode) {
                            return context.hCalendar.properties.rrule.retrieve(mfnode, "byday");
                        }
                    },
                    "until": {
                        virtual: true,
                        /* This will only be called in the virtual case */
                        virtualGetter: function (context, mfnode) {
                            return context.hCalendar.properties.rrule.retrieve(mfnode, "until");
                        }
                    },
                    "count": {
                        virtual: true,
                        /* This will only be called in the virtual case */
                        virtualGetter: function (context, mfnode) {
                            return context.hCalendar.properties.rrule.retrieve(mfnode, "count");
                        }
                    }
                },
                retrieve: function (mfnode, property) {
                    var value = ufShiv.internal.textGetter(mfnode);
                    var rrule;
                    rrule = value.split(';');
                    for (var i = 0; i < rrule.length; i++) {
                        if (rrule[i].match(property)) {
                            return rrule[i].split('=')[1];
                        }
                    }
                    return undefined;
                }
            }
        }
    };

    ufShiv.add("hCalendar", hcalendar);


    var geo = {
        className: "geo",
        properties: {
            "latitude": {
                datatype: "float",
                virtual: true,
                /* This will only be called in the virtual case */
                virtualGetter: function (context, mfnode) {
                    var value = context.textGetter(mfnode);
                    var latlong;
                    if (value && value.match(';')) {
                        latlong = value.split(';');
                        if (latlong[0]) {
                            if (!isNaN(latlong[0])) {
                                return parseFloat(latlong[0]);
                            }
                        }
                    }
                    return undefined;
                }
            },
            "longitude": {
                datatype: "float",
                virtual: true,
                /* This will only be called in the virtual case */
                virtualGetter: function (context, mfnode) {
                    var value = context.textGetter(mfnode);
                    var latlong;
                    if (value && value.match(';')) {
                        latlong = value.split(';');
                        if (latlong[1]) {
                            if (!isNaN(latlong[1])) {
                                return parseFloat(latlong[1]);
                            }
                        }
                    }
                    return undefined;
                }
            }
        }
    };

    ufShiv.add("geo", geo);



    var tag = {
        altName: "tag",
        attributeName: "rel",
        attributeValues: "tag",
        properties: {
            "tag": {
                virtual: true,
                virtualGetter: function (context, mfnode) {
                    if (mfnode.href) {
                        var href = mfnode.href.split("?")[0].split("#")[0];
                        var url_array = href.split("/");
                        for (var i = url_array.length - 1; i > 0; i--) {
                            if (url_array[i] !== "") {
                                var tag = context.tag.validTagName(url_array[i].replace(/\+/g, ' '));
                                if (tag) {
                                    try {
                                        return decodeURIComponent(tag);
                                    } catch (ex) {
                                        return unescape(tag);
                                    }
                                    //return { 'text': mfnode.innerHTML, 'link': mfnode.href, 'tag': tag }
                                }
                            }
                        }
                    }
                    return null;
                }
            },
            "link": {
                virtual: true,
                datatype: "anyURI"
            },
            "text": {
                virtual: true
            }
        },
        validTagName: function (tag) {
            var returnTag = tag;
            if (tag.indexOf('?') != -1) {
                if (tag.indexOf('?') === 0) {
                    return false;
                } else {
                    returnTag = tag.substr(0, tag.indexOf('?'));
                }
            }
            if (tag.indexOf('#') != -1) {
                if (tag.indexOf('#') === 0) {
                    return false;
                } else {
                    returnTag = tag.substr(0, tag.indexOf('#'));
                }
            }
            if (tag.indexOf('.html') != -1) {
                if (tag.indexOf('.html') == tag.length - 5) {
                    return false;
                }
            }
            return returnTag;
        }
    };

    ufShiv.add("tag", tag);



    var xfn = {
        altName: "xfn",
        attributeName: "rel",
        attributeValues: "contact acquaintance friend met co-worker colleague " +
                           "co-resident neighbor child parent sibling spouse kin " +
                           "muse crush date sweetheart me",
        properties: {
            "contact": {
                virtual: true,
                virtualGetter: function (context, propnode) {
                    return context.XFN.getXFN(propnode, "contact");
                }
            },
            "acquaintance": {
                virtual: true,
                virtualGetter: function (context, propnode) {
                    return context.XFN.getXFN(propnode, "acquaintance");
                }
            },
            "friend": {
                virtual: true,
                virtualGetter: function (context, propnode) {
                    return context.XFN.getXFN(propnode, "friend");
                }
            },
            "met": {
                virtual: true,
                virtualGetter: function (context, propnode) {
                    return context.XFN.getXFN(propnode, "met");
                }
            },
            "co-worker": {
                virtual: true,
                virtualGetter: function (context, propnode) {
                    return context.XFN.getXFN(propnode, "co-worker");
                }
            },
            "colleague": {
                virtual: true,
                virtualGetter: function (context, propnode) {
                    return context.XFN.getXFN(propnode, "colleague");
                }
            },
            "co-resident": {
                virtual: true,
                virtualGetter: function (context, propnode) {
                    return context.XFN.getXFN(propnode, "co-resident");
                }
            },
            "neighbor": {
                virtual: true,
                virtualGetter: function (context, propnode) {
                    return context.XFN.getXFN(propnode, "neighbor");
                }
            },
            "child": {
                virtual: true,
                virtualGetter: function (context, propnode) {
                    return context.XFN.getXFN(propnode, "child");
                }
            },
            "parent": {
                virtual: true,
                virtualGetter: function (context, propnode) {
                    return context.XFN.getXFN(propnode, "parent");
                }
            },
            "sibling": {
                virtual: true,
                virtualGetter: function (context, propnode) {
                    return context.XFN.getXFN(propnode, "sibling");
                }
            },
            "spouse": {
                virtual: true,
                virtualGetter: function (context, propnode) {
                    return context.XFN.getXFN(propnode, "spouse");
                }
            },
            "kin": {
                virtual: true,
                virtualGetter: function (context, propnode) {
                    return context.XFN.getXFN(propnode, "kin");
                }
            },
            "muse": {
                virtual: true,
                virtualGetter: function (context, propnode) {
                    return context.XFN.getXFN(propnode, "muse");
                }
            },
            "crush": {
                virtual: true,
                virtualGetter: function (context, propnode) {
                    return context.XFN.getXFN(propnode, "crush");
                }
            },
            "date": {
                virtual: true,
                virtualGetter: function (context, propnode) {
                    return context.XFN.getXFN(propnode, "date");
                }
            },
            "sweetheart": {
                virtual: true,
                virtualGetter: function (context, propnode) {
                    return context.XFN.getXFN(propnode, "sweetheart");
                }
            },
            "me": {
                virtual: true,
                virtualGetter: function (context, propnode) {
                    return context.XFN.getXFN(propnode, "me");
                }
            },
            "link": {
                virtual: true,
                datatype: "anyURI"
            },
            "text": {
                virtual: true
            }
        },
        getXFN: function (propnode, relationship) {
            var rel = propnode.getAttribute("rel");
            if (rel.match("(^|\\s)" + relationship + "(\\s|$)")) {
                return true;
            }
            return false;
        }
    };

    ufShiv.add("XFN", xfn);

})();
}