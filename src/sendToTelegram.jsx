import axios from 'axios'

// Функция для отправки данных в Telegram
export const sendToTelegram = async cartData => {
	const botToken = '7902481935:AAFU51NsKHKqlaIkxSYMyJKX3ov8zT6c_rI'
	const chatId = '1437540633'

	// Формируем текстовое сообщение для Telegram
	let message = '*Новый заказ:*\n\n'
	let total = 0

	cartData.forEach(item => {
		const sum = item.price * item.quantity
		total += sum
		message += `\n${item.name} — ${item.priceType}\nЦена: ${item.price}₽\nКоличество: ${item.quantity}\nСумма: ${sum}₽\n`
	})

	message += `\n*Итого: ${total}₽*`

	// Отправляем текстовое сообщение
	const urlText = `https://api.telegram.org/bot${botToken}/sendMessage`
	try {
		await axios.post(urlText, {
			chat_id: chatId,
			text: message,
			parse_mode: 'Markdown',
		})
		alert('Заказ отправлен!')
	} catch (error) {
		console.error('Ошибка отправки в Telegram:', error)
		alert('Произошла ошибка при отправке заказа.')
	}
}
