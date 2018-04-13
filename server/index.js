import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import router from './router';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/api', router);

app.listen(3000, () =>{ 
<<<<<<< HEAD
    console.log('listening on port 3000...');
=======
  console.log('Example app listening on port 3000!');
>>>>>>> b27054b6795c1347f9a3add1868f4775a549c35a
});