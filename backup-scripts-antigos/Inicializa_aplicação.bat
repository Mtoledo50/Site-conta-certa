@echo off
title Conta Certa + Radar - Inicializando...
color 0A

echo ===============================================
echo   CONTA CERTA + RADAR - INICIALIZACAO
echo ===============================================
echo.

REM Verifica se Docker está rodando
echo [1/5] Verificando Docker...
docker version >nul 2>&1
if errorlevel 1 (
    echo [ERRO] Docker não está rodando!
    pause
    exit /b 1
)

echo.
echo [2/5] Parando containers existentes...
docker compose down

echo.
echo [3/5] Construindo imagens (pode demorar 5-10 min na primeira vez)...
docker compose build --no-cache

echo.
echo [4/5] Subindo todos os serviços...
docker compose up -d

echo.
echo [5/5] Aguardando inicialização (30s)...
timeout /t 30 /nobreak >nul

echo.
echo ===============================================
echo  STATUS DOS CONTAINERS
echo ===============================================
docker compose ps

echo.
echo ===============================================
echo  URLs DE ACESSO
echo ===============================================
echo.
echo  🌐 Site Conta Certa:
echo     Frontend: https://contacerta.com.br
echo     API:      https://api.contacerta.com.br
echo.
echo  📊 Radar Conta Certa:
echo     Frontend: https://radar.contacerta.com.br
echo     API:      https://radar-api.contacerta.com.br
echo.
echo  🐳 Acesso local (sem túnel):
echo     Site Frontend: http://localhost:3000
echo     Site API:      http://localhost:4000
echo     Radar Frontend: http://localhost:3002
echo     Radar API:     http://localhost:3003
echo.
echo ===============================================
echo  INICIALIZAÇÃO CONCLUÍDA
echo ===============================================

pause