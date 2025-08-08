import jwt from "jsonwebtoken";
import userSchema from "../model/userSchema.js";
import 'dotenv/config';
import bcrypt from 'bcrypt';



export const register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const existing = await userSchema.findOne({ email: email });
        if (existing) {
            return res.status(401).json({ success: false, message: "User Already Exists", });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userSchema.create({
            userName,
            email,
            password: hashedPassword,
        });
        const token = jwt.sign({ id: user._id }, process.env.secretKey, {
            expiresIn: "5m",
        });
        user.token = token;
        await user.save();
        return res.status(201).json({ success: true, message: "User Registered Successfully", data: { userName: userName }, });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userSchema.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        } else {
            const checkPassword = await bcrypt.compare(password, user.password);
            if (!checkPassword) {
                return res.status(401).json({ success: false, message: "Invaild password" });
            }
            else {
                const accessToken = jwt.sign({ id: user._id }, process.env.secretKey, { expiresIn: "10m" });
                const refreshToken = jwt.sign({ id: user._id }, process.env.secretKey, { expiresIn: "30m" });
                user.isLoggedIn = true;
                await user.save();
                return res.status(200).json({ success: true, message: "User Loggin Successfully", accessToken: accessToken, refreshToken: refreshToken, data: user, });
            }
        }
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}