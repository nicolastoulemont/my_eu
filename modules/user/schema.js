const { gql, AuthenticationError } = require('apollo-server');
const {
	registerUser,
	verifyEmail,
	sendVerifyEmail,
	publicEventRegistration,
	registerAndLogin,
	userLogin,
	handleForgotPwdEmail,
	changeEmail,
	changePassword,
	resetPassword,
	deleteAccount
} = require('./actions');
const {
	validateRegInput,
	validateLoginInput,
	validatePublicEventRegistrationInput,
	validateFindUserForgotPwdInput,
	validateChangeEmailInput,
	validateChangePasswordInput,
	validateDeleteAccountInput
} = require('./validation');
const { findCurrentUser } = require('./queries');

module.exports = {
	UserType: gql`
		type User {
			id: ID!
			email: String!
			access: String!
			verified: Boolean
			acceptedTerms: Boolean
			createdAt: Date
			updatedAt: Date
			profile: [Profile]
			events: [EventItem]
			registrations: [Registration]
			memberships: [Membership]
			comments: [CommentItem]
			polls: [Poll]
			likes: [Like]
			reports: [Report]
			userLog: UserLog
		}

		type UserResponse implements Response {
			statusCode: Int!
			ok: Boolean!
			errors: [Error]
			token: String
			body: User
		}

		type AuthResponse implements Response {
			statusCode: Int!
			ok: Boolean!
			errors: [Error]
			accessToken: String
			refreshToken: String
			body: User
		}

		extend type Query {
			user(id: ID!): User
			currentUser: AuthResponse!
			users: [User!]!
		}

		extend type Mutation {
			register(email: String!, password: String!): UserResponse!
			verifyEmail(_id: ID!): AuthResponse!
			sendVerifyEmail(_id: ID!, email: String!): UserResponse!
			publicEventRegistration(
				email: String!
				password: String!
				name: String!
				position: String!
				organisation: String!
				eventName: String!
				eventCity: String!
				eventAddress: String!
				eventStart: String!
				eventEnd: String!
				event_ID: ID!
			): AuthResponse!
			registerAndLogin(email: String!, password: String!): UserResponse!
			login(email: String!, password: String!): AuthResponse!
			validateUserForgotPassword(email: String!): UserResponse!
			sendForgotPwdEmail(email: String!): UserResponse!
			changeEmail(user_ID: ID!, email: String!, password: String!): UserResponse!
			changePassword(user_ID: ID!, currentPassword: String!, newPassword: String!): UserResponse!
			resetPassword(user_ID: ID!, newPassword: String!): UserResponse!
			deleteAccount(user_ID: ID!, email: String!, password: String!): UserResponse!
		}
	`,
	// Resolvers
	UserRes: {
		Query: {
			user: async (parent, args, { user, models: { User } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				try {
					return await User.findById(args.id);
				} catch (err) {
					throw new Error('Bad request');
				}
			},
			currentUser: async (parent, args, { user, models: { User } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				return await findCurrentUser(user, User);
			},
			users: async (parent, args, { user, models: { User } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				try {
					return await User.find({});
				} catch (err) {
					throw new Error('Bad request');
				}
			}
		},

		User: {
			profile: async (parent, args, { Loaders: { userProfilesLoader } }) =>
				await userProfilesLoader.load(parent.id),
			events: async (parent, args, { Loaders: { userEventsLoader } }) =>
				await userEventsLoader.load(parent.id),
			registrations: async (parent, args, { models: { Registration } }) =>
				await Registration.find({ user_ID: parent.id }),
			memberships: async (parent, args, { models: { Membership } }) =>
				await Membership.find({ user_ID: parent.id }),
			comments: async (parent, args, { Loaders: { userCommentsLoader } }) =>
				await userCommentsLoader.load(parent.id),
			polls: async (parent, args, { models: { Poll } }) => await Poll.find({ user_ID: parent.id }),
			likes: async (parent, args, { Loaders: { userLikesLoader } }) =>
				await userLikesLoader.load(parent.id),
			reports: async (parent, args, { Loaders: { userReportsLoader } }) =>
				await userReportsLoader.load(parent.id),
			userLog: async (parent, args, { models: { UserLog } }) =>
				await UserLog.findOne({ user_ID: parent.id })
		},

		Mutation: {
			register: async (parent, args, { models: { User } }) => {
				const { errors, isValid } = await validateRegInput(args);
				if (!isValid) return { statusCode: 400, ok: false, errors };
				return await registerUser(args, User);
			},
			verifyEmail: async (parent, args, { models: { User } }) => {
				return await verifyEmail(args, User);
			},
			sendVerifyEmail: async (parent, args) => {
				return await sendVerifyEmail(args);
			},
			publicEventRegistration: async (parent, args, { models }) => {
				const { errors, isValid } = await validatePublicEventRegistrationInput(args);
				if (!isValid) return { statusCode: 400, ok: false, errors };
				return await publicEventRegistration(args, models);
			},
			registerAndLogin: async (parent, args, { models: { User } }) => {
				const { errors, isValid } = await validateRegInput(args);
				if (!isValid) return { statusCode: 400, ok: false, errors };
				return await registerAndLogin(args, User);
			},
			login: async (parent, args) => {
				const { errors, isValid, user } = await validateLoginInput(args);
				if (!isValid) return { statusCode: 400, ok: false, errors, body: user };
				return await userLogin(user);
			},
			validateUserForgotPassword: async (parent, args) => {
				const { errors, isValid, user } = await validateFindUserForgotPwdInput(args);
				if (!isValid) return { statusCode: 400, ok: false, errors, body: user };
				if (isValid)
					return {
						statusCode: 200,
						ok: true,
						body: user
					};
			},
			sendForgotPwdEmail: async (parent, args, { models: { User } }) => {
				return await handleForgotPwdEmail(args, User);
			},
			changeEmail: async (parent, args, { user, models: { User } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				if (user.id !== args.user_ID)
					throw new AuthenticationError('Please login to get the requested response');
				const { errors, isValid, targetUser } = await validateChangeEmailInput(args);
				if (!isValid) return { statusCode: 400, ok: false, errors };
				return await changeEmail(args, targetUser, User);
			},
			changePassword: async (parent, args, { user, models: { User } }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				if (user.id !== args.user_ID)
					throw new AuthenticationError('Please login to get the requested response');
				const { errors, isValid, targetUser } = await validateChangePasswordInput(args);
				if (!isValid) return { statusCode: 400, ok: false, errors };
				return await changePassword(args, targetUser, User);
			},
			resetPassword: async (parent, args, { models: { User } }) => {
				return await resetPassword(args, User);
			},
			deleteAccount: async (parent, args, { user, models }) => {
				if (!user) throw new AuthenticationError('Please login to get the requested response');
				if (user.id !== args.user_ID)
					throw new AuthenticationError('Please login to get the requested response');
				const { errors, isValid, targetUser } = await validateDeleteAccountInput(args);
				if (!isValid) return { statusCode: 400, ok: false, errors };
				return await deleteAccount(targetUser, models);
			}
		}
	}
};
