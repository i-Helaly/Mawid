const jwt = require("jsonwebtoken");

const verify = (req , res , next)=>{
    const headers = req.headers["Authorization"] || req.headers["authorization"];
    if(!headers){
        return res.status(400).json("token not Found")
    }
    const token = headers.split(" ")[1];

    try{

        const checkToken = jwt.verify(token , process.env.JWT_SECRET_KEY);
        req.user = checkToken
        next();
    }catch(err){
        res.status(401).json("unauthoriazed")
    }
}

module.exports = verify;