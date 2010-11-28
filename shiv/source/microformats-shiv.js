/*! 
A compact JavaScript cross browser microformats parser by Glenn Jones. Based 
on the Mozilla Labs Operator microformats parser created by Michael Kaply 

Copyright (C) 2010 Glenn Jones. All Rights Reserved.
License: http://microformatshiv.com/license/
*/


var ufShiv = {
    version: 0.1,
    list: [],

    get: function (name, rootElement) {

        if (!ufShiv[name] || !rootElement) {
            return undefined;
        }

        var targetArray = [];
        var microformatNodes = [];

        if (ufShiv[name].className) {
            microformatNodes = ufShiv.getElementsByClassName(rootElement, ufShiv[name].className);
            if ((microformatNodes.length == 0) && ufShiv[name].alternateClassName) {
                var altClass = ufShiv.getElementsByClassName(rootElement, ufShiv[name].alternateClassName);
                if (altClass.length > 0) {
                    microformatNodes.push(rootElement);
                }
            }
        } else if (ufShiv[name].attributeValues) {
            microformatNodes = ufShiv.getElementsByAttribute(rootElement, ufShiv[name].attributeName, ufShiv[name].attributeValues);
        }

        for (var i = 0; i < microformatNodes.length; i++) {
            targetArray.push(ufShiv.parser.getMicroformat(microformatNodes[i], name));
        }

        if (name == 'XFN')
            targetArray = ufShiv.compressXFN(targetArray);

        var obj = {}
        obj[name] = targetArray;
        return obj;

    },

    add: function add(microformat, microformatDefinition) {
        if (!ufShiv[microformat]) {
            ufShiv.list.push(microformat);
        }
        ufShiv[microformat] = microformatDefinition;

        microformatDefinition.mfObject.prototype.debug =
        function (microformatObject) {
            return ufShiv.debug(microformatObject)
        };
    },


    // Left to surpport Operators definition interface
    newMicroformat: function (object, in_node, microformat, validate) { },


    parser: {

        getMicroformat: function getMicroformat(node, microformat) {
            var uf = {};
            for (var i in ufShiv[microformat].properties) {
                var item = ufShiv.parser.getMicroformatProperty(node, microformat, i);
                if (item != undefined)
                    uf[i] = item;
            }
            return uf;
        },

        // in_mfnode, The node containing the microformat
        // mfname, The name a microformat definition
        // propname, The names of the current property definition
        getMicroformatProperty: function getMicroformatProperty(in_mfnode, mfname, propname) {
            var mfnode = in_mfnode;



            /* If the node has not been preprocessed, the requested microformat */
            /* is a class based microformat and the passed in node is not the */
            /* entire document, preprocess it. Preprocessing the node involves */
            /* creating a duplicate of the node and taking care of things like */
            /* the include and header design patterns */

            if (!in_mfnode.origNode && ufShiv[mfname].className && in_mfnode.ownerDocument) {
                mfnode = ufShiv.parser.preProcessMicroformat(in_mfnode);
            }



            /* propobj is the corresponding property object in the microformat */
            var propobj;

            /* If there is a corresponding property in the microformat, use it */
            if (ufShiv[mfname].properties[propname]) {
                propobj = ufShiv[mfname].properties[propname];
            } else {
                /* If we didn't get a property, bail */
                return undefined;
            }


            /* Query the correct set of nodes (rel or class) based on the setting */
            /* in the property */
            var propnodes;
            if (propobj.rel == true) {
                propnodes = ufShiv.getElementsByAttribute(mfnode, "rel", propname);
            } else {
                propnodes = ufShiv.getElementsByClassName(mfnode, propname);
            }


            for (var i = propnodes.length - 1; i >= 0; i--) {

                /* The reason getParent is not used here is because this code does */
                /* not apply to attribute based microformats, plus adr and geo */
                /* when contained in hCard are a special case */
                var parentnode;
                var node = propnodes[i];
                for (var j = 0; j < ufShiv.list.length; j++) {
                    /* Don't treat adr or geo in an hCard as a microformat in this case */
                    if ((mfname == "hCard") && ((ufShiv.list[j] == "adr") || (ufShiv.list[j] == "geo"))) {
                        continue;
                    }
                    if (ufShiv[ufShiv.list[j]].className) {
                        /* Removed xPath replaced with DOM tree walker ie .findParentByClass Glenn Jones */
                        var found = ufShiv.findParentByClass(node, ufShiv[ufShiv.list[j]].className);
                        if (found != null) {
                            parentnode = found;
                        }
                    }
                }

                /* If the propnode is not a child of the microformat, and */
                /* the property belongs to the parent microformat as well, */
                /* remove it. */
                if (parentnode != mfnode) {
                    var mfNameString = ufShiv.getNamesFromNode(parentnode);
                    var mfNames = mfNameString.split(" ");
                    var j;
                    for (j = 0; j < mfNames.length; j++) {
                        /* If this property is in the parent microformat, remove the node  */
                        if (ufShiv[mfNames[j]].properties[propname]) {
                            propnodes.splice(i, 1); ;
                            break;
                        }
                    }
                }
            }
            if (propnodes.length > 0) {
                var resultArray = [];
                for (var i = 0; i < propnodes.length; i++) {
                    var subresult = ufShiv.parser.getPropertyInternal(propnodes[i],
                                                                  mfnode,
                                                                  propobj,
                                                                  propname,
																  mfnode);
                    if (subresult != undefined) {
                        resultArray.push(subresult);
                        /* If we're not a plural property, don't bother getting more */
                        if (!propobj.plural) {
                            return resultArray[0];
                        }
                    }
                }
                if (resultArray.length > 0) {
                    return resultArray;
                }
            } else {
                /* If we didn't find any class nodes, check to see if this property */
                /* is virtual and if so, call getPropertyInternal again */
                if (propobj.virtual) {
                    return ufShiv.parser.getPropertyInternal(mfnode, null,
                                                         propobj, propname, mfnode);
                }
            }
            return undefined;
        },


        getPropertyInternal: function getPropertyInternal(propnode, parentnode, propobj, propname, mfnode) {
            var result;
            if (propobj.subproperties) {
                for (var subpropname in propobj.subproperties) {
                    var subpropnodes;
                    var subpropobj = propobj.subproperties[subpropname];
                    if (subpropobj.rel == true) {
                        subpropnodes = ufShiv.getElementsByAttribute(propnode, "rel", subpropname);
                    } else {
                        subpropnodes = ufShiv.getElementsByClassName(propnode, subpropname);
                    }
                    var resultArray = [];
                    var subresult;
                    for (var i = 0; i < subpropnodes.length; i++) {
                        subresult = ufShiv.parser.getPropertyInternal(subpropnodes[i], propnode,
                                                                subpropobj,
                                                                subpropname, mfnode);
                        if (subresult != undefined) {
                            resultArray.push(subresult);
                            /* If we're not a plural property, don't bother getting more */
                            if (!subpropobj.plural) {
                                break;
                            }
                        }
                    }
                    if (resultArray.length == 0) {
                        subresult = ufShiv.parser.getPropertyInternal(propnode, null,
                                                                subpropobj,
                                                                subpropname, mfnode);
                        if (subresult != undefined) {
                            resultArray.push(subresult);
                        }
                    }
                    if (resultArray.length > 0) {
                        result = result || {};
                        if (subpropobj.plural) {
                            result[subpropname] = resultArray;
                        } else {
                            result[subpropname] = resultArray[0];
                        }
                    }
                }
            }
            if (!parentnode || ((result == undefined) && propobj.subproperties)) {
                if (propobj.virtual) {
                    if (propobj.virtualGetter) {
                        result = propobj.virtualGetter(mfnode || propnode);
                    } else {
                        result = ufShiv.parser.datatypeHelper(propobj, propnode);
                    }
                }
            } else if (result == undefined) {
                result = ufShiv.parser.datatypeHelper(propobj, propnode, parentnode);
                if ((result == undefined) && !propobj.subproperties) {
                    if (propobj.virtual && propobj.virtualGetter) {
                        result = propobj.virtualGetter(parentnode);
                    }
                }
            }
            return result;
        },


        /**
        * Internal parser API used to resolve includes and headers. Includes are
        * resolved by simply cloning the node and replacing it in a clone of the
        * original DOM node. Headers are resolved by creating a span and then copying
        * the innerHTML and the class name.
        *
        * @param  in_mfnode The node to preProcess.
        * @return If the node had includes or headers, a cloned node otherwise
        *         the original node. You can check to see if the node was cloned
        *         by looking for .origNode in the new node.
        */
        preProcessMicroformat: function preProcessMicroformat(in_mfnode) {
            var mfnode;
            if ((in_mfnode.nodeName.toLowerCase() == "td") && (in_mfnode.getAttribute("headers"))) {
                mfnode = in_mfnode.cloneNode(true);
                mfnode.origNode = in_mfnode;
                var headers = in_mfnode.getAttribute("headers").split(" ");
                for (var i = 0; i < headers.length; i++) {
                    var tempNode = in_mfnode.ownerDocument.createElement("span");
                    var headerNode = in_mfnode.ownerDocument.getElementById(headers[i]);
                    if (headerNode) {
                        tempNode.innerHTML = headerNode.innerHTML;
                        tempNode.className = headerNode.className;
                        mfnode.appendChild(tempNode);
                    }
                }
            } else {
                mfnode = in_mfnode;
            }
            var includes = ufShiv.getElementsByClassName(mfnode, "include");
            if (includes.length > 0) {
                /* If we didn't clone, clone now */
                if (!mfnode.origNode) {
                    mfnode = in_mfnode.cloneNode(true);
                    mfnode.origNode = in_mfnode;
                }
                includes = ufShiv.getElementsByClassName(mfnode, "include");
                var includeId;
                var include_length = includes.length;
                for (var i = include_length - 1; i >= 0; i--) {
                    if (includes[i].nodeName.toLowerCase() == "a") {
                        includeId = includes[i].getAttribute("href").substr(1);
                    }
                    if (includes[i].nodeName.toLowerCase() == "object") {
                        includeId = includes[i].getAttribute("data").substr(1);
                    }
                    if (in_mfnode.ownerDocument.getElementById(includeId)) {
                        includes[i].parentNode.replaceChild(in_mfnode.ownerDocument.getElementById(includeId).cloneNode(true), includes[i]);
                    }
                }
            }
            return mfnode;
        },



        defaultGetter: function (propnode, parentnode, datatype) {
            function collapseWhitespace(instring) {
                instring = instring.replace(/[\t\n\r ]+/g, " ");
                if (instring.charAt(0) == " ")
                    instring = instring.substring(1, instring.length);
                if (instring.charAt(instring.length - 1) == " ")
                    instring = instring.substring(0, instring.length - 1);
                return instring;
            }

            if ((propnode.nodeName.toLowerCase() == "abbr") && (propnode.getAttribute("title"))) {
                return propnode.getAttribute("title");
            } else if ((propnode.nodeName.toLowerCase() == "img") && (propnode.getAttribute("alt"))) {
                return propnode.getAttribute("alt");
            } else if ((propnode.nodeName.toLowerCase() == "area") && (propnode.getAttribute("alt"))) {
                return propnode.getAttribute("alt");
            } else if ((propnode.nodeName.toLowerCase() == "textarea") ||
                 (propnode.nodeName.toLowerCase() == "select") ||
                 (propnode.nodeName.toLowerCase() == "input")) {
                return propnode.value;
            } else {
                var valueTitles = ufShiv.getElementsByClassName(propnode, "value-title");
                for (var i = valueTitles.length - 1; i >= 0; i--) {
                    if (valueTitles[i].parentNode != propnode) {
                        valueTitles.splice(i, 1);
                    }
                }
                if (valueTitles.length > 0) {
                    var valueTitle = "";
                    for (var j = 0; j < valueTitles.length; j++) {
                        valueTitle += valueTitles[j].getAttribute("title");
                    }
                    return collapseWhitespace(valueTitle);
                }
                var values = ufShiv.getElementsByClassName(propnode, "value");
                /* Verify that values are children of the propnode */
                for (var i = values.length - 1; i >= 0; i--) {
                    if (values[i].parentNode != propnode) {
                        values.splice(i, 1);
                    }
                }
                if (values.length > 0) {
                    var value = "";
                    for (var j = 0; j < values.length; j++) {
                        value += ufShiv.parser.defaultGetter(values[j], propnode, datatype);
                    }
                    return collapseWhitespace(value);
                }
                var s;
                if (datatype == "HTML") {
                    s = propnode.innerHTML;
                } else {
                    if (ufShiv.getTextContent(propnode)) {
                        s = ufShiv.getTextContent(propnode);
                    } else {
                        s = ufShiv.getTextContent(propnode);
                    }
                }
                /* If we are processing a value node, don't remove whitespace now */
                /* (we'll do it later) */
                if (!ufShiv.matchClass(propnode, "value")) {
                    s = collapseWhitespace(s);
                }
                if (s.length > 0) {
                    return s;
                }
            }
            return undefined;
        },




        dateTimeGetter: function (propnode, parentnode, raw) {
            function parseTime(time) {
                if (time.match("am") || time.match("a.m.")) {
                    time = time.replace("am", "");
                    time = time.replace("a.m.", "");
                    var times = time.split(":");
                    if (times[0] == "12") {
                        times[0] = "00";
                    }
                    if (times[0].length == 1) {
                        times[0] = "0" + times[0];
                    }
                    if (times.length > 1) {
                        time = times.join(":");
                    } else {
                        time = times[0] + ":00:00";
                    }
                    if (times.length == 2) {
                        time += ":00";
                    }
                }
                if (time.match("pm") || time.match("p.m.")) {
                    time = time.replace("pm", "");
                    time = time.replace("p.m.", "");
                    var times = time.split(":");
                    if (times[0] < 12) {
                        times[0] = parseInt(times[0]) + 12;
                    }
                    if (times[0].length == 1) {
                        times[0] = "0" + times[0];
                    }
                    if (times.length > 1) {
                        time = times.join(":");
                    } else {
                        time = times[0] + ":00:00";
                    }
                    if (times.length == 2) {
                        time += ":00";
                    }
                }
                return time;
            }
            var valueTitles = ufShiv.getElementsByClassName(propnode, "value-title");
            if (valueTitles.length > 0) {
                var time = "";
                var date = "";
                var value = "";
                var offset = "";
                for (var i = 0; i < valueTitles.length; i++) {
                    value = valueTitles[i].getAttribute("title");
                    if (value.match("T")) {
                        return ufShiv.parser.normalizeISO8601(value);
                        break;
                    }
                    if (value.charAt(4) == "-") {
                        date = value;
                    } else if ((value.charAt(0) == "-") || (value.charAt(0) == "+") || (value == "Z")) {
                        if (value.length == 2) {
                            offset = value[0] + "0" + value[1];
                        } else {
                            offset = value;
                        }
                    } else {
                        time = value;
                    }
                }
                time = parseTime(time);
                if (raw) {
                    return date + (time ? "T" : "") + time + offset;
                } else if (date) {
                    return ufShiv.parser.normalizeISO8601(date + (time ? "T" : "") + time + offset);
                } else {
                    return undefined;
                }
            }
            var values = ufShiv.getElementsByClassName(propnode, "value");
            /* Verify that values are children of the propnode */
            /* Remove any that aren't */
            for (var i = values.length - 1; i >= 0; i--) {
                if (values[i].parentNode != propnode) {
                    values.splice(i, 1);
                }
            }
            if (values.length > 0) {
                var time = "";
                var date = "";
                var value = "";
                var offset = "";
                for (var i = 0; i < values.length; i++) {
                    value = ufShiv.parser.defaultGetter(values[i], propnode);
                    if (value.match("T")) {
                        return ufShiv.parser.normalizeISO8601(value);
                        break;
                    }
                    if (value.charAt(4) == "-") {
                        date = value;
                    } else if ((value.charAt(0) == "-") || (value.charAt(0) == "+") || (value == "Z")) {
                        if (value.length == 2) {
                            offset = value[0] + "0" + value[1];
                        } else {
                            offset = value;
                        }
                    } else {
                        time = value;
                    }
                }
                time = parseTime(time);
                if (raw) {
                    return date + (time ? "T" : "") + time + offset;
                } else if (date) {
                    return ufShiv.parser.normalizeISO8601(date + (time ? "T" : "") + time + offset);
                } else {
                    return undefined;
                }
            } else {
                var date;
                var testDate;
                if (propnode.hasAttribute("title")) {
                    date = propnode.getAttribute("title");
                    testDate = ufShiv.parser.normalizeISO8601(date);
                }
                if (!testDate) {
                    date = ufShiv.parser.textGetter(propnode, parentnode);
                }
                if (date) {
                    if (raw) {
                        /* It's just  a time */
                        return parseTime(date);
                    } else {
                        return ufShiv.parser.normalizeISO8601(date);
                    }
                }
            }
            return undefined;
        },





        uriGetter: function (propnode, parentnode) {
            var pairs = { "a": "href", "img": "src", "object": "data", "area": "href" };
            var name = propnode.nodeName.toLowerCase();
            if (pairs.hasOwnProperty(name)) {
                return propnode[pairs[name]];
            }
            return ufShiv.parser.textGetter(propnode, parentnode);
        },





        telGetter: function (propnode, parentnode) {
            var pairs = { "a": "href", "object": "data", "area": "href" };
            var name = propnode.nodeName.toLowerCase();
            if (pairs.hasOwnProperty(name)) {
                var protocol;
                if (propnode[pairs[name]].indexOf("tel:") == 0) {
                    protocol = "tel:";
                }
                if (propnode[pairs[name]].indexOf("fax:") == 0) {
                    protocol = "fax:";
                }
                if (propnode[pairs[name]].indexOf("modem:") == 0) {
                    protocol = "modem:";
                }
                if (protocol) {
                    if (propnode[pairs[name]].indexOf('?') > 0) {
                        return unescape(propnode[pairs[name]].substring(protocol.length, propnode[pairs[name]].indexOf('?')));
                    } else {
                        return unescape(propnode[pairs[name]].substring(protocol.length));
                    }
                }
            }
            /* Special case - if this node is a value, use the parent node to get all the values */
            if (ufShiv.matchClass(propnode, "value")) {
                return ufShiv.parser.textGetter(parentnode, parentnode);
            } else {
                /* Virtual case */
                if (!parentnode && (ufShiv.getElementsByClassName(propnode, "type").length > 0)) {
                    var tempNode = propnode.cloneNode(true);
                    var typeNodes = ufShiv.getElementsByClassName(tempNode, "type");
                    for (var i = 0; i < typeNodes.length; i++) {
                        typeNodes[i].parentNode.removeChild(typeNodes[i]);
                    }
                    return ufShiv.parser.textGetter(tempNode);
                }
                return ufShiv.parser.textGetter(propnode, parentnode);
            }
        },




        emailGetter: function (propnode, parentnode) {
            if ((propnode.nodeName.toLowerCase() == "a") || (propnode.nodeName.toLowerCase() == "area")) {
                var mailto = propnode.href;
                /* IO Service won't fully parse mailto, so we do it manually */
                if (mailto.indexOf('?') > 0) {
                    return unescape(mailto.substring("mailto:".length, mailto.indexOf('?')));
                } else {
                    return unescape(mailto.substring("mailto:".length));
                }
            } else {
                /* Special case - if this node is a value, use the parent node to get all the values */
                /* If this case gets executed, per the value design pattern, the result */
                /* will be the EXACT email address with no extra parsing required */
                if (ufShiv.matchClass(propnode, "value")) {
                    return ufShiv.parser.textGetter(parentnode, parentnode);
                } else {
                    /* Virtual case */
                    if (!parentnode && (ufShiv.getElementsByClassName(propnode, "type").length > 0)) {
                        var tempNode = propnode.cloneNode(true);
                        var typeNodes = ufShiv.getElementsByClassName(tempNode, "type");
                        for (var i = 0; i < typeNodes.length; i++) {
                            typeNodes[i].parentNode.removeChild(typeNodes[i]);
                        }
                        return ufShiv.parser.textGetter(tempNode);
                    }
                    return ufShiv.parser.textGetter(propnode, parentnode);
                }
            }
        },




        textGetter: function (propnode, parentnode) {
            return ufShiv.parser.defaultGetter(propnode, parentnode, "text");
        },




        HTMLGetter: function (propnode, parentnode) {
            //            function mfHTML(value) {
            //                this.valueOf = function () { return value ? value.valueOf() : ""; }
            //                this.toString = function () { return value ? value.toString() : ""; }
            //            }
            ////            mfHTML.prototype = new String;
            ////            mfHTML.prototype.toHTML = function () {
            ////                return ufShiv.parser.defaultGetter(propnode, parentnode, "HTML");
            ////            }
            //            return new mfHTML(ufShiv.parser.defaultGetter(propnode, parentnode, "text"));

            return ufShiv.parser.defaultGetter(propnode, parentnode, "HTML")

        },


        /* This function normalizes an ISO8601 date by adding punctuation and */
        /* ensuring that hours and seconds have values */
        normalizeISO8601: function normalizeISO8601(string) {
            var dateArray = string.match(/(\d\d\d\d)(?:-?(\d\d[\d]*)(?:-?([\d]*)(?:[T ](\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(?:Z|(?:([-+])(\d\d)(?::?(\d\d))?)?)?)?)?)?/);


            var dateString;
            var tzOffset = 0;
            if (!dateArray) {
                return undefined;
            }
            /* Year */
            if (dateArray[1]) {
                dateString = dateArray[1];
                /* Month */
                if (dateArray[2]) {
                    dateString += "-" + dateArray[2];
                    /* Day */
                    if (dateArray[3] || dateArray[4]) {
                        if (dateArray[3]) {
                            dateString += "-" + dateArray[3];
                        }
                        /* Hours */
                        if (dateArray[4]) {
                            dateString += "T" + dateArray[4];
                            /* Minutes */
                            if (dateArray[5]) {
                                dateString += ":" + dateArray[5];
                            } else {
                                dateString += ":" + "00";
                            }
                            /* Seconds */
                            if (dateArray[6]) {
                                dateString += ":" + dateArray[6];
                            } else {
                                dateString += ":" + "00";
                            }
                            if (dateArray[7]) {
                                dateString += "." + dateArray[7];
                            }
                            if (dateArray[8]) {
                                dateString += dateArray[8];
                                if ((dateArray[8] == "+") || (dateArray[8] == "-")) {
                                    if (dateArray[9]) {
                                        if (dateArray[9].length == 1) {
                                            dateString += "0";
                                        }
                                        dateString += dateArray[9];
                                        if (dateArray[10]) {
                                            dateString += dateArray[10];
                                        } else {
                                            dateString += "00";
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (string.indexOf("Z") > -1) {
                dateString += "Z";
            }
            return dateString;
        },

        datatypeHelper: function (prop, node, parentnode) {
            var result;
            var datatype = prop.datatype;
            switch (datatype) {
                case "dateTime":
                    result = ufShiv.parser.dateTimeGetter(node, parentnode);
                    break;
                case "anyURI":
                    result = ufShiv.parser.uriGetter(node, parentnode);
                    break;
                case "email":
                    result = ufShiv.parser.emailGetter(node, parentnode);
                    break;
                case "tel":
                    result = ufShiv.parser.telGetter(node, parentnode);
                    break;
                case "HTML":
                    result = ufShiv.parser.HTMLGetter(node, parentnode);
                    break;
                case "float":
                    var asText = ufShiv.parser.textGetter(node, parentnode);
                    if (!isNaN(asText)) {
                        result = parseFloat(asText);
                    }
                    break;
                case "custom":
                    result = prop.customGetter(node, parentnode);
                    break;
                case "microformat":
                    try {
                        result = ufShiv.parser.getMicroformat(node, prop.microformat);
                    } catch (ex) {
                        /* There are two reasons we get here, one because the node is not */
                        /* a microformat and two because the node is a microformat and */
                        /* creation failed. If the node is not a microformat, we just fall */
                        /* through and use the default getter since there are some cases */
                        /* (location in hCalendar) where a property can be either a microformat */
                        /* or a string. If creation failed, we break and simply don't add the */
                        /* microformat property to the parent microformat */
                        if (ex != "Node is not a microformat (" + prop.microformat + ")") {
                            break;
                        }
                    }
                    if (result != undefined) {
                        if (prop.microformat_property) {
                            result = result[prop.microformat_property];
                        }
                        break;
                    }
                default:
                    result = ufShiv.parser.textGetter(node, parentnode);
                    break;
            }
            /* This handles the case where one property implies another property */
            /* For instance, org by itself is actually org.organization-name */
            if (prop.values && (result != undefined)) {
                var validType = false;
                for (var value in prop.values) {
                    if (result.toLowerCase() == prop.values[value]) {
                        result = result.toLowerCase();
                        validType = true;
                        break;
                    }
                }
                if (!validType) {
                    return undefined;
                }
            }
            return result;
        }



        /* end of parser object */

    },






    getElementsByClassName: function getElementsByClassName(rootNode, className) {
        var returnElements = [];

        if (rootNode.getElementsByClassName) {
            /* Native getElementsByClassName */
            var col = rootNode.getElementsByClassName(className);
            for (var i = 0; i < col.length; i++) {
                returnElements[i] = col[i];
            }
        } else if (rootNode.evaluate) {
            /* XPath */
            var xpathExpression;
            xpathExpression = ".//*[contains(concat(' ', @class, ' '), ' " + className + " ')]";
            document.write(xpathExpression + '<br />');
            var xpathResult = rootNode.evaluate(xpathExpression, rootNode, null, 0, null);

            var node;
            while ((node = xpathResult.iterateNext())) {
                returnElements.push(node);
            }
        } else {
            /* Slower fallback */

            className = className.replace(/\-/g, "\\-");
            var elements = rootNode.getElementsByTagName("*");
            for (var i = 0; i < elements.length; i++) {
                if (elements[i].className.match("(^|\\s)" + className + "(\\s|$)")) {
                    returnElements.push(elements[i]);
                }
            }
        }
        return returnElements;
    },


    getElementsByAttribute: function getElementsByAttribute(rootNode, attributeName, attributeValues) {

        var attributeList = attributeValues.split(" ");
        var returnElements = [];

        if (rootNode.evaluate) {
            /* XPath */
            var xpathExpression = ".//*[";
            for (var i = 0; i < attributeList.length; i++) {
                if (i != 0) {
                    xpathExpression += " or ";
                }
                xpathExpression += "contains(concat(' ', @" + attributeName + ", ' '), ' " + attributeList[i] + " ')";
            }
            xpathExpression += "]";
            document.write('getElementsByAttribute: ' + xpathExpression + '<br />');
            var xpathResult = rootNode.evaluate(xpathExpression, rootNode, null, 0, null);

            var node;
            while ((node = xpathResult.iterateNext())) {
                returnElements.push(node);
            }
        } else {
            /* Slower fallback */

            attributeName = attributeName.replace(/\-/g, "\\-");
            var elements = rootNode.getElementsByTagName("*");
            for (var i = 0; i < elements.length; i++) {
                if (elements[i][attributeName]) {
                    var found = false;
                    for (var y = 0; y < attributeList.length; y++) {
                        if (elements[i][attributeName].match("(^|\\s)" + attributeList[y] + "(\\s|$)")) {
                            found = true;
                        }
                    }
                    if(found)
                        returnElements.push(elements[i]);
                }
            }
        }

        return returnElements;
    },


    /**
    * If the passed in node is a microformat, this function returns a space 
    * separated list of the microformat names that correspond to this node
    *
    * @param  node          DOM node to check
    * @return If the node is a microformat, a space separated list of microformat
    *         names, otherwise returns nothing
    */
    getNamesFromNode: function (node) {
        var microformatNames = [];
        for (var i in ufShiv) {
            if (ufShiv[i]) {
                if (ufShiv[i].className) {
                    if (ufShiv.matchClass(node, ufShiv[i].className)) {
                        microformatNames.push(i);
                        continue;
                    }
                } else if (ufShiv[i].attributeValues) {
                    var attribute = node.getAttribute(ufShiv[i].attributeName);
                    if (attribute) {
                        var attributeList = ufShiv[i].attributeValues.split(" ");
                        for (var j = 0; j < attributeList.length; j++) {
                            /* If we match any attribute, we've got a microformat */
                            if (attribute.match("(^|\\s)" + attributeList[j] + "(\\s|$)")) {
                                microformatNames.push(i);
                                break;
                            }
                        }
                    }
                }
            }
        }
        return microformatNames.join(" ");
    },


    /**
    * Returns first ancestor of required class or a null
    */
    findParentByClass: function findParentByClass(node, className) {
        if (node != null && node != undefined) {
            if (ufShiv.matchClass(node, className)) {
                return node;
            } else {
                if (node.parentNode && node.nodeName != "BODY")
                    return ufShiv.findParentByClass(node.parentNode, className);
                else
                    return null;
            }
        } else {
            return null;
        }
    },


    /**
    * Returns the descendant count by class name
    */
    childernCountByClass: function childernCountByClass(node, className) {
        var nodes = ufShiv.getElementsByClassName(node, className);
        if (nodes.length)
            return nodes.length;
        else
            return 0;
    },


    /**
    * Get text contents of a node by textContent or innerHtml
    */
    getTextContent: function getTextContent(element) {
        if (typeof element.textContent != "undefined") {
            return element.textContent;
        }
        return element.innerText;
    },


    /**
    * Is a given class name assigned in the node class property
    */
    matchClass: function matchClass(node, className) {
        var classValue = node.getAttribute("class");
        if (node.getAttribute("className"))
            classValue = node.getAttribute("className");
        return (classValue && classValue.match("(^|\\s)" + className + "(\\s|$)"));
    },


    /**
    * Compress object structure down to ufJSON standard
    */
    compressXFN: function matchClass(returnArray) {
        var newArray = [];
        for (var j = 0; j < returnArray.length; j++) {
            var obj = returnArray[j];
            var newObj = {};
            newObj.rel = '';
            for (var i in obj) {
                if (obj[i]) {
                    var name = String(i);
                    if (name != 'text' && name != 'link') {
                        newObj.rel += name + ' ';
                    } else {
                        newObj[i] = obj[i];
                    }
                }
            }
            if (newObj.rel != '')
                newObj.rel = newObj.rel.substring(0, newObj.rel.length - 1);

            newArray.push(newObj);
        }
        return newArray;
    }



}


navigator.microformats = ufShiv;