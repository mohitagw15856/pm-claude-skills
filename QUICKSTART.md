# Quick Start Guide

Get your first PM Skill working in 5 minutes.

## Before You Begin

✅ **Requirements**:
- Claude Pro, Team, or Enterprise account ([Upgrade](https://claude.ai/upgrade))
- 5 minutes of time

## Step 1: Enable Code Execution (1 minute)

1. Go to [claude.ai](https://claude.ai)
2. Click profile icon (bottom-left) → **Settings**
3. Click **Features**
4. Toggle ON **"Code Execution and File Creation"**
5. Click **Save**

## Step 2: Download a Skill (1 minute)

**Option A: Use Pre-Packaged (Easiest)**
1. Go to [Releases](https://github.com/yourusername/pm-claude-skills/releases)
2. Download `prd-template.skill`
3. Skip to Step 3

**Option B: Package Yourself**
1. Download [`skills/prd-template`](skills/prd-template) folder
2. Zip the contents (not the folder itself)
3. Rename from `.zip` to `.skill`

## Step 3: Upload to Claude (1 minute)

1. In claude.ai, click profile icon → **Settings**
2. Click **Skills** in sidebar
3. Click **Upload Skill**
4. Select your `.skill` file
5. Wait for "Skill uploaded successfully"

## Step 4: Test It (2 minutes)

Start a new conversation and try:

```
Help me write a PRD for a mobile app feature 
that lets users save articles for later reading
```

Claude should automatically use the PRD Template Skill and create a structured PRD.

## What to Try Next

### Test Other Skills:
- **Meeting Notes**: "Create meeting notes from this discussion: [paste]"
- **Stakeholder Update**: "Create a weekly stakeholder update"
- **User Research**: "Synthesize these user interviews: [paste]"

### Customize a Skill:
1. Download the Skill folder
2. Edit `SKILL.md` to match your company's format
3. Re-package and upload
4. See [Customization Guide](docs/customization.md)

### Create Your Own:
- See [Creating Skills Guide](docs/creating-skills.md)
- Start with a simple template
- Test and iterate

## Common Issues

**"Code Execution must be enabled"**
→ Go to Settings → Features → Enable it

**Skill doesn't trigger**
→ Be more explicit: "Write a PRD for..."

**Upload fails**
→ Check file is `.skill` not `.zip`

**Still stuck?**
→ See [Troubleshooting Guide](docs/troubleshooting.md)

## Full Documentation

- [Installation Guide](docs/installation.md) - Detailed setup
- [Customization Guide](docs/customization.md) - Adapt to your workflow
- [Troubleshooting](docs/troubleshooting.md) - Fix common issues

## Need Help?

- 💬 [Discussions](https://github.com/yourusername/pm-claude-skills/discussions)
- 🐛 [Report Bug](https://github.com/yourusername/pm-claude-skills/issues)
- 📧 Email: your-email@example.com

---

**Time Invested**: 5 minutes  
**Time You'll Save**: 8-9 hours per week

Start with one Skill. See the results. Then add more.

⭐ [Star this repo](https://github.com/yourusername/pm-claude-skills) to get updates!
