import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { ThreeDots } from 'react-loader-spinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import errorAlert from '../utils/toastConfig';

function TransactionForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { transactionType, actionType, transaction } = location.state;
  const [isLoading, setIsLoading] = useState(false);
  const [transactionInfos, setTransactionInfos] = useState({
    amount: '',
    description: '',
    type: transactionType,
  });

  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfos')).token}`,
    },
  };

  useEffect(() => {
    if (transaction === undefined) return;
    setTransactionInfos({
      amount: transaction.amount,
      description: transaction.description,
      type: transaction.type,
    });
  }, []);

  const handleInputChange = (event) => {
    setTransactionInfos({ ...transactionInfos, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const amount = Number(transactionInfos.amount.replace(',', '.'));
    if (isNaN(amount) || amount <= 0) {
      errorAlert('O valor deve ser um número positivo!');
      return;
    }
    if (transaction === undefined) {
      sendTransaction();
      return;
    }
    setTransactionInfos({ ...transactionInfos, amount: transactionInfos.amount });
    updateTransaction();
  };

  const sendTransaction = () => {
    setIsLoading(true);

    const API_URL = 'https://my-wallet-tbb.herokuapp.com';
    axios
      .post(
        `${API_URL}/transactions`,
        { ...transactionInfos, amount: transactionInfos.amount.replace(',', '.') },
        config
      )
      .then(() => {
        navigate('/home');
      })
      .catch((error) => {
        errorAlert(error.response.data);
        setIsLoading(false);
      });
  };

  const updateTransaction = () => {
    setIsLoading(true);

    const API_URL = 'https://my-wallet-tbb.herokuapp.com';
    axios
      .put(
        `${API_URL}/transactions/${transaction._id.toString()}`,
        { ...transactionInfos, amount: transactionInfos.amount.replace(',', '.') },
        config
      )
      .then(() => {
        navigate('/home');
      })
      .catch((error) => {
        errorAlert(error.response.data);
        setIsLoading(false);
      });
  };

  return (
    <>
      <ToastContainer />
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
          {isLoading ? (
            <ThreeDots color='#ffffff' height={60} width={60} />
          ) : (
            `${actionType === 'creation' ? 'Salvar' : 'Atualizar'} ${
              transactionType === 'deposit' ? 'entrada' : 'saída'
            }`
          )}
        </Button>
      </Form>
    </>
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
