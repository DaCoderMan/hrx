# Cursor/VS Code Bootstrap Scripts

This directory contains scripts to optimize your development environment and prevent Cursor/VS Code from hanging.

## 🚀 Quick Start

Run the master bootstrap script to set up everything:

```powershell
.\bootstrap\run-bootstrap.ps1
```

## 📁 Scripts Overview

### `run-bootstrap.ps1` - Master Script
- Runs all optimization scripts in sequence
- Configures Git, installs extensions, and verifies setup
- **Run this first!**

### `install-extensions.ps1` - Extension Installer
Installs essential extensions:
- **GitLens** - Git supercharged
- **Git Graph** - Git visualization
- **Prettier** - Code formatting
- **ESLint** - JavaScript linting
- **Material Icon Theme** - File icons
- **Error Lens** - Error highlighting
- **Path Intellisense** - Path autocomplete
- And more...

### `configure-git.ps1` - Git Optimization
Applies Git performance settings:
- Disables parallel fetching
- Enables automatic pruning
- Sets up credential manager
- Configures long paths support
- Starts Git maintenance

### `git-fast-fix.ps1` - Git Maintenance
Quick fixes for Git performance:
- Aggressive garbage collection
- Incremental repack
- Fetch and prune
- Shows current status

### `git-nuke-hooks.ps1` - Hook Bypass
⚠️ **Use with caution!** Bypasses Git hooks that cause hanging:
- Commits with `--no-verify`
- Pushes with `--no-verify`
- Skips pre-commit and pre-push hooks

### `cred-reset.ps1` - Credential Reset
Resets Git credentials when authentication fails:
- Clears cached credentials
- Removes Windows credential manager entries
- Guides re-authentication

## 🔧 Manual Steps

### Cursor Settings
1. Open Cursor Settings (`Ctrl+,`)
2. Search for "Auto-apply AI edits"
3. Enable the setting if available
4. Look for "AI > Auto-apply changes" in settings

### Git Authentication
If you encounter authentication issues:
1. Run `.\bootstrap\cred-reset.ps1`
2. Try a Git operation (push/pull)
3. Enter your credentials when prompted
4. For GitHub: Use Personal Access Token instead of password

## 🚨 Troubleshooting

### Cursor Still Hangs?
1. **Large repositories**: Add `.gitignore` for build folders
2. **Hook issues**: Test with `--no-verify` to confirm
3. **Auth loops**: Re-login in Cursor's Accounts panel
4. **LFS issues**: Check with `git lfs ls-files`

### Git Performance Issues?
1. Run `.\bootstrap\git-fast-fix.ps1`
2. Check for large files: `git rev-list --objects --all | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | sort -k3nr | head -10`
3. Consider `git sparse-checkout` for large repos

### Extension Issues?
1. Restart Cursor/VS Code
2. Check extension compatibility
3. Disable conflicting extensions
4. Update Cursor/VS Code to latest version

## 📋 Verification Checklist

After running bootstrap:
- [ ] Git operations work without hanging
- [ ] Extensions are installed and working
- [ ] Auto-save is enabled
- [ ] Format on save is working
- [ ] Git status returns quickly
- [ ] No authentication prompts during normal operations

## 🔄 Re-running Bootstrap

The scripts are **idempotent** - safe to run multiple times:
- Extensions are only installed if missing
- Git settings are updated if different
- Existing configurations are preserved

## 📞 Support

If you continue to experience issues:
1. Check the troubleshooting section above
2. Verify your Git and Cursor versions are up to date
3. Consider running individual scripts to isolate issues
4. Check Cursor's official documentation for known issues
