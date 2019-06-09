const { rootQuery } = require('./root');
const { ResponseType } = require('./response');
const { DateType, DateRes } = require('./date');
const { s3Type, s3Res } = require('./s3');
const { UserType, UserRes } = require('../modules/user/schema');
const { OrganisationType, OrganisationRes } = require('../modules/organisation/schema');
const { MembershipType, MembershipRes } = require('../modules/membership/schema');
const { EventType, EventRes } = require('../modules/event/schema');
const { PostType, PostRes } = require('../modules/post/schema');
const { ProfileType, ProfileRes } = require('../modules/profile/schema');
const { CommentType, CommentRes } = require('../modules/comment/schema');
const { PollType, PollRes } = require('../modules/poll/schema');
const { LikeType, LikeRes } = require('../modules/like/schema');
const { ReportType, ReportRes } = require('../modules/report/schema');
const { RegistrationType, RegistrationRes } = require('../modules/registration/schema');
const { UserLogType, UserLogRes } = require('../modules/userlogs/schema');

const { makeExecutableSchema } = require('graphql-tools');

const resolvers = {};

module.exports = schema = makeExecutableSchema({
	typeDefs: [
		rootQuery,
		ResponseType,
		DateType,
		s3Type,
		UserType,
		OrganisationType,
		EventType,
		PostType,
		ProfileType,
		CommentType,
		PollType,
		LikeType,
		ReportType,
		RegistrationType,
		MembershipType,
		UserLogType
	],
	resolvers: [
		DateRes,
		s3Res,
		UserRes,
		OrganisationRes,
		EventRes,
		PostRes,
		ProfileRes,
		CommentRes,
		PollRes,
		LikeRes,
		ReportRes,
		RegistrationRes,
		MembershipRes,
		UserLogRes
	],
	resolverValidationOptions: {
		requireResolversForResolveType: false
	}
});
