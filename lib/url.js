/*
   url
   Although it adds weight, the URI library is required because the window.URL API is not supported across all browsers.

   Copyright (C) 2010 - 2015 Glenn Jones. All Rights Reserved.
   MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
*/

var Modules = (function (modules) {


	modules.url = {


		/**
		 * creates DOM objects needed to resolve URLs
		 */
        init: function(){
            this._dom = new DOMParser();
            this._html = '<head><base id="base" href=""></head><a id="link" href=""></a>';
            this._nodes = this._dom.parseFromString( this._html, 'text/html' );
            this._baseNode =  modules.domUtils.getElementById(this._nodes,'base');
            this._linkNode =  modules.domUtils.getElementById(this._nodes,'link');
        },


		/**
		 * resolves url to absolute version using baseUrl
		 *
		 * @param  {String} url
		 * @param  {String} baseUrl
		 * @return {String}
		 */
		resolve: function(url, baseUrl) {
			// use modern URL web API where we can
			if(modules.utils.isString(url) && modules.utils.isString(baseUrl) && url.indexOf('://') === -1){
				// this try catch is required as IE has an URL object but no constuctor support
				// http://glennjones.net/articles/the-problem-with-window-url
				try {
					var resolved = new URL(url, baseUrl).toString();
					// deal with early Webkit not throwing an error - for Safari
					if(resolved === '[object URL]'){
						resolved = URI.resolve(baseUrl, url);
					}
					return resolved;
				}catch(e){
                    // otherwise fallback to DOM
                    if(this._dom === undefined){
                        this.init();
                    }
					modules.domUtils.setAttribute(this._baseNode,'href',baseUrl);
                    modules.domUtils.setAttribute(this._linkNode,'href',url);

                    // dont use getAttribute as it returns orginal value not resolved
                    return this._linkNode.href;
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
