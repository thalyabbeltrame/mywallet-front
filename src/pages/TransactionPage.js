import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import TransactionForm from '../components/TransactionForm';

function TransactionPage() {
  const location = useLocation();
  const { transactionType } = location.state;

  return (
    <Container>
      <Header>
        <h1>{`Nova ${transactionType}`}</h1>
      </Header>
      <TransactionForm transactionType={transactionType} />
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
  justify-content: space-between;
  padding: 25px 0 40px 0;
  width: 100%;

  h1 {
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #ffffff;
  }
`;

export default TransactionPage;
