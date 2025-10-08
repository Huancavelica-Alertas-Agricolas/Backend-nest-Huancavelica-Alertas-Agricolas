Write-Output "DEBUG: Remove tracked node_modules (verbose) - starting in $(Get-Location)"

# List tracked files under node_modules
$files = git ls-files -- '*/node_modules/*'
if (-not $files) {
  Write-Output "No tracked node_modules files found. Nothing to do."
  exit 0
}

$filesCount = ($files | Measure-Object).Count

# Extract unique node_modules directories
$dirs = $files | ForEach-Object {
  if ($_ -match '^(.*?node_modules)(?:/|\\|$)') { $matches[1] }
} | Sort-Object -Unique

Write-Output "Found $filesCount tracked files under node_modules in $($dirs.Count) directories."
Write-Output "Directories:"
$dirs | ForEach-Object { Write-Output " - $_" }

# Try removing each directory from index and show result
foreach ($d in $dirs) {
  Write-Output "\n=== Removing from index: '$d' ==="
  git rm -r --cached --ignore-unmatch -- "$d"
  Write-Output "git exit code: $LASTEXITCODE"
}

Write-Output "\nPost-removal remaining tracked files count:"
git ls-files -- '*/node_modules/*' | Measure-Object
Write-Output "Sample of remaining tracked files (first 50):"
git ls-files -- '*/node_modules/*' | Select-Object -First 50 | ForEach-Object { Write-Output " - $_" }

Write-Output 'DEBUG script done.'
