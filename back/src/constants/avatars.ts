const SITE_URL =
  process.env.SITE_URL?.replace(/\/$/, "") ?? "https://mailprex.excelso.xyz";

export const AVATAR_FILES = [
  "avatar_1.webp",
  "avatar_2.webp",
  "avatar_3.webp",
  "avatar_4.webp",
  "avatar_5.webp",
  "avatar_6.webp",
] as const;

export const DEFAULT_AVATAR_URL = `${SITE_URL}/avatars/${AVATAR_FILES[0]}`;

export const pickDefaultAvatarUrl = (): string => {
  const file =
    AVATAR_FILES[Math.floor(Math.random() * AVATAR_FILES.length)] ??
    AVATAR_FILES[0];
  return `${SITE_URL}/avatars/${file}`;
};

export const ALLOWED_AVATAR_URLS = AVATAR_FILES.map(
  (file) => `${SITE_URL}/avatars/${file}`
);

export const isAllowedAvatarUrl = (photo: string): boolean =>
  ALLOWED_AVATAR_URLS.includes(photo) ||
  AVATAR_FILES.some((file) => photo.endsWith(`/avatars/${file}`));

export const normalizeAvatarUrl = (photo: string): string => {
  const matchedFile = AVATAR_FILES.find((file) =>
    photo.endsWith(`/avatars/${file}`)
  );

  if (matchedFile) {
    return `${SITE_URL}/avatars/${matchedFile}`;
  }

  return photo;
};
