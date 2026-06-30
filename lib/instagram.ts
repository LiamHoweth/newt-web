export const INSTAGRAM_USERNAME = "all4one.exteriorsolutions";

export const INSTAGRAM_PROFILE_URL =
  "https://www.instagram.com/all4one.exteriorsolutions/";

/** Opens Instagram DM on mobile; profile on desktop. */
export const INSTAGRAM_DM_URL = `https://ig.me/m/${INSTAGRAM_USERNAME}`;

export function isPlaceholderEmail(email: string): boolean {
  return (
    !email ||
    email.endsWith("@example.com") ||
    email.endsWith("@example.org")
  );
}
