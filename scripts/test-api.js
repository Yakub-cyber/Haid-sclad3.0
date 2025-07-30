#!/usr/bin/env node

/**
 * Скрипт для тестирования Google Sheets API
 * Использование: node scripts/test-api.js [API_KEY] [SHEET_ID] [SHEET_NAME]
 */

import fetch from 'node-fetch'

const API_KEY = process.argv[2]
const SHEET_ID = process.argv[3] || '1ecYUS0bEILKFANqXx3H0X7dLy-SoYiZo'
const SHEET_NAME = process.argv[4] || 'Лист1'

if (!API_KEY) {
	console.error('❌ Ошибка: Не указан API ключ')
	console.log(
		'Использование: node scripts/test-api.js [API_KEY] [SHEET_ID] [SHEET_NAME]'
	)
	process.exit(1)
}

async function testGoogleSheetsAPI() {
	console.log('🧪 Тестирование Google Sheets API...\n')

	try {
		// Тест 1: Проверка доступа к API
		console.log('1️⃣ Тестирование доступа к API...')
		const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`

		const response = await fetch(url)

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`)
		}

		const data = await response.json()

		if (!data.values || data.values.length === 0) {
			throw new Error('Таблица пуста или не содержит данных')
		}

		console.log('✅ API доступен и возвращает данные')
		console.log(`📊 Найдено строк: ${data.values.length}`)
		console.log(`📋 Заголовки: ${data.values[0].join(', ')}\n`)

		// Тест 2: Проверка структуры данных
		console.log('2️⃣ Проверка структуры данных...')
		const headers = data.values[0]
		const requiredColumns = [
			'Наименование',
			'Опт',
			'Розничный клиент',
			'Склад',
			'Постоянные клиенты',
		]

		const missingColumns = requiredColumns.filter(col => !headers.includes(col))

		if (missingColumns.length > 0) {
			console.warn('⚠️  Отсутствуют колонки:', missingColumns.join(', '))
		} else {
			console.log('✅ Все необходимые колонки найдены')
		}

		// Тест 3: Проверка данных
		console.log('\n3️⃣ Проверка данных...')
		const rows = data.values.slice(1)
		const validRows = rows.filter(row => row.length > 0 && row[0])

		console.log(`📈 Всего строк с данными: ${validRows.length}`)

		if (validRows.length > 0) {
			const sampleRow = validRows[0]
			console.log('📝 Пример первой строки:')
			headers.forEach((header, index) => {
				console.log(`   ${header}: ${sampleRow[index] || 'пусто'}`)
			})
		}

		// Тест 4: Проверка CSV экспорта
		console.log('\n4️⃣ Тестирование CSV экспорта...')
		const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`
		const csvResponse = await fetch(csvUrl)

		if (csvResponse.ok) {
			console.log('✅ CSV экспорт доступен')
		} else {
			console.warn('⚠️  CSV экспорт недоступен (возможно, таблица приватная)')
		}

		console.log('\n🎉 Все тесты завершены успешно!')
		console.log('\n📋 Рекомендации:')
		console.log('- Убедитесь, что API ключ имеет ограничения по доменам')
		console.log('- Проверьте, что Google Sheets API включен в проекте')
		console.log('- Для продакшена настройте GitHub Secrets')
	} catch (error) {
		console.error('❌ Ошибка при тестировании:', error.message)

		if (error.message.includes('403')) {
			console.log('\n🔧 Возможные решения:')
			console.log('- Проверьте, что Google Sheets API включен в проекте')
			console.log('- Убедитесь, что API ключ активен')
			console.log('- Проверьте ограничения API ключа')
		} else if (error.message.includes('404')) {
			console.log('\n🔧 Возможные решения:')
			console.log('- Проверьте правильность ID таблицы')
			console.log('- Убедитесь, что таблица существует')
			console.log('- Проверьте права доступа к таблице')
		}

		process.exit(1)
	}
}

testGoogleSheetsAPI()
