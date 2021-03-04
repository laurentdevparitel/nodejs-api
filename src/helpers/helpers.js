/**
 * Avoid using try / catch ..
 * @param {Object} handlers
 * @returns {{}}
 */
const autoCatch = (handlers) => {
    return Object.keys(handlers).reduce((autoHandlers, key) => {
        const handler = handlers[key]
        autoHandlers[key] = (req, res, next) =>
            Promise.resolve(handler(req, res, next)).catch(next)
        return autoHandlers
    }, {})
}

module.exports = {
    autoCatch,
}