import React, { Fragment } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const TypeSearchOptions = ({
	type,
	setTypeToNone,
	setTypeToInstitutional,
	setTypeTopoliticalParty
}) => {
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
					title="Select by Type"
				>
					<span className={classNames('m-0', { 'text-blue': type !== '' })}>
						<small>
							<i className="fas fa-university mx-2 mt-2" />
							Filter by Type
						</small>
					</span>
				</Link>
				<ul className="dropdown-menu dropdown-menu-right">
					<li>
						<Link
							className={classNames('dropdown-item py-0 my-0', {
								'text-blue': type === ''
							})}
							to="#"
							onClick={setTypeToNone}
						>
							<small>None</small>
						</Link>
					</li>
					<li>
						<Link
							className={classNames('dropdown-item py-0 my-0', {
								'text-blue': type === 'institutional'
							})}
							to="#"
							onClick={setTypeToInstitutional}
						>
							<small>Institutional</small>
						</Link>
					</li>
					<li>
						<Link
							className={classNames('dropdown-item py-0 my-0', {
								'text-blue': type === 'political party'
							})}
							to="#"
							onClick={setTypeTopoliticalParty}
						>
							<small>Political Party</small>
						</Link>
					</li>
				</ul>
			</div>
		</Fragment>
	);
};

export default TypeSearchOptions;
