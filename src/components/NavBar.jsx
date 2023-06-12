import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useSession } from "../hooks/context";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import SchoolIcon from "@mui/icons-material/School";
import EngineeringIcon from "@mui/icons-material/Engineering";
import NightlifeIcon from "@mui/icons-material/Nightlife";
import WorkIcon from "@mui/icons-material/Work";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: "auto",
    marginRight: "auto",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  backgroundColor: "transparent",
  // boxShadow: "none",
  color: "black",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function NavBar({ children }) {
  const { session, setSession } = useSession();
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const initialSideBar = [
    {
      text: "SignUp",
      icon: (
        <IconButton aria-label="signup">
          <HowToRegIcon />
        </IconButton>
      ),
      onClick: () => navigate("/signup"),
    },
    {
      text: "Login",
      icon: (
        <IconButton aria-label="login">
          <LoginIcon />
        </IconButton>
      ),
      onClick: () => navigate("/login"),
    },
  ];

  const initialCategorySideBar = [
    {
      text: "My Tasks",
      icon: (
        <IconButton aria-label="incomplete">
          <AssignmentIcon />
        </IconButton>
      ),
      onClick: () => navigate("/tasks/incomplete"),
    },
    {
      text: "Important",
      icon: (
        <IconButton aria-label="important">
          <AssignmentLateIcon />
        </IconButton>
      ),
      onClick: () => navigate("/tasks/important"),
    },
  ];

  const customisedCategorySideBar = [
    {
      text: "Work",
      icon: (
        <IconButton aria-label="work">
          <WorkIcon />
        </IconButton>
      ),
      onClick: () => navigate("/tasks/category/work"),
    },
    {
      text: "Life",
      icon: (
        <IconButton aria-label="life">
          <NightlifeIcon />
        </IconButton>
      ),
      onClick: () => navigate("/tasks/category/life"),
    },
    {
      text: "College",
      icon: (
        <IconButton aria-label="college">
          <EngineeringIcon />
        </IconButton>
      ),
      onClick: () => navigate("/tasks/category/college"),
    },
    {
      text: "School",
      icon: (
        <IconButton aria-label="school">
          <SchoolIcon />
        </IconButton>
      ),
      onClick: () => navigate("/tasks/category/school"),
    },
  ];

  const handleLogout = () => {
    setSession(null);
    localStorage.removeItem("session");
    navigate("/login");
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            sx={{ mr: "auto", fontStyle: "italic" }}
            component="div"
          >
            MinimalTasks
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main open={open}>
        {children}
        <DrawerHeader />
      </Main>
      <Drawer
        sx={{
          display: { xs: "block", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        elevation={0}
        variant="temporary"
        ModalProps={{
          onClose: handleDrawerClose,
          keepMounted: true, // Better open performance on mobile.
        }}
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {!session && (
          <List>
            {initialSideBar.map((el, index) => (
              <ListItem key={el.text} disablePadding>
                <ListItemButton onClick={el.onClick}>
                  <ListItemIcon>{el.icon}</ListItemIcon>
                  <ListItemText primary={el.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
        {session && (
          <div>
            <List>
              {initialCategorySideBar.map((el, index) => (
                <ListItem key={el.text} disablePadding>
                  <ListItemButton onClick={el.onClick}>
                    <ListItemIcon>{el.icon}</ListItemIcon>
                    <ListItemText primary={el.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {customisedCategorySideBar.map((el, index) => (
                <ListItem key={el?.text} disablePadding>
                  <ListItemButton onClick={el?.onClick}>
                    <ListItemIcon>{el?.icon}</ListItemIcon>
                    <ListItemText primary={el?.text} />
                  </ListItemButton>
                </ListItem>
              ))}
              <button
                style={{
                  margin: "1em",
                  width: "90%",
                  borderRadius: "20px",
                }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </List>
          </div>
        )}
      </Drawer>
    </Box>
  );
}
