# Troubleshooting Guide

Common issues and solutions when using PM Claude Skills.

## Table of Contents
- [Installation Issues](#installation-issues)
- [Skill Not Triggering](#skill-not-triggering)
- [Skill Triggering at Wrong Times](#skill-triggering-at-wrong-times)
- [Output Quality Issues](#output-quality-issues)
- [Performance Issues](#performance-issues)
- [Team/Enterprise Issues](#teamenterprise-issues)

## Installation Issues

### "Code Execution must be enabled"

**Problem**: You get an error about Code Execution when trying to use Skills.

**Solution**:
1. Go to claude.ai
2. Click profile icon → Settings
3. Click "Features"
4. Toggle ON "Code Execution and File Creation"
5. Click Save
6. Refresh the page

### "Invalid skill file"

**Problem**: Upload fails with "Invalid skill file" error.

**Possible Causes & Solutions**:

1. **File extension is wrong**
   - Must be `.skill` not `.zip`
   - Rename: `prd-template.zip` → `prd-template.skill`

2. **Folder structure is wrong**
   - ❌ Wrong: `skill.skill` contains `folder/SKILL.md`
   - ✅ Correct: `skill.skill` contains `SKILL.md` at root
   - Repackage with files at root level

3. **SKILL.md frontmatter is malformed**
   ```markdown
   ---
   name: skill-name
   description: Clear description
   ---
   ```
   - Must have both `name` and `description`
   - Must be valid YAML
   - Must have `---` before and after

4. **File is corrupted**
   - Try redownloading
   - Try different compression tool
   - Check file size (shouldn't be 0 bytes)

### Cannot find upload button

**Problem**: Can't find where to upload Skills.

**Solution**:
1. Make sure you have Pro/Team/Enterprise (not Free)
2. Go to Settings (profile icon → Settings)
3. Look for "Skills" in left sidebar
4. If you don't see it, try:
   - Refreshing the page
   - Logging out and back in
   - Contacting Anthropic support

### Skill uploaded but not visible

**Problem**: Upload succeeds but Skill doesn't appear in list.

**Solution**:
1. Refresh the page (Cmd+R or Ctrl+R)
2. Log out and log back in
3. Check Settings → Skills again
4. Try a different browser
5. Clear browser cache

## Skill Not Triggering

### Skill doesn't activate when expected

**Problem**: You ask for something that should trigger the Skill, but Claude doesn't use it.

**Diagnosis**:
1. Check the Skill's `description` field in frontmatter
2. Compare your request to the description
3. Claude only triggers Skills when request matches description

**Solutions**:

1. **Be more explicit in your request**
   - Instead of: "Help me write a doc"
   - Try: "Help me write a PRD for feature X"

2. **Update the Skill description**
   - Edit SKILL.md frontmatter
   - Make `description` more comprehensive
   - Include all trigger scenarios
   
   Example:
   ```markdown
   ---
   description: Use when user asks to create, write, draft, format, or help with a PRD, product requirements document, product spec, feature specification, feature doc, or product documentation for a new feature or product.
   ---
   ```

3. **Start a new conversation**
   - Skills are loaded at conversation start
   - Start fresh conversation after uploading Skill

4. **Mention the Skill type explicitly**
   - "Using the PRD template, help me write..."
   - "Create a stakeholder update following the standard format"

### Claude says it doesn't have access to Skills

**Problem**: Claude responds "I don't have access to that Skill" or similar.

**Solutions**:
1. Verify Skill is uploaded (Settings → Skills)
2. Start a new conversation
3. Check Code Execution is enabled
4. Re-upload the Skill
5. Try different phrasing in your request

## Skill Triggering at Wrong Times

### Skill activates when it shouldn't

**Problem**: Skill triggers for requests where it's not appropriate.

**Solution**:
1. Make the `description` more specific
2. Add negative conditions
   
   Example:
   ```markdown
   ---
   description: Create meeting notes ONLY when user provides meeting transcript, discussion summary, or asks to document a meeting. Do NOT use for general note-taking or todo lists.
   ---
   ```

3. If problem persists, consider splitting into multiple more specific Skills

### Multiple Skills trigger simultaneously

**Problem**: Multiple Skills activate and create conflicts.

**This is expected behavior** - Claude can use multiple Skills together.

**If it's causing issues**:
1. Make Skill descriptions more mutually exclusive
2. Remove redundant Skills
3. Combine overlapping Skills into one

## Output Quality Issues

### Outputs are too generic

**Problem**: Skill produces generic content that doesn't match your needs.

**Solutions**:

1. **Add more specific examples to SKILL.md**
   ```markdown
   ## Example Output
   
   [Paste your actual anonymized example]
   
   Key elements:
   - Specific tone we use
   - Level of detail expected
   - Format preferences
   ```

2. **Add company-specific context**
   ```markdown
   ## Our Standards
   
   - Always include 3-5 metrics
   - Use data from last 30 days
   - Reference specific tools (Jira, Mixpanel)
   ```

3. **Provide more context in your request**
   - Include relevant background
   - Mention specific requirements
   - Reference past examples

### Outputs are too long/short

**Problem**: Generated content doesn't match your preferred length.

**Solutions**:

1. **Add length guidelines to SKILL.md**
   ```markdown
   ## Length Guidelines
   
   - PRD: 3-6 pages for features, 8-12 for products
   - Stakeholder updates: 1 page maximum
   - Meeting notes: 1-2 pages typical
   ```

2. **Specify in your request**
   - "Create a brief stakeholder update (under 1 page)"
   - "Write a detailed PRD (5-6 pages)"

### Skill missing key information

**Problem**: Outputs don't include sections you need.

**Solution**: Update SKILL.md to be more explicit:

```markdown
## Required Sections

EVERY output MUST include:
1. [Section name]
2. [Section name]
3. [Section name]

Optional sections (include when relevant):
- [Section name]
- [Section name]
```

### Format is wrong

**Problem**: Skill uses wrong formatting, structure, or style.

**Solutions**:

1. **Add explicit formatting rules**
   ```markdown
   ## Formatting Rules
   
   - Use markdown tables for comparisons
   - Use bullet points for lists
   - Use numbered lists for sequential steps
   - Bold key terms and metrics
   ```

2. **Include template in SKILL.md**
   ```markdown
   ## Exact Template
   
   Use this structure exactly:
   
   # [Title]
   
   ## Section 1
   [Content guidelines]
   
   ## Section 2
   [Content guidelines]
   ```

## Performance Issues

### Skills make Claude slower

**Problem**: Responses take longer when Skills are active.

**This is normal** - Skills add context that Claude processes.

**Mitigation**:
1. Only upload Skills you actively use
2. Remove unused Skills
3. Keep SKILL.md files concise
4. Use Progressive Disclosure (reference files instead of putting everything in SKILL.md)

### Skill uses wrong/outdated information

**Problem**: Skill references old information or outdated examples.

**Solution**:
1. Update SKILL.md with current information
2. Remove outdated examples
3. Re-package and re-upload
4. Document update in changelog

## Team/Enterprise Issues

### Teammates can't see my Skill

**Problem**: You uploaded a Skill but teammates don't have it.

**Explanation**: Skills are user-specific by default.

**Solutions**:

For Team/Enterprise plans:
1. Have admin access Admin Console
2. Navigate to Skills management
3. Upload to organization library
4. Skill becomes available to all team members

For Pro plans:
- Skills are private only
- Share the .skill file with teammates
- They must upload individually

### Organization Skill conflicts with my custom version

**Problem**: Organization uploaded a Skill but you have customizations.

**Current Limitation**: No easy override mechanism.

**Workarounds**:
1. Request admin update organization Skill with your changes
2. Remove your custom version and use organization version
3. Give your custom version a different name to avoid conflicts

### Different team members get different outputs

**Problem**: Same Skill produces different results for different people.

**Possible Causes**:

1. **Different Skill versions**
   - Solution: Standardize on organization Skill

2. **Different custom instructions**
   - Solution: Check Settings → Custom Instructions

3. **Different prompting**
   - Solution: Document standard prompts to use

4. **Skills updated at different times**
   - Solution: Admin pushes updates to all simultaneously

## Still Having Issues?

### Before Asking for Help

1. **Try the basics**:
   - Log out and back in
   - Try different browser
   - Clear cache
   - Disable browser extensions
   - Try incognito mode

2. **Gather information**:
   - Which Skill is having issues?
   - What exactly are you trying to do?
   - What happens vs. what should happen?
   - Your Claude plan (Pro/Team/Enterprise)
   - Screenshots if applicable

3. **Check existing issues**:
   - [GitHub Issues](https://github.com/yourusername/pm-claude-skills/issues)
   - [Discussions](https://github.com/yourusername/pm-claude-skills/discussions)

### Getting Help

1. **For Skill-specific issues**:
   - [Open a GitHub Issue](https://github.com/yourusername/pm-claude-skills/issues/new)
   - Include Skill name, what you expected, what happened

2. **For Claude platform issues**:
   - Contact Anthropic support: support@anthropic.com
   - Check [Anthropic documentation](https://docs.anthropic.com)

3. **For general questions**:
   - [Start a Discussion](https://github.com/yourusername/pm-claude-skills/discussions)
   - Email: your-email@example.com

### Reporting a Bug

Use this template when reporting issues:

```markdown
**Skill Name**: [which skill]
**Claude Plan**: [Pro/Team/Enterprise]
**Browser**: [Chrome/Firefox/Safari]

**Expected Behavior**:
[What should happen]

**Actual Behavior**:
[What actually happens]

**Steps to Reproduce**:
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Screenshots** (if applicable):
[Attach images]

**Additional Context**:
[Any other relevant information]
```

## Common Error Messages

### "Skill execution failed"
- Restart conversation
- Check Skill isn't corrupted
- Try re-uploading Skill

### "Unable to load Skill"
- Check Code Execution is enabled
- Verify Skill is in your Skills list
- Try uploading again

### "Invalid YAML frontmatter"
- Check frontmatter syntax in SKILL.md
- Ensure `---` markers are present
- Verify `name` and `description` fields exist

## Next Steps

- [Back to Installation](installation.md)
- [Customization Guide](customization.md)
- [Creating Your Own Skills](creating-skills.md)
