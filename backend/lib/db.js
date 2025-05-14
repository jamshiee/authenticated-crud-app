import mongoose from 'mongoose'

export const dbConnect = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
        console.log("Db Connected")
    } catch (error) {
        console.log(error)
    }
}