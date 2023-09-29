import React, { useEffect, useState } from 'react';
import './profile.css';
import StepperHeader from '../../components/stepper/StepperHeader';

const UserProfile = () => {
  const [userToken, setUserToken] = useState('');

  //STEPS STATE

  return (
    <div className='userprofile_page'>
      <StepperHeader />
    </div>
  );
};

export default UserProfile;
