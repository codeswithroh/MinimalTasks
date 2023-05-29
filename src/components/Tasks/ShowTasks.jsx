import { Button, Card, CardActions, CardContent, Chip } from "@mui/material";
import React from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function ShowTasks({ databases, fetchTasks, tasks }) {
  const updateTask = async (id, done) => {
    await databases.updateDocument(
      "6470526679415457d3f1",
      "64705278328cb66c07fd",
      id,
      {
        done,
      }
    );
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await databases.deleteDocument(
      "6470526679415457d3f1",
      "64705278328cb66c07fd",
      id
    );
    fetchTasks();
  };

  return (
    <div className="flex-col">
      {tasks.map((task) => (
        <Card sx={{ width: "50vw", background: "#ebeaeb" }} key={task.$id}>
          <CardContent>
            <div className="flex-row-start">
              <div>
                <input
                  style={{ width: "1.2em", height: "1.2em", cursor: "pointer" }}
                  type="checkbox"
                  checked={task.done}
                  onChange={() => updateTask(task.$id, !task.done)}
                />
              </div>
              {task.done && (
                <s>
                  <div className="text-2">{task.title}</div>
                </s>
              )}
              {!task.done && <div className="text-2">{task.title}</div>}
            </div>
          </CardContent>
          <CardActions>
            <Chip icon={<CalendarMonthIcon />} label={task?.dueDate} />
            <Chip icon={<AccessTimeIcon />} label={task?.dueTime} />
            <Button
              color="warning"
              onClick={() => deleteTask(task.$id)}
              sx={{
                ml: "auto",
                fontWeight: "bold",
              }}
              variant="contained"
            >
              Delete Task
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

export default ShowTasks;
