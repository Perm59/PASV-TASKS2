Create Webdriver IO project from scratch (Windows)
 
Create new Repository on GitHub.






Set up project in Webstorm 





Create .gitignore file under the Root folder. Add it to Git. Add the following text in this file:
.idea
.idea/*
node_modules/



Install Webdriver IO
Run these commands in Terminal in Webstorm in the following order:
 npm init -y 
npm i --save-dev @wdio/cli
./node_modules/.bin/wdio config -y




Add the following script in package.json file:

"test": "./node_modules/.bin/wdio wdio.conf.js"



Add package.json, package-lock.json, wdio.conf.js files to Git.



Create modules directory under the root folder and a new JavaScript file in it (should end with .spec.js). Add to Git.


Add the following text ‘./modules/**/*.spec.js' under specs in wdio.conf.js file.

Install chai: 
Run npm install chai command in Terminal in Webstorm


Enable all libraries in Setting -> Libraries:


Install Babel
Add the following dependencies in package.json file
"@babel/cli": "^7.8.4",
"@babel/core": "^7.8.4",
"@babel/preset-env": "^7.8.4",
"@babel/register": "^7.8.3",


Create new JavaScript file under the root folder named babel.config.js. Add toGit.

Add the following text in this file:
module.exports = {
 presets: [
   ['@babel/preset-env', {
     targets: {
       node: 12
     }
   }]
 ]
};

Run npm install command in Terminal

Install Eslint:

Run these commands in Terminal in the following order:

npm install eslint --save-dev
$ npx eslint --init
Answer questions:


Select “Automatic ESLint configuration” in Settings/ESLint:



Add the following strings under "env": in .eslintrc.json file:

"commonjs": true,
"jest": true,
"es6": true,
"node": true,
"jquery": true,
"browser": true




Add "sourceType": "module" under "parserOptions" and 2 instead of 4 in “indent” in .eslintrc.json file:



Add .eslintrc.json file to Git.

Run npm install command  in Terminal.

From now on in order to fix ESLint problems, right mouse click in the correspondent file and click on Fix ESLint problems.

Add keyboard shortcut to fix ESLint problems:
Settings->Keymap->”Fix Eslint Problems”->Add Keyboard Shortcut->add shortcut.



Run tests
All tests can be run with npm test command in Terminal.

Individual tests can be run with the following command in Terminal (specify the exact location of file to be run):
wdio wdio.conf.js --spec ./modules/test.spec.js


Add keyboard shortcuts to run individual tests:

Settings -> External Tools ->New ->


Settings->Keymap->Run WDIO->Add Keyboard Shortcut->add shortcut.
