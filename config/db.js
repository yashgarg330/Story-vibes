const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{ //this return a promise
            //1st arg is connection string
            //2nd arg aoptions to avoid any warnings in the console
            useNewUrlParser: false,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        console.log(`MongoDB connected: ${conn.connextion.host}`)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
    module.export = connectDB
}