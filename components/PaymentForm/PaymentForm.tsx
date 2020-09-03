import { useState } from 'react';
import styled from 'styled-components';
import Input from '../Input';
import Notification from '../Notification';
import InputMask from 'react-input-mask';
import { Formik, Field } from 'formik';
import axios from 'axios';
import { useRouter } from 'next/router';

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputControl = styled.div`
  position: relative;
`;

const Button = styled.button`
  height: 50px;
  border-radius: 10px;
  background-color: #fdd835;
  font-size: 18px;
  width: 150px;
  font-weight: 100;
  margin-top: 70px;
  transition: all 0.2s;
  border: none;
  color: black;
  &:hover {
    background-color: #fbc02d;
    box-shadow: 0 1px 4px 0 rgba(0,0,0,0.2);
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;

interface INotificationState {
  type: string
  text: string
}

interface IResponse {
  error: boolean
  message: string
}

const PaymentForm: React.FC = () => {
  const [notification, setNotification] = useState<INotificationState>({
    type: '',
    text: '',
  });

  const router = useRouter();

  const fetchApi = ({ phone, sum }): Promise<IResponse> => {
    return new Promise(async (res, rej) => {
      try {
        const response = await axios.post('/api/payment', { phone, sum });
        if (response.status > 200) {
          rej({ error: true, message: 'Произошла ошибка. Повторите попытку позже.' });
        }
        if (response.data.error) {
          rej({ error: true, message: response.data.message });
        }
        res({ error: false, message: response.data.message });
      } catch (err) {
        rej({ error: true, message: 'Произошла ошибка. Повторите попытку позже.' });
      }
    });
  };

  const handleSubmit = (values, actions) => {
    fetchApi(values)
      .then(({ message }) => {
        setNotification({ type: 'success', text: message });
        setTimeout(() => {
          router.push('/');
        }, 3000)
      })
      .catch(({ message }) => {
        setNotification({
          type: 'failure',
          text: message,
        });
        actions.setSubmitting();
      });
  };

  const handleCloseNotification = () => {
    setNotification({ type: '', text: '' });
  };

  return (
    <>
      <Formik initialValues={{ phone: '', sum: '' }} onSubmit={handleSubmit}>
        {({ handleSubmit, isSubmitting }) => (
          <FormWrapper onSubmit={handleSubmit}>
            <Field
              name='phone'
              validate={(value) => {
                const match = value.match(/\d/g);
                return match?.length < 11 ? 'Некорректный номер телефона' : '';
              }}
            >
              {({ field, form: { touched, errors } }) => {
                return (
                  <InputControl>
                    <InputMask mask='+7 (999) 999-99-99' {...field}>
                      {(inputProps) => (
                        <Input
                          {...inputProps}
                          placeholder='Номер телефона'
                          errorMessage={touched.phone && errors.phone}
                        />
                      )}
                    </InputMask>
                  </InputControl>
                );
              }}
            </Field>
            <Field
              name='sum'
              validate={(value) => {
                if (value[0] === '0') {
                  return 'Некорректно введена сумма';
                }
                if (Number(value) < 1) {
                  return 'Минимальная сумма платежа - 1 руб.';
                }
                if (Number(value) > 1000) {
                  return 'Максимальная сумма платежа - 1000 руб.';
                }
                return '';
              }}
            >
              {({ field, form: { touched, errors } }) => (
                <InputControl>
                  <InputMask mask='9999' maskChar=' ' {...field}>
                    {(inputProps) => (
                      <Input
                        {...inputProps}
                        placeholder='Сумма платежа'
                        errorMessage={touched.sum && errors.sum}
                      />
                    )}
                  </InputMask>
                </InputControl>
              )}
            </Field>
            <Button type='submit' disabled={isSubmitting}>
              Оплатить
            </Button>
          </FormWrapper>
        )}
      </Formik>
      <Notification
        type={notification.type}
        notification={notification.text}
        onClose={handleCloseNotification}
      />
    </>
  );
};

export default PaymentForm;
