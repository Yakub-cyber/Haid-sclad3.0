# Деплой на GitHub Pages

## Настройка GitHub Pages

1. **Создайте репозиторий на GitHub** с именем `Haid-sclad3.0`

2. **Загрузите код в репозиторий:**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/Haid-sclad3.0.git
   git push -u origin main
   ```

3. **Настройте GitHub Pages:**
   - Перейдите в Settings → Pages
   - В разделе "Source" выберите "GitHub Actions"
   - Это активирует автоматический деплой через Actions

## Автоматический деплой

После настройки, каждый push в ветку `main` будет автоматически:

- Устанавливать зависимости
- Собирать проект
- Деплоить на GitHub Pages

## Локальная сборка

Для тестирования сборки локально:

```bash
npm run build
npm run preview
```

## URL приложения

После деплоя ваше приложение будет доступно по адресу:
`https://YOUR_USERNAME.github.io/Haid-sclad3.0/`

## Важные замечания

- Убедитесь, что в `vite.config.js` указан правильный `base` путь
- Все API ключи и секреты должны быть настроены в GitHub Secrets
- Первый деплой может занять несколько минут
