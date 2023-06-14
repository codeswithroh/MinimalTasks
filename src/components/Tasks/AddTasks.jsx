import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSession } from "../../hooks/context";
import { ID } from "appwrite";
import Card from "@mui/material/Card";
import {
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StyleIcon from "@mui/icons-material/Style";
import CustomModal from "../../utils/custom/CustomModal";
import { convertTime24To12 } from "../../utils/customService/DateTimeService";
import { createDocuments } from "../../utils/ApiServices/BaseService";

function AddTasks({ databases, fetchTasks }) {
  const { session } = useSession();
  const { type, category } = useParams();
  const [taskInput, setTaskInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [dueDateInput, setDueDateInput] = useState("");
  const [dueTimeInput, setDueTimeInput] = useState("");
  const [showDateInput, setShowDateInput] = useState(false);
  const [showTimeInput, setShowTimeInput] = useState(false);
  const [showCategoryInput, setShowCategoryInput] = useState(false);

  const addTask = async (e) => {
    e.preventDefault();
    await createDocuments(
      "64705278328cb66c07fd",
      ID.unique(),
      {
        userId: session?.userId,
        title: taskInput,
        done: false,
        important: type === "important" ? true : false,
        dueDate: dueDateInput,
        dueTime: dueTimeInput,
        categories: categoryInput || category,
      },
      "Task created successfully"
    );

    setTaskInput("");
    setDueDateInput("");
    setDueTimeInput("");
    setCategoryInput("");
    fetchTasks(type, category);
  };

  const openDateModal = () => {
    setShowDateInput(true);
  };

  const openTimeModal = () => {
    setShowTimeInput(true);
  };

  const openCategoryModal = () => {
    setShowCategoryInput(true);
  };

  return (
    <>
      <CustomModal open={showDateInput} setOpen={setShowDateInput}>
        <Card>
          <CardHeader title="  Enter Due Date" />
          <CardContent>
            <TextField
              fullWidth
              InputLabelProps={{ shrink: true }}
              name="dueDate"
              label="Due Date"
              margin="dense"
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
            <TextField
              fullWidth
              InputLabelProps={{ shrink: true }}
              name="dueTime"
              label="Due Time"
              margin="dense"
              // onChange={handleFormUpdate}
              type="time"
              sx={{ marginBottom: "1em" }}
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
      <CustomModal open={showCategoryInput} setOpen={setShowCategoryInput}>
        <Card>
          <CardHeader title="Select Category" />
          <CardContent>
            <FormControl fullWidth margin="dense">
              <InputLabel>Category</InputLabel>
              <Select
                name="categories"
                onChange={(e) => setCategoryInput(e.target.value)}
                value={categoryInput}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="work">Work</MenuItem>
                <MenuItem value="school">School</MenuItem>
                <MenuItem value="college">College</MenuItem>
                <MenuItem value="school">School</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
          <CardActions>
            <Button
              onClick={() => setShowCategoryInput(false)}
              variant="outlined"
            >
              Ok
            </Button>
          </CardActions>
        </Card>
      </CustomModal>
      <Card
        sx={{
          width: "98%",
          mb: "2em",
          mt: "1em",
          mx: "auto",
        }}
      >
        <CardContent>
          {/* <form className="flex-col"> */}
          <TextField
            fullWidth
            id="standard-basic"
            label="Enter Task"
            variant="standard"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          {/* </form> */}
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={openDateModal} aria-label="add to favorites">
            {dueDateInput ? (
              <Chip icon={<CalendarMonthIcon />} label={dueDateInput} />
            ) : (
              <CalendarMonthIcon />
            )}
          </IconButton>
          <IconButton onClick={openTimeModal} aria-label="share">
            {dueTimeInput ? (
              <Chip
                icon={<AccessTimeIcon />}
                label={convertTime24To12(dueTimeInput)}
              />
            ) : (
              <AccessTimeIcon />
            )}
          </IconButton>

          <IconButton onClick={openCategoryModal} aria-label="share">
            {categoryInput ? (
              <Chip icon={<StyleIcon />} label={categoryInput} />
            ) : (
              <StyleIcon />
            )}
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
