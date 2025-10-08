$i=1
Get-Content -LiteralPath '.\.gitignore' | ForEach-Object { "{0}: {1}" -f $i, $_; $i++ }