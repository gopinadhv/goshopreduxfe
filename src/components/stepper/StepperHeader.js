import React from 'react';
import sucess from '../../assests/images/sucess.gif';

//MATERIAL UI IMPORTS
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StepContext from '@mui/material/Step';
import StepOneComponent from './StepOneComponent';
import UserInfo from '../../pages/profile/UserInfo';
import UserAddressInfo from '../../pages/profile/UserAddressInfo';
import UserBanksInfo from '../../pages/profile/UserBanksInfo';

//Steps Heading
const steps = ['User Details', 'Address', 'Add Your Cards'];

//Steps Styles
const stylesStepper = {
  padding: '16px',
  gap: '2px',
  width: '94%',
  color: '#fff',
};
const stepHeader = {
  width: '340px',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  backgroundColor: '#00256A',
  color: '#fff',
};

const emptydiv = {
  width: '0px',
  height: '0px',
  position: 'absolute',
  right: '-52px',
  borderTop: '25px solid transparent',
  borderLeft: '50px solid #00256A',
  borderBottom: '25px solid transparent',
};

const steplabel = {
  color: '#fff',
};

const StepperHeader = ({ title, children }) => {
  //STEPS STATE
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  //HANDLING STEPS
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Stepper
          activeStep={activeStep}
          sx={stylesStepper}
        >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant='caption'>Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step
                sx={stepHeader}
                key={label}
                {...stepProps}
              >
                <StepLabel {...labelProps}>
                  <span style={steplabel}> {label}</span>
                </StepLabel>
                <div style={emptydiv}></div>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography
              sx={{ mt: 2, mb: 1 }}
              variant='h5'
            >
              User Details Updated sucessfully
            </Typography>
            <img
              src={sucess}
              alt=''
            />
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep === 0 && <UserInfo title='User Information'  />}
            {activeStep === 1 && <UserAddressInfo title='User Address' />}
            {activeStep === 2 && <UserBanksInfo title='Bank Details' />}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color='inherit'
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
                variant='contained'
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {/*isStepOptional(activeStep) && (
                <Button
                  color='warning'
                  onClick={handleSkip}
                  sx={{ mr: 1 }}
                  variant='contained'
                >
                  Skip
                </Button>
              ) */}
              <Button
                variant='contained'
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </div>
  );
};

export default StepperHeader;
