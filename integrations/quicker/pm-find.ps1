<#
PM Skills finder for Quicker (and any Windows launcher that can run PowerShell).

  pm-find.ps1 -Query "帮我写周报"            list the best matches
  pm-find.ps1 -Query "帮我写周报" -Copy      copy a ready prompt for the best match
  pm-find.ps1 -Query "帮我写周报" -Pick 2 -Copy   copy the second match instead
  pm-find.ps1 -Refresh                       download the index again

The index comes from the Gitee mirror (GitHub as fallback) and is cached under
%LOCALAPPDATA%\pm-skills for seven days. The query never leaves the machine.
Scoring matches integrations/china-agent-tools/pm_skills_tool.py: words of two or
more letters plus overlapping pairs of Chinese characters, with a hit in the
skill's name counting three times a hit in its description.
#>
param(
  [string]$Query = "",
  [int]$Limit = 5,
  [int]$Pick = 1,
  [switch]$Copy,
  [switch]$Refresh
)
$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$CacheDir = Join-Path $env:LOCALAPPDATA "pm-skills"
$IndexPath = Join-Path $CacheDir "skills-index.min.json"
$Mirrors = @(
  "https://gitee.com/mohitagw/pm-claude-skills/raw/main/data/skills-index.min.json",
  "https://raw.githubusercontent.com/mohitagw15856/pm-claude-skills/main/data/skills-index.min.json"
)

function Get-Index {
  $stale = $true
  if (Test-Path $IndexPath) {
    $stale = ((Get-Date) - (Get-Item $IndexPath).LastWriteTime).TotalDays -gt 7
  }
  if ($Refresh -or $stale) {
    New-Item -ItemType Directory -Force -Path $CacheDir | Out-Null
    $tmp = "$IndexPath.tmp"
    $ok = $false
    foreach ($url in $Mirrors) {
      try {
        Invoke-WebRequest -Uri $url -OutFile $tmp -UseBasicParsing -TimeoutSec 30
        # Keep the download only if it parses, so a mirror error page never replaces a good cache.
        $null = (Get-Content -Raw -Encoding UTF8 $tmp | ConvertFrom-Json).skills.Count
        Move-Item -Force $tmp $IndexPath
        $ok = $true
        break
      } catch {
        if (Test-Path $tmp) { Remove-Item -Force $tmp }
      }
    }
    if (-not $ok -and -not (Test-Path $IndexPath)) {
      throw "Could not download the skill index from Gitee or GitHub, and there is no cached copy."
    }
  }
  return (Get-Content -Raw -Encoding UTF8 $IndexPath | ConvertFrom-Json).skills
}

function Get-Tokens([string]$Text) {
  $set = New-Object 'System.Collections.Generic.HashSet[string]'
  if (-not $Text) { return ,$set }
  $lower = $Text.ToLowerInvariant()
  foreach ($m in [regex]::Matches($lower, "[a-z0-9]+")) {
    if ($m.Value.Length -gt 1) { [void]$set.Add($m.Value) }
  }
  foreach ($m in [regex]::Matches($lower, "[一-鿿]+")) {
    $run = $m.Value
    if ($run.Length -eq 1) { [void]$set.Add($run) }
    for ($i = 0; $i -lt $run.Length - 1; $i++) { [void]$set.Add($run.Substring($i, 2)) }
  }
  return ,$set
}

function Get-Overlap($A, $B) {
  $n = 0
  foreach ($t in $A) { if ($B.Contains($t)) { $n++ } }
  return $n
}

$skills = Get-Index
if (-not $Query.Trim()) {
  Write-Output ("PM Skills: {0} skills cached. Pass -Query to search." -f $skills.Count)
  exit 0
}
if ($Limit -lt 1) { $Limit = 1 }
if ($Limit -gt 20) { $Limit = 20 }

$q = Get-Tokens $Query
$scored = foreach ($s in $skills) {
  $nameTokens = Get-Tokens ($s.name -replace "-", " ")
  $descTokens = Get-Tokens (("{0} {1}" -f $s.description, $s.descriptionZh))
  $score = 3 * (Get-Overlap $q $nameTokens) + (Get-Overlap $q $descTokens)
  if ($score -gt 0) { [pscustomobject]@{ Score = $score; Skill = $s } }
}
$hits = @($scored | Sort-Object -Property @{ Expression = "Score"; Descending = $true }, @{ Expression = { $_.Skill.name } } | Select-Object -First $Limit)

if ($hits.Count -eq 0) {
  Write-Output "没有找到匹配的技能。换一种说法，或用英文关键词再试。"
  exit 1
}

if ($Copy) {
  if ($Pick -lt 1 -or $Pick -gt $hits.Count) { throw "-Pick must be between 1 and $($hits.Count)." }
  $s = $hits[$Pick - 1].Skill
  $desc = if ($s.descriptionZh) { $s.descriptionZh } else { $s.description }
  $prompt = "请扮演一位资深专业人士，按下面的技能要求完成我的任务。先问清缺少的信息，不要编造。`n`n技能：$($s.name)`n要求：$desc`n`n完整技能说明：https://gitee.com/mohitagw/pm-claude-skills/blob/main/skills/$($s.name)/SKILL.md`n`n我的任务："
  Set-Clipboard -Value $prompt
  Write-Output "提示词已复制：$($s.name)"
  exit 0
}

$i = 1
foreach ($h in $hits) {
  $s = $h.Skill
  $desc = if ($s.descriptionZh) { $s.descriptionZh } else { $s.description }
  if ($desc.Length -gt 90) { $desc = $desc.Substring(0, 89) + "…" }
  Write-Output ("{0}. {1}  {2}" -f $i, $s.name, $desc)
  $i++
}
