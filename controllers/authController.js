const User = require("../models/user")
const bcrypt = require("bcrypt");
const jsend = require("../utils/jsend")

const register = async (req, res) => {

    const { name, email, password } = req.body;
    const existsUser = await User.findOne({ email });
    if (existsUser) {
        return res.status(400).json({ status: jsend.FAIL, data: { msg: "user already exists" } })
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    const saveUser = {
        name: user.name,
        email: user.email,
        role: user.role,
    }
    res.status(201).json({ status: jsend.SUCCESS, data: { user: saveUser } })
}

const login = async(req , res)=>{
    const {email , password} = req.body;
    const user = await User.findOne({email});
    if (!user) {
        return res.status(400).json({ status: jsend.FAIL, data: { msg: "user not found" } })
    }
    const camparePassword = await bcrypt.compare(password , user.password);
    if(!camparePassword){
         return res.status(400).json({ status: jsend.FAIL, data: { msg: "password dont matching" } })
    }
    res.status(200).json({status: jsend.SUCCESS , data:{msg: "login successfully"}})
}
module.exports = {
    register,
    login
}