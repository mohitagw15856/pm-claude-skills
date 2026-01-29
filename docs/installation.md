# Installation Guide

Complete guide to installing and using PM Claude Skills.

## Prerequisites

### Required
- **Claude Account**: Pro, Team, or Enterprise plan
- **Code Execution**: Must be enabled (see below)
- **Access**: claude.ai, Claude Code, or API access

### Check Your Account Type
1. Go to [claude.ai](https://claude.ai)
2. Click your profile in bottom-left
3. See "Claude Pro" / "Claude Team" / "Claude Enterprise"

If you have Free plan: Skills are not available. [Upgrade here](https://claude.ai/upgrade)

## Step 1: Enable Code Execution

Skills require Code Execution to be enabled.

1. Go to claude.ai
2. Click profile icon (bottom-left)
3. Click **Settings**
4. Click **Features**
5. Toggle on **"Code Execution and File Creation"**
6. Click **Save**

![Enable Code Execution](../assets/enable-code-execution.png)

## Step 2: Download Skills

### Option A: Download Individual Skills (Recommended)

1. Navigate to the skill you want (e.g., [`skills/prd-template`](../skills/prd-template))
2. Click the skill folder
3. Download the `SKILL.md` file
4. If there are other files in the folder, download those too

### Option B: Clone the Entire Repository

```bash
git clone https://github.com/mohitagw15856/pm-claude-skills.git
cd pm-claude-skills
```

### Option C: Download Pre-packaged Skills (When Available)

Check the [Releases](https://github.com/mohitagw15856/pm-claude-skills/releases) page for `.skill` files ready to upload.

## Step 3: Package the Skill

Skills must be packaged as `.skill` files (which are just renamed .zip files).

### On Mac/Linux:

```bash
# Navigate to the skill folder
cd pm-claude-skills/skills/prd-template

# Create a zip of the folder contents
zip -r prd-template.skill .

# Move it somewhere convenient
mv prd-template.skill ~/Downloads/
```

### On Windows:

1. Navigate to the skill folder (e.g., `skills/prd-template`)
2. Select all files inside the folder
3. Right-click → "Send to" → "Compressed (zipped) folder"
4. Rename from `.zip` to `.skill`

### Important Notes:
- ⚠️ The `.skill` file should contain the files directly, NOT a parent folder
- ✅ Correct: `prd-template.skill` contains `SKILL.md` at root
- ❌ Wrong: `prd-template.skill` contains `prd-template/SKILL.md`

## Step 4: Upload to Claude

1. Go to [claude.ai](https://claude.ai)
2. Click your profile icon (bottom-left)
3. Click **Settings**
4. Click **Skills** in the left sidebar
5. Click **Upload Skill** button
6. Select your `.skill` file
7. Wait for "Skill uploaded successfully"

![Upload Skill](../assets/upload-skill.png)

That's it! The Skill is now available.

## Step 5: Test the Skill

Start a new conversation and test:

**For PRD Template:**
> "Help me write a PRD for a mobile app onboarding feature"

**For Meeting Notes:**
> "Create meeting notes from this discussion: [paste transcript]"

**For Stakeholder Update:**
> "Create a stakeholder update for our Q1 progress"

Claude should automatically recognize when to use the Skill and apply it.

## Verification

To verify a Skill is installed:

1. Go to Settings → Skills
2. You should see your uploaded Skills listed
3. Each Skill shows:
   - Name
   - Description
   - Date uploaded

## Managing Skills

### View Installed Skills
Settings → Skills → See all installed Skills

### Remove a Skill
Settings → Skills → Click skill → Click "Remove"

### Update a Skill
1. Remove the old version
2. Upload the new version

### Disable a Skill Temporarily
Currently not possible - you must remove and re-upload

## Troubleshooting

### "Code Execution must be enabled"
- Go to Settings → Features → Enable "Code Execution and File Creation"

### "Invalid skill file"
- Make sure you're uploading a `.skill` file (renamed .zip)
- Ensure SKILL.md has proper frontmatter (see [Creating Skills](creating-skills.md))
- Check that files are at root level, not in a subfolder

### "Skill uploaded but not working"
- Try starting a new conversation
- Make sure your request matches the Skill's description triggers
- Check that the Skill's frontmatter `description` field is clear

### Skill triggers at wrong times
- The `description` field controls when Skills trigger
- Edit SKILL.md to make triggers more specific
- Re-package and re-upload

### Cannot find uploaded Skill
- Check Settings → Skills
- Try refreshing the page
- Try logging out and back in

## For Team/Enterprise Plans

### Sharing Skills with Your Team

Team/Enterprise admins can provision Skills organization-wide:

1. Go to Admin Console
2. Navigate to Skills management
3. Upload Skills to organization library
4. All team members will have access

### Private vs. Shared Skills

- **Private Skills**: Only visible to you
- **Shared Skills**: Visible to entire organization
- Team admins can make Skills shared

## Next Steps

- [Customize Skills](customization.md) to match your workflow
- [Create your own Skills](creating-skills.md)
- [Troubleshooting Guide](troubleshooting.md)

## Video Tutorial

[Coming Soon] Watch a 5-minute video walkthrough of the installation process.

## Need Help?

- 🐛 [Report an issue](https://github.com/mohitagw15856/pm-claude-skills/issues)
- 💬 [Ask in Discussions](https://github.com/mohitagw15856/pm-claude-skills/discussions)
- ✉️ Email: mohit15856@gmail.com
