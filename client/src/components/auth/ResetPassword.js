import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import DefaultNav from '../navs/DefaultNav';
import decode from 'jwt-decode';
import Footer from '../layout/Footer';
import { Mutation } from 'react-apollo';
import { RESET_USER_PASSWORD } from '../graphql/user/Mutations';
import { findErrorInErrorsArr } from '../commons/ErrorsHandling';
import { InputField } from '../commons/InputComponents';

const ResetPassword = props => {
	const [user_ID, setUser_ID] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [errors, setErrors] = useState([]);
	const [success, setSuccess] = useState(false);
	const [tokenError, setTokenError] = useState(null);

	useEffect(() => {
		const token = props.match.params.resetPwdEmailToken;
		const getUser = token => {
			try {
				return decode(token);
			} catch (err) {
				setTokenError(err);
			}
		};
		const user = getUser(token);
		console.log(user);
		if (user && user.id) {
			setUser_ID(user.id);
		}
		return;
	}, []);

	if (tokenError) return <Redirect to="/" />;
	const onChange = e => {
		if (errors) setErrors(errors.filter(error => error.path !== e.target.name));
		if (e.target.name === 'password') setPassword(e.target.value);
		if (e.target.name === 'password2') setPassword2(e.target.value);
	};

	const passwordChange = async (resetPassword, e) => {
		e.preventDefault();
		if (password !== password2) {
			errors.push(
				{
					path: 'password',
					message: "Your passwords don't match"
				},
				{
					path: 'password2',
					message: "Your passwords don't match"
				}
			);
		} else {
			const response = await resetPassword({
				variables: {
					user_ID,
					newPassword: password
				}
			});
			const { ok, errors } = response.data.resetPassword;
			if (!ok) setErrors(errors);
			if (ok) setSuccess(true);
		}
	};

	console.log(props);
	return (
		<div>
			<DefaultNav />
			<div className="container">
				<div className="row">
					<div className="col mt-2 bg-white">
						<div className="p-4">
							<h4 className="text-left">
								Reset <span className="font-weight-bold text-blue">Password</span>
							</h4>

							{!success ? (
								<Mutation mutation={RESET_USER_PASSWORD}>
									{(resetPassword, e) => (
										<form className="p-4" onSubmit={e => passwordChange(resetPassword, e)}>
											<InputField
												type="text"
												placeholder="New Password"
												name="password"
												value={password}
												onChange={onChange}
												error={findErrorInErrorsArr(errors, 'password')}
											/>

											<InputField
												type="text"
												placeholder="Confirm new password"
												name="password2"
												value={password2}
												onChange={onChange}
												error={findErrorInErrorsArr(errors, 'password2')}
											/>
											<input type="submit" className="btn bg-blue text-white btn-block mt-4 mb-2" />
										</form>
									)}
								</Mutation>
							) : (
								<div className="px-4">
									Your password has been changed, click{' '}
									<Link to="/" className="font-weight-bold text-blue">
										here
									</Link>{' '}
									to login again.
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default ResetPassword;
