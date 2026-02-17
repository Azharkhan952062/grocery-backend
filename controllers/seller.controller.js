import jwt from "jsonwebtoken";

export const sellerLogin = async (req, res) => {
    console.log("SELLER LOGIN API HIT");

    try {
        const { email, password } = req.body;

        if (
            email === process.env.SELLER_EMAIL &&
            password === process.env.SELLER_PASSWORD
        ) {

            const token = jwt.sign(
                { email: process.env.SELLER_EMAIL },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            // IMPORTANT COOKIE FIX
            res.cookie("sellerToken", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: "/"
            });

            return res.status(200).json({
                message: "Login successfully",
                success: true
            });
        }

        return res.status(401).json({
            message: "Invalid credentials",
            success: false
        });

    } catch (error) {
        console.error("Error in sellerLogin:", error);
        res.status(500).json({ message: "Server error" });
    }
};


export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie("sellerToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/"
        });

        res.status(200).json({
            message: "Logout successfully",
            success: true
        });

    } catch (error) {
        console.log("Error in sellerLogout:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



export const isAuthSeller = (req, res) => {
    try {
        res.status(200).json({
            success: true,
        });
    } catch (error) {
        console.error("Error in isAuthSeller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};