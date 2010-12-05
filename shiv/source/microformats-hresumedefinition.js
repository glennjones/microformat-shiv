/*! 
A compact JavaScript cross browser microformats parser by Glenn Jones. Based 
on the Mozilla Labs Operator microformats parser created by Michael Kaply 

Copyright (C) 2010 Glenn Jones. All Rights Reserved.
License: http://microformatshiv.com/license/
*/

function ufhResume(node) {
  if (node) {
      ufShiv.parser.newMicroformat(this, node, "hResume");
  }
}

var ufhResume_definition = {
  mfObject: ufhResume,
  className: "hresume",
  properties: {
    "affiliation" : {
      plural: true,
      datatype: "microformat",
      microformat: "hCard"
    },
    "education" : {
      plural: true,
      datatype: "microformat",
      microformat: "hCalendar"
    },
    "experience" : {
      datatype: "microformat",
      microformat: "hCalendar",
      plural: true
    },
    "summary" : {
    },
    /* This might be incorrect. I use contact before I use address with vcard */
    "contact" : {
      virtual: true,
      datatype: "microformat",
      microformat: "hCard",
      virtualGetter: function(mfnode) {
        /* We didn't find a contact, so use the first vcard */
        var vcards = Microformats.getElementsByClassName(mfnode, "vcard");
        if (vcards.length > 0) {
          var i;
          var noAffiliation = -1;
          for (var i =0; i < vcards.length; i++) {
            if (vcards[i].nodeName.toLowerCase() == "address") {
              return new hCard(vcards[i]);
            } else {
              if (noAffiliation < 0) {
                if (!vcards[i].className.match("(^|\\s)" + "affiliation" + "(\\s|$)")) {
                  noAffiliation = i;
                }
              }
            }
          }
          if (noAffiliation >= 0) {
            return new hCard(vcards[noAffiliation]);
          }
        }
      }
    }
  }
};

ufShiv.add("hResume", ufhResume_definition);


