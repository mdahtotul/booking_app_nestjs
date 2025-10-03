@echo off
:: This script provides an interactive menu to run common development and testing commands.

:MENU
cls
echo.
echo ==================================================
echo   Batch Command Runner Menu
echo ==================================================
echo.
echo "[1] Start Dev Server (pnpm start:dev)"
echo "[2] Docker Restart (down && up)"
echo "[3] Docker Hard Reset (prune all data && up)"
echo "[4] Run E2E Tests (pnpm test:e2e)"
echo "[5] Run Integration Tests (pnpm test:it)"
echo "[6] Run All Tests (pnpm test)"
echo "[7] Test DB Reset (pnpm db:test:reset)"
echo.
echo [0] Exit Script
echo ==================================================
echo.

:: Prompt the user for a choice
set /p CHOICE="Enter your choice (0-7): "

:: Handle user input
if "%CHOICE%"=="1" goto DEV_SERVER
if "%CHOICE%"=="2" goto DOCKER_RESTART
if "%CHOICE%"=="3" goto DOCKER_HARD_RESET
if "%CHOICE%"=="4" goto TEST_E2E
if "%CHOICE%"=="5" goto TEST_IT
if "%CHOICE%"=="6" goto TEST_ALL
if "%CHOICE%"=="7" goto TEST_DB_RESET
if "%CHOICE%"=="0" goto END

:: Handle invalid input
echo Invalid choice. Please enter a number from 0 to 7.
pause >nul
goto MENU

:: --- COMMAND DEFINITIONS ---

:DEV_SERVER
cls
echo.
echo Running: pnpm start:dev... (Press CTRL+C to stop the server)
echo.
pnpm start:dev
goto END_ACTION

:DOCKER_RESTART
cls
echo.
echo Running: docker compose down && docker compose up...
echo.
docker compose down && docker compose up
goto END_ACTION

:DOCKER_HARD_RESET
cls
echo.
echo WARNING: This command will remove all unused Docker volumes, networks, and images.
echo Running: Docker Hard Reset...
echo.
docker compose down && docker system prune -a -f && docker volume prune -f && docker network prune -f && docker compose up
goto END_ACTION

:TEST_E2E
cls
echo.
echo Running: pnpm test:e2e...
echo.
pnpm test:e2e
goto END_ACTION

:TEST_IT
cls
echo.
echo Running: pnpm test:it...
echo.
pnpm test:it
goto END_ACTION

:TEST_ALL
cls
echo.
echo Running: pnpm test...
echo.
pnpm test
goto END_ACTION

:TEST_DB_RESET
cls
echo.
echo Running: pnpm db:test:reset...
echo.
pnpm db:test:reset
goto END_ACTION

:: --- FLOW CONTROLS ---

:END_ACTION
echo.
echo ==================================================
echo Command finished.
echo.
:: Only pause if the command was not the dev server (which blocks the script)
if not "%CHOICE%"=="1" (
    pause
    goto MENU
)
goto END

:END
cls
echo Exiting Batch Command Runner.
exit /b
