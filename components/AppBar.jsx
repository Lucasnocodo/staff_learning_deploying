import React, { useState } from 'react';
import clsx from 'clsx';
import {
  AppBar, Toolbar, IconButton, Typography, Grid, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import Link from 'next/link'

import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuItemList from '../constant/MenuItemList';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

const drawerWidth = 240;
export default function TopAppBar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [Barname, setBarname] = useState('Welcome');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={handleDrawerOpen}
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Typography className={classes.title} variant="h6" noWrap>
                {Barname}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {MenuItemList.map((e) => <ListItem button key={e.name} onClick={() => setBarname(e.name)}>
            <ListItemIcon >
              {/* TODO change Icon for each item */}
              <InboxIcon />
            </ListItemIcon>
            <Link href={e.link}>
              <ListItemText primary={e.name} />
            </Link>
          </ListItem>)}
        </List>
      </Drawer>
    </div>
  );
}

