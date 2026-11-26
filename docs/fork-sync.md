# Keeping a fork up to date

If you forked this repository to run your own copy of the library, the skills
in your fork stop receiving updates the moment you fork. Two ways to fix that.

## Automatic (recommended)

The workflow `.github/workflows/sync-fork.yml` ships in every fork. It runs
every Wednesday and fast-forwards your `main` to upstream. It does nothing in
the upstream repository itself.

1. In your fork, open **Actions** and enable workflows if GitHub asks.
2. Open **Sync fork with upstream** and press **Run workflow** once.
3. From then on it runs weekly.

The sync only fast-forwards. If you have committed to `main` in your fork, it
fails and tells you so. Keep your own changes on a branch, and `main` stays
syncable.

GitHub pauses scheduled workflows in a repository with no activity for 60 days.
If that happens, press **Run workflow** again and the schedule resumes.

## Manual

Use the **Sync fork** button at the top of your fork on GitHub, or locally:

```sh
git remote add upstream https://github.com/mohitagw15856/pm-claude-skills.git
git fetch upstream
git checkout main
git merge --ff-only upstream/main
git push
```

## Private skills on top of the library

Keep your own skills in a separate folder, or in a separate repository that
you install alongside this one. Then `main` never diverges and the sync never
fails. The Org Edition in `org/` is built for exactly this split.
