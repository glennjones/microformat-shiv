/*! 
hReview
Copyright (C) 2010 Glenn Jones. All Rights Reserved.
License: http://microformatshiv.com/license/ 
Version 0.2
*/

/* 
This definition has not been test to see if it fully conforms to the wiki specification
*/


if (ufShiv) {

    // Keep out of global scope
    (function () {

        var hreview = {

            className: "hreview",
            properties: {
                "dtreviewed": {
                    datatype: "dateTime"
                },
                "description": {
            },
            "item": {
                datatype: "custom",
                customGetter: function (propnode) {
                    var item;
                    var s = ufShiv.internal;
                    if (propnode.className.match("(^|\\s)" + "vcard" + "(\\s|$)")) {
                        item = s.getMicroformat(propnode, 'hCard');
                    } else if (propnode.className.match("(^|\\s)" + "vevent" + "(\\s|$)")) {
                        item = s.getMicroformat(propnode, 'hCalendar');
                    } else {
                        item = {};
                        var fns = s.getElementsByClassName(propnode, "fn");
                        if (fns.length > 0) {
                            item.fn = s.defaultGetter(fns[0]);
                        }
                        var urls = s.getElementsByClassName(propnode, "url");
                        if (urls.length > 0) {
                            item.url = s.uriGetter(urls[0]);
                        }
                        var photos = s.getElementsByClassName(propnode, "photo");
                        if (photos.length > 0) {
                            item.photo = s.uriGetter(photos[0]);
                        }
                    }
                    /* Only return item if it has stuff in it */
                    for (var i in item) {
                        return item;
                    }
                    return;
                }
            },
            "rating": {
                datatype: "float"
            },
            "best": {
                datatype: "float"
            },
            "worst": {
                datatype: "float"
            },
            "reviewer": {
                datatype: "microformat",
                microformat: "hCard"
            },
            "summary": {
        },
        "type": {
            types: ["product", "business", "event", "person", "place", "website", "url"]
        },
        "tag": {
            plural: true,
            rel: true,
            datatype: "microformat",
            microformat: "tag"
        },
        "version": {
    }
}
};

ufShiv.add("hReview", hreview);

})();
}


