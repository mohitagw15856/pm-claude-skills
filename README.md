# Product Management Claude Skills

**Transform your PM workflow with specialized Claude Skills for common product management tasks.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/mohitagw15856/pm-claude-skills.svg)](https://github.com/mohitagw15856/pm-claude-skills/stargazers)

> 📖 **Background**: These Skills emerged from two Medium articles: [Part 1 — How Skills changed my workflow](https://medium.com/product-powerhouse/claude-skills-the-ai-feature-thats-quietly-changing-how-product-managers-work-aad5d8d0640a) and [Part 2 — The complete 12-skill toolkit](https://medium.com/@mohit15856/12-claude-skills-for-product-managers-the-complete-toolkit-with-skill-files-for-jira-figma-fcc73a4c1e58).

## What Are These Skills?

Claude Skills are reusable, specialized procedures that teach Claude your exact workflows. Instead of re-explaining your PRD format or meeting notes structure every time, you create a Skill once and Claude automatically applies it whenever relevant.

Think of Skills as "onboarding guides" for Claude—they package your best practices, templates, and processes so Claude consistently delivers outputs the way you want them.

## 🎯 Who Is This For?

- **Product Managers** looking to automate repetitive documentation tasks
- **PM Teams** wanting to standardize processes and share best practices
- **Anyone** tired of reformatting Claude's outputs to match their standards

## ⚡ Quick Start (5 Minutes)

1. **Prerequisites**: You need Claude Pro, Team, or Enterprise account
2. **Enable Code Execution**: Settings → Features → Enable "Code Execution and File Creation"
3. **Install Your First Skill**:
   - Download the [`prd-template`](skills/prd-template) folder
   - Zip the folder (it should contain SKILL.md and any other files)
   - Rename the .zip to .skill (e.g., `prd-template.skill`)
   - Go to claude.ai → Settings → Skills → Upload Skill
   - Try it: "Help me write a PRD for a mobile app onboarding feature"

That's it! Claude now knows your PRD format.

## 📦 Available Skills

### Free Essential Skills (Included)

| Skill | Purpose | Time Saved | Folder |
|-------|---------|------------|--------|
| **PRD Template** | Standardized product requirements | 2-3 hrs/PRD | [View](skills/prd-template) |
| **Meeting Notes** | Structured meeting documentation | 15-30 min/meeting | [View](skills/meeting-notes) |
| **Stakeholder Update** | Executive status updates | 30-45 min/update | [View](skills/stakeholder-update) |
| **User Research Synthesis** | Analyze and synthesize research findings | 2-3 hrs/study | [View](skills/user-research-synthesis) |
| **Competitive Analysis** | Structured competitive assessments | 1-2 hrs/analysis | [View](skills/competitive-analysis) |

### Discovery & User Research
| **User Interview Synthesis** | Synthesise transcripts into structured findings | Notion | [View](skills/user-interview-synthesis) |
| **Assumption Mapper** | Risk-rate hidden assumptions in any PRD | Miro | [View](skills/assumption-mapper) |

### Roadmapping & Prioritisation
| Skill | Purpose | Tool | Folder |
|-------|---------|------|--------|
| **RICE Prioritisation** | Score and rank initiatives objectively | Jira | [View](skills/rice-prioritisation) |
| **Roadmap Narrative** | Turn ranked lists into strategic narratives | Notion, Miro | [View](skills/roadmap-narrative) |
| **RICE + Impact Matrix** | RICE scoring + strategic alignment combined | Miro, Jira | [View](skills/rice-impact-matrix) |

### Sprint & Delivery
| Skill | Purpose | Tool | Folder |
|-------|---------|------|--------|
| **Sprint Brief** | Generate sprint briefs from Jira data | Jira, Slack | [View](skills/sprint-brief) |
| **Retro Analysis** | Data-grounded retrospective briefs | Jira, Miro | [View](skills/retro-analysis) |

### Data & Metrics
| Skill | Purpose | Tool | Folder |
|-------|---------|------|--------|
| **Product Health Analysis** | Interpret metrics and surface signals | Analytics | [View](skills/product-health-analysis) |

### Strategy & Competitive Intel
| Skill | Purpose | Tool | Folder |
|-------|---------|------|--------|
| **Competitor Signal Tracker** | Analyse competitor moves strategically | Notion | [View](skills/competitor-signal-tracker) |

### Stakeholder Communication
| Skill | Purpose | Tool | Folder |
|-------|---------|------|--------|
| **PRD Template** | Standardized product requirements | — | [View](skills/prd-template) |
| **Meeting Notes** | Structured meeting documentation | — | [View](skills/meeting-notes) |
| **Stakeholder Update** | Executive status updates | — | [View](skills/stakeholder-update) |
| **Executive Update** | Sharp executive briefings | Slack, Teams | [View](skills/executive-update) |

### Go-to-Market & Launch
| Skill | Purpose | Tool | Folder |
|-------|---------|------|--------|
| **Launch Readiness** | Pre-launch go/no-go assessment | Notion, Jira, Slack | [View](skills/launch-readiness) |

### Cross-functional Collaboration
| Skill | Purpose | Tool | Folder |
|-------|---------|------|--------|
| **User Research Synthesis** | Analyze and synthesize research findings | Notion | [View](skills/user-research-synthesis) |
| **Competitive Analysis** | Structured competitive assessments | — | [View](skills/competitive-analysis) |
| **Design Handoff Brief** | PM-to-designer structured briefs | Figma, Notion | [View](skills/design-handoff-brief) |


Want a specific Skill? [Request it here](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=skill-request.md)

## 💡 Real Results

> "These Skills have become indispensable. I used to spend 3-4 hours every Friday on stakeholder updates. Now it takes 20 minutes to compile everything and let Claude format it. Game-changer."  
> — **Mohit Aggarwal, Senior PM**

**Time savings per week:**
- PRD creation: -2.5 hours
- Meeting notes: -1.5 hours
- Stakeholder updates: -2.0 hours
- Research synthesis: -2.5 hours
- **Total: ~8-9 hours/week back in your schedule**

## 📚 Documentation

- [Installation Guide](docs/installation.md) - Step-by-step setup
- [Customization Guide](docs/customization.md) - Adapt Skills to your workflow
- [Troubleshooting](docs/troubleshooting.md) - Common issues and fixes
- [Creating Your Own Skills](docs/creating-skills.md) - Build custom Skills

## 🛠️ Installation

### Method 1: Download Individual Skills (Easiest)

1. Navigate to the skill folder (e.g., `skills/prd-template`)
2. Download all files in that folder
3. Create a zip file containing those files
4. Rename from `.zip` to `.skill`
5. Upload to Claude via Settings → Skills

### Method 2: Clone the Repo

bash
# Clone the repository
git clone https://github.com/mohitagw15856/pm-claude-skills.git
cd pm-claude-skills

# Package a skill (creates .skill file)
cd skills/prd-template
zip -r ../../prd-template.skill .
cd ../..

# Now upload prd-template.skill to Claude


### Method 3: Direct Download (When Available)

Check the [Releases](https://github.com/mohitagw15856/pm-claude-skills/releases) page for pre-packaged `.skill` files.

## 🎓 How to Use

1. **Upload a Skill**: Follow installation instructions above
2. **Just ask Claude**: Claude will automatically recognize when to use the Skill
   - "Help me write a PRD for X"
   - "Take notes from this meeting transcript"
   - "Create a competitive analysis of X, Y, Z"
3. **No special commands needed**: Skills activate automatically based on context

## 🔧 Customization

Every company has different formats and processes. These Skills are designed to be customized:

1. Download the Skill folder
2. Edit the `SKILL.md` file to match your standards
3. Add your company's examples to the instructions
4. Re-package and upload

See the [Customization Guide](docs/customization.md) for detailed instructions.

## 🤝 Contributing

Found a bug? Want to suggest an improvement? Contributions are welcome!

- 🐛 [Report an Issue](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=bug-report.md)
- 💡 [Request a Skill](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=skill-request.md)
- 🔀 [Submit a Pull Request](https://github.com/mohitagw15856/pm-claude-skills/pulls)
- 💬 [Join Discussions](https://github.com/mohitagw15856/pm-claude-skills/discussions)

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## ⭐ Show Your Support

If these Skills save you time, please:
1. ⭐ Star this repository
2. 📢 Share with fellow PMs
3. 🐛 Report bugs or suggest improvements
4. ✍️ Write about your experience

## 📈 Roadmap

**Q1 2026:**
- [ ] Add Data Analysis Standard Skill
- [ ] Add Roadmap Presentation Skill
- [ ] Create video tutorials
- [ ] Pre-packaged .skill files in Releases

**Q2 2026:**
- [ ] Domain-specific Skills (SaaS PM, B2B PM, Growth PM)
- [ ] Team collaboration Skills
- [ ] Notion/Confluence template packs

**Long-term:**
- [ ] Interactive Skill builder tool
- [ ] Integration examples with PM tools
- [ ] Community-contributed Skills library

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

You're free to use, modify, and distribute these Skills. Attribution appreciated but not required.

## 🙋 FAQ

**Q: Do I need a paid Claude account?**  
A: Yes, Skills require Claude Pro, Team, or Enterprise.

**Q: Can I customize these Skills for my team?**  
A: Absolutely! See our [Customization Guide](docs/customization.md).

**Q: Do Skills work with the Claude API?**  
A: Yes! Skills work in claude.ai, Claude Code, and via the API.

**Q: What if a Skill doesn't work?**  
A: Check [Troubleshooting](docs/troubleshooting.md) or [open an issue](https://github.com/mohitagw15856/pm-claude-skills/issues).

**Q: How do I create my own Skills?**  
A: See [Creating Your Own Skills](docs/creating-skills.md) for a complete guide.

**Q: Can I use these commercially?**  
A: Yes! MIT license allows commercial use.

## 🔗 Links

- 📝 [Original Medium Article](https://medium.com/product-powerhouse/claude-skills-the-ai-feature-thats-quietly-changing-how-product-managers-work-aad5d8d0640a)
- 💼 [Connect on LinkedIn](www.linkedin.com/in/mohitaggarwal4)
- ✉️ [Email me](mailto:mohit15856@gmail.com)
- Writing these up and refining them took a fair few evenings. If they saved you some time, a [coffee](https://buymeacoffee.com/mohit15856) is always appreciated 

## 🙏 Acknowledgments

Thank you to everyone who read and shared my Medium article, and to the Anthropic team for building such a powerful feature.

Special thanks to the early testers who provided feedback on these Skills.

---

**Made with ☕ by [Mohit Aggarwal](https://mohit-pm.netlify.app/)**

*Helping product managers work smarter with AI*

⭐ **Star this repo to get updates as new Skills are added!**
