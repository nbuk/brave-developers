import styled from 'styled-components';

const ContainerWrapper = styled.div`
  width: 600px;
  margin: 0 auto;
  @media (max-width: 599px) {
    width: 100%;
    padding: 0 20px;
  }
`;

const Container: React.FC = ({ children }) => {
  return (
    <ContainerWrapper>{children}</ContainerWrapper>
  )
};

export default Container;