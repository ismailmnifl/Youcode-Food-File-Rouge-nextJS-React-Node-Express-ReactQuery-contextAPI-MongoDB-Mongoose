const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  return jwt.verify(token, process.env.TOKEN_SECRET);
}
  module.exports = {

    isStaff: (req, res, next) => {
        const token = req.headers["authorization"];
          if (token) {      
            console.log(token);     
            const user = verifyToken(token);
            const userRole = user.user.role.description;
            if (userRole ==="staff") {
              next();
            }
           
          }else {
            return res.status(200).json({
              message : "you are not authorazed to access this action",
              token:token
            })
          }
          
        
            
      },
}
  
