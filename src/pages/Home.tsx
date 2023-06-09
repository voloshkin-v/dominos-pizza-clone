import React, { useEffect, useCallback } from 'react';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';

import { SortItem } from '../redux/filter/types';
import { Status } from '../redux/products/types';

import { fetchData } from '../redux/products/asyncAction';

import { sortSelector, filterSelector } from '../redux/filter/selectors';
import { productsSelector } from '../redux/products/selectors';

import { setCategoryId, setSort } from '../redux/filter/slice';

import {
	Categories,
	Sort,
	PizzaBlock,
	ErrorMessage,
	CardSkeletons,
	NotFoundBlock,
	Filters,
} from '../components';

const Home: React.FC = () => {
	const dispatch = useAppDispatch();

	const sortType = useSelector(sortSelector);
	const { categoryId } = useSelector(filterSelector);
	const { items, status } = useSelector(productsSelector);
	const { searchValue } = useSelector(filterSelector);

	useEffect(() => {
		const query = searchValue ? `q=${searchValue}` : '';
		const category = categoryId === 0 ? '' : `&category=${categoryId}`;
		const sort =
			sortType.name === 'Default'
				? ''
				: `&_sort=${sortType.slug}&_order=${sortType.orderBy}`;

		dispatch(
			fetchData({
				query,
				category,
				sort,
			})
		);
	}, [categoryId, sortType, searchValue]);

	const renderItems = () => {
		if (status === Status.ERROR || items.length === 0) {
			return;
		}

		const pizzaItems = items.map((item) => (
			<PizzaBlock key={item.id} {...item} />
		));

		return <ul className="content__items">{pizzaItems}</ul>;
	};

	const onChangeCategory = useCallback((id: number) => {
		dispatch(setCategoryId(id));
	}, []);

	const onChangeSort = useCallback((sortType: SortItem) => {
		dispatch(setSort(sortType));
	}, []);

	const listItems = renderItems();
	const error = status === Status.ERROR ? <ErrorMessage /> : null;

	const skeleton =
		status === Status.LOADING ? <CardSkeletons itemsCount={8} /> : null;

	const notFound =
		status === Status.SUCCESS && items.length === 0 ? (
			<NotFoundBlock />
		) : null;

	return (
		<>
			<div className="content__top">
				<Categories
					value={categoryId}
					onChangeCategory={onChangeCategory}
				/>
				<Sort value={sortType} onChangeSort={onChangeSort} />
			</div>

			<Filters />

			<h2 className="content__title">All the Pizzas</h2>

			{listItems}
			{skeleton}
			{error}
			{notFound}
		</>
	);
};

export default Home;
