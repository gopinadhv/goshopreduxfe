import React from 'react';
import './profile.css';
import { useState, useEffect } from 'react';

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

//files import
import { countries, states } from '../../dummydata/countriesdata';

//Redux imports
import { addUserAddressInformation } from '../../redux/authReducer';
import { useSelector, useDispatch } from 'react-redux';

const UserAddressInfo = ({ title }) => {
  const [doorNo, setDoorNo] = useState('');
  const [street, setStreet] = useState('');
  const [village, setVillage] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [stateName, setStateName] = useState('');
  const [district, setDistrict] = useState('');
  const [pincode, setPincode] = useState('');

  const [userIndex, setUserIndex] = useState('');
  const [id, setId] = useState('');

  //redux
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { users } = auth;

  //useEffect
  useEffect(() => {
    let userid = localStorage.getItem('user');
    let parseduser = JSON.parse(userid);
    setId(parseduser.id);

    let mapdata = users.findIndex((eachuser) => eachuser.id === parseduser.id);
    setUserIndex(mapdata);
    console.log(userIndex);

    if (userIndex !== -1 && users[userIndex]?.useraddress?.[0]?.adress1) {
      const addressData = users[userIndex].useraddress[0].adress1;
      setDoorNo(addressData.doorNo || '');
      setStreet(addressData.street || '');
      setVillage(addressData.village || '');
      setCity(addressData.city || '');
      setCountry(addressData.country || '');
      setStateName(addressData.stateName || '');
      setDistrict(addressData.district || '');
      setPincode(addressData.pincode || '');
    }
  }, [userIndex, users]);

  //handle input
  const handleDoorNo = (e) => {
    setDoorNo(e.target.value);
  };

  const handleStreet = (e) => {
    setStreet(e.target.value);
  };

  const handleVillage = (e) => {
    setVillage(e.target.value);
  };

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const handleCountry = (e) => {
    setCountry(e.target.value);
  };

  const handleStateName = (e) => {
    setStateName(e.target.value);
  };

  const handleDistrict = (e) => {
    setDistrict(e.target.value);
  };

  const handlePincode = (e) => {
    setPincode(e.target.value);
  };

  const handleSubmit = () => {
    let addressdetails = {
      doorNo,
      street,
      village,
      city,
      country,
      stateName,
      district,
      pincode,
    };
    dispatch(addUserAddressInformation(addressdetails));

    console.log(addressdetails);
  };

  return (
    <div className='user_details_conatiner'>
      <Paper style={{ minHeight: '300px', padding: '4px' }}>
        <Paper
          className='title_paper'
          elevation={1}
        >
          <Typography variant='h5'>{title}</Typography>
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
                  placeholder='D-no'
                  value={doorNo}
                  onChange={handleDoorNo}
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
                  placeholder='Street'
                  value={street}
                  onChange={handleStreet}
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
                  placeholder='village'
                  value={village}
                  onChange={handleVillage}
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
                  placeholder='Near City'
                  value={city}
                  onChange={handleCity}
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
                <InputLabel>Select Country</InputLabel>
                <Select
                  size='small'
                  value={country}
                  onChange={handleCountry}
                >
                  {countries.map((eachcountry, index) => (
                    <MenuItem
                      key={index}
                      value={eachcountry.name}
                    >
                      {eachcountry.name}
                    </MenuItem>
                  ))}
                </Select>
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
                <InputLabel>Select State</InputLabel>
                <Select
                  size='small'
                  value={stateName}
                  onChange={handleStateName}
                >
                  {states.map((eachstate, index) => (
                    <MenuItem
                      key={index}
                      value={eachstate.name}
                    >
                      {eachstate.name}
                    </MenuItem>
                  ))}
                </Select>
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
                <InputLabel>Select District</InputLabel>
                {states.map((eachstate) =>
                  eachstate.name === 'AndraPradesh' ? (
                    <Select
                      size='small'
                      value={district}
                      onChange={handleDistrict}
                    >
                      {eachstate.districts.map((eachdist, index) => (
                        <MenuItem
                          key={index}
                          value={eachdist}
                        >
                          {eachdist}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    ''
                  )
                )}
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
                  type='number'
                  variant='outlined'
                  placeholder='PIN CODE'
                  value={pincode}
                  onChange={handlePincode}
                />
              </FormControl>
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

export default UserAddressInfo;
