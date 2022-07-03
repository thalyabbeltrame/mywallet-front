import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io';

import TransactionForm from '../components/TransactionForm';

function TransactionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { transactionType, actionType, transaction } = location.state;

  return (
    <Container>
      <Header>
        <IoIosArrowBack size={30} style={{ color: '#ffffff', cursor: 'pointer' }} onClick={() => navigate('/home')} />
        <h1>{`${actionType === 'creation' ? 'Nova' : 'Editar'} ${
          transactionType === 'deposit' ? 'entrada' : 'saída'
        }`}</h1>
      </Header>
      <TransactionForm transactionType={transactionType} actionType={actionType} transaction={transaction} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 0 25px;
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  padding: 25px 0 40px 0;
  width: 100%;

  h1 {
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #ffffff;
    margin-left: 40px;
  }
`;

export default TransactionPage;
