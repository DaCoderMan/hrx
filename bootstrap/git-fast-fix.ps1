# Git Fast Fix Script for Windows
# Quickly resolves common Git performance issues

Write-Host "🔧 Git Fast Fix Script" -ForegroundColor Cyan
Write-Host "=====================" -ForegroundColor Cyan

# Check if Git is installed
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git is not installed. Please install Git first." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Git found: $(git --version)" -ForegroundColor Green

# Run Git maintenance tasks
Write-Host "`n🧹 Running Git maintenance..." -ForegroundColor Yellow

Write-Host "  • Aggressive garbage collection..." -NoNewline
try {
    git gc --aggressive
    Write-Host " ✅ Done" -ForegroundColor Green
} catch {
    Write-Host " ❌ Failed" -ForegroundColor Red
}

Write-Host "  • Incremental repack..." -NoNewline
try {
    git maintenance run --task=incremental-repack
    Write-Host " ✅ Done" -ForegroundColor Green
} catch {
    Write-Host " ❌ Failed" -ForegroundColor Red
}

Write-Host "  • Fetching and pruning..." -NoNewline
try {
    git fetch --all --prune
    Write-Host " ✅ Done" -ForegroundColor Green
} catch {
    Write-Host " ❌ Failed" -ForegroundColor Red
}

# Show current status
Write-Host "`n📊 Current Git Status:" -ForegroundColor Cyan
git status

Write-Host "`n🎉 Git maintenance complete!" -ForegroundColor Green
Write-Host "Your repository should now be optimized for better performance." -ForegroundColor Yellow
