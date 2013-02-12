# Browser Extension Examples

This project contains 3 browser extension examples for Chrome, Firefox and Opera. These are provided as developer demonstration of the use of the library are not meant for everyday use. As such they only display the raw JSON output of the parser. 


### Chrome

They’re only a few simple steps to installing the browser extension example for Chrome:

* First download this GitHub repo to your local hard drive
* Open the Extensions management tool/page of Chrome this can be done through the menus or by typing `chrome://extensions/` into the address bar
* Check the box in the top right called `Developer mode`
* Click the button `Load unpacked extension` and navigate to the extension within this projects directory on your local hard drive


### Firefox
There a few more steps to installing the Firefox addon:

* Install the `cfx` application from [https://ftp.mozilla.org/pub/mozilla.org/labs/jetpack/jetpack-sdk-latest.zip](https://ftp.mozilla.org/pub/mozilla.org/labs/jetpack/jetpack-sdk-latest.zip)
* Extract the file contents wherever you choose, and navigate to the root directory of the SDK with a shell/command prompt. For example:

         tar -xf addon-sdk.tar.gz
         cd addon-sdk

* Then run:

        source bin/activate

* Your command prompt should now have a new prefix containing the name of the SDK's root directory:

        (addon-sdk)~/mozilla/addon-sdk >

* First download this GitHub repo to your local hard drive

* Finally navigate to the directory containing the example project and run

        cfx run  



### Opera
They’re only a couple of steps to installing the browser extension example for Opera:

* First download this GitHub repo to your local hard drive

* Finally navigate to the directory containing the example project and drag the `config.xml` into Opera.



### Support or Contact

Having trouble, please raise an issue at: [https://github.com/glennjones/microformat-shiv/issues](https://github.com/glennjones/microformat-shiv/issues)


### License

The project is open sourced under MIT license. See the [license.txt](https://raw.github.com/glennjones/microformat-shiv/master/license.txt "license.txt") file within the project source.