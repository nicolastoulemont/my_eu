import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../contexts/InitialState';
import { tagsList } from '../TagsList';
import classNames from 'classnames';
import ActivitiesSearchOptions from './ActivitiesSearchOptions';
import TypeSearchOptions from './TypeSearchOption';
import FreeEventSearchOption from './FreeEventSearchOption';
import TagsSearchOption from './TagsSearchOption';

const FeedSearch = ({
	date,
	setSearch,
	sort,
	setSort,
	type,
	setType,
	price,
	setPrice,
	setDisplayRegistrations,
	displayRegistrations,
	tags,
	setTags,
	errors,
	setErrors
}) => {
	const [{ userSearchPref }, dispatch] = useStateValue();

	const handleSearch = e => {
		if (errors.length !== 0) setErrors([]);
		if (e.keyCode === 13) setSearch(e.target.value);
		if (e.target.value.length === 0) setSearch('');
	};

	const [advancedSearch, setAdvancedSearch] = useState(true);
	const [tagsPool, setTagsPool] = useState(tagsList.filter(item => !tags.includes(item)));

	const addTag = (e, tag) => {
		e.preventDefault();
		dispatch({
			type: 'SET_TAGS',
			newTags: {
				sort: userSearchPref.sort,
				type: userSearchPref.type,
				price: userSearchPref.price,
				tags: [...tags, tag]
			}
		});
		setTags([...tags, tag]);
		setTagsPool(tagsPool.filter(item => item !== tag));
	};

	const deleteTag = (e, tag) => {
		e.preventDefault();
		dispatch({
			type: 'SET_TAGS',
			newTags: {
				sort: userSearchPref.sort,
				type: userSearchPref.type,
				price: userSearchPref.price,
				tags: tags.filter(item => item !== tag)
			}
		});
		setTagsPool([tag, ...tagsPool]);
		setTags(tags.filter(item => item !== tag));
	};

	const handleAscending = () => {
		dispatch({
			type: 'SET_SORT',
			newSort: {
				sort: 'ascending',
				type: userSearchPref.type,
				price: userSearchPref.price,
				tags: userSearchPref.tags
			}
		});
		setSort('ascending');
	};

	const handleDescending = () => {
		dispatch({
			type: 'SET_SORT',
			newSort: {
				sort: 'descending',
				type: userSearchPref.type,
				price: userSearchPref.price,
				tags: userSearchPref.tags
			}
		});
		setSort('descending');
	};

	const setTypeToInstitutional = () => {
		dispatch({
			type: 'SET_TYPE',
			newType: {
				sort: userSearchPref.sort,
				type: 'institutional',
				price: userSearchPref.price,
				tags: userSearchPref.tags
			}
		});
		setType('institutional');
	};
	const setTypeTopoliticalParty = () => {
		dispatch({
			type: 'SET_TYPE',
			newType: {
				sort: userSearchPref.sort,
				type: 'political party',
				price: userSearchPref.price,
				tags: userSearchPref.tags
			}
		});
		setType('political party');
	};
	const setTypeToNone = () => {
		dispatch({
			type: 'SET_TYPE',
			newType: {
				sort: userSearchPref.sort,
				type: '',
				price: userSearchPref.price,
				tags: userSearchPref.tags
			}
		});
		setType('');
	};

	const handlePrice = () => {
		if (price === 0) {
			dispatch({
				type: 'SET_PRICE',
				newPrice: {
					sort: userSearchPref.sort,
					type: userSearchPref.type,
					price: 10000,
					tags: userSearchPref.tags
				}
			});
			setPrice(10000);
		}
		if (price === 10000) {
			dispatch({
				type: 'SET_PRICE',
				newPrice: {
					sort: userSearchPref.sort,
					type: userSearchPref.type,
					price: 0,
					tags: userSearchPref.tags
				}
			});
			setPrice(0);
		}
	};

	const path = window.location.pathname;

	return (
		<div className="mx-auto py-0 px-2 sticky bg-white border-bottom ">
			<div className="row">
				<div className="col">
					<h6 className="text-left"> {date}</h6>
				</div>
			</div>

			<div className="row">
				<div className="col">
					<div className={classNames('input-group input-group-sm', { 'mb-3': !advancedSearch })}>
						<input
							className={classNames('form-control form-control-lg rounded-pill', {
								'is-invalid': errors.length !== 0
							})}
							type="text"
							placeholder="Search..."
							onKeyUp={e => handleSearch(e)}
						/>
						<div className="input-group-append">
							<Link
								to="#"
								data-togggle="tooltip"
								data-placement="bottom"
								title="Sort from earliest to lastest"
								onClick={handleAscending}
							>
								{' '}
								{sort === 'ascending' ? (
									<i className="fas fa-sort-amount-down text-blue mx-2 mt-2" />
								) : (
									<i className="fas fa-sort-amount-down mx-2 mt-2" />
								)}
							</Link>
							<Link
								to="#"
								data-togggle="tooltip"
								data-placement="bottom"
								title="Sort from lastest to earliest"
								onClick={handleDescending}
							>
								{' '}
								{sort === 'descending' ? (
									<i className="fas fa-sort-amount-up text-blue mx-2 mt-2" />
								) : (
									<i className="fas fa-sort-amount-up mx-2 mt-2" />
								)}
							</Link>
							<Link
								to="#"
								data-togggle="tooltip"
								data-placement="bottom"
								title="Show advanced search parameters"
								onClick={e => setAdvancedSearch(!advancedSearch)}
							>
								{advancedSearch ? (
									<i className="fas fa-chevron-up mx-2 mt-2" />
								) : (
									<i className="fas fa-chevron-down mx-2 mt-2" />
								)}
							</Link>
						</div>
						{errors.length !== 0 ? (
							<Fragment>
								{errors.map(error => (
									<small
										className="invalid-feedback text-left"
										key={Math.random()
											.toString(36)
											.substring(2, 7)}
									>
										{error.message}
									</small>
								))}
							</Fragment>
						) : null}
					</div>
				</div>
			</div>

			{advancedSearch && (
				<div className={classNames('row justify-content-end pr-2', { 'mb-2': advancedSearch })}>
					<div className="d-flex flex-row-reverse pr-2">
						{path.includes('news') || path.includes('events') ? (
							<TypeSearchOptions
								type={type}
								setTypeToNone={setTypeToNone}
								setTypeToInstitutional={setTypeToInstitutional}
								setTypeTopoliticalParty={setTypeTopoliticalParty}
							/>
						) : null}

						{path.includes('events') && (
							<FreeEventSearchOption handlePrice={handlePrice} price={price} />
						)}

						{!path.includes('activities') && (
							<TagsSearchOption
								tags={tags}
								tagsPool={tagsPool}
								addTag={addTag}
								deleteTag={deleteTag}
							/>
						)}

						{path.includes('activities') && (
							<ActivitiesSearchOptions
								setDisplayRegistrations={setDisplayRegistrations}
								displayRegistrations={displayRegistrations}
							/>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default FeedSearch;
