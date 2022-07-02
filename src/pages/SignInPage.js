import { Link } from 'react-router-dom';
import styled from 'styled-components';

import SignInForm from '../components/SignInForm';

function SignInPage() {
  return (
    <Container>
      <Title>MyWallet</Title>
      <SignInForm />
      <Link to='/'>
        <p>Primeira vez? Cadastre-se!</p>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  p {
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #ffffff;
  }
`;

const Title = styled.h1`
  font-family: 'Saira Stencil One';
  font-weight: 400;
  font-size: 32px;
  line-height: 50px;
  color: #ffffff;
  margin-bottom: 28px;
`;

export default SignInPage;
