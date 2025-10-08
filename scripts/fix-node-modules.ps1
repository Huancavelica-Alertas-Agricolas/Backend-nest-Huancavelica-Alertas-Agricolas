# Script to ensure node_modules are ignored and removed from git index
# Run from repository root

Write-Output "Running fix-node-modules.ps1 in " (Get-Location).Path

# 1) Ensure .gitignore entries
$ig = Join-Path (Get-Location) '.gitignore'
if (-not (Test-Path $ig)) {
  New-Item -Path $ig -ItemType File -Force | Out-Null
  Write-Output ".gitignore created"
}
$entries = @('node_modules/','**/node_modules/','dist/','build/','.env','coverage/')
foreach ($e in $entries) {
  if (-not (Select-String -Path $ig -Pattern ([regex]::Escape($e)) -SimpleMatch -Quiet)) {
    Add-Content -Path $ig -Value $e
    Write-Output "Added to .gitignore: $e"
  }
}

# 2) Commit .gitignore if needed
git add .gitignore
try {
  git commit -m "Add node_modules and build outputs to .gitignore" | Out-Null
  Write-Output "Committed .gitignore"
} catch {
  Write-Output "No .gitignore changes to commit"
}

# 3) Remove any tracked node_modules from index (does not delete local files)
Write-Output "Searching for node_modules directories to remove from index..."
Get-ChildItem -Path . -Recurse -Directory -Filter "node_modules" -ErrorAction SilentlyContinue |
  ForEach-Object {
    $full = $_.FullName
    Write-Output "Attempting git rm --cached --ignore-unmatch '$full'"
    git rm -r --cached --ignore-unmatch -- "$full" 2>$null
}

# 4) Commit removals if any
git add .
try {
  git commit -m "Remove node_modules from index (now ignored)" | Out-Null
  Write-Output "Committed removal of node_modules from index"
} catch {
  Write-Output "No node_modules removals to commit"
}

# 5) Unstage any node_modules that may have been staged by accident
$staged = git diff --name-only --cached | Where-Object { $_ -match 'node_modules' }
if ($staged) {
  Write-Output "Unstaging staged node_modules files..."
  foreach ($f in $staged) {
    Write-Output "Restoring staged: $f"
    try { git restore --staged -- "$f" } catch { git reset HEAD -- "$f" }
  }
} else {
  Write-Output "No node_modules staged"
}

# 6) Show any tracked node_modules left
$tracked = git ls-files | Where-Object { $_ -match 'node_modules' }
if ($tracked) {
  Write-Output "Tracked node_modules still in repo:";
  $tracked | ForEach-Object { Write-Output " - $_" }
} else {
  Write-Output "No node_modules tracked in repo"
}

# 7) Normalize line endings to avoid LF->CRLF warnings
Write-Output "Configuring core.autocrlf true and renormalizing line endings..."
git config core.autocrlf true
git add --renormalize .
try {
  git commit -m "Normalize line endings" | Out-Null
  Write-Output "Committed line-ending normalization"
} catch {
  Write-Output "No changes from renormalization"
}

# 8) Final git add . and report
git add .
Write-Output "Final staged node_modules (should be none):"
git diff --name-only --cached | Where-Object { $_ -match 'node_modules' } | ForEach-Object { Write-Output " - $_" }
Write-Output "Final tracked node_modules (should be none):"
git ls-files | Where-Object { $_ -match 'node_modules' } | ForEach-Object { Write-Output " - $_" }
Write-Output "Ignored node_modules (git status --ignored):"
git status --ignored --short | Select-String "node_modules" -SimpleMatch | ForEach-Object { Write-Output "IGNORED: $($_.Line)" }

Write-Output "Done"
