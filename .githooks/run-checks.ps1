param([switch]$Push)

$ErrorActionPreference = "Continue"
$root = Split-Path $PSScriptRoot -Parent
$failed = $false

function Write-Fail($msg) { Write-Host "  FAIL  $msg" -ForegroundColor Red; $script:failed = $true }
function Write-Warn($msg) { Write-Host "  WARN  $msg" -ForegroundColor Yellow }
function Write-Pass($msg) { Write-Host "  PASS  $msg" -ForegroundColor Green }

function Get-ContentSafe($path) {
  try { return Get-Content -LiteralPath $path -Raw -ErrorAction Stop } catch { return $null }
}

function Get-Rel($path) {
  $p = $path -replace '\\', '/'
  $r = $root -replace '\\', '/'
  if ($p -like "$r/*") { return $p.Substring($r.Length + 1) }
  return $p
}

# Collecter les fichiers
$htmlFiles = Get-ChildItem -Path $root -Filter *.html -Recurse -ErrorAction SilentlyContinue |
  Where-Object { $_.FullName -notmatch '\\node_modules\\' -and $_.FullName -notmatch '\\.git\\' }
$cssFiles = Get-ChildItem -Path $root -Filter *.css -Recurse -ErrorAction SilentlyContinue |
  Where-Object { $_.FullName -notmatch '\\node_modules\\' -and $_.FullName -notmatch '\\.git\\' -and $_.Name -in 'style.css','style-v2.css' }

Write-Host "`n-- 1. BALISAGE HTML ----------------------------" -ForegroundColor Cyan

$htmlOk = 0; $htmlFail = 0
foreach ($f in $htmlFiles) {
  $rel = Get-Rel $f.FullName
  $c = Get-ContentSafe $f.FullName
  if (-not $c) { Write-Fail "$rel -- fichier vide"; $htmlFail++; continue }
  $err = @()

  if ($c -notmatch '<!DOCTYPE html>') { $err += 'DOCTYPE manquant' }
  if ($c -notmatch '<html[^>]*lang=') { $err += 'attribut lang manquant' }
  if ($c -notmatch '<meta[^>]*name="viewport"') { $err += 'viewport meta manquant' }
  if ($c -notmatch '<title>') { $err += '<title> manquant' }

  $imgs = [regex]::Matches($c, '<img[^>]+>')
  $noAlt = 0
  foreach ($img in $imgs) { if ($img.Value -notmatch 'alt\s*=') { $noAlt++ } }
  if ($noAlt -gt 0) { $err += "$noAlt image(s) sans alt" }

  $idMatches = [regex]::Matches($c, "id=`"([^`"]+)`"")
  $idGroups = @{}
  foreach ($m in $idMatches) {
    $val = $m.Groups[1].Value
    if (-not $idGroups.ContainsKey($val)) { $idGroups[$val] = 0 }
    $idGroups[$val]++
  }
  $dups = $idGroups.GetEnumerator() | Where-Object { $_.Value -gt 1 } | ForEach-Object { $_.Key }
  if ($dups) { $err += "IDs dupliques: $($dups -join ', ')" }

  if ($err.Count -eq 0) { $htmlOk++ } else { $htmlFail++; foreach ($e in $err) { Write-Fail "$rel -- $e" } }
}
if ($htmlOk -gt 0) { Write-Pass "$htmlOk fichier(s) OK" }

Write-Host "`n-- 2. ANTI-PATTERNS CSS -------------------------" -ForegroundColor Cyan

foreach ($f in $cssFiles) {
  $rel = Get-Rel $f.FullName
  $css = Get-ContentSafe $f.FullName
  if (-not $css) { continue }

  $oxh = [regex]::Matches($css, 'overflow-x\s*:\s*hidden')
  if ($oxh.Count -gt 0) { Write-Warn "$rel -- overflow-x:hidden x$($oxh.Count)" }

  $imp = [regex]::Matches($css, '!important')
  if ($imp.Count -gt 10) { Write-Warn "$rel -- !important x$($imp.Count)" }

  $wc = [regex]::Matches($css, 'will-change')
  if ($wc.Count -gt 3) { Write-Warn "$rel -- will-change x$($wc.Count) (max 3)" }

  $pxBody = [regex]::Matches($css, '(body|html)\s*\{[^}]*font-size\s*:\s*\d+px')
  if ($pxBody.Count -gt 0) { Write-Warn "$rel -- font-size en px sur body/html" }

  Write-Pass "$rel -- OK"
}

$styleCss = Get-ContentSafe (Join-Path $root 'style.css')
if ($styleCss) {
  $wild = [regex]::Matches($styleCss, '\*\s*\{')
  if ($wild.Count -gt 1) { Write-Warn "style.css -- $($wild.Count) selecteurs universels *" }
  $bad = [regex]::Matches($styleCss, '(transition|animation)[^}]*\b(width|height|top|left|margin|padding)\b')
  if ($bad.Count -gt 0) { Write-Warn "style.css -- $($bad.Count) anim sur width/height/margin" }
}

Write-Host "`n-- 3. LIENS INTERNES ----------------------------" -ForegroundColor Cyan

$allFiles = @{}
Get-ChildItem -Path $root -Recurse -File -ErrorAction SilentlyContinue |
  Where-Object { $_.FullName -notmatch '\\.git\\' -and $_.FullName -notmatch '\\node_modules\\' } |
  ForEach-Object {
    $r = (Get-Rel $_.FullName) -replace '\\', '/'
    $allFiles[$r] = $true
    $d = Split-Path $r -Parent
    $n = [System.IO.Path]::GetFileNameWithoutExtension($r)
    if ($d) { $noExt = "$d/$n" } else { $noExt = $n }
    $allFiles[$noExt] = $true
  }

$broken = 0
foreach ($f in $htmlFiles) {
  $rel = Get-Rel $f.FullName
  $c = Get-ContentSafe $f.FullName
  if (-not $c) { continue }
  $links = [regex]::Matches($c, "(?:href|src)=`"(?!https?://|tel:|mailto:|#|data:|javascript:)([^`"]+)`"")
  foreach ($l in $links) {
    $url = $l.Groups[1].Value
    if ([string]::IsNullOrWhiteSpace($url)) { continue }

    # Ignorer les templates JS (contiennent + ' ou ' +)
    if ($url -match "\s*\+\s*'" -or $url -match "'\s*\+") { continue }

    $clean = $url -replace '#.*$' -replace '\?.*$'
    $clean = $clean.Trim()
    if ($clean -eq '') { continue }

    # Lien racine (/foo) → résoudre depuis root
    if ($clean.StartsWith('/')) {
      $resolved = $clean.TrimStart('/')
      # Clean URLs: /creation-site → service-creation-site.html
      if (-not $allFiles.ContainsKey($resolved)) {
        $withPrefix = "service-$resolved.html"
        if ($allFiles.ContainsKey($withPrefix)) { $resolved = $withPrefix }
      }
      # /blog → blog/index.html, /blog/foo → blog/foo.html
      if (-not $allFiles.ContainsKey($resolved)) {
        $withIndex = "$resolved/index.html"
        if ($allFiles.ContainsKey($withIndex)) { $resolved = $withIndex }
      }
      if (-not $allFiles.ContainsKey($resolved)) {
        $withHtml = "$resolved.html"
        if ($allFiles.ContainsKey($withHtml)) { $resolved = $withHtml }
      }
    } else {
      $dir = Split-Path $rel -Parent
      $dir = $dir -replace '\\', '/'
      if ([string]::IsNullOrWhiteSpace($dir)) { $resolved = $clean } else { $resolved = "$dir/$clean" }
    }
    $resolved = $resolved -replace '/\./', '/' -replace '[^/]+/\.\./', ''
    if ($resolved -match '\.\.') { continue }
    if (-not $allFiles.ContainsKey($resolved)) {
      Write-Warn "$rel -- lien casse: $url"
      $broken++
    }
  }
}
if ($broken -eq 0) { Write-Pass "Aucun lien casse" } else { Write-Warn "$broken lien(s) casse(s)" }

Write-Host "`n-- 4. ACCESSIBILITE ------------------------------" -ForegroundColor Cyan

$accOk = 0; $accFail = 0
foreach ($f in $htmlFiles) {
  $rel = Get-Rel $f.FullName
  $c = Get-ContentSafe $f.FullName
  if (-not $c) { continue }
  $err = @()
  if ($c -notmatch '<html[^>]*lang=') { $err += 'attribut lang manquant' }
  $btns = [regex]::Matches($c, '<button(?!\s[^>]*type=)')
  if ($btns.Count -gt 0) { Write-Warn "$rel -- $($btns.Count) button(s) sans type" }
  if ($err.Count -eq 0) { $accOk++ } else { $accFail++; foreach ($e in $err) { Write-Fail "$rel -- $e" } }
}
if ($accOk -gt 0) { Write-Pass "$accOk fichier(s) OK" }

Write-Host "`n-- 5. POIDS -------------------------------------" -ForegroundColor Cyan

$total = 0
foreach ($f in $htmlFiles) { $total += $f.Length }
foreach ($f in $cssFiles) { $total += $f.Length }
$mb = [math]::Round($total / 1MB, 2)
if ($mb -gt 1) { Write-Warn "Poids HTML+CSS: ${mb}MB" } else { Write-Pass "Poids HTML+CSS: ${mb}MB" }

Write-Host "`n================================================" -ForegroundColor Cyan
if ($failed) {
  Write-Host "  XX CERTAINS CHECKS ONT ECHOUE" -ForegroundColor Red
  exit 1
} else {
  Write-Host "  >> TOUS LES CHECKS PASSENT" -ForegroundColor Green
  exit 0
}
