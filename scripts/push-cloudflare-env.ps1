# Push secrets from .env.local to Cloudflare Worker a4o.
# Prereq: npx wrangler login
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$envFile = Join-Path $root ".env.local"

if (-not (Test-Path $envFile)) {
  Write-Error ".env.local not found. Copy .env.example and fill in values first."
}

$secrets = @(
  "ADMIN_PASSWORD",
  "SUPABASE_URL",
  "SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "RESEND_API_KEY",
  "OWNER_NOTIFICATION_EMAIL",
  "RESEND_FROM_EMAIL",
  "TWILIO_ACCOUNT_SID",
  "TWILIO_AUTH_TOKEN",
  "TWILIO_FROM_NUMBER",
  "OWNER_SMS_NUMBER"
)

$lines = Get-Content $envFile | Where-Object { $_ -match '^\s*[^#]' -and $_ -match '=' }
$values = @{}
foreach ($line in $lines) {
  $idx = $line.IndexOf("=")
  if ($idx -lt 1) { continue }
  $key = $line.Substring(0, $idx).Trim()
  $val = $line.Substring($idx + 1).Trim()
  if ($val) { $values[$key] = $val }
}

Push-Location $root
try {
  foreach ($name in $secrets) {
    if (-not $values.ContainsKey($name)) {
      Write-Host "Skip $name (not set in .env.local)"
      continue
    }
    Write-Host "Setting secret: $name"
    $values[$name] | npx wrangler secret put $name
  }
  Write-Host ""
  Write-Host "Done. Secrets are stored on worker a4o."
  Write-Host "Deploy with: npm run deploy"
  Write-Host "Verify live: https://all4oneexterior.com/api/config"
  Write-Host "  storageMode should be supabase; runtimeEnv flags should all be true."
} finally {
  Pop-Location
}
