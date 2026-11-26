# PM Skills in a box

The whole library, its website and a local AI model on one small computer, reachable over Wi-Fi from any phone or laptop nearby. **No internet needed after setup, no accounts, nothing sent anywhere.** It's built for schools, libraries, clinics, community centres and NGOs with poor or no connectivity; it's Kiwix's idea, applied to professional know-how.

## What you need

| | Minimum | Recommended |
|---|---|---|
| Computer | Any 64-bit Debian or Ubuntu machine with 8 GB RAM (an old laptop works) | Raspberry Pi 5, 8 GB |
| Storage | 32 GB | 64 GB+ (room for a larger model) |
| Setup | Internet once, about 30 to 60 minutes | |

## Set it up

```bash
# on the box, while online
git clone https://github.com/mohitagw15856/pm-claude-skills && cd pm-claude-skills
sudo bash box/setup.sh             # use the existing Wi-Fi or network
sudo bash box/setup.sh --hotspot   # or make the box its own Wi-Fi network ("PM-Skills")
```

It installs a web server (nginx) and Ollama, builds the site from the repository, pulls a model, and names the box `pm-skills.local`. The model is **PM-8B** if it has been published (see `training/`), otherwise **qwen2.5:3b**, which runs on a Raspberry Pi 5. Choose another with `--model`.

Then, on any device on the same Wi-Fi, open **http://pm-skills.local** (or the IP address it prints). The playground sees it is on a box and uses the box's model automatically: pick a skill, fill it in, run. Answers come from the box.

## Keep it current

When the box is online again: `sudo bash /opt/pm-skills/box/update.sh` pulls new skills and pages and refreshes the model.

## What works offline

- **Everything in the library:** every skill page, search, the forms page, Easy Read, Teach me, place overlays and glossaries.
- **Running skills** with the box's model.

These need the internet and are simply unavailable offline: the free hosted answers, external providers (Gemini, Claude, OpenAI) and smart search's model download.

## Honest limits

A 3B model on a Raspberry Pi is slow (a long answer can take a minute or two) and less capable than the large hosted models. It's best for short, structured tasks: a decoded letter, a checklist, a first draft. Several people can use one box, but answers queue. A small model can be wrong. The skills keep their not-advice lines and "confirm locally" flags, and that matters more here.
