/*!
	parse 
	Used by http://localhost:3000/
	Copyright (C) 2010 - 2015 Glenn Jones. All Rights Reserved.
	MIT License: https://raw.github.com/glennjones/microformat-shiv/master/license.txt
*/

window.onload = function() {

    var form;
    form= document.getElementById('mf-form'); 
    
    form.onsubmit = function(e){
        e = (e)? e : window.event;
        
        if (e.preventDefault) {
             e.preventDefault(); 
        } else {
             event.returnValue = false; 
        }

        
        var html,
            baseUrl,
            filter,
            collapsewhitespace,
            dateformatElt,
            dateformat,
            doc,
            node,
            options,
            mfJSON,
            parserJSONElt;
    
        // get data from html
        html = document.getElementById('html').value;
        baseUrl = document.getElementById('baseurl').value;
        filters = document.getElementById('filters').value;
        collapsewhitespace = document.getElementById('collapsewhitespace').checked;   
        dateformatElt = document.getElementById("dateformat");
        dateformat = dateformatElt.options[dateformatElt.selectedIndex].value;
        parserJSONElt = document.querySelector('#parser-json pre code')
       
  
        var dom = new DOMParser();
        doc = dom.parseFromString( html, 'text/html' );
        
        options ={
            'document': doc,
            'node': doc,
            'dateFormat': dateformat
        };
        if(baseUrl.trim() !== ''){
            options.baseUrl = baseUrl;
        }
        if(filters.trim() !== ''){
            if(filters.indexOf(',') > -1){
               options.filters = trimArrayItems(filters.split(','));
            }else{
                options.filters = [filters.trim()];
            }
        }
        if(collapsewhitespace === true){
            options.textFormat = 'normalised';
        }
        
        if(options.baseUrl){
            html = '<base href="' + baseUrl+ '">' + html;
        }
        

        
        // parse direct into Modules to help debugging
        if(window.Modules){
            var parser = new Modules.Parser();
            mfJSON = parser.get(options);
        }else if(window.Microformats){
            mfJSON = Microformats.get(options);
        }

        
        // format output
        parserJSONElt.innerHTML = htmlEscape( js_beautify( JSON.stringify(mfJSON) ) );
        //prettyPrint(); 
        
    }
    
  
};  





function htmlEscape(str) {
    return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
}


function trimArrayItems( arr ){
    return arr.map(function(item){
        return item.trim();
    })
}

