# nodejs-products-api

https://github.com/AnthonyIp/nodejs-api
https://github.com/AnthonyIp/Hosting-website

## MongoDb Install on M1

https://stackoverflow.com/questions/66381265/does-the-mongocli-support-a-formula-url-for-apple-m1-chips

### Docs
https://github.com/mongodb/homebrew-brew
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

#### Start service
`brew services start mongodb-community`

#### Stop service
`brew services stop mongodb-community`

#### Show items from 'products' collection
`db.products.find().pretty()`

#### Drop current Db
`db.dropDatabase()`

## Import items to db
`npm run import`