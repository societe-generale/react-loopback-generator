How to contribute?
==================

Installation
------------

you have to fork the https://github.com/societe-generale/react-loopback-generator to your own repo.
don't forget to add the upstream as a remote repository to your fork

Make sure you npm installed yo and the generator git ([README.md](README.md)).

``` bash
git clone <URL-GENERATOR>.git
cd react-loopback-generator
npm install
npm link
```

Thanks to `npm link` you can then use `yo react-loopback` to generate projects based on your local repository (taking into account the changes you made).

Contributing Code
-----------------

To contribute follow Git Flow guidelines : [Git Flow Cheatsheet](http://danielkummer.github.io/git-flow-cheatsheet/).

in a nutshell :
create a new branch on your forked repo
push your commits into that branch
open your fork in github.com
and create a PR based on this new branch.
since your repo is a forked repo github will create a pull request on the societe-generale repository
and then it's our job to review it and merge it !

Keeping your fork in sync with societe-generale repo
please refer to those 2 documents :
https://help.github.com/articles/configuring-a-remote-for-a-fork/
https://help.github.com/articles/syncing-a-fork/


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



