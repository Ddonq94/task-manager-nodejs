const express = require("express");
const router = express.Router();
const {
  getAll,
  getOne,
  add,
  edit,
  deleteOne,
} = require("../controllers/tasks");

router.route("/").get(getAll).post(add);
router.route("/:id").get(getOne).patch(edit).delete(deleteOne);

module.exports = router;
