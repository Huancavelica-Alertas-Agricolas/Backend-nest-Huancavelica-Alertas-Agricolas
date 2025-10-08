Write-Output "Ensure node_modules directories are removed from git index (safe) - starting in $(Get-Location)"

$dirs = @(
  'microservices/gateway/api-gateway/node_modules',
  'microservices/services/alert-service/node_modules',
  'microservices/services/notification-service/node_modules',
  'microservices/services/user-service/node_modules',
  'microservices/services/weather-service/node_modules'
)

foreach ($d in $dirs) {
  Write-Output "Removing from index (if present): $d"
  git rm -r --cached --ignore-unmatch -- "$d"
}

Write-Output "\nStaging .gitignore and committing removals (if any)..."
git add .gitignore
# commit may fail if there are no staged changes; show output either way
try {
  git commit -m "Ensure node_modules are removed from index" | Write-Output
  if ($LASTEXITCODE -ne 0) { Write-Output 'No changes to commit or commit failed.' }
} catch {
  Write-Output "Commit threw an error: $_"
}

Write-Output "\nVerification: currently tracked files under node_modules (should be 0):"
git ls-files -- '*/node_modules/*' | Measure-Object

Write-Output "\nDry-run: git add -n . (first 200 lines)"
git add -n . | Select-Object -First 200

Write-Output "\nStatus --ignored --short (first 200 lines)"
git status --ignored --short | Select-Object -First 200

Write-Output 'Done.'
