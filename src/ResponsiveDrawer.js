import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import Menu, { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField'
import Dialog, {
  DialogActions,
  DialogContent,
  //DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { mailFolderListItems,SideBar } from './tileData';
import TemporaryDrawer from './SideBar';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
    auth: true,
    anchorEl: null,
    open: false,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
    this.setState({ open: false });
  };
  render() {
    const { classes, theme } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>{mailFolderListItems}</List>
        <Divider />
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              #General
            </Typography>
            <div>
              <TemporaryDrawer/>
              <Button>
                <i class="material-icons"
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >settings</i>
              </Button>
              <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
              >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                  <MenuItem onClick={this.handleClickOpen}>Invite new member</MenuItem>
              </Menu>
              <div>
                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">Invite others to #General</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Enter Name"
                      type="name"
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={this.handleClose} color="primary">
                      Invite
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>
        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);