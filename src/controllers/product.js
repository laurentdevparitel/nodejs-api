
const Product = require('../models/Product')

// helpers
//const { autoCatch } = require('../helpers/helpers') // KO ?

/**

 CURL :

 curl -sG http://localhost:3001/products -d limit=25 -d offset=50 | jq


 GET 	/photos/{photo}/comments 	index 	photos.comments.index
 GET 	/photos/{photo}/comments/create 	create 	photos.comments.create
 POST 	/photos/{photo}/comments 	store 	photos.comments.store
 GET 	/comments/{comment} 	show 	comments.show
 GET 	/comments/{comment}/edit 	edit 	comments.edit
 PUT/PATCH 	/comments/{comment} 	update 	comments.update
 DELETE 	/comments/{comment} 	destroy 	comments.destroy

 */
async function list (req, res) {

    const { offset = 0, limit = 25, tag } = req.query

    try {
        const products = await Product.list({
            offset: Number(offset),
            limit: Number(limit),
            tag
        });

        res.json({ data: products})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

async function get (req, res, next) {

    try {
        const {id} = req.params

        const product = await Product.get(id)
        if (!product) return next()
        res.json({data: product})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

async function create (req, res, next) {

    try {
        //console.log('request body:', req.body)
        const product = await Product.create(req.body)
        res.json({data: req.body})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

async function edit (req, res, next) {

    try {
        const change = req.body
        const product = await Product.edit(req.params.id, change)
        res.json({data: product})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

async function destroy (req, res, next) {
    await Product.remove(req.params.id)
    res.json({ success: true })
}

module.exports = {
    list,
    get,
    create,
    edit,
    destroy
}