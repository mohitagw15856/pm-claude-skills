// Local job scheduling for the Nightwatch and standing-skill subscriptions.
// macOS: launchd plists in ~/Library/LaunchAgents; Linux: user crontab lines.
// Everything is inspectable, labeled, and uninstallable by name.
import { writeFileSync, existsSync, unlinkSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { homedir, platform } from 'node:os';
import { execSync } from 'node:child_process';

const PREFIX = 'com.pm-skills.';

export function install(name, argvArray, { hour = 5, minute = 30, cron = null } = {}) {
  if (platform() === 'darwin') {
    const label = PREFIX + name;
    const plist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>${label}</string>
  <key>ProgramArguments</key><array>${argvArray.map((a) => `<string>${a}</string>`).join('')}</array>
  <key>StartCalendarInterval</key><dict><key>Hour</key><integer>${hour}</integer><key>Minute</key><integer>${minute}</integer></dict>
  <key>WorkingDirectory</key><string>${process.cwd()}</string>
  <key>StandardOutPath</key><string>${join(process.cwd(), '.pm-skills', name + '.log')}</string>
  <key>StandardErrorPath</key><string>${join(process.cwd(), '.pm-skills', name + '.log')}</string>
</dict></plist>`;
    const p = join(homedir(), 'Library', 'LaunchAgents', label + '.plist');
    writeFileSync(p, plist);
    try { execSync(`launchctl unload ${JSON.stringify(p)} 2>/dev/null`); } catch { /* not loaded */ }
    execSync(`launchctl load ${JSON.stringify(p)}`);
    return { kind: 'launchd', path: p, when: `daily ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}` };
  }
  // Linux: append a labeled crontab line.
  const line = `${cron || `${minute} ${hour} * * *`} cd ${process.cwd()} && ${argvArray.map((a) => JSON.stringify(a)).join(' ')} >> .pm-skills/${name}.log 2>&1 # ${PREFIX}${name}`;
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
