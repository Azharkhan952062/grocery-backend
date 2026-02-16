import jwt from "jsonwebtoken";

export const authSeller = (req, res, next) => {
  try {
    const { sellerToken } = req.cookies;   

   console.log("SELLER COOKIES:", req.cookies);


    if (!sellerToken) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false
      });
    }

    const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);

    if (decoded.email=== process.env.SELLER_EMAIL) {
     
      next();
    } else {
      return res.status(403).json({
        message: "Only seller can add product",
        success: false
      });
    }

  } catch (error) {
    //console.log("AUTH ERROR =>", error.message);

    return res.status(401).json({
      message: "Unauthorized",
      success: false
    });
  }
};
