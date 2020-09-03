import styled from 'styled-components';
import Box from '../Box';
import IOPerator from '../../interfaces/IOperator';

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  @media (max-width: 767px) {
    justify-content: center;
  }
`;

interface IMenuProps {
  operators: IOPerator[];
}

const Menu: React.FC<IMenuProps> = ({ operators }) => {
  return (
    <MenuWrapper>
      {operators.map((item) => (
        <Box key={item.id} imgPath={item.logoPath} name={item.name} />
      ))}
    </MenuWrapper>
  );
};

export default Menu;
