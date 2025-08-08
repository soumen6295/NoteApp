import mongoose from "mongoose";
import dotenv from 'dotenv/config';

const dbConnection = () => {

    mongoose.connect(process.env.url)
        .then(() => {
            console.log(`databased has been connected`)
        }).catch((err) => {
            console.log(err);
        })

}

export default dbConnection;