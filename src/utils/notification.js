import { store } from 'react-notifications-component';

const defaultNotification = {
  title: 'Notification title',
  message: 'Notification message',
  type: 'success',
  insert: 'top',
  container: 'top-right',
  animationIn: ['animate__animated', 'animate__fadeIn'],
  animationOut: ['animate__animated', 'animate__fadeOut'],
  dismiss: {
    duration: 5000,
    showIcon: true,
  },
};

const addNotiError = ({ title, message, ...other }) => {
  store.addNotification({
    ...defaultNotification,
    type: 'danger',
    title,
    message,
    ...other,
  });
};

const addNotiSuccess = ({ title, message, ...other }) => {
  store.addNotification({
    ...defaultNotification,
    type: 'success',
    title,
    message,
    ...other,
  });
};

export { addNotiError, addNotiSuccess };
