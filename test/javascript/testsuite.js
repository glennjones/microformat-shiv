/*
All content and code is released into the public domain
http://en.wikipedia.org/wiki/public_domain

Contributors
Glenn Jones - http://glennjones.net/

Takes existing blocks of html with class 'e-x-microformat' 
and creates a viewable version of the code within the page
*/


window.addEventListener('load', function (e) {


    var codeBlocks = document.querySelectorAll('.e-x-microformat');
    var i = codeBlocks.length;
    while (i--) {
        var node = codeBlocks[i];
        var title = document.createElement('h2');
        var pre = document.createElement('pre');
        var code = document.createElement('code');
        code.className = 'language-html';

        title.appendChild(document.createTextNode('HTML markup:'));
        insertAfter(title, node);
  
        pre.appendChild(code);
        pre.className = 'prettyprint'; 

        insertAfter(pre, title);
        code.innerHTML = encodeHTML(node.innerHTML);
    }
    prettyPrint();


});


function encodeHTML(str) {
    return str.toString().replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}


// Does the node have a class
function hasClass(node, className) {
    if (node.className) {
        return node.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    } else {
        return false;
    }
};
 
 
// Add a class to an node
function addClass(node, className) {
    if (hasClass(node, className)) node.className += " " + className;
};
 
 
// Removes a class from an node
function removeClass(node, className) {
    if (hasClass(node, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        node.className = node.className.replace(reg, ' ');
    }
};
 

//create function, it expects 2 values.
function insertAfter(newElement,targetElement) {
    //target is what you want it to go after. Look for this elements parent.
    var parent = targetElement.parentNode;
    
    //if the parents lastchild is the targetElement...
    if(parent.lastchild == targetElement) {
        //add the newElement after the target element.
        parent.appendChild(newElement);
        } else {
        // else the target has siblings, insert the new element between the target and it's next sibling.
        parent.insertBefore(newElement, targetElement.nextSibling);
        }
}