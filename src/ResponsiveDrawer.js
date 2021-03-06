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
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';


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

  adornmentamount: {
   width:'80%',
   marginTop:'53%',
   paddingleft:'10px;',
   position:'relative',
   
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
      members:[],
      users:[],
      channels: [],
      searchTerm:'',
      clicked:'',
      nextId:0,
      openCreateChannel:false,
      list:[]
    };
  }

  handleClick = () => {
    this.setState({openCreateChannel:true})
  }

  createChannels = (newChannel) => {
    // console.log(newChannel);
    // let x = this.state.list;
    // x.push(newChannel);
    // this.setState({list:x});
    // console.log(newChannel+ "list data");
    // console.log(this.state.list);
    this.setState({openCreateChannel:false})

    let UID='';
        let ChannelID = '';
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("userName: ", user.displayName);
                console.log("user email: ", user.email);
                console.log("user id: ",user.uid);
                UID = user.uid;
                let d = new Date();
                let n = d.getTime();
                ChannelID = `${UID}${n}`;
                console.log(ChannelID);

            } else {
                // No user is signed in.
                console.log("no user is signed in");
            }

            console.log('ddddasd '+UID);
        
        let sampleMembers = [
        ];

        let d = new Date();
        let n = d.getTime();
        let sampleMessages = [
        ]

        firebase.database().ref('channels/'+ChannelID.toString()).set({
            channelname: newChannel.val,
            description: '',
            members: sampleMembers,
            messages: sampleMessages
        });
        //console.log("from write user: ", name + " " + emailId + " " + id);

        });
  }



  componentDidMount(){
    

  let user = [];        
  const UserList = firebase.database().ref('users/').once('value').then((snapshot) => {
           console.log("Users: ", snapshot.val());
           let userArr = snapshot.val();
           let obj;
           console.log(userArr);
           for(obj in userArr){
             console.log(userArr[obj].username);
             let obj1 = {};
             obj1.id = obj;
             obj1.name = userArr[obj].username  
             user.push(obj1);
           }
           this.setState({users: user});
           console.log("console from component mount: ",this.state.users);
       });

  let channel = [];        
  const channelList = firebase.database().ref('channels/').once('value').then((snapshot) => {
           console.log("Channels: ", snapshot.val());
           let channelArr = snapshot.val();
           let obj;
           console.log(channelArr);
           for(obj in channelArr){
              let obj1 = {};
              obj1.id = obj;
              obj1.name = channelArr[obj].channelname;
              obj1.members = [];
             channel.push(obj1);
           }
           this.setState({channels: channel});
           console.log("console from component mount: ",channel);
       });
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


     let adding = this.state.members.slice();
     adding.push({id:this.state.nextId , person:this.state.searchTerm});
     this.setState({
       members : adding,
       nextId : ++this.state.nextId
     });
   };


  handleEvent = (term) => {
    let flag =0;
    for(let k=0;k<this.state.users.length;k++){
      if(term == this.state.users[k].name && flag==0){
        flag = 1 ;
      }
    }

    if(flag ==1){
      for(let j=0;j<this.state.channels.length;j++){
        if(this.state.clicked == this.state.channels[j].name){
          this.state.channels[j].members.push(term)
        }
      }
    }

    this.setState({
      channels : this.state.channels,
    })
     // this.state.searchTerm = term;
     // this.setState({searchTerm: term});
     // console.log("inside  "+this.state.searchTerm);
     // this.addUsers();
   }

   hello = (id) => {
    for(let i =0; i< this.state.users.length; i++){
        if(this.state.users[i].id == id){
          this.state.clicked = this.state.users[i].name
        }
     }

     this.setState({
        clicked : this.state.clicked
     })
   }
   hello1 = (id) => {
     for(let i =0; i< this.state.channels.length; i++){
        if(this.state.channels[i].id == id){
          this.state.clicked = this.state.channels[i].name
        }
     }

     this.setState({
        clicked :this.state.clicked
     })
   
   }

   choosingdm = (name) => {
      this.state.clicked = name;
      this.setState({
        clicked : this.state.clicked
      })
   }
  
    render() {

    
    let hello = this.state.users.map((user) =>{
      return (
        <ListItem button>
          <ListItemText onClick={()=>this.hello(user.id)} primary={user.name} />
        </ListItem>
   )
    })

    let Channel = this.state.channels.map( (item) => {
          return (
                <ListItem button>
                    <ListItemText onClick={()=>this.hello1(item.id)} primary={item.name}
                      style={{float:"left", color: '#ffffff', fontSize: '18px', marginLeft: '10px' }} />
                      
                </ListItem> )
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
              <ListItemText primary={firebase.auth().currentUser.displayName} />
            </ListItem>
          </Grid>   
        </Grid>
        <Divider />
        </List>
        <div className={classes.toolbar} />
        <ListItem button>
         <FullScreenDialog choosingdm={this.choosingdm} users={this.state.users} />
       </ListItem>
        <ListItem>
          <h3>Channels</h3>
          <Icon button className={classes.iconHover} onClick={this.handleClick}>
           add_circle
          </Icon>
        </ListItem>
          { Channel }
          <h3>Users </h3>
          {hello} 
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
                  {this.state.clicked}
               </Typography>
             </Grid>
             <Grid xs={1}>
               <TemporaryDrawer clicked={this.state.clicked} members={this.state.channels}/>
             </Grid>
             <Grid xs={1}>
                <Settings clicked={this.state.clicked} signOut={this.signOut} meth={this.handleEvent}/>
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
          <InputLabel htmlFor="adornment-amount"></InputLabel>

         <Input
           className = {classes.adornmentamount}
           placeholder="enter the message"
           startAdornment={<InputAdornment position="start"></InputAdornment>}
        />
             <button>Send</button>
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