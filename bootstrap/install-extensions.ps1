# Cursor/VS Code Extension Installer for Windows
# This script installs essential extensions for optimal development experience

Write-Host "🔧 Cursor/VS Code Extension Installer" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# Check if cursor CLI exists, fallback to code
$cli = "cursor"
if (-not (Get-Command $cli -ErrorAction SilentlyContinue)) {
    $cli = "code"
    if (-not (Get-Command $cli -ErrorAction SilentlyContinue)) {
        Write-Host "❌ Neither 'cursor' nor 'code' CLI found. Please install Cursor or VS Code first." -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ Using CLI: $cli" -ForegroundColor Green

# Essential extensions for development
$extensions = @(
    "eamodio.gitlens",                    # Git supercharged
    "mhutchie.git-graph",                 # Git graph visualization
    "github.vscode-pull-request-github",  # GitHub PR integration
    "ms-vscode.vscode-typescript-next",   # TypeScript support
    "esbenp.prettier-vscode",             # Code formatting
    "dbaeumer.vscode-eslint",             # JavaScript linting
    "ms-python.python",                   # Python support
    "ms-python.vscode-pylance",           # Python language server
    "ms-azuretools.vscode-docker",        # Docker support
    "EditorConfig.EditorConfig",          # Editor config
    "redhat.vscode-yaml",                 # YAML support
    "bierner.markdown-preview-github-styles", # GitHub-style markdown
    "usernamehw.errorlens",               # Error highlighting
    "christian-kohler.path-intellisense", # Path autocomplete
    "mikestead.dotenv",                   # .env file support
    "pkief.material-icon-theme",          # Material icons
    "ritwickdey.liveserver"               # Live server
)

$installed = 0
$skipped = 0

foreach ($extension in $extensions) {
    Write-Host "Checking $extension..." -NoNewline
    
    # Check if extension is already installed
    $result = & $cli --list-extensions | Where-Object { $_ -eq $extension }
    
    if ($result) {
        Write-Host " ✅ Already installed" -ForegroundColor Yellow
        $skipped++
    } else {
        Write-Host " 📦 Installing..." -NoNewline
        try {
            & $cli --install-extension $extension --force
            Write-Host " ✅ Installed" -ForegroundColor Green
            $installed++
        } catch {
            Write-Host " ❌ Failed" -ForegroundColor Red
        }
    }
}

Write-Host "`n📊 Summary:" -ForegroundColor Cyan
Write-Host "   Installed: $installed" -ForegroundColor Green
Write-Host "   Skipped: $skipped" -ForegroundColor Yellow
Write-Host "   Total: $($extensions.Count)" -ForegroundColor White

Write-Host "`n🎉 Extension installation complete!" -ForegroundColor Green
Write-Host "Please restart Cursor/VS Code to ensure all extensions are loaded properly." -ForegroundColor Yellow
