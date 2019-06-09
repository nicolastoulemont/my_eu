const User = require('../modules/user/model');
const Profile = require('../modules/profile/model');
const CommentItem = require('../modules/comment/model');
const EventItem = require('../modules/event/model');
const Post = require('../modules/post/model');
const Like = require('../modules/like/model');
const Report = require('../modules/report/model');
const Registration = require('../modules/registration/model');
const Membership = require('../modules/membership/model');
const Organisation = require('../modules/organisation/model');
const Poll = require('../modules/poll/model');
const UserLog = require('../modules/userlogs/model');

module.exports = {
	User,
	Profile,
	CommentItem,
	EventItem,
	Post,
	Like,
	Report,
	Registration,
	Membership,
	Organisation,
	Poll,
	UserLog
};
