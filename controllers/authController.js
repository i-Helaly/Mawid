const User = require("../models/user")
const bcrypt = require("bcrypt");
const jsend = require("../utils/jsend");
const gernerateJwt = require("../utils/generate.jwt");
const Doctor = require("../models/doctor");

const register = async (req, res) => {
    try {

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
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            status: jsend.FAIL,
            data: { msg: "Internal server error" }
        });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;


        let account = await User.findOne({ email }).select("+password");
        let accountType;

        if (account) {
            accountType = account.role;
        } else {
            account = await Doctor.findOne({ email }).select("+password");;
            accountType = "doctor"
        }

        if (!account) {
            return res.status(400).json({
                status: jsend.FAIL,
                data: { msg: "Invalid email" }
            });
        }

        const isMatch = await bcrypt.compare(password, account.password);

        if (!isMatch) {
            return res.status(400).json({ status: jsend.FAIL, data: { msg: "password dont matching" } })
        }

        const token = gernerateJwt({ userId: account._id, role: accountType, email: account.email });

        res.status(200).json({ status: jsend.SUCCESS, data: { token } })
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            status: jsend.FAIL,
            data: { msg: "Internal server error" }
        });
    }
}
module.exports = {
    register,
    login
}