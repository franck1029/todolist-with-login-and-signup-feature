import axios from 'axios';
import { ADD_TASK_SUCCESS, ADD_TASK_FAIL, SHOW_TASKS_SUCCESS, SHOW_TASKS_FAIL, DELETE_TASK_SUCCESS, DELETE_TASK_FAIL, DONE_TASK_SUCCESS, DONE_TASK_FAIL } from './types';
import { setAlert } from './alert';


//Show tasks

export const showTasks = () => async dispatch => {
	const token = localStorage.getItem('tokens')
	const config = {
	
		'x-auth-token': token
	};

	const body = {}

	try {
		const res = await axios.get('/api/tasks', body, config);
		dispatch({
			type: SHOW_TASKS_SUCCESS,
			payload: res.data
		})

	} catch (err) {
		dispatch({
			type: SHOW_TASKS_FAIL
		})
	}	
};








//Add task

export const addTask = ({ newTaskName }) => async dispatch => {
	const token = localStorage.getItem('tokens');
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'x-auth-token': token
		}
	};

	const name = newTaskName;

	const body = {
		name
	};

	try {
		const res = await axios.put('/api/tasks/add', body, config);
		dispatch({
			type: ADD_TASK_SUCCESS,
			payload: res.data
		});

	} catch (err) {
		const errors = err.response.data.errors;

		if(errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		};

		dispatch({
			type: ADD_TASK_FAIL
		})

	};
}
	//Delete task

export const deleteTask = id => async dispatch => {
	const token = localStorage.getItem('tokens');
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'x-auth-token': token
		}
	};

	const body = {};

	try {
		const res = await axios.delete(`/api/tasks/delete/${id}`, body, config);
		dispatch({
			type: DELETE_TASK_SUCCESS,
			payload: res.data
		});

	} catch (err) {
		const errors = err.response.data.errors;

		if(errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		};

		dispatch({
			type: DELETE_TASK_FAIL
		})

	};

};

export const doneTask = (id, value) => async dispatch => {
	const token = localStorage.getItem('tokens');
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'x-auth-token': token
		}
	};

	const body = JSON.stringify({ value })

	try {
		const res = await axios.put(`/api/tasks/done/${id}`, body, config);
		dispatch({
			type: DONE_TASK_SUCCESS,
			payload: res.data
		});

	} catch (err) {
		const errors = err.response.data.errors;

		if(errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		};

		dispatch({
			type: DONE_TASK_FAIL
		})

	};

};





