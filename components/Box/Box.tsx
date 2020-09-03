import styled from 'styled-components';
import Link from 'next/link';

const BoxWrapper = styled.div`
  flex: 0 0 30%;
  height: 150px;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &:hover {
    cursor: pointer;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
    transform: translateY(-1px);
  }
  @media (max-width: 767px) {
    flex: 0 0 70%;
    heigth: 250px;
    margin-bottom: 20px;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  }
`;

const ImageWrapper = styled.div`
  width: 70%;
  img {
    width: 100%;
  }
  @media (max-width: 767px) {
    width: 50%;
  }
`;

interface IBoxProps {
  imgPath: string;
  name: string;
}

const Box: React.FC<IBoxProps> = ({ imgPath, name }) => {
  return (
    <BoxWrapper>
      <Link href={'/pay/[operator]'} as={`/pay/${name}`}>
        <a>
          <ImageWrapper>
            <img src={imgPath} alt={name} />
          </ImageWrapper>
        </a>
      </Link>
    </BoxWrapper>
  );
};

export default Box;
