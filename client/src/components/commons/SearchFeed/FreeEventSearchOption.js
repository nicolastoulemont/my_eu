import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const FreeEventSearchOption = ({ handlePrice, price }) => {
	return (
		<Fragment>
			<Link
				to="#"
				className="ml-2"
				data-togggle="tooltip"
				data-placement="bottom"
				title="Only show free events"
				onClick={handlePrice}
			>
				{' '}
				<span className={classNames('m-0', { 'text-blue': price === 0 })}>
					<small>
						<i className="fab fa-creative-commons-nc-eu mx-2 mt-2" />
						Free Events Only
					</small>
				</span>
			</Link>
		</Fragment>
	);
};

export default FreeEventSearchOption;
