import styled from 'styled-components';

interface ITextFieldProps {
  error: boolean
}

const TextField = styled.input<ITextFieldProps>`
  padding: 20px;
  background-color: #fff;
  height: 50px;
  font-weight: $med;
  width: 300px;
  border-radius: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.54);
  border: ${props => props.error ? '1px solid #e53935' : 'none'};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  &:focus {
    outline: none;
  }
`;

const ErrorMessageWrapper = styled.span`
  position: absolute;
  top: -15px;
  left: 10px;
  color: #e53935;
  font-size: 12px;
  font-weight: 500;
`;

interface IInputProps {
  name: string
  placeholder: string
  errorMessage?: string
}

const Input: React.FC<IInputProps> = ({ name, placeholder, errorMessage, ...other }) => {
  return (
    <>
      <TextField type="text" name={name} placeholder={placeholder} error={Boolean(errorMessage)} {...other} />
      { errorMessage && <ErrorMessageWrapper>{errorMessage}</ErrorMessageWrapper> }
    </>
  ) 
};

export default Input;