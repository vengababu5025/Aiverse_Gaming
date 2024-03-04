// app.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import * as Components from './Components';
import BalloonGame from './BalloonGame';

// Eye icon components using Unicode characters
const EyeIcon = () => <span>&#128065;</span>; // Unicode for an open eye
const EyeSlashIcon = () => <span>&#128064;</span>; // Unicode for a slashed eye

function SignInForm() {
  const [signIn, setSignIn] = useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [resetMessageVisible, setResetMessageVisible] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  const toggle = () => {
    setSignIn((prevSignIn) => !prevSignIn);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };
  const handleForgotPasswordClick = () => {
    // Add logic here to send a password reset email
    setResetMessageVisible(true);
  };

  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/balloon-game');
  };
  const handleSignUp = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Password strength requirements
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    
    if (!regex.test(password)) {
      setPasswordError('Password must contain at least 8 characters, including one capital letter, one number, and one special character.');
      return;
    }

    // Perform registration logic here if the password is strong
    // ...

    // Reset password error message
    setPasswordError('');
  };

  return (
    <Components.Container>
            <Components.SignUpContainer signinIn={signIn}>
        <Components.Form>
          <Components.Title>Create Account</Components.Title>
          <Components.Input type='text' placeholder='Name' />
          <Components.InputContainer>
            <Components.Input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              value={password}
              onChange={handlePasswordChange}
            />
            <Components.ShowPasswordButton onClick={handleShowPasswordClick}>
              {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </Components.ShowPasswordButton>
          </Components.InputContainer>
          <Components.RememberMeContainer>
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label>
          </Components.RememberMeContainer>
          <Components.Button onClick={handleSignUp}>Sign Up</Components.Button>
          <Components.ResetMessage isVisible={resetMessageVisible}>
            Password reset instructions sent to your email. Please check your inbox.
          </Components.ResetMessage>
          {passwordError && (
            <Components.ResetMessageContainer>
              <Components.ResetMessage isVisible={true}>{passwordError}</Components.ResetMessage>
            </Components.ResetMessageContainer>
          )}
        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer signinIn={signIn}>
        <Components.Form>
          <Components.Title>Sign in</Components.Title>
          <Components.Input type='email' placeholder='Email' />
          <Components.InputContainer>
            <Components.Input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
            />
            <Components.ShowPasswordButton onClick={handleShowPasswordClick}>
              {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </Components.ShowPasswordButton>
          </Components.InputContainer>
          <Components.Anchor href='#' onClick={handleForgotPasswordClick}>
            Forgot your password?
          </Components.Anchor>
          <Components.ResetMessage isVisible={resetMessageVisible}>
            Password reset instructions sent to your email. Please check your inbox.
          </Components.ResetMessage>
          <Components.RememberMeContainer>
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label>
          </Components.RememberMeContainer>
          <Components.Button onClick={handleSignIn}>Sign In</Components.Button>
        </Components.Form>
      </Components.SignInContainer>
      <Components.OverlayContainer signinIn={signIn}>
        <Components.Overlay signinIn={signIn}>
          <Components.LeftOverlayPanel signinIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us, please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel signinIn={signIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter your personal details and start the journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
      <Components.Button onClick={handleSignIn}>Sign In</Components.Button>
    </Components.Container>
  );
}

function App() {
  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
  };
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<SignInForm />}
        />
        <Route
          path="/balloon-game"
          element={<BalloonGame onLogout={handleLogout} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
