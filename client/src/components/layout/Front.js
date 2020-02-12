import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadUser } from '../../actions/auth';
import { showTasks, addTask, deleteTask, doneTask } from '../../actions/task';
import PropTypes from 'prop-types';

const Front = ({
  loadUser,
  auth,
  showTasks,
  task: { tasks, loading, newTaskAdded },
  addTask,
  deleteTask,
  doneTask
}) => {
  useEffect(() => {
    showTasks();

    if (auth.user === null) {
      loadUser();
    }
  }, [showTasks]);

  const [newTask, setNewTask] = useState({
    newTaskName: ''
  });

  const { newTaskName } = newTask;

  const addNewTask = e =>
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  const onSubmitNewTask = async e => {
    try {
      e.preventDefault();
      await addTask({
        newTaskName
      });
      showTasks();
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteThis = async id => {
    try {
      await deleteTask(id);
      showTasks();
    } catch (err) {
      console.error(err.message);
    }
  };
  const doneToggle = async (id, value = true) => {
    try {
      await doneTask(id, value);
      showTasks();
    } catch (err) {
      console.log(err.message);
    }
  };

  return loading === true ? (
    ''
  ) : (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-12 px-0'>
          <div className='main-todo-input-wrap'>
            <div className='main-todo-input fl-wrap'>
              <form onSubmit={e => onSubmitNewTask(e)}>
                <div className='main-todo-input-item'>
                  <input
                    type='text'
                    id='todo-list-item'
                    placeholder='What will you do today?'
                    name='newTaskName'
                    value={newTaskName}
                    onChange={e => addNewTask(e)}
                  />
                </div>
                <button className='add-items main-search-button'>ADD</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-md-12 px-0'>
          <div className='main-todo-input-wrap'>
            <div className='main-todo-input fl-wrap todo-listing'>
              {tasks.map((task, index) => {
                return tasks === null || tasks.length < 1 ? (
                  ''
                ) : (
                  <Fragment>
                    <ul id='list-items'>
                      <li className='todo-lists'>
                        <input
                          className='checkbox'
                          type='checkbox'
                          name='done'
                          onChange={e => doneToggle(task._id)}
                          checked={task.isDone}
                        />

                        <span className='todo-text'>{task.name}</span>
                        <Link
                          className='remove text-right'
                          to='#'
                          onClick={e => deleteThis(task._id)}
                        >
                          <i className='fa fa-trash'></i>
                        </Link>
                        {tasks.length > 1 ? <hr /> : null}
                      </li>
                    </ul>
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Front.propTypes = {
  loadUser: PropTypes.func.isRequired,
  showTasks: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired,
  addTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  doneTask: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  task: state.task
});

export default connect(mapStateToProps, {
  loadUser,
  showTasks,
  addTask,
  deleteTask,
  doneTask
})(Front);
