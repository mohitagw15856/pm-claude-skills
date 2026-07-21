// Local job scheduling for the Nightwatch and standing-skill subscriptions.
// macOS: launchd plists in ~/Library/LaunchAgents; Linux: user crontab lines.
// Everything is inspectable, labeled, and uninstallable by name.
import { writeFileSync, existsSync, unlinkSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { homedir, platform } from 'node:os';
import { execSync } from 'node:child_process';

const PREFIX = 'com.pm-skills.';

// XML-escape a value going into a plist <string>…</string> node. Without this,
// a cwd or arg containing &, <, >, or a quote produces a malformed plist and
// launchctl load fails silently.
const xml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

// POSIX-shell-quote a value going into a crontab line. Single-quotes are
// literal in bash; embedded single quotes need the '\'' trick. JSON.stringify
// produces double-quoted strings, where $var, `cmd`, and \ are still expanded.
const sh = (s) => `'${String(s).replace(/'/g, "'\\''")}'`;

export function install(name, argvArray, { hour = 5, minute = 30, cron = null } = {}) {
  if (platform() === 'darwin') {
    const label = PREFIX + name;
    const cwd = process.cwd();
    const logPath = join(cwd, '.pm-skills', name + '.log');
    const plist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>${xml(label)}</string>
  <key>ProgramArguments</key><array>${argvArray.map((a) => `<string>${xml(a)}</string>`).join('')}</array>
  <key>StartCalendarInterval</key><dict><key>Hour</key><integer>${hour}</integer><key>Minute</key><integer>${minute}</integer></dict>
  <key>WorkingDirectory</key><string>${xml(cwd)}</string>
  <key>StandardOutPath</key><string>${xml(logPath)}</string>
  <key>StandardErrorPath</key><string>${xml(logPath)}</string>
</dict></plist>`;
    const p = join(homedir(), 'Library', 'LaunchAgents', label + '.plist');
    writeFileSync(p, plist);
    try { execSync(`launchctl unload ${JSON.stringify(p)} 2>/dev/null`); } catch { /* not loaded */ }
    execSync(`launchctl load ${JSON.stringify(p)}`);
    return { kind: 'launchd', path: p, when: `daily ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}` };
  }
  // Linux: append a labeled crontab line.
  const line = `${cron || `${minute} ${hour} * * *`} cd ${sh(process.cwd())} && ${argvArray.map(sh).join(' ')} >> .pm-skills/${name}.log 2>&1 # ${PREFIX}${name}`;
  const current = (() => { try { return execSync('crontab -l').toString(); } catch { return ''; } })();
  const cleaned = current.split('\n').filter((l) => !l.includes(`# ${PREFIX}${name}`)).join('\n').trim();
  execSync('crontab -', { input: cleaned + '\n' + line + '\n' });
  return { kind: 'cron', path: 'crontab', when: cron || `daily ${hour}:${minute}` };
}

export function uninstall(name) {
  if (platform() === 'darwin') {
    const p = join(homedir(), 'Library', 'LaunchAgents', PREFIX + name + '.plist');
    if (!existsSync(p)) return false;
    try { execSync(`launchctl unload ${JSON.stringify(p)}`); } catch { /* fine */ }
    unlinkSync(p);
    return true;
  }
  const current = (() => { try { return execSync('crontab -l').toString(); } catch { return ''; } })();
  const cleaned = current.split('\n').filter((l) => !l.includes(`# ${PREFIX}${name}`)).join('\n');
  if (cleaned === current) return false;
  execSync('crontab -', { input: cleaned });
  return true;
}

export function list() {
  if (platform() === 'darwin') {
    const dir = join(homedir(), 'Library', 'LaunchAgents');
    if (!existsSync(dir)) return [];
    return readdirSync(dir).filter((f) => f.startsWith(PREFIX)).map((f) => f.slice(PREFIX.length).replace(/\.plist$/, ''));
  }
  try { return execSync('crontab -l').toString().split('\n').filter((l) => l.includes('# ' + PREFIX)).map((l) => l.split('# ' + PREFIX)[1]); }
  catch { return []; }
}
