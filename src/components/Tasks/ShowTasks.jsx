import {
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import ShowTaskCard from "./ShowTaskCard";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import {
  deleteDocument,
  updateDocuments,
} from "../../utils/ApiServices/BaseService";

function ShowTasks({
  databases,
  fetchTasks,
  fetchCompletedTasks,
  tasks,
  completedTasks,
}) {
  const { category } = useParams();

  const [showCompletedTasks, setShowCompletedTasks] = useState(false);

  const updateTask = async (id, done) => {
    await updateDocuments(
      "64705278328cb66c07fd",
      id,
      {
        done,
      },
      "Task updated successfully"
    );

    fetchTasks(category);
    fetchCompletedTasks(category);
  };

  const deleteTask = async (id) => {
    await deleteDocument(
      "64705278328cb66c07fd",
      id,
      "Task deleted successfully"
    );

    fetchTasks(category);
    fetchCompletedTasks(category);
  };

  const makeTaskImportant = async (id, important) => {
    await updateDocuments(
      "64705278328cb66c07fd",
      id,
      {
        important,
      },
      "Task made important successfully"
    );
    fetchTasks(category);
  };

  const handleShowCompletedTasks = () => {
    setShowCompletedTasks(!showCompletedTasks);
  };

  return (
    <Box
      sx={{
        width: "100%",
        mb: "2em",
      }}
    >
      <List
        sx={{
          overflow: "auto",
          maxHeight: 250,
          mb: "2em",
          "@media (max-width:768px)": { maxHeight: 520 },
        }}
      >
        <ShowTaskCard
          tasks={tasks}
          updateTask={updateTask}
          deleteTask={deleteTask}
          makeTaskImportant={makeTaskImportant}
        />

        <Divider sx={{ my: "2em", mx: "1em" }} />

        <ListItemButton
          sx={{ background: "#ebeaeb", mx: "1em", borderRadius: "8px" }}
          onClick={handleShowCompletedTasks}
        >
          <ListItemIcon>
            <TaskAltIcon />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ fontSize: "1em", fontWeight: "bold" }}
            primary="Completed"
          />
          {showCompletedTasks ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
        <Collapse in={showCompletedTasks} timeout="auto" unmountOnExit>
          <ShowTaskCard
            tasks={completedTasks}
            updateTask={updateTask}
            deleteTask={deleteTask}
            makeTaskImportant={makeTaskImportant}
          />
        </Collapse>
      </List>
    </Box>
  );
}

export default ShowTasks;
