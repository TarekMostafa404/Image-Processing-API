import express from "express";
import route1 from "./routes/route1";
import route2 from "./routes/route2";

const app = express();
const port = 3000;

app.use('/1', route1);
app.use('/2', route2);

// const router = express.Router();
// app.get('/api', (req,res)=>{
//   // res.sendStatus(200);
//   res.send("welcome to express!");
// });




app.listen(port, ()=>{
  console.log(`server is running`);
});