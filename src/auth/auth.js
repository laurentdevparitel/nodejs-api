const jwt = require('jsonwebtoken')
const passport = require('passport')
const Strategy = require('passport-local').Strategy

//const expressSession = require('express-session') // NB: if session cookie id

// helpers
const { autoCatch } = require('../helpers/helpers') // KO ?

const jwtSecret = process.env.JWT_SECRET || 'mark it zero'
//const sessionSecret = process.env.SESSION_SECRET || 'mark it zero'    // NB: if session cookie id
const adminPassword = process.env.ADMIN_PASSWORD || 'iamthewalrus'
const jwtOpts = { algorithm: 'HS256', expiresIn: '30d' }

passport.use(adminStrategy())
//passport.serializeUser((user, cb) => cb(null, user))  // NB: if session cookie id
//passport.deserializeUser((user, cb) => cb(null, user))    // NB: if session cookie id

const authenticate = passport.authenticate('local', { session: false })

// NB: if session cookie id
/*const setMiddleware = (app) => {
    app.use(session())
    app.use(passport.initialize())
    app.use(passport.session())
}

function session() {
    return expressSession({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false
    })
}*/

function adminStrategy () {
    return new Strategy(function (username, password, cb) {
        const isAdmin = username === 'admin' && password === adminPassword
        if (isAdmin) return cb(null, { username: 'admin' })

        cb(null, false)
    })
}

 const ensureAdmin = async (req, res, next) => {

    const jwtString = req.headers.authorization || req.cookies.jwt
    const payload = await verify(jwtString)
    if (payload.username === 'admin') return next()

    res.status(401).json({ error: 'Unauthorized' })

    //const err = new Error('Unauthorized')
    //err.statusCode = 401
    //next(err)
}


// NB: if session cookie id

/*
const login = (req, res, next) => {
    res.json({success: true})
}
const ensureAdmin = (req, res, next) => {
    const isAdmin = req.user && req.user.username === 'admin'
    if (isAdmin) return next()

    res.status(401).json({ error: 'Unauthorized' })

    //const err = new Error('Unauthorized')
    //err.statusCode = 401
    //next(err)
}
*/

async function login (req, res, next) {
    const token = await sign({ username: req.user.username })
    res.cookie('jwt', token, { httpOnly: true })
    res.json({
        data: { success: true, access_token: token }
    })
}

async function sign (payload) {
    const token = await jwt.sign(payload, jwtSecret, jwtOpts)
    return token
}

async function verify (jwtString = '') {
    jwtString = jwtString.replace(/^Bearer /i, '')

    try {
        const payload = await jwt.verify(jwtString, jwtSecret)
        return payload
    } catch (err) {
        err.statusCode = 401
        throw err
    }
}


module.exports = {
    //setMiddleware,
    authenticate,
    ensureAdmin,
    //ensureAdmin: autoCatch(ensureAdmin),
    login,
    //login: autoCatch(login),
}