import React, { useState, useEffect } from 'react'

const ProductList = ({ products, onAddToCart }) => {
	// counts: { [name]: { pack, retail, stock, regular } }
	const [counts, setCounts] = useState({})

	// Инициализация счетчиков для новых товаров
	useEffect(() => {
		setCounts(prev => {
			const updated = { ...prev }
			products.forEach(product => {
				if (!updated[product.name]) {
					updated[product.name] = { pack: 0, retail: 0, stock: 0, regular: 0 }
				}
			})
			// Удаляем счетчики для товаров, которых больше нет
			Object.keys(updated).forEach(name => {
				if (!products.find(p => p.name === name)) {
					delete updated[name]
				}
			})
			return updated
		})
	}, [products])

	const increment = (name, type) => {
		setCounts(prev => ({
			...prev,
			[name]: { ...prev[name], [type]: prev[name][type] + 1 },
		}))
	}

	const decrement = (name, type) => {
		setCounts(prev => ({
			...prev,
			[name]: {
				...prev[name],
				[type]: Math.max(0, prev[name][type] - 1),
			},
		}))
	}

	const handleAddToCart = product => {
		const {
			pack = 0,
			retail = 0,
			stock = 0,
			regular = 0,
		} = counts[product.name] || {}
		const items = []
		if (pack > 0)
			items.push({
				name: product.name,
				priceType: 'Опт',
				price: product.price_per_pack,
				quantity: pack,
			})
		if (retail > 0)
			items.push({
				name: product.name,
				priceType: 'Розничный клиент',
				price: product.retail,
				quantity: retail,
			})
		if (stock > 0)
			items.push({
				name: product.name,
				priceType: 'Склад',
				price: product.stock,
				quantity: stock,
			})
		if (regular > 0)
			items.push({
				name: product.name,
				priceType: 'Постоянные клиенты',
				price: product.regular,
				quantity: regular,
			})
		if (items.length > 0) {
			onAddToCart(items)
			setCounts(prev => ({
				...prev,
				[product.name]: { pack: 0, retail: 0, stock: 0, regular: 0 },
			}))
		}
	}

	return (
		<div className='product-list'>
			{products.length > 0 ? (
				products.map(product => (
					<div key={product.name} className='product-card'>
						<h3>{product.name}</h3>
						<div className='price-line'>
							<h4>Опт: {product.price_per_pack}₽</h4>
							<div className='counter'>
								<button onClick={() => decrement(product.name, 'pack')}>
									-
								</button>
								<span>{counts[product.name]?.pack || 0}</span>
								<button onClick={() => increment(product.name, 'pack')}>
									+
								</button>
							</div>
						</div>
						<div className='price-line'>
							<h4>Розничный клиент: {product.retail}₽</h4>
							<div className='counter'>
								<button onClick={() => decrement(product.name, 'retail')}>
									-
								</button>
								<span>{counts[product.name]?.retail || 0}</span>
								<button onClick={() => increment(product.name, 'retail')}>
									+
								</button>
							</div>
						</div>
						<div className='price-line'>
							<h4>Склад: {product.stock}₽</h4>
							<div className='counter'>
								<button onClick={() => decrement(product.name, 'stock')}>
									-
								</button>
								<span>{counts[product.name]?.stock || 0}</span>
								<button onClick={() => increment(product.name, 'stock')}>
									+
								</button>
							</div>
						</div>
						<div className='price-line'>
							<h4>Постоянные клиенты: {product.regular}₽</h4>
							<div className='counter'>
								<button onClick={() => decrement(product.name, 'regular')}>
									-
								</button>
								<span>{counts[product.name]?.regular || 0}</span>
								<button onClick={() => increment(product.name, 'regular')}>
									+
								</button>
							</div>
						</div>
						<button
							className='add-corzine'
							onClick={() => handleAddToCart(product)}
						>
							Добавить в корзину
						</button>
					</div>
				))
			) : (
				<p>Товары не найдены</p>
			)}
		</div>
	)
}

export default ProductList
