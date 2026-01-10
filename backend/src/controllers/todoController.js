const db = require("../database/db");

exports.createTodoList = (req, res) => {
  const { date, tasks } = req.body;
  db.query(
    "INSERT INTO todo_lists (date) VALUES (?)", [date], (err, result) => {
      if (err) return res.status(500).json(err);

      const listId = result.insertId;
      const values = tasks.map(t => [listId, t.text, t.completed]);

      db.query(
        "INSERT INTO tasks (list_id, text, completed) VALUES ?", [values], () => res.status(201).json({ id: listId })
      );
    }
  );
};

exports.getAllTodos = (req, res) => {
  db.query(
    `SELECT l.id, l.date,
     JSON_ARRAYAGG(
       JSON_OBJECT(
         'text', t.text,
         'completed', t.completed
       )
     ) AS tasks FROM todo_lists l JOIN tasks t ON l.id = t.list_id GROUP BY l.id`,
    (err, results) => { if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
};

exports.getTodoById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM todo_lists WHERE id = ?", [id],
    (err, lists) => {
      if (!lists.length) return res.status(404).json({ msg: "Not found" });

      db.query(
        "SELECT text, completed FROM tasks WHERE list_id = ?", [id],
        (err, tasks) => {
          res.json({ id, date: lists[0].date, tasks });
        }
      );
    }
  );
};

exports.updateTodo = (req, res) => {
  const { id } = req.params;
  const { tasks } = req.body;

  db.query("DELETE FROM tasks WHERE list_id = ?", [id], () => {
    const values = tasks.map(t => [ id, t.text, t.completed ]);

    db.query(
      "INSERT INTO tasks (list_id, text, completed) VALUES ?", [values],
      () => res.json({ msg: "Updated" })
    );
  });
};

exports.deleteTodo = (req, res) => {
  db.query(
    "DELETE FROM todo_lists WHERE id = ?", [req.params.id], () => res.json({ msg: "Deleted" })
  );
};

