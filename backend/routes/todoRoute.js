import express from 'express';
import { createTask, deleteTask, getAllTask, updateTask } from '../controller/todoController.js';
import { hasToken } from '../middleWare/hasToken.js';


const todoRoute = express.Router();

todoRoute.post("/create",hasToken ,createTask);
todoRoute.get("/getAll",hasToken ,getAllTask);
todoRoute.put("/tasks/:id",hasToken, updateTask);
todoRoute.delete("/delete/:id",hasToken ,deleteTask);

export default todoRoute;