
// Db
const cuid = require('cuid')
const db = require('../db/db')

// Validators
const { isEmail } = require('validator')

/**
 * Order Model
 * @type {Order<Document>}
 */
const Order = db.model('Order', {
    _id: { type: String, default: cuid },
    buyerEmail: emailSchema({ required: true }),
    products: [
        {
            type: String,
            ref: 'Product',
            index: true,
            required: true
        }
    ],
    status: {
        type: String,
        index: true,
        default: 'CREATED',
        enum: ['CREATED', 'PENDING', 'COMPLETED']
    }
})

async function list (opts = {}) {
    const {offset = 0, limit = 25, tag} = opts

    const query = tag ? { tags: tag } : {}
    const orders = await Order.find(query)
        .sort({ _id: 1 })
        .skip(offset)
        .limit(limit)
    return orders
}

async function get (_id) {
    const order = await Order.findById(_id)
        .populate('products')
        .exec()
    return order
}

async function create (fields) {
    const order = await new Order(fields).save()
    await order.populate('products').execPopulate()
    return order
}

async function edit (_id, change) {
    const order = await get(_id)
    Object.keys(change).forEach(function (key) {
        order[key] = change[key]
    })
    await order.save()
    return order
}

async function remove (_id) {
    await Order.deleteOne({ _id })
}

function emailSchema (opts = {}) {
    const { required } = opts
    return {
        type: String,
        required: !!required,
        validate: {
            validator: isEmail,
            message: props => `${props.value} is not a valid email`
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