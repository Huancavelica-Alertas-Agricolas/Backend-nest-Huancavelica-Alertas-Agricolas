Write-Output "Cleanup tracked node_modules - starting in $(Get-Location)"

# Dump tracked files under node_modules to a temp file
git ls-files -- "*/node_modules/*" 2>$null > tracked_node_modules.txt
$files = Get-Content tracked_node_modules.txt | Where-Object { $_ -ne '' }
if (-not $files -or $files.Count -eq 0) {
  Write-Output "No tracked node_modules files found."
  exit 0
}

Write-Output "Found $($files.Count) tracked files under node_modules. Calculating unique node_modules directories..."

$dirs = @{}
foreach ($f in $files) {
  $s = $f -replace "\\", "/"   # normalize separators
  $idx = $s.IndexOf('node_modules')
  if ($idx -ge 0) {
    $dir = $s.Substring(0, $idx + 'node_modules'.Length)
    $dirs[$dir] = $true
  }
}

$unique = $dirs.Keys | Sort-Object
Write-Output "Will remove $($unique.Count) unique node_modules directories from index:"
$unique | ForEach-Object { Write-Output " - $_" }

foreach ($d in $unique) {
  # Ensure path is relative and uses forward slashes for git
  $rel = $d.TrimStart('./','\\') -replace "\\", "/"
  Write-Output "git rm -r --cached --ignore-unmatch -- '$rel'"
  git rm -r --cached --ignore-unmatch -- "$rel" 2>$null
}

Write-Output "Staging and committing removals (if any)"
git add .
git commit -m "Remove tracked node_modules from index (cleanup script)" 2>$null
if ($LASTEXITCODE -ne 0) { Write-Output "No changes to commit" }

$remain = git ls-files -- "*/node_modules/*" 2>$null
if (-not $remain) { Write-Output "Success: no tracked files left under node_modules" } else { Write-Output "Still tracked files: $($remain.Count)"; $remain | Select-Object -First 50 | ForEach-Object { Write-Output " - $_" } }

Remove-Item tracked_node_modules.txt -ErrorAction SilentlyContinue

Write-Output "Done"
