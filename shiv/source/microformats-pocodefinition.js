/*! 
hPoCo
Copyright (C) 2010 Glenn Jones. All Rights Reserved.
License: http://microformatshiv.com/license/
Version 0.2
*/

if (ufShiv) {

    // Keep out of global scope
    (function () {

        var poco = {
            mfObject: ufPoCo,
            className: "poco",
            required: ["displayName"],
            properties: {
                "urls": {
                    plural: true,
                    datatype: "anyURI"
                },
                "phoneNumbers": {
                    subproperties: {
                        "type": {
                            plural: true,
                            values: ["msg", "home", "work", "pref", "voice", "fax", "cell", "video", "pager", "bbs", "car", "isdn", "pcs"]
                        },
                        "value": {
                            datatype: "phoneNumbers",
                            virtual: true
                        }
                    },
                    plural: true
                },
                "accounts": {
                    subproperties: {
                        "domain": {},
                        "username": {},
                        "userid": {}
                    },
                    plural: true
                },
                "emails": {
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
                "displayName": {
                    required: true
                }
            }
        }

        ufShiv.add("PoCo", poco);


    })();
}

