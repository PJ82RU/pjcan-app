Remove-Item -Path docs\* -Recurse
Move-Item -Path dist\spa\* -Destination docs
Remove-Item -Path dist -Recurse
Remove-Item docs\.gitignore -Recurse
