export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://mailprex.excelso.xyz";

export const AVATAR_FILES = [
  "avatar_1.webp",
  "avatar_2.webp",
  "avatar_3.webp",
  "avatar_4.webp",
  "avatar_5.webp",
  "avatar_6.webp",
] as const;

export type AvatarFile = (typeof AVATAR_FILES)[number];

export const DEFAULT_AVATAR_URL = `${SITE_URL}/avatars/${AVATAR_FILES[0]}`;

export const AVATAR_URLS: string[] = AVATAR_FILES.map(
  (file) => `${SITE_URL}/avatars/${file}`
);

export const getAvatarPublicPath = (file: AvatarFile) => `/avatars/${file}`;

export const getAvatarUrl = (file: AvatarFile) =>
  `${SITE_URL}/avatars/${file}`;

export const isAllowedAvatarUrl = (photo: string): boolean =>
  AVATAR_URLS.includes(photo) ||
  AVATAR_FILES.some((file) => photo.endsWith(`/avatars/${file}`));

export const resolveProfilePhoto = (photo?: string | null): string => {
  if (!photo) return DEFAULT_AVATAR_URL;
  if (photo.startsWith("/avatars/")) return `${SITE_URL}${photo}`;
  return photo;
};
