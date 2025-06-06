import { User } from "../model/user.model.js";
import { generateaccessTokenAndRefreshToken } from "../utils/generateAccesAndRefreshToken.js";
export const resgisterUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "all field must be filled" });
    }

    const userExit = await User.findOne({
      $or: [{ name }, { email }],
    });
    if (userExit) {
      return res.status(400).json({ message: "user already register" });
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });

    if (!newUser) {
      return res
        .status(400)
        .json({ message: "Something went wrong while registering" });
    }
    let { refreshToken, accessToken } =
      await generateaccessTokenAndRefreshToken(newUser?._id);

    const createdUser = await User.findById(newUser._id).select(
      "-password  -refreshToken"
    );
    let options = {
      httpOnly: true,
      secure: true,
    };

    res.cookie("accessToken", accessToken, options);
    res.cookie("refreshToken", refreshToken, options);
    return res.status(200).json({
      status: true,
      message: "user registered successfully",
      createdUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Server error", error: error.message });
  }
};
export const login = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!(email || name)) {
      return res.status(400).json({ message: "all field must be filled" });
    }

    let user = await User.findOne({
      $or: [{ name }, { email }],
    });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    let userPassword = await user.isPasswordValidate(password);

    if (!userPassword) {
      return res.status(400).json({ message: "password not correct" });
    }

    let { refreshToken, accessToken } =
      await generateaccessTokenAndRefreshToken(user?._id);
    let loggedUser = await User.findById(user?._id).select(
      "-password -refreshToken"
    );
    let options = {
      httpOnly: true,
      secure: true,
    };

    res.cookie("accessToken", accessToken, options);
    res.cookie("refreshToken", refreshToken, options);
    return res.status(200).json({
      status: true,
      message: "user login successfully",
      loggedUser,
      accessToken,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Server error", error: error.message });
  }
};

export const logOut = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshToken: 1,
        accessToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  res.clearCookie("accessToken", options);
  res.clearCookie("refreshToken", options);

  return res.status(200).json({
    status: true,
    message: "Logout successful",
  });
};

export const changePassword = async (req, res) => {
  try {
    let { oldPassword, newPassword, confirmedPassword } = req.body;

    if (!(newPassword === confirmedPassword)) {
      return res.status(400).json({ message: "password not match" });
    }
    let user = await User.findById(req.user?._id);

    let isPasswordCorrect = await user.isPasswordValidate(oldPassword);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "old password not match" });
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json({
      status: true,
      message: "update successful",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Server error", error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    return res.status(200).json({ status: true, user });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Server error", error: error.message });
  }
};
