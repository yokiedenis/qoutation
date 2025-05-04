/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Avatar, Button, Paper, Grid, Container } from '@material-ui/core';
import Uploader from './Uploader';
import { getProfilesByUser, createProfile, updateProfile } from '../../../actions/profile';
import useStyles from './styles';
import Input from './Input';
import ProfileDetail from './Profile';

const Settings = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const initialState = { 
    name: user?.result?.name || '',
    email: user?.result?.email || '',
    phoneNumber: '',
    businessName: '',
    contactAddress: '', 
    logo: '',
    paymentDetails: ''
  };

  const [form, setForm] = useState(initialState);
  const location = useLocation()
  const dispatch = useDispatch();
  const classes = useStyles();
  const { profiles } = useSelector((state) => state.profiles)
  const [switchEdit, setSwitchEdit] = useState(0)
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
     console.log(profiles)
    dispatch(getProfilesByUser({ search: user?.result?._id || user?.result?.googleId }))
  }, [location])

  const handleCreateProfile = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createProfile({ form, userId: user?.result?._id || user?.result?.googleId }, enqueueSnackbar));
      setSwitchEdit(0)
    } catch (error) {
      enqueueSnackbar('Failed to create profile', { variant: 'error' });
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!profiles?.length) {
      enqueueSnackbar('No profile found to update', { variant: 'error' });
      return;
    }
    try {
      await dispatch(updateProfile(profiles[0]._id, form, enqueueSnackbar));
      setSwitchEdit(0)
    } catch (error) {
      enqueueSnackbar('Failed to update profile', { variant: 'error' });
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div>
      {profiles?.length && switchEdit === 0 && (
        <Container component="main" maxWidth="sm">
          <Paper className={classes.paper} elevation={1}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => setSwitchEdit(1)}
              style={{ margin: '20px' }}
            >
              Create Profile
            </Button>
          </Paper>
        </Container>
      )}

      {switchEdit === 1 && (
        <Container component="main" maxWidth="sm">
          <Paper className={classes.paper} elevation={1}>
            <form className={classes.form} onSubmit={profiles?.length ? handleUpdateProfile : handleCreateProfile}>
              <Grid container spacing={2}>
                <Uploader form={form} setForm={setForm} />
                <Input name="businessName" label="Business Name" handleChange={handleChange} value={form.businessName} required />
                <Input name="email" label="Email Address" handleChange={handleChange} type="email" value={form.email} required />
                <Input name="phoneNumber" label="Phone Number" handleChange={handleChange} value={form.phoneNumber} required />
                <Input name="contactAddress" label="Contact Address" handleChange={handleChange} value={form.contactAddress} required />
                <Input name="paymentDetails" label="Payment Details" handleChange={handleChange} value={form.paymentDetails} />
              </Grid>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                {profiles?.length ? 'Update Profile' : 'Create Profile'}
              </Button>
              <Button fullWidth variant="outlined" onClick={() => setSwitchEdit(0)}>
                Cancel
              </Button>
            </form>
          </Paper>
        </Container>
      )}

      {profiles?.length === 0 && switchEdit === 0 && (
        <Container component="main" maxWidth="sm">
          <Paper className={classes.paper} elevation={0}>
            <ProfileDetail profiles={profiles} />
            <Button 
              variant="outlined" 
              style={{ margin: '30px', padding: '15px 30px' }} 
              onClick={() => setSwitchEdit(1)}
            >
              Edit Profile
            </Button>
          </Paper>
        </Container>
      )}
    </div>
  );
};

export default Settings;