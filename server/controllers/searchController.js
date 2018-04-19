import searchModel from '../models/searchModel';

const searchContoller = function (req, res) {
  searchModel(req.params.username, (err, result )=>{
    if (err) { console.log(err); }
    // console.log("result in controller", result);
    res.json(result);
  });
};    

export default searchContoller;