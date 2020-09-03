import styled from 'styled-components';
import MainLayout from '../../components/MainLayout';
import PaymentForm from '../../components/PaymentForm';
import operators from '../../config';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next'

const OperatorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 70px;
  span {
    color: rgba(0, 0, 0, 0.45);
    font-weight: $med;
    margin-bottom: 10px;
  }
  img {
    width: 100px;
  }
`;

const BackButton = styled.a`
  display: inline-block;
  margin-bottom: 20px;
  align-self: flex-start;
  border-radius: 2px;
  background-color: #fff;
  font-size: 14px;
  padding: 5px 10px;
  font-weight: 100;
  transition: all 0.3s;
  border: none;
  color: black;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.2);
  &:focus {
    outline: none;
  }
`;

interface IPayProps {
  logoPath: string
  name: string
  error: boolean
}

const pay: React.FC<IPayProps> = ({ error, logoPath, name }) => {
  const router = useRouter();

  if (error && typeof window !== 'undefined') {
    router.push('/404');
    return <></>;
  }

  const handleClick = () => {
    router.push('/');
  }

  return (
    <MainLayout title="форма оплаты">
      <BackButton onClick={handleClick}> {"<"} На главную</BackButton>
      <OperatorWrapper>
        <span>Оператор</span>
        <img src={logoPath} alt={name} />
      </OperatorWrapper>
      <PaymentForm/>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const operatorName = ctx.params.operator;
  let error = false;

  const operatorData = operators.find(item => item.name === operatorName);

  if (!operatorData) {
    error = true;
  }

  return {
    props: {
      ...operatorData,
      error
    }
  }
};

export default pay;
