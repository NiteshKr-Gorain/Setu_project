@echo off
echo Starting Setu Full Stack Application (Backend + Frontend)...
start "Setu Backend (Port 8000)" cmd /k "cd /d "%~dp0backend" && .\venv\Scripts\python.exe main.py"
start "Setu Frontend (Port 5173)" cmd /k "cd /d "%~dp0frontend" && npm run dev"
