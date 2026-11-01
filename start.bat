@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Портфолио — локальный сайт

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo  [!] Не найден Node.js.
  echo      Скачай версию LTS с https://nodejs.org , установи с настройками по умолчанию
  echo      и запусти этот файл ещё раз.
  echo.
  start "" https://nodejs.org/ru/download
  pause
  exit /b 1
)

echo.
echo  Проверяю зависимости (при первом запуске это 1-2 минуты)...
echo.
call npm install --no-audit --no-fund
if errorlevel 1 (
  echo.
  echo  [!] Установка не удалась. Пришли текст ошибки выше.
  pause
  exit /b 1
)

echo.
echo  Сайт запускается: http://localhost:4321
echo  Чтобы остановить — закрой это окно или нажми Ctrl+C.
echo.
start "" /min cmd /c "timeout /t 5 >nul & start http://localhost:4321"
call npm run dev
pause
