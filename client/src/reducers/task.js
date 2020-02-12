import { ADD_TASK_SUCCESS, ADD_TASK_FAIL, SHOW_TASKS_SUCCESS, SHOW_TASKS_FAIL, DELETE_TASK_SUCCESS, DELETE_TASK_FAIL, DONE_TASK_SUCCESS, DONE_TASK_FAIL} from '../actions/types';

const initialState = {
	tasks: null,
	loading: true,
	newTaskAdded: null
};


export default function(state = initialState, action) {
	const { type, payload } = action;

	switch(type) {
		case SHOW_TASKS_SUCCESS:
		return {
			...state,
			tasks: payload,
			loading: false
		};
		case ADD_TASK_SUCCESS:
		return {
			...state,
			newTaskAdded: payload,
			loading: false	
		};
		case DELETE_TASK_SUCCESS:
		case DONE_TASK_SUCCESS:
		return {
			...state,
			...payload,
			loading: false
		}

		case ADD_TASK_FAIL:
		case SHOW_TASKS_FAIL:
		case DELETE_TASK_FAIL:
		case DONE_TASK_FAIL:
		return {
			...state,
			loading: false,
			newTaskAdded: null		
		}
		default:
		return state;
	}


};