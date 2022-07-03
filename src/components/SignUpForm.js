import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { ThreeDots } from 'react-loader-spinner';

import httpStatus from '../utils/httpStatus';

function SignUpForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [signUpInfos, setSignUpInfos] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const handleInputChange = (event) => {
    setSignUpInfos({ ...signUpInfos, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (signUpInfos.password !== signUpInfos.passwordConfirmation) {
      alert('As senhas devem ser iguais!');
      return;
    }
    signUp();
  };

  const signUp = () => {
    setIsLoading(true);

    const API_URL = 'http://localhost:5000';
    axios
      .post(`${API_URL}/signup`, signUpInfos)
      .then((response) => {
        alert(response.data);
        navigate('/');
      })
      .catch((error) => {
        alert(error.response.data);
        setIsLoading(false);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type='text'
        name='name'
        value={signUpInfos.name}
        minLength={3}
        maxLength={15}
        onChange={handleInputChange}
        placeholder='Nome'
        readOnly={isLoading}
        required
      />
      <Input
        type='email'
        name='email'
        value={signUpInfos.email}
        onChange={handleInputChange}
        placeholder='E-mail'
        readOnly={isLoading}
        required
      />
      <Input
        type='password'
        name='password'
        value={signUpInfos.password}
        onChange={handleInputChange}
        placeholder='Senha'
        pattern='^[a-zA-Z0-9]{3,30}$'
        readOnly={isLoading}
        required
      />
      <Input
        type='password'
        name='passwordConfirmation'
        value={signUpInfos.passwordConfirmation}
        onChange={handleInputChange}
        placeholder='Confirme a senha'
        pattern='^[a-zA-Z0-9]{3,30}$'
        readOnly={isLoading}
        required
      />
      <Button type='submit' disabled={isLoading}>
        {isLoading ? <ThreeDots color='#ffffff' height={60} width={60} /> : 'Cadastrar'}
      </Button>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 58px;
  background: ${(props) => (props.readOnly ? '#FFFFFF' : '#F2F2F2')};
  border-radius: 5px;
  font-family: 'Raleway';
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: ${(props) => (props.readOnly ? '#afafaf' : '#000000')};
  margin-bottom: 13px;
  padding: 0 15px;
  border: none;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #000000;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 46px;
  background: #a328d6;
  border-radius: 5px;
  border: none;
  font-family: 'Raleway';
  font-weight: 700;
  font-size: 20px;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    filter: brightness(120%);
  }
`;

export default SignUpForm;
