import searchModel from '../models/searchModel';

const searchContoller = function (req, res) {
  console.log('this is req.params', req.params);
  searchModel(req.params.username, (err, result )=>{
    if (err) { console.log(err); }
    console.log('this is in controller', result);
    res.json(result);
  });
};    

export default searchContoller;