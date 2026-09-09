#Requires -Version 5.1
<#
.SYNOPSIS
    Inicializador unificado: Site Conta Certa + Radar + Extrator Bancario.
.DESCRIPTION
    Modo DEV (padrao): sobe as 6 aplicacoes em janelas separadas, com
    healthchecks e tabela final de status.
    Modo PROD (-Prod): docker compose da raiz (Site + Radar + tunnel).
.NOTES
    Sprint F9 - 09/09/2026. Substitui: start-all.bat, Inicializa_aplicacao.bat,
    start-clean.ps1, start-all.ps1, start-dev.ps1.
    ARQUIVO ASCII PURO de proposito (PowerShell 5.1 nao exige BOM).
#>

param(
    [switch]$Prod,
    [switch]$SiteOnly,
    [switch]$RadarOnly,
    [switch]$ExtratorOnly,
    [switch]$SkipPostgres
)

# ============================== CONFIG ==============================
$RAIZ     = 'C:\Site conta-certa'
$SITE_BE  = @{ Port = 4000; Path = "$RAIZ\backend";  Cmd = 'node server.js' }
$SITE_FE  = @{ Port = 5173; Path = "$RAIZ\frontend"; Cmd = 'npm run dev' }
$RADAR_BE = @{ Port = 3001; Path = "$RAIZ\radar-clone\backend";  Cmd = 'npm run start:dev' }
$RADAR_FE = @{ Port = 3002; Path = "$RAIZ\radar-clone\frontend"; Cmd = 'npm run dev -- -p 3002' }
$EXT_BE   = @{ Port = 8000; Path = "$RAIZ\radar-clone\extrator-bancario\backend";
              Venv = "$RAIZ\radar-clone\extrator-bancario\venv" }
$EXT_FE   = @{ Port = 5174; Path = "$RAIZ\radar-clone\extrator-bancario\frontend";
              Cmd  = 'npm run dev -- --port 5174' }

$LOG_DIR  = "$RAIZ\logs"
$LOG_FILE = "$LOG_DIR\boot-$(Get-Date -Format 'yyyy-MM-dd-HHmmss').log"

# ============================== HELPERS ==============================
function Write-Log([string]$Msg, [string]$Color = 'White') {
    $line = '[' + (Get-Date -Format 'HH:mm:ss') + '] ' + $Msg
    Write-Host $line -ForegroundColor $Color
    Add-Content -Path $LOG_FILE -Value $line -Encoding UTF8 -ErrorAction SilentlyContinue
}

function Test-Port([int]$Port) {
    $c = Test-NetConnection -ComputerName localhost -Port $Port -WarningAction SilentlyContinue
    return $c.TcpTestSucceeded
}

function Free-Port([int]$Port) {
    $conns = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
    foreach ($cn in $conns) {
        $p = Get-Process -Id $cn.OwningProcess -ErrorAction SilentlyContinue
        if ($p) {
            Write-Log ("  Liberando porta {0} (PID {1} - {2})" -f $Port, $p.Id, $p.ProcessName) Yellow
            Stop-Process -Id $p.Id -Force -ErrorAction SilentlyContinue
        }
    }
    if ($conns) { Start-Sleep -Seconds 2 }
}

function Open-Window([string]$WorkDir, [string]$Command) {
    $cmd = "Set-Location '" + $WorkDir + "'; " + $Command
    Start-Process powershell -ArgumentList '-NoExit', '-Command', $cmd
}

function Wait-Health([string]$Url, [int]$TimeoutSec = 60) {
    $deadline = (Get-Date).AddSeconds($TimeoutSec)
    while ((Get-Date) -lt $deadline) {
        try {
            $r = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 2 -ErrorAction Stop
            if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { return $true }
        } catch { }
        Start-Sleep -Seconds 2
    }
    return $false
}

# ============================== MODO PROD ==============================
if ($Prod) {
    Write-Host 'MODO PRODUCAO: docker compose da raiz' -ForegroundColor Magenta
    Set-Location $RAIZ
    docker compose up -d
    Start-Sleep -Seconds 10
    docker compose ps
    Write-Host 'URLs: contacerta.com.br / radar.contacerta.com.br (via tunnel)' -ForegroundColor Cyan
    exit 0
}

# ============================== MODO DEV ==============================
Write-Host '================================================' -ForegroundColor Cyan
Write-Host '  CONTA CERTA + RADAR + EXTRATOR - MODO DEV' -ForegroundColor Cyan
Write-Host '================================================' -ForegroundColor Cyan

if (-not (Test-Path $LOG_DIR)) { New-Item -ItemType Directory -Path $LOG_DIR | Out-Null }
Write-Log "Log: $LOG_FILE" Cyan

$runSite  = (-not $RadarOnly) -and (-not $ExtratorOnly)
$runRadar = (-not $SiteOnly)  -and (-not $ExtratorOnly)
$runExt   = (-not $SiteOnly)  -and (-not $RadarOnly)

# [1] Docker
Write-Log '[1/6] Verificando Docker...' Cyan
$dockerOk = $true
try { docker version 2>&1 | Out-Null } catch { $dockerOk = $false }
if (-not $dockerOk -and -not $SkipPostgres) {
    Write-Log '[ERRO] Docker nao esta rodando. Inicie o Docker Desktop e tente de novo.' Red
    Read-Host 'Enter para sair'
    exit 1
}
Write-Log '  Docker OK' Green

# [2] Postgres Docker do Radar (5433)
if (-not $SkipPostgres) {
    Write-Log '[2/6] Garantindo Postgres Docker (5433)...' Cyan
    Push-Location "$RAIZ\radar-clone"
    docker compose up -d postgres 2>&1 | Out-Null
    Pop-Location
    Start-Sleep -Seconds 3
    if (Test-Port 5433) { Write-Log '  Postgres Docker OK' Green }
    else { Write-Log '  Postgres Docker nao subiu - Radar pode falhar' Yellow }
} else {
    Write-Log '[2/6] Postgres ignorado (-SkipPostgres)' Yellow
}
if (Test-Port 5432) { Write-Log '  Aviso: Postgres local 5432 ativo (dados REAIS intocados)' Yellow }

# [3] Liberacao cirurgica de portas
Write-Log '[3/6] Liberando portas ocupadas...' Cyan
$ports = @()
if ($runSite)  { $ports += $SITE_BE.Port;  $ports += $SITE_FE.Port }
if ($runRadar) { $ports += $RADAR_BE.Port; $ports += $RADAR_FE.Port }
if ($runExt)   { $ports += $EXT_BE.Port;   $ports += $EXT_FE.Port }
foreach ($pt in ($ports | Select-Object -Unique)) { Free-Port $pt }
Write-Log '  Portas verificadas' Green

# [4] Site Conta Certa
if ($runSite) {
    Write-Log '[4/6] Site Conta Certa...' Cyan
    if (Test-Port $SITE_BE.Port) { Write-Log '  Backend ja no ar (4000)' Green }
    else {
        Open-Window $SITE_BE.Path $SITE_BE.Cmd
        Start-Sleep -Seconds 4
        if (Test-Port $SITE_BE.Port) { Write-Log '  Backend OK (4000)' Green }
        else { Write-Log '  Backend subindo... acompanhe a janela aberta' Yellow }
    }
    if (Test-Port $SITE_FE.Port) { Write-Log '  Frontend ja no ar (5173)' Green }
    else {
        Open-Window $SITE_FE.Path $SITE_FE.Cmd
        Start-Sleep -Seconds 6
        if (Test-Port $SITE_FE.Port) { Write-Log '  Frontend OK (5173)' Green }
        else { Write-Log '  Frontend subindo... acompanhe a janela aberta' Yellow }
    }
}

# [5] Radar Conta Certa
if ($runRadar) {
    Write-Log '[5/6] Radar Conta Certa...' Cyan
    if (Test-Port $RADAR_BE.Port) { Write-Log '  Backend ja no ar (3001)' Green }
    else {
        Open-Window $RADAR_BE.Path $RADAR_BE.Cmd
        Write-Log '  Aguardando health do backend (ate 60s)...' Yellow
        if (Wait-Health 'http://localhost:3001/health' 60) { Write-Log '  Backend OK (3001)' Green }
        else { Write-Log '  Backend sem health em 60s - veja a janela Radar-BE' Red }
    }
    if (Test-Port $RADAR_FE.Port) { Write-Log '  Frontend ja no ar (3002)' Green }
    else {
        Open-Window $RADAR_FE.Path $RADAR_FE.Cmd
        Start-Sleep -Seconds 8
        if (Test-Port $RADAR_FE.Port) { Write-Log '  Frontend OK (3002)' Green }
        else { Write-Log '  Frontend subindo... acompanhe a janela aberta' Yellow }
    }
}

# [6] Extrator Bancario
if ($runExt) {
    Write-Log '[6/6] Extrator Bancario...' Cyan
    if (Test-Port $EXT_BE.Port) { Write-Log '  Backend ja no ar (8000)' Green }
    else {
        $extCmd = "& '" + $EXT_BE.Venv + "\Scripts\Activate.ps1'; uvicorn app.main:app --reload --host 0.0.0.0 --port " + $EXT_BE.Port
        Open-Window $EXT_BE.Path $extCmd
        Write-Log '  Aguardando FastAPI /docs (ate 45s)...' Yellow
        if (Wait-Health ('http://localhost:' + $EXT_BE.Port + '/docs') 45) { Write-Log '  Backend OK (8000)' Green }
        else { Write-Log '  Sem resposta: rode pip install -r requirements.txt no venv do extrator' Yellow }
    }
    if (Test-Port $EXT_FE.Port) { Write-Log '  Frontend ja no ar (5174)' Green }
    else {
        Open-Window $EXT_FE.Path $EXT_FE.Cmd
        Start-Sleep -Seconds 6
        if (Test-Port $EXT_FE.Port) { Write-Log '  Frontend OK (5174)' Green }
        else { Write-Log '  Frontend subindo... acompanhe a janela aberta' Yellow }
    }
}

# ============================== STATUS FINAL ==============================
Start-Sleep -Seconds 2
Write-Host ''
Write-Host '================ STATUS FINAL ================' -ForegroundColor Cyan
$rows = @()
if ($runSite) {
    $rows += [pscustomobject]@{ App = 'Site Backend';     Url = 'http://localhost:4000'; NoAr = (Test-Port 4000) }
    $rows += [pscustomobject]@{ App = 'Site Frontend';    Url = 'http://localhost:5173'; NoAr = (Test-Port 5173) }
}
if ($runRadar) {
    $rows += [pscustomobject]@{ App = 'Radar Backend';    Url = 'http://localhost:3001'; NoAr = (Test-Port 3001) }
    $rows += [pscustomobject]@{ App = 'Radar Frontend';   Url = 'http://localhost:3002'; NoAr = (Test-Port 3002) }
}
if ($runExt) {
    $rows += [pscustomobject]@{ App = 'Extrator Backend';  Url = 'http://localhost:8000'; NoAr = (Test-Port 8000) }
    $rows += [pscustomobject]@{ App = 'Extrator Frontend'; Url = 'http://localhost:5174'; NoAr = (Test-Port 5174) }
}
$rows += [pscustomobject]@{ App = 'Postgres Radar'; Url = 'localhost:5433'; NoAr = (Test-Port 5433) }
$rows | Format-Table -AutoSize

Write-Host 'Para parar: feche as janelas que foram abertas.' -ForegroundColor Gray
Write-Host "Log completo: $LOG_FILE" -ForegroundColor Gray