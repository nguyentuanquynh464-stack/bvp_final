@echo off
cd /d "%~dp0"
echo ========================================
echo   BVPSolver - Build and Deploy
echo ========================================

echo.
echo [1/4] Building web app...
call npx expo export -p web
if %errorlevel% neq 0 (echo Build failed! && pause && exit /b 1)

echo.
echo [2/4] Generating PWA icons...
call node scripts/generate-icons.js
if %errorlevel% neq 0 (echo Icon generation failed! && pause && exit /b 1)

echo.
echo [3/4] Applying PWA patch...
call node scripts/patch-web.js

echo.
echo [4/4] Deploying to Vercel...
call vercel dist --prod --yes

echo.
echo ========================================
echo   Deploy complete!
echo   https://dist-tau-eight-81.vercel.app
echo ========================================
pause
