const User = require("../models/user");

const blockUser = async(req , res)=>{
    try{
        const userId = req.params.id;
        const {reason} = req.body;

        if(userId === req.user.userId){
              return res.status(400).json({ message: "You cannot block yourself" });
        }

        const user = await User.findById(userId);
        if(!user){
             return res.status(404).json({ message: "User not found" });
        }

        if(user.role === "admin"){
            return res.status(403).json({ message: "Cannot block an admin" });
        }

        user.isBlock = true;
        user.blockReason = reason;
        user.blockedAt = new Date();
        user.blockedBy = req.user.id;

        await user.save();

           res.status(200).json({
            message: "User blocked successfully"
        });

    }catch(err){
        console.log(err);
    }
};

const unblockUser = async(req , res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        
        user.isBlock = false;
        user.blockedReason = undefined;
        user.blockedAt = undefined;
        user.blockedBy = undefined;

        await user.save();

        res.status(200).json({ message: "User unblocked successfully" });

    }catch(err){
        cosnole.log(err);
    }
} 
module.exports = {
    blockUser,
    unblockUser
}