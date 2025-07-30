# 🚀 Быстрый старт

## Шаг 1: Настройка Google Cloud Console

1. Перейдите в [Google Cloud Console](https://console.cloud.google.com/)
2. Создайте новый проект или выберите существующий
3. Включите **Google Sheets API**:
   - APIs & Services → Library → Google Sheets API → Enable
4. Создайте API ключ:
   - APIs & Services → Credentials → Create Credentials → API Key
5. Ограничьте API ключ:
   - Нажмите Edit на созданном ключе
   - Application restrictions → HTTP referrers
   - Добавьте: `http://localhost:*`, `https://*.github.io`

## Шаг 2: Настройка Google Sheets

1. Откройте вашу таблицу
2. Нажмите **Share** → **Change to anyone with the link** → **Viewer**
3. Скопируйте ID таблицы из URL

## Шаг 3: Локальная разработка

```bash
# Клонирование и установка
git clone https://github.com/yourusername/Haid-sclad.git
cd Haid-sclad
npm install

# Создание .env файла
echo "VITE_GOOGLE_SHEETS_API_KEY=ваш_api_ключ" > .env
echo "VITE_SHEET_ID=ваш_id_таблицы" >> .env
echo "VITE_SHEET_NAME=Лист1" >> .env

# Тестирование API
npm run test:api ваш_api_ключ ваш_id_таблицы

# Запуск приложения
npm run dev
```

## Шаг 4: Развертывание на GitHub Pages

1. Добавьте секреты в GitHub:

   - Settings → Secrets → Actions → New repository secret
   - `GOOGLE_SHEETS_API_KEY` = ваш API ключ
   - `SHEET_ID` = ID таблицы
   - `SHEET_NAME` = Лист1

2. Закоммитьте изменения:

   ```bash
   git add .
   git commit -m "Add Google Sheets API integration"
   git push origin master
   ```

3. GitHub Actions автоматически развернет приложение

## 🎯 Проверка работы

1. Откройте приложение в браузере
2. Убедитесь, что данные загружаются
3. Проверьте поиск и корзину
4. При ошибках проверьте консоль браузера

## 🔧 Устранение проблем

### Ошибка "Missing Google Sheets API configuration"

- Проверьте файл `.env` или GitHub Secrets
- Убедитесь, что переменные начинаются с `VITE_`

### Ошибка CORS

- Проверьте ограничения API ключа в Google Cloud Console
- Добавьте домен в разрешенные

### Ошибка 403/404

- Проверьте, что Google Sheets API включен
- Убедитесь в правильности ID таблицы
- Проверьте права доступа к таблице

## 📞 Поддержка

- 📖 Подробная документация: [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)
- 🚀 Инструкция по развертыванию: [DEPLOYMENT.md](./DEPLOYMENT.md)
- 🐛 Сообщите о проблемах в Issues
