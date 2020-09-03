import MainLayout from '../components/MainLayout';
import Menu from '../components/Menu';
import IOperator from '../interfaces/IOperator';
import operators from '../config';

interface IHomeProps {
  operators: IOperator[]
}

const Home: React.FC<IHomeProps> = ({ operators }) => {
  return (
    <MainLayout title="Выберете оператора">
      <Menu operators={operators}/>
    </MainLayout>
  )
};

export const getStaticProps = async () => {
  return {
    props: {
      operators
    }
  }
}

export default Home;
