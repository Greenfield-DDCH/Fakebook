import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', (req,res)=>{
    res.send('hello');
});

app.listen(3001, () =>{ 
    console.log('Example app listening on port 3001!');
});