import express from 'express';
import { createTask, deleteTask, getAllTask } from '../controller/todoController.js';
import { hasToken } from '../middleWare/hasToken.js';


const todoRoute = express.Router();

todoRoute.post("/create",hasToken ,createTask);
todoRoute.get("/getAll",getAllTask);
todoRoute.delete("/delete/:id",deleteTask);

export default todoRoute;