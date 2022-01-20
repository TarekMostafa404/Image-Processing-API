import express from "express";
import students from "./api/students";
import teachers from "./api/teachers";
import api from "./api/api";
const routes = express.Router();


routes.get('/',(req,res)=>{
    res.send('main route');
    // res.send(req.url);
    })
    
routes.use('/teachers', teachers)
routes.use('/students', students)
routes.use('/api', api);

export default routes;