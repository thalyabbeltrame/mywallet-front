import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { BiPlusCircle, BiMinusCircle } from 'react-icons/bi';

import Transactions from '../components/Transactions';

function HomePage() {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('userInfos');
    navigate('/');
  };

  return (
    <Container>
      <Header>
        <h1>{`Olá, ${JSON.parse(localStorage.getItem('userInfos')).name}`}</h1>
        <RiLogoutBoxRLine size={30} style={{ color: '#ffffff', cursor: 'pointer' }} onClick={() => logOut()} />
      </Header>
      <Transactions />
      <Footer>
        <Button
          onClick={() => navigate('/transaction/deposit', { state: { actionType: 'creation' } })}
        >
          <BiPlusCircle size={30} style={{ color: '#ffffff' }} />
          <p>Nova entrada</p>
        </Button>
        <Button
          onClick={() => navigate('/transaction/withdrawal', { state: { actionType: 'creation' } })}
        >
          <BiMinusCircle size={30} style={{ color: '#ffffff' }} />
          <p>Nova saída</p>
        </Button>
      </Footer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 25px;
  width: 100%;
  height: 100vh;
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 25px 0px;
  width: 100%;

  h1 {
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #ffffff;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Button = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  width: 49%;
  height: 114px;
  background: #a328d6;
  border-radius: 5px;
  border: none;
  padding: 10px;
  cursor: pointer;

  p {
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    text-align: left;
    color: #ffffff;
    width: 64px;
  }

  &:hover {
    filter: brightness(120%);
  }
`;

export default HomePage;
