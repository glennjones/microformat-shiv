Tests and coverage
-----------------

Web server for local testing
----------------------------
The project includes a Node.js web server to run the test tools locally. To run the test server download and install Node.js and NPM. 
From the command line move the project directory and execute the following commands:

```sh 
    $ npm install
    $ node app
```  


Client-side interface and standards tests
--------------------------------------
The page below runs the full [microfomats test suite](https://github.com/microformats/tests) as well as the libraries own unit tests for 
each modules interface. 
The tests are created in [Mocha](http://mochajs.org/) and test coverage is provided by [Blanket](http://blanketjs.org/).

* http://localhost:3000/coverage.html



Client-side debugging tools
---------------------------
There are also a number of other debugging and test tools:

* http://localhost:3000/testrunner.html (client side version of microfomats testrunner)
* http://localhost:3000/parse.html (client side form for parsing and debugging)
* http://localhost:3000/parse-umd.html (client side form to test the full UMD wrapped version of the code)
* http://localhost:3000/count.html (client side web page to test the count function)


Server-side tests
--------------------------------------
You can run Mocha html test from the command line
```sh 
    $ mocha-phantomjs -R dot /test/ci.html
```   
    
Server-side test coverage reports
--------------------------------------
You can run test coverage reports using [Poncho](https://github.com/deepsweet/poncho) from the command line

```sh 
    $ ./node_modules/.bin/poncho --reporter lcov test/ci.html
```  

or send the data to codacy.com or coveralls.io - you will need to add a token to your environment.

```sh
    $ ./node_modules/.bin/poncho --reporter lcov test/ci.html | ./node_modules/codacy-coverage/bin/codacy-coverage.js
```  


Pulling [microfomats test suite](https://github.com/microformats/tests) updates
-------------------------------------------------------------------------------
There is a script to pull updated test files from the microfomats test suite and rebuild them for this project.

```sh 
    $ node update-tests
```  

Within this file you can configure the GitHub repo you pull from. So forks of [microfomats test suite](https://github.com/microformats/tests) can also be used.



External links
-------------

* https://travis-ci.org/glennjones/microformat-shiv
* https://coveralls.io/r/glennjones/microformat-shiv
* https://www.codacy.com/app/glennjonesnet/microformat-shiv/dashboard