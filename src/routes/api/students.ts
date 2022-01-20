import express from 'express';
const students = express.Router();

students.get('/', (req, res) => {
  res.send('students route')
  // res.send(req.baseUrl)
});

export default students;
