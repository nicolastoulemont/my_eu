const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
	user_ID: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	abstract: {
		type: String,
		required: true
	},
	eventHost: {
		type: String,
	},
	banner_URL: String,
	description: {
		type: String,
		required: true
	},
	isPublic: {
		type: Boolean,
		default: true
	},
	showComments: {
		type: Boolean,
		default: true
	},
	type: {
		type: String
	},
	price: {
		type: Number,
		default: 0
	},
	city: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	updatedAt: {
		type: Date,
		default: Date.now()
	},
	start: {
		type: Date
	},
	end: {
		type: Date
	},
	likesCount: {
		type: Number,
		default: 0
	},
	scraped: {
		type: Boolean,
		default: false,
		required: true
	},
	authorName: {
		type: String
	},
	author_URL: {
		type: String
	},
	authorPicture_URL: {
		type: String
	},
	eventOrigin_URL: {
		type: String
	},
	tags: {
		type: [String]
	}
});

module.exports = mongoose.model('Event', eventSchema);
