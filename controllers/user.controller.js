const User = require("../models/user");
const resResponse = require("../utils/jsend");

const createUsers = async(req , res)=>{

    const user = await User.create(req.body);
    res.status(201).json({status: resResponse.SUCCESS , data: {user}})

}

module.exports = {
    createUsers
}