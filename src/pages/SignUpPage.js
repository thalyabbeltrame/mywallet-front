import { Link } from 'react-router-dom';
import styled from 'styled-components';

import SignUpForm from '../components/SignUpForm';

function SignUpPage() {
  return (
    <Container>
      <Title>MyWallet</Title>
      <SignUpForm />
      <Link to='/'>
        <p>Já tem uma conta? Entre agora!</p>
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

export default SignUpPage;
