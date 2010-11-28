/*! 
A compact JavaScript cross browser microformats parser by Glenn Jones. Based 
on the Mozilla Labs Operator microformats parser created by Michael Kaply 

Copyright (C) 2010 Glenn Jones. All Rights Reserved.
License: http://microformatshiv.com/license/
*/


function ufPoCo(node, validate) {
    if (node) {
        ufShiv.parser.newMicroformat(this, node, "PoCo", validate);
    }
}

var ufPoCo_definition = {
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

ufShiv.add("PoCo", ufPoCo_definition);

