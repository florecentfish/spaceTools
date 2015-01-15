Space-Tools
==========

A series of tools and proofs of concept for EvE online

Dependencies:
Gulp
npm

To begin working on the app checkout the space tools repo, once checked out run npm install, once npm install finishes grabbing the proper dependencies run the command gulp. This will run the default gulp task which will create your build folder from which to run the app.


File structure explantion

es5/ - older version of javascript for use in current day browsers due to the newness of the ES6 syntax and tyle

app/ - where you will be changing code and making modifications to be compiled, this entire directory consists of Bootstrap + Angular + ES6 + SASS to form the backbone and core of the front end portion of the application.

build/ - this folder is where you want to be running the code that you are writing in the app folder it is the finished compiled/minified version of the code and is able to be viewd in modern browsers.

index.html - this is the roots that the app tree springs from and the only file outside of the app folder you will be editing.