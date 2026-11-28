<#
.SYNOPSIS
  Install PM Skills on Windows without Node: copies skill folders to where an agent looks for them.

.DESCRIPTION
  The Windows counterpart of scripts/install.sh. Native agents (Claude Code, Codex,
  Hermes, OpenClaw) read the SKILL.md standard, so installing is copying each folder
  under skills\ into the agent's skills folder. Cursor and Windsurf use rule files,
  copied from exports\cursor or exports\windsurf.

  It only copies. It never deletes anything, and an existing skill of the same name is
  overwritten only for the files this repository contains.

  Status: written to mirror install.sh and reviewed, but not run on Windows from this
  repository. Use -DryRun first and please open an issue if anything is wrong.

.EXAMPLE
  .\scripts\install.ps1 -Agent claude
  .\scripts\install.ps1 -Agent cursor -Target .\.cursor\rules
  .\scripts\install.ps1 -Agent codex -DryRun
  .\scripts\install.ps1 -List
#>
[CmdletBinding()]
param(
  [ValidateSet('claude', 'hermes', 'codex', 'openclaw', 'cursor', 'windsurf')]
  [string]$Agent,
  [string]$Target,
  [switch]$DryRun,
  [switch]$List
)

$ErrorActionPreference = 'Stop'
$RepoDir = Split-Path -Parent $PSScriptRoot
$SkillsDir = Join-Path $RepoDir 'skills'
$UserHome = [Environment]::GetFolderPath('UserProfile')

$Defaults = [ordered]@{
  claude   = Join-Path $UserHome '.claude\skills'
  hermes   = Join-Path $UserHome '.hermes\skills'
  codex    = Join-Path $UserHome '.codex\skills'
  openclaw = Join-Path $UserHome '.openclaw\skills'
  cursor   = Join-Path (Get-Location) '.cursor\rules'
  windsurf = Join-Path (Get-Location) '.windsurf\rules'
}
$RuleFiles = @{ cursor = '*.mdc'; windsurf = '*.md' }

if ($List) {
  foreach ($name in $Defaults.Keys) { '{0,-9} {1}' -f $name, $Defaults[$name] }
  return
}
if (-not $Agent) { throw 'Give -Agent (claude, hermes, codex, openclaw, cursor or windsurf), or -List to see the default folders.' }
if (-not $Target) { $Target = $Defaults[$Agent] }
$Target = $ExecutionContext.SessionState.Path.GetUnresolvedProviderPathFromPSPath($Target)

$count = 0
if ($RuleFiles.ContainsKey($Agent)) {
  $source = Join-Path $RepoDir (Join-Path 'exports' $Agent)
  if (-not (Test-Path -LiteralPath $source)) { throw "Rule files not found at $source. They are built by: node scripts/build-exports.mjs --platform $Agent" }
  $files = Get-ChildItem -LiteralPath $source -Recurse -File -Filter $RuleFiles[$Agent] | Where-Object { $_.Name -ne 'README.md' }
  if (-not $DryRun) { New-Item -ItemType Directory -Force -Path $Target | Out-Null }
  foreach ($file in $files) {
    if ($DryRun) { "would copy  $($file.Name)" } else { Copy-Item -LiteralPath $file.FullName -Destination (Join-Path $Target $file.Name) -Force }
    $count++
  }
} else {
  if (-not (Test-Path -LiteralPath $SkillsDir)) { throw "No skills folder at $SkillsDir. Run this from a clone of the repository." }
  $folders = Get-ChildItem -LiteralPath $SkillsDir -Directory | Where-Object { Test-Path -LiteralPath (Join-Path $_.FullName 'SKILL.md') }
  if (-not $DryRun) { New-Item -ItemType Directory -Force -Path $Target | Out-Null }
  foreach ($folder in $folders) {
    if ($DryRun) { "would copy  $($folder.Name)" } else { Copy-Item -LiteralPath $folder.FullName -Destination $Target -Recurse -Force }
    $count++
  }
}

$verb = if ($DryRun) { 'Would install' } else { 'Installed' }
"$verb $count item(s) for '$Agent' in $Target"
if (-not $DryRun) { 'Start a new session in your agent to pick them up.' }
