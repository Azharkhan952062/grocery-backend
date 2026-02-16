import Address from "../models/address.model.js";


export const addAddress = async (req, res) => {
    try {
        const userId = req.user;
        const { address } = req.body;

        await Address.create({
            ...address,
            userId,
        });
        res.status(201).json({
            message: "Address added successfully", success: true,
        });
    } catch (error) {
        console.error("Error adding address:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAddress = async (req, res) => {
    const userId = req.user;
    try {
        const addresses = await Address.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            addresses,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });

    }
};