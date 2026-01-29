# Contributing to PM Claude Skills

Thank you for considering contributing to PM Claude Skills! This document provides guidelines for contributing.

## Ways to Contribute

### 1. Report Bugs 🐛

If you find a bug in a Skill:

1. Check if the issue already exists in [Issues](https://github.com/yourusername/pm-claude-skills/issues)
2. If not, create a new issue using the Bug Report template
3. Include:
   - Which Skill has the issue
   - What you expected to happen
   - What actually happened
   - Steps to reproduce
   - Your Claude version (Pro/Team/Enterprise)

### 2. Request Skills 💡

Have an idea for a new Skill?

1. Check [existing issues](https://github.com/yourusername/pm-claude-skills/issues?q=is%3Aissue+label%3Aenhancement) to avoid duplicates
2. Create a new issue using the Skill Request template
3. Describe:
   - What PM task the Skill would help with
   - How you currently do this task
   - Time you spend on it
   - Example outputs

### 3. Improve Documentation 📚

Documentation improvements are always welcome:

- Fix typos or unclear instructions
- Add examples
- Improve installation guides
- Share your use cases

### 4. Submit Skills 🎁

Want to contribute a Skill you've created?

**Requirements:**
- Skill must be PM-related
- Include complete SKILL.md with proper frontmatter
- Provide examples of outputs
- Must be tested and working
- Include documentation

**Process:**
1. Fork the repository
2. Create a new branch: `git checkout -b skill/your-skill-name`
3. Add your Skill to `skills/your-skill-name/`
4. Update main README.md to list your Skill
5. Submit a Pull Request

### 5. Improve Existing Skills 🔧

Found a way to make a Skill better?

1. Fork the repository
2. Make your improvements
3. Test thoroughly
4. Submit a Pull Request with:
   - Clear description of changes
   - Why the change improves the Skill
   - Before/after examples if applicable

## Skill Contribution Guidelines

### Structure

Every Skill must follow this structure:

```
skill-name/
├── SKILL.md (required)
└── [other resources as needed]
```

### SKILL.md Format

```markdown
---
name: skill-name
description: Clear description of what the skill does and when to use it. This is critical - Claude uses this to decide when to trigger the skill.
---

# Skill Name

[Detailed instructions for using the skill]

## Structure/Template

[The format/structure the skill should follow]

## Guidelines

[Best practices and tips]

## Examples

[Example outputs]
```

### Quality Standards

Skills should:
- ✅ Be well-documented and clear
- ✅ Include concrete examples
- ✅ Follow PM best practices
- ✅ Save meaningful time (not trivial tasks)
- ✅ Be tested and working
- ✅ Be general enough for others to use
- ❌ Not include proprietary company information
- ❌ Not require external tools (unless clearly documented)

## Pull Request Process

1. **Fork & Branch**
   ```bash
   git clone https://github.com/yourusername/pm-claude-skills.git
   cd pm-claude-skills
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Follow existing code style
   - Update documentation
   - Add examples

3. **Test**
   - Test the Skill in Claude
   - Verify it works as expected
   - Check for edge cases

4. **Commit**
   ```bash
   git add .
   git commit -m "Add: Brief description of changes"
   ```

5. **Push & Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a Pull Request on GitHub

6. **PR Description Should Include:**
   - What changes you made
   - Why you made them
   - How to test them
   - Screenshots/examples (if applicable)

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism
- Focus on what's best for the community
- Show empathy towards others

### Unacceptable Behavior

- Harassment or discriminatory language
- Trolling or insulting comments
- Personal or political attacks
- Publishing private information
- Unprofessional conduct

### Enforcement

Violations may result in:
1. Warning
2. Temporary ban
3. Permanent ban

Report violations to: [your-email@example.com]

## Questions?

- 💬 Start a [Discussion](https://github.com/yourusername/pm-claude-skills/discussions)
- ✉️ Email: [your-email@example.com]
- 🐦 Twitter: [@yourhandle]

## Recognition

Contributors will be:
- Listed in the project README
- Credited in the Skill they contributed
- Mentioned in release notes

Thank you for contributing! 🙏
