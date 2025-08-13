# Git Configuration Script for Windows
# Applies all performance optimizations to prevent hanging issues

Write-Host "🔧 Git Configuration Script" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan

# Check if Git is installed
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git is not installed. Please install Git first." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Git found: $(git --version)" -ForegroundColor Green

# Git configuration settings
$gitConfigs = @{
    "pull.rebase" = "false"
    "fetch.prune" = "true"
    "rebase.autoStash" = "true"
    "gc.auto" = "50"
    "core.autocrlf" = "input"
    "init.defaultBranch" = "main"
    "fetch.parallel" = "0"
    "maintenance.auto" = "true"
    "core.longpaths" = "true"
    "credential.helper" = "manager-core"
}

Write-Host "`n⚙️  Applying Git configurations..." -ForegroundColor Yellow

foreach ($key in $gitConfigs.Keys) {
    $value = $gitConfigs[$key]
    Write-Host "  • Setting $key = $value..." -NoNewline
    try {
        git config --global $key $value
        Write-Host " ✅ Done" -ForegroundColor Green
    } catch {
        Write-Host " ❌ Failed" -ForegroundColor Red
    }
}

# Enable file system monitor if available
Write-Host "  • Enabling file system monitor..." -NoNewline
try {
    git config --global core.fsmonitor true
    Write-Host " ✅ Done" -ForegroundColor Green
} catch {
    Write-Host " ⚠️  Not available" -ForegroundColor Yellow
}

# Install and enable Git LFS if present
Write-Host "  • Setting up Git LFS..." -NoNewline
try {
    git lfs install
    Write-Host " ✅ Done" -ForegroundColor Green
} catch {
    Write-Host " ⚠️  Git LFS not available" -ForegroundColor Yellow
}

# Start Git maintenance
Write-Host "  • Starting Git maintenance..." -NoNewline
try {
    git maintenance start
    Write-Host " ✅ Done" -ForegroundColor Green
} catch {
    Write-Host " ⚠️  Maintenance already running" -ForegroundColor Yellow
}

Write-Host "`n📊 Current Git Configuration:" -ForegroundColor Cyan
Write-Host "  • Pull Strategy: $(git config --global pull.rebase)" -ForegroundColor White
Write-Host "  • Fetch Prune: $(git config --global fetch.prune)" -ForegroundColor White
Write-Host "  • Credential Helper: $(git config --global credential.helper)" -ForegroundColor White
Write-Host "  • Long Paths: $(git config --global core.longpaths)" -ForegroundColor White

Write-Host "`n🎉 Git configuration complete!" -ForegroundColor Green
Write-Host "Your Git setup is now optimized for better performance and fewer hanging issues." -ForegroundColor Yellow
