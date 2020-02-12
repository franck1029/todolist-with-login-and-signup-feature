import axios from 'axios';

const setAuthToken = tokens => {
	if(tokens) {
		axios.defaults.headers.common['x-auth-token'] = tokens
	} else {
		delete axios.defaults.headers.common['x-auth-token']
	}
}

export default setAuthToken;