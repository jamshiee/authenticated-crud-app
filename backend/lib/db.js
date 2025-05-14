import mongoose from 'mongoose'

export const dbConnect = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Db Connected")
    } catch (error) {
        console.log(error)
    }
}