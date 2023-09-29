import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  isLoggedIn: false,
  loginDetails: { username: '', password: '', id: '' },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      let newUserId = state.users.length + 1;

      const newUser = {
        id: newUserId,
        username: action.payload.username,
        email: action.payload.email,
        password: action.payload.password,
        phonenumber: action.payload.phonenumber,
      };
      console.log(newUser);
      state.users = [...state.users, newUser];
    },

    loginUser: (state, action) => {
      console.log(action.payload);
      const { id, username, password } = action.payload;
      state.isLoggedIn = true;
      state.loginDetails.username = username;
      state.loginDetails.password = password;
      state.loginDetails.id = id;

      let encoded = username + 'GOSHOP';
      let encodedtoken = btoa(encoded);
      console.log(encodedtoken, 'enc');

      //local storage logic with token
      localStorage.setItem('usertoken', encodedtoken);
      console.log(atob(encodedtoken, 'dec'));

      let loginuserdata = { id: id, username: username };
      localStorage.setItem('user', JSON.stringify(loginuserdata));
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem('usertoken');
      localStorage.removeItem('user');
    },
    addUserInformation: (state, action) => {
      console.log(action.payload);
      let userId = localStorage.getItem('user');
      let parseduser = JSON.parse(userId);
      let userUpdatedId = parseduser.id;

      // let usersfind = state.users.find(
      //   (finduser) => finduser.id === userUpdatedId
      // );
      const {
        firstName,
        lastName,
        surName,
        dob,
        gender,
        phoneNumber1,
        phoneNumber2,
        email,
        profilePicImage,
      } = action.payload;

      const userIndex = state.users.findIndex(
        (user) => user.id === userUpdatedId
      );

      if (userIndex !== -1) {
        // User found, update their information
        state.users[userIndex] = {
          ...state.users[userIndex], // Keep the existing user properties
          firstName: firstName,
          lastName: lastName,
          surName: surName,
          dob: dob,
          gender: gender,
          phoneNumber1: phoneNumber1,
          phoneNumber2: phoneNumber2,
          email: email,
          profilePicImage: profilePicImage,
        };
      }

      console.log(userIndex);
    },
    addUserAddressInformation: (state, action) => {
      console.log(action.payload);
      let userId = localStorage.getItem('user');
      let parseduser = JSON.parse(userId);
      let userUpdatedId = parseduser.id;

      const userAddreesIndex = state.users.findIndex(
        (user) => user.id === userUpdatedId
      );
      if (userAddreesIndex !== -1) {
        // User found, update their information
        state.users[userAddreesIndex] = {
          ...state.users[userAddreesIndex], // Keep the existing user properties
          useraddress: [{ adress1: action.payload }],
        };
      }
    },
    addUserBankInformation: (state, action) => {
      let userId = localStorage.getItem('user');
      let parseduser = JSON.parse(userId);
      let userUpdatedId = parseduser.id;
      const userAddreesIndex = state.users.findIndex(
        (user) => user.id === userUpdatedId
      );
      if (userAddreesIndex !== -1) {
        // User found, update their information
        state.users[userAddreesIndex] = {
          ...state.users[userAddreesIndex], // Keep the existing user properties
          userBankAccounts: [{ account1: action.payload }],
        };
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  registerUser,
  loginUser,
  logoutUser,
  addUserInformation,
  addUserAddressInformation,
  addUserBankInformation,
} = authSlice.actions;

export default authSlice.reducer;
