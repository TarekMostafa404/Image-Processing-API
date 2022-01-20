import express from 'express';
const route1 = express.Router();

route1.get('/', (req, res)=> {
    // res.send('this is route1')
    res.send(`test ${req.baseUrl}`)
    // console.log(`test ${req.baseUrl}`);
    // res.end();
  });

  export default route1;