import React, { createContext, useState, useContext } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([])

	// Добавление массива позиций
	const addItemToCart = items => {
		setCart(prevCart => {
			const updatedCart = [...prevCart]
			items.forEach(newItem => {
				const idx = updatedCart.findIndex(
					item =>
						item.name === newItem.name && item.priceType === newItem.priceType
				)
				if (idx !== -1) {
					updatedCart[idx].quantity += newItem.quantity
				} else {
					updatedCart.push({ ...newItem })
				}
			})
			return updatedCart
		})
	}

	const updateItemQuantity = (name, priceType, quantity) => {
		setCart(prevCart =>
			prevCart.map(item =>
				item.name === name && item.priceType === priceType
					? { ...item, quantity }
					: item
			)
		)
	}

	const removeItemFromCart = (name, priceType) => {
		setCart(prevCart =>
			prevCart.filter(
				item => !(item.name === name && item.priceType === priceType)
			)
		)
	}

	const clearCart = () => setCart([])

	return (
		<CartContext.Provider
			value={{
				cart,
				addItemToCart,
				updateItemQuantity,
				removeItemFromCart,
				clearCart,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}

export const useCart = () => useContext(CartContext)
