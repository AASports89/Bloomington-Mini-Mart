import { userModel } from "../models/User.js";

export const getUserData = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "🚫***| User NOT found |***🚫" });
        }
        res.json({
            success: true,
            userData: {
                username: user.username,
                isAdmin: user.isAdmin
            }
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}