import { toast } from 'react-toastify';

export const notifyError = (message: string) => {
  toast.error(message, {
    position: 'bottom-center',
  });
};

export const notifyInfo = (message: string) => {
  toast.info(message, {
    position: 'bottom-center',
  });
};