import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import StyleIcon from "@mui/icons-material/Style";
import { convertTime24To12 } from "../../utils/customService/DateTimeService";

function ShowTaskCard({
  tasks,
  updateTask,
  editTask,
  deleteTask,
  makeTaskImportant,
}) {
  const taskCards = useRef();
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});

  const handleEdit = (task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleFormUpdate = (e) => {
    setSelectedTask({ ...selectedTask, [e.target.name]: e.target.value });
  };

  const handleClose = () => setOpen(false);

  const handleSaveChanges = (e) => {
    e.preventDefault();
    const payload = {
      title: selectedTask?.title,
      dueDate: selectedTask?.dueDate,
      dueTime: selectedTask?.dueTime,
      important: selectedTask?.important,
      categories: selectedTask?.categories,
    };
    editTask(selectedTask?.$id, payload);
    handleClose();
  };

  return (
    <div ref={taskCards}>
      {tasks
        .map((task, index) => (
          <ListItem key={index}>
            <Card
              sx={{
                width: "100%",
                background: "#ebeaeb",
              }}
              key={task.$id}
            >
              <CardContent>
                <ListItemButton role={undefined} dense>
                  <ListItemIcon
                    onClick={() => updateTask(task.$id, !task.done)}
                  >
                    <Checkbox
                      edge="start"
                      checked={task.done}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": index }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      fontSize: "1.2em",
                      textDecoration: `${task?.done ? "line-through" : "none"}`,
                      "@media (max-width:768px)": { fontSize: "1em" },
                    }}
                    primaryTypographyProps={{
                      fontSize: "1em",
                    }}
                    id={index}
                    primary={task.title}
                  />
                  <ListItemIcon
                    onClick={() => makeTaskImportant(task.$id, !task.important)}
                    edge="end"
                    aria-label="comments"
                  >
                    {task?.important ? (
                      <StarIcon
                        sx={{
                          size: "25px",
                          color: "#81688d",
                        }}
                      />
                    ) : (
                      <StarBorderIcon />
                    )}
                  </ListItemIcon>
                </ListItemButton>
              </CardContent>
              <CardActions>
                <div>
                  {task?.dueDate && (
                    <Chip
                      className="mobile-font"
                      icon={<CalendarMonthIcon />}
                      label={task?.dueDate}
                    />
                  )}
                  {task?.dueTime && (
                    <Chip
                      className="mobile-font"
                      sx={{ marginLeft: "0.5em" }}
                      icon={<AccessTimeIcon />}
                      label={convertTime24To12(task?.dueTime)}
                    />
                  )}
                  {task?.categories && (
                    <Chip
                      className="mobile-font"
                      sx={{ marginLeft: "0.5em" }}
                      icon={<StyleIcon />}
                      label={task?.categories}
                    />
                  )}
                </div>
                {!task?.done && (
                  <Button
                    color="secondary"
                    onClick={() => handleEdit(task)}
                    sx={{
                      fontSize: "0.7em",
                      ml: "auto",
                      fontWeight: "bold",
                    }}
                    variant="contained"
                  >
                    Edit Task
                  </Button>
                )}
                <Button
                  color="warning"
                  onClick={() => deleteTask(task.$id)}
                  sx={{
                    fontSize: "0.7em",
                    ml: "auto",
                    fontWeight: "bold",
                  }}
                  variant="contained"
                >
                  Delete Task
                </Button>
              </CardActions>
            </Card>
          </ListItem>
        ))
        .reverse()}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            name="title"
            label="Task Name"
            margin="dense"
            sx={{ marginBottom: "1em" }}
            onChange={handleFormUpdate}
            value={selectedTask?.title}
          />
          <TextField
            fullWidth
            InputLabelProps={{ shrink: true }}
            name="dueDate"
            label="Due Date"
            margin="dense"
            onChange={handleFormUpdate}
            type="date"
            sx={{ marginBottom: "1em" }}
            value={selectedTask?.dueDate}
          />
          <TextField
            fullWidth
            InputLabelProps={{ shrink: true }}
            name="dueTime"
            label="Due Time"
            margin="dense"
            onChange={handleFormUpdate}
            type="time"
            sx={{ marginBottom: "1em" }}
            value={selectedTask?.dueTime}
          />
          <FormControl
            component="fieldset"
            margin="dense"
            sx={{ marginBottom: "1em" }}
          >
            <div>Important</div>
            <RadioGroup
              aria-label="important"
              label="important"
              name="important"
              onChange={(e) =>
                setSelectedTask({
                  ...selectedTask,
                  important: e.target.value === "true",
                })
              }
              row
              value={selectedTask?.important?.toString()}
            >
              <FormControlLabel control={<Radio />} label="Yes" value="true" />
              <FormControlLabel control={<Radio />} label="No" value="false" />
            </RadioGroup>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select
              name="categories"
              onChange={handleFormUpdate}
              value={selectedTask?.categories}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="work">Work</MenuItem>
              <MenuItem value="school">School</MenuItem>
              <MenuItem value="college">College</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ShowTaskCard;
