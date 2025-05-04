import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  List, 
  ListItem, 
  ListItemText, 
  Avatar,
  Typography 
} from '@material-ui/core';
import {
  BusinessCenter,
  LocationOn,
  Phone,
  Email,
  AccountBalanceWallet
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 450,
  },
  avatarContainer: {
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderBottom: '1px solid #ddd',
    paddingBottom: theme.spacing(2.5),
    marginBottom: theme.spacing(2)
  },
  largeAvatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  listIcon: {
    marginRight: theme.spacing(2.5),
    color: theme.palette.text.secondary
  }
}));

export default function ProfileDetail({ profile }) {
  const classes = useStyles();

  if (!profile) {
    return (
      <Typography variant="body1" align="center">
        No profile data available
      </Typography>
    );
  }

  return (
    <>
      <div className={classes.avatarContainer}>
        <Avatar 
          alt={profile.businessName} 
          src={profile.logo} 
          className={classes.largeAvatar} 
        />
      </div>
      
      <List className={classes.root}>
        <ListItem>
          <BusinessCenter className={classes.listIcon} />
          <ListItemText primary={profile.businessName} />
        </ListItem>

        <ListItem>
          <LocationOn className={classes.listIcon} />
          <ListItemText primary={profile.contactAddress} />
        </ListItem>

        <ListItem>
          <Phone className={classes.listIcon} />
          <ListItemText primary={profile.phoneNumber} />
        </ListItem>

        <ListItem>
          <Email className={classes.listIcon} />
          <ListItemText primary={profile.email} />
        </ListItem>

        <ListItem>
          <AccountBalanceWallet className={classes.listIcon} />
          <ListItemText primary={profile.paymentDetails} />
        </ListItem>
      </List>
    </>
  );
}