export function getAdminEmails(): string[] {
  const raw = process.env.MAILPREX_ADMIN_EMAILS ?? "";
  return raw
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string): boolean {
  return getAdminEmails().includes(email.toLowerCase().trim());
}

export function isAdminConfigured(): boolean {
  return getAdminEmails().length > 0;
}
