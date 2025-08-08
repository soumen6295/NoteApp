import jwt from "jsonwebtoken";
import userSchema from "../model/userSchema.js";

export const hasToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({ success: false, message: "Access token is missing or invalid", });
        } else {
            const token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.secretKey, async (err, decoded) => {
                if (err) {
                    if (err.name === "TokenExpiredError") {
                        return res.status(400).json({ success: false, message: "Access token expired", });
                    } else
                        return res.status(400).json({ success: false, message: "Access token invalid", });
                } else {
                    const { id } = decoded;
                    const user = await userSchema.findById(id);
                    if (!user) {
                        return res.status(404).json({ success: false, message: "user not found", });
                    }
                    req.userId = user._id;
                    next();
                }
            });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Could not access", });
    }
};
