import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import GitHubIcon from "@material-ui/icons/GitHub";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#388E3C",
    color: "#fff",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft({
  pageTitle,
  navItems,
  children,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        style={{ backgroundColor: "#388E3C" }} // 💚 AppBar color
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon style={{ color: "#fff" }} /> {/* 💚 Icon color */}
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            style={{ display: "flex", alignItems: "center", color: "#fff" }} // 💚 Text color
          >
            <img
              alt="."
              src="/logo.png"
              style={{ height: "45px", width: "auto" }}
            />
            &nbsp;Rice Supply Chain
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{ paper: classes.drawerPaper }}
        PaperProps={{
          style: {
            backgroundColor: "#C8E6C9", // optional: light green
            color: "#000", // 🔲 Black text
            textAlign: "center", // ⬅️ Centered content
          },
        }}
      >
        <div className={classes.drawerHeader}>
          <ListItemText>
            <b style={{ color: "#000", width: "100%", display: "block" }}>
              {pageTitle}
            </b>
          </ListItemText>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon style={{ color: "#000" }} />
            ) : (
              <ChevronRightIcon style={{ color: "#000" }} />
            )}
          </IconButton>
        </div>

        <List>
          <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
            <ListItem>
              <ListItemText primary="Home" style={{ textAlign: "center" }} />
            </ListItem>
          </Link>
          <Link
            to="/explorer"
            style={{ textDecoration: "none", color: "#000" }}
          >
            <ListItem>
              <ListItemText
                primary="Explorer"
                style={{ textAlign: "center" }}
              />
            </ListItem>
          </Link>
        </List>

        {navItems.length !== 0 && (
          <List>
            {navItems.map((item) => (
              <Link
                to={item[1]}
                key={item[0]}
                style={{ textDecoration: "none", color: "#000" }}
              >
                <ListItem button>
                  <ListItemText
                    primary={item[0]}
                    style={{ textAlign: "center" }}
                  />
                </ListItem>
              </Link>
            ))}
          </List>
        )}

        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "70px",
              fontWeight: 500,
              fontSize: 17,
              borderTop: "1px solid #aaa",
              color: "#000", // 🔲 Black text
              textAlign: "center",
            }}
          >
            By Team Akatsuki&nbsp;&nbsp;
            <a
              href="https://github.com/rishav4101/eth-supplychain-dapp"
              style={{ color: "#000", textDecoration: "none" }} // 🔲 Black icon
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon style={{ marginTop: 10 }} />
            </a>
          </div>
        </div>
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <div style={{ margin: "0 auto", maxWidth: 1300 }}>{children}</div>
      </main>
    </div>
  );
}
