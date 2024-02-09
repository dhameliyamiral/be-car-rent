const { mongoose } = require('mongoose');
require("dotenv").config();
const router = require("./routes/userRoutes")
const express = require('express')
const app = express()
const port = process.env.port
const db_url = process.env.db_url;
console.log("db url",db_url);
// const db_name = process.env.db_name;
// console.log("db name = ",db_name);
const connectdb = async(db_url)=>{
    try {
        const DB_OPTION = {
            dbname:process.env.db_name,
        }
        await mongoose.connect(db_url,DB_OPTION);
        console.log("connected succesfully...!!!!!");
        app.use(express.json());
        app.use("/api",router)
    
    } catch (error) {
        console.error("error connecting to mongodb",error);
    }
}
app.listen(port, () => console.log(`app listening on port ${port}!`))
connectdb(db_url);
