const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Task = require('../../models/Task');
const { check, validationResult } = require('express-validator');

//@route       GET api/tasks
//@description Show tasks
//@access      Public

router.get('/', auth, async (req, res) => {
  try {
    let tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route       PUT api/tasks/add
//@description Add task
//@access      Public

router.put(
  '/add',
  auth,
  [
    check('name', 'Task name is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name } = req.body;
    try {
      //see if task already exists

      tasks = new Task({
        user: req.user.id,
        name
      });

      await tasks.save();
      res.json(tasks);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route       PUT /api/tasks/done/:id
//@description Done task
//@access      Private

router.put('/done/:id', auth, async (req, res) => {
  const { value } = req.body;
  try {
    let _task = await Task.findById(req.params.id);
    let falseTask = await Task.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...'name', isDone: !_task.isDone ? value : false } },
      { new: true }
    );

    await falseTask.save();
    res.json(_task);

    res.json(user.tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route       Edit api/tasks/edit/:id
//@description Edit task name
//@access      Public

router.put('/edit/:id', auth, async (req, res) => {
  const { updatedTask } = req.body;
  try {
    let task = await Task.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { name: updatedTask } },
      { new: true }
    );

    await task.save();

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route       Delete /api/tasks/delete/:id
//@description Add task
//@access      Public

router.delete('/delete/:id', auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Task has been deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
