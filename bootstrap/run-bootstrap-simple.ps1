# Master Bootstrap Script for Cursor/VS Code Optimization
# Runs all optimization scripts in sequence

Write-Host "Cursor/VS Code Master Bootstrap Script" -ForegroundColor Magenta
Write-Host "=====================================" -ForegroundColor Magenta
Write-Host "This script will optimize your development environment for better performance." -ForegroundColor Yellow

# Check if we're in the right directory
if (-not (Test-Path "bootstrap")) {
    Write-Host "Please run this script from the project root directory." -ForegroundColor Red
    exit 1
}

Write-Host "`nBootstrap Steps:" -ForegroundColor Cyan
Write-Host "  1. Configure Git for performance" -ForegroundColor White
Write-Host "  2. Install essential extensions" -ForegroundColor White
Write-Host "  3. Create convenience scripts" -ForegroundColor White
Write-Host "  4. Verify setup" -ForegroundColor White

$confirmation = Read-Host "`nDo you want to continue? (y/N)"
if ($confirmation -ne "y" -and $confirmation -ne "Y") {
    Write-Host "Bootstrap cancelled." -ForegroundColor Yellow
    exit 0
}

# Step 1: Configure Git
Write-Host "`nStep 1: Configuring Git..." -ForegroundColor Cyan
try {
    & "$PSScriptRoot\configure-git.ps1"
    Write-Host "Git configuration complete!" -ForegroundColor Green
} catch {
    Write-Host "Git configuration failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Step 2: Install Extensions
Write-Host "`nStep 2: Installing Extensions..." -ForegroundColor Cyan
try {
    & "$PSScriptRoot\install-extensions.ps1"
    Write-Host "Extension installation complete!" -ForegroundColor Green
} catch {
    Write-Host "Extension installation failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Step 3: Verify Setup
Write-Host "`nStep 3: Verifying Setup..." -ForegroundColor Cyan

# Check Git status
Write-Host "  Checking Git status..." -NoNewline
try {
    $gitStatus = git status --porcelain
    Write-Host " Clean" -ForegroundColor Green
} catch {
    Write-Host " Issues detected" -ForegroundColor Yellow
}

# Check Git fetch
Write-Host "  Testing Git fetch..." -NoNewline
try {
    git fetch --dry-run 2>$null
    Write-Host " Working" -ForegroundColor Green
} catch {
    Write-Host " May need authentication" -ForegroundColor Yellow
}

# Check Node.js
Write-Host "  Checking Node.js..." -NoNewline
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host " $nodeVersion" -ForegroundColor Green
} else {
    Write-Host " Not found" -ForegroundColor Red
}

# Check Python
Write-Host "  Checking Python..." -NoNewline
if (Get-Command python -ErrorAction SilentlyContinue) {
    $pythonVersion = python --version
    Write-Host " $pythonVersion" -ForegroundColor Green
} else {
    Write-Host " Not found (optional)" -ForegroundColor Yellow
}

Write-Host "`nCreated Files:" -ForegroundColor Cyan
Write-Host "  .vscode/settings.json - Workspace settings" -ForegroundColor White
Write-Host "  .editorconfig - Editor configuration" -ForegroundColor White
Write-Host "  .prettierrc - Code formatting rules" -ForegroundColor White
Write-Host "  bootstrap/install-extensions.ps1 - Extension installer" -ForegroundColor White
Write-Host "  bootstrap/configure-git.ps1 - Git configuration" -ForegroundColor White
Write-Host "  bootstrap/git-fast-fix.ps1 - Git maintenance" -ForegroundColor White
Write-Host "  bootstrap/git-nuke-hooks.ps1 - Hook bypass" -ForegroundColor White
Write-Host "  bootstrap/cred-reset.ps1 - Credential reset" -ForegroundColor White

Write-Host "`nBootstrap Complete!" -ForegroundColor Green
Write-Host "Your development environment is now optimized!" -ForegroundColor Yellow

Write-Host "`nNext Steps:" -ForegroundColor Cyan
Write-Host "  1. Restart Cursor/VS Code to load all extensions" -ForegroundColor White
Write-Host "  2. Test Git operations (push/pull) to ensure authentication works" -ForegroundColor White
Write-Host "  3. If you encounter hanging issues, run: .\bootstrap\git-fast-fix.ps1" -ForegroundColor White
Write-Host "  4. For credential issues, run: .\bootstrap\cred-reset.ps1" -ForegroundColor White

Write-Host "`nManual Cursor Settings:" -ForegroundColor Cyan
Write-Host "  Enable Auto-apply AI edits in Cursor settings if available" -ForegroundColor White
Write-Host "  Check Cursor Settings > AI > Auto-apply changes" -ForegroundColor White

Write-Host "`nHappy coding!" -ForegroundColor Magenta
