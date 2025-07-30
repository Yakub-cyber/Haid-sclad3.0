import React, { useState, useEffect } from 'react'
import { CartProvider, useCart } from './CartContext'
import SearchBar from './components/SearchBar.jsx'
import ProductList from './components/ProductList.jsx'
import CartModal from './components/CartModal.jsx'
import './App.css'
import { fetchProducts } from './utils/googleSheets.js'

const App = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const [isCartModalOpen, setCartModalOpen] = useState(false)
	const { addItemToCart } = useCart()
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true)
				setError(null)
				const data = await fetchProducts()
				setProducts(data)
			} catch (error) {
				console.error('Ошибка загрузки данных из Google Sheets:', error)
				setError('Ошибка загрузки данных. Попробуйте обновить страницу.')
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [])

	const filteredProducts = products.filter(
		product =>
			product.name &&
			product.name.toLowerCase().includes(searchTerm.toLowerCase())
	)

	const handleAddToCart = (
		name,
		pricePerPack,
		pricePerUnit,
		packQuantity,
		unitQuantity
	) => {
		addItemToCart(name, pricePerPack, pricePerUnit, packQuantity, unitQuantity)
	}

	return (
		<div className='app-container'>
			<h1>Поиск товаров</h1>
			<SearchBar setSearchTerm={setSearchTerm} />
			<button className='button-corzina' onClick={() => setCartModalOpen(true)}>
				Открыть корзину
			</button>
			{isCartModalOpen && <CartModal onClose={() => setCartModalOpen(false)} />}

			{loading && <div className='loading'>Загрузка данных...</div>}
			{error && <div className='error'>{error}</div>}
			{!loading && !error && (
				<ProductList
					products={filteredProducts}
					onAddToCart={handleAddToCart}
				/>
			)}
		</div>
	)
}

const AppWrapper = () => {
	return (
		<CartProvider>
			<App />
		</CartProvider>
	)
}

export default AppWrapper
