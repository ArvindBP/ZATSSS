import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import StarIcon from '@material-ui/icons/Star';
import TemporaryDrawer from './SideBar';
import Settings from './Settings';
import Grid from 'material-ui/Grid';
import * as firebase from 'firebase';
import List from 'material-ui/List';
import history from './history';
import FullScreenDialog from './fullscreendialog';
import CreateChannel from './CreateChannel';
import Icon from 'material-ui/Icon';
import green from 'material-ui/colors/green';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: green[200],
    },
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
  upper:{
    display:'flex',
  },
  navi:{
    display:'flex',
  }
});

class ResponsiveDrawer extends React.Component {

  constructor(props){
    super(props);
  this.state = {
    mobileOpen: false,
    auth: true,
    anchorEl: null,
    open: false,
    direction: 'row',
   justify: 'space-between',
   alignItems: 'flex-start',
   users:[],
   searchTerm:'',
   nextId:0,
   openCreateChannel:false,
    list:[]

  };
}

  handleClick = () => {
    this.setState({openCreateChannel:true})
  } 
  createChannels = (newChannel) => {
    console.log(newChannel);
    let x = this.state.list;
    x.push(newChannel);
    this.setState({list:x});
    console.log(newChannel+ "list data");
    console.log(this.state.list);
    this.setState({openCreateChannel:false})
  }



  componentDidMount(){
    //var userId = firebase.auth().currentUser.uid;
  // const  firebase.database().ref('/users/').once('value').then(function(snapshot) {
  // var username = snapshot.val() || 'Anonymous';
  // let obj;
  // let user = [];

  // for (obj in username){
  //   user.push(username[obj].username);
  // }
  // this.state.users = user;
  // this.setState({users: user});
  let user = [];        
  const UserList = firebase.database().ref('users/').once('value').then(function(snapshot) {
           console.log("Users: ", snapshot.val());
           let userArr = snapshot.val();
           let obj;
           console.log(userArr);
           for(obj in userArr){
             console.log(userArr[obj].username);
             user.push(userArr[obj].username);
           }
       });
//this.setState({users: user});
//console.log("console from component mount: ",this.state.users);

  

  }


  signOut = () => {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            console.log("user is signed out");
            history.push('./');

        }).catch(function(error) {
            // An error happened.
            console.log(error);
        });
    }

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
  addUsers = () => {
     let adding = this.state.users.slice();
     adding.push({id:this.state.nextId , person:this.state.searchTerm});
     this.setState({
       users : adding,
       nextId : ++this.state.nextId
     });
   };
  handleEvent = (term) => {
     this.state.searchTerm = term;
     this.setState({searchTerm: term});
     console.log("inside  "+this.state.searchTerm);
     this.addUsers();
   }
  render() {

    
    let hello = this.state.users.map((user) =>{
      return (
        <ListItem button>
          <ListItemText primary={user} />
        </ListItem>
   )
    })
    //console.log(hello);
    const { alignItems, direction, justify } = this.state;
    const { classes, theme } = this.props;
    const drawer = (
      <div>
        <List>
        <Grid container>
          <Grid xs={12}>
            <ListItem>
              <ListItemText primary="Sapient-XT" />
            </ListItem>
          </Grid>   
        </Grid>
        <Divider />
        </List>
        <div className={classes.toolbar} />
        <ListItem>
          <h3>Channels</h3>
          <Icon button className={classes.iconHover} onClick={this.handleClick}>
           add_circle
          </Icon>
        </ListItem>
        {
            this.state.list.map(item => (
              <List>
                <ListItem key={item.id} dense button className={classes.listItem} style={{ background: 'beige', marginBottom: '6px' }}>
                    <ListItemText primary={item.val}
                      style={{float:"left", color: '#ffffff', fontSize: '18px', marginLeft: '10px' }} />
                      
                </ListItem>
              </List>
            ))
          } 
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
            <Grid container
             alignItems={alignItems}
             direction={direction}
             justify={justify}
            >
             <Grid xs={10}>
               <Typography variant="title" color="inherit" noWrap>
                  
               </Typography>
             </Grid>
             <Grid xs={1}>
               <TemporaryDrawer users={this.state.users}/>
             </Grid>
             <Grid xs={1}>
                <Settings signOut={this.signOut} meth={this.handleEvent}/>
             </Grid>
            </Grid>
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
          {this.state.openCreateChannel && <CreateChannel channels={this.createChannels} />}
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