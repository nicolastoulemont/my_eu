import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DefaultNav from '../navs/DefaultNav';
import Footer from '../layout/Footer';
import { Mutation } from 'react-apollo';
import { VALIDATE_USER_FORGOT_PWD, SEND_FORGOT_PWD_EMAIL } from '../graphql/user/Mutations';
import { findErrorInErrorsArr } from '../commons/ErrorsHandling';
import { InputField } from '../commons/InputComponents';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const [foundEmail, setFoundEmail] = useState('');
	const [errors, setErrors] = useState([]);
	const [tryCount, setTryCount] = useState(0);
	const [successOne, setSuccessOne] = useState(false);
	const [successTwo, setSuccessTwo] = useState(false);

	const onChange = e => {
		if (errors) setErrors(errors.filter(error => error.path !== e.target.name));
		if (e.target.name === 'email') setEmail(e.target.value.toLowerCase());
	};

	const searchForUser = async (validateUserForgotPassword, e) => {
		e.preventDefault();
		if (tryCount >= 3) return;
		const response = await validateUserForgotPassword({ variables: { email: email } });
		const { ok, errors, body } = response.data.validateUserForgotPassword;
		if (!ok) {
			setErrors(errors);
			setTryCount(tryCount + 1);
		} else {
			setFoundEmail(body.email);
			setSuccessOne(true);
		}
	};

	const sendEmail = async (sendForgotPwdEmail, e) => {
		e.preventDefault();
		const response = await sendForgotPwdEmail({ variables: { email: foundEmail } });
		console.log(response);
		const { ok, errors } = response.data.sendForgotPwdEmail;
		if (!ok) {
			setErrors(errors);
		} else {
			setSuccessTwo(true);
		}
	};

	return (
		<div>
			<DefaultNav />
			<div className="container">
				<div className="row">
					<div className="col mt-2 bg-white">
						<div className="p-4">
							<h4 className="text-left px-4">
								Forgot <span className="font-weight-bold text-blue">password</span>
							</h4>
							{!successOne ? (
								<Mutation mutation={VALIDATE_USER_FORGOT_PWD}>
									{(validateUserForgotPassword, e) => (
										<form className="p-4">
											<InputField
												type="text"
												placeholder="Find Email"
												name="email"
												value={email}
												onChange={onChange}
												error={findErrorInErrorsArr(errors, 'email')}
											/>
											{tryCount !== 0 ? (
												<span className="text-danger m-0 p-0">
													<small>You have {3 - tryCount} tries left</small>
												</span>
											) : null}

											<input
												type="submit"
												onClick={e => searchForUser(validateUserForgotPassword, e)}
												className="btn bg-blue text-white btn-block mt-4 mb-2"
											/>
										</form>
									)}
								</Mutation>
							) : (
								<div className="px-4">
									{!successTwo ? (
										<div>
											<h6 className="d-inline">Send a reset password email to {foundEmail} ?</h6>
											<Mutation mutation={SEND_FORGOT_PWD_EMAIL}>
												{(sendForgotPwdEmail, e) => (
													<Link
														to="#"
														className="d-inline btn bg-blue text-white mx-4"
														onClick={e => sendEmail(sendForgotPwdEmail, e)}
													>
														Send <i className="far fa-envelope ml-2" />
													</Link>
												)}
											</Mutation>
										</div>
									) : (
										<p>
											We sent an email to{' '}
											<span className="font-weight-bold text-blue">{foundEmail}</span>. Click on the
											link in the email to reset your password. If you don't see the email, check
											other places where it might be, such as your junk mail, spam, social, or other
											folders.
										</p>
									)}
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

export default ForgotPassword;
