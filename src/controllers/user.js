const User = require('../models/User')

// helpers
//const { autoCatch } = require('../helpers/helpers') // KO ?

async function list (req, res, next) {

    const { offset = 0, limit = 25 } = req.query

    try {

        const users = await User.list({
            offset: Number(offset),
            limit: Number(limit)
        })

        res.json({ data: users})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

async function get (req, res, next) {

    try {
        const {username} = req.params

        const user = await User.get(username)
        if (!user) return next()
        res.json({data: user})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

async function create (req, res, next) {

    try {
        const user = await User.create(req.body)
        const { username, email } = user
        res.json({username, email })
        //res.json(user)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

async function edit (req, res, next) {

    try {
        const change = req.body
        const user = await User.edit(req.params.username, change)
        res.json({data: user})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

async function destroy (req, res, next) {
    await User.remove(req.params.username)
    res.json({ success: true })
}

module.exports = {
    list,
    get,
    create,
    edit,
    destroy
}