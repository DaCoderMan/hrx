# Git Nuke Hooks Script for Windows
# Temporarily bypasses Git hooks that may cause hanging issues

Write-Host "⚠️  Git Nuke Hooks Script" -ForegroundColor Red
Write-Host "=======================" -ForegroundColor Red

Write-Host "`n🚨 WARNING: This script bypasses Git hooks!" -ForegroundColor Red
Write-Host "   • Pre-commit hooks will be skipped" -ForegroundColor Yellow
Write-Host "   • Pre-push hooks will be skipped" -ForegroundColor Yellow
Write-Host "   • This may bypass important checks (linting, tests, etc.)" -ForegroundColor Yellow
Write-Host "   • Use only when hooks are causing hanging issues" -ForegroundColor Yellow

$confirmation = Read-Host "`nDo you want to continue? (y/N)"
if ($confirmation -ne "y" -and $confirmation -ne "Y") {
  Write-Host "❌ Operation cancelled." -ForegroundColor Yellow
  exit 0
}

Write-Host "`n🔧 Bypassing Git hooks..." -ForegroundColor Cyan

# Function to commit with --no-verify
function Commit-WithoutHooks {
  param([string]$Message)
  Write-Host "  • Committing with --no-verify..." -NoNewline
  try {
    git commit -m $Message --no-verify
    Write-Host " ✅ Done" -ForegroundColor Green
  }
  catch {
    Write-Host " ❌ Failed" -ForegroundColor Red
  }
}

# Function to push with --no-verify
function Push-WithoutHooks {
  Write-Host "  • Pushing with --no-verify..." -NoNewline
  try {
    git push --no-verify
    Write-Host " ✅ Done" -ForegroundColor Green
  }
  catch {
    Write-Host " ❌ Failed" -ForegroundColor Red
  }
}

# Check if there are staged changes
$staged = git diff --cached --name-only
if ($staged) {
  Write-Host "`n📝 Found staged changes:" -ForegroundColor Cyan
  $staged | ForEach-Object { Write-Host "  • $_" -ForegroundColor White }

  $commitMsg = Read-Host "`nEnter commit message (or press Enter for default)"
  if (-not $commitMsg) {
    $commitMsg = "Bypass hooks: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
  }

  Commit-WithoutHooks -Message $commitMsg
}
else {
  Write-Host "`n📝 No staged changes found." -ForegroundColor Yellow
}

# Ask if user wants to push
$pushConfirm = Read-Host "`nDo you want to push? (y/N)"
if ($pushConfirm -eq "y" -or $pushConfirm -eq "Y") {
  Push-WithoutHooks
}

Write-Host "`n🎉 Hook bypass complete!" -ForegroundColor Green
Write-Host "Remember to fix the underlying hook issues to prevent future problems." -ForegroundColor Yellow
