import React, { Fragment } from 'react';

const TypeHandler = ({ type, feed }) => {
	return (
		<Fragment>
			{type === 'institutional' && (
				<Fragment>
					-
					<i
						data-togggle="tooltip"
						data-placement="bottom"
						title={`Institutional ${feed}`}
						className="fas fa-university mx-2"
					/>
				</Fragment>
			)}
			{type === 'political party' && (
				<Fragment>
					-
					<i
						data-togggle="tooltip"
						data-placement="bottom"
						title={`Political party ${feed}`}
						className="fas fa-bullhorn text-muted mx-2"
					/>
				</Fragment>
			)}
		</Fragment>
	);
};

export default TypeHandler;
