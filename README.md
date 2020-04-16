The testing tools and frameworks I selected are Node.JS, WebdriverIO and Mocha, which I found fun and exciting to work with.

Google Maps Navigation Testing

      1. Traveling from Philadelphia to San Francisco with a stop in Denver
      2. Tests are implemented using the Page Object Model with a Page class and GoogleMapsPage class
      3. wdio-webdriver-server package used to test cross browser with both Chrome and Firefox
      4. Chrome and Firefox both tested on MacOs. Firefox also tested on Ubuntu Dekstop
      5. Video and spec reporters used for recording test sessions and reporting results to the console

The following assertions are made:

      1. Verify Google Maps page title is correct
      2. Verify final route page title is correct
      3. Verify final route itself is correct
      4. Verify mileage is correct
      5. Verify travel time without traffic is correct

First, clone my github repo. This assumes git is installted. If not, its available in Command-line Tools for Developes on MacOs.

      % mkdir Testing
      % cd Testing
      % git clone https://github.com/astenback/webdriverio-test.git

Next, install prerequisites:

1. Node and npm : https://nodejs.org/en/download/ : I tested with both current and LTS version.

       The MacOS Pkg installs /usr/local/bin/node and /usr/local/bin/npm

2. WebdriverIO & Mocha : https://webdriver.io & https://mochajs.org/

  WebdriverIO & Mocha must be installed in the webdriverio-test folder cloned from the github repo. All dependencies are defined in the package.json file so npm will install everything.

       % cd webdriverio-test   
       % npm install

Lastly, execute the test:

       % npm test

Recordings of each test execution using the 'Video' reporter are avaiable in the _results_ folder.  Test reports using the 'spec' reporter are written to the console. Successful tests are report as follows:

       [chrome  mac os x #0-0] Spec: /Users/alans/Testing/webdriverio-test/test/specs/philly-to-san-fran-via-denver.js
       [chrome  mac os x #0-0] Running: chrome on mac os x
       [chrome  mac os x #0-0] Session ID: 088196df680984e33842ec0873abdce9
       [chrome  mac os x #0-0]
       [chrome  mac os x #0-0] home page
       [chrome  mac os x #0-0]    ✓ should have the right title
       [chrome  mac os x #0-0]
       [chrome  mac os x #0-0] route page
       [chrome  mac os x #0-0]    ✓ should have the right title
       [chrome  mac os x #0-0]
       [chrome  mac os x #0-0] route page
       [chrome  mac os x #0-0]    ✓ should have the correct route
       [chrome  mac os x #0-0]
       [chrome  mac os x #0-0] route page
       [chrome  mac os x #0-0]    ✓ should have the correct mileage
       [chrome  mac os x #0-0]
       [chrome  mac os x #0-0] route page
       [chrome  mac os x #0-0]    ✓ should have the correct travel time
       [chrome  mac os x #0-0]
       [chrome  mac os x #0-0] 5 passing (18.2s)

       Spec Files:	 1 passed, 1 total (100% completed) in 00:00:19

Screen recording of the test executing with Chrome is also available:

   https://www.loom.com/share/9b56f6ac6209468b8aab8405f9190e10

Execute with Firefox by updating the package.json file as follows:

      "scripts": {
        "test": "wdio gecko.conf.js"
      },

Execution with Firefox has also been tested on Ubuntu Desktop v18.04.4 LTS

      ~$ sudo apt-get update
      ~$ sudo apt-get install git
      ~$ sudo apt-get install nodejs
      ~$ sudo apt-get install npm
      ~$ mkdir Testing
      ~$ cd Testing
      ~/Testing$ git clone https://github.com/astenback/webdriverio-test.git
      ~/Testing$ cd webdriverio-test
      ~/Testing/webdriverio-test$ vi package.json // Update the scripts section as noted above
      ~/Testing/webdriverio-test$ npm install
      ~/Testing/webdriverio-test$ npm test

// Some TO-DOs

1. Move Page and GoogleMapsPage classes into a pageobjects folder and import them into tests. Need to explore possibly using esm or Babel to accomplish this since export/import does not appear to be supported out-of-the-box. Right now, everything is in the single test file test/specs/philly-to-san-fran-via-denver.js

2. Expand cross browser testing to Safari, IE, etc. Chrome and Firefix are tested at the moment

3. Better error and wait handling. I have seen tests fail if various elements are not available more immediately, like over slow internet connections
