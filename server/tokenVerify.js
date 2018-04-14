import jwt from 'jsonwebtoken';

const verifyJWTToken = (req, res, next) => {
  jwt.verify(req.headers.token, 'superSecret', function(err, decoded) {
    if (err) { console.log(err); }
  
    if (decoded) {
      next();
    }
  });
};

export default verifyJWTToken;
