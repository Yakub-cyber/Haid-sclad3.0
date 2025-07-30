# 🔧 Исправление ошибки "Get Pages site failed"

## Проблема

Ошибка `Get Pages site failed. Please verify that the repository has Pages enabled` возникает, когда GitHub Pages не настроен правильно.

## ✅ Решение

### 1. Используйте обновленный workflow

Я уже обновил файл `.github/workflows/deploy.yml` на более простую версию, которая:

- Не требует предварительной настройки Pages
- Автоматически создает ветку `gh-pages`
- Работает с любым репозиторием

### 2. Правильная последовательность действий

1. **Сначала настройте права доступа:**

   - Settings → Actions → General
   - Workflow permissions: "Read and write permissions"

2. **Запустите Actions:**

   - Сделайте push в репозиторий
   - Перейдите в Actions
   - Дождитесь завершения workflow

3. **Затем настройте Pages:**
   - После успешного Actions перейдите в Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: "gh-pages" и "/(root)"

### 3. Альтернативное решение

Если проблема остается, используйте ручной деплой:

```bash
# Локально
npm run build

# Затем загрузите содержимое папки dist в ветку gh-pages
```

### 4. Проверка

После настройки ваш сайт будет доступен по адресу:
`https://YOUR_USERNAME.github.io/Haid-sclad3.0/`

## 🎯 Ключевые моменты

- **НЕ настраивайте Pages до запуска Actions**
- **Сначала запустите workflow, потом настройте Pages**
- **Используйте ветку gh-pages, а не main**
