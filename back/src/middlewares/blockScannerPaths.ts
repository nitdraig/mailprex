import { Request, Response, NextFunction } from "express";

const BLOCKED_PATH_PREFIXES = [
  "/.terraform",
  "/.git",
  "/.svn",
  "/.aws",
  "/helm/",
  "/infra/terraform",
  "/kubernetes",
  "/k8s",
  "/wp-admin",
  "/wp-login",
  "/wp-content",
  "/wp-includes",
  "/phpmyadmin",
  "/actuator",
  "/vendor/phpunit",
  "/backup/",
  "/secrets/",
];

const BLOCKED_PATH_SEGMENTS = [
  "terraform.tfstate",
  "terraform.tfvars",
  ".env.local",
  ".env.production",
  "id_rsa",
  "id_dsa",
  "wp-config.php",
  "web.config",
  "config.php",
];

const BLOCKED_EXACT_PATHS = new Set([
  "/terraform.tfstate",
  "/terraform.tfvars",
  "/k8s.yaml",
  "/k8s.yml",
  "/kubernetes.yaml",
  "/kubernetes.yml",
  "/.env",
]);

function normalizePath(path: string): string {
  try {
    return decodeURIComponent(path).toLowerCase();
  } catch {
    return path.toLowerCase();
  }
}

function isScannerPath(path: string): boolean {
  const normalized = normalizePath(path);

  if (BLOCKED_EXACT_PATHS.has(normalized)) {
    return true;
  }

  if (BLOCKED_PATH_PREFIXES.some((prefix) => normalized.startsWith(prefix))) {
    return true;
  }

  if (BLOCKED_PATH_SEGMENTS.some((segment) => normalized.includes(segment))) {
    return true;
  }

  if (/^\/\.[^/]+/.test(normalized) && !normalized.startsWith("/.well-known")) {
    return true;
  }

  return false;
}

export function blockScannerPaths(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (isScannerPath(req.path)) {
    res.status(404).end();
    return;
  }
  next();
}
