/*
   url
   Although it adds weight, the URI library is need because window.URL API is not support across all browsers. 
   It could be drop for Firefox, but is need for cuurent IE versions and other historial browsers.
   
   Copyright (C) 2010 - 2015 Glenn Jones. All Rights Reserved.
   MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
*/

var Modules = (function (modules) {
	
	modules.url = {
		
		/**
		 * resolves url to absolute version using baseUrl
		 *
		 * @param  {String} url
		 * @param  {String} baseUrl
		 * @return {String}
		 */
		resolve: function(url, baseUrl) {
			// use modern URL web API where we can
			if(modules.utils.isString(url) && modules.utils.isString(baseUrl) && url.indexOf(':') === -1){
				// this try catch is need as IE has a URL object but no constuctor support
				// http://glennjones.net/articles/the-problem-with-window-url
				try {
					return new URL(url, baseUrl).toString();
				}catch(e){
					// otherwise fallback to URI library
					return URI.resolve(baseUrl, url);
				}
			}else{
				if(modules.utils.isString(url)){
					return url;
				}
				return '';
			}
		},
		
		
	};
	
	return modules;

} (Modules || {}));


/* jshint ignore:start */

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

/* jshint ignore:end */