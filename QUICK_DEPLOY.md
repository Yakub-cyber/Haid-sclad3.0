# Быстрый деплой на GitHub Pages

## Шаги для деплоя:

1. **Создайте репозиторий на GitHub:**

   - Название: `Haid-sclad3.0`
   - Публичный репозиторий

2. **Загрузите код:**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/Haid-sclad3.0.git
   git push -u origin main
   ```

3. **Настройте GitHub Pages:**

   - Settings → Pages
   - Source: GitHub Actions

4. **Готово!**
   - Приложение будет доступно по адресу: `https://YOUR_USERNAME.github.io/Haid-sclad3.0/`
   - Каждый push в main будет автоматически деплоить изменения

## Проверка деплоя:

- Перейдите в Actions в вашем репозитории
- Убедитесь, что workflow "Deploy to GitHub Pages" выполнился успешно
- Откройте ваш сайт по ссылке выше
