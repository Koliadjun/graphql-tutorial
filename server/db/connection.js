const mongoose = require('mongoose')
require('dotenv').config()

const { DB_USER, DB_USER_PASS, DB_NAME, DB_CLUSTER } = process.env
const CONNECTION_STRING = `mongodb+srv://${DB_USER}:${DB_USER_PASS}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`

const connectToMongo = async () => {
    try {
        await mongoose.connect(CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Database connection successful')
    } catch (err) {
        console.log('ERROR in connection to mongo:', err.message)
        process.exit(1)
    }
}

module.exports = {
    connectToMongo
}
