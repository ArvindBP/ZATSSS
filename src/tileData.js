import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';

export const mailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
      <ListItemText primary="Candidates" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      <ListItemText primary="Change Slots" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DraftsIcon />
      </ListItemIcon>
      <ListItemText primary="Openings" />
    </ListItem>
  </div>
);


export const SideBar = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <div>
          <i class="material-icons"
          >info_outline</i>
        </div>
      </ListItemIcon>
      <ListItemText primary="Channel Details" />
      <i class="material-icons">arrow_drop_down</i>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <div>
          <i class="material-icons">group</i>
        </div>
      </ListItemIcon>
      <ListItemText primary="Members" />
      <i class="material-icons">arrow_drop_down</i>
    </ListItem>
  </div>
);