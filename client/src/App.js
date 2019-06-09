import ApolloClient from 'apollo-boost';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloProviderHooks } from 'react-apollo-hooks';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './css/bootstrap.min.css';
import './css/fontawesome.css';
import './css/App.css';
import PrivateRoute from './components/auth/Auth';
import RouteError from './components/layout/RouteError';
import { AuthContext, AuthContextValue } from './components/contexts';
import Home from './components/home';
import Landing from './components/layout/Landing';
import About from './components/layout/About';
import ConfirmEmail from './components/auth/ConfirmEmail';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import PublicEvent from './components/events/publicEvent';

const client = new ApolloClient({
	uri: '/graphql',
	request: operation => {
		const accessToken = localStorage.getItem('access-token');
		const refreshToken = localStorage.getItem('refresh-token');
		if (accessToken || refreshToken) {
			operation.setContext({
				headers: {
					accesstoken: accessToken,
					refreshtoken: refreshToken
				}
			});
		}
	}
});

const App = () => (
	<ApolloProvider client={client}>
		<ApolloProviderHooks client={client}>
			<AuthContext.Provider value={AuthContextValue}>
				<div className="App">
					<Router>
						<Switch>
							<Route exact path="/" component={Landing} />
							<Route exact path="/about" component={About} />
							<PrivateRoute path="/home" component={Home} />
							<Route path="/forgot_password" component={ForgotPassword} />
							<Route path="/reset_password/:resetPwdEmailToken" component={ResetPassword} />
							<Route path="/confirmation/:emailToken" component={ConfirmEmail} />
							<Route path="/event-public-link/:id" component={PublicEvent} />
							<Route component={RouteError} />
							<Route path="/error" component={RouteError} />
						</Switch>
					</Router>
				</div>
			</AuthContext.Provider>
		</ApolloProviderHooks>
	</ApolloProvider>
);

export default App;
