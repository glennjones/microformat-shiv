/*! 
hFeed,hEntry
Copyright (C) 2010 Glenn Jones. All Rights Reserved.
License: http://microformatshiv.com/license/
Version 0.2
*/

/* 
For this definition hAtom is broken into hFeed and hEntry 
This definition is simplistic and does not fully conform to the wiki specification
*/

if (ufShiv) {

    // Keep out of global scope
    (function () {

        var hentry = {

          className: "hentry",
          properties: {
            "author": {
                plural: true,
                datatype: "microformat",
                microformat: "hCard"
            },
            "bookmark" : {
              subproperties: {
                "link" : {
                  virtual: true,
                  datatype: "anyURI"
                },
                "text" : {
                  virtual: true
                }
              },
              rel: true
            },
            "entry-title" : {},
            "entry-content" : {
              plural: true
            },
            "entry-summary" : {
              plural: true
            },
            "published" : {
              datatype: "dateTime"
            },
            "updated" : {
              virtual: true,
              datatype: "dateTime",
              virtualGetter: function(context, mfnode) {
                  return context.getMicroformatProperty(mfnode, "hEntry", "published");
              }
            },
            "tag": {
            plural: true,
              rel: true,
              datatype: "microformat",
              microformat: "tag"
            }
          }
        };

        var hfeed = {

          className: "hfeed",
          alternateClassName: "hentry",
          properties: {
            "author" : {
              plural: true,
              datatype: "microformat",
              microformat: "hCard"
            },
            "tag": {
            plural: true,
              rel: true,
              datatype: "microformat",
              microformat: "tag"
            }
          }
        };

        ufShiv.add("hEntry", hentry);
        ufShiv.add("hFeed", hfeed);



    })();
}



