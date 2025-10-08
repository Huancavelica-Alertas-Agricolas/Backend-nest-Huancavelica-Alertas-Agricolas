Write-Output "Remove tracked node_modules files - starting in $(Get-Location)"

$trackedFile = Join-Path (Get-Location) 'tracked_node_modules.txt'
if (-not (Test-Path $trackedFile)) {
  Write-Output "tracked_node_modules.txt not found. Generating from git..."
  git ls-files -- '*/node_modules/*' 2>$null > $trackedFile
}

$files = Get-Content $trackedFile | Where-Object { $_ -ne '' }
if (-not $files -or $files.Count -eq 0) {
  Write-Output "No tracked node_modules files found."
  exit 0
}

Write-Output "Found $($files.Count) tracked files to remove. Removing in batches..."

$batchSize = 1000
$i = 0
foreach ($f in $files) {
  $i++
  # Use the exact path as recorded
  git rm --cached --ignore-unmatch -- "$f" 2>$null
  if (($i % $batchSize) -eq 0) { Write-Output "Processed $i files..." }
}

Write-Output "Staging and committing removals (if any)"
git add .
git commit -m "Remove tracked node_modules files (explicit removal)" 2>$null
if ($LASTEXITCODE -ne 0) { Write-Output "No changes to commit" }

$remain = git ls-files -- '*/node_modules/*' 2>$null
if (-not $remain) { Write-Output "Success: no tracked files left under node_modules" } else { Write-Output "Still tracked files: $($remain.Count)"; $remain | Select-Object -First 50 | ForEach-Object { Write-Output " - $_" } }

Write-Output "Done"
