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
   - Branch: gh-pages (создастся автоматически)

4. **Готово!**
   - Приложение будет доступно по адресу: `https://YOUR_USERNAME.github.io/Haid-sclad3.0/`
   - Каждый push в main будет автоматически деплоить изменения

## Проверка деплоя:

- Перейдите в Actions в вашем репозитории
- Убедитесь, что workflow "Deploy to GitHub Pages" выполнился успешно
- Откройте ваш сайт по ссылке выше

## Если возникает ошибка с git:

1. Убедитесь, что репозиторий публичный
2. Проверьте, что у Actions есть права на запись в репозиторий
3. В Settings → Actions → General убедитесь, что "Workflow permissions" установлены в "Read and write permissions"
