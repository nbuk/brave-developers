import styled from 'styled-components';

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-size: 24;
  font-weight: 500;
  text-transform: uppercase;
  margin: 20px 0 0px 0;
  text-align: center;
`;

const SUbTitle = styled.span`
  font-size: 14px;
  font-weight: 100;
  text-transform: uppercase;
`;

interface IHeaderProps {
  title: string
}

const Header: React.FC<IHeaderProps> = ({ title }) => {
  return (
    <HeaderWrapper>
      <Title>Оплата мобильной связи</Title>
      <SUbTitle>{title}</SUbTitle>
    </HeaderWrapper>
  )
}

export default Header;