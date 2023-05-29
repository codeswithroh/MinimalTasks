import React, { useState } from "react";
import { useSession } from "../../hooks/context";
import { ID } from "appwrite";
import Card from "@mui/material/Card";
import {
  Button,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  TextField,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CustomModal from "../../utils/custom/CustomModal";

function AddTasks({ databases, fetchTasks }) {
  const { session } = useSession();
  const [taskInput, setTaskInput] = useState("");
  const [dueDateInput, setDueDateInput] = useState("");
  const [dueTimeInput, setDueTimeInput] = useState("");
  const [showDateInput, setShowDateInput] = useState(false);
  const [showTimeInput, setShowTimeInput] = useState(false);

  const addTask = async (e) => {
    e.preventDefault();
    await databases.createDocument(
      "6470526679415457d3f1",
      "64705278328cb66c07fd",
      ID.unique(),
      {
        userId: session?.$id,
        title: taskInput,
        done: false,
        important: false,
        dueDate: dueDateInput,
        dueTime: dueTimeInput,
      }
    );
    setTaskInput("");
    setDueDateInput("");
    setDueTimeInput("");
    fetchTasks();
  };

  const openDateModal = () => {
    setShowDateInput(true);
  };

  const openTimeModal = () => {
    setShowTimeInput(true);
  };

  return (
    <>
      <CustomModal open={showDateInput} setOpen={setShowDateInput}>
        <Card>
          <CardHeader title="  Enter Due Date" />
          <CardContent>
            <input
              style={{ width: "90%" }}
              className="date-input"
              type="date"
              value={dueDateInput}
              onChange={(e) => setDueDateInput(e.target.value)}
            />
          </CardContent>
          <CardActions>
            <Button onClick={() => setShowDateInput(false)} variant="outlined">
              Ok
            </Button>
          </CardActions>
        </Card>
      </CustomModal>
      <CustomModal open={showTimeInput} setOpen={setShowTimeInput}>
        <Card>
          <CardHeader title="  Enter Due Time" />
          <CardContent>
            <input
              style={{ width: "90%" }}
              type="time"
              value={dueTimeInput}
              onChange={(e) => setDueTimeInput(e.target.value)}
            />
          </CardContent>
          <CardActions>
            <Button onClick={() => setShowTimeInput(false)} variant="outlined">
              Ok
            </Button>
          </CardActions>
        </Card>
      </CustomModal>
      <Card
        sx={{
          mb: "2em",
          mt: "5em",
          width: "50vw",
        }}
      >
        <CardContent>
          <form className="flex-col">
            <TextField
              fullWidth
              id="standard-basic"
              label="Enter Task"
              variant="standard"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />
          </form>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={openDateModal} aria-label="add to favorites">
            <CalendarMonthIcon />
          </IconButton>
          <IconButton onClick={openTimeModal} aria-label="share">
            <AccessTimeIcon />
          </IconButton>
          <Button
            onClick={addTask}
            sx={{ ml: "auto", fontWeight: "bold", backgroundColor: "#81688d" }}
            variant="contained"
          >
            Add Task
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default AddTasks;
