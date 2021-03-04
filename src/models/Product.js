const fs = require('fs').promises
const path = require('path')

const USE_MOCK_DATA = false;

// USE_MOCK_DATA
const productsFile = path.join(__dirname, '../db/products.json')

// Db
const cuid = require('cuid')
const db = require('../db/db')

// Validators
const { isURL } = require('validator')

/**
 * Use mongo CLI
 * use products_api
 * db.getCollection('products').find().pretty()
 */

/**
 * Product Model
 * @type {Model<Document>}
 */
const Product = db.model('Product', {
    _id: { type: String, default: cuid },
    description: {type: String, required: true},
    imgThumb: urlSchema({ required: true }),
    img: urlSchema({ required: true }),
    link: String,
    userId: {type: String, required: true},
    userName: {type: String, required: true},
    userLink: urlSchema(),
    tags: { type: [String], index: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

async function list (opts = {}) {
    const {offset = 0, limit = 25, tag} = opts

    if (USE_MOCK_DATA){
        const mock_data = await fs.readFile(productsFile)

        return JSON.parse(mock_data)
            .filter((p, i) => !tag || p.tags.indexOf(tag) >= 0)
            .slice(offset, offset + limit)
    }
    else {
        const query = tag ? { tags: tag } : {}
        const products = await Product.find(query)
            .sort({ _id: 1 })
            .skip(offset)
            .limit(limit)
        return products
    }
}

async function get (_id) {

    if (USE_MOCK_DATA){
        const products = JSON.parse(await fs.readFile(productsFile))
        for (let i = 0; i < products.length; i++) {
            if (products[i]._id === _id) return products[i]
        }
    }
    else {
        const product = await Product.findById(_id)
        return product
    }
    return null
}

async function create (fields) {
    const product = await new Product(fields).save()
    return product
}

async function edit (_id, change) {
    const product = await get(_id)
    Object.keys(change).forEach(function (key) {
        product[key] = change[key]
    })
    await product.save()
    return product
}

async function remove (_id) {
    await Product.deleteOne({ _id })
}

function urlSchema (opts = {}) {
    const { required } = opts
    return {
        type: String,
        required: !!required,
        validate: {
            validator: isURL,
            message: props => `${props.value} is not a valid URL`
        }
    }
}

module.exports = {
    list,
    get,
    create,
    edit,
    remove
}