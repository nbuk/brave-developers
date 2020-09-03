import styled, { keyframes } from 'styled-components';
import { useEffect } from 'react';

const notificationKeyFrames = (start, end) => keyframes`
  0% {
    opacity: 0;
    transform: translateX(${start}%);
  }
  100% {
    opacity: 1;
    transform: translateX(${end}%);
  }
`;

interface INotificationProps {
  type: string
}

const NotificationWrapper = styled.div<INotificationProps>`
  position: absolute;
  padding: 10px 25px 10px 20px;
  left: 30px;
  bottom: 30px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  color: white;
  font-weight: 100;
  animation: ${notificationKeyFrames(-200, 0)} 0.5s ease-in-out 1;
  background-color: ${props => props.type === 'success' ? '#81C784' : '#f44336'};
  @media (max-width: 767px) {
    width: 90vw;
    left: 50%;
    transform: translateX(-50%);
    animation: ${notificationKeyFrames(-200, -50)} 0.5s ease-in-out 1;
    bottom: 10px;
  }
`;

const CloseButton = styled.span`
  position: absolute;
  top: 5px;
  right: 10px;
  font-weight: 500;
  &:hover {
    cursor: pointer;
  }
`;

interface INotification {
  type: string
  notification: string
  onClose: () => void
}

const Notification: React.FC<INotification> = ({ type, notification, onClose }) => {
  if (!notification) return <></>;

  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 5000);
    
    return () => {
      clearTimeout(timeout);
    }
  });

  return (
    <NotificationWrapper type={type}>
      { notification }
      <CloseButton onClick={() => onClose()}>&times;</CloseButton>
    </NotificationWrapper>
  )
};

export default Notification;