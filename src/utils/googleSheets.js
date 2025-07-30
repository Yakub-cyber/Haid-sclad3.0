// Google Sheets API utility functions

const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY
const SHEET_ID =
	import.meta.env.VITE_SHEET_ID || '1ecYUS0bEILKFANqXx3H0X7dLy-SoYiZo'
const SHEET_NAME = import.meta.env.VITE_SHEET_NAME || 'Лист1'

// Debug logging
console.log('Google Sheets Config:', {
	API_KEY: API_KEY ? 'Set' : 'Not set',
	SHEET_ID,
	SHEET_NAME,
})

/**
 * Fetch data from Google Sheets using the API
 * @returns {Promise<Array>} Array of product objects
 */
export async function fetchSheetData() {
	try {
		if (!API_KEY) {
			throw new Error('API key not configured')
		}

		if (!SHEET_ID) {
			throw new Error('Sheet ID not configured')
		}

		const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`

		const response = await fetch(url)

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const data = await response.json()

		if (!data.values || data.values.length === 0) {
			throw new Error('No data found in the sheet')
		}

		// Parse the data (assuming first row contains headers)
		const headers = data.values[0]
		const rows = data.values.slice(1)

		// Map the data to our expected format
		const products = rows
			.filter(row => row.length > 0 && row[0]) // Filter out empty rows
			.map(row => {
				const product = {}
				headers.forEach((header, index) => {
					const value = row[index] || ''

					// Map specific columns to our expected format
					switch (header) {
						case 'Наименование':
							product.name = value
							break
						case 'Опт':
							product.price_per_pack = parseFloat(value) || 0
							break
						case 'Розничный клиент':
							product.retail = parseFloat(value) || 0
							break
						case 'Склад':
							product.stock = parseFloat(value) || 0
							break
						case 'Постоянные клиенты':
							product.regular = parseFloat(value) || 0
							break
						default:
							// Store any additional columns
							product[header] = value
					}
				})
				return product
			})

		return products
	} catch (error) {
		console.error('Error fetching data from Google Sheets API:', error)
		throw error
	}
}

/**
 * Fallback function to fetch data using CSV export (for backward compatibility)
 * @returns {Promise<Array>} Array of product objects
 */
export async function fetchSheetDataCSV() {
	try {
		const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`

		const response = await fetch(SHEET_CSV_URL)
		const csvText = await response.text()

		return new Promise((resolve, reject) => {
			// Import Papa Parse dynamically to avoid SSR issues
			import('papaparse').then(({ default: Papa }) => {
				Papa.parse(csvText, {
					header: true,
					skipEmptyLines: true,
					complete: results => {
						const formattedData = results.data
							.filter(row => row['Наименование'])
							.map(row => ({
								name: row['Наименование'],
								price_per_pack: parseFloat(row['Опт']) || 0,
								retail: parseFloat(row['Розничный клиент']) || 0,
								stock: parseFloat(row['Склад']) || 0,
								regular: parseFloat(row['Постоянные клиенты']) || 0,
							}))
						resolve(formattedData)
					},
					error: error => {
						reject(error)
					},
				})
			})
		})
	} catch (error) {
		console.error('Error fetching data from Google Sheets CSV:', error)
		throw error
	}
}

/**
 * Main function to fetch data with fallback
 * @returns {Promise<Array>} Array of product objects
 */
export async function fetchProducts() {
	// For now, use CSV export directly since API key is not configured
	console.log('Using CSV export method')
	return await fetchSheetDataCSV()
}
