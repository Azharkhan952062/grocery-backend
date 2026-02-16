import jwt from "jsonwebtoken";

export const sellerLogin = async (req, res) => {
    console.log("SELLER LOGIN API HIT");

    try {
        const { email, password } = req.body;
        if (
            email === process.env.SELLER_EMAIL &&
            password === process.env.SELLER_PASSWORD
        ) {
            const token = jwt.sign({ email: process.env.SELLER_EMAIL }, process.env.JWT_SECRET, {
                expiresIn: "7d",
            });
            // res.cookie("sellerToken", token, 
            // {
            //     httpOnly: true,
            //     secure: process.env.NODE_ENV === "production",

            //     sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            //     maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days;
            // });
            res.clearCookie("userToken");

            res.status(200).cookie("sellerToken", token,
                {
                    httpOnly: true,
                    // secure: process.env.NODE_ENV === "production",
                    // sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                    secure: false,
                    sameSite: "lax",

                    maxAge: 7 * 24 * 60 * 60 * 1000,
                }).json({
                    message: "Login successfully",
                    success: true,
                    token: token
                });
        }
    } catch (error) {
        console.error("Error in sellerLogin:", error);
    }
};

export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie("sellerToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });
        res.status(200).json({ message: "User Logout successfully", success: true });
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