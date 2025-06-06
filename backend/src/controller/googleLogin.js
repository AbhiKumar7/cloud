import { User } from "../model/user.model.js";
import { generateaccessTokenAndRefreshToken } from "../utils/generateAccesAndRefreshToken.js";
import { oauth2Client } from "../utils/googleConfig.js";

import axios from "axios";

export const googleLogin = async (req, res) => {
  try {
    const { code } = req.body;

    const googleResponse = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(googleResponse.tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResponse.tokens.access_token}`
    );

    const { name, email, picture } = userRes.data;
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        image: picture,
      });
    }
    let { refreshToken, accessToken } =
      await generateaccessTokenAndRefreshToken(user?._id);
    let options = {
      httpOnly: true,
      secure: true,
    };

    res.cookie("accessToken", accessToken, options);
    res.cookie("refreshToken", refreshToken, options);
    return res
      .status(200)
      .json({ status: true, message: "success", user, accessToken });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ status: false, message: "Server error", error: error.message });
  }
};
