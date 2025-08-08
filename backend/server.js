import express from 'express';
import 'dotenv/config';
import dbConnection from './config/dbConnection.js';
import route from './routes/userRoute.js';
import todoRoute from './routes/todoRoute.js';
import cors from 'cors';


const app = express();
dbConnection();

app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}))

app.use("/user",route);
app.use("/todo",todoRoute);



app.listen(process.env.PORT , ()=>{
    console.log("server is running on" , process.env.PORT)
})



























// https://github.com/soumen6295/todo
// https://github.com/iampd-10/todo