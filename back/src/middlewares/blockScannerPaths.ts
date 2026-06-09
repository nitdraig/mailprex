import { Request, Response, NextFunction } from "express";

const BLOCKED_PATH_PREFIXES = [
  "/.terraform",
  "/.git",
  "/.svn",
  "/.aws",
  "/.kube",
  "/.docker",
  "/helm/",
  "/infra/terraform",
  "/kubernetes",
  "/k8s",
  "/wp-admin",
  "/wp-login",
  "/wp-content",
  "/wp-includes",
  "/phpmyadmin",
  "/adminer",
  "/actuator",
  "/vendor/phpunit",
  "/backup/",
  "/secrets/",
  "/swagger",
  "/api-docs",
  "/graphql",
  "/graphiql",
  "/debug/",
  "/console",
  "/cgi-bin/",
  "/jenkins",
  "/gitlab",
  "/laravel/",
  "/node_modules/",
  "/_ignition",
  "/telescope",
  "/web-inf/",
  "/meta-inf/",
  "/manager/",
  "/invoker/",
  "/solr/",
  "/jmx-console",
  "/weblogic",
  "/boaform/",
  "/sdk/",
];

const BLOCKED_PATH_SEGMENTS = [
  "terraform.tfstate",
  "terraform.tfvars",
  ".env",
  ".env.local",
  ".env.production",
  ".env.staging",
  "id_rsa",
  "id_dsa",
  "id_ecdsa",
  "wp-config.php",
  "web.config",
  "config.php",
  "phpinfo.php",
  "eval-stdin.php",
  "docker-compose",
  "appsettings.json",
  "credentials.json",
  "service-account.json",
  "google-services.json",
  "database.yml",
  "database.yaml",
  "application.properties",
  "application.yml",
  "settings.py",
  "dump.sql",
  "backup.sql",
  "backup.zip",
  "backup.tar",
  "web.xml",
  ".pem",
  ".key",
  ".htpasswd",
];

const BLOCKED_EXACT_PATHS = new Set([
  "/terraform.tfstate",
  "/terraform.tfvars",
  "/k8s.yaml",
  "/k8s.yml",
  "/kubernetes.yaml",
  "/kubernetes.yml",
  "/docker-compose.yml",
  "/docker-compose.yaml",
  "/.env",
  "/server-status",
  "/crossdomain.xml",
  "/clientaccesspolicy.xml",
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
