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

* Install the `cfx` application from [https://ftp.mozilla.org/pub/mozilla.org/labs/jetpack/jetpack-sdk-latest.zip](https://ftp.mozilla.org/pub/mozilla.org/labs/jetpack/jetpack-sdk-latest.zip)
* Extract the file contents wherever you choose, and navigate to the root directory of the SDK with a shell/command prompt. For example:

         tar -xf addon-sdk.tar.gz
         cd addon-sdk

* Then run:

        source bin/activate

* Your command prompt should now have a new prefix containing the name of the SDK's root directory:

        (addon-sdk)~/mozilla/addon-sdk >

* Then download this GitHub repo to your local hard drive

* Finally navigate to the directory containing the example project and run

        cfx run  



### Opera

<img src="http://microformatshiv.com/images/opera-ext.png" />

They’re only a couple of steps to installing the browser extension example for Opera:

* First download this GitHub repo to your local hard drive

* Finally navigate to the directory containing the example project and drag the `config.xml` into Opera.



### Support or Contact

Having trouble, please raise an issue at: [https://github.com/glennjones/microformat-shiv/issues](https://github.com/glennjones/microformat-shiv/issues)


### License

The project is open sourced under MIT license. See the [license.txt](https://raw.github.com/glennjones/microformat-shiv/master/license.txt "license.txt") file within the project source.