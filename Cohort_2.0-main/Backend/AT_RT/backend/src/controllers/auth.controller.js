import { getAccessTokenService, loginService, registerService } from "../services/auth.service.js";

export const registerController = async (req, res) => {
  const { accessToken, refreshToken, user } = await registerService(req.body);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 10 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    message: "User registered successfully",
    user: user,
  });
};

export const loginController = async (req, res) => {
  const { accessToken, refreshToken, user } = await loginService(req.body);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 10 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    message: "User login successfully",
    user: user,
  });
};

export const getAccessTokenController = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Unauthorized reguest",
      });
    }

    let accessToken = getAccessTokenService(refreshToken);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 10 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Access token generated",
    });
  } catch (error) {
    throw Error(error)
  }
};
