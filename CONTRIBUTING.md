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
