import React from 'react';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

import { useSelector } from 'react-redux';
import { productsSelector } from '../../redux/slices/productsSlice';

import './categories.scss';

const categories = ['All', 'New', 'Best price', 'Heroes', 'Wonder', 'Finest'];

const Categories = ({ value, onChangeCategory }) => {
	const { status } = useSelector(productsSelector);

	return (
		<div className="categories">
			<Splide
				options={{
					arrows: false,
					autoWidth: true,
					pagination: false,
					gap: 10,
				}}
			>
				{categories.map((categoryName, i) => (
					<SplideSlide key={i}>
						<button
							disabled={status === 'loading'}
							className={value === i ? 'active' : ''}
							onClick={() => onChangeCategory(i)}
						>
							{categoryName}
						</button>
					</SplideSlide>
				))}
			</Splide>
		</div>
	);
};

export default Categories;
