import React, { useState } from 'react';
import AuthLayout from './components/layout/AuthLayout';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import OTPForm from './components/auth/OTPForm';
import ProductsPage from './components/dashboard/ProductsPage';

function App() {
  const [step, setStep] = useState('LOGIN'); // 'LOGIN' | 'SIGNUP' | 'OTP' | 'DASHBOARD'
  const [userIdentifier, setUserIdentifier] = useState('');

  const handleLoginSuccess = (identifier) => {
    setUserIdentifier(identifier);
    setStep('OTP');
  };

  const handleSignupSuccess = (identifier) => {
    setUserIdentifier(identifier);
    setStep('OTP');
  };

  const handleOtpVerify = (otp) => {
    setStep('DASHBOARD');
  };

  const handleResend = () => {
    alert('OTP Resent! (Check console)');
  };

  if (step === 'DASHBOARD') {
    return <ProductsPage />;
  }

  return (
    <AuthLayout>
      {step === 'LOGIN' && (
        <LoginForm
          onLoginSuccess={handleLoginSuccess}
          onNavigateToSignup={() => setStep('SIGNUP')}
        />
      )}

      {step === 'SIGNUP' && (
        <SignupForm
          onSignupSuccess={handleSignupSuccess}
          onNavigateToLogin={() => setStep('LOGIN')}
        />
      )}

      {step === 'OTP' && (
        <OTPForm
          onOtpVerify={handleOtpVerify}
          onResend={handleResend}
        />
      )}
    </AuthLayout>
  );
}

export default App;
