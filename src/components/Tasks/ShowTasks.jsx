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
// import AlertService from "../../utils/customService/AlertService";

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
    await databases.updateDocument(
      "6470526679415457d3f1",
      "64705278328cb66c07fd",
      id,
      {
        done,
      }
    );
    // AlertService("Task updated successfully", "success");

    fetchTasks(category);
    fetchCompletedTasks(category);
  };

  const deleteTask = async (id) => {
    await databases.deleteDocument(
      "6470526679415457d3f1",
      "64705278328cb66c07fd",
      id
    );
    fetchTasks(category);
    fetchCompletedTasks(category);
  };

  const makeTaskImportant = async (id, important) => {
    await databases.updateDocument(
      "6470526679415457d3f1",
      "64705278328cb66c07fd",
      id,
      {
        important,
      }
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
      }}
    >
      <List
        sx={{
          overflow: "auto",
          maxHeight: 350,
          "@media (max-width:768px)": { maxHeight: 550 },
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
