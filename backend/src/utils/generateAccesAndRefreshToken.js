import { User } from "../model/user.model.js";


export const generateaccessTokenAndRefreshToken = async (UserId) => {
    try {
      let user = await User.findById(UserId);
  
      if (!user) {
        throw new ApiError(404, "User not found");
      }
  
      let accessToken = await user.generateAccessToken();
      let refreshToken = await user.generateRefreshToken();
  
      user.refreshToken = refreshToken;
  
      await user.save({ validateBeforeSave: false });
  
      return { accessToken, refreshToken };
    } catch (error) {
      throw new ApiError(
        400,
        "something went wrong while generating accesstoken and refresh token"
      );
    }
  };

 