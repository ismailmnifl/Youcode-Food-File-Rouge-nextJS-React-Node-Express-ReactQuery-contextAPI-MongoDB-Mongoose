const User = require('../models/user');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const generateAccessToken = (payload) => {
    return jwt.sign({ payload }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
  };
module.exports = {

    login: async (req, res, next) => {
        const {
            email,
            password
        } = req.body;

        const result = await User.findOne({ email: email}).populate('role').populate('restaurant');
        if (result) {
            const userpassword = await bcrypt.compare(password,result.password);
            if (userpassword) {
                const token = generateAccessToken({email:result.email,role:result.role.description,id:result._id});
                res.status(200).json({credential:true,token:token,user: result});
                
            }else {
                res.status(200).json({
                    message: "wrong password"
                })
            }
            
        } else {
            res.status(200).json({
                credential : false,
                message: "login credentials are false !"
            });
        }
    },

}

