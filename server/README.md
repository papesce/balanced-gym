# Balanced Gym - Server

## Commands:

`npm start`  starts the server in http://localhost:5000 against the mongodb localhost database

`npm start:prod`  starts the server in http://localhost:5000 but against the remote mongodb database

`npm run backup`  backup the local mongodb database

`npm run backup:remote`  backup the remote database

`npm run restore`  restore the local database using the remote data 

## Commands to recreate the app
npm init

npm install --save express
npm install --save path
npm install --save-dev nodemon
npm install --save-dev eslint
npm install --save-dev eslint-config-airbnb eslint-plugin-react eslint-plugin-import eslint-plugin-jsx-a11y 

npm install -save mongodb-restore
npm install -save mongodb-backup

npm install dotenv --save

npm install --save mongoose

npm install --save body-parser
install-peerdeps --dev eslint-config-airbnb


## links
[1](https://medium.com/@StevenLeiva1/configuring-eslint-on-a-nodejs-app-92903cb21038)

#Setup development
(from heroku)
$ npm config set save=true
$ npm config set save-exact=true
$ cat ~/.npmrc 

## Help
git push heroku dev:master

## Setup

EsLint
npm install -g install-peerdeps


## Changelog

__0.1.0__

- Initial release

## License

Copyright (c) 2016

Licensed under the [MIT license](LICENSE).
