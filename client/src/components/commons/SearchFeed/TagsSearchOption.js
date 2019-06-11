import React, { Fragment } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const TagsSearchOption = ({ tags, tagsPool, addTag, deleteTag }) => {
	return (
		<Fragment>
			<div className="dropdown">
				<Link
					to="#"
					className="ml-2"
					data-toggle="dropdown"
					role="button"
					aria-haspopup="true"
					aria-expanded="false"
					data-togggle="tooltip"
					data-placement="bottom"
					title="Apply Filters"
				>
					<span className={classNames('m-0', { 'text-blue': tags.length !== 0 })}>
						<small>
							<i className="fas fa-tags mx-2 mt-2" />
							Filter by Tags
						</small>
					</span>
				</Link>
				<ul className="dropdown-menu scrollable-menu">
					{tagsPool.sort().map(tag => (
						<li
							key={Math.random()
								.toString(36)
								.substring(2, 7)}
						>
							<Link className="dropdown-item py-0 my-0" to="#" onClick={e => addTag(e, tag)}>
								<small>{tag}</small>
							</Link>
						</li>
					))}
				</ul>
			</div>
			{tags.length !== 0 ? (
				<div>
					{tags.sort().map(tag => (
						<small
							key={Math.random()
								.toString(36)
								.substring(2, 7)}
						>
							<Link to="#" onClick={e => deleteTag(e, tag)}>
								<span className="badge tag actiontags mt-1">
									{tag} <i className="fas fa-times ml-1" />
								</span>
							</Link>
						</small>
					))}
				</div>
			) : null}
		</Fragment>
	);
};

export default TagsSearchOption;
