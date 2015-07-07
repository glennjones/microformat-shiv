/*
   dom utilities
   the main purpose of this module is abstract DOM functions so that different types of light weight node.js DOM's such as 'cherrio' can be used
   Copyright (C) 2010 - 2015 Glenn Jones. All Rights Reserved.
   MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt 
   
   Dependencies  utilities.js
   
   The DOMParser object is at the bottom of this file
   
*/


var Modules = (function (modules) {
	
	modules.domUtils = {
		
		
		 /**
		 * abstracts DOM ownerDocument
		 *
		 * @param  {DOM Node} node
		 * @return {Dom Document}
		 */
		ownerDocument: function(node){
			return node.ownerDocument;
		},
		
	
		/**
		 * abstracts DOM textContent
		 *
		 * @param  {DOM Node} node
		 * @return {String}
		 */
		textContent: function(node){
			if(node.textContent){
				return node.textContent;
			}else if(node.innerText){
				return node.innerText;
			}
			return '';
		},
		
	
		/**
		 * abstracts DOM innerHTML
		 *
		 * @param  {DOM Node} node
		 * @return {String}
		 */
		innerHTML: function(node){
			return node.innerHTML;
		},
	

		/**
		 * abstracts DOM hasAttribute
		 *
		 * @param  {DOM Node} node
		 * @param  {String} attributeName
		 * @return {Boolean}
		 */
		hasAttribute: function(node, attributeName) {
			return node.hasAttribute(attributeName);
		},
		
		
		/**
		 * does value exists as item
		 *
		 * @param  {DOM Node} node
		 * @param  {String} attributeName
		 * @return {Boolean}
		 */
		hasAttributeValue: function(node, attributeName, value) {
			return (this.getAttributeList(node, attributeName).indexOf(value) > -1);
		},
		
	
		/**
		 * abstracts DOM getAttribute
		 *
		 * @param  {DOM Node} node
		 * @param  {String} attributeName
		 * @return {String || null}
		 */
		getAttribute: function(node, attributeName) {
			return node.getAttribute(attributeName);
		},
		
		
		/**
		 * abstracts DOM setAttribute
		 *
		 * @param  {DOM Node} node
		 * @param  {String} attributeName
		 * @param  {String} attributeValue
		 */
		setAttribute: function(node, attributeName, attributeValue){
			node.setAttribute(attributeName, attributeValue);
		},
	
	
		/**
		 * abstracts DOM removeAttribute
		 *
		 * @param  {DOM Node} node
		 * @param  {String} attributeName
		 */
		removeAttribute: function(node, attributeName) {
			node.removeAttribute(attributeName);
		},
		
		
		/**
		 * abstracts DOM getElementById
		 *
		 * @param  {DOM Node || DOM Document} node
		 * @param  {String} id
		 * @return {DOM Node} 
		 */
		getElementById: function(docNode, id) {
			return docNode.querySelector( '#' + id );
		},
		
		
		/**
		 * abstracts DOM querySelector
		 *
		 * @param  {DOM Node || DOM Document} node
		 * @param  {String} selector
		 * @return {DOM Node} 
		 */
		querySelector: function(docNode, selector) {
			return docNode.querySelector( selector );
		},
	
	
		/**
		 * get value of an Node attribute as an Array
		 *
		 * @param  {DOM Node} node
		 * @param  {String} attributeName
		 * @return {Array}
		 */
		getAttributeList: function(node, attributeName) {
			var out = [],
				attList;
	
			attList = node.getAttribute(attributeName);
			if(attList && attList !== '') {
				if(attList.indexOf(' ') > -1) {
					out = attList.split(' ');
				} else {
					out.push(attList);
				}
			}
			return out;
		},
	
	
		/**
		 * does an attribute contain a value
		 *
		 * @param  {DOM Node} node
		 * @param  {String} attributeName
		 * @param  {String} value
		 * @return {Boolean}
		 */
		hasAttributeValue: function(node, attributeName, value) {
			var attList = this.getAttributeList(node, attributeName);
			return (attList.indexOf(value) > -1);
		},
	
	
		/**
		 * gets all child nodes with a given attribute
		 *
		 * @param  {DOM Node} node
		 * @param  {String} attributeName
		 * @return {NodeList}
		 */
		getNodesByAttribute: function(node, attributeName) {
			var selector = '[' + attributeName + ']';
			return node.querySelectorAll(selector);
		},
	
	
		// gets all child nodes with a given attribute containing a given value
		/**
		 * does an attribute contain a value
		 *
		 * @param  {DOM Node} node
		 * @param  {String} attributeName
		 * @return {DOM NodeList}
		 */
		getNodesByAttributeValue: function(rootNode, name, value) {
			var arr = [],
				x = 0,
				i,
				out = [];
	
			arr = this.getNodesByAttribute(rootNode, name);
			if(arr) {
				i = arr.length;
				while(x < i) {
					if(this.hasAttributeValue(arr[x], name, value)) {
						out.push(arr[x]);
					}
					x++;
				}
			}
			return out;
		},
	
	
		/**
		 * gets attribute value from controlled list of tags
		 *
		 * @param  {Array} tagNames
		 * @param  {String} attributeName
		 * @return {String || null}
		 */
		getAttrValFromTagList: function(node, tagNames, attributeName) {
			var i = tagNames.length;
	
			while(i--) {
				if(node.tagName.toLowerCase() === tagNames[i]) {
					var attrValue = this.getAttribute(node, attributeName);
					if(attrValue && attrValue !== '') {
						return attrValue;
					}
				}
			}
			return null;
		},
	
		
	   /**
		 * get node if has no siblings CSS :only-child 
		 *
		 * @param  {DOM Node} rootNode
		 * @param  {Array} tagNames
		 * @return {DOM Node || null}
		 */
		getSingleDescendant: function(node){
			return this.getDescendant( node, null, false );
		},
		
		
        /**
		 * get node if has no siblings of the same type  i.e. CSS :only-of-type
		 * 
		 * @param  {DOM Node} rootNode
		 * @param  {Array} tagNames
		 * @return {DOM Node || null}
		 */
		getSingleDescendantOfType: function(node, tagNames){
			return this.getDescendant( node, tagNames, true );
		},
	
	
	    /**
		 * get child node limited by presents of siblings - either CSS :only-of-type || :only-child 
		 *
		 * @param  {DOM Node} rootNode
		 * @param  {Array} tagNames
		 * @return {DOM Node || null}
		 */
		getDescendant: function( node, tagNames, onlyOfType ){
			var i = node.children.length,
				countAll = 0,
				countOfType = 0,
				child,
				out = null;
	
			while(i--) {
				child = node.children[i];
				if(child.nodeType === 1) {
					if(tagNames){
						// count just only-of-type
						if(this.hasTagName(child, tagNames)){
							out = child;
							countOfType++;
						}	
					}else{
						// count all elements
						out = child;
						countAll++;
					}
				}
			}
			if(onlyOfType === true){
				return (countOfType === 1)? out : null;
			}else{
				return (countAll === 1)? out : null;
			}
		},
	

	   /**
		 * is a node one of a list of tags
		 *
		 * @param  {DOM Node} rootNode
		 * @param  {Array} tagNames
		 * @return {Boolean}
		 */	
		hasTagName: function(node, tagNames){
			var i = tagNames.length;
			while(i--) {
				if(node.tagName.toLowerCase() === tagNames[i]) {
					return true;
				}
			}
			return false;
		},
	
	
	   /**
		 * abstracts DOM appendChild 
		 *
		 * @param  {DOM Node} node
		 * @param  {DOM Node} childNode
		 * @return {DOM Node}
		 */
		appendChild: function(node, childNode){
			return node.appendChild(childNode);
		},
	
	
	   /**
		 * abstracts DOM removeChild 
		 *
		 * @param  {DOM Node} childNode
		 * @return {DOM Node || null}
		 */
		removeChild: function(childNode){
			if (childNode.parentNode) {
				return childNode.parentNode.removeChild(childNode);
			}else{
				return null;
			}
		},
	
	
		/**
		 * abstracts DOM cloneNode
		 *
		 * @param  {DOM Node} node
		 * @return {DOM Node}
		 */
		clone: function(node) {
			var newNode = node.cloneNode(true);
			newNode.removeAttribute('id');
			return newNode;
		},
		
		
		/**
		 * resolves url to absolute version using baseUrl
		 *
		 * @param  {String} url
		 * @param  {String} baseUrl
		 * @return {String}
		 */
		resolveUrl: function(url, baseUrl) {
			// use modern URL web API where we can
			if(modules.utils.isString(url) && modules.utils.isString(baseUrl) && url.indexOf(':') === -1){
				try {
					return new URL(url, baseUrl).toString();
				}catch(e){
					return URI.resolve(baseUrl, url);
				}
			}else{
				if(modules.utils.isString(url)){
					return url;
				}
				return '';
			}
		},
		
		
		/**
		 * gets the text of a node
		 *
		 * @param  {DOM Node} node
		 * @return {String}
		 */
		getElementText: function( node ){
			if(node && node.data){
				return node.data;
			}else{
				return '';
			}
		},
		
		
		/**
		 * gets the attributes of a node - ordered by sequence in html
		 *
		 * @param  {DOM Node} node
		 * @return {Array}
		 */
		getOrderedAttributes: function( node ){
			var nodeStr = node.outerHTML,
				attrs = [];
				
			for (var i = 0; i < node.attributes.length; i++) {
				var attr = node.attributes[i];
					attr.indexNum = nodeStr.indexOf(attr.name);
					
				attrs.push( attr );
			}
			return attrs.sort( modules.utils.sortObjects( 'indexNum' ) );
		},
		
		
		/**
		 * decodes html entities in given text
		 *
		 * @param  {DOM Document} doc
		 * @param  String} text
		 * @return {String}
		 */
		decodeEntities: function( doc, text ){
			//return text;
			return doc.createTextNode( text ).nodeValue;
		},
		
		
		/**
		 * clones a DOM document
		 *
		 * @param  {DOM Document} document 
		 * @return {DOM Document}
		 */
		cloneDocument: function( document ){
			var newNode,
				newDocument = null;
				
			if( document.importNode && document.implementation && document.implementation.createHTMLDocument){
				newDocument = document.implementation.createHTMLDocument('');
				newNode = newDocument.importNode( document.documentElement, true );
				newDocument.replaceChild(newNode, newDocument.querySelector('html'));	
			}
			return (newNode && newNode.nodeType && newNode.nodeType === 1)? newDocument : document;
		},
		
		
	
		/**
		 * get a node's child index 
		 *
		 *   @param  {DOM Node} node
		 *   @return {Int}
		 */
		getChildIndex: function (node) {
		  	var parent = node.parentNode, 
		  		i = -1, 
		  		child;
	  		while (parent && (child = parent.childNodes[++i])){
				 if (child == node){
					 return i;
				 } 
			} 
	  		return -1;
		},
		

		/**
		 * get a node's path
		 *
		 *   @param  {DOM Node} node
		 *   @return {Array}
		 */
		getNodePath: function  (node) {
		  	var parent = node.parentNode, 
			  	path = [], 
			  	index = this.getChildIndex(node);
				  
		  if(parent && (path = this.getNodePath(parent))){
			   index > -1 && path.push(index);
		  };
		  return path;
		},
		
		
		/**
		 * get a node from a path.
		 *
		 *   @param  {Array} path
		 *   @return {DOM Node}
		 */
		getNodeByPath: function (document, path) {
		  	var node = document.documentElement, 
		  		i = 0, 
		  		index;
		  while ((index=path[++i]) > -1){
			  node = node.childNodes[index];
		  } 
		  return node;
		}
		

	};

	return modules;

} (Modules || {}));




/*
 URI.js v2.0.0 (c) 2011 Gary Court. License: http://github.com/garycourt/uri-js
*/
var URI=function(){function f(){for(var a=[],b=0;b<arguments.length;b++)a[b-0]=arguments[b];if(1<a.length){a[0]=a[0].slice(0,-1);for(var b=a.length-1,d=1;d<b;++d)a[d]=a[d].slice(1,-1);a[b]=a[b].slice(1);return a.join("")}return a[0]}function k(a){a=a.charCodeAt(0);var b;16>a?b="%0"+a.toString(16).toUpperCase():128>a?b="%"+a.toString(16).toUpperCase():b=2048>a?"%"+(a>>6|192).toString(16).toUpperCase()+"%"+(a&63|128).toString(16).toUpperCase():"%"+(a>>12|224).toString(16).toUpperCase()+"%"+(a>>6&63|
128).toString(16).toUpperCase()+"%"+(a&63|128).toString(16).toUpperCase();return b}function p(a){for(var b="",d=0,e=a.length,c,f,g;d<e;)c=parseInt(a.substr(d+1,2),16),128>c?(b+=String.fromCharCode(c),d+=3):194<=c&&224>c?(6<=e-d?(f=parseInt(a.substr(d+4,2),16),b+=String.fromCharCode((c&31)<<6|f&63)):b+=a.substr(d,6),d+=6):224<=c?(9<=e-d?(f=parseInt(a.substr(d+4,2),16),g=parseInt(a.substr(d+7,2),16),b+=String.fromCharCode((c&15)<<12|(f&63)<<6|g&63)):b+=a.substr(d,9),d+=9):(b+=a.substr(d,3),d+=3);return b}
function q(a){return void 0===a?"undefined":null===a?"null":Object.prototype.toString.call(a).split(" ").pop().split("]").shift().toLowerCase()}function m(a){return a.toUpperCase()}function t(a,b){function d(a){var c=p(a);return c.match(b.m)?c:a}a.scheme&&(a.scheme=String(a.scheme).replace(b.a,d).toLowerCase().replace(b.j,""));void 0!==a.userinfo&&(a.userinfo=String(a.userinfo).replace(b.a,d).replace(b.l,k).replace(b.a,m));void 0!==a.host&&(a.host=String(a.host).replace(b.a,d).toLowerCase().replace(b.f,
k).replace(b.a,m));void 0!==a.path&&(a.path=String(a.path).replace(b.a,d).replace(a.scheme?b.g:b.h,k).replace(b.a,m));void 0!==a.query&&(a.query=String(a.query).replace(b.a,d).replace(b.i,k).replace(b.a,m));void 0!==a.fragment&&(a.fragment=String(a.fragment).replace(b.a,d).replace(b.c,k).replace(b.a,m))}function h(a,b){void 0===b&&(b={});var d=n,e,c={};"suffix"===b.reference&&(a=(b.scheme?b.scheme+":":"")+"//"+a);(e=a.match(z))?(A?(c.scheme=e[1],c.userinfo=e[3],c.host=e[4],c.port=parseInt(e[5],10),
c.path=e[6]||"",c.query=e[7],c.fragment=e[8],isNaN(c.port)&&(c.port=e[5])):(c.scheme=e[1]||void 0,c.userinfo=-1!==a.indexOf("@")?e[3]:void 0,c.host=-1!==a.indexOf("//")?e[4]:void 0,c.port=parseInt(e[5],10),c.path=e[6]||"",c.query=-1!==a.indexOf("?")?e[7]:void 0,c.fragment=-1!==a.indexOf("#")?e[8]:void 0,isNaN(c.port)&&(c.port=a.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/)?e[4]:void 0)),c.reference=void 0!==c.scheme||void 0!==c.userinfo||void 0!==c.host||void 0!==c.port||c.path||void 0!==c.query?void 0===
c.scheme?"relative":void 0===c.fragment?"absolute":"uri":"same-document",b.reference&&"suffix"!==b.reference&&b.reference!==c.reference&&(c.error=c.error||"URI is not a "+b.reference+" reference."),e=r[(b.scheme||c.scheme||"").toLowerCase()],t(c,d),e&&e.parse&&e.parse(c,b)):c.error=c.error||"URI can not be parsed.";return c}function u(a){var b=[];void 0!==a.userinfo&&(b.push(a.userinfo),b.push("@"));void 0!==a.host&&b.push(a.host);"number"===typeof a.port&&(b.push(":"),b.push(a.port.toString(10)));
return b.length?b.join(""):void 0}function l(a){for(var b=[],d;a.length;)a.match(v)?a=a.replace(v,""):a.match(w)?a=a.replace(w,"/"):a.match(x)?(a=a.replace(x,"/"),b.pop()):"."===a||".."===a?a="":(d=a.match(B)[0],a=a.slice(d.length),b.push(d));return b.join("")}function g(a,b){void 0===b&&(b={});var d=n,e=[],c,f;(c=r[(b.scheme||a.scheme||"").toLowerCase()])&&c.serialize&&c.serialize(a,b);t(a,d);"suffix"!==b.reference&&a.scheme&&(e.push(a.scheme),e.push(":"));d=u(a);void 0!==d&&("suffix"!==b.reference&&
e.push("//"),e.push(d),a.path&&"/"!==a.path.charAt(0)&&e.push("/"));void 0!==a.path&&(f=a.path,b.absolutePath||c&&c.absolutePath||(f=l(f)),void 0===d&&(f=f.replace(/^\/\//,"/%2F")),e.push(f));void 0!==a.query&&(e.push("?"),e.push(a.query));void 0!==a.fragment&&(e.push("#"),e.push(a.fragment));return e.join("")}function y(a,b,d,e){void 0===d&&(d={});var c={};e||(a=h(g(a,d),d),b=h(g(b,d),d));d=d||{};!d.tolerant&&b.scheme?(c.scheme=b.scheme,c.userinfo=b.userinfo,c.host=b.host,c.port=b.port,c.path=l(b.path),
c.query=b.query):(void 0!==b.userinfo||void 0!==b.host||void 0!==b.port?(c.userinfo=b.userinfo,c.host=b.host,c.port=b.port,c.path=l(b.path),c.query=b.query):(b.path?("/"===b.path.charAt(0)?c.path=l(b.path):(void 0===a.userinfo&&void 0===a.host&&void 0===a.port||a.path?a.path?c.path=a.path.slice(0,a.path.lastIndexOf("/")+1)+b.path:c.path=b.path:c.path="/"+b.path,c.path=l(c.path)),c.query=b.query):(c.path=a.path,c.query=void 0!==b.query?b.query:a.query),c.userinfo=a.userinfo,c.host=a.host,c.port=a.port),
c.scheme=a.scheme);c.fragment=b.fragment;return c}var n=function(a){var b=f("[0-9]","[A-Fa-f]"),d=f("[A-Za-z]","[0-9]","[\\-\\.\\_\\~]",a?"[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]":"[]");return{s:!1,j:new RegExp(f("[^]","[A-Za-z]","[0-9]","[\\+\\-\\.]"),"g"),l:new RegExp(f("[^\\%\\:]",d,"[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]"),"g"),f:new RegExp(f("[^\\%]",d,"[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]"),"g"),g:new RegExp(f("[^\\%\\/\\:\\@]",d,"[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]"),
"g"),h:new RegExp(f("[^\\%\\/\\@]",d,"[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]"),"g"),i:new RegExp(f("[^\\%]",d,"[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]","[\\:\\@\\/\\?]",a?"[\\uE000-\\uF8FF]":"[]"),"g"),c:new RegExp(f("[^\\%]",d,"[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]","[\\:\\@\\/\\?]"),"g"),b:new RegExp(f("[^]",d,"[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]"),"g"),m:new RegExp(d,"g"),o:new RegExp(f("[^\\%]",d,f("[\\:\\/\\?\\#\\[\\]\\@]","[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]")),"g"),a:new RegExp("(?:"+("(?:"+("%[EFef]"+
b+"%"+b+b+"%"+b+b)+")|"+("(?:"+("%[89A-Fa-f]"+b+"%"+b+b)+")")+"|"+("(?:"+("%"+b+b)+")"))+")","g")}}(!1),z=/^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?([^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n)*))?/i,v=/^\.\.?\//,w=/^\/\.(\/|$)/,x=/^\/\.\.(\/|$)/,B=/^\/?(?:.|\n)*?(?=\/|$)/,A=void 0==="".match(/(){0}/)[1],r={};return{IRI_SUPPORT:!1,VALIDATE_SUPPORT:!1,pctEncChar:k,pctDecChars:p,SCHEMES:r,parse:h,_recomposeAuthority:u,removeDotSegments:l,serialize:g,resolveComponents:y,resolve:function(a,
b,d){return g(y(h(a,d),h(b,d),d,!0),d)},normalize:function(a,b){"string"===typeof a?a=g(h(a,b),b):"object"===q(a)&&(a=h(g(a,b),b));return a},equal:function(a,b,d){"string"===typeof a?a=g(h(a,d),d):"object"===q(a)&&(a=g(a,d));"string"===typeof b?b=g(h(b,d),d):"object"===q(b)&&(b=g(b,d));return a===b},escapeComponent:function(a){return a&&a.toString().replace(n.b,k)},unescapeComponent:function(a){return a&&a.toString().replace(n.a,p)}}}();URI.SCHEMES.http=URI.SCHEMES.https={domainHost:!0,parse:function(f){f.host||(f.error=f.error||"HTTP URIs must have a host.");return f},serialize:function(f){if(f.port===("https"!==String(f.scheme).toLowerCase()?80:443)||""===f.port)f.port=void 0;f.path||(f.path="/");return f}};
