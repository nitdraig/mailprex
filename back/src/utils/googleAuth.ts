import { OAuth2Client } from "google-auth-library";

export type GoogleProfile = {
  googleId: string;
  email: string;
  emailVerified: boolean;
  givenName: string;
  familyName: string;
};

let oauthClient: OAuth2Client | null = null;

const getOAuthClient = (): OAuth2Client => {
  if (!oauthClient) {
    oauthClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }
  return oauthClient;
};

export const isGoogleAuthEnabled = (): boolean =>
  Boolean(process.env.GOOGLE_CLIENT_ID?.trim());

export const verifyGoogleIdToken = async (
  idToken: string
): Promise<GoogleProfile> => {
  const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
  if (!clientId) {
    throw new Error("Google sign-in is not configured");
  }

  const ticket = await getOAuthClient().verifyIdToken({
    idToken,
    audience: clientId,
  });

  const payload = ticket.getPayload();
  if (!payload?.sub || !payload.email) {
    throw new Error("Invalid Google token payload");
  }

  if (payload.email_verified !== true) {
    throw new Error("Google account email is not verified");
  }

  const givenName = payload.given_name?.trim() || payload.name?.trim() || "User";
  const familyName = payload.family_name?.trim() || "";

  return {
    googleId: payload.sub,
    email: payload.email.toLowerCase(),
    emailVerified: true,
    givenName,
    familyName: familyName || givenName.split(" ").slice(1).join(" ") || "User",
  };
};
