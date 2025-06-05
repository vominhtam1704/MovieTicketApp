// src/pages/RegisterPage.js
import React from 'react';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = ({ history }) => {
  return (
    <div>
      <h1>Register</h1>
      <RegisterForm history={history} />
    </div>
  );
};

export default RegisterPage;
