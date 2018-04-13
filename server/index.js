import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import router from './router';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/api', router);

app.listen(3001, () =>{ 
    console.log('listening on port 3001...');
});