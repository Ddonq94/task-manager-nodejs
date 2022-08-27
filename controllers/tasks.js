const asyncWrap = require("../middleware/async");
const Task = require("../models/Task");
const { createCustomError } = require("../errors/customError");

const getAll = asyncWrap(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const getOne = asyncWrap(async (req, res, next) => {
  const { id: taskID } = req.params;

  const task = await Task.findOne({ _id: taskID });

  if (!task) {
    return next(createCustomError(`No matching task for is ${taskID}`, 404));
  }

  res.status(200).json({ task });
});

const add = asyncWrap(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const edit = asyncWrap(async (req, res, next) => {
  const { id: taskID } = req.params;
  const { body } = req;
  const task = await Task.findOneAndUpdate({ _id: taskID }, body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No matching task for is ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

const deleteOne = asyncWrap(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No matching task for is ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

module.exports = {
  getAll,
  getOne,
  add,
  edit,
  deleteOne,
};
