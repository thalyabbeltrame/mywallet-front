import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { ThreeDots } from 'react-loader-spinner';

import httpStatus from '../utils/httpStatus';

function TransactionForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { transactionType } = location.state;

  const [isLoading, setIsLoading] = useState(false);
  const [transactionInfos, setTransactionInfos] = useState({
    amount: '',
    description: '',
    type: transactionType === 'entrada' ? 'deposit' : 'withdrawal',
  });

  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfos')).token}`,
    },
  };

  const handleInputChange = (event) => {
    setTransactionInfos({ ...transactionInfos, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const amount = Number(transactionInfos.amount.replace(',', '.'));
    if (isNaN(amount) || amount <= 0) {
      alert('O valor deve ser um número positivo!');
      return;
    }
    setTransactionInfos({ ...transactionInfos, amount: Number(transactionInfos.amount.replace(',', '.')) });
    sendTransaction();
  };

  const sendTransaction = () => {
    setIsLoading(true);

    const API_URL = 'http://localhost:5000';
    axios
      .post(`${API_URL}/transactions`, transactionInfos, config)
      .then((response) => {
        alert('Transação criada com sucesso!');
        navigate('/home');
      })
      .catch(({ response }) => {
        if (response.status === httpStatus.UNPROCESSABLE_ENTITY || response.status === httpStatus.UNAUTHORIZED) {
          alert('Você não tem permissão!');
        }
        setIsLoading(false);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type='text'
        name='amount'
        value={transactionInfos.amount}
        onChange={handleInputChange}
        placeholder='Valor'
        readOnly={isLoading}
        required
      />
      <Input
        type='text'
        name='description'
        value={transactionInfos.description}
        minLength={5}
        onChange={handleInputChange}
        placeholder='Descrição'
        readOnly={isLoading}
        required
      />
      <Button type='submit' disabled={isLoading}>
        {isLoading ? <ThreeDots color='#ffffff' height={60} width={60} /> : `Salvar ${transactionType}`}
      </Button>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 36px;
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

export default TransactionForm;
