@echo off
title Conta Certa - Inicializando...
color 0A

echo ===============================================
echo        CONTA CERTA - INICIALIZACAO
echo ===============================================
echo.

REM Verifica se Docker está rodando
echo [1/4] Verificando Docker...
docker version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERRO: Docker nao esta rodando!
    echo    Por favor, inicie o Docker Desktop primeiro.
    pause
    exit /b 1
)
echo ✅ Docker OK

REM Para containers anteriores (se existirem)
echo.
echo [2/4] Parando containers anteriores...
docker compose down >nul 2>&1
echo ✅ Containers parados

REM Constrói e sobe os containers
echo.
echo [3/4] Construindo e iniciando aplicacao...
echo    (Isso pode demorar alguns minutos na primeira vez)
docker compose up -d --build

REM Verifica se subiu corretamente
echo.
echo [4/4] Verificando status...
timeout /t 3 >nul
docker compose ps

REM Mostra informações de acesso
echo.
echo ===============================================
echo           APLICACAO INICIADA!
echo ===============================================
echo.
echo 🌐 Acesso Local:    http://localhost:3000
echo 🌐 Acesso na Rede:  http://192.168.68.102:3000
echo.
echo 📋 Para ver logs:   docker compose logs -f
echo 🛑 Para parar:      docker compose down
echo.
echo ===============================================
pause
