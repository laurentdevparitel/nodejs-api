const mongoose = require('mongoose')

/**
 * https://docs.mongodb.com/manual/installation/
 *
 * drop datatabse : db.dropDatabase()
 */
mongoose.connect(
    process.env.MONGO_URI || `mongodb://localhost:27017/${global.gConfig.database}`,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
)
module.exports = mongoose