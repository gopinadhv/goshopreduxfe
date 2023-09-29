import React, { useState, useEffect } from 'react';

//MATERIAL IMPORTS
import {
  FormControl,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Grid,
  Select,
  InputLabel,
  Button,
} from '@mui/material';
import { banks } from '../../dummydata/bankdata';

//REDUX
import { useSelector, useDispatch } from 'react-redux';
import { addUserBankInformation } from '../../redux/authReducer';

const UserBanksInfo = ({ title }) => {
  const [bankName, setBankName] = useState('');
  const [bankBranchName, setBankBranchName] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [ifscode, setIfscode] = useState('');
  const [cardNo, setCardNo] = useState('');

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

    if (userIndex !== -1 && users[userIndex]?.userBankAccounts?.[0]?.account1) {
      const bankdata = users[userIndex].userBankAccounts[0].account1;
      setBankName(bankdata.bankName || '');
      setBankBranchName(bankdata.bankBranchName || '');
      setIfscode(bankdata.ifscode || '');
      setAccountNo(bankdata.accountNo || '');
      setCardNo(bankdata.cardNo || '');
    }
  }, [userIndex]);

  //Inputs Handling
  const handleBankName = (e) => {
    setBankName(e.target.value);
  };

  const handleBankBranch = (e) => {
    setBankBranchName(e.target.value);
  };

  const handelAccountNo = (e) => {
    setAccountNo(e.target.value);
  };

  const handelIfscode = (e) => {
    setIfscode(e.target.value);
  };

  const handleCardNo = (e) => {
    setCardNo(e.target.value);
  };

  const handleSubmit = (e) => {
    let carddata = { bankName, bankBranchName, accountNo, ifscode, cardNo };
    dispatch(addUserBankInformation(carddata));
    console.log(carddata);
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
        <div className='debit_card_details'>
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
            >
              <FormControl
                fullWidth
                size='small'
              >
                <InputLabel>Select Bank</InputLabel>
                <Select
                  size='small'
                  value={bankName}
                  onChange={handleBankName}
                >
                  {banks.map((eachbank) => (
                    <MenuItem value={eachbank.name}>{eachbank.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
            >
              <FormControl
                fullWidth
                size='small'
              >
                <TextField
                  type='text'
                  size='small'
                  placeholder='Branch Name'
                  value={bankBranchName}
                  onChange={handleBankBranch}
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
            >
              <FormControl
                fullWidth
                size='small'
              >
                <TextField
                  type='text'
                  size='small'
                  placeholder='Account No'
                  value={accountNo}
                  onChange={handelAccountNo}
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
            >
              <FormControl
                fullWidth
                size='small'
              >
                <TextField
                  type='text'
                  size='small'
                  placeholder='IFSC CODE'
                  value={ifscode}
                  onChange={handelIfscode}
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
            >
              <FormControl
                fullWidth
                size='small'
              >
                <TextField
                  type='text'
                  size='small'
                  placeholder='Card No'
                  value={cardNo}
                  onChange={handleCardNo}
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

export default UserBanksInfo;
