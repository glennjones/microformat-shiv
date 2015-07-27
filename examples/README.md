# Browser Extension Examples

This GitHub project contains browser extension examples for Chrome, Firefox and Opera. These are provided, as developer demonstrations on how to use the library, they are not meant for everyday use by end users. 


### Chrome

<img src="http://microformatshiv.com/images/chrome-ext.png" />

They’re only a few simple steps to installing the browser extension example for Chrome:

* First download this GitHub repo to your local hard drive
* Open the Extensions management tool/page of Chrome, this can be done through the menus or by typing `chrome://extensions/` into the address bar
* Check the box in the top right called `Developer mode`
* Click the button `Load unpacked extension` and navigate to the extension within this project directory on your local hard drive


### Firefox
<img src="http://microformatshiv.com/images/firefox-ext.png" />

There are a few more steps to installing the Firefox addon:

* Install the `jpm` its a [node.js](https://nodejs.org/) application so node.js needs to be install first. At the command line run: 
```sh
 npm install jpm -g
 ```
 
* Then download this GitHub repo to your local hard drive

* To test the Firefox addon in your command line navigate to the Firefox directory in examples and run:
```sh
jpm run
 ```

* To build the addon to load into Firefox run:
```sh
jpm xpi
 ```
Once built you can drag the file into Firefox to intall it


### Opera

<img src="http://microformatshiv.com/images/opera-ext.png" />

They’re only a couple of steps to installing the browser extension example for Opera:

* First download this GitHub repo to your local hard drive

* Finally navigate to the directory containing the example project and drag the `config.xml` into Opera.



### Support or Contact

Having trouble, please raise an issue at: [https://github.com/glennjones/microformat-shiv/issues](https://github.com/glennjones/microformat-shiv/issues)


### License

The project is open sourced under MIT license. See the [license.txt](https://raw.github.com/glennjones/microformat-shiv/master/license.txt "license.txt") file within the project source.