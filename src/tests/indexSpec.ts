import express from '..';
import routes from '../routes/images';

const app = express();

it('go to main url',()=>{
  expect(app.use('/', routes).get('/'));
});