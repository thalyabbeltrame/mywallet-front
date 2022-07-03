import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { RiCloseLine } from 'react-icons/ri';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import errorAlert from '../utils/toastConfig';

function Transactions() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfos')).token}`,
    },
  };

  useEffect(() => {
    const API_URL = 'https://my-wallet-tbb.herokuapp.com';
    axios
      .get(`${API_URL}/transactions`, config)
      .then((response) => {
        setTransactions(response.data.transactions);
        setBalance(response.data.balance);
      })
      .catch((error) => {
        errorAlert(error.response.data);
      });
  }, []);

  const deleteTransaction = (transaction) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Você realmente deseja deletar essa transação?`)) {
      const API_URL = 'https://my-wallet-tbb.herokuapp.com';
      axios
        .delete(`${API_URL}/transactions/${transaction._id.toString()}`, config)
        .then(() => {
          setTransactions(transactions.filter((t) => t._id.toString() !== transaction._id.toString()));
          const amount = Number(transaction.amount.replace(',', '.'));
          const updatedBalance = transaction.type === 'deposit' ? balance - amount : balance + amount;
          setBalance(updatedBalance);
        })
        .catch((error) => errorAlert(error.response.data));
    }
  };

  return (
    <Container>
      <ToastContainer />
      {transactions.length > 0 ? (
        <>
          {transactions.map((transaction) => {
            return (
              <Transaction key={transaction._id}>
                <div>
                  <Day>{transaction.date}</Day>
                  <Description
                    onClick={() =>
                      navigate('/transaction', {
                        state: {
                          transactionType: transaction.type,
                          actionType: 'edition',
                          transaction: {
                            ...transaction,
                            amount: Number(transaction.amount).toFixed(2).toString().replace('.', ','),
                          },
                        },
                      })
                    }
                  >
                    {transaction.description}
                  </Description>
                </div>
                <div>
                  <Amount type={transaction.type}>
                    {Number(transaction.amount).toFixed(2).toString().replace('.', ',')}
                  </Amount>
                  <RiCloseLine
                    size={20}
                    style={{ color: '#c6c6c6', cursor: 'pointer' }}
                    onClick={() => deleteTransaction(transaction)}
                  />
                </div>
              </Transaction>
            );
          })}
          <Balance>
            <h2>SALDO</h2>
            <Value value={balance}>{balance.toFixed(2).toString().replace('.', ',')}</Value>
          </Balance>
        </>
      ) : (
        <p>Não há registros de entrada ou saída</p>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100vh - 81px - 143px);
  background: #ffffff;
  border-radius: 5px;
  padding: 23px 12px 50px 12px;
  margin-bottom: 13px;
  overflow-y: scroll;

  p {
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #868686;
    width: 180px;
    height: 46px;
    position: absolute;
    top: calc(50% - 46px);
    left: calc(50% - 90px);
  }
`;

const Transaction = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 15px;
  font-family: 'Raleway';

  &::-webkit-scrollbar {
    display: none;
  }

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const Day = styled.h3`
  font-size: 16px;
  line-height: 19px;
  color: #c6c6c6;
  padding-right: 10px;
`;

const Description = styled.h3`
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
  line-height: 19px;
  color: #000;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Amount = styled.h3`
  font-size: 16px;
  line-height: 19px;
  text-align: right;
  color: ${(props) => (props.type === 'deposit' ? '#03AC00' : '#C70000')};
  margin-right: 10px;
`;

const Balance = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(100% - 80px);
  font-size: 17px;
  line-height: 20px;
  color: #000000;
  position: fixed;
  bottom: 155px;
  left: 40px;

  h2 {
    font-weight: 700;
  }
`;

const Value = styled.span`
  color: ${(props) => (props.value >= 0 ? '#03AC00' : '#C70000')};
`;

export default Transactions;
