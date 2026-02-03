@echo off
cd /d "C:\Users\zxcmodee\Desktop\3d_website"
echo === Инициализируем Git репозиторий ===
git init
echo.
echo === Добавляем все файлы ===
git add .
echo.
echo === Первый коммит ===
git commit -m "Initial commit: Soyuz 3D website"
echo.
echo === Проверяем статус ===
git status
echo.
echo === История ===
git log --oneline
echo.
echo === Теперь нужно создать репозиторий на GitHub ===
echo 1. Перейди на https://github.com/new
echo 2. Назови репозиторий: soyuz-3d
echo 3. Нажми Create repository
echo 4. Запусти эту команду (скопируй из инструкций GitHub):
echo.
echo    git remote add origin https://github.com/ТВ0Й_ЮЗЕР/soyuz-3d.git
echo    git branch -M main
echo    git push -u origin main
echo.
pause
