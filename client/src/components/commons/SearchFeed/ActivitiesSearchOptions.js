import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const ActivitiesSearchOptions = ({ setDisplayRegistrations, displayRegistrations }) => {
	return (
		<Fragment>
			<Link
				to="#"
				className="ml-2"
				data-togggle="tooltip"
				data-placement="bottom"
				title="Show your events"
				onClick={e => setDisplayRegistrations(false)}
			>
				<span className={classNames('m-0', { 'text-blue': !displayRegistrations })}>
					<small>
						<i className="far fa-calendar mx-2 mt-2" />
						Show your events
					</small>
				</span>
			</Link>
			<Link
				to="#"
				className="ml-2"
				data-togggle="tooltip"
				data-placement="bottom"
				title="Show your registrations"
				onClick={e => setDisplayRegistrations(true)}
			>
				<span className={classNames('m-0', { 'text-blue': displayRegistrations })}>
					<small>
						<i className="fas fa-bookmark mx-2 mt-2" />
						Show your registrations
					</small>
				</span>
			</Link>
		</Fragment>
	);
};

export default ActivitiesSearchOptions;
