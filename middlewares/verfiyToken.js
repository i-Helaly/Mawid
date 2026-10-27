const jwt = require("jsonwebtoken");

const verify = (req , res , next)=>{
    const headers = req.headers["Authorization"] || req.headers["Authorization"];
    if(!headers){
        return res.status(400).json("tojen not foun")
    }
    const token = headers.split(" ")[1];

    try{

        const checkToken = jwt.verify(token , process.env.JWT_SECRET_KEY);
        next();
    }catch(err){
        res.status(401).json("unauthoriazed")
    }
}

module.exports = verify;