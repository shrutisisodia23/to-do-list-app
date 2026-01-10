const express = require("express");
const router = express.Router();
const controller = require("../controllers/todoController");

router.post("/", controller.createTodoList);
router.get("/", controller.getAllTodos);
router.get("/:id", controller.getTodoById);
router.put("/:id", controller.updateTodo);
router.delete("/:id", controller.deleteTodo);

module.exports = router;

