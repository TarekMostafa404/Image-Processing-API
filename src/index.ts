import express from 'express';
import routes from './api/imageApi';

const app = express();
const port = 3000;

app.use('/', routes);

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});

export default app;
