import _ from 'lodash';
import { FETCH_POSTS } from '../actions';
import { FETCH_POST } from '../actions';

export default function (state = {}, action) {
	switch (action.type){
	case FETCH_POSTS:
		return _.mapKeys(action.payload.data, 'id');
	case FETCH_POST:
		/*const post = action.payload.data;
		const newState =  { ...state  };
		newState[post.id] = post;
		return newState;*/
					// key interpolation
					//whatever the variable action payload data ideas make a new key on this object using
					// this value right here v and set its value equal v action
		return { ...state, [action.payload.data.id]: action.payload.data };
	default:
		return state;	
	}
}