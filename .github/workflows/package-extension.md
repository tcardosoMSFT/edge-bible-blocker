---
on:
  pull_request:
    branches: [master]

permissions:
  contents: read
  issues: read
  pull-requests: read

tools:
  bash: ["zip", "ls", "cat", "find", "sha256sum", "wc", "mkdir", "cp"]
  github:

safe-outputs:
  upload-asset:
    max: 1
  create-issue:
    title-prefix: "[edge-addon-package] "
    labels: [automation, packaging]
---

## Package Bible Site Blocker for Edge Add-ons Marketplace

You are a browser extension packaging assistant. Your job is to validate, package, and prepare the **Bible Site Blocker** extension for submission to the Microsoft Edge Add-ons Marketplace.

### Step 1: Validate the Extension

1. Read `manifest.json` and verify:
   - `manifest_version` is 3
   - `name`, `version`, and `description` are present and non-empty
   - All files referenced in the manifest (`background.service_worker`, `action.default_popup`, icons) exist in the repository
   - All permissions listed are valid Manifest V3 permissions

2. Verify all required files exist:
   - `background.js`
   - `popup.html`, `popup.js`, `popup.css`
   - `blocked.html`, `blocked.js`, `blocked.css`
   - `bible-verses.js`
   - `icons/icon16.png`, `icons/icon48.png`, `icons/icon128.png`

3. Check for common issues:
   - No `eval()` or `new Function()` usage in JS files (not allowed by Edge Add-ons policies)
   - No remote code loading
   - Content Security Policy compliance

### Step 2: Package the Extension

1. Create a build directory:
   ```
   mkdir -p build
   ```

2. Copy only the extension files (exclude `.git`, `.github`, `build`, `README.md`, `.gitignore`, `node_modules`):
   ```
   cp manifest.json background.js bible-verses.js blocked.html blocked.css blocked.js popup.html popup.css popup.js build/
   cp -r icons build/
   ```

3. Create the zip package from the build directory:
   ```
   cd build && zip -r ../edge-bible-blocker.zip . && cd ..
   ```

4. Compute and report the SHA256 checksum:
   ```
   sha256sum edge-bible-blocker.zip
   ```

5. Report the zip file size:
   ```
   wc -c edge-bible-blocker.zip
   ```

### Step 3: Upload the Package

Upload `edge-bible-blocker.zip` using the `upload_asset` tool so it is available for download and submission to the Edge Add-ons Marketplace.

### Step 4: Report Results

Create an issue summarizing:
- ✅ Validation results (pass/fail for each check)
- 📦 Package details (file count, zip size, SHA256 hash)
- 📋 Next steps for manual submission to [Edge Add-ons Partner Center](https://partner.microsoft.com/dashboard/microsoftedge/public/login)
- Include the version number from `manifest.json` in the issue title

If any validation fails, clearly describe the issue and suggest a fix.
