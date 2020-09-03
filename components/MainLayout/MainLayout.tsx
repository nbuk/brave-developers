import styled from 'styled-components';
import Header from './Header';
import Container from '../Container';

interface IMainLayoutProps {
  title: string
}

 const MainLayout: React.FC<IMainLayoutProps> = ({ title, children }) => {
  return (
    <>
      <Container>
        <Header title={title} />
        {children}
      </Container>
    </>
  )
}

export default MainLayout;