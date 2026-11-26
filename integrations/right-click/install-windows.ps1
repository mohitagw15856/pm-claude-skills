# Add "Run a PM Skill..." to the right-click menu of every file in Explorer, for
# this user only (HKCU, no admin rights needed).
#   powershell -ExecutionPolicy Bypass -File install-windows.ps1             # install
#   powershell -ExecutionPolicy Bypass -File install-windows.ps1 -Uninstall  # remove
# On Windows 11 it appears under "Show more options" (or Shift+right-click).
param([switch]$Uninstall)
$dest = Join-Path $env:USERPROFILE '.pm-skills'
$key = 'HKCU:\Software\Classes\*\shell\PMSkills'
if ($Uninstall) {
  Remove-Item -Path $key -Recurse -ErrorAction SilentlyContinue
  Remove-Item -LiteralPath (Join-Path $dest 'pm-skill-file.ps1') -ErrorAction SilentlyContinue
  Write-Host 'Removed. Your settings in .config\pm-skills are kept.'; exit 0
}
New-Item -ItemType Directory -Force -Path $dest | Out-Null
Copy-Item -LiteralPath (Join-Path $PSScriptRoot 'pm-skill-file.ps1') -Destination $dest -Force
$confDir = Join-Path $env:USERPROFILE '.config\pm-skills'; New-Item -ItemType Directory -Force -Path $confDir | Out-Null
$conf = Join-Path $confDir 'right-click.env'
if (-not (Test-Path $conf)) {
  @'
# Settings for the PM Skills right-click menu. Pick ONE way to run skills:
# 1. Free, on this computer: install Ollama (https://ollama.com), run: ollama pull qwen2.5:3b
PM_SKILLS_LOCAL_MODEL=qwen2.5:3b
# 2. Or your own Anthropic key (comment out the line above):
# ANTHROPIC_API_KEY=sk-ant-...
# Optional: always run one skill, with no picker.
# PM_SKILL=summarize-anything
'@ | Set-Content -LiteralPath $conf -Encoding UTF8
}
New-Item -Path $key -Force | Out-Null
Set-ItemProperty -Path $key -Name 'MUIVerb' -Value 'Run a PM Skill...'
Set-ItemProperty -Path $key -Name 'Icon' -Value 'imageres.dll,-102'
New-Item -Path "$key\command" -Force | Out-Null
$script = Join-Path $dest 'pm-skill-file.ps1'
Set-ItemProperty -Path "$key\command" -Name '(Default)' -Value "powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$script`" `"%1`""
Write-Host "Installed. Right-click a file and choose 'Run a PM Skill...'. Settings: $conf"
