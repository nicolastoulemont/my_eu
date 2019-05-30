require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema/schema');
const models = require('./models');
const Loaders = require('./utils/DataLoaders');
const connectDB = require('./config/db');
const { AuthUser } = require('./utils/user/auth');
const RateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const redis = require('redis');

const startServer = async () => {
	await connectDB();

	const server = new ApolloServer({
		schema,
		context: ({ req }) => ({
			user: AuthUser(req),
			models,
			Loaders
		}),
		formatError: error => ({
			path: error.path,
			message: error.message,
			code: error.extensions.code
		}),
		playground: true
	});

	const app = express();

	// Server static assets in prod
	if (process.env.NODE_ENV === 'production') {
		// Set static folder
		app.use(express.static('client/build'));
		// Serve html file
		app.get('*', (req, res) => {
			res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
		});
	}

	app.use(helmet());

	app.set('trust proxy', 1);

	const limiter = new RateLimit({
		store: new RedisStore({
			client: redis
		}),
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 100,
		delayMs: 0
	});

	app.use(limiter);

	server.applyMiddleware({ app });

	const PORT = process.env.PORT || 4000;

	app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/graphql?`));
};

startServer();
