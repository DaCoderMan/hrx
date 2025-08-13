# Git Credential Reset Script for Windows
# Clears cached credentials and guides re-authentication

Write-Host "🔐 Git Credential Reset Script" -ForegroundColor Cyan
Write-Host "=============================" -ForegroundColor Cyan

Write-Host "`nThis script will help you reset Git credentials when authentication issues occur." -ForegroundColor Yellow

# Check current credential helper
Write-Host "`n📊 Current Git Configuration:" -ForegroundColor Cyan
$credHelper = git config --global credential.helper
Write-Host "  • Credential Helper: $credHelper" -ForegroundColor White

# Show stored credentials (Windows)
Write-Host "`n🔍 Checking stored credentials..." -ForegroundColor Cyan
try {
    $storedCreds = cmdkey /list | findstr git
    if ($storedCreds) {
        Write-Host "  • Found stored credentials:" -ForegroundColor Yellow
        $storedCreds | ForEach-Object { Write-Host "    $_" -ForegroundColor White }
    } else {
        Write-Host "  • No stored credentials found" -ForegroundColor Green
    }
} catch {
    Write-Host "  • Could not check stored credentials" -ForegroundColor Yellow
}

Write-Host "`n🧹 Clearing Git credentials..." -ForegroundColor Cyan

# Clear Git credential cache
Write-Host "  • Clearing Git credential cache..." -NoNewline
try {
    git credential-manager delete https://github.com
    git credential-manager delete https://gitlab.com
    Write-Host " ✅ Done" -ForegroundColor Green
} catch {
    Write-Host " ⚠️  Partial success" -ForegroundColor Yellow
}

# Clear Windows credential manager entries
Write-Host "  • Clearing Windows credential manager..." -NoNewline
try {
    cmdkey /delete:git:https://github.com 2>$null
    cmdkey /delete:git:https://gitlab.com 2>$null
    Write-Host " ✅ Done" -ForegroundColor Green
} catch {
    Write-Host " ⚠️  Some entries may remain" -ForegroundColor Yellow
}

Write-Host "`n🔄 Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Try a Git operation (push/pull) that requires authentication" -ForegroundColor White
Write-Host "  2. You'll be prompted to enter your credentials again" -ForegroundColor White
Write-Host "  3. For GitHub: Use a Personal Access Token instead of password" -ForegroundColor White
Write-Host "  4. For GitLab: Use your username and personal access token" -ForegroundColor White

Write-Host "`n💡 Tips:" -ForegroundColor Cyan
Write-Host "  • GitHub: Create token at https://github.com/settings/tokens" -ForegroundColor White
Write-Host "  • GitLab: Create token at https://gitlab.com/-/profile/personal_access_tokens" -ForegroundColor White
Write-Host "  • Store credentials securely using Git credential manager" -ForegroundColor White

Write-Host "`n🎉 Credential reset complete!" -ForegroundColor Green
Write-Host "Try your Git operation now - you should be prompted for new credentials." -ForegroundColor Yellow
