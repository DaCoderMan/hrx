import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  padding: 48px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 420px;
  animation: fadeIn 0.6s ease-out;
`;

const Title = styled.h2`
  color: #ffffff;
  margin-bottom: 32px;
  font-size: 2.8rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 24px;
`;

const Input = styled.input`
  width: 100%;
  padding: 20px 20px 20px 50px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  font-size: 18px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  backdrop-filter: blur(10px);

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-color: #00d4ff;
    box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.2);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const Icon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.6);
  font-size: 18px;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  font-size: 18px;
  transition: color 0.3s ease;

  &:hover {
    color: rgba(255, 255, 255, 0.8);
  }
`;

const LoginButton = styled.button`
  background: linear-gradient(45deg, #00d4ff, #008cff);
  color: white;
  border: none;
  padding: 20px;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 8px 16px rgba(0, 212, 255, 0.3);

  &:hover {
    background: linear-gradient(45deg, #00e6ff, #0099ff);
    transform: translateY(-3px);
    box-shadow: 0 12px 24px rgba(0, 212, 255, 0.4);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const Credentials = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  margin-top: 24px;
  text-align: center;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <LoginContainer>
      <Title>Login</Title>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <Icon>
            <FaUser />
          </Icon>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </InputGroup>
        <InputGroup>
          <Icon>
            <FaLock />
          </Icon>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <PasswordToggle
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </PasswordToggle>
        </InputGroup>
        <LoginButton type="submit">
          Entrar
        </LoginButton>
      </form>
      <Credentials>
        <strong>Demo Credentials:</strong><br />
        Username: hr4all<br />
        Password: hr4allonx
      </Credentials>
    </LoginContainer>
  );
};

export default LoginForm;
