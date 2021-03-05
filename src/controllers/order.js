const Order = require('../models/Order')

// helpers
//const { autoCatch } = require('../helpers/helpers') // KO ?

async function list (req, res, next) {

    const { offset = 0, limit = 25, productId, status } = req.query

    try {
        const opts = {
            offset: Number(offset),
            limit: Number(limit),
            productId,
            status
        }
        if (!req.isAdmin){
            opts.username = req.user.username
        }

        const orders = await Order.list(opts)

        res.json({ data: orders})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

async function get (req, res, next) {

    try {
        const {id} = req.params

        const order = await Order.get(id)
        if (!order) return next()
        res.json({data: order})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

async function create (req, res, next) {

    try {
        const fields = req.body
        if (!req.isAdmin){
            fields.username = req.user.username
        }

        const order = await Order.create(req.body)
        res.json(order)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

async function edit (req, res, next) {

    try {
        const change = req.body
        const order = await Order.edit(req.params.id, change)
        res.json({data: order})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

async function destroy (req, res, next) {
    await Order.remove(req.params.id)
    res.json({ success: true })
}

module.exports = {
    list,
    get,
    create,
    edit,
    destroy
}