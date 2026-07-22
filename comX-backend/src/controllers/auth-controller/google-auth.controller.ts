import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { prisma } from "../../config/dbConnect";
import { responseCodes } from "../../utils/response-codes";
import { create_token } from "../../utils/token";
import bcryptjs from "bcryptjs";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);

export const googleAuth = async (req: Request, res: Response) => {
  try {
    const { token, credential, accessToken } = req.body;
    const tokenToVerify = credential || token || accessToken;

    if (!tokenToVerify) {
      return responseCodes.clientError.badRequest(res, "Google token is required");
    }

    let email: string | undefined;
    let name: string | undefined;
    let picture: string | undefined;

    // Try verifying ID Token with Google OAuth2Client first
    try {
      if (process.env.GOOGLE_CLIENT_ID) {
        const ticket = await client.verifyIdToken({
          idToken: tokenToVerify,
          audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (payload) {
          email = payload.email;
          name = payload.name;
          picture = payload.picture;
        }
      }
    } catch (idTokenError) {
      console.warn("verifyIdToken failed, falling back to Google UserInfo API:", idTokenError);
    }

    // Fallback to Google UserInfo API (handles access tokens or unverified client_ids gracefully)
    if (!email) {
      try {
        const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${tokenToVerify}`,
          },
        });
        if (userInfoRes.ok) {
          const userInfo = await userInfoRes.json();
          email = userInfo.email;
          name = userInfo.name;
          picture = userInfo.picture;
        }
      } catch (userInfoError) {
        console.error("Google UserInfo fetch failed:", userInfoError);
      }
    }

    if (!email) {
      return responseCodes.clientError.unauthorized(res, "Failed to verify Google account credentials");
    }

    // Check if user exists in database
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Generate a unique username from email
      let baseUsername = email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      if (!baseUsername) baseUsername = "user";
      let uniqueUsername = baseUsername;
      let count = 1;

      while (await prisma.user.findUnique({ where: { username: uniqueUsername } })) {
        uniqueUsername = `${baseUsername}${count}`;
        count++;
      }

      const randomPassword = await bcryptjs.hash(Math.random().toString(36) + Date.now().toString(), 8);

      user = await prisma.user.create({
        data: {
          email: email,
          name: name || baseUsername,
          username: uniqueUsername,
          password: randomPassword,
          designation: "Developer",
          avatar: picture || null,
          isVerified: true,
        },
      });
    } else if (!user.isVerified) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { isVerified: true },
      });
    }

    await create_token(res, user);
    user.password = "";

    return responseCodes.success.ok(res, user, "Logged in with Google successfully");
  } catch (error) {
    console.error("googleAuth error:", error);
    return responseCodes.serverError.internalServerError(res, "An error occurred during Google authentication");
  }
};
