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
  jobs:
    npm-publish:
      description: "Publish the extension zip as an npm package to GitHub Packages"
      runs-on: ubuntu-latest
      output: "Package published to GitHub Packages successfully!"
      permissions:
        contents: read
        packages: write
      inputs:
        version:
          description: "The extension version from manifest.json"
          required: true
          type: string
      steps:
        - name: Checkout repository
          uses: actions/checkout@v4
        - name: Setup Node.js
          uses: actions/setup-node@v4
          with:
            node-version: "20"
            registry-url: "https://npm.pkg.github.com"
        - name: Create extension zip package
          run: |
            echo "📦 Creating extension package zip..."
            zip -r edge-bible-blocker.zip \
              manifest.json \
              background.js \
              bible-verses.js \
              blocked.html \
              blocked.css \
              blocked.js \
              popup.html \
              popup.css \
              popup.js \
              icons/
            echo "✅ Extension zip contents:"
            unzip -l edge-bible-blocker.zip
            echo "📊 Package size: $(wc -c < edge-bible-blocker.zip) bytes"
            echo "🔒 SHA256: $(sha256sum edge-bible-blocker.zip | cut -d' ' -f1)"
        - name: Publish npm package to GitHub Packages
          env:
            NODE_AUTH_TOKEN: "${{ secrets.GITHUB_TOKEN }}"
          run: npm publish
        - name: Upload extension zip as artifact
          uses: actions/upload-artifact@v4
          with:
            name: edge-bible-blocker-extension
            path: edge-bible-blocker.zip
---

## Package Bible Site Blocker and Publish to GitHub Packages

You are a browser extension packaging assistant. Your job is to validate the **Bible Site Blocker** extension, package it as a zip, and publish it as an npm package to GitHub Packages.

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

### Step 2: Package the Extension as Zip

1. Create the zip package with only extension files:
   ```
   zip -r edge-bible-blocker.zip manifest.json background.js bible-verses.js blocked.html blocked.css blocked.js popup.html popup.css popup.js icons/
   ```

2. Compute and report the SHA256 checksum:
   ```
   sha256sum edge-bible-blocker.zip
   ```

3. Report the zip file size:
   ```
   wc -c edge-bible-blocker.zip
   ```

### Step 3: Upload the Zip Asset

Upload `edge-bible-blocker.zip` using the `upload_asset` tool so it is available as a downloadable asset.

### Step 4: Publish to GitHub Packages

Read the `version` field from `manifest.json`, then call the `npm-publish` safe-job tool with that version. This will publish the package as `@tcardosomsft/edge-bible-blocker` to the GitHub npm registry.

### Step 5: Report Results

Create an issue summarizing:
- ✅ Validation results (pass/fail for each check)
- 📦 Package details (file count, zip size, SHA256 hash)
- 🚀 npm publish status and package URL (`https://github.com/tcardosoMSFT/edge-bible-blocker/packages`)
- 📋 Next steps for manual submission to [Edge Add-ons Partner Center](https://partner.microsoft.com/dashboard/microsoftedge/public/login)
- Include the version number from `manifest.json` in the issue title

If any step fails, clearly describe the issue and suggest a fix.
