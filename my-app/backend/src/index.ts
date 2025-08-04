import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
import userRoutes from "./routes/userRoute.js"
import adminRoute from "./routes/adminRoute.js"

const app = express();
const port = process.env.PORT;

app.use(express.json())
app.use(userRoutes)
app.use(adminRoute)

async function main() {
    if(!process.env.MONGODB_URL) {
        console.log("invalid url")
    } else {
        await mongoose.connect(process.env.MONGODB_URL).then(() => {
            console.log('mongoDB connected')
        })
    
        app.listen(port, () => {
            console.log(`Serving on ${port}`)
        })
    }
}

main()