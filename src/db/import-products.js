
// config
const config = require('../config.js');

const db = require('./db')

const products = require('./products.json')

const Product = require('../models/Product')

;(async function () {
    for (let i = 0; i < products.length; i++) {
        console.log(await Product.create(products[i]))
    }
    db.disconnect()
})()
