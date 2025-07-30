import React from 'react'

const SearchBar = ({ setSearchTerm }) => {
	return (
		<div className='search-container'>
			<input
				type='text'
				placeholder='Поиск товара...'
				onChange={e => setSearchTerm(e.target.value)}
			/>
		</div>
	)
}

export default SearchBar
