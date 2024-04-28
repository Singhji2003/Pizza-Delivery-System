import mongoose from 'mongoose'
const connectToDB = async () => {
    try {
        const connectionResponse = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log("MongooDB is connected succesfully with ", connectionResponse.connection.host);
    }
    catch (error) {
        console.log("MongooDB coonection Failed", error);
        process.exit(1)
    }
}
export default connectToDB;