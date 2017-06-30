How to contribute?
==================

Installation
------------

Make sure you npm installed yo and the generator git ([README.md](README.md)).

``` bash
git clone <URL-GENERATOR>.git
cd generator-fastit
npm install
npm link
```

To contribute follow Git Flow guidelines : [Git Flow Cheatsheet](http://danielkummer.github.io/git-flow-cheatsheet/).


Thanks to `npm link` you can then use `yo fastit` to generate projects based on your local repository (taking into account the changes you made).

Generator Tests
-----

``` bash
npm test
```

Coding Rules
-----
files that are templated should be name like this : myfile.tmpl.ext

if I want to template a file that will end as : nicolas.js
and this file is templated and created through the generator, it should be name nicolas.tmpl.js

this will help identify files that will be only copied to the generated project without modification, and file that are modified by the generator!
