import express from "express";
import routes  from "./routes/images";

const app = express();
const port = 3000;

app.use('/', routes);

app.listen(port, ()=> {
  console.log(`server is running at http://localhost:${port}`);
});