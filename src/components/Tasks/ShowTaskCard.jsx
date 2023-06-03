import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Chip,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { convertTime24To12 } from "../../utils/customService/DateTimeService";

function ShowTaskCard({ tasks, updateTask, deleteTask, makeTaskImportant }) {
  return (
    <div>
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
                      "@media (max-width:768px)": { fontSize: "1em" },
                    }}
                    primaryTypographyProps={{ fontSize: "1em" }}
                    id={index}
                    primary={tasks.done ? <s>{task.title}</s> : task.title}
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
                    icon={<AccessTimeIcon />}
                    label={convertTime24To12(task?.dueTime)}
                  />
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
    </div>
  );
}

export default ShowTaskCard;
