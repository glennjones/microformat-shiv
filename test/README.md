Test and Coverage
-----------------

Web server for local testing
----------------------------
The project includes a node.js web server to run the test tools locally. To run the test server download and install node.js and npm. From the command line move the project directory and excute the following commands:

```sh 
    $ npm install
    $ node app
```  


Client-side interface and standards tests
--------------------------------------
The page below run the full [microfomats test suite](https://github.com/microformats/tests) as well as the libraries own unit test for each modules interface. 
The tests are created in [mocha](http://mochajs.org/) and test coverage is provides by [blanket](http://blanketjs.org/).

* http://localhost:3000/coverage.html



Client-side debugging tools
---------------------------
There are also a number of other debugging and tests tools:

* http://localhost:3000/testrunner.html (clients side version microfomats test suite testrunner)
* http://localhost:3000/parse.html (clients side form to for parsing and debugging)
* http://localhost:3000/parse-umd.html (clients side form to test the full umd wrapped version of the code)
* http://localhost:3000/count.html (clients side form to test count function)


Server-side test
--------------------------------------
You can run mocho html test from the command line
```sh 
    $ mocha-phantomjs -R dot /test/ci.html
```   
    
Server-side test coverage reports
--------------------------------------
You can run test coverage reports using [poncho](https://github.com/deepsweet/poncho) from the command line

```sh 
    $ ./node_modules/.bin/poncho --reporter lcov test/ci.html
```  

or to send the data to codacy.com or coveralls.io - you will need to add a token to your environment.

```sh
    $ ./node_modules/.bin/poncho --reporter lcov test/ci.html | ./node_modules/codacy-coverage/bin/codacy-coverage.js
```  


Pulling [microfomats test suite](https://github.com/microformats/tests) updates
-------------------------------------------------------------------------------
There is a script to pull updated from microfomats test suite and rebuild all the test files.

```sh 
    $ node update-tests
```  

Within this file you can configure the github repo you pull from so forks of [microfomats test suite](https://github.com/microformats/tests) can also be used.



Exernal links
-------------

* https://travis-ci.org/glennjones/microformat-shiv
* https://coveralls.io/r/glennjones/microformat-shiv
* https://www.codacy.com/app/glennjonesnet/microformat-shiv/dashboard