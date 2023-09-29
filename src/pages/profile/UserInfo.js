import React, { useEffect } from 'react';
import './profile.css';
import { useState } from 'react';

//Materil imports
import {
  FormControl,
  Grid,
  TextField,
  Typography,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

//Redux Imports
import { addUserInformation } from '../../redux/authReducer';
import { useDispatch, useSelector } from 'react-redux';

const UserInfo = ({ title, handleSubmitUserInfo }) => {
  //redux state Imports
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { users } = auth;

  //State
  const [userIndex, setUserIndex] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [surName, setSurName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [phoneNumber2, setPhoneNumber2] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicImage, setProfilePic] = useState('');

  const [id, setId] = useState('');

  //useEffect
  useEffect(() => {
    let userid = localStorage.getItem('user');
    let parseduser = JSON.parse(userid);
    setId(parseduser.id);

    let mapdata = users.findIndex((eachuser) => eachuser.id === parseduser.id);
    setUserIndex(mapdata);
    console.log(userIndex);

    setTimeout(() => {
      setFirstName((users[userIndex] && users[userIndex].firstName) || '');
      setLastName((users[userIndex] && users[userIndex].lastName) || '');
      setSurName((users[userIndex] && users[userIndex].surName) || '');
      setGender((users[userIndex] && users[userIndex].gender) || '');
      setPhoneNumber((users[userIndex] && users[userIndex].phonenumber) || '');
      setPhoneNumber2(
        (users[userIndex] && users[userIndex].phoneNumber2) || ''
      );
      setEmail((users[userIndex] && users[userIndex].email) || '');

      let dateTimeString = users[userIndex] && users[userIndex].dob;
      setDob(dateTimeString);
      let dateTime = new Date(dateTimeString);
      // console.log(dateTime);
      // const dateOnlyString = dateTime.toISOString().split('T')[0];
      // console.log(dateOnlyString);

      // setDob(dateOnlyString);
    }, 1000);
  }, [userIndex]);

  //handling inputs
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleSurname = (e) => {
    setSurName(e.target.value);
  };

  const handleGender = (e) => {
    setGender(e.target.value);
  };

  const handleDob = (event) => {
    let onlyDate = event.$d.toISOString();
    setDob(onlyDate);
  };

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePhoneNumber2 = (e) => {
    setPhoneNumber2(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleProfilePic = (e) => {
    console.log(e.target.files[0]);
    setProfilePic(e.target.value);
  };

  const handleSubmit = () => {
    console.log(id);
    let userdata = {
      id,
      firstName,
      lastName,
      surName,
      email,
      phonenumber,
      phoneNumber2,
      profilePicImage,
      dob,
      gender,
    };
    console.log(userdata);
    dispatch(addUserInformation(userdata));
  };

  return (
    <div className='user_details_conatiner'>
      <Paper style={{ minHeight: '300px', padding: '4px' }}>
        <Paper
          className='title_paper'
          elevation={1}
        >
          <Typography
            fontWeight={600}
            variant='h6'
          >
            {title}
          </Typography>
        </Paper>
        <div className='inputs_feild_conatiner'>
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              sm={12}
              md={4}
              xs={12}
            >
              <FormControl fullWidth>
                <TextField
                  size='small'
                  variant='outlined'
                  placeholder='Firstname'
                  value={firstName}
                  onChange={handleFirstName}
                />
              </FormControl>
            </Grid>
            <Grid
              item
              sm={12}
              md={4}
              xs={12}
            >
              <FormControl fullWidth>
                <TextField
                  size='small'
                  variant='outlined'
                  placeholder='LastName'
                  value={lastName}
                  onChange={handleLastName}
                />
              </FormControl>
            </Grid>
            <Grid
              item
              sm={12}
              md={4}
              xs={12}
            >
              <FormControl fullWidth>
                <TextField
                  size='small'
                  variant='outlined'
                  placeholder='Surname'
                  value={surName}
                  onChange={handleSurname}
                />
              </FormControl>
            </Grid>

            <Grid
              item
              sm={12}
              md={4}
              xs={12}
            >
              <FormControl
                fullWidth
                size='small'
              >
                <InputLabel id='demo-multiple-name-label'>
                  Select Gender
                </InputLabel>
                <Select
                  size='small'
                  value={gender}
                  onChange={handleGender}
                >
                  <MenuItem value='male'>Male</MenuItem>
                  <MenuItem value='female'>Female</MenuItem>
                  <MenuItem value='others'>Others</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              sm={12}
              md={4}
              xs={12}
              size='small'
            >
              <FormControl
                fullWidth
                size='small'
              >
                <LocalizationProvider
                  size='small'
                  dateAdapter={AdapterDayjs}
                  value={dob}
                >
                  <DatePicker
                    label='Date of Birth'
                    slotProps={{ textField: { size: 'small' } }}
                    onChange={handleDob}
                  />{' '}
                </LocalizationProvider>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
            >
              <FormControl fullWidth>
                <TextField
                  type='number'
                  placeholder='phonenumber'
                  size='small'
                  value={phonenumber}
                  onChange={handlePhoneNumber}
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
            >
              <FormControl fullWidth>
                <TextField
                  type='number'
                  placeholder='Second phonenumber'
                  size='small'
                  value={phoneNumber2}
                  onChange={handlePhoneNumber2}
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
            >
              <FormControl fullWidth>
                <TextField
                  type='email'
                  placeholder='e mail'
                  size='small'
                  value={email}
                  onChange={handleEmail}
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
            >
              <div className='profile_image_conatiner'>
                <input
                  id='file'
                  type='file'
                  style={{ display: 'none' }}
                  value={profilePicImage}
                  onChange={handleProfilePic}
                />
                <label
                  htmlFor='file'
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    fontSize: '12px',
                  }}
                >
                  <CameraAltIcon style={{ height: '60px' }} /> Upload image
                </label>
              </div>
            </Grid>
          </Grid>
        </div>
      </Paper>
      <Button
        variant='contained'
        color='warning'
        onClick={handleSubmit}
      >
        Save
      </Button>
    </div>
  );
};

export default UserInfo;
