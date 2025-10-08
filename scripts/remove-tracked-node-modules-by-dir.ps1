Write-Output "Remove tracked node_modules directories - starting in $(Get-Location)"

# Get all tracked files under any node_modules
$files = git ls-files -- '*/node_modules/*' 2>$null
if (-not $files) {
  Write-Output "No tracked node_modules files found. Nothing to do."
  exit 0
}

# Extract unique node_modules directories (relative paths as git reports)
$dirs = $files | ForEach-Object {
  if ($_ -match '^(.*?node_modules)(?:/|\\|$)') { $matches[1] }
} | Sort-Object -Unique

Write-Output "Found $($files.Count) tracked files under node_modules in $($dirs.Count) directories."
$dirs | ForEach-Object { Write-Output " - $_" }

foreach ($d in $dirs) {
  Write-Output "Removing from index: $d"
  # Use ignore-unmatch so git won't fail if path is already gone
  git rm -r --cached --ignore-unmatch -- "$d" 2>$null
}

Write-Output 'Staging and committing changes (if any)...'
git add .
git commit -m "Remove tracked node_modules directories from index" 2>$null
if ($LASTEXITCODE -ne 0) { Write-Output 'No changes to commit or commit failed' }

# Report remaining tracked files under node_modules
$remain = git ls-files -- '*/node_modules/*' 2>$null
if (-not $remain) { Write-Output 'Success: no tracked files left under node_modules' } else { Write-Output ("Still tracked files: " + ($remain | Measure-Object).Count); $remain | Select-Object -First 50 | ForEach-Object { Write-Output " - $_" } }

Write-Output 'Done'
