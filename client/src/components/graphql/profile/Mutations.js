import gql from 'graphql-tag';

export const CREATE_PROFILE = gql`
	mutation AddProfile(
		$user_ID: String!
		$name: String!
		$position: String!
		$organisation: String
		$hideSocial: Boolean
		$bio: String
		$twitter_URL: String
		$linkedin_URL: String
		$website_URL: String
		$picture_URL: String
	) {
		addProfile(
			user_ID: $user_ID
			name: $name
			position: $position
			organisation: $organisation
			hideSocial: $hideSocial
			bio: $bio
			twitter_URL: $twitter_URL
			linkedin_URL: $linkedin_URL
			website_URL: $website_URL
			picture_URL: $picture_URL
		) {
			statusCode
			ok
			errors {
				path
				message
			}
			body {
				id
				name
				position
				organisation
				hideSocial
				privateProfile
				bio
				twitter_URL
				linkedin_URL
				website_URL
				picture_URL
			}
		}
	}
`;

export const UPDATE_PROFILE = gql`
	mutation UpdateProfile(
		$_id: ID!
		$user_ID: ID!
		$name: String
		$position: String
		$organisation: String
		$hideSocial: Boolean
		$bio: String
		$twitter_URL: String
		$linkedin_URL: String
		$website_URL: String
		$picture_URL: String
	) {
		updateProfile(
			_id: $_id
			user_ID: $user_ID
			name: $name
			position: $position
			organisation: $organisation
			hideSocial: $hideSocial
			bio: $bio
			twitter_URL: $twitter_URL
			linkedin_URL: $linkedin_URL
			website_URL: $website_URL
			picture_URL: $picture_URL
		) {
			statusCode
			ok
			errors {
				path
				message
			}
			body {
				id
				name
				position
				organisation
				hideSocial
				privateProfile
				bio
				twitter_URL
				linkedin_URL
				website_URL
				picture_URL
			}
		}
	}
`;
