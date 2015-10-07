/*
   For modern browsers that support URL API. Please be careful when using this module.
   http://glennjones.net/articles/the-problem-with-window-url
   
   Copyright (C) 2010 - 2015 Glenn Jones. All Rights Reserved.
   MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
*/

var Modules = (function (modules) {
	
	modules.url = {
		
		/**
		 * resolves URL to absolute version using baseUrl
		 *
		 * @param  {String} url
		 * @param  {String} baseUrl
		 * @return {String}
		 */
		resolve: function(url, baseUrl) {
			// use URL web API 
			if(modules.utils.isString(url) && modules.utils.isString(baseUrl) && url.indexOf('://') === -1){
					return new URL(url, baseUrl).toString();
			}else{
				if(modules.utils.isString(url)){
					return url;
				}
				return '';
			}
		}
		
	};
	
	return modules;

} (Modules || {}));


