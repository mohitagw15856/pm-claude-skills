# Run a PM Skill on the file you right-clicked (Windows Explorer). The answer is
# saved next to the file as <file>.<skill>.md and opened. Settings, the same as
# on macOS and Linux, in %USERPROFILE%\.config\pm-skills\right-click.env:
#   PM_SKILLS_LOCAL_MODEL=qwen2.5:3b   (free, with Ollama)   or   ANTHROPIC_API_KEY=sk-ant-...
#   PM_SKILL=summarize-anything        (optional: skip the picker)
param([Parameter(ValueFromRemainingArguments = $true)][string[]]$Files)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Windows.Forms, Microsoft.VisualBasic

$conf = Join-Path $env:USERPROFILE '.config\pm-skills\right-click.env'
if (Test-Path $conf) {
  foreach ($line in Get-Content $conf) {
    if ($line -match '^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$') { [Environment]::SetEnvironmentVariable($Matches[1], $Matches[2], 'Process') }
  }
}
$skills = 'summarize-anything','explain-simply','lease-decoder','loan-decoder','medical-bill-decoder','benefits-decoder','insurance-policy-decoder','tos-decoder','scam-message-decoder','pay-stub-decoder','clause-explainer','executive-summary'
function Say($msg) { [System.Windows.Forms.MessageBox]::Show($msg, 'PM Skills') | Out-Null }

$skill = $env:PM_SKILL
if (-not $skill) {
  $form = New-Object System.Windows.Forms.Form -Property @{ Text = 'PM Skills: run which skill?'; Width = 360; Height = 380; StartPosition = 'CenterScreen'; TopMost = $true }
  $list = New-Object System.Windows.Forms.ListBox -Property @{ Dock = 'Fill' }
  $list.Items.AddRange($skills + 'Another skill...'); $list.SelectedIndex = 0
  $ok = New-Object System.Windows.Forms.Button -Property @{ Text = 'Run'; Dock = 'Bottom'; DialogResult = 'OK' }
  $form.Controls.AddRange(@($list, $ok)); $form.AcceptButton = $ok
  if ($form.ShowDialog() -ne 'OK') { exit 0 }
  $skill = [string]$list.SelectedItem
  if ($skill -eq 'Another skill...') { $skill = [Microsoft.VisualBasic.Interaction]::InputBox('Skill name (for example contract-review):', 'PM Skills') }
}
if (-not $skill) { exit 0 }
if ($skill -notmatch '^[a-z0-9-]+$') { Say "`"$skill`" is not a skill name."; exit 1 }

function Get-Text($path) {
  switch -regex ([IO.Path]::GetExtension($path).ToLower()) {
    '^\.(txt|md|csv|tsv|json|eml|log|ya?ml|xml|html?)$' { return Get-Content -Raw -LiteralPath $path }
    '^\.docx$' {
      Add-Type -AssemblyName System.IO.Compression.FileSystem
      $zip = [IO.Compression.ZipFile]::OpenRead($path)
      try { $xml = (New-Object IO.StreamReader($zip.GetEntry('word/document.xml').Open())).ReadToEnd() } finally { $zip.Dispose() }
      return (($xml -replace '</w:p>', "`n") -replace '<[^>]+>', '')
    }
    '^\.pdf$' { if (Get-Command pdftotext -ErrorAction SilentlyContinue) { return (& pdftotext -layout $path - | Out-String) } }
  }
  return ''
}

# The command that runs a skill: npx by default, or PM_SKILLS_CLI (for example "node C:\pm-claude-skills\bin\cli.mjs").
$cli = @(if ($env:PM_SKILLS_CLI) { $env:PM_SKILLS_CLI -split '\s+' } else { 'npx.cmd', '-y', 'pm-claude-skills' })
foreach ($f in $Files) {
  if (-not (Test-Path -LiteralPath $f -PathType Leaf)) { continue }
  $text = Get-Text $f
  if (-not $text -or -not $text.Trim()) { Say "Could not read text from $([IO.Path]::GetFileName($f)). Text, Word (.docx) and, with pdftotext installed, PDF files work."; continue }
  $max = if ($env:PM_SKILLS_MAX_CHARS) { [int]$env:PM_SKILLS_MAX_CHARS } else { 60000 }
  if ($text.Length -gt $max) { $text = $text.Substring(0, $max) }
  $tmp = [IO.Path]::GetTempFileName(); Set-Content -LiteralPath $tmp -Value $text -Encoding UTF8
  $base = Join-Path ([IO.Path]::GetDirectoryName($f)) ([IO.Path]::GetFileNameWithoutExtension($f))
  $out = "$base.$skill.md"; $n = 2
  while (Test-Path -LiteralPath $out) { $out = "$base.$skill-$n.md"; $n++ }
  $err = "$tmp.err"
  $cliArgs = @($cli | Select-Object -Skip 1) + @('run', $skill, '--input', "`"$tmp`"", '--out', "`"$out`"")
  $p = Start-Process -FilePath $cli[0] -ArgumentList $cliArgs -RedirectStandardError $err -WindowStyle Hidden -Wait -PassThru
  if ($p.ExitCode -eq 0 -and (Test-Path -LiteralPath $out)) { Invoke-Item -LiteralPath $out }
  else { Say ("PM Skills could not run ${skill}: " + ((Get-Content -LiteralPath $err -ErrorAction SilentlyContinue | Select-Object -Last 1) -join '')) }
  Remove-Item -LiteralPath $tmp, $err -ErrorAction SilentlyContinue
}
